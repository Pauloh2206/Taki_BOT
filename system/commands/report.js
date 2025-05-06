const fs = require("fs") 
const chalk = require("chalk")
const { calender } = require("@libs/function")
module.exports = {
    commands: ["reportar"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<texto>",
    example: "{prefix}{command} há um erro no menu",
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "\`\`\`「 REPORTE 」\`\`\`\n\n"
        teks += `⭔ *De* : @${m.senderNumber}\n`
        teks += `⭔ *Fecha* : ${calender}\n`
        teks += `⭔ *Hora* : ${m.timeWib}\n`
        teks += `⭔ *Error* : ${m.text}`
        m.reply(teks, m.ownerNumber + "@s.whatsapp.net")
        m.reply("O relatório foi enviado")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})