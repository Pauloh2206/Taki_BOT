const { default: axios, AxiosRequestConfig, AxiosResponse } = require("axios")
const FormData = require("form-data")
const config = require("@config")
const fs = require("fs")
const qs = require("querystring")






const ChatGPTRequest = async (text) => {
    const result = { status: false, data: "Não sei", message: "" }
    return await axios({ method: "post", url: "https://api.openai.com/v1/completions", data: { model: "text-davinci-003", prompt: text, max_tokens: 1000, temperature: 0 },
    headers: { "accept": "application/json", "Content-Type": "application/json", "Accept-Language": "in-ID", "Authorization": `Bearer ${config.openAiKey}` }}).then((response) => {
        if (response.status == 200) {
            const { choices } = response.data
            if (choices && choices.length) {
                result.status = true
                result.data = choices[0].text
            }
        } else {
            result.message = "Há um erro no servidor"
        }
        return result
    }).catch((error) => {
        if (error.message.includes("401")) {
            result.message = "As chaves ainda estão vazias"
        } else if (error.message.includes("429")) {
            result.message = "Sem chave de acesso"
        } else {
            result.message = "Error : " + error.message
        }
            return result
    })
}


const removebg = async (buffer) => {
     const result = { status: false, base64: null, message: "" }
     const form = new FormData
     form.append("size", "auto")
     form.append("image_file", fs.createReadStream(buffer), "ntah.webp")
     return await axios({ url: "https://api.remove.bg/v1.0/removebg", method: "post", data: form, responseType: "arraybuffer",
     headers: { "X-Api-Key": config.removebgKey, ...form.getHeaders() }}).then((response) => {
         if (response.status == 200) {
             result.status = true
             result.base64 = response.data
         } else {
             result.message = "Há um erro no servidor"
         }
         return result
     }).catch((error) => {
         if (error.message.includes("401")) {
             result.message = "As chaves ainda estão vazias"
         } else if (error.message.includes("403")) {
             result.message = "Sem chave de acesso"
         } else {
             result.message = "Error : " + error.message
         }
         return result
     })
}


const chatSimiRequest = async (text) => {
    const result = { status: false, data: "Aku gak tau", message: "" }
    return await axios.get(`https://api.simsimi.net/v2/?text=${encodeURI(text)}&lc=id`).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data.success
        } else {
            result.message = "Há um erro no servidor"
        }
        return result
    }).catch(() => {
        result.message = "Há um erro no servidor"
        return result
    })
}



const post = async (url, formdata, options) => {
    return new Promise((resolve, reject) => {
        if (!(formdata instanceof FormData)) {
            return axios.post(url, qs.stringify(formdata), { headers: { "Content-Type": "application/x-www-form-urlencoded" }, ...options }).then(resolve).catch(reject)
        } else {
            return axios.post(url, formdata, { headers: formdata.getHeaders(), ...options }).then(resolve).catch(reject) 
        }
    })
}


const githubAccount = async (accountName) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://api.github.com/users/"+ accountName).then(async (response) => {
        if (response.status == 200 && Object.keys(response.data).length > 2) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Account not found"
        }
        return result
    }).catch(() => {
        result.message = "Account not found"
        return result
    })
}


const githubRepository = async (accountName, repositoryName) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://api.github.com/users/"+ accountName).then(async (response) => {
        if (response.status == 200 && Object.keys(response.data).length > 2) {
            return await axios.get("https://api.github.com/repos/"+ accountName + "/"  + repositoryName).then((res) => {
                if (res.status == 200 && Object.keys(res.data).length > 2) {
                    result.status = true
                    result.data = res.data
                } else {
                    result.message = "Repositório não encontrado"
                }
                return result
            }).catch(() => {
                result.message = "Repositório não encontrado"
                return result
            })
        } else {
            result.message = "Conta não encontrada"
        }
        return result
    }).catch(() => {
        result.message = "Conta não encontrada"
        return result
    })
}


const anime1Request = async (request) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://waifu.pics/api/sfw/" + request).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Há um erro no servidor"
        }
        return result
    }).catch(() => {
        result.message = "Há um erro no servidor"
        return result
    })
}


const anime2Request = async (request) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://anime-api.hisoka17.repl.co/img/" + request).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Há um erro no servidor"
        }
        return result
    }).catch(() => {
        result.message = "Há um erro no servidor"
        return result
    })
}


const anime3Request = async (request) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://waifu.pics/api/nsfw/" + request).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Há um erro no servidor"
        }
        return result
    }).catch(() => {
        result.message = "Há um erro no servidor"
        return result
    })
}


const anime4Request = async (request) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://anime-api.hisoka17.repl.co/img/nsfw/" + request).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Há um erro no servidor"
        }
        return result
    }).catch(() => {
        result.message = "Há um erro no servidor"
        return result
    })
}




const TelegraPh = async (buffer) => {
    const result = { status: false, data: "", message: "" }
    const form = new FormData();
    form.append("file", fs.createReadStream(buffer))
    return await axios({ url: "https://telegra.ph/upload", method: "POST",
        headers: { ...form.getHeaders() },
        data: form
    }).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = "https://telegra.ph" + response.data[0].src
        } else {
            result.message = "Há um erro no servidor"
        }
        return result
    }).catch(() => {
        result.message = "Há um erro no servidor"
        return result
    })
}




const UploadFileUgu = async (buffer) => {
    const result = { status: false, data: "", message: "" }
    const form = new FormData();
    form.append("files[]", fs.createReadStream(buffer))
    return await axios({ url: "https://uguu.se/upload.php", method: "POST",
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36", ...form.getHeaders() },
        data: form
    }).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data.files[0]
        } else {
            result.message = "Há um erro no servidor"
        }
        return result
    }).catch(() => {
        result.message = "Há um erro no servidor"
        return result
    })
}







module.exports = { githubAccount, githubRepository, anime4Request, anime3Request, anime2Request, anime1Request, post, chatSimiRequest, removebg, ChatGPTRequest, TelegraPh, UploadFileUgu }
