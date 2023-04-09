import KeyValueStorage from "./KeyValueStorage"

export default {
    getAll: function() {
        return {
            azureApiKey: this.getAzureApiKey(),
            openAiApiKey: this.getOpenAiApiKey()
        }
    },
    getAzureApiKey: function() {
        return KeyValueStorage.getOrEmptyString('azureApiKey');
    },
    getOpenAiApiKey: function() {
        return KeyValueStorage.getOrEmptyString('openAiApiKey');
    },
    saveAll: function(settings) {
        this.saveAzureApiKey(settings.azureApiKey);
        this.saveOpenAiApiKey(settings.openAiApiKey);
    },
    saveAzureApiKey: function(value) {
        return KeyValueStorage.set('azureApiKey', value);
    },
    saveOpenAiApiKey: function(value) {
        return KeyValueStorage.set('openAiApiKey', value);
    },
    allRequiredIsSet: function() {
        return KeyValueStorage.hasAndNotEmpty('azureApiKey') && KeyValueStorage.hasAndNotEmpty('openAiApiKey');
    }
}