const fs = require("fs") 
const chalk = require("chalk")
const { youtube } = require("@libs/scrapper")
module.exports = {
    commands: ["ytmp4"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://youtu.be/sIqINsoTMx8",
    isSewa: true,
    isWait: true,
    callback: async ({ sock, m }) => {
        if (m.text.includes("https://youtube.com/channel/")) return m.reply("Isso é um link de canal humano idiota")
        if (m.text.includes("https://www.youtube.com/watch?v=") && m.text.split(".com/")[0] == "https://www.youtube" && m.text.split("watch?v=")[1] !== "") {
        var link = m.args[0]
        } else if (m.text.includes("https://youtu.be/") && m.text.split("youtu.be/")[0] == "https://" && m.text.split("youtu.be/")[1] !== "") {
        var link = "https://www.youtube.com/watch?v=" + m.text.split("https://youtu.be/")[1]
        } else if (m.text.includes("https://youtube.com/watch?v=") && m.text.split(".com/")[0] == "https://youtube" && m.text.split("watch?v=")[1] !== "") {
        var link = "https://www.youtube.com/watch?v=" + m.text.split("https://youtube.com/watch?v=")[1]
        } else if (m.text.includes("https://youtube.com/shorts/") && m.text.split(".com/")[0] == "https://youtube" && m.text.split("shorts/")[1] !== "") {
        var link = "https://www.youtube.com/watch?v=" + m.text.split("https://youtube.com/shorts/")[1]
        } else return m.reply("Error link")
        const result = await youtube(link, "mp4")
        if (parseInt(result.size) > 10) return m.reply("Não tenho como enviar algo pesado, desculpe")
        sock.sendMessage(m.chat, { video: { url: result.link }, mimetype: "video/mp4" }, { quoted: m })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})