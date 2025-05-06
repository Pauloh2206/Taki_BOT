const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["defnombrebot"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<texto>",
    example: "{prefix}{command} Sun Bot",
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (m.text == m.botName) return m.reply("O nome já está em uso")
        config[m.botNumber].botName = m.text
        m.reply(`Mudou o nome do bot para ${m.text}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})