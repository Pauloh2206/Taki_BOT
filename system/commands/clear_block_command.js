const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["clearblockcmd"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (db.blockcmd.length == 0) return m.reply("Nada há nada bloqueado, mana")
        for (let x of db.blockcmd) {
        db.blockcmd.splice(db.blockcmd.indexOf(x, 1))
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