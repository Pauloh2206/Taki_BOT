const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["defbienvenida"],
    minArgs: 1,
    expectedArgs: "<texto/clave>",
    example: "{prefix}{command} *Bem-vindo @{users} ao grupo {groupName} não esqueça de ler a descrição do grupo {desc}@add*",
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, isQuotedText, prefix, command }) => {
        if (!db.chats[m.chat].welcome) return m.reply("As boas-vindas ainda não foram ativadas")
        const data = Object.keys(db.chats[m.chat].setwelcome).map((x) => "@" + x).filter((x) => m.text.includes(x))
        if (data[0] == "@add") {
        db.chats[m.chat].setwelcome.add = (m.text.split("@add")[0] == "" && isQuotedText)? m.quoted.budy : (m.text.split("@add")[0] == "" && m.text.split("@add")[1] !== "")? m.text.split("@add")[1] : (m.text.split("@add")[0] !== "" && m.text.split("@add")[1] == "")? m.text.split("@add")[0] : ""
        m.reply(`As boas-vindas foram alteradas, se você quiser alterar o tipo de mensagem de boas-vindas, use ${prefix + command} image\n\nPALAVRAS CHAVES\n- image\n- context\n- text`)
        } else if (data[0] == "@remove") {
        db.chats[m.chat].setwelcome.remove = (m.text.split("@remove")[0] == "" && isQuotedText)? m.quoted.budy : (m.text.split("@remove")[0] == "" && m.text.split("@remove")[1] !== "")? m.text.split("@remove")[1] : (m.text.split("@remove")[0] !== "" && m.text.split("@remove")[1] == "")? m.text.split("@remove")[0] : ""
        m.reply(`A saída foi alterada, se você quiser alterar o tipo de mensagem de saída, use ${prefix + command} image\n\ PALAVRAS CHAVES\n- image\n- context\n- text`)
        } else if (data[0] == "@promote") {
        db.chats[m.chat].setwelcome.promote = (m.text.split("@promote")[0] == "" && isQuotedText)? m.quoted.budy : (m.text.split("@promote")[0] == "" && m.text.split("@promote")[1] !== "")? m.text.split("@promote")[1] : (m.text.split("@promote")[0] !== "" && m.text.split("@promote")[1] == "")? m.text.split("@promote")[0] : ""
        m.reply(`A promoção foi alterada, caso queira alterar o tipo de mensagem promocional utilize ${prefix + command} image\n\nPALAVRAS CHAVES\n- image\n- context\n- text`)
        } else if (data[0] == "@demote") {
        db.chats[m.chat].setwelcome.demote = (m.text.split("@demote")[0] == "" && isQuotedText)? m.quoted.budy : (m.text.split("@demote")[0] == "" && m.text.split("@demote")[1] !== "")? m.text.split("@demote")[1] : (m.text.split("@demote")[0] !== "" && m.text.split("@demote")[1] == "")? m.text.split("@demote")[0] : ""
        m.reply(`A degradação foi alterada, se você quiser alterar o tipo de mensagem de gradiente, use ${prefix + command} image\n\PALAVRAS CHAVES\n- image\n- context\n- text`)
        } else if (m.text == "image") {
        if (db.chats[m.chat].welcometype == "image") return m.reply("Já ativo") 
        db.chats[m.chat].welcometype = "image"
        m.reply("Tipo de boas-vindas alterado para imagem")
        } else if (m.text == "context") {
        if (db.chats[m.chat].welcometype == "context") return m.reply("Já ativo") 
        db.chats[m.chat].welcometype = "context"
        m.reply("Tipo de boas-vindas alterado para com texto")
        } else if (m.text == "text") {
        if (db.chats[m.chat].welcometype == "text") return m.reply("Já ativo") 
        db.chats[m.chat].welcometype = "text"
        m.reply("Tipo de boas-vindas alterado para texto")
        } else {
        m.reply("chaves de mensagem :\n\n@add\n@remove\n@promote\n@demote")
        }       
    }
}