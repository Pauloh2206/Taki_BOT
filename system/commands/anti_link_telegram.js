const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["antilinktele"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (db.chats[m.chat].antilinktele == true) return m.reply("Já ativo")
        db.chats[m.chat].antilinktele = true
        m.reply("O modo anti-link do Telegram está ativo")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (db.chats[m.chat].antilinktele == false) return m.reply("Já inativo")
        db.chats[m.chat].antilinktele = false
        m.reply("O modo anti-link do Telegram está desativado")
        } else {
        m.reply("\`\`\`「 MODO ANTI LINK TELEGRAM 」\`\`\`\n\n0. off\n1. on")
        }
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})