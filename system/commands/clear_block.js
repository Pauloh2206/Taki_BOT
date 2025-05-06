const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["clearblock"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
        let data = await sock.fetchBlocklist()
        if (data.length == 0) return m.reply("Não há nada que possa ser limpo, mana")
        for (let x of data) {
        sock.updateBlockStatus(x, "desbloquear")
        }
        m.reply(util.format(i18n.__("success")))
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})