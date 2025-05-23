const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["setmenu"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "viewonce" || m.args[0] == "1") {
        if (config[m.botNumber].setmenu == "viewonce") return m.reply("Já ativo")
        config[m.botNumber].setmenu = "viewonce"
        m.reply("Sucesso ao mudar o menu do bot para ver uma vez")
        } else if (m.args[0] == "image" || m.args[0] == "2") {
        if (config[m.botNumber].setmenu == "image") return m.reply("Já ativo")
        config[m.botNumber].setmenu = "image"
        m.reply("Sucesso ao mudar o menu do bot para imagem")
        } else if (m.args[0] == "gif" || m.args[0] == "3") {
        if (config[m.botNumber].setmenu == "gif") return m.reply("Já ativo")
        config[m.botNumber].setmenu = "gif"
        m.reply("Sucesso ao mudar o menu do bot para gif")
        } else if (m.args[0] == "video" || m.args[0] == "4") {
        if (config[m.botNumber].setmenu == "video") return m.reply("Já ativo")
        config[m.botNumber].setmenu = "video"
        m.reply("Sucesso ao mudar o menu do bot para vídeo")
        } else if (m.args[0] == "document" || m.args[0] == "5") {
        if (config[m.botNumber].setmenu == "document") return m.reply("Já ativo")
        config[m.botNumber].setmenu = "document"
        m.reply("Sucesso ao alterar o menu do bot para documento")
        } else if (m.args[0] == "context" || m.args[0] == "6") {
        if (config[m.botNumber].setmenu == "context") return m.reply("Já ativo")
        config[m.botNumber].setmenu = "context"
        m.reply("Sucesso ao mudar o menu do bot para o contexto")
        } else {
        m.reply("\`\`\`「 CONFIGURAÇÕES MENU BOT 」\`\`\`\n\n1. viewonce\n2. image\n3. gif\n4. video\n5. document\n6. context") 
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