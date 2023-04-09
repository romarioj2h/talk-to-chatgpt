import KeyValueStorage from "./KeyValueStorage"

const azureApiKey = 'azureApiKey';
const openAiApiKey = 'openAiApiKey';

const saveAzureApiKey = function(value) {
    return KeyValueStorage.set(azureApiKey, value);
}
const saveOpenAiApiKey = function(value) {
    return KeyValueStorage.set(openAiApiKey, value);
}

export default {
    getAll: function() {
        return {
            azureApiKey: this.getAzureApiKey(),
            openAiApiKey: this.getOpenAiApiKey()
        }
    },
    saveAll: function(settings) {
        saveAzureApiKey(settings.azureApiKey);
        saveOpenAiApiKey(settings.openAiApiKey);
    },
    getAzureApiKey: function() {
        return KeyValueStorage.getOrEmptyString(azureApiKey);
    },
    getOpenAiApiKey: function() {
        return KeyValueStorage.getOrEmptyString(openAiApiKey);
    },
    allRequiredIsSet: function() {
        return KeyValueStorage.hasAndNotEmpty(azureApiKey) && KeyValueStorage.hasAndNotEmpty(openAiApiKey);
    }
}