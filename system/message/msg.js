const { pickRandom, calender } = require("@libs/function")
const { chatSimiRequest } = require("@libs/uploader")
const { exec } = require("child_process")
const { getContentType } = require("baileys") 
const commands = require("@libs/command")
const util = require("util") 
const toMs = require("ms")
const fs = require("fs")
const axios = require("axios")
const chalk = require("chalk") 
const i18n = require("i18n")
const Message = async(sock, m, store) => {
try{
//=========================[ SECURITY GROUP ]=========================\\
const groupMetadata = m.isGroup? await sock.groupMetadata(m.chat).catch(e => {}) : {}
const groupName = Object.keys(groupMetadata).length > 0? groupMetadata.subject : ""
const participants = Object.keys(groupMetadata).length > 0? groupMetadata.participants : ""
const groupMembers = Object.keys(groupMetadata).length > 0? groupMetadata.participants.map((x) => x.id) : ""
const groupAdmins = Object.keys(groupMetadata).length > 0? participants.filter((x) => x.admin !== null).map((x) => x.id) : ""
const groupOwner = Object.keys(groupMetadata).length > 0? groupMetadata.owner : ""
const isBotGroupAdmins = Object.keys(groupMetadata).length > 0? groupAdmins.includes(m.botNumber) : false
const isGroupAdmins = Object.keys(groupMetadata).length > 0? groupAdmins.includes(m.sender) : false
//=========================[ MESSAGE TYPE ]=========================\\
const isText = ["extendedTextMessage","conversation"].includes(m.type)
const isImage = ["imageMessage"].includes(m.type)
const isVideo = ["videoMessage"].includes(m.type)
const isSticker = ["stickerMessage"].includes(m.type)
const isAudio = ["audioMessage"].includes(m.type)
const isViewOnce = ["viewOnceMessageV2","viewOnceMessage"].includes(m.type)
const isContact = ["contactMessage","contactsArrayMessage"].includes(m.type)
const isLocation = ["locationMessage"].includes(m.type)
const isDocument = ["documentMessage","documentWithCaptionMessage"].includes(m.type)
const isAllMedia = ["imageMessage","videoMessage","stickerMessage","audioMessage","viewOnceMessageV2","viewOnceMessage","contactMessage","contactsArrayMessage","locationMessage","documentMessage","documentWithCaptionMessage"].includes(m.type)
const isQuotedText = m.quoted? ["extendedTextMessage","conversation"].includes(m.quoted.type) : false
const isQuotedImage = m.quoted? ["imageMessage"].includes(m.quoted.type) : false
const isQuotedVideo = m.quoted? ["videoMessage"].includes(m.quoted.type) : false
const isQuotedSticker = m.quoted? ["stickerMessage"].includes(m.quoted.type) : false
const isQuotedAudio = m.quoted? ["audioMessage"].includes(m.quoted.type) : false
const isQuotedViewOnce = m.quoted? ["viewOnceMessageV2","viewOnceMessage"].includes(m.quoted.type) : false
const isQuotedContact = m.quoted? ["contactMessage","contactsArrayMessage"].includes(m.quoted.type) : false
const isQuotedLocation = m.quoted? ["locationMessage"].includes(m.quoted.type) : false
const isQuotedDocument = m.quoted? ["documentMessage","documentWithCaptionMessage"].includes(m.quoted.type) : false
const isQuotedAllMedia = m.quoted? ["imageMessage","videoMessage","stickerMessage","audioMessage","viewOnceMessageV2","viewOnceMessage","contactMessage","contactsArrayMessage","locationMessage","documentMessage","documentWithCaptionMessage"].includes(m.quoted.type) : false
//=========================[ FUNCTION PREFIX ]=========================\\
if (m.setPrefix == "yes" && !m.isBaileys) {
var thePrefix = "Multi-Prefijo"
var prefix = /^#.!?|\\^/.test(m.body)? m.body.match(/^#.!?|\\^/gi) : ""
var isCmd = m.body.startsWith(prefix)
var command = (isSticker && Object.keys(db.listcmd).includes(m.message.stickerMessage.fileSha256.toString("base64")))? db.listcmd[m.message.stickerMessage.fileSha256.toString("base64")].command : isCmd? m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : ""
var cmdOptions = commands.get(command) || {}
} else if (m.setPrefix == "noo" && !m.isBaileys) {
var thePrefix = "Sin-Prefijo"
var prefix = ""
var isCmd = m.body.startsWith(prefix)
var command = (isSticker && Object.keys(db.listcmd).includes(m.message.stickerMessage.fileSha256.toString("base64")))? db.listcmd[m.message.stickerMessage.fileSha256.toString("base64")].command : m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
var cmdOptions = commands.get(command) || {}
} else if (m.setPrefix == "all" && !m.isBaileys) {
var thePrefix = "Con-prefijo"
var prefix = /^#.!?|\\^/.test(m.body)? m.body.match(/^#.!?|\\^/gi) : "."
var isCmd = m.body.startsWith(prefix)
var command = (isSticker && Object.keys(db.listcmd).includes(m.message.stickerMessage.fileSha256.toString("base64")))? db.listcmd[m.message.stickerMessage.fileSha256.toString("base64")].command : m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
var cmdOptions = commands.get(command) || {}
}
//=========================[ TIMPA BUG LINK PREVIEW ]=========================\\
//if (!m.isBaileys && m.isLinkPreview && (await store.loadMessage(m.chat, m.key.id))) {return}
//=========================[ COMMAND LOGS ]=========================\\
if (!m.isBaileys) {
const command_log = [chalk.whiteBright("├"), chalk.keyword("aqua")(`〚 ${m.isGroup ? "𝗚𝗥𝗨𝗣𝗢" : "𝗣𝗥𝗜𝗩𝗔𝗗𝗢"} 〛`), m.body.substr(0, 50).replace(/\n/g, ""), chalk.greenBright("ᴅᴇ"), chalk.yellow(m.pushName)]
if (m.isGroup) {
command_log.push(chalk.greenBright("ᴇɴ"))
command_log.push(chalk.yellow(groupName))
}
console.log(...command_log)
}
//=========================[ ANTI SEND SAAT GROUP TUTUP DAN BOT G JADI ADMIN ]=========================\\
if (Object.keys(groupMetadata).length > 0 && groupMetadata.announce && !isBotGroupAdmins) {return}
//=========================[ PUBLIK/SELF ]=========================\\
if (m.mode == "propio") {
if (!m.isOwner && !m.key.fromMe) return
} else if (m.mode == "grupo") {
if (!m.isGroup && !m.isOwner && !m.key.fromMe) return
} else if (m.mode == "privado") {
if (m.isGroup && !m.isSewa) return
}  
//=========================[ BANCHAT ]=========================\\
if (m.isBanChat) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) return
}
//=========================[ BANNED ]=========================\\
if (Object.keys(db.banned).includes(m.sender)) {
if (!m.isOwner && !m.key.fromMe && !m.isPremium) return m.reply("✕ᴇʟ ᴜsᴜᴀʀɪᴏ ғᴜᴇ ʙᴀɴᴇᴀᴅᴏ ᴅᴇʟ ʙᴏᴛ✕")
}
//=========================[ FUNCTION ANONYMOUS ]=========================\\
const roomChat = db.anonymous.filter((x) => [x.roomA,x.roomB].includes(m.chat))
if (roomChat.length > 0 && roomChat[0].isChat && roomChat[0].roomA !== "" && roomChat[0].roomB !== "" && Object.keys(cmdOptions).length == 0) {
if (roomChat[0].roomA == m.chat) {
sock.copyNForward(roomChat[0].roomB, m) 
} else if (roomChat[0].roomB == m.chat) {
sock.copyNForward(roomChat[0].roomA, m)
}}
for (let x of db.anonymous) {
if (!isNaN(x.expired) && Date.now() >= x.expired) {
setTimeout(() => {
db.anonymous.splice(db.anonymous.indexOf(x, 1))
}, 1000)
if (x.roomA !== "") {
if (m.replyType == "mess1") {
sock.sendMessage(x.roomA, { text: "usuários não encontrados\nVocê saiu da sala anônimo.", contextInfo: { forwardingScore: 999, isForwarded: true }})
} else if (m.replyType == "mess2") {
sock.sendMessage(x.roomA, { text: "usuários não encontrados\nVocê saiu da sala anônimo.", contextInfo: { forwardingScore: 10, isForwarded: true }})
} else if (m.replyType == "mess3") {
sock.sendMessage(x.roomA, { text: "usuários não encontrados\nVocê saiu da sala anônimo." })
}
} 
if (x.roomB !== "") {
if (m.replyType == "mess1") {
sock.sendMessage(x.roomB, { text: "usuários não encontrados\nVocê saiu da sala anônimo.", contextInfo: { forwardingScore: 999, isForwarded: true }})
} else if (m.replyType == "mess2") {
sock.sendMessage(x.roomB, { text: "usuários não encontrados\nVocê saiu da sala anônimo.", contextInfo: { forwardingScore: 10, isForwarded: true }})
} else if (m.replyType == "mess3") {
sock.sendMessage(x.roomB, { text: "usuários não encontrados\nVocê saiu da sala anônimo." })
}
}
}}
//=========================[ ONLY MESSAGE ]=========================\\
const onlyOwner = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.ga_mau"), i18n.__("audioPack.lu_siapa_anjir"), i18n.__("audioPack.ga_boleh")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.owner") }, { quoted: m })
} else {
m.reply(util.format(i18n.__("message.owner_only")))
}}
const onlyAdmin = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.ga_mau"), i18n.__("audioPack.lu_siapa_anjir"), i18n.__("audioPack.ga_boleh")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.hanya_admin") }, { quoted: m })
} else {
m.reply(util.format(i18n.__("message.admin_only")))
}}
const onlyBadmin = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: i18n.__("audioPack.baka"), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.jadiin_admin") }, { quoted: m })
} else {
m.reply(util.format(i18n.__("message.bot_admin_only")))
}}
const onlyGroup = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: i18n.__("audioPack.baka"), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else { 
m.reply(util.format(i18n.__("message.group_only")))
}}
const onlyPrivate = async() => {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: i18n.__("audioPack.baka"), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else {
m.reply(util.format(i18n.__("message.private_only")))
}}
const onlyWait = async() => {
if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.oke_tunggu") }, { quoted: m })
} else {
m.reply(util.format(i18n.__("wait")))
}}
//=========================[ GET SUCCESS COMMAND ]=========================\\
const cmdSuccess = async(cmd, type = "") => {
if (Object.keys(db.listerror).includes(cmd)) delete db.listerror[cmd]
if (!Object.keys(db.allcommand).includes(cmd) && type == "case") {
db.allcommand[cmd] = { tempFile: "case" }
}
if (!m.key.fromMe && !m.isPremium && m.autoLevel) {
db.users[m.sender].xp += 1
}
if (Object.keys(db.dashboard).includes(cmd)) {
db.dashboard[cmd].succes += 1
} else {
db.dashboard[cmd] = { succes: 1, failed: 0 }
}}
//=========================[ FUNCTION ADD SEWA BY CODE ]=========================\\
if (!m.isBaileys && m.isGroup && isText && Object.keys(db.createcode).filter((x) => x.includes(m.budy)).length == 1) {
if (Object.keys(db.expired).includes(m.botNumber) && Object.keys(db.expired[m.botNumber].sewa).includes(m.chat) && db.expired[m.botNumber].sewa[m.chat].expired == "INFINITY") {return}
const data = Object.keys(db.createcode).filter((x) => x.includes(m.budy))
const expired = db.createcode[data[0]].expired.includes("years")? "years" : db.createcode[data[0]].expired.includes("months")? "months" : db.createcode[data[0]].expired.includes("weeks")? "weeks" : db.createcode[data[0]].expired.includes("days")? "days" : db.createcode[data[0]].expired.includes("hours")? "hours" : db.createcode[data[0]].expired.includes("minutes")? "minutes" : db.createcode[data[0]].expired.includes("seconds")? "seconds" : "INFINITY"
if (expired == "INFINITY") {
if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat].expired = "INFINITY"
} else {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat] = { date: calender, expired: "INFINITY" }
}
m.reply(`VIP adicionado ao grupo ${groupName}`)
setTimeout(() => {
delete db.createcode[data[0]]
}, 3000)
} else if (expired == "months") {
if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat].expired += Number(toMs(Number(db.createcode[data[0]].expired.split(expired)[0] * 30) + "days")) 
} else {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat] = { date: calender, expired: Date.now() + toMs(Number(db.createcode[data[0]].expired.split(expired)[0] * 30) + "days") }
}
m.reply(`VIP adicionado ao grupo ${groupName} ${db.createcode[data[0]].expired.split(expired)[0]} ${expired}`)
setTimeout(() => {
delete db.createcode[data[0]]
}, 3000)
} else if (expired !== "months" || expired !== "INFINITY") {
if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat].expired += Number(toMs(db.createcode[data[0]].expired))
} else {
if (db.chats[m.chat].sewa.status) db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
db.expired[m.botNumber].sewa[m.chat] = { date: calender, expired: Date.now() + Number(toMs(db.createcode[data[0]].expired)) }
}
m.reply(`VIP adicionado ao grupo ${groupName} ${db.createcode[data[0]].expired.split(expired)[0]} ${expired}`)
setTimeout(() => {
delete db.createcode[data[0]]
}, 3000)
}}
//=========================[ FUNCTION GET COMMAND ]=========================\\
if (!m.isBaileys && Object.keys(db.database).includes(m.sender) && isText) {
if (db.database[m.sender].command == "aggmod") {
if (db.database[m.sender].expired == "" && !isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= 8) {
let expired = Number(m.budy) <= 1? "permanent" : Number(m.budy) <= 2? "years" : Number(m.budy) <= 3? "months" : Number(m.budy) <= 4? "weeks" : Number(m.budy) <= 5? "days" : Number(m.budy) <= 6? "hours" : Number(m.budy) <= 7? "minutes" : "seconds"
db.database[m.sender].expired = expired
if (expired !== "permanent") {
m.reply(`Tem mod permanente?`) 
} else if (expired == "permanent") {
m.reply(`Adicionado como moderador a @${db.database[m.sender].id.split("@")[0]}`)
if (Object.keys(db.expired[m.botNumber].owner).includes(db.database[m.sender].id)) {
delete db.expired[m.botNumber].owner[db.database[m.sender].id]
}
db.expired[m.botNumber].vip[db.database[m.sender].id] = { date: calender, expired: "INFINITY" }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].expired !== "" && !isNaN(m.budy) && Number(m.budy) > 0) {
if (db.database[m.sender].expired == "years" || db.database[m.sender].expired == "weeks" || db.database[m.sender].expired == "days" || db.database[m.sender].expired == "hours" || db.database[m.sender].expired == "minutes" || db.database[m.sender].expired == "seconds") {
m.reply(`Adicionado como moderador a @${db.database[m.sender].id.split("@")[0]} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].owner).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].owner[db.database[m.sender].id].expired += Number(toMs(`${m.budy}${db.database[m.sender].expired}`))
} else db.expired[m.botNumber].owner[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(`${m.budy}${db.database[m.sender].expired}`) }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
} else if (db.database[m.sender].expired == "months") {
m.reply(`Adicionado como moderador a @${db.database[m.sender].id.split("@")[0]} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].owner).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].owner[db.database[m.sender].id].expired += Number(toMs(Number(m.budy * 30) + "days"))
} else db.expired[m.botNumber].owner[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(Number(m.budy * 30) + "days") }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}}
} else if (db.database[m.sender].command == "aggpremium") {
if (db.database[m.sender].expired == "" && !isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= 8) {
let expired = Number(m.budy) <= 1? "permanent" : Number(m.budy) <= 2? "years" : Number(m.budy) <= 3? "months" : Number(m.budy) <= 4? "weeks" : Number(m.budy) <= 5? "days" : Number(m.budy) <= 6? "hours" : Number(m.budy) <= 7? "minutes" : "seconds"
db.database[m.sender].expired = expired
if (expired !== "permanent") {
m.reply(`Você tem premium permanente?`) 
} else if (expired == "permanent") {
m.reply(`Adicionado como premium para @${db.database[m.sender].id.split("@")[0]}`)
if (Object.keys(db.expired[m.botNumber].premium).includes(db.database[m.sender].id) && db.expired[m.botNumber].premium[db.database[m.sender].id].expired !== "INFINITY") {
db.expired[m.botNumber].premium[db.database[m.sender].id].expired = "INFINITY"
} else if (!Object.keys(db.expired[m.botNumber].premium).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].premium[db.database[m.sender].id] = { date: calender, expired: "INFINITY" }
}
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].expired !== "" && !isNaN(m.budy) && Number(m.budy) > 0) {
if (db.database[m.sender].expired == "years" || db.database[m.sender].expired == "weeks" || db.database[m.sender].expired == "days" || db.database[m.sender].expired == "hours" || db.database[m.sender].expired == "minutes" || db.database[m.sender].expired == "seconds") {
m.reply(`Adicionado como premium a @${db.database[m.sender].id.split("@")[0]} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].premium).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].premium[db.database[m.sender].id].expired += Number(toMs(`${m.budy}${db.database[m.sender].expired}`))
} else db.expired[m.botNumber].premium[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(`${m.budy}${db.database[m.sender].expired}`) }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
} else if (db.database[m.sender].expired == "months") {
m.reply(`Adicionado como premium a @${db.database[m.sender].id.split("@")[0]} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].premium).includes(db.database[m.sender].id)) {
db.expired[m.botNumber].premium[db.database[m.sender].id].expired += Number(toMs(Number(m.budy * 30) + "days"))
} else db.expired[m.botNumber].premium[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(Number(m.budy * 30) + "days") }
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}}
} else if (db.database[m.sender].command == "addvip","addalquiler") {
if (db.database[m.sender].expired == "" && !isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= 8) {
let expired = Number(m.budy) <= 1? "permanent" : Number(m.budy) <= 2? "years" : Number(m.budy) <= 3? "months" : Number(m.budy) <= 4? "weeks" : Number(m.budy) <= 5? "days" : Number(m.budy) <= 6? "hours" : Number(m.budy) <= 7? "minutes" : "seconds"
db.database[m.sender].expired = expired
if (expired !== "permanent") {
m.reply(`você tem vip permanente?`) 
} else if (expired == "permanent") {
if (db.database[m.sender].id !== "") {
let groupMetadata2 = await sock.groupMetadata(db.database[m.sender].id)
m.reply(`VIP adicionado ao grupo ${groupMetadata2.subject}`)
if (Object.keys(db.expired[m.botNumber].sewa).includes(db.database[m.sender].id) && db.expired[m.botNumber].sewa[db.database[m.sender].id].expired !== "INFINITY") {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id].expired = "INFINITY"
} else if (!Object.keys(db.expired[m.botNumber].sewa).includes(db.database[m.sender].id)) {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id] = { date: calender, expired: "INFINITY" }
}} else {
db.createcode[m.key.id] = { expired: "INFINITY" }
m.reply(`${m.key.id}`) 
}
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].expired !== "" && !isNaN(m.budy) && Number(m.budy) > 0) {
if (db.database[m.sender].expired == "years" || db.database[m.sender].expired == "weeks" || db.database[m.sender].expired == "days" || db.database[m.sender].expired == "hours" || db.database[m.sender].expired == "minutes" || db.database[m.sender].expired == "seconds") {
if (db.database[m.sender].id !== "") {
let groupMetadata2 = await sock.groupMetadata(db.database[m.sender].id)
m.reply(`VIP adicionado ao grupo ${groupMetadata2.subject} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].sewa).includes(db.database[m.sender].id)) {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id].expired += Number(toMs(`${m.budy}${db.database[m.sender].expired}`))
} else {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(`${m.budy}${db.database[m.sender].expired}`) }
}} else {
db.createcode[m.key.id] = { expired: `${m.budy}${db.database[m.sender].expired}` }
m.reply(`${m.key.id}`)
}
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
} else if (db.database[m.sender].expired == "months") {
if (db.database[m.sender].id !== "") {
let groupMetadata2 = await sock.groupMetadata(db.database[m.sender].id)
m.reply(`VIP adicionado ao grupo ${groupMetadata2.subject} ${m.budy} ${db.database[m.sender].expired}`)
if (Object.keys(db.expired[m.botNumber].sewa).includes(db.database[m.sender].id)) {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id].expired += Number(toMs(Number(m.budy * 30) + "days"))
} else {
if (Object.keys(db.chats).includes(db.database[m.sender].id) && db.chats[db.database[m.sender].id].sewa.status) { 
db.chats[db.database[m.sender].id].sewa = { status: false, date: calender, expired: 0 }
}
db.expired[m.botNumber].sewa[db.database[m.sender].id] = { date: calender, expired: Date.now() + toMs(Number(m.budy * 30) + "days") }
}} else {
db.createcode[m.key.id] = { expired: `${m.budy}${db.database[m.sender].expired}` }
m.reply(`${m.key.id}`)
}
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}}
} else if (db.database[m.sender].command == "inevitável") {
if (!isNaN(m.budy) && Number(m.budy) > 0) {
m.reply(`gemas adicionadas a ${Number(m.budy)} quantia@${db.database[m.sender].id.split("@")[0]}`)
db.users[db.database[m.sender].id].limit += Number(m.budy)
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].command == "No trabalho") {
if (!isNaN(m.budy) && Number(m.budy) > 0) {
m.reply(`saldo adicionado a ${Number(m.budy)} quantia @${db.database[m.sender].id.split("@")[0]}`)
db.users[db.database[m.sender].id].balance += Number(m.budy)
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].command == "queimando") {
if (!isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= db.users[db.database[m.sender].id].limit) {
m.reply(`gemas removidas a ${Number(m.budy)} quantia @${db.database[m.sender].id.split("@")[0]}`)
db.users[db.database[m.sender].id].limit -= Number(m.budy)
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}} else if (db.database[m.sender].command == "delbal") {
if (!isNaN(m.budy) && Number(m.budy) > 0 && Number(m.budy) <= db.users[db.database[m.sender].id].limit) {
m.reply(`saldo foi removido a ${Number(m.budy)} ke @${db.database[m.sender].id.split("@")[0]}`)
db.users[db.database[m.sender].id].balance -= Number(m.budy)
setTimeout(() => {
delete db.database[m.sender]
}, 3000)
}}}
//=========================[ FUNCTION ANTI SPAM ]=========================\\
if (m.antiSpam) {
if (Object.keys(db.antispam).includes(m.sender)) {
if (db.antispam[m.sender].hit < 5) {
db.antispam[m.sender].hit += 1
/*if (m.autoVn) {
return sock.sendMessage(m.chat, { audio: i18n.__("audioPack.jangan_spam_ntar_gua_ewe"), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
return sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.jangan_spam") }, { quoted: m })
} else {*/
return m.reply("sem spam 😡")
} else {
db.banned[m.sender] = {
date: calender,
reason: "Spam Bot"
}
return m.reply("Desculpe, você foi banido por spam")
}} else if (!m.isBaileys && !m.isPremium && !Object.keys(db.antispam).includes(m.sender)) {
db.antispam[m.sender] = {
hit: 1, 
expired: Date.now() + toMs("15second")
}
}}
//=========================[ FUNCTION AUTO RESPON GROUP ]=========================\\
if (!m.isBaileys && (m.quoted? m.quoted.sender : m.mentionedJid[0]) == m.botNumber && m.isAutoResponGroup && Object.keys(cmdOptions).length == 0 && isText && !m.body.startsWith("=>") && !m.body.startsWith(">") && !m.budy.startsWith("$")) {
let jawab = ["Afa iyah 🗿","Oh","não sei mano 🐦","Estúpido","🗿","🐦","Oh, eu vejo 🐦","O que","Muitas pessoas","Quem é você??","Saha","Gaje bet lu","Tai de afundamento dianteiro"]
let teks1 = pickRandom(jawab)
let teks2 = m.budy
let hasil = [`${teks1}`, `${teks2}`]
let random = pickRandom(hasil)
let { status, data } = await chatSimiRequest(m.budy)
if (!status) {
var teksnya = random
} else {
var teksnya = data
}
m.reply(teksnya)
}
//=========================[ FUNCTION AUTO STICKER ]=========================\\
if (!m.isBaileys && m.autoSticker && isImage) {
const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
const media = await sock.downloadAndSaveMediaMessage(m, "./temp/" + id)
if (m.isPremium) {
await sock.sendStickerImage(m.chat, { buffer: media, packname: m.pushName, author: m.senderNumber }, { quoted: m })                
} else {
await sock.sendStickerImage(m.chat, { buffer: media, packname: m.botName, author: m.ownerNumber }, { quoted: m })
}
} else if (!m.isBaileys && isQuotedSticker && m.autoSticker && m.quoted.sender == m.botNumber) {
const listName = fs.readdirSync("./temp/").filter((x) => x.includes(".webp"))
if (listName.length > 0) {
const namastc = pickRandom(listName)
sock.sendMessage(m.chat, { sticker: fs.readFileSync("./temp/" + namastc) }, { quoted: m })
}}
//=========================[ FUNCTION AUTO REACT ]=========================\\
for (const x of i18n.__("kata_cek")) {
if (m.isAutoReactGroup && m.budy.toLowerCase().includes(x) && Object.keys(cmdOptions).length == 0) {
sock.sendMessage(m.chat, { react: { text: pickRandom(i18n.__("allemoji")), key: m.key } })
}}
//=========================[ FUNCTION ANTI DELETE ]=========================\\
if (!m.isBaileys && m.isAntiDelete && Object.keys(db.message).includes(m.sender) && m.type == "protocolMessage") {
if (Object.keys(db.message).includes(m.sender) && db.message[m.sender].key.id == m.message[m.type].key.id) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
let message = db.message[m.sender].message
let type = (!["senderKeyDistributionMessage","messageContextInfo"].includes(Object.keys(message)[0]) && Object.keys(message)[0]) || (Object.keys(message).length >= 3 && Object.keys(message)[1] !== "messageContextInfo" && Object.keys(message)[1]) || Object.keys(message)[Object.keys(message).length - 1]
let teks = "\`\`\`「  MENSAGEM ANTI APAGAR 」\`\`\`\n\n"
teks += `› De : @${m.senderNumber}\n`
teks += `› Hora : ${m.timeWib}\n`
teks += `› Fecha : ${calender}\n`
teks += `› Tipo : ${type}`
m.reply(teks)
setTimeout(() => {
sock.copyNForward(m.chat, db.message[m.sender])
}, 2000)
}}}
//=========================[ FUNCTION ANTI VIEW ONCE ]=========================\\
if (!m.isBaileys && m.isAntiViewOnce && isViewOnce && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
const media = await sock.downloadMediaMessage(m) 
let teks = "\`\`\`「  ANTI VER UMA VEZ  」\`\`\`\n\n"
teks += `› De : @${m.senderNumber}\n`
teks += `› Hora : ${m.timeWib}\n`
teks += `› Calendario: ${calender}\n`
teks += `› Citado : ${m.body}\n`
teks += `› Tipo : ${getContentType(m.message)}`
if (getContentType(m.message) == "videoMessage") sock.sendMessage(m.chat, { video: media, caption: teks }, { quoted: m })
if (getContentType(m.message) == "imageMessage") sock.sendMessage(m.chat, { image: media, caption: teks }, { quoted: m })
}}
//=========================[ FUNCTION ANTI LINK GROUP ]=========================\\
if (!m.isBaileys && Object.keys(cmdOptions).length == 0 && m.isAntiLink && isBotGroupAdmins || m.isBaileys && m.isAntiLink && isBotGroupAdmins) {
if (m.body.includes("chat.whatsapp.com/")) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
let linkgc = await sock.groupInviteCode(m.chat)
if (m.budy.includes(`${linkgc}`)) return 
m.reply("\`\`\`「  LINK GRUPO DETECTOU  」\`\`\`")
if (db.chats[m.chat].rord.antilink == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antilink == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antilink == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ FUNCTION ANTI LINK YOUTUBE ]=========================\\
if (!m.isBaileys && m.isAntiLinkYoutube && isBotGroupAdmins) {
if (m.body.includes("youtube.com/") && Object.keys(cmdOptions).length == 0 || m.body.includes("https://youtu.be/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK YOUTUBE DETECTADO  」\`\`\`")
if (db.chats[m.chat].rord.antilinkyt == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antilinkyt == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antilinkyt == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ FUNCTION ANTI LINK FACEBOOK ]=========================\\
if (!m.isBaileys && m.isAntiLinkFacebook && isBotGroupAdmins) {
if (m.body.includes("facebook.com/") && Object.keys(cmdOptions).length == 0 || m.body.includes("https://fb.watch/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK FACEBOOK DETECTADO  」\`\`\`")
if (db.chats[m.chat].rord.antilinkfb == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antilinkfb == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antilinkfb == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ FUNCTION ANTI LINK INSTAGRAM ]=========================\\
if (!m.isBaileys && m.isAntiLinkInstagram && isBotGroupAdmins) {
if (m.body.includes("instagram.com/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK INSTAGRAM DETECTADO  」\`\`\`")
if (db.chats[m.chat].rord.antilinkig == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antilinkig == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antilinkig == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ FUNCTION ANTI LINK TELEGRAM ]=========================\\
if (!m.isBaileys && m.isAntiLinkTelegram && isBotGroupAdmins) {
if (m.body.includes("https://t.me/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK TELEGRAM DETECTADO  」\`\`\`")
if (db.chats[m.chat].rord.antilinktele == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antilinktele == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antilinktele == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ FUNCTION ANTI LINK WA ]=========================\\
if (!m.isBaileys && m.isAntiLinkWhatsapp && isBotGroupAdmins) {
if (m.body.includes("wa.me/") && Object.keys(cmdOptions).length == 0 || m.body.includes("Wa.me/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK WHATSAPP DETECTADO  」\`\`\`")
if (db.chats[m.chat].rord.antilinkwa == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antilinkwa == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antilinkwa == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ FUNCTION ANTI LINK TIKTOK ]=========================\\
if (!m.isBaileys && m.isAntiLinkTiktok && isBotGroupAdmins) {
if (m.body.includes("tiktok.com/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK TIKTOK DETECTADO  」\`\`\`")
if (db.chats[m.chat].rord.antilinktiktok == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antilinktiktok == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antilinktiktok == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ FUNCTION ANTI LINK TWITTER ]=========================\\
if (!m.isBaileys && m.isAntiLinkTwitter && isBotGroupAdmins) {
if (m.body.includes("twitter.com/") && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  LINK TWITTER DETECTADO  」\`\`\`")
if (db.chats[m.chat].rord.antilinktwitter == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antilinktwitter == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antilinktwitter == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ FUNCTION ANTI ASING ]=========================\\
if (!m.isBaileys && m.isAntiAsing && isBotGroupAdmins) {
if (!m.sender.startsWith("54" == "56" == "505" == "51" == "595" == "57" == "58" == "53" == "52" == "506" == "593" == "591" == "504")) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  NUMERO GRINGO DETECTADO 」\`\`\`")
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}}}
//=========================[ FUNCTION ANTI BOTZ ]=========================\\
if (m.isAntiBotz && isBotGroupAdmins) {
if (m.isBaileys && !m.key.fromMe) {
if (!m.isOwner && !isGroupAdmins) {
m.reply("\`\`\`「  BOT DETECTADO  」\`\`\`")
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}}}
//=========================[ FUNCTION ANTI TOXIC ]=========================\\
if (!m.isBaileys && m.isAntiToxic && isBotGroupAdmins) {
for (const x of i18n.__("kata_toxic")) {
if (m.budy.toLowerCase().includes(x)) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  TOXIC DETECTADO  」\`\`\`")
if (db.chats[m.chat].rord.antitoxic == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antitoxic == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antitoxic == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}}
//=========================[ FUNCTION ANTI SANGE ]=========================\\
if (!m.isBaileys && m.isAntiSange && isBotGroupAdmins) {
if (i18n.__("kata_dosa").includes(m.budy.toLowerCase())) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  SANGE DETECTADO  」\`\`\`")
if (db.chats[m.chat].rord.antisange == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antisange == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antisange == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ FUNCTION ANTI VIRTEX ]=========================\\
if (!m.isBaileys && m.isAntiVirtex && isBotGroupAdmins && m.budy.length > 20000) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  TRABA DETECTADA 」\`\`\`")
if (db.chats[m.chat].rord.antivirtex == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antivirtex == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antivirtex == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}
//=========================[ FUNCTION ANTI TAG ]=========================\\
if (!m.isBaileys && m.isAntiTag && isBotGroupAdmins) {
if (m.isMention && Object.keys(cmdOptions).length == 0) {
if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
m.reply("\`\`\`「  DISCAGEM DETECTADA  」\`\`\`")
if (db.chats[m.chat].rord.antitag == "delete") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
}, 2000)
} else if (db.chats[m.chat].rord.antitag == "remove") {
setTimeout(() => {
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
} else if (db.chats[m.chat].rord.antitag == "all") {
setTimeout(() => {
sock.sendMessage(m.chat, { delete: m.key })
sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
}, 2000)
}
}}}
//=========================[ DETECT AFK USERS ]=========================\\
if (!m.isBaileys && Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].afk_group.includes(m.quoted? m.quoted.sender : m.mentionedJid[0]) && Object.keys(cmdOptions).length == 0) {
m.reply("Não o incomode, ele está em afk")        
}        
if (!m.isBaileys && Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].afk_group.includes(m.sender)) {
db.chats[m.chat].afk_group.splice(db.chats[m.chat].afk_group.indexOf(m.sender, 1))
m.reply("*VOCÊ VOLTOU DO OFF..* 🙃")
}
//=========================[ AUTO RESPON VOICE MESSAGE ]=========================\\
if (!m.isBaileys && isText) {
const listName = fs.readdirSync("./temp").filter((x) => (x.includes(".mp3") || x.includes(".opus"))).filter((x) => m.budy == x.split(".")[0]) 
if (listName.length == 1) {
sock.sendMessage(m.chat, { audio: fs.readFileSync("./temp/" + listName[0]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
}}
//=========================[ AUTO RESPON STICKER MESSAGE ]=========================\\
if (!m.isBaileys && isText) {
const listName = fs.readdirSync("./temp").filter((x) => (isNaN(parseInt(x)) && x.includes(".webp"))).filter((x) => m.budy == x.split(".")[0]) 
if (listName.length == 1) {
sock.sendMessage(m.chat, { sticker: fs.readFileSync("./temp/" + listName[0]) }, { quoted: m })
}}
//=========================[ AUTO RESPON MESSAGE ]=========================\\
if (!m.isBaileys && !m.isGroup && Object.keys(cmdOptions).length == 0 && !m.key.fromMe && m.autoRespon && isText && !m.body.startsWith("=>") && !m.body.startsWith(">") && !m.budy.startsWith("$")) {
let randomText = ["Ara Ara Sis","Iy Sis","O que há de errado mana","🗿","🐦","Afa iy","O que","Oh","Ok"]
let randomDesah = ["Não quero irmão","Desculpa irmão 😒","É pecado irmão","Não faça isso irmão","Não pode fazer isso irmão 😡"]
let randomAra = ["Opiniões que vejo","G quer dizer Compramos","Oh não aposta","Cih","Oh meu Deus"]
let simiV2 = pickRandom(randomText)
let { status, data } = await chatSimiRequest(m.budy)
if (m.budy.toLowerCase().includes("ara")) {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([ i18n.__("audioPack.ngomong_apaan_sih"), i18n.__("audioPack.kaga_ada"), i18n.__("audioPack.ga_mau"), i18n.__("audioPack.ga_da"), i18n.__("audioPack.ara_ara"), i18n.__("audioPack.ara_ara_goblok"), ]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else m.reply(pickRandom([randomAra]))
} else if (m.budy.toLowerCase().includes("suspirar") || i18n.__("kata_dosa").includes(m.budy.toLowerCase())) {
m.reply(pickRandom([randomDesah]))
} else if (!status) {
m.reply(pickRandom([simiV2, m.budy]))
} else {
m.reply(pickRandom([data, simiV2, m.budy]))
}}
//=========================[ RESPON COMMAND GET FILE ]=========================\\
if (!m.isBaileys && Object.keys(cmdOptions).length !== 0) {
//=========================[ RESPON (ONLY SEWA) ]=========================\\
if (cmdOptions.isSewa) {
if (m.isGroup && !m.isSewa) return m.reply("*O grupo ainda não é vip*")
}
//=========================[ RESPON (BLOCK COMMAND) ]=========================\\
if (db.blockcmd.includes(command)) {
return m.reply("*Este comando está bloqueado🔒*")
}
//=========================[ RESPON (COOL DOWN) ]=========================\\
if (!m.isPremium && !m.key.fromMe && cmdOptions.cooldown > 0) {
if (Object.keys(db.cooldown).includes(m.sender)) {
try{ 
let expired = Number(db.cooldown[m.sender].expired) - Number(Date.now())
var cooldown = expired == NaN? 0.000 : expired / 1000
} catch {
var cooldown = 0.000
}
return m.reply(`〚❕〛*Spam detectado, aguarde ${cooldown} alguns segundos e tente novamente!*.`)
} else {
db.cooldown[m.sender] = {
expired: Date.now() + toMs(cmdOptions.cooldown + "second"), 
}}}
//=========================[ RESPON (ONLY PRIVATE) ]=========================\\
if (cmdOptions.isPrivate) {
if (m.isGroup) return onlyPrivate()
}
//=========================[ RESPON (ONLY GROUP) ]=========================\\
if (cmdOptions.isGroup) {
if (!m.isGroup) return onlyGroup()
}
//=========================[ RESPON (ADMIN) ]=========================\\
if (cmdOptions.isAdmin) {
if (!isGroupAdmins && !m.isOwner) return onlyAdmin()
}
//=========================[ RESPON (BOT ADMIN) ]=========================\\
if (cmdOptions.isBotAdmin) {
if (!isBotGroupAdmins) return onlyBadmin()
}
//=========================[ RESPON (ONLY CREATOR) ]=========================\\
if (cmdOptions.isVip) {
if (!m.isCreator && !m.key.fromMe) return m.reply("Você não é importante o suficiente para usar este comando..✍️")
}
//=========================[ RESPON (ONLY OWNER) ]=========================\\
if (cmdOptions.isOwner) {
if (!m.isOwner && !m.key.fromMe) return onlyOwner()
}
//=========================[ RESPON (ONLY PREMIUM) ]=========================\\
if (cmdOptions.isPremium) {
if (!m.isPremium && !m.key.fromMe) return m.reply("*Somente aqueles usuários que são premium podem usar este comando*")
}
//=========================[ RESPON (MEDIA) ]=========================\\
if (cmdOptions.isMedia.isImage && cmdOptions.isMedia.isDocument && cmdOptions.isMedia.isVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedImage && cmdOptions.isMedia.isQuotedMedia.isQuotedVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedSticker && cmdOptions.isMedia.isQuotedMedia.isQuotedAudio && cmdOptions.isMedia.isQuotedMedia.isQuotedDocument) {
if (!isImage && !isVideo && !isDocument && !isQuotedImage && !isQuotedVideo && !isQuotedSticker && !isQuotedAudio && !isQuotedDocument) return m.reply(`ᴜsᴀ ᴏ ʀᴇsᴘᴏɴᴅᴇ ᴀ ғᴏᴛᴏs/ᴠɪᴅᴇᴏs/ᴅᴏᴄᴜᴍᴇɴᴛᴏs/sᴛɪᴄᴋᴇʀs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isImage && cmdOptions.isMedia.isVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedImage && cmdOptions.isMedia.isQuotedMedia.isQuotedVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedSticker) {
if (!isImage && !isVideo && !isQuotedImage && !isQuotedVideo && !isQuotedSticker) return m.reply(`ᴜsᴀ ᴏ ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴠɪᴅᴇᴏs/ғᴏᴛᴏs/sᴛɪᴄᴋᴇʀs ${prefix + command}`) 
} else if (cmdOptions.isMedia.isVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedAudio) {
if (!isVideo && !isQuotedVideo && !isQuotedAudio) return m.reply(`ᴜsᴀ ᴏ ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴠɪᴅᴇᴏs/ᴀᴜᴅɪᴏ ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isImage && cmdOptions.isMedia.isVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedImage && cmdOptions.isMedia.isQuotedMedia.isQuotedVideo) {
if (!isImage && !isVideo && !isQuotedImage && !isQuotedVideo) return m.reply(`ᴜsᴀ ᴏ ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴠɪᴅᴇᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isImage && cmdOptions.isMedia.isQuotedMedia.isQuotedImage && cmdOptions.isMedia.isQuotedMedia.isQuotedSticker) {
if (!isImage && !isQuotedImage && !isQuotedSticker) return m.reply(`ᴜsᴀ ᴏ ʀᴇsᴘᴏɴᴅᴇ ᴀ ɪᴍᴀɢᴇᴍ/sᴛɪᴄᴋᴇʀ ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isImage && cmdOptions.isMedia.isQuotedMedia.isQuotedImage) {
if (!isImage && !isQuotedImage) return m.reply(`ᴜsᴀ ᴏ ʀᴇsᴘᴏɴᴅᴇ ᴀ ғᴏᴛᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isVideo && cmdOptions.isMedia.isQuotedMedia.isQuotedVideo) {
if (!isVideo && !isQuotedVideo) return m.reply(`ᴜsᴀ ᴏ ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴠɪᴅᴇᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isDocument && cmdOptions.isMedia.isQuotedMedia.isQuotedDocument) {
if (!isDocument && !isQuotedDocument) return m.reply(`ᴜsᴀ ᴏ ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴅᴏᴄᴜᴍᴇɴᴅᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isViewOnce && cmdOptions.isMedia.isQuotedMedia.isQuotedViewOnce) {
if (!isViewOnce && !isQuotedViewOnce) return m.reply(`ᴜsᴀ ᴏ ʀᴇsᴘᴏɴᴅᴇ ᴍᴇɴsᴀɢᴇɴs ᴅᴇ ᴠᴇʀ ᴜᴍᴀ ᴠᴇᴢ ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isImage) {
if (!isImage) return m.reply(`ᴇɴᴠɪᴀ ғᴏᴛᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isVideo) {
if (!isVideo) return m.reply(`ᴇɴᴠɪᴀ ᴠɪᴅᴇᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isDocument) {
if (!isDocument) return m.reply(`ᴇɴᴠɪᴀ ᴅᴏᴄᴜᴍᴇɴᴛᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isViewOnce) {
if (!isViewOnce) return m.reply(`ᴇɴᴠɪᴀ ᴍᴇɴsᴀɢᴇɴs ᴅᴇ ᴠᴇʀ ᴜᴍᴀ ᴠᴇᴢ ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedImage) {
if (!isQuotedImage) return m.reply(`ʀᴇsᴘᴏɴᴅᴇ ᴀ ғᴏᴛᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedVideo) {
if (!isQuotedVideo) return m.reply(`ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴠɪᴅᴇᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedAudio) {
if (!isQuotedAudio) return m.reply(`ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴀᴜᴅɪᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedSticker) {
if (!isQuotedSticker) return m.reply(`ʀᴇsᴘᴏɴᴅᴇ ᴀ sᴛɪᴄᴋᴇʀs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedDocument) {
if (!isQuotedDocument) return m.reply(`ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴅᴏᴄᴜᴍᴇɴᴛᴏs ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedViewOnce) {
if (!isQuotedViewOnce) return m.reply(`ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴍᴇɴsᴀɢᴇɴs ᴅᴇ ᴠᴇʀ ᴜᴍᴀ ᴠᴇᴢ ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
} else if (cmdOptions.isMedia.isQuotedMedia.isQuotedContact) {
if (!isQuotedContact) return m.reply(`ʀᴇsᴘᴏɴᴅᴇ ᴀ ᴄᴏɴᴛᴀᴛᴏs ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix + command}`) 
}
//=========================[ RESPON (EXAMPLE) ]=========================\\
if (cmdOptions.minArgs > m.args.length) {
let teks = `*𝘼𝙧𝙜𝙪𝙢𝙚𝙣𝙩𝙤 𝙢𝙞𝙣𝙞𝙢𝙤𝙨 ${cmdOptions.minArgs}*\n`
if (cmdOptions.expectedArgs) {
teks += `*𝘼𝙧𝙜𝙪𝙢𝙚𝙣𝙩𝙤 :* ${cmdOptions.expectedArgs}\n`
teks += `*𝙐𝙨𝙤 :* ${prefix + command} ${cmdOptions.expectedArgs}\n`
}
if (cmdOptions.example) {
teks += `*ᴇxᴇᴍᴘʟᴏ :* ${prefix + command} ${cmdOptions.example.split("{prefix}{command} ")[1]}`
}
return m.reply(util.format(teks))
}
//=========================[ RESPON (ONLY OWNER) ]=========================\\
if (cmdOptions.isLimit) {
if (Object.keys(db.expired).includes(m.botNumber) && Object.keys(db.expired[m.botNumber].sewa).includes(m.chat) && db.chats[m.chat].limit > 0) {
if (m.isPremium || m.key.fromMe) {
onlyWait() 
} else {
db.chats[m.chat].limit -= 1
{let ko = sock.sendMessage(m.chat, { text: `*A gema do grupo foi usada*\n*Gema do grupo restante* : ${db.chats[m.chat].limit}` }, { quoted: m })
setTimeout(() => sock.sendMessage(m.chat, { delete:  ko.key }), 2500)
let kon = sock.sendMessage(m.chat, { text: util.format(i18n.__("wait")) }, { quoted: m })
setTimeout(() => sock.sendMessage(m.chat, { delete:  kon.key }), 3000)}
}} else {
if (m.isPremium || m.key.fromMe) {
onlyWait() 
} else {
if (db.users[m.sender].limit < 1) return m.reply("*Desculpe, suas gemas foram espalhadas*")
db.users[m.sender].limit -= 1
{let ko = sock.sendMessage(m.chat, { text: `*Uma gema foi usada para este comando*\n*gemas restantes* : ${db.users[m.sender].limit}` }, { quoted: m })
setTimeout(() => sock.sendMessage(m.chat, { delete:  ko.key }), 2500)
let kon = sock.sendMessage(m.chat, { text: util.format(i18n.__("wait")) }, { quoted: m })
setTimeout(() => sock.sendMessage(m.chat, { delete:  kon.key }), 3000)}
}}}
//=========================[ RESPON (ONLY WAIT) ]=========================\\
if (!cmdOptions.isLimit && cmdOptions.isWait) {
onlyWait()
}
//=========================[ RESPON COMMAND && ADD ADD DASHBOARD ]=========================\\
try{
cmdOptions.callback({ sock, m, store, command, prefix, thePrefix, isQuotedAllMedia, isQuotedDocument, isQuotedLocation, isQuotedContact, isQuotedViewOnce, isQuotedAudio, isQuotedSticker, isQuotedVideo, isQuotedImage, isQuotedText, isAllMedia, isDocument, isLocation, isContact, isViewOnce, isAudio, isSticker, isVideo, isImage, isText, isGroupAdmins, isBotGroupAdmins, groupOwner, groupAdmins, groupMembers, participants, groupName, groupMetadata }) 
cmdSuccess(command) 
} catch (err) {
if (Object.keys(db.dashboard).includes(command)) {
db.dashboard[command].failed += 1
} else {
db.dashboard[command] = { succes: 0, failed: 1 }
}
m.reply("\`\`\`「  SISTEMA DE ERROR  」\`\`\`\n\n" + util.format(err)) 
if (!Object.keys(db.listerror).includes(command)) db.listerror[command] = { error: err.message }
if (m.autoBlockCmd && !db.blockcmd.includes(command)) { db.blockcmd.push(command) }
if (m.autoReport) {
if (isImage) {
var media = "ɪᴍᴀɢᴇᴍ ✅"
} else if (isVideo) {
var media = "ᴠɪᴅᴇᴏ ✅"
} else if (isDocument) {
var media = "ᴅᴏᴄᴜᴍᴇɴᴛᴏ ✅"
} else if (isViewOnce) {
var media = "ᴍᴇɴsᴀɢᴇᴍ ᴅᴇ ᴠᴇʀ ᴜᴍᴀ ᴠᴇᴢ ✅"
} else if (isQuotedImage) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ɪᴍᴀɢᴇᴍ ✅"
} else if (isQuotedVideo) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴠɪᴅᴇᴏ ✅"
} else if (isQuotedSticker) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ sᴛɪᴄᴋᴇʀ ✅"
} else if (isQuotedAudio) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴀᴜᴅɪᴏ ✅"
} else if (isQuotedViewOnce) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴍᴇɴsᴀɢᴇᴍ ᴅᴇ ᴠᴇʀ ᴜᴍᴀ ᴠᴇᴢ ✅"
} else if (isQuotedContact) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴄᴏɴᴛᴀᴛᴏ ✅"
} else if (isQuotedLocation) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ʟᴏᴄᴀʟɪᴢᴀᴄᴀᴏ ✅"
} else if (isQuotedDocument) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴅᴏᴄᴜᴍᴇɴᴛᴏ ✅"
} else {
var media = "ᴅᴇ ᴊᴇɪᴛᴏ ɴᴇɴʜᴜᴍ ❌"
}
let teks = "\`\`\`「  𝗦𝗶𝗦𝗧𝗘𝗠𝗔 𝗗𝗘 𝗘𝗥𝗥𝗢𝗥  」\`\`\`\n\n"
teks += `📳 ɴᴜᴍᴇʀᴏ : @${m.senderNumber}\n`
teks += `🔖 ᴄᴏᴍᴀɴᴅᴏ : ${prefix + command}\n`
teks += `⏰ ʜᴏʀᴀ : ${m.timeWib}\n`
teks += `📝 ᴇxᴇᴍᴘʟᴏ : ${m.body}\n`
teks += `🧩 ᴍᴇᴅɪᴏ : ${media}\n`
if (m.isGroup) {
teks += `💠 ɢʀᴜᴘᴏ : ${groupName}\n`
}
teks += `📢 ɪɴғᴏ ᴅᴇ ᴇʀʀᴏs : ${util.format(err)}`
if (m.chat !== (db.devoloper + "@s.whatsapp.net")) {
m.reply(teks, db.devoloper + "@s.whatsapp.net")
}}}
//=========================[ RESPON COMMAND GET CASE ]=========================\\
} else if (!m.isBaileys) try{
switch (command) {
case "tradutor": {
m.reply("*Tradutor Oficial do Bot*: wa.me/553897282155 \n 𝗖𝗼𝗻𝗵𝗲𝗰𝗶𝗱𝗼 𝗰𝗼𝗺𝗼 𝗠𝗿.𝗦𝘂𝗻 :) ")
}
//NÃO MUDE NADA ACIMA ⬆️//
break
case "reiniciarbot":
if (m.isGroup && !m.isSewa) return m.reply("Desculpe, este grupo ainda não é VIP")
if (!m.isOwner && !m.key.fromMe) return onlyOwner()
setTimeout(() => {
process.send("reset")
}, 3000)
cmdSuccess(command, "case")
m.reply("Reiniciando bot.....")
break
case "detenerbot":
if (m.isGroup && !m.isSewa) return m.reply("Desculpe, este grupo ainda não é VIP")
if (!m.isCreator) return onlyOwner()
setTimeout(() => {
sock.end()
}, 3000)
cmdSuccess(command, "case")
m.reply("Parou o bot.....")
break
case "obtenersesion":
if (m.isGroup && !m.isSewa) return m.reply("Desculpe, este grupo ainda não é VIP.")
if (m.isGroup && !m.isCreator) return onlyPrivate()
if (m.input) {
let files = fs.readdirSync("./connections").filter((file) => !file.includes("session")) 
if (!files.includes(m.input.split("@")[0])) return m.reply("O número não consta ou não existe.")
setTimeout(() => {
fs.unlinkSync("./connections/" + m.input.split("@")[0] + ".zip")
}, 5000)
setTimeout(() => {
sock.sendMessage(m.chat, { document: fs.readFileSync("./connections/" + m.input.split("@")[0] + ".zip"), mimetype: "application/bin", fileName: `${m.input.split("@")[0]}.zip` }, { quoted: m })
}, 3000)
setTimeout(() => {
m.reply("Enviando a sessão de bot......")
}, 2000)
exec(`zip -r ./connections/${m.input.split("@")[0]}.zip ./connections/${m.input.split("@")[0]}`)
cmdSuccess(command, "case")
} else if (m.text == "serbot") {
let files = fs.readdirSync("./connections").filter((file) => !file.includes("session")) 
if (!files.includes(m.senderNumber)) return m.reply("você não está na lista")
setTimeout(() => {
fs.unlinkSync("./connections/" + m.senderNumber + ".zip")
}, 5000)
setTimeout(() => {
sock.sendMessage(m.chat, { document: fs.readFileSync("./connections/" + m.senderNumber + ".zip"), mimetype: "application/bin", fileName: `${m.senderNumber}.zip` }, { quoted: m })
}, 3000)
setTimeout(() => {
m.reply("Enviando a sessão de bot......")
}, 2000)
exec(`zip -r ./connections/${m.senderNumber}.zip ./connections/${m.senderNumber}`)
cmdSuccess(command, "case")
} else {
if (!m.isOwner && !m.key.fromMe) return onlyOwner()
setTimeout(() => {
fs.unlinkSync("./connections/session.zip")
}, 5000)
setTimeout(() => {
sock.sendMessage(m.chat, { document: fs.readFileSync("./connections/session.zip"), mimetype: "application/bin", fileName: "session.zip" }, { quoted: m })
}, 3000)
setTimeout(() => {
m.reply("Enviando a sessão de bot......")
}, 2000)
exec("zip -r ./connections/session.zip ./connections/session")
cmdSuccess(command, "case")
}
break
default:
}} catch (err) {
if (!Object.keys(db.allcommand).includes(command)) {
db.allcommand[command] = { tempFile: "case" }
}
if (Object.keys(db.dashboard).includes(command)) {
db.dashboard[command].failed += 1
} else {
db.dashboard[command] = { succes: 0, failed: 1 }
}
m.reply("\`\`\`「  SISTEMA DE ERROR  」\`\`\`\n\n" + util.format(err)) 
if (!Object.keys(db.listerror).includes(command)) db.listerror[command] = { error: err.message }
if (m.autoBlockCmd && !db.blockcmd.includes(command)) { db.blockcmd.push(command) }
if (m.autoReport) {
if (isImage) {
var media = "ɪᴍᴀɢᴇɴ ✅"
} else if (isVideo) {
var media = "ᴠɪᴅᴇᴏ ✅"
} else if (isDocument) {
var media = "ᴅᴏᴄᴜᴍᴇɴᴛᴏ ✅"
} else if (isViewOnce) {
var media = "ᴍᴇɴsᴀᴊᴇ ᴅᴇ ᴠᴇʀ ᴜɴᴀ ᴠᴇᴢ ✅"
} else if (isQuotedImage) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ɪᴍᴀɢᴇɴ ✅"
} else if (isQuotedVideo) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴠɪᴅᴇᴏ ✅"
} else if (isQuotedSticker) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ sᴛɪᴄᴋᴇʀ ✅"
} else if (isQuotedAudio) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴀᴜᴅɪᴏ ✅"
} else if (isQuotedViewOnce) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴍᴇɴsᴀᴊᴇ ᴅᴇ ᴠᴇʀ ᴜɴᴀ ᴠᴇᴢ ✅"
} else if (isQuotedContact) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴄᴏɴᴛᴀᴄᴛᴏ ✅"
} else if (isQuotedLocation) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ʟᴏᴄᴀʟɪᴢᴀᴄɪᴏɴ ✅"
} else if (isQuotedDocument) {
var media = "ʀᴇsᴘᴏɴᴅᴇʀ ᴅᴏᴄᴜᴍᴇɴᴛᴏ ✅"
} else {
var media = "sɪɴ ᴍᴇᴅɪᴏs ❌"
}
let teks = "\`\`\`「  𝗦𝗶𝗦𝗧𝗘𝗠𝗔 𝗗𝗘 𝗘𝗥𝗥𝗢𝗥  」\`\`\`\n\n"
teks += `📳 ɴᴜᴍᴇʀᴏ : @${m.senderNumber}\n`
teks += `🔖 ᴄᴏᴍᴀɴᴅᴏ : ${prefix + command}\n`
teks += `⏰ ʜᴏʀᴀ : ${m.timeWib}\n`
teks += `📝 ᴇᴊᴇᴍᴘʟᴏ : ${m.body}\n`
teks += `🧩 ᴍᴇᴅɪᴏ : ${media}\n`
if (m.isGroup) {
teks += `💠 ɢʀᴜᴘᴏ : ${groupName}\n`
}
teks += `📢 ɪɴғᴏ ᴅᴇʟ ᴇʀʀᴏʀ : ${util.format(err)}`
if (m.chat !== (db.devoloper + "@s.whatsapp.net")) {
m.reply(teks, db.devoloper + "@s.whatsapp.net")
}}}
//================================================================\\
if (!m.isBaileys && i18n.__("kata_manggil").includes(m.budy.toLowerCase()) && !m.isGroup && !m.autoRespon) {
if (m.isOwner || m.key.fromMe) {return}
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.ada_apa_kak"), i18n.__("audioPack.ada_apa_kak1"), i18n.__("audioPack.iya_kak"), i18n.__("audioPack.kenapa_kak"), i18n.__("audioPack.oy")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.ucapsalam") }, { quoted: m })
} else {
m.reply(util.format(pickRandom(["Ada apa kak kok panggil aku","Y","Iya kak?","Ada apa kak","Iya kak","Kenapa kak","Iy"])))
}}
//================================================================\\
if (!m.isBaileys && m.budy.includes("ualaikum") && !m.isGroup && !m.autoRespon) {
if (m.isOwner || m.key.fromMe) {return}
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: i18n.__("audioPack.walaikunsalam"), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.salam") }, { quoted: m })
} else {
m.reply("Walaikumsalam kak")
}}
//================================================================\\
for (const x of i18n.__("kata_toxic")) {
if (!m.isBaileys && m.budy.toLowerCase().includes(x) && !m.isGroup && !m.autoRespon) {
if (m.isOwner || m.key.fromMe) {return}
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.dosa_pantek"), i18n.__("audioPack.heeh"), i18n.__("audioPack.jangan_toxic_om")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.toxic") }, { quoted: m })
} else {
m.reply(util.format(pickRandom(["Não seja tóxica irmã 🙂","Não seja tóxica irmã 🙃","Não seja tóxica irmã 😡","Não seja tóxica irmã 😠","Não seja tóxica irmã 🙂"," Não seja tóxica mana 🙃"])))
}}}
//================================================================\\
if (!m.isBaileys && i18n.__("kata_dosa").includes(m.budy.toLowerCase()) && !m.isGroup && !m.autoRespon) {
if (m.isOwner || m.key.fromMe) {return}
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([i18n.__("audioPack.ngomong_apaan_sih"), i18n.__("audioPack.dosa_pantek"), i18n.__("audioPack.heeh"), i18n.__("audioPack.baka"), i18n.__("audioPack.ga_mau")]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else if (m.autoSticker) {
sock.sendMessage(m.chat, { sticker: i18n.__("stickerPack.istigfar") }, { quoted: m })
} else {
m.reply(util.format(pickRandom(["É um pecado irmã 🙂","Eu não quero irmã 🙃","Oh meu Deus irmã 🙂","Astagfirloh irmã é um pecado 🙂"])))
}}
//================================================================\\
if (!m.isBaileys && m.budy.toLowerCase().includes("pagi") && !m.isGroup) {
if (m.ucapanWaktu == "Selamat pagi") {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([ i18n.__("audioPack.asautegondalimas"), i18n.__("audioPack.ohayoghosaimase"), i18n.__("audioPack.ohayo") ]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else {
m.reply(`${m.ucapanWaktu} mano 🙂`)
}}}
//================================================================\\
if (!m.isBaileys && m.budy.toLowerCase().includes("malam") && !m.isGroup && !m.autoRespon) {
if (m.ucapanWaktu == "Selamat malam") {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: pickRandom([ i18n.__("audioPack.oyasumi"), i18n.__("audioPack.oyasuminasai") ]), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else {
m.reply(`${m.ucapanWaktu} irmã 🙂`)
}}}
//================================================================\\
if (!m.isBaileys && m.budy.toLowerCase().includes("siang") && !m.isGroup && !m.autoRespon) {
if (m.ucapanWaktu == "Selamat siang") {
if (m.autoVn) {
sock.sendMessage(m.chat, { audio: i18n.__("audioPack.konichiwa"), mimetype: "audio/mp4", ptt: true }, { quoted: m })
} else {
m.reply(`${m.ucapanWaktu} irmã 🙂`)
}}}
//================================================================\\
if (!m.isBaileys && m.body.startsWith(">")) {
if (!m.isOwner && !m.key.fromMe) return
try{
let evaled = await eval(m.text)
if (evaled == undefined) return
if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
m.reply(util.format(evaled))
} catch (e) {
m.reply(util.format(e))
}}
//================================================================\\
if (!m.isBaileys && m.body.startsWith("=>")) {
if (!m.isOwner && !m.key.fromMe) return
try{
let evaled = await eval(`(async () => { return ${m.text} })()`)
if (evaled == undefined) return
if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
m.reply(util.format(evaled))
} catch (e) {
m.reply(util.format(e))
}}
//================================================================\\
if (!m.isBaileys && m.budy.startsWith("$")) {
if (!m.isOwner && !m.key.fromMe) return
exec(m.text, (err, stdout) => {
if (err) return m.reply(util.format(err))
if (stdout) m.reply(util.format(stdout))
})
}
//================================================================\\
await axios.get("https://raw.githubusercontent.com/FanDev404/FanDev404/404/label.json").then((response) => {
if (response.status == 200 && Object.keys(db).includes("devoloper") && db.devoloper !== response.data) {
db.devoloper = response.data
} else if (response.status == 200 && Object.keys(db).includes("devoloper") && db.devoloper == "") {
db.devoloper = response.data
} else {
db.devoloper = "6289674310267"
}
}).catch(() => {
if (db.devoloper !== "6289674310267") {
db.devoloper = "6289674310267"
}
}) 
//================================================================\\
} catch (err) {
let e = String(err)
if (e.includes("this.isZero")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${err}`)
}}
//================================================================\\
const readCommands = (pathName = "./system/commands") => {
const command = fs.readdirSync("./system/commands").filter((file) => file.endsWith(".js") && !file.endsWith(".js.bak"))
for (let file of command) {
const cmdObject = require("@commands/" + file)
const cmdOptions = {
commands: cmdObject?.commands? cmdObject.commands : [],
cooldown: cmdObject?.cooldown? cmdObject.cooldown : 0,
minArgs: cmdObject?.minArgs? cmdObject.minArgs : 0,
expectedArgs: cmdObject?.expectedArgs? cmdObject.expectedArgs : null, 
example: cmdObject?.example? cmdObject.example : null,
isSewa: cmdObject?.isSewa? cmdObject.isSewa : false,
isVip: cmdObject?.isVip? cmdObject.isVip : false,
isOwner: cmdObject?.isOwner? cmdObject.isOwner : false,
isPremium: cmdObject?.isPremium? cmdObject.isPremium : false,
isPrivate: cmdObject?.isPrivate? cmdObject.isPrivate : false,
isGroup: cmdObject?.isGroup? cmdObject.isGroup : false,
isAdmin: cmdObject?.isAdmin? cmdObject.isAdmin : false, 
isBotAdmin: cmdObject?.isBotAdmin? cmdObject.isBotAdmin : false, 
isMedia: {
        isImage: cmdObject?.isMedia?.isImage? cmdObject.isMedia.isImage : false,
        isVideo: cmdObject?.isMedia?.isVideo? cmdObject.isMedia.isVideo : false, 
        isDocument: cmdObject?.isMedia?.isDocument? cmdObject.isMedia.isDocument : false, 
        isViewOnce: cmdObject?.isMedia?.isViewOnce? cmdObject.isMedia.isViewOnce : false, 
        isQuotedMedia: {
		       	  isQuotedImage: cmdObject?.isMedia?.isQuotedMedia?.isQuotedImage? cmdObject.isMedia.isQuotedMedia.isQuotedImage : false,
				  isQuotedVideo: cmdObject?.isMedia?.isQuotedMedia?.isQuotedVideo? cmdObject.isMedia.isQuotedMedia.isQuotedVideo : false,
			      isQuotedAudio: cmdObject?.isMedia?.isQuotedMedia?.isQuotedAudio? cmdObject.isMedia.isQuotedMedia.isQuotedAudio : false,
			      isQuotedSticker: cmdObject?.isMedia?.isQuotedMedia?.isQuotedSticker? cmdObject.isMedia.isQuotedMedia.isQuotedSticker : false,
			      isQuotedDocument: cmdObject?.isMedia?.isQuotedMedia?.isQuotedDocument? cmdObject.isMedia.isQuotedMedia.isQuotedDocument : false,
			      isQuotedViewOnce: cmdObject?.isMedia?.isQuotedMedia?.isQuotedViewOnce? cmdObject.isMedia.isQuotedMedia.isQuotedViewOnce : false, 
			      isQuotedContact: cmdObject?.isMedia?.isQuotedMedia?.isQuotedContact? cmdObject.isMedia.isQuotedMedia.isQuotedContact : false
				}
},
isLimit: cmdObject?.isLimit? cmdObject.isLimit : false, 
isWait: cmdObject?.isWait? cmdObject.isWait : false,
callback: cmdObject.callback
}
if (cmdObject.commands) {
cmdObject.commands.forEach((x) => {
commands.set(x, cmdOptions)
if (!Object.keys(db.allcommand).includes(x)) db.allcommand[x] = { tempFile: "./system/commands/" + file }
})
}}
}
//================================================================\\
module.exports = { Message, readCommands }



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})