const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["iniciarchat"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m }) => {
        const data = db.anonymous.filter((x) => (x.roomA == m.sender || x.roomB == m.sender))
        if (data.length > 0 && (data[0].roomA == m.sender || data[0].roomB == m.sender)) { return m.reply("Você ainda está na sala anônima.") }
        if (!m.input) return m.reply("Nome de entrada") 
        if (db.anonymous.filter((x) => (x.roomA == m.input || x.roomB == m.input)).length > 0) return m.reply("O número já está na sala mana") 
        m.reply(`Você criou uma sala anônimo, e fazer @${m.input.split("@")[0]} como parceiros.\nAgora você pode enviar mensagens.`) 
        db.anonymous.push({ roomA: m.sender, roomB: m.input, isChat: true, expired: "INFINITY" })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})