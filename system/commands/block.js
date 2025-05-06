const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["block"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        const listBlock = await sock.fetchBlocklist()
        if (!m.input) return m.reply("Nome de entrada")
        if (m.input.startsWith("08")) return m.reply("Use o código do seu país")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("Nomes itu não está ativo mano")
        if (m.input == m.botNumber) return m.reply("Esse é o número do seu bot") 
        if (m.input == (db.devoloper + "@s.whatsapp.net")) return m.reply("Número de Que desenvolvedor irmã")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("Esse é o dono principal asw")
        if (listBlock.includes(m.input)) return m.reply("Sudah di block")
        sock.updateBlockStatus(m.input, "block")
        await m.reply(`Block de sucesso @${m.input.split("@")[0]}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})