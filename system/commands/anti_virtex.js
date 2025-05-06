const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["antivirtex"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (db.chats[m.chat].antivirtex == true) return m.reply("Já ativo")
        db.chats[m.chat].antivirtex = true
        m.reply("Modo anti virtex ativo")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (db.chats[m.chat].antivirtex == false) return m.reply("Já inativo")
        db.chats[m.chat].antivirtex = false
        m.reply("Modo anti virtex não está ativo")
        } else {
        m.reply("\`\`\`「 MODO ANTI VIRTEX 」\`\`\`\n\n0. off\n1. on")
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