const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delvn","delvm"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        const listVoice = fs.readdirSync("./temp").filter((x) => (x.includes(".mp3") || x.includes(".opus")))
        const data = listVoice.filter((x) => (x.includes(m.text) || !isNaN(m.text) && listVoice[Number(m.text) - 1] == x))
        if (data.length == 1) {
        fs.unlinkSync("./temp/" + data[0])
        await m.reply("Sucesso ao apagar o vn " + data[0])
        } else {
        if (listVoice.length == 0) return m.reply("Ainda está vazio irmão")
        let teks = "\`\`\`「 APAGAR MENSAGEM DE VOZ 」\`\`\`\n\n"
        let dataId = 1
        for (let x of listVoice) {
        teks += `${dataId++}. ${x.includes(".mp3")? x.split(".webp") : x.split(".opus")}\n`
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