const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["antilinkig"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (db.chats[m.chat].antilinkig == true) return m.reply("Já ativo")
        db.chats[m.chat].antilinkig = true
        m.reply("O modo anti-link do Instagram está ativo")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (db.chats[m.chat].antilinkig == false) return m.reply("Já inativo")
        db.chats[m.chat].antilinkig = false
        m.reply("O modo anti-link do Instagram está desativado")
        } else {
        m.reply("\`\`\`「 MODO ANTI LINK INSTAGRAM 」\`\`\`\n\n0. off\n1. on")
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