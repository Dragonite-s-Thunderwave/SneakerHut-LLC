const http = require("http");
// const chalk = require("chalk");
const app = require("./index")

const PORT = process.env["PORT"] ?? 4000
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(
        "Server is Listening"
        // chalk.blueBright("Server is listening on PORT:"),
        // chalk.yellow(PORT),
        // chalk.blueBright("SHOES")
    )
})