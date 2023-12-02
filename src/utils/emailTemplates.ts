export const cambioEstadoTemplate = (username: string, newState: string, teacherName: string, motivos: string, needMotivos: boolean) => `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cambio de estado en impresión</title>
            <style>
                body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                color: white;
                }

                .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #030026;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header {
                padding: 20px;
                background-color: rgba(3, 0, 38, 0.3);
                color: white;
                text-align: center;
                }

                .logo {
                max-width: 50px;
                margin: 0 auto;
                display: block;
                }

                .content {
                padding: 20px;
                text-align: center;
                }

                .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #E61366;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="cid:ticLogo" alt="App Logo" class="logo">
                </div>
                <div class="content">
                    <h1>Hola ${username},</h1>
                    <p>El estado de tu impresión ha cambiado a <b>${newState}</b>.</p>
                    ${
                        needMotivos ? `<p>Los motivos son: ${motivos || "No hay motivos"}</p>` : ""
                    }
                    <p>Si tenés alguna duda sobre esto, hablá con ${teacherName}.</p>
                    <p>¡Gracias por usar PrinTIC!</p>
                </div>
            </div>
        </body>
    </html>
`;