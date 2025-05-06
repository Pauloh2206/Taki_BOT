const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delcmd"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ m }) => {
        const fileSha256 = m.quoted.message.stickerMessage.fileSha256.toString("base64")
        if (!Object.keys(db.listcmd).includes(fileSha256)) return m.reply("Adesivo não encontrado!")
        delete db.listcmd[fileSha256] 
        await m.reply("Comando de exclusão bem-sucedido")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})