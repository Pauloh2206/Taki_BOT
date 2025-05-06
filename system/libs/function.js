const { jidDecode } = require("baileys")
const chalk = require("chalk") 
const fs = require("fs") 
const jimp = require("jimp")
const axios = require("axios") 



const decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {}
        return decode.user && decode.server && decode.user + "@" + decode.server || jid
        } else return jid
}



let d = new Date
let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime()
let weton = ["Pahing", "Pon","Wage","Kliwon","Legi"][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString("es", { weekday: "long" })
let calender = d.toLocaleDateString("es", {
day: "numeric",
month: "long",
year: "numeric"
})


const getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({method: "get", url, headers: { "DNT": 1,
"Upgrade-Insecure-Request": 1
},
...options,
responseType: "arraybuffer"
})
return res.data
} catch (e) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${e}`)
}
}



const generateProfilePicture = async (buffer) => {
try{
const Jimp = await jimp.read(buffer)
const min = Jimp.getWidth()
const max = Jimp.getHeight()
const cropped = Jimp.crop(0, 0, min, max)
return {
img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG)
}
} catch {}
}




const toFirstCase = (str) => {
let first = str.split(" ").map((nama) => nama.charAt(0).toUpperCase() + nama.slice(1)).join(" ")
return first
}

const runtime = (time) => {
time = Number(time)
const years = Math.floor(time / (3600 * 8640))
const months = Math.floor(time / (3600 * 720))
const weeks = Math.floor(time / (3600 * 168))
const days = Math.floor(time / (3600 * 24))
const hours = Math.floor((time % (3600 * 24)) / 3600)
const minutes = Math.floor((time % 3600) / 60)
const seconds = Math.floor(time % 60)
const isYears = years > 0? `${years} años, ` : ""
const isMonths = months > 0? `${months} meses, ` : ""
const isWeeks = weeks > 0? `${weeks} semanas, ` : ""
const isDays = days > 0? `${days} días, ` : ""
const isHours = hours > 0? `${hours} horas, ` : ""
const isMinutes = minutes > 0? `${minutes} minutos, ` : ""
const isSeconds = seconds > 0? `${seconds} segundos` : ""
return isYears + isMonths + isWeeks + isDays + isHours + isMinutes + isSeconds
}

const randomNomor = (angka) => {
return Math.floor(Math.random() * angka) + 1
}

const pickRandom = (list) => {
return list[Math.floor(Math.random() * list.length)]
}

const sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms))
}






module.exports = { week, pickRandom, sleep, generateProfilePicture, randomNomor, decodeJid, runtime, calender, getBuffer, toFirstCase }


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})