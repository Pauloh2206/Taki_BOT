const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["eliminarosacar"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<texto>",
    example: "{prefix}{command} eliminar@antilink",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        const data = Object.keys(db.chats[m.chat].rord).map((x) => "@" + x).filter((x) => m.text.includes(x))
        if (data.length == 1 && data[0] == "@antilink") {
        if (db.chats[m.chat].antilink == false) return m.reply("A função ainda não está ativa") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antilink == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilink = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antilink == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilink = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antilink == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antilink = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antilinkyt") {
        if (db.chats[m.chat].antilinkyt == false) return m.reply("Recurso anti link youtube Ainda não ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antilinkyt == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkyt = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antilinkyt == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkyt = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antilinkyt == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkyt = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antilinkfb") {
        if (db.chats[m.chat].antilinkfb == false) return m.reply("O recurso anti-link do Facebook ainda não está ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antilinkfb == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkfb = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antilinkfb == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkfb = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antilinkfb == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkfb = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antilinkig") {
        if (db.chats[m.chat].antilinkig == false) return m.reply("O recurso anti-link do Instagram ainda não está ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antilinkig == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkig = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antilinkig == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkig = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antilinkig == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkig = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antilinktele") {
        if (db.chats[m.chat].antilinktele == false) return m.reply("O recurso de link anti-telegram ainda não está ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antilinktele == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinktele = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antilinktele == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinktele = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antilinktele == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinktele = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antilinkwa") {
        if (db.chats[m.chat].antilinkwa == false) return m.reply("O recurso anti-link do WhatsApp ainda não está ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antilinkwa == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkwa = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antilinkwa == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkwa = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antilinkwa == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinkwa = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antilinktiktok") {
        if (db.chats[m.chat].antilinktiktok == false) return m.reply("O recurso de link anti-tiktok ainda não está ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antilinktiktok == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinktiktok = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antilinktiktok == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinktiktok = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antilinktiktok == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinktiktok = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antilinktwitter") {
        if (db.chats[m.chat].antilinktwitter == false) return m.reply("O recurso anti-link do Twitter ainda não está ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antilinktwitter == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinktwitter = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antilinktwitter == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinktwitter = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antilinktwitter == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antilinktwitter = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antivirtex") {
        if (db.chats[m.chat].antivirtex == false) return m.reply("Recurso antivirtex Ainda não ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antivirtex == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antivirtex = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antivirtex == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antivirtex = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antivirtex == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antivirtex = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antitag") {
        if (db.chats[m.chat].antitag == false) return m.reply("O recurso anti-tag ainda não está ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antitag == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antitag = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antitag == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antitag = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antitag == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antitag = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antitoxic") {
        if (db.chats[m.chat].antitoxic == false) return m.reply("Recurso anti tóxico Ainda não ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antitoxic == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antitoxic = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antitoxic == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antitoxic = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antitoxic == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antitoxic = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else if (data.length == 1 && data[0] == "@antisange") {
        if (db.chats[m.chat].antisange == false) return m.reply("O recurso anti-sangramento ainda não está ativo") 
        if (m.text.includes("eliminar")) {
        if (db.chats[m.chat].rord.antisange == "eliminar") return m.reply("já ativo")
        db.chats[m.chat].rord.antisange = "eliminar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("sacar")) {
        if (db.chats[m.chat].rord.antisange == "sacar") return m.reply("já ativo")
        db.chats[m.chat].rord.antisange = "sacar"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("todo")) {
        if (db.chats[m.chat].rord.antisange == "todo") return m.reply("já ativo")
        db.chats[m.chat].rord.antisange = "todo"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 AÇÃO 」\`\`\`\n\n- eliminar\n- sacar\n- todo")
        } else {
        m.reply("*ANTILINK CHAVES*\n- @antilink\n- @antilinkyt\n- @antilinkfb\n- @antilinkig\n- @antilinktele\n- @antilinkwa\n- @antilinktiktok\n- @antilinktwitter\n- @antivirtex\n- @antitag\n- @antitoxic\n- @antisange\n\n*AÇÃO*\n- eliminar\n- sacar\n- todo")
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