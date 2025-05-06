const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["afk","off"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ m }) => {
        db.chats[m.chat].afk_group.push(m.sender)
        m.reply("*ESTÁ OFF........*\n*NINGUÉM VAI TE INCOMODAR COM* @") 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})