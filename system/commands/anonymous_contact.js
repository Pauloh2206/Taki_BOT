const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["tomarcontato"],
    cooldown: 13,
    isSewa: true,
    isPrivate: true,
    callback: async ({ sock, m }) => {
        const data = db.anonymous.filter((x) => (x.roomA == m.chat || x.roomB == m.chat))
        if (data.length == 0) return m.reply("você não está na sala anônima.")
        if (!data[0].isChat) return m.reply("Você ainda não encontrou um usuário anônimo.")
        if (data[0].roomA == m.chat) {
        let name = Object.keys(db.users).includes(data[0].roomB)? db.users[data[0].roomB].name : "sem nome"
        sock.sendContact(m.chat, data[0].roomB.split("@")[0], name, m)
        } else if (data[0].roomB == m.chat) {
        let name = Object.keys(db.users).includes(data[0].roomA)? db.users[data[0].roomA].name : "sem nome"
        sock.sendContact(m.chat, data[0].roomA.split("@")[0], name, m)
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