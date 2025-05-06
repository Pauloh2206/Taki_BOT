const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["stop","keluar"],
    cooldown: 13,
    isSewa: true,
    isPrivate: true,
    callback: async ({ sock, m }) => {
        const data = db.anonymous.filter((x) => (x.roomA == m.chat || x.roomB == m.chat))
        if (data.length == 0) return m.reply("Você não está no quarto anônimo.")
        if (data[0].roomA == m.chat && data[0].roomB !== "") {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(data[0].roomB, { text: "Seu parceiro saiu da sala anônimo.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(data[0].roomB, { text: "Seu parceiro saiu da sala anônimo.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(data[0].roomB, { text: "Seu parceiro saiu da sala anônimo." })
        }
        m.reply("Você saiu do quarto anônimo.") 
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomB == m.chat && data[0].roomA !== "") {
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(data[0].roomA, { text: "Seu parceiro saiu da sala anônimo.", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(data[0].roomA, { text: "Seu parceiro saiu da sala anônimo.", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(data[0].roomA, { text: "Seu parceiro saiu da sala anônimo." })
        }
        m.reply("Você saiu do quarto anônimo.") 
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomA == m.chat && data[0].roomB == "") {
        m.reply("Você saiu do quarto anônimo.") 
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomB == m.chat && data[0].roomA == "") {
        m.reply("Você saiu do quarto anônimo.") 
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