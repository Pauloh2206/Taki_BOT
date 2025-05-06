const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["addowner","aggmod"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m, command }) => {
        if (!m.input) return m.reply("Digite o número")
//        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("esse número não está mais ativo")
        if (m.input == (db.devoloper + "@s.whatsapp.net")) return m.reply("Esse é o número do meu desenvolvedor")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("O usuário é o proprietário")
        if (Object.keys(db.expired[m.botNumber].vip).includes(m.input)) return m.reply("O usuário já é premium")
        if (Object.keys(db.expired[m.botNumber].owner).includes(m.input)) return m.reply("O usuário já é premium")
//        if (Object.keys(db.expired[m.botNumber].premium).includes(m.input) && db.expired[m.botNumber].premium[m.input].expired == "INFINITY") {
        if (Object.keys(db.database).includes(m.sender)) {
        if (db.database[m.sender].command !== command) { db.database[m.sender].command = command }
        if (db.database[m.sender].id !== m.input) { db.database[m.sender].id = m.input }
        if (db.database[m.sender].expired !== "") { db.database[m.sender].expired = "" }
        } else {
        db.database[m.sender] = { command, id: m.input, expired: "" }
        }        
        m.reply("\`\`\`「 ADICIONAR MODERAÇÃO 」\`\`\`\n\n1 = PERMANENTE\n2 = ANOS\n3 = MESES\n4 = SEMANAS\n5 = DIAS\n6 = HORAS\n7 = MINUTOS\n8 = SEGUNDOS")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})