import KeyValueStorage from "./KeyValueStorage"

const azureApiKey = 'azureApiKey';
const openAiApiKey = 'openAiApiKey';
const voice = 'voice';
const defaultVoice = 'pt-BR-ValerioNeural';
const chatGptTemperature = 'chatGptTemperature';
const chatGptTemperatureDefaultValue = 0.7;

const saveAzureApiKey = function(value) {
    return KeyValueStorage.set(azureApiKey, value);
}
const saveOpenAiApiKey = function(value) {
    return KeyValueStorage.set(openAiApiKey, value);
}
const saveChatGptTemperature = function(value) {
    return KeyValueStorage.set(chatGptTemperature, value);
}
const saveVoice = function(value) {
    return KeyValueStorage.set(voice, value);
}

export default {
    getAll: function() {
        return {
            azureApiKey: this.getAzureApiKey(),
            openAiApiKey: this.getOpenAiApiKey(),
            chatGptTemperature: this.getChatGptTemperature(),
            voice: this.getVoice()
        }
    },
    saveAll: function(settings) {
        saveAzureApiKey(settings.azureApiKey);
        saveOpenAiApiKey(settings.openAiApiKey);
        saveChatGptTemperature(settings.chatGptTemperature);
        saveVoice(settings.voice);
    },
    getAzureApiKey: function() {
        return KeyValueStorage.getOrEmptyString(azureApiKey);
    },
    getOpenAiApiKey: function() {
        return KeyValueStorage.getOrEmptyString(openAiApiKey);
    },
    getVoice: function() {
        return KeyValueStorage.has(voice) ? KeyValueStorage.get(voice) : defaultVoice;
    },
    getSpeechRecognitionLanguage: function() {
        return /..-../gm.exec(this.getVoice())[0];
    },
    getChatGptTemperature: function() {
        return KeyValueStorage.has(chatGptTemperature) ? KeyValueStorage.get(chatGptTemperature) : chatGptTemperatureDefaultValue;
    },
    allRequiredIsSet: function() {
        return KeyValueStorage.hasAndNotEmpty(azureApiKey) && KeyValueStorage.hasAndNotEmpty(openAiApiKey);
    }
}