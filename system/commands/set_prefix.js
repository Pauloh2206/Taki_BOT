const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["defprefijo"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "yes" || m.args[0] == "1") {
        if (config[m.botNumber].setprefix == "yes") return m.reply("já ativo")
        config[m.botNumber].setprefix = "yes"
        await m.reply("Alterado para prefixo único")
        } else if (m.args[0] == "noo" || m.args[0] == "2") {
        if (config[m.botNumber].setprefix == "noo") return m.reply("já ativo")
        config[m.botNumber].setprefix = "noo"
        await m.reply("Removido o prefixo do bot")
        } else if (m.args[0] == "all" || m.args[0] == "3") {
        if (config[m.botNumber].setprefix == "all") return m.reply("já ativo")
        config[m.botNumber].setprefix = "all"
        await m.reply("Prefixo alterado para todos os prefix")
        } else {
        m.reply("\`\`\`「 CONFIGURAR PREFIXO 」\`\`\`\n\n1. yes\n2. noo\n3. all")
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