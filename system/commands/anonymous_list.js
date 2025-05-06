const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listanon"],
    cooldown: 13,
    isSewa: true,
    isPremium: true,
    callback: async ({ m }) => {
        let data = db.anonymous
        let teks = "\`\`\`「 LISTA CHAT ANÔNIMO 」\`\`\`\n\n"
        for (let x of data) {
        teks += ` *•* Sala A : ${x.roomA !== ""? ("@" + x.roomA.split("@")[0]) : ""}\n *•* Sala B : ${x.roomB !== ""? ("@" + x.roomB.split("@")[0]) : ""}\n *•* Status : ${x.isChat? "CHATTING" : "WAITING"}\n\n────────────────\n\n`
        }
        teks += `\n\n*Totalmente lá : ${data.length}*`
        m.reply(teks)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})