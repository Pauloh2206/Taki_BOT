const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["defnumerocreador"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (!m.input) return m.reply("Digite o número")
//        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (m.input.split("@")[0] == m.ownerNumber) return m.reply("O usuário já possui")
        config[m.botNumber].ownerNumber = m.input.split("@")[0]
        m.reply(`Proprietário mudou para ${m.input.split("@")[0]}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})