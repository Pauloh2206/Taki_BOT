const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["gc","group"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupMetadata }) => {
        if (m.args[0] == "close" || m.args[0] == "2") {
        if (groupMetadata.announce == true) return m.reply("O grupo foi fechado")
        sock.groupSettingUpdate(m.chat, "announcement")
        m.reply("O grupo foi encerrado com sucesso, agora apenas o administrador pode enviar mensagens")
        } else if (m.args[0] == "open" || m.args[0] == "1") {
        if (groupMetadata.announce == false) return m.reply("O grupo foi aberto")
        sock.groupSettingUpdate(m.chat, "sem_anúncios")
        m.reply("Sucesso ao abrir o grupo, agora todos podem enviar mensagens")
        } else {
        m.reply("\`\`\`「 GRUPO OPEN/CLOSE 」\`\`\`\n\n1. open\n2. close")
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