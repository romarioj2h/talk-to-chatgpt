import axios from 'axios';
import Settings from './Settings';

const baseUrl = 'https://brazilsouth.tts.speech.microsoft.com/cognitiveservices';

export default {
    speak: function(text) {
        const azureData = '<speak version=\'1.0\' xml:lang=\'pt-BR\'>' +
            '<voice xml:lang=\'pt-BR\' xml:gender=\'Male\' name=\'' + Settings.getVoice() + '\'>' +
                text +
            '</voice>' +
        '</speak>'
        return axios.post(baseUrl + '/v1', azureData, {
            headers: {
                'Ocp-Apim-Subscription-Key': Settings.getAzureApiKey(),
                'Content-Type': 'application/ssml+xml',
                'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
            },
            responseType: 'blob'
        }).then(audio => {
            const audioBlob = new Blob([audio.data], {type: "audio/mpeg"});
            const audioURL = URL.createObjectURL(audioBlob);
            (new Audio(audioURL)).play();
        });
    },
    // TODO: cache
    listVoices: function() {
        return axios.get(baseUrl + '/voices/list', {
            headers: {
                'Ocp-Apim-Subscription-Key': Settings.getAzureApiKey()
            }
        }).then(voices => voices.data.map(voice => {
            return {
                label: voice.DisplayName + ' - ' + voice.Gender + ' - ' + voice.LocaleName,
                value: voice.ShortName
            };
        }));
    }
};