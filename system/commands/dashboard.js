const fs = require("fs") 
const chalk = require("chalk")
const { toFirstCase, runtime } = require("@libs/function")
module.exports = {
    commands: ["dashboard"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let succes = 0
        let failed = 0
        for (let x of Object.keys(db.dashboard)) {
        succes += db.dashboard[x].succes
        failed += db.dashboard[x].failed
        }
        let teks = "*Painel*\n\n"
        teks += `*Tempo de execução* : ${runtime(process.uptime())}\n\n`
        teks += "*Comandos Hoje*\n"
        for (let x of Object.keys(db.dashboard)) {
        teks += `*•* ${toFirstCase(x)} : ${Number(db.dashboard[x].succes) + Number(db.dashboard[x].failed)}\n`
        }
        teks += `\n*Total* : ${Object.keys(db.dashboard).length}\n\n`
        teks += "*Status do comando*\n"
        teks += ` *•* Sucesso : ${succes}\n`
        teks += ` *•* Fracassado : ${failed}\n\n`
        teks += "*Comando falhou*\n"
        for (let x of Object.keys(db.dashboard)) {
        teks += `${db.dashboard[x].failed > 0? " *•* " + toFirstCase(x) + " : " + Number(db.dashboard[x].failed) + "\n" : ""}`
        }
        m.reply(teks) 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})