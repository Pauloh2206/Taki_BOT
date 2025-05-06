const fs = require("fs") 
const chalk = require("chalk")
const { Innertube } = require("youtubei.js") // Use Innertube from youtubei.js
const { pickRandom, getBuffer } = require("@libs/function")

module.exports = {
    commands: ["music"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<texto>",
    example: "{prefix}{command} Assombra matriz 4",
    isSewa: true,
    callback: async ({ sock, m, text }) => {
        try {
            const youtube = await Innertube.create(); // Create an Innertube instance

            // Search for videos
            const search = await youtube.search(text, { type: "video" });

            if (!search.videos || search.videos.length === 0) {
                return m.reply("Desculpe, não foram encontrados resultados para a sua pesquisa.");
            }

            // Filter results (optional: keep duration filter or adjust as needed)
            // Note: youtubei.js provides duration in seconds
            const filteredVideos = search.videos.filter(video => video.duration.seconds <= 600); // Example: max 10 minutes (600 seconds)
            
            if (filteredVideos.length === 0) {
                 // Try finding the first result if no short videos are found
                 const firstResult = search.videos[0];
                 if (!firstResult) return m.reply("Nenhum vídeo encontrado.");
                 
                 const info = await youtube.getBasicInfo(firstResult.id);
                 const stream = await youtube.download(firstResult.id, {
                    type: "audio", // audio or video
                    quality: "best", // best, bestefficiency, lowestaudio, highestaudio etc.
                    format: "mp4" // media container format
                 });

                 const chunks = [];
                 for await (const chunk of stream) {
                     chunks.push(chunk);
                 }
                 const buffer = Buffer.concat(chunks);

                 let teks = "\`\`\`「 YOUTUBE PLAY 」\`\`\`\n\n"
                 teks += `⭔ *Titulo* : ${info.basic_info.title}\n`
                 teks += `⭔ *Duração* : ${info.basic_info.duration_string}\n` // Use duration_string for formatted duration
                 teks += `⭔ *Visualizações* : ${info.basic_info.view_count?.toLocaleString('pt-BR')}\n`
                 teks += `⭔ *Link* : https://www.youtube.com/watch?v=${firstResult.id}`
                 
                 const thumbnail_play = await getBuffer(info.basic_info.thumbnail[0].url);
                 await sock.sendMessage(m.chat, { image: thumbnail_play, caption: teks }, { quoted: m });
                 await sock.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mp4", ptt: false }, { quoted: m });
                 return; // Exit after sending the first result
            }

            // Pick a random video from the filtered list
            const randomVideo = pickRandom(filteredVideos);
            const videoId = randomVideo.id;

            // Get video info and download stream
            const info = await youtube.getBasicInfo(videoId);
            const stream = await youtube.download(videoId, {
                type: "audio", // audio or video
                quality: "best", // best, bestefficiency, lowestaudio, highestaudio etc.
                format: "mp4" // media container format
            });

            // Download the stream into a buffer
            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);

            // Prepare and send messages
            let teks = "\`\`\`「 YOUTUBE PLAY 」\`\`\`\n\n"
            teks += `⭔ *Titulo* : ${info.basic_info.title}\n`
            teks += `⭔ *Duração* : ${info.basic_info.duration_string}\n` // Use duration_string for formatted duration
            teks += `⭔ *Visualizações* : ${info.basic_info.view_count?.toLocaleString('pt-BR')}\n`
            teks += `⭔ *Link* : https://www.youtube.com/watch?v=${videoId}`

            const thumbnail_play = await getBuffer(info.basic_info.thumbnail[0].url);
            await sock.sendMessage(m.chat, { image: thumbnail_play, caption: teks }, { quoted: m });
            await sock.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mp4", ptt: false }, { quoted: m });

        } catch (error) {
            console.error("Erro no comando music:", error);
            m.reply("Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.");
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
