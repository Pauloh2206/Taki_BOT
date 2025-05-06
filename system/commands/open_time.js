const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms")
module.exports = {
    commands: ["opentime"],
    cooldown: 13,
    minArgs: 2,
    expectedArgs: "<time>",
    example: "{prefix}{command} 1 minuto",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupMetadata }) => {
        if (!isNaN(parseFloat(m.text)) && m.text.includes("segundo")) {
        var timer = toMs(`${parseFloat(m.text)}s`)
        } else if (!isNaN(parseFloat(m.text)) && m.text.includes("minuto")) {
        var timer = toMs(`${parseFloat(m.text)}m`)
        } else if (!isNaN(parseFloat(m.text)) && m.text.includes("horas")) {
        var timer = toMs(`${parseFloat(m.text)}h`)
        } else if (!isNaN(parseFloat(m.text)) && m.text.includes("dia")) {
        var timer = toMs(`${parseFloat(m.text)}d`)
        } else return m.reply("\`\`\`「 OPEN TIME GROUP 」\`\`\`\n\n1. segundo\n2. minuto\n3. horas\n4. dia") 
        if (groupMetadata.announce) sock.groupSettingUpdate(m.chat, "não anuncie")
        m.reply("O tempo aberto começa a partir de agora")
        setTimeout(() => {
        sock.groupSettingUpdate(m.chat, "announcement")
        m.reply("O grupo foi encerrado com sucesso, agora apenas o administrador pode enviar mensagens")
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