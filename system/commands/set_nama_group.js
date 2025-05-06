const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["defnombregp"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<texto>",
    example: "{prefix}{command} sociedade Otaku",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupName }) => {
        if (m.text == groupName) return m.reply("Esse nome já está em uso")
        await sock.groupUpdateSubject(m.chat, m.text)
        setTimeout(() => {
        m.reply("O grupo foi renomeado com sucesso")
        }, 1000)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})