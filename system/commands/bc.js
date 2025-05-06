const fs = require("fs") 
const chalk = require("chalk")
const { getContentType } = require("baileys")
const { sleep } = require("@libs/function")
module.exports = {
    commands: ["bc"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, store, isImage, isVideo, isViewOnce, isDocument, isAllMedia, isQuotedAllMedia, isQuotedDocument, isQuotedLocation, isQuotedViewOnce, isQuotedImage, isQuotedSticker, isQuotedVideo, isQuotedAudio, isQuotedContact }) => {
        const dataChat = await store.chats.all().filter(({ id }) => id.includes("@s.whatsapp.net")).map(x => x.id)
        const dataGroup = Object.keys(await sock.groupFetchAllParticipating()).filter(async (x) => {
        const groupMetadata = sock.groupMetadata(x).catch(e => {})
        return (Object.keys(groupMetadata).length > 0 && groupMetadata.announce && !groupMetadata.participants.filter((v) => v.admin !== null).map((v) => v.id).includes(m.botNumber) || Object.keys(groupMetadata).length > 0 && !groupMetadata.announce) 
        }) 
        const data = [...dataChat, ...dataGroup]
        if (isImage || isQuotedImage) {
        let teks = m.text? "\`\`\`「  MENSAGEM DE TRANSMISSÃO  」\`\`\`\n\n" + m.text : "\`\`\`「  MENSAGEM DE TRANSMISSÃO  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
        for (let x of data) {        
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, image: media, caption: teks })
        await sleep(2000)
        } 
        } else if (isVideo || isQuotedVideo) {
        if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 600 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 600) { return m.reply("O tamanho é muito grande irmã 🙂") }
        const teks = m.text? "\`\`\`「  MENSAGEM DE TRANSMISSÃO  」\`\`\`\n\n" + m.text : "\`\`\`「  MENSAGEM DE TRANSMISSÃO  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
        for (let x of data) {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, video: media, caption: teks })
        await sleep(2000)
        }
        } else if (isViewOnce || isQuotedViewOnce) {
        if (isQuotedViewOnce && getContentType(m.quoted.message) == "videoMessage" && Object.keys(m.quoted.message["videoMessage"]).includes("seconds") && m.quoted.message["videoMessage"].seconds > 600 || getContentType(m.message) == "videoMessage" && Object.keys(m.message["videoMessage"]).includes("seconds") && m.message["videoMessage"].seconds > 600) { return m.reply("irmã e muito grande") }
        const teks = m.text? "\`\`\`「  MENSAGEM DE TRANSMISSÃO  」\`\`\`\n\n" + m.text : "\`\`\`「  MENSAGEM DE TRANSMISSÃO  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedViewOnce? m.quoted : m)
        for (let x of data) {
        if (isQuotedViewOnce && getContentType(m.quoted.message) == "videoMessage" ||  getContentType(m.message) == "videoMessage") {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, video: media, caption: teks, viewOnce: true })
        await sleep(2000)
        } else if (isQuotedViewOnce && getContentType(m.quoted.message) == "imageMessage" ||  getContentType(m.message) == "imageMessage") {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, image: media, caption: teks, viewOnce: true })
        await sleep(2000)
        }}
        } else if (isDocument || isQuotedDocument) {
        const teks = m.text? "\`\`\`「  MENSAGEM DE TRANSMISSÃO  」\`\`\`\n\n" + m.text : "\`\`\`「  MENSAGEM DE TRANSMISSÃO  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
        const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
        for (let x of data) {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, document: media, mimetype: "application/bin", fileName }) 
        await sleep(2000)              
        }
        } else if (isQuotedSticker || isQuotedAudio || isQuotedContact || isQuotedLocation) {
        for (let x of data) {
        await sock.copyNForward(x, m.quoted)
        await sleep(2000)
        }
        } else if (!isAllMedia && !isQuotedAllMedia) {
        if (!m.text) return m.reply("Texto?")
        let teks = "\`\`\`「  MENSAGEM DE TRANSMISSÃO  」\`\`\`\n\n" + m.text
        for (let x of data) {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, text: teks })
        await sleep(2000)
        }
        }
        m.reply(`Envio com sucesso mensagem de transmissão para ${data.length} chat`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})