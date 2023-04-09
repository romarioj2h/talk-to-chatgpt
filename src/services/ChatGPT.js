import axios from "axios";
import Settings from "./Settings";

export default {
    getCompletion: function(content) {
        return axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": content}],
                "temperature": 0.7
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + Settings.getOpenAiApiKey(),
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}