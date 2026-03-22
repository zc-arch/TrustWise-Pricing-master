import { db } from "@/db"
import { sulfurPrices, portInventory, type SulfurPrice, type PortInventory } from "@/db/schema"
import { desc } from "drizzle-orm"

const MARKETS = ["华东市场", "华北市场", "华南市场", "西南市场"]
const SPECIFICATIONS = ["颗粒硫磺", "粉状硫磺", "液体硫磺"]

function generateDateStrings(days: number): string[] {
  const dates: string[] = []
  const today = new Date()
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    dates.push(date.toISOString().split("T")[0])
  }
  
  return dates
}

function randomPrice(base: number, variance: number): number {
  return Math.round((base + (Math.random() - 0.5) * variance) * 100) / 100
}

function generateMockPrices(limit?: number): SulfurPrice[] {
  const dates = generateDateStrings(limit || 60)
  const records: SulfurPrice[] = []
  
  let basePrice = 900
  
  for (const date of dates) {
    for (const market of MARKETS) {
      for (const spec of SPECIFICATIONS) {
        const mainPrice = randomPrice(basePrice, 50)
        const minPrice = mainPrice - randomPrice(10, 5)
        const maxPrice = mainPrice + randomPrice(10, 5)
        const changeValue = randomPrice(0, 20) * (Math.random() > 0.5 ? 1 : -1)
        const changePercent = ((changeValue / mainPrice) * 100).toFixed(2)
        
        records.push({
          id: records.length + 1,
          date,
          productName: "硫磺",
          region: "国内",
          market,
          specification: spec,
          minPrice: minPrice.toFixed(2),
          maxPrice: maxPrice.toFixed(2),
          mainPrice: mainPrice.toFixed(2),
          changeValue: changeValue.toFixed(2),
          changePercent: changePercent + "%",
          unit: "元/吨",
          source: "模拟数据",
          createdAt: new Date().toISOString(),
        })
      }
    }
    
    basePrice += (Math.random() - 0.5) * 10
    basePrice = Math.max(850, Math.min(950, basePrice))
  }
  
  return records
}

function generateMockInventory(limit?: number): PortInventory[] {
  const dates = generateDateStrings(limit || 60)
  const records: PortInventory[] = []
  
  let baseInventory = 150000
  
  for (const date of dates) {
    const inventory = Math.round(baseInventory + (Math.random() - 0.5) * 20000)
    const price = randomPrice(900, 50)
    
    records.push({
      id: records.length + 1,
      date,
      inventory: inventory.toString(),
      price: price.toFixed(2),
      createdAt: new Date().toISOString(),
    })
    
    baseInventory += (Math.random() - 0.5) * 5000
    baseInventory = Math.max(100000, Math.min(200000, baseInventory))
  }
  
  return records
}

export async function getPrices(limit?: number): Promise<SulfurPrice[]> {
  if (db) {
    try {
      const query = db.select().from(sulfurPrices).orderBy(desc(sulfurPrices.date))
      if (limit) {
        return await query.limit(limit)
      }
      return await query
    } catch (error) {
      console.warn("数据库查询失败，使用模拟数据:", error)
      return generateMockPrices(limit)
    }
  }
  return generateMockPrices(limit)
}

export async function getPriceSummary() {
  const prices = await getPrices(30)
  
  if (prices.length === 0) return null
  
  const latestPrice = prices[0]
  const avgPrice = prices.reduce((sum, p) => sum + Number(p.mainPrice || 0), 0) / prices.length
  
  return {
    currentPrice: latestPrice.mainPrice,
    minPrice: latestPrice.minPrice,
    maxPrice: latestPrice.maxPrice,
    avgPrice: avgPrice.toFixed(2),
    changeValue: latestPrice.changeValue,
    changePercent: latestPrice.changePercent,
    date: latestPrice.date,
    market: latestPrice.market,
    specification: latestPrice.specification,
  }
}

export async function getInventory(limit?: number): Promise<PortInventory[]> {
  if (db) {
    try {
      const query = db.select().from(portInventory).orderBy(desc(portInventory.date))
      if (limit) {
        return await query.limit(limit)
      }
      return await query
    } catch (error) {
      console.warn("数据库查询失败，使用模拟数据:", error)
      return generateMockInventory(limit)
    }
  }
  return generateMockInventory(limit)
}

export async function getInventorySummary() {
  const inventory = await getInventory(30)
  
  if (inventory.length === 0) return null
  
  const latest = inventory[0]
  const avgInventory = inventory.reduce((sum, i) => sum + Number(i.inventory || 0), 0) / inventory.length
  
  return {
    currentInventory: latest.inventory,
    avgInventory: avgInventory.toFixed(2),
    currentPrice: latest.price,
    date: latest.date,
  }
}
