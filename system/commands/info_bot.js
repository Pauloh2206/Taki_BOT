const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["infobot"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "\`\`\`「  INFO BOT  」\`\`\`\n\n"
        teks += ` *•* *Nome Bot* : ${m.botName}\n`
        teks += ` *•* *Numero Bot* : @${m.botNumber.split("@")[0]}\n`
        teks += ` *•* *Numero dono* : @${m.ownerNumber}\n`
        teks += ` *•* *Nome Dono* : ${m.ownerName}\n`
        teks += ` *•* *Grupo Official* : ${config.linkGroup}\n`
        teks += ` *•* *Tipo Menu* : ${config[m.botNumber]?.setmenu}\n`
        teks += ` *•* *Tipo Prefix* : ${config[m.botNumber]?.setprefix}\n`
        teks += ` *•* *Tipo Resposta* : ${config[m.botNumber]?.replytype}\n`
        teks += ` *•* *Modo* : ${config[m.botNumber]?.mode}\n`
        teks += ` *•* *Auto* : ${config[m.botNumber]?.auto}\n`
        teks += ` *•* *Comando de Bloqueio Automático* : ${config[m.botNumber]?.autoblockcmd? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Auto Report : ${config[m.botNumber]?.autoreport? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Auto Bio : ${config[m.botNumber]?.autobio? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Auto Sticker : ${config[m.botNumber]?.autosticker? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Auto Respon : ${config[m.botNumber]?.autorespon? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Auto Read : ${config[m.botNumber]?.autoread? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Auto Vn : ${config[m.botNumber]?.autovn? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Auto Level : ${config[m.botNumber]?.autolevel? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Auto Join : ${config[m.botNumber]?.autojoin? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Anti Call : ${config[m.botNumber]?.anticall? "ON✅" : "OFF❌"}\n`  
        teks += ` *•* Anti Spam : ${config[m.botNumber]?.antispam? "ON✅" : "OFF❌"}`  
        await m.reply(teks)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})