const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["antispam"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (config[m.botNumber].antispam == true) return m.reply("Já ativo")
        config[m.botNumber].antispam = true
        m.reply("O modo anti-spam está ativo")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (config[m.botNumber].antispam == false) return m.reply("Já inativo")
        config[m.botNumber].antispam = false
        m.reply("Modo anti spam não ativo")
        } else {
        m.reply("\`\`\`「 MODO ANTI SPAM 」\`\`\`\n\n0. off\n1. on")
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