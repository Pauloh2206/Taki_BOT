const util = require("util");
const fs = require("fs");
const chalk = require("chalk");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Carregar configurações
let settings = {};
try {
    settings = JSON.parse(fs.readFileSync('./settings.json'));
} catch (e) {
    console.error(chalk.red("Erro ao ler settings.json:"), e);
    // Defina um valor padrão ou trate o erro como apropriado
}

// Verifique se a chave da API Gemini existe
if (!settings.geminiApiKey) {
    console.warn(chalk.yellow("Aviso: Chave da API Gemini (geminiApiKey) não encontrada em settings.json. A funcionalidade de IA pode não funcionar."));
}

// Inicialize o cliente Gemini apenas se a chave existir
let genAI, model;
if (settings.geminiApiKey) {
    genAI = new GoogleGenerativeAI(settings.geminiApiKey);
    // Use um modelo gratuito como 'gemini-1.5-flash-latest'
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});
} else {
    // Defina como null ou um objeto mock se a chave não estiver presente
    // para evitar erros em tempo de execução ao tentar usar 'model'
    model = null;
}

module.exports = {
    commands: ["gemini"],
    cooldown: 13,
    minArgs: 1, // Ajustado pois a pergunta é o texto completo
    expectedArgs: "<pergunta>",
    example: "{prefix}{command} Quem é o presidente do Brasil?",
    isSewa: true,
    isPremium: true,
    callback: async ({ m }) => {
        // Verifique se o modelo foi inicializado (chave API estava presente)
        if (!model) {
            return m.reply("Erro: A integração com a IA não está configurada corretamente. Verifique a chave da API Gemini em settings.json.");
        }

        try {
            const prompt = m.text;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            m.reply(util.format(text));
        } catch (error) {
            console.error(chalk.red("Erro ao chamar a API Gemini:"), error);
            // Tente extrair uma mensagem de erro mais específica, se disponível
            let errorMessage = "Ocorreu um erro ao processar sua solicitação com a IA.";
            if (error.message) {
                errorMessage += ` Detalhes: ${error.message}`;
            }
            // Verifique se o erro é relacionado à API Key inválida
            if (error.message && error.message.includes('API key not valid')) {
                 errorMessage = "Erro: A chave da API Gemini configurada é inválida. Verifique settings.json.";
            }
            m.reply(util.format(errorMessage));
        }
    }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`);
    delete require.cache[file];
    require(file);
});

