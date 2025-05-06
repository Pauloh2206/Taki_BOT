const fs = require("fs")
const chalk = require("chalk") 
const stable = require("json-stable-stringify") 
const data = JSON.parse(fs.readFileSync("./settings.json"))

const config = {
    ownerNumber: data.ownerNumber, 
    ownerName: data.ownerName, 
    botName: data.botName, 
    openAiKey: data.openAiKey, 
    removebgKey: data.removebgKey, 
    vipSewa: data.vipSewa, 
    linkGroup: data.linkGroup, 
    logonya: data.logonya, 
    thumbnailDok: data.thumbnailDok, 
    thumbnailVid: data.thumbnailVid, 
    limitAwal: data.limitAwal, 
    ...(data)
}
setInterval(async () => {
await fs.writeFileSync("./settings.json", stable(config))
}, 3000)


module.exports = config


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
    delete require.cache[file]
    require(file)
})