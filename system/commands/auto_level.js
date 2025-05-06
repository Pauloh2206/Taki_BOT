const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["autolevel"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (config[m.botNumber].autolevel == true) return m.reply("Já ativo")
        config[m.botNumber].autolevel = true
        m.reply("Modo nível automático está ativo")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (config[m.botNumber].autolevel == false) return m.reply("Já inativo")
        config[m.botNumber].autolevel = false
        m.reply("Modo nível automático não ativo")
        } else {
        m.reply("\`\`\`「 MODE AUTO LEVEL 」\`\`\`\n\n0. off\n1. on")
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