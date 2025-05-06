const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["addstick"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<texto>",
    example: "{prefix}{command} holaa",
    isSewa: true,
    isOwner: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ sock, m }) => {
        if (fs.readdirSync("./temp").filter((x) => (x.includes(".webp") && isNaN(parseInt(x)))).map((x) => x.split(".webp")[0]).includes(m.text)) return m.reply("Tente usar outro nome")
        if (!isNaN(m.text)) return m.reply("números não podem ser usados") 
        if (Object.keys(db.allcommand).includes(m.text)) return m.reply("Não use o nome do comando")        
        await sock.downloadAndSaveMediaMessage(m.quoted, "./temp/" + m.text)
        await m.reply("O adesivo foi adicionado " + m.text)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})