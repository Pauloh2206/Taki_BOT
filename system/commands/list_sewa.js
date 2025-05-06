const fs = require("fs") 
const chalk = require("chalk")
const ms = require("parse-ms")
const moment = require("moment-timezone")
module.exports = {
    commands: ["listsewa"],
    cooldown: 13,
    isSewa: true,
    isPremium: true, 
    callback: async ({ sock, m }) => {
        let teks = "\`\`\`「 LIST SEWA 」\`\`\`\n\n"
        let dataGroup = Object.keys(await sock.groupFetchAllParticipating())
        let dataSewa = Object.keys(db.expired[m.botNumber].sewa).filter((x) => dataGroup.includes(x))
        let dataNull = Object.keys(db.expired[m.botNumber].sewa).filter((x) => !dataGroup.includes(x))
        for(let x of dataNull) {
        delete db.expired[m.botNumber].sewa[x]
        }
        for (let x of dataSewa) {
        try{
        var groupMetadata = await sock.groupMetadata(x)
        } catch {
        var groupMetadata = { subject: "Não conhecido", owner: undefined, creation: 0, participants: [] }
        }
        if (groupMetadata.participants.filter((x) => x.admin !== null).map((x) => x.id).includes(m.botNumber)) {
        try{
        var linkGroup = "https://chat.whatsapp.com/" + (await sock.groupInviteCode(x))
        } catch {
        var linkGroup = "Grupo de links inválido!"
        }
        var url = linkGroup
        } else {
        var url = "Botz não é Admin"
        }
        let cekvip = db.expired[m.botNumber].sewa[x].expired == "INFINITY"? "PERMANENT" : `${ms(db.expired[m.botNumber].sewa[x].expired - Date.now()).days} days, ${ms(db.expired[m.botNumber].sewa[x].expired - Date.now()).hours} hours, ${ms(db.expired[m.botNumber].sewa[x].expired - Date.now()).minutes} minutes, ${ms(db.expired[m.botNumber].sewa[x].expired - Date.now()).seconds} seconds`
        teks += ` *•* Name Grupo : ${groupMetadata.subject}\n *•* Proprietário : ${groupMetadata.owner !== undefined ? "@" + groupMetadata.owner.split("@")[0] : "Tidak diketahui"}\n *•* Criação : ${moment(groupMetadata.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n *•* Total de membros : ${groupMetadata.participants.length}\n *•* Date : ${db.expired[m.botNumber].sewa[x].date}\n *•* Expirado : ${cekvip}\n *•* Link : ${url}\n\n────────────────\n\n`
        }
        teks += `\n*Total : ${dataSewa.length}*`
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