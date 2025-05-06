const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["desbanear"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        if (!m.input) return m.reply("Digite o número")
//        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("O número não está ativo no WhatsApp")
        if (m.input == m.botNumber) return m.reply("Esse é o meu número certo?") 
        if (m.input == (db.devoloper + "@s.whatsapp.net")) return m.reply("Mmmm")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("Mmmm tonto")
        if (!Object.keys(db.banned).includes(m.input)) return m.reply("já foi desbanido")
        delete db.banned[m.input]
        await m.reply(`foi desbanido a @${m.input.split("@")[0]}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})