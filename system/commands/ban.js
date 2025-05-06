const fs = require("fs") 
const chalk = require("chalk")
const { calender } = require("@libs/function")
module.exports = {
    commands: ["ban"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        if (!m.input) return m.reply("Número de entrada")
        if (m.input.startsWith("08")) return m.reply("Use o código do seu país")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("Esse número não está mais ativo")
        if (m.input == m.botNumber) return m.reply("Esse é o número do seu bot") 
        if (m.input == (db.devoloper + "@s.whatsapp.net")) return m.reply("Return off")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("Esse é o dono principal")
        if (Object.keys(db.banned).includes(m.input)) return m.reply("foi banido")
        db.banned[m.input] = { date: calender, reason: "" }
        await m.reply(`Sucesso banido @${m.input.split("@")[0]}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})