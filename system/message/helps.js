const fs = require("fs")
const chalk = require("chalk")
const { week, calender, toFirstCase } = require("@libs/function")
const config = require("@config")
const yes = "✘"
const no = ""

const featError = (cmd) => {
return Object.keys(db.listerror).includes(cmd) 
}


const menu = (m, thePrefix) => {
return `
┣━━━┫ *𝐌𝐑.𝐒𝐔𝐍* - *𝗕𝗢𝗧* ┣━━━┫

 🌟 *ɴᴏᴍᴇ* : ${m.pushName}
 🌟 *ᴜsᴜᴀʀɪᴏ* : ${m.isOwner? "Proprietário" : m.isPremium? "Premium" : "Usuario Comum"}
 🌟 *ɢᴇᴍᴀs* : ${db.users[m.sender].limit}
 🌟 *sᴀʟᴅᴏ* : ${db.users[m.sender].balance}
 🌟 *ᴍᴏᴅᴏ* : ${toFirstCase(m.mode)}
 🌟 *ᴘʀᴇғɪxᴏ* : ${thePrefix}
 🌟 *ʜᴏʀᴀs* : ${m.timeWib}
 🌟 *ᴛᴏᴛᴀʟ ᴄᴍᴅ* : ${Object.keys(db.allcommand).length}
 🌟 *ᴛᴏᴛᴀʟ ᴇʀʀᴏs* : ${Object.keys(db.listerror).length}
 🌟 *ᴛᴏᴛᴀʟ ᴜsᴜᴀʀɪᴏs* : ${Object.keys(db.users).length}
 🌟 *ᴜsᴜᴀʀɪᴏs ʙᴀɴɪᴅᴏs* : ${Object.keys(db.banned).length}
 🌟 *ᴛʀᴀᴅᴜᴛᴏʀ* : *→ᴍʀ.sᴜɴ←*
`}

