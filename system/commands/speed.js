const fs = require("fs") 
const chalk = require("chalk")
const moment = require("moment-timezone")
module.exports = {
    commands: ["speed","ping"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        m.reply(`*${moment.duration(Date.now() - parseInt(m.messageTimestamp.toString()) * 1000).asSeconds()} SEGUNDOS⏳*`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})