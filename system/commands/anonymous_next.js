const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms")
const config = require("@config")
const { pickRandom } = require("@libs/function")
module.exports = {
    commands: ["next"],
    cooldown: 13,
    isSewa: true,
    isPrivate: true,
    callback: async ({ sock, m }) => {
        const data = db.anonymous.filter((x) => (x.roomA == m.chat || x.roomB == m.chat))
        const dataChat = db.anonymous.filter((x) => !x.isChat && (x.roomA == "" || x.roomB == ""))
        const results = pickRandom(dataChat)
        if (data.length == 0) return m.reply("Você não está no quarto anônimo.")
        if (!data[0].isChat) return m.reply("Você não está no quarto anônimo.")
        if (data[0].roomA == m.chat) {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(data[0].roomB, { text: "Seu parceiro saiu da sala anônimo.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(data[0].roomB, { text: "Seu parceiro saiu da sala anônimo", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(data[0].roomB, { text: "Seu parceiro saiu da sala anônimo" })
        }
        if (dataChat.length == 0) {
        data[0].roomB = ""
        data[0].isChat = false
        data[0].expired = Date.now() + toMs("5m")
        m.reply("Aguarde enquanto procura parceiros.") 
        } else {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage((results.roomA !== ""? results.roomA : results.roomB), { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage((results.roomA !== ""? results.roomA : results.roomB), { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage((results.roomA !== ""? results.roomA : results.roomB), { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens." })
        }
        data[0].roomB = results.roomA !== ""? results.roomA : results.roomB
        m.reply("Encontrou outro parceiro com sucesso, por favor aguarde o parceiro entrar na sala.") 
        db.anonymous.splice(db.anonymous.indexOf(results, 1))
        }
        } else if (data[0].roomB == m.chat) {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(data[0].roomA, { text: "Seu parceiro saiu da sala anônimo", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(data[0].roomA, { text: "Seu parceiro saiu da sala anônimo", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(data[0].roomA, { text: "Seu parceiro saiu da sala anônimo" })
        }
        if (dataChat.length == 0) {
        data[0].roomA = ""
        data[0].isChat = false
        data[0].expired = Date.now() + toMs("5m")
        m.reply("Aguarde enquanto procura parceiros.") 
        } else {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage((results.roomA !== ""? results.roomA : results.roomB), { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage((results.roomA !== ""? results.roomA : results.roomB), { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage((results.roomA !== ""? results.roomA : results.roomB), { text: "Parceiro encontrado com sucesso, agora você pode enviar mensagens." })
        }
        data[0].roomA = results.roomA !== ""? results.roomA : results.roomB
        m.reply("Encontrou outro parceiro com sucesso, por favor aguarde o parceiro entrar na sala.") 
        db.anonymous.splice(db.anonymous.indexOf(results, 1))
        }
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