import axios from 'axios';
import Settings from './Settings';

export default {
    speak: function(text) {
        const azureData = '<speak version=\'1.0\' xml:lang=\'pt-BR\'>' +
            '<voice xml:lang=\'pt-BR\' xml:gender=\'Male\' name=\'pt-BR-ValerioNeural\'>' +
                text +
            '</voice>' +
        '</speak>'
        axios.post('https://brazilsouth.tts.speech.microsoft.com/cognitiveservices/v1', azureData, {
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
        }).catch(error => console.log(error));
    }
};