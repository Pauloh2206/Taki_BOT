const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms")
module.exports = {
    commands: ["closetime"],
    cooldown: 13,
    minArgs: 2,
    expectedArgs: "<time>",
    example: "{prefix}{command} 1 menit",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupMetadata }) => {
        if (!isNaN(parseFloat(m.text)) && m.text.includes("detik")) {
        var timer = toMs(`${parseFloat(m.text)}s`)
        } else if (!isNaN(parseFloat(m.text)) && m.text.includes("menit")) {
        var timer = toMs(`${parseFloat(m.text)}m`)
        } else if (!isNaN(parseFloat(m.text)) && m.text.includes("jam")) {
        var timer = toMs(`${parseFloat(m.text)}h`)
        } else if (!isNaN(parseFloat(m.text)) && m.text.includes("hari")) {
        var timer = toMs(`${parseFloat(m.text)}d`)
        } else return m.reply("\`\`\`「 FECHAR GRUPO HORÁRIO 」\`\`\`\n\n1. detik\n2. menit\n3. jam\n4. hari") 
        if (!groupMetadata.announce) sock.groupSettingUpdate(m.chat, "anúncio")
        m.reply("O tempo de fechamento começa a partir de agora")
        setTimeout(() => {
        sock.groupSettingUpdate(m.chat, "sem_anúncio")
        m.reply("Sucesso ao abrir o grupo, agora todos podem enviar mensagens")
        }, Number(timer))
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})