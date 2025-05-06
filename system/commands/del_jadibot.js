const fs = require("fs") 
const chalk = require("chalk")
const { stoopedToServer } = require("@libs/whatsapp-server")
module.exports = {
    commands: ["deljadibot"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async({ sock, m }) => {
        const listSession = fs.readdirSync("./connections").filter((x) => !x.includes("session")).map((x) => x + "@s.whatsapp.net")
        const data = listSession.filter((x) => (m.input == x || !isNaN(m.text) && listSession[Number(m.text) - 1] == x))
        if (data.length == 1) {
        stoopedToServer(sock, data[0])
        m.reply("Exclusão com sucesso " + data[0].split("@")[0])
        } else {
        if (listSession.length == 0) return m.reply("Ainda está vazio, irmão")
        let teks = "\`\`\`「 APAGAR TORNE-SE UM BOT 」\`\`\`\n\n"
        let dataId = 1
        for (let x of listSession) {
        teks += `${dataId++}. ${x.split("@")[0]}\n`
        }
        m.reply(teks)
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