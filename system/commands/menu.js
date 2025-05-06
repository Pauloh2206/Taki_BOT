const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
const { ownerMenu, groupMenu, toolsMenu, funMenu, tagsMenu, downloadMenu, converterMenu, searchMenu, anonymousMenu, jadibotMenu, randomMenu, storageMenu, menu, fitur }= require("@message/helps")
const { pickRandom, randomNomor, getBuffer } = require("@libs/function")
module.exports = {
    commands: ["menu","start"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m, prefix, thePrefix }) => {
        const menunya = menu(m, thePrefix)
        const fiturnya = fitur(prefix)
        const thumbnail = await getBuffer(config.logonya.isLogo? config.logonya.url : "https://telegra.ph/file/69c4bd7f4c8e0e629adad.jpg")
        let options = {
        externalAdReply: {
        showAdAttribution: true,
        title: `OLÁ 👋 ${m.pushName}`,
        body: "O AMOR DA MARY <3",
        mediaType: 1,
        renderLargerThumbnail: config[m.botNumber].setmenu == "document" || config[m.botNumber].setmenu == "context"? true : false,
        thumbnail,
        sourceUrl: `https://wa.me/${m.ownerNumber}`,
        }}
        if (m.text.toLowerCase() == "creador") {
        m.reply(ownerMenu(prefix)) 
        } else if (m.text.toLowerCase() == "grupo") {
        m.reply(groupMenu(prefix)) 
        } else if (m.text.toLowerCase() == "herramientas") {                        
        m.reply(toolsMenu(prefix)) 
//        } else if (m.text.toLowerCase() == "fun") {                        
//        m.reply(funMenu(prefix)) 
//        } else if (m.text.toLowerCase() == "tags") {
//        m.reply(tagsMenu(prefix)) 
        } else if (m.text.toLowerCase() == "descargas") {
        m.reply(downloadMenu(prefix)) 
        } else if (m.text.toLowerCase() == "convertidor") {
        m.reply(converterMenu(prefix)) 
        } else if (m.text.toLowerCase() == "busqueda") {
        m.reply(searchMenu(prefix)) 
        } else if (m.text.toLowerCase() == "anonymous") {
        m.reply(anonymousMenu(prefix)) 
        } else if (m.text.toLowerCase() == "serbot") {
        m.reply(jadibotMenu(prefix)) 
        } else if (m.text.toLowerCase() == "random") {
        m.reply(randomMenu(prefix)) 
        } else if (m.text.toLowerCase() == "espacio") {
        m.reply(storageMenu(prefix)) 
        } else if (config[m.botNumber].setmenu == "document") {
        const thumbnaildoc = await getBuffer(config.thumbnailDok.url)
        const docType = pickRandom(["pptx","xlsx","zip","pdf","docx"])
        if (docType == "pptx") {
        var AppType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        } else if (docType == "xlsx") {
        var AppType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        } else if (docType == "zip") {
        var AppType = "application/zip"
        } else if (docType == "pdf") {
        var AppType = "application/pdf"
        } else if (docType == "docx") {
        var AppType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        } 
        sock.sendMessage(m.chat, { contextInfo: options, document: fs.readFileSync("./temp/Zzzzzzzzzz@4.0.4"), mimetype: AppType, title : "Footer text", fileLength : 999999999999, pageCount: 100, fileName : m.botName, caption: menunya + "\n" + fiturnya, headerType: "DOCUMENT", jpegThumbnail: thumbnaildoc }, { quoted: m })
        } else if (config[m.botNumber].setmenu == "context") {
        sock.sendMessage(m.chat, { text: menunya + "\n" + fiturnya, contextInfo: options }, { quoted: m })
        } else if (config[m.botNumber].setmenu == "viewonce") {
        sock.sendMessage(m.chat, { image: thumbnail, caption: menunya + "\n" + fiturnya, viewOnce: true, contextInfo: options }, { quoted: m })
        } else if (config[m.botNumber].setmenu == "image") {
        sock.sendMessage(m.chat, { image: thumbnail, caption: menunya + "\n" + fiturnya, contextInfo: options }, { quoted: m })
        } else if (config[m.botNumber].setmenu == "gif") {
        const buffer = await getBuffer(config.thumbnailVid.url)
        sock.sendMessage(m.chat, { video: buffer, contextInfo: options, jpegThumbnail: thumbnail, caption: menunya + "\n" + fiturnya, gifPlayback: true }, { quoted: m })
        } else if (config[m.botNumber].setmenu == "video") {
        const buffer = await getBuffer(config.thumbnailVid.url)
        sock.sendMessage(m.chat, { video: buffer, contextInfo: options, jpegThumbnail: thumbnail, caption: menunya + "\n" + fiturnya, gifPlayback: false }, { quoted: m })
        }
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})