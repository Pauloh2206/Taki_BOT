const fs = require("fs")
const chalk = require("chalk")
const config = require("@config")
const { decodeJid } = require("@libs/function")

module.exports = async(sock, json) => {
const botNumber = decodeJid(sock.user.id)
const ownerNumber = Object.keys(config).includes(botNumber)? config[botNumber].ownerNumber : config.ownerNumber
const callerId = json.content[0].attrs['call-creator']
const replyType = Object.keys(config).includes(botNumber)? config[botNumber].replytype : "web1"
const antiCall = Object.keys(config).includes(botNumber)? config[botNumber].anticall : false

const setReply = (chatId, teks) => {
if (replyType == "mess1") {
sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 999, isForwarded: true }})
} else if (replyType == "mess2") {
sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true }})
} else if (replyType == "mess3") {
sock.sendMessage(chatId, { text: teks, mentions: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net") })
}}




if (antiCall && json.content[0].tag == "offer") {
if (callerId.split("@")[0] == ownerNumber) return
setTimeout(() => {
sock.updateBlockStatus(callerId, "block")
}, 3000)
setTimeout(() => {
setReply(ownerNumber + "@s.whatsapp.net", `Detecte a @${callerId.split("@")[0]} chamando o bot`)
}, 1000)
setReply(callerId, "Sistema de bloqueio automático, não chame o bot, se for um erro mande uma mensagem para https://wa.me/" + ownerNumber)
}}



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})