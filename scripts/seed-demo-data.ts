import { db } from "@/db"
import { sulfurPrices, portInventory } from "@/db/schema"

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

async function seedPrices() {
  console.log("生成价格数据...")
  
  const dates = generateDateStrings(90)
  const records = []
  
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
          date,
          productName: "硫磺",
          region: market.includes("华东") || market.includes("华北") ? "国内" : "国内",
          market,
          specification: spec,
          minPrice: minPrice.toFixed(2),
          maxPrice: maxPrice.toFixed(2),
          mainPrice: mainPrice.toFixed(2),
          changeValue: changeValue.toFixed(2),
          changePercent: changePercent + "%",
          unit: "元/吨",
          source: "模拟数据",
        })
      }
    }
    
    basePrice += (Math.random() - 0.5) * 10
    basePrice = Math.max(850, Math.min(950, basePrice))
  }
  
  console.log(`共生成 ${records.length} 条价格记录`)
  
  const batchSize = 100
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize)
    await db.insert(sulfurPrices).values(batch).onConflictDoNothing()
    console.log(`已导入 ${Math.min(i + batchSize, records.length)}/${records.length} 条`)
  }
  
  return records.length
}

async function seedInventory() {
  console.log("生成库存数据...")
  
  const dates = generateDateStrings(90)
  const records = []
  
  let baseInventory = 150000
  
  for (const date of dates) {
    const inventory = Math.round(baseInventory + (Math.random() - 0.5) * 20000)
    const price = randomPrice(900, 50)
    
    records.push({
      date,
      inventory: inventory.toString(),
      price: price.toFixed(2),
    })
    
    baseInventory += (Math.random() - 0.5) * 5000
    baseInventory = Math.max(100000, Math.min(200000, baseInventory))
  }
  
  console.log(`共生成 ${records.length} 条库存记录`)
  
  const batchSize = 100
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize)
    await db.insert(portInventory).values(batch).onConflictDoNothing()
    console.log(`已导入 ${Math.min(i + batchSize, records.length)}/${records.length} 条`)
  }
  
  return records.length
}

async function main() {
  console.log("开始生成模拟数据...\n")
  
  if (!db) {
    console.error("数据库连接失败，请检查 DATABASE_URL 配置")
    process.exit(1)
  }
  
  try {
    const priceCount = await seedPrices()
    console.log(`\n价格数据导入完成: ${priceCount} 条\n`)
    
    const inventoryCount = await seedInventory()
    console.log(`\n库存数据导入完成: ${inventoryCount} 条\n`)
    
    console.log("所有数据导入完成!")
  } catch (error) {
    console.error("导入失败:", error)
    process.exit(1)
  }
  
  process.exit(0)
}

main()
