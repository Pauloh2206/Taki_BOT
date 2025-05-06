const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["desbloquearcmd"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<comando>",
    example: "{prefix}{command} menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (!Object.keys(db.allcommand).includes(m.text)) return m.reply("Comando não encontrado!")        
        if (!db.blockcmd.includes(m.text)) return m.reply("comando já está desbloqueado")
        db.blockcmd.splice(db.blockcmd.indexOf(m.text, 1))
        await m.reply(`Comando desbloqueado *${m.text}*`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})