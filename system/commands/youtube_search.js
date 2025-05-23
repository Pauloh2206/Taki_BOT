const fs = require("fs") 
const chalk = require("chalk")
const { Client } = require("youtubei")
const youtube = new Client()
module.exports = {
    commands: ["yts"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<texto>",
    example: "{prefix}{command} tuf tuf vapo vapo",
    isSewa: true,
    callback: async ({ m }) => {
        youtube.search(m.text, { type: "video" }).then((res) => {
        const result = res.map((x) => { return { id: x.id, title: x["title"], duration: x["duration"], views: x["viewCount"], thumbnail: x.thumbnails[0].url.split("?")[0] } })
        let teks = "\`\`\`「 PESQUISA DE YT 」\`\`\`\n\n"
        for (let x of result.slice(0, 5)) {
        teks += `⭔ *Titulo* : ${x.title}\n`
        teks += `⭔ *Duração* : ${x.duration}\n`
        teks += `⭔ *Visualizações* : ${x.views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`
        teks += `⭔ *Link* : https://www.youtube.com/watch?v=${x.id}\n\n────────────────────────\n\n`
        }
        m.reply(teks)
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