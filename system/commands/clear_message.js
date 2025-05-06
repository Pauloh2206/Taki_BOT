const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["clearmess","clearstore"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m, store }) => {
        let data = fs.readdirSync("./store").filter((x) => x !== "Zzzzzzzzzz@4.0.4")
        if (data.length == 0) return m.reply("Não há nada que possa ser limpo, mana")
        for (let x of data) {
        fs.unlinkSync("./store/" + x)
        }
        db.message = {}
        setTimeout(() => {
        process.send("reset")
        }, 2000)
        m.reply("Sucesso ao limpar, reiniciando o bot...")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})