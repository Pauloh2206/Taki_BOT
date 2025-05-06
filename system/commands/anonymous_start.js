const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms")
const config = require("@config")
const { pickRandom } = require("@libs/function")
module.exports = {
    commands: ["iniciar"],
    cooldown: 13,
    isSewa: true,
    isPrivate: true,
    callback: async ({ sock, m }) => {
        const data = db.anonymous.filter((x) => (x.roomA == m.chat || x.roomB == m.chat))
        const dataChat = db.anonymous.filter((x) => !x.isChat)
        if (data.length > 0 && (data[0].roomA == m.chat || data[0].roomB == m.chat)) { return m.reply("Você ainda está na sala anônima.") }
        if (dataChat.length > 0) {
        const results = pickRandom(dataChat)
        if (results.roomA == "") {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(results.roomB, { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(results.roomB, { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(results.roomB, { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens." })
        }
        results.roomA = m.chat
        results.isChat = true
        results.expired = "INFINITY"
        m.reply("Parceiro encontrado com sucesso, agora você pode enviar mensagens.") 
        } else if (results.roomB == "") {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(results.roomA, { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(results.roomA, { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(results.roomA, { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens." })
        }
        results.roomB = m.chat
        results.isChat = true
        results.expired = "INFINITY"
        m.reply("Parceiro encontrado com sucesso, agora você pode enviar mensagens.") 
        } else {
        m.reply("Você criou uma sala anônima\nAguarde enquanto procura parceiros.") 
        db.anonymous.push({ roomA: m.chat, roomB: "", isChat: false, expired: Date.now() + toMs("5m") })
        }
        } else {
        m.reply("Você criou uma sala anônima\n por favor, aguarde procurando por um parceiro.") 
        db.anonymous.push({ roomA: m.chat, roomB: "", isChat: false, expired: Date.now() + toMs("5m") })
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