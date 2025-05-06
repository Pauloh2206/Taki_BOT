const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["reiniciarlink"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m }) => {
        await sock.groupRevokeInvite(m.chat)
        setTimeout(() => {
        m.reply("O link do grupo foi redefinido")
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