const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["bienvenida"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (db.chats[m.chat].welcome == true) return m.reply("já ativo")
        db.chats[m.chat].welcome = true
        m.reply("O grupo de boas-vindas foi ativado")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (db.chats[m.chat].welcome == false) return m.reply("já desativado")
        db.chats[m.chat].welcome = false
        m.reply("As boas-vindas do grupo estão desativadas")
        } else {
        m.reply("\`\`\`「 BEM-VINDO 」\`\`\`\n\n0. Para desativar\n1. Para Ativar")
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