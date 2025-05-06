const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["antilinktiktok"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (db.chats[m.chat].antilinktiktok == true) return m.reply("Já ativo")
        db.chats[m.chat].antilinktiktok = true
        m.reply("Modo anti link tiktok ativo")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (db.chats[m.chat].antilinktiktok == false) return m.reply("Já inativo")
        db.chats[m.chat].antilinktiktok = false
        m.reply("Mod Anti Link Bitter Oil: Não Ativo")
        } else {
        m.reply("\`\`\`「 MODO ANTI LINK TIKTOK 」\`\`\`\n\n0. off\n1. on")
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