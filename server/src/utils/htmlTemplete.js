// server/src/utils/htmlTemplate.js

function htmlLayout(content, title = "Pastebin Lite") {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            margin: 0;
            padding: 2rem;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #2e2e2e;
            color: #fff;
          }
          h1 {
            text-align: center;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            background-color: #3a3a3a;
            padding: 1rem;
            border-radius: 8px;
          }
          .container {
            max-width: 800px;
            margin: 2rem auto;
            text-align: center;
          }
          .error {
            color: #ff6b6b;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${title}</h1>
          <pre>${content}</pre>
        </div>
      </body>
      </html>
    `;
  }
  
  module.exports = htmlLayout;
  