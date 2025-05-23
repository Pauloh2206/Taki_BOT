const axios = require("axios")
const fs = require("fs") 
const chalk = require("chalk")
const { randomNomor } = require("@libs/function")
module.exports = {
    commands: ["tx"],
    cooldown: 13,
    isSewa: true,
    isPremium: true, 
    callback: async ({ sock, m }) => {
        if (!m.quoted && !m.text) return m.reply("Cadê a mensagem?")
        if (m.quoted) {
        if (m.quoted.body == "") return m.reply("Cadê a mensagem?")
        if (m.quoted.body.split(" ").length > 25) return m.reply("Máximo 25")
        try{
        var ppimg = await sock.profilePictureUrl(m.input, "image")
        } catch {
        var ppimg = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
        }
        const options = { "type": "quote", "format": "png", "backgroundColor": "#FFFFFF", "width": 512, "height": 768, "scale": 2, "messages": [{ "entities": [], "avatar": true, "from": { "id": 1, "name": m.quoted.pushName, "photo": { "url": ppimg }}, "text": m.quoted.body, "replyMessage": {} }] }
        const { data } = await axios.post("https://bot.lyo.su/quote/generate", options, { headers: { "Content-Type": "application/json" } })
        const buffer = Buffer.alloc(data.result.image.length, data.result.image, "base64")
        await sock.sendStickerImage(m.chat, { buffer, packname: m.botName, author: m.pushName }, { quoted: m })                
        } else {
        if (m.args.length > 25) return m.reply("Máximo 25")
        try{
        var ppimg = await sock.profilePictureUrl(m.sender, "image")
        } catch {
        var ppimg = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
        }
        const options = { "type": "quote", "format": "png", "backgroundColor": "#FFFFFF", "width": 512, "height": 768, "scale": 2, "messages": [{ "entities": [], "avatar": true, "from": { "id": 1, "name": m.pushName, "photo": { "url": ppimg }}, "text": m.text, "replyMessage": {} }] }
        const { data } = await axios.post("https://bot.lyo.su/quote/generate", options, { headers: { "Content-Type": "application/json" } })
        const buffer = Buffer.alloc(data.result.image.length, data.result.image, "base64")
        await sock.sendStickerImage(m.chat, { buffer, packname: m.botName, author: m.pushName }, { quoted: m })
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