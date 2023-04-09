import KeyValueStorage from "./KeyValueStorage"

const azureApiKey = 'azureApiKey';
const openAiApiKey = 'openAiApiKey';

const getAzureApiKey = function() {
    return KeyValueStorage.getOrEmptyString(azureApiKey);
}
const getOpenAiApiKey = function() {
    return KeyValueStorage.getOrEmptyString(openAiApiKey);
}
const saveAzureApiKey = function(value) {
    return KeyValueStorage.set(azureApiKey, value);
}
const saveOpenAiApiKey = function(value) {
    return KeyValueStorage.set(openAiApiKey, value);
}

export default {
    getAll: function() {
        return {
            azureApiKey: getAzureApiKey(),
            openAiApiKey: getOpenAiApiKey()
        }
    },
    saveAll: function(settings) {
        saveAzureApiKey(settings.azureApiKey);
        saveOpenAiApiKey(settings.openAiApiKey);
    },
    allRequiredIsSet: function() {
        return KeyValueStorage.hasAndNotEmpty(azureApiKey) && KeyValueStorage.hasAndNotEmpty(openAiApiKey);
    }
}