const ownerMenu = (prefix) => {
return `  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝚍𝚘 𝙳𝚘𝚗𝚘*

  ┃➜ ${prefix}antillamar ${featError("antillamar")? yes : no }
  ┃➜ ${prefix}antispam ${featError("antispam")? yes : no }
  ┃➜ ${prefix}auto ${featError("auto")? yes : no }
  ┃➜ ${prefix}autoinfo ${featError("autoinfo")? yes : no }
  ┃➜ ${prefix}autobloqcmd ${featError("autobloqcmd")? yes : no }
  ┃➜ ${prefix}autoentrar ${featError("autoentrar")? yes : no }
  ┃➜ ${prefix}autonivel ${featError("autonivel")? yes : no }
  ┃➜ ${prefix}autoleer ${featError("autoleer")? yes : no }
  ┃➜ ${prefix}autoreportar ${featError("autoreportar")? yes : no }
  ┃➜ ${prefix}autoresponder ${featError("autoresponder")? yes : no }
  ┃➜ ${prefix}autosticker ${featError("autosticker")? yes : no }
  ┃➜ ${prefix}autonv ${featError("autonv")? yes : no }
  ┃➜ ${prefix}banear ${featError("banear")? yes : no }
  ┃➜ ${prefix}desbanear ${featError("desbanear")? yes : no }
  ┃➜ ${prefix}bloquear ${featError("bloquear")? yes : no }
  ┃➜ ${prefix}desbloquear ${featError("desbloquear")? yes : no }
  ┃➜ ${prefix}bloqcmd ${featError("bloqcmd")? yes : no }
  ┃➜ ${prefix}desbloqcmd ${featError("desbloqcmd")? yes : no }
  ┃➜ ${prefix}dv ${featError("dv")? yes : no }
  ┃➜ ${prefix}dvgp ${featError("dvgp")? yes : no }
  ┃➜ ${prefix}dvpv ${featError("dvpv")? yes : no }
  ┃➜ ${prefix}creargp ${featError("creargp")? yes : no }
  ┃➜ ${prefix}subirarchivo ${featError("subirarchivo")? yes : no }
  ┃➜ ${prefix}copiaseguridad ${featError("copiaseguridad")? yes : no }
  ┃➜ ${prefix}tomararchivo ${featError("tomararchivo")? yes : no }
  ┃➜ ${prefix}tomarcmd ${featError("tomarcmd")? yes : no }
  ┃➜ ${prefix}tomarcarpeta ${featError("tomarcarpeta")? yes : no }
  ┃➜ ${prefix}tomarsesion ${featError("tomarsesion")? yes : no }
  ┃➜ ${prefix}addcmd ${featError("aggcmd")? yes : no }  
  ┃➜ ${prefix}reiniciar ${featError("reiniciar")? yes : no }
  ┃➜ ${prefix}detener ${featError("detener")? yes : no }
  ┃➜ ${prefix}entrar ${featError("entrar")? yes : no }
  ┃➜ ${prefix}salir ${featError("salir")? yes : no }
  ┃➜ ${prefix}modo ${featError("modo")? yes : no }
  ┃➜ ${prefix}definfo ${featError("definfo")? yes : no }
  ┃➜ ${prefix}defmenu ${featError("defmenu")? yes : no }
  ┃➜ ${prefix}defnombrebot ${featError("defnombrebot")? yes : no }
  ┃➜ ${prefix}defnombrecreador ${featError("defnombrecreador")? yes : no }
  ┃➜ ${prefix}defftbot ${featError("defftbot")? yes : no }
  ┃➜ ${prefix}defnumerocreador ${featError("defnumerocreador")? yes : no }
  ┃➜ ${prefix}defprefijo ${featError("setprefix")? yes : no }
  ┃➜ ${prefix}defrespuesta ${featError("defrespuesta")? yes : no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const groupMenu = (prefix) => {
return `  
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝙶𝚛𝚞𝚙𝚘*
  ┃
  ┃➜ ${prefix}tradutor (ᴛʀᴀᴅᴜᴛᴏʀ ᴏғɪᴄɪᴀʟ ᴅᴏ ʙᴏᴛ) ${featError("tradutor")? yes : no }
  ┃➜ ${prefix}antilink ${featError("antilink")? yes : no }
  ┃➜ ${prefix}antilinkfb ${featError("antilinkfb")? yes : no }
  ┃➜ ${prefix}antilinkig ${featError("antilinkig")? yes : no }
  ┃➜ ${prefix}antilinktele ${featError("antilinktele")? yes : no }
  ┃➜ ${prefix}antilinktiktok ${featError("antilinktiktok")? yes : no }
  ┃➜ ${prefix}antilinktwitter ${featError("antilinktwitter")? yes : no }
  ┃➜ ${prefix}antilinkwa ${featError("antilinkwa")? yes : no }
  ┃➜ ${prefix}antilinkyt ${featError("antilinkyt")? yes : no }
  ┃➜ ${prefix}antiasing ${featError("antiasing")? yes : no }
  ┃➜ ${prefix}antieliminar ${featError("antidelete")? yes : no }
  ┃➜ ${prefix}antimarcar ${featError("antimarcar")? yes : no }
  ┃➜ ${prefix}antiverunavez ${featError("antiverunavez")? yes : no }
  ┃➜ ${prefix}antivirus ${featError("antivirtex")? yes : no }
  ┃➜ ${prefix}antibot ${featError("antibot")? yes : no }
  ┃➜ ${prefix}autoreaccion ${featError("autoreactgc")? yes : no }
  ┃➜ ${prefix}autorespondgp ${featError("autorespongc")? yes : no }
  ┃➜ ${prefix}bienvenida ${featError("welcome")? yes : no }
  ┃➜ ${prefix}mutear ${featError("mute")? yes : no }
  ┃➜ ${prefix}desmutear ${featError("unmute")? yes : no }
  ┃➜ ${prefix}infogp ${featError("infogc")? yes : no }
  ┃➜ ${prefix}linkgp ${featError("linkgc")? yes : no }
  ┃➜ ${prefix}deffotogrupo ${featError("deffotogrupo")? yes : no }
  ┃➜ ${prefix}defnombregrupo ${featError("defnombregrupo")? yes : no }
  ┃➜ ${prefix}defdescgrupo ${featError("defdescgrupo")? yes : no }
  ┃➜ ${prefix}defbienvenida ${featError("defbienvenida")? yes : no }
  ┃➜ ${prefix}gp ${featError("gp")? yes : no }
  ┃➜ ${prefix}eliminarosacar ${featError("eliminarosacar")? yes : no }     
  ┃➜ ${prefix}reestablecerlink ${featError("reestablecerlink")? yes : no }
  ┃➜ ${prefix}marcar ${featError("marcar")? yes : no }
  ┃➜ ${prefix}marcarb ${featError("marcarb")? yes : no }
  ┃➜ ${prefix}add (ᴀᴅɪᴄɪᴏɴᴀʀ ᴍᴇᴍʙʀᴏ) ${featError("add")? yes : no }
  ┃➜ ${prefix}remove (ᴇxᴄʟᴜɪʀ ᴍᴇᴍʙʀᴏ) ${featError("remove")? yes : no }
  ┃➜ ${prefix}promote (ᴘʀᴏᴍᴏᴠᴇʀ ᴍᴇᴍʙʀᴏ) ${featError("promote")? yes : no }
  ┃➜ ${prefix}demote (ʀᴇʙᴀɪxᴀʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ) ${featError("demote")? yes : no }
  ┃➜ ${prefix}afk ou off${featError("afk")? yes : no }
  ┃➜ ${prefix}killme ${featError("killme")? yes : no }
  ┃➜ ${prefix}abrirentiempo ${featError("abrirentiempo")? yes : no }
  ┃➜ ${prefix}cerrarentiempo ${featError("closetime")? yes : no }
  ┃➜ ${prefix}tomarftgp ${featError("tomarftgp")? yes : no }
  ┃➜ ${prefix}veralquiler ${featError("veralquiler")? yes : no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const toolsMenu = (prefix) => {
return `  
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝙵𝚎𝚛𝚛𝚊𝚖𝚎𝚗𝚝𝚊𝚜*
  ┃
  ┃➜ ${prefix}tablero ${featError("tablero")? yes : no }
  ┃➜ ${prefix}menu ou start ${featError("menu")? yes : no }
  ┃➜ ${prefix}dono ${featError("owner")? yes : no }
  ┃➜ ${prefix}rutina ${featError("rutina")? yes : no }
  ┃➜ ${prefix}speed ou ping ${featError("velocidad")? yes : no }
  ┃➜ ${prefix}listagp ${featError("listagp")? yes : no }
  ┃➜ ${prefix}listapv ${featError("listapv")? yes : no }
  ┃➜ ${prefix}listavips ${featError("listaalquiler")? yes : no }
  ┃➜ ${prefix}leer ${featError("read")? yes : no }  
  ┃➜ ${prefix}del ${featError("del")? yes : no }  
  ┃➜ ${prefix}tomarft ${featError("tomarft")? yes : no }  
  ┃➜ ${prefix}tomarnombre ${featError("tomarnombre")? yes : no }  
  ┃➜ ${prefix}tomarid ${featError("tomarid")? yes : no }  
  ┃➜ ${prefix}script ${featError("script")? yes : no }  
  ┃➜ ${prefix}contacto ${featError("contacto")? yes : no }  
  ┃➜ ${prefix}reaccion ${featError("reaccion")? yes : no }  
  ┃➜ ${prefix}wame ${featError("wame")? yes : no }  
  ┃➜ ${prefix}reportar ${featError("reportar")? yes : no }  
  ┃➜ ${prefix}infobot ${featError("infobot")? yes : no }  
  ┃➜ ${prefix}perfil ou profile ${featError("perfil")? yes : no }
  ┃➜ ${prefix}verespacio ${featError("verespacio")? yes : no }
  ┃➜ ${prefix}ai ${featError("ai")? yes : no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const funMenu = (prefix) => {
return `  
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝙳𝚒𝚟𝚎𝚛𝚝𝚒𝚍𝚘*
  ┃
  ┃➜ ${prefix}cekgoblok ${featError("cekgoblok")? yes : no }
  ┃➜ ${prefix}cekjelek ${featError("cekjelek")? yes : no }
  ┃➜ ${prefix}cekgay ${featError("cekgay")? yes : no }
  ┃➜ ${prefix}ceklesbi ${featError("ceklesbi")? yes : no }
  ┃➜ ${prefix}cekganteng ${featError("cekganteng")? yes : no }
  ┃➜ ${prefix}cekcantik ${featError("cekcantik")? yes : no }
  ┃➜ ${prefix}cekbego ${featError("cekbego")? yes : no }
  ┃➜ ${prefix}ceksuhu ${featError("ceksuhu")? yes : no }
  ┃➜ ${prefix}cekpinter ${featError("cekpinter")? yes : no }
  ┃➜ ${prefix}cekjago ${featError("cekjago")? yes : no }
  ┃➜ ${prefix}ceknolep ${featError("ceknolep")? yes : no }
  ┃➜ ${prefix}cekbabi ${featError("cekbabi")? yes : no }
  ┃➜ ${prefix}cekbeban ${featError("cekbeban")? yes : no }
  ┃➜ ${prefix}cekbaik ${featError("cekbaik")? yes : no }
  ┃➜ ${prefix}cekjahat ${featError("cekjahat")? yes : no }
  ┃➜ ${prefix}cekanjing ${featError("cekanjing")? yes : no }
  ┃➜ ${prefix}cekharam ${featError("cekharam")? yes : no }
  ┃➜ ${prefix}cekpakboy ${featError("cekpakboy")? yes : no }
  ┃➜ ${prefix}cekpakgirl ${featError("cekpakgirl")? yes : no }
  ┃➜ ${prefix}ceksange ${featError("ceksange")? yes : no }
  ┃➜ ${prefix}cekbaper ${featError("cekbaper")? yes : no }
  ┃➜ ${prefix}cekfakboy ${featError("cekfakboy")? yes : no }
  ┃➜ ${prefix}cekalim ${featError("cekalim")? yes : no }
  ┃➜ ${prefix}ceksuhu ${featError("ceksuhu")? yes : no }
  ┃➜ ${prefix}cekfakgirl ${featError("cekfakgirl")? yes : no }
  ┃➜ ${prefix}cekkeren ${featError("cekkeren")? yes : no }
  ┃➜ ${prefix}cekwibu ${featError("cekwibu")? yes : no }
  ┃➜ ${prefix}cekpasarkas ${featError("cekpasarkas")? yes : no }
  ┃➜ ${prefix}cekkul ${featError("cekkul")? yes : no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const tagsMenu = (prefix) => {
return `  
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝚍𝚎 𝚃𝚊𝚐𝚜*
  ┃
  ┃➜ ${prefix}memek ${featError("memek")? yes : no }
  ┃➜ ${prefix}bego ${featError("bego")? yes : no }
  ┃➜ ${prefix}goblok ${featError("goblok")? yes : no }
  ┃➜ ${prefix}perawan ${featError("perawan")? yes : no }
  ┃➜ ${prefix}babi ${featError("babi")? yes : no }
  ┃➜ ${prefix}tolol ${featError("tolol")? yes : no }
  ┃➜ ${prefix}pintar ${featError("pintar")? yes : no }
  ┃➜ ${prefix}asu ${featError("asu")? yes : no }
  ┃➜ ${prefix}gay ${featError("gay")? yes : no }
  ┃➜ ${prefix}lesby ${featError("lesby")? yes : no }
  ┃➜ ${prefix}bajingan ${featError("bajingan")? yes : no }
  ┃➜ ${prefix}jancok ${featError("jancok")? yes : no }
  ┃➜ ${prefix}anjing ${featError("anjing")? yes : no }
  ┃➜ ${prefix}ngentot ${featError("ngentot")? yes : no }
  ┃➜ ${prefix}monyet ${featError("monyet")? yes : no }
  ┃➜ ${prefix}mastah ${featError("mastah")? yes : no }
  ┃➜ ${prefix}newbie ${featError("newbie")? yes : no }
  ┃➜ ${prefix}bangsat ${featError("bangsat")? yes : no }
  ┃➜ ${prefix}bangke ${featError("bangke")? yes : no }
  ┃➜ ${prefix}sange ${featError("sange")? yes : no }
  ┃➜ ${prefix}dakjal ${featError("dakjal")? yes : no }
  ┃➜ ${prefix}wibu ${featError("wibu")? yes : no }
  ┃➜ ${prefix}puki ${featError("puki")? yes : no }
  ┃➜ ${prefix}pantek ${featError("pantek")? yes : no }
  ┃➜ ${prefix}jadian ${featError("jadian")? yes : no }
  ┃➜ ${prefix}jodohku ${featError("jodohku")? yes : no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}


const downloadMenu = (prefix) => {
return `
  ❍┣━━┫ *𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚜*
  ┃
  ┃➜ ${prefix}tiktokmp3 ${featError("tiktokmp3")? yes : featError("ttmp3")? yes : no }
  ┃➜ ${prefix}tiktokmp4 ${featError("tiktokmp4")? yes : featError("ttmp4")? yes : no }
  ┃➜ ${prefix}ytmp3 ${featError("ytmp3")? yes : no }
  ┃➜ ${prefix}ytmp4 ${featError("ytmp4")? yes : no }
  ┃➜ ${prefix}gitclone ${featError("gitclone")? yes : no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const converterMenu = (prefix) => {
return `
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝙰𝚕𝚝𝚎𝚛𝚊𝚍𝚘𝚛*
  ┃
  ┃➜ ${prefix}sticker ${featError("sticker")? yes : featError("s")? yes : no }
  ┃➜ ${prefix}toimg ${featError("toimg")? yes : no }
  ┃➜ ${prefix}eliminarfondo ${featError("eliminarfondo")? yes : no }
  ┃➜ ${prefix}tx (ᴄʀɪᴀʀ ғɪɢᴜ ᴅᴀ ᴍᴇɴsᴀɢᴇᴍ ᴅᴏ ᴄʜᴀᴛ) ${featError("qc")? yes : no }
  ┃➜ ${prefix}robar ${featError("robar")? yes : no }
  ┃➜ ${prefix}tourl ${featError("tourl")? yes : no }
  ┃➜ ${prefix}tomp3 ${featError("tomp3")? yes : no }
  ┃➜ ${prefix}tomp4 ${featError("tomp4")? yes : no }
  ┃➜ ${prefix}tonv ${featError("tonv")? yes : no }
  ┃➜ ${prefix}togif ${featError("togif")? yes : no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const searchMenu = (prefix) => {
return `
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝙱𝚞𝚜𝚌𝚊_𝙼𝚞𝚜𝚒𝚌*
  ┃
  ┃➜ ${prefix}buscarmsj ${featError("searchm")? yes :no }
  ┃➜ ${prefix}yts ${featError("yts")? yes :no }
  ┃➜ ${prefix}play ${featError("play")? yes :no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const anonymousMenu = (prefix) => {
return `
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝙲𝚑𝚊𝚝 𝙰𝚗𝚘𝚗𝚒𝚖𝚘*
  ┃
  ┃➜ ${prefix}iniciar ${featError("iniciar")? yes :no }
  ┃➜ ${prefix}iniciarchat ${featError("iniciarchat")? yes :no }
  ┃➜ ${prefix}detener ${featError("detener")? yes :no }
  ┃➜ ${prefix}siguiente ${featError("siguiente")? yes :no }
  ┃➜ ${prefix}tomarcontato ${featError("tomarcontacto")? yes :no }
  ┃➜ ${prefix}eliminarnonimo ${featError("eliminarnonimo")? yes :no }
  ┃➜ ${prefix}listaanonimo ${featError("listaanonimo")? yes :no }
  ┃➜ ${prefix}limparanonimo ${featError("limpiaranonimo")? yes :no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const jadibotMenu = (prefix) => {
return `
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝚂𝚎𝚛𝚋𝚘𝚝*
  ┃
  ┃➜ ${prefix}serbot ${featError("serbot")? yes :no }
  ┃➜ ${prefix}detenerserbot ${featError("detenerserbot")? yes :no }
  ┃➜ ${prefix}eliminarserbot ${featError("eliminarserbot")? yes :no }
  ┃➜ ${prefix}listaserbot ${featError("listaserbot")? yes :no }
  ┃➜ ${prefix}limpiarserbot ${featError("limpiarserbot")? yes :no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const randomMenu = (prefix) => {
return `
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝙰𝚕𝚎𝚊𝚝𝚘𝚛𝚒𝚘*
  ┃
  ┃➜ ${prefix}awoo ${featError("awoo")? yes : no }
  ┃➜ ${prefix}bite ${featError("bite")? yes : no }
  ┃➜ ${prefix}blowjob ${featError("blowjob")? yes : no }
  ┃➜ ${prefix}blush ${featError("blush")? yes : no }
  ┃➜ ${prefix}bonk ${featError("bonk")? yes : no }
  ┃➜ ${prefix}boobs ${featError("boobs")? yes : no }
  ┃➜ ${prefix}bully ${featError("bully")? yes : no }
  ┃➜ ${prefix}cringe ${featError("cringe")? yes : no }
  ┃➜ ${prefix}cry ${featError("cry")? yes : no }
  ┃➜ ${prefix}cuddle ${featError("cuddle")? yes : no }
  ┃➜ ${prefix}cuddle2 ${featError("cuddle2")? yes : no }
  ┃➜ ${prefix}dance ${featError("dance")? yes : no }
  ┃➜ ${prefix}glomp ${featError("glomp")? yes : no }
  ┃➜ ${prefix}handhold ${featError("handhold")? yes : no }
  ┃➜ ${prefix}happy ${featError("happy")? yes : no }
  ┃➜ ${prefix}hentai ${featError("hentai")? yes : no }
  ┃➜ ${prefix}highfive ${featError("highfive")? yes : no }
  ┃➜ ${prefix}hug ${featError("hug")? yes : no }
  ┃➜ ${prefix}hug2 ${featError("hug2")? yes : no }
  ┃➜ ${prefix}kick ${featError("kick")? yes : no }
  ┃➜ ${prefix}kill ${featError("kill")? yes : no }
  ┃➜ ${prefix}kill2 ${featError("kill2")? yes : no }
  ┃➜ ${prefix}kiss ${featError("kiss")? yes : no }
  ┃➜ ${prefix}kiss2 ${featError("kiss2")? yes : no }
  ┃➜ ${prefix}lesbian ${featError("lesbian")? yes : no }
  ┃➜ ${prefix}lick ${featError("lick")? yes : no }
  ┃➜ ${prefix}megumin ${featError("megumin")? yes : no }
  ┃➜ ${prefix}neko ${featError("neko")? yes : no }
  ┃➜ ${prefix}neko2 ${featError("neko2")? yes : no }
  ┃➜ ${prefix}nom ${featError("nom")? yes : no }
  ┃➜ ${prefix}pat ${featError("pat")? yes : no }
  ┃➜ ${prefix}pat2 ${featError("pat2")? yes : no }
  ┃➜ ${prefix}poke ${featError("poke")? yes : no }
  ┃➜ ${prefix}punch ${featError("punch")? yes : no }
  ┃➜ ${prefix}shinobu ${featError("shinobu")? yes : no }
  ┃➜ ${prefix}slap ${featError("slap")? yes : no }
  ┃➜ ${prefix}slap2 ${featError("slap2")? yes : no }
  ┃➜ ${prefix}smile ${featError("smile")? yes : no }
  ┃➜ ${prefix}smug ${featError("smug")? yes : no }
  ┃➜ ${prefix}trap ${featError("trap")? yes : no }
  ┃➜ ${prefix}waifu ${featError("waifu")? yes : no }
  ┃➜ ${prefix}waifu2 ${featError("waifu2")? yes : no }
  ┃➜ ${prefix}waifu3 ${featError("waifu3")? yes : no }
  ┃➜ ${prefix}wave ${featError("wave")? yes : no }
  ┃➜ ${prefix}wink ${featError("wink")? yes : no }
  ┃➜ ${prefix}wink2 ${featError("wink2")? yes : no }
  ┃➜ ${prefix}yeet ${featError("yeet")? yes : no }
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const storageMenu = (prefix) => {
return `
  ❍┣━━┫ *𝙼𝚎𝚗𝚞 𝙰𝚍𝚒𝚌𝚒𝚘𝚗𝚊𝚛*
  ┃
  ┃➜ ${prefix}addowner ou aggmod ${featError("aggmod")? yes : no }
  ┃➜ ${prefix}addpremium ${featError("aggpremium")? yes : no }
  ┃➜ ${prefix}addvip ou aggalquiler ${featError("aggalquiler")? yes : no }
  ┃➜ ${prefix}addstick ${featError("aggstick")? yes : no }
  ┃➜ ${prefix}addnv ${featError("aggnv")? yes : no }
  ┃➜ ${prefix}addgemas ${featError("agggemas")? yes : no }
  ┃➜ ${prefix}addbalance ${featError("aggbalance")? yes : no }
  ┃➜ ${prefix}defcmd ${featError("defcmd")? yes : no }
  ┃➜ ${prefix}eliminarmod ${featError("eliminarmod")? yes : no }
  ┃➜ ${prefix}depremium ou retirarpremium ${featError("depremium")? yes : no }
  ┃➜ ${prefix}eliminaralquiler ou retirarvip ${featError("eliminaralquiler")? yes : no }
  ┃➜ ${prefix}eliminarstick ${featError("eliminarstick")? yes : no }
  ┃➜ ${prefix}eliminarnv ${featError("eliminarnv")? yes : no }
  ┃➜ ${prefix}eliminargemas ${featError("eliminargemas")? yes : no }
  ┃➜ ${prefix}eliminarbalance ${featError("eliminarbalance")? yes : no }
  ┃➜ ${prefix}eliminarcmd ${featError("eliminarcmd")? yes : no }
  ┃➜ ${prefix}listamod ${featError("listamod")? yes : no }
  ┃➜ ${prefix}listapremium ${featError("listapremium")? yes : no }
  ┃➜ ${prefix}listaalquiler ${featError("listaalquiler")? yes : no }
  ┃➜ ${prefix}listastick ${featError("listastick")? yes : no }
  ┃➜ ${prefix}listanv ${featError("listanv")? yes : no }
  ┃➜ ${prefix}listabloq ${featError("listabloq")? yes : no }  
  ┃➜ ${prefix}listaban ${featError("listaban")? yes : no }  
  ┃➜ ${prefix}listabloqcmd ${featError("listabloqcmd")? yes : no }  
  ┃➜ ${prefix}listaerror ${featError("listaerror")? yes : no }  
  ┃➜ ${prefix}limpiarmod ${featError("limpiarmod")? yes : no }  
  ┃➜ ${prefix}limpiarpremium ${featError("limpiarpremium")? yes : no }  
  ┃➜ ${prefix}retirarvip ${featError("limpiaralquiler")? yes : no }  
  ┃➜ ${prefix}limpiarstick ${featError("limpiarstick")? yes : no }  
  ┃➜ ${prefix}limpiarnv ${featError("limpiarnv")? yes : no }  
  ┃➜ ${prefix}limpiarban ${featError("limpiarban")? yes : no }  
  ┃➜ ${prefix}limpiarbloq ${featError("limpiarbloq")? yes : no }  
  ┃➜ ${prefix}limpiarbloqcmd ${featError("limpiarbloqcmd")? yes : no }  
  ┃➜ ${prefix}limpiarerror ${featError("limpiarerror")? yes : no }  
  ┃➜ ${prefix}limpiarusuarios ${featError("limpiarusuarios")? yes : no }  
  ┃➜ ${prefix}limpiarmsj ${featError("limpiarmsj")? yes : no }  
  ┃➜ ${prefix}limpiartablero ${featError("limpiartablero")? yes : no } 
  ┃➜ ${prefix}limipardb ${featError("limpiardb")? yes : no } 
  ┃
  ❍┣━━━━━━━━━━━─◍᳝࣪.⋕𖥾ᤢ۪.۫ `
}

const fitur = (prefix) => {
return `
${groupMenu(prefix)}
${toolsMenu(prefix)}
${downloadMenu(prefix)}
${converterMenu(prefix)}
${searchMenu(prefix)}
${anonymousMenu(prefix)}
${jadibotMenu(prefix)}
${randomMenu(prefix)}
${storageMenu(prefix)}
${ownerMenu(prefix)}
`}

module.exports = {
ownerMenu, 
groupMenu, 
toolsMenu, 
//funMenu, 
//tagsMenu, 
downloadMenu, 
converterMenu, 
searchMenu, 
anonymousMenu, 
jadibotMenu, 
randomMenu, 
storageMenu, 
menu, 
fitur
}



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})