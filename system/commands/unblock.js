const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["desbloquear"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        const listBlock = await sock.fetchBlocklist()
        if (!m.input) return m.reply("Digite o número")
//        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("O número não está ativo no WhatsApp")
        if (m.input == m.botNumber) return m.reply("esse é o meu número, não?") 
        if (m.input == (db.devoloper + "@s.whatsapp.net")) return m.reply("Mmmm")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("Mmmm tonto")
        if (!listBlock.includes(m.input)) return m.reply("já está bloqueado")
        sock.updateBlockStatus(m.input, "unblock")
        await m.reply(`Desbloqueou para @${m.input.split("@")[0]}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})