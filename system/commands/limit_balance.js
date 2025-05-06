const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["addlimit","addbalance","kuranglimit","kurangbalance"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command }) => {
        if (!m.input) return m.reply("Nome de entrada")
        if (m.input.startsWith("08")) return m.reply("Use o código do seu país")
        if (!Object.keys(db.users).includes(m.input)) return m.reply("Esse número não está no banco de dados mana")
        if (Object.keys(db.database).includes(m.sender)) {
        if (db.database[m.sender].command !== command) { db.database[m.sender].command = command }
        if (db.database[m.sender].id !== m.input) { db.database[m.sender].id = m.input }
        if (db.database[m.sender].expired !== "") { db.database[m.sender].expired = "" }
        } else {
        db.database[m.sender] = { command, id: m.input, expired: "" }
        }
        m.reply("Quantia?") 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})