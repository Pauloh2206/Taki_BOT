const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["antilinkyt"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (db.chats[m.chat].antilinkyt == true) return m.reply("Já ativo")
        db.chats[m.chat].antilinkyt = true
        m.reply("Modo anti link youtube ativo")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (db.chats[m.chat].antilinkyt == false) return m.reply("Já inativo")
        db.chats[m.chat].antilinkyt = false
        m.reply("Modo anti link youtube não ativo")
        } else {
        m.reply("\`\`\`「 MODO ANTI LINK YOUTUBE 」\`\`\`\n\n0. off\n1. on")
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