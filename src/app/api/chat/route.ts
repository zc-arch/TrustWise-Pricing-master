import { SYSTEM_PROMPT } from "@/lib/system-prompt"

export const maxDuration = 60

const QINIU_API_URL = "https://api.qnaigc.com/v1/chat/completions"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "请提供有效的消息" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "API Key 未配置。\n\n请在 .env.local 中设置 API Key",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const formattedMessages = messages.map((msg: { role: string; content: string }) => {
      const role = msg.role === "agent" ? "assistant" : msg.role as "user" | "assistant" | "system"
      return {
        role,
        content: msg.content,
      }
    })

    const messagesWithSystem = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...formattedMessages,
    ]

    const response = await fetch(QINIU_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "z-ai/glm-5",
        messages: messagesWithSystem,
        stream: true,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Qiniu API error:", errorText)
      
      if (response.status === 401) {
        return new Response(
          JSON.stringify({
            error: "API Key 无效或已过期。\n\n请检查您的 API Key 是否正确。",
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        )
      }

      return new Response(
        JSON.stringify({
          error: `API 请求失败 (${response.status}): ${errorText}`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    if (!response.body) {
      return new Response(
        JSON.stringify({ error: "API 响应体为空" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const readable = new ReadableStream({
      async start(controller) {
        try {
          const reader = response.body!.getReader()
          
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split("\n")

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6)
                if (data === "[DONE]") {
                  continue
                }

                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content
                  if (content) {
                    controller.enqueue(encoder.encode(content))
                  }
                } catch {
                  // 忽略解析错误
                }
              }
            }
          }
          controller.close()
        } catch (error) {
          console.error("Stream error:", error)
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)

    const errorMessage = error instanceof Error ? error.message : "处理请求失败，请稍后重试"

    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
