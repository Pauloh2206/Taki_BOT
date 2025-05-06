const fs = require("fs") 
const chalk = require("chalk")
const i18n = require("i18n") 
const util = require("util") 
const config = require("@config")
module.exports = {
    commands: ["delanon"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
        if (!m.input) return m.reply("Nome de entrada") 
        const data = db.anonymous.filter((x) => (x.roomA == m.input || x.roomB == m.input))
        if (data.length == 0) return m.reply("O número não está no quarto anônimo.")
        if (data[0].roomA !== "" && data[0].roomB !== "") {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(data[0].roomA, { text: "Você saiu do quarto anônimo.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        sock.sendMessage(data[0].roomB, { text: "Você saiu do quarto anônimo.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(data[0].roomA, { text: "Você saiu do quarto anônimo.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        sock.sendMessage(data[0].roomB, { text: "Você saiu do quarto anônimo.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(data[0].roomA, { text: "Você saiu do quarto anônimo." })
        sock.sendMessage(data[0].roomB, { text: "Você saiu do quarto anônimo." })
        }
        m.reply(util.format(i18n.__("success")))
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomA !== "") {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(data[0].roomA, { text: "Você saiu do quarto anônimo.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(data[0].roomA, { text: "Você saiu do quarto anônimo.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(data[0].roomA, { text: "Você saiu do quarto anônimo." })
        }
        m.reply(util.format(i18n.__("success")))
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomB !== "") {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(data[0].roomB, { text: "Você saiu do quarto anônimo.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(data[0].roomB, { text: "Você saiu do quarto anônimo.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(data[0].roomB, { text: "Você saiu do quarto anônimo." })
        }
        m.reply(util.format(i18n.__("success")))
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
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