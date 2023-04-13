import Settings from "./Settings";

export default {
    getService: function() {
        const speechRecognition = window.webkitSpeechRecognition;
        const recognition = new speechRecognition()
        recognition.continuous = true;
        recognition.lang = Settings.getSpeechRecognitionLanguage();
        return recognition;
    }
}