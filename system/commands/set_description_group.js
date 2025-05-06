const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["setdescgc"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Perseguidor confiável",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupMetadata }) => {
        if (m.text == groupMetadata.desc) return m.reply("Tente usar outro nome")
        await sock.groupUpdateDescription(m.chat, m.text)
        setTimeout(() => {
        m.reply("Sucesso ao substituir descrição grupo")
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