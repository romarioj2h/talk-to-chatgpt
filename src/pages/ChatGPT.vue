<template>
    <q-page class="flex flex-center">
        <div v-if="data.allRequiredIsSet">
            <q-btn @click="startListening" v-if="!data.isListening" color="primary">
                <q-icon size="3em" name="mic" />
                <div>Listen to me!</div>
            </q-btn>
            <div v-if="data.isListening">
                <div class="row text-center">
                    <div class="col col-12 q-mb-xl">
                        <q-spinner-bars color="primary" size="5em" />
                    </div>
                    <div class="col col-12">
                        <q-btn @click="stopListening" color="negative">
                            <q-icon size="3em" name="stop" />
                            <div>Stop listening!</div>
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <q-banner inline-actions class="text-white bg-warning">
                Azure and OpenAI API keys are needed for application to work
                <template v-slot:action>
                    <q-btn flat color="white" label="Go to settings" to="/Settings" />
                </template>
            </q-banner>
        </div>
    </q-page>
</template>
  
<script>
import { defineComponent, reactive } from 'vue'
import AzureTTS from '../services/AzureTTS'
import ChatGPT from '../services/ChatGPT'
import { useQuasar } from 'quasar'
import Settings from 'src/services/Settings'

export default defineComponent({
    name: 'ChatGPT',
    setup() {
        const data = reactive({
            isListening: false,
            allRequiredIsSet: Settings.allRequiredIsSet()
        });
        const $q = useQuasar()

        const speechRecognition = window.webkitSpeechRecognition;
        const recognition = new speechRecognition()
        recognition.continuous = true;
        recognition.lang = "pt-BR";
        recognition.onresult = function (event) {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            console.log(transcript)
            ChatGPT.getCompletion(transcript).then(chatData => {
                const responseChat = chatData.data.choices[0].message.content;
                console.log(responseChat);
                AzureTTS.speak(responseChat);
            }).catch(error => {
                console.log(error);
            });
        }
        recognition.onstart = function () {
            console.log("Voice Recognition is On")
            data.isListening = true;
        }
        recognition.onspeechend = function () {
            console.log("No Activity")
        }

        recognition.onerror = function (event) {
            if (event.error === 'no-speech') {
                $q.notify('No speech detected, please try again!');
            } else if (event.error !== 'aborted') {
                $q.notify('Something went wrong, please try again, Error : ' + event.error);
            }
            console.log(event)
        }

        recognition.onend = function () {
            data.isListening = false;
        }

        function startListening() {
            recognition.start();
        }

        function stopListening() {
            recognition.abort();
        }

        return {
            startListening,
            stopListening,
            data
        }
    }
})
</script>
  