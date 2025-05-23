const fs = require("fs") 
const chalk = require("chalk")
const ms = require("parse-ms")
const { vipSewa } = require("@config") 
module.exports = {
    commands: ["ceksewa"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ m }) => {
        if (vipSewa.includes(m.chat)) {
        var cekvip = "PERMANENT"
        } else if (db.chats[m.chat].sewa.status) {
        var cekvip = `${ms(db.chats[m.chat].sewa.expired - Date.now()).days} days, ${ms(db.chats[m.chat].sewa.expired - Date.now()).hours} hours, ${ms(db.chats[m.chat].sewa.expired - Date.now()).minutes} minutes, ${ms(db.chats[m.chat].sewa.expired - Date.now()).seconds} seconds`
        } else if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
        var cekvip = db.expired[m.botNumber].sewa[m.chat].expired == "INFINITY"? "PERMANENT" : `${ms(db.expired[m.botNumber].sewa[m.chat].expired - Date.now()).days} days, ${ms(db.expired[m.botNumber].sewa[m.chat].expired - Date.now()).hours} hours, ${ms(db.expired[m.botNumber].sewa[m.chat].expired - Date.now()).minutes} minutes, ${ms(db.expired[m.botNumber].sewa[m.chat].expired - Date.now()).seconds} seconds`
        } else {
        var cekvip = "*NADA AQUI*"
        }
        m.reply(cekvip)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})