const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["add","remove","promote","demote"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupAdmins, participants, command }) => {
        if (!m.input) return m.reply("Nome de entrada")
        if (m.input.startsWith("08")) return m.reply("Use o código do seu país")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("Esse número não está mais ativo")
        if (command == "add") {
        if (participants.map((x) => x.id).includes(m.input)) return m.reply("Já faz parte do grupo") 
        } else if (command == "remove") {
        if (!participants.map((x) => x.id).includes(m.input)) return m.reply("Este número não é membro do grupo") 
        } else if (command == "promote") {
        if (!participants.map((x) => x.id).includes(m.input)) return m.reply("Este número não é membro do grupo") 
        if (groupAdmins.includes(m.input)) return m.reply("O número tornou-se administrador") 
        } else if (command == "demote") {
        if (!participants.map((x) => x.id).includes(m.input)) return m.reply("Este número não é membro do grupo") 
        if (!groupAdmins.includes(m.input)) return m.reply("O número ainda não é um administrador") 
        }        
        sock.groupParticipantsUpdate(m.chat, [m.input], command).then((results) => {
        if (results[0].status == 200 || results[0].status == "200") {
        m.reply(`Success ${command} @${m.input.split("@")[0]}`)
        } else {
        m.reply(`Gagal ${command} @${m.input.split("@")[0]}`)
        }
        }) 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})