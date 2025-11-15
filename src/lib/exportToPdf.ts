"use client"

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function exportChatToPDF(messages: Message[]) {
  // Create a printable HTML version
  const printWindow = window.open("", "_blank")
  
  if (!printWindow) {
    alert("Please allow popups to export chat")
    return
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Chat Export - Abhishek Jose Portfolio</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #0d0d0d;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          
          h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
            color: #3b82f6;
          }
          
          .subtitle {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 32px;
          }
          
          .message {
            margin-bottom: 24px;
            page-break-inside: avoid;
          }
          
          .message-header {
            font-weight: 600;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .user-badge {
            display: inline-block;
            padding: 2px 8px;
            background: #f1f5f9;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
          }
          
          .assistant-badge {
            display: inline-block;
            padding: 2px 8px;
            background: #dbeafe;
            color: #3b82f6;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
          }
          
          .message-content {
            padding: 12px;
            background: #f8fafc;
            border-radius: 8px;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          
          .footer {
            margin-top: 48px;
            padding-top: 24px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #64748b;
            font-size: 12px;
          }
          
          @media print {
            body {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <h1>Chat Conversation</h1>
        <div class="subtitle">Exported from Abhishek Jose's Portfolio</div>
        
        ${messages
          .map(
            (msg) => `
          <div class="message">
            <div class="message-header">
              <span class="${msg.role === "user" ? "user-badge" : "assistant-badge"}">
                ${msg.role === "user" ? "You" : "Abhishek Jose AI"}
              </span>
            </div>
            <div class="message-content">${msg.content.replace(/\n/g, "<br>")}</div>
          </div>
        `
          )
          .join("")}
        
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <p>Abhishek Jose - Full Stack Developer</p>
        </div>
      </body>
    </html>
  `

  printWindow.document.write(html)
  printWindow.document.close()

  // Wait for content to load, then trigger print
  setTimeout(() => {
    printWindow.print()
  }, 250)
}
