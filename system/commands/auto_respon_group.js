const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["autorespongc"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (db.chats[m.chat].autorespongc == true) return m.reply("Já ativo")
        db.chats[m.chat].autorespongc = true
        m.reply("Grupo de resposta automática do modo ativo")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (db.chats[m.chat].autorespongc == false) return m.reply("Já inativo")
        db.chats[m.chat].autorespongc = false
        m.reply("Grupo de resposta automática do modo não ativo")
        } else {
        m.reply("\`\`\`「 MODE AUTO RESPON GROUP 」\`\`\`\n\n0. off\n1. on")
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