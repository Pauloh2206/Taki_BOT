const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["autovn"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (config[m.botNumber].autovn == true) return m.reply("Já ativo")
        config[m.botNumber].autovn = true
        m.reply("Modo auto vn ativo")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (config[m.botNumber].autovn == false) return m.reply("Já inativo")
        config[m.botNumber].autovn = false
        m.reply("Modo auto vn não ativo")
        } else {
        m.reply("\`\`\`「 MODE AUTO VN 」\`\`\`\n\n0. off\n1. on")
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