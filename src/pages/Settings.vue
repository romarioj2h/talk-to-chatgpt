<template>
    <q-page class="flex">
        <div class="row full-width justify-center">
            <div class="col-8">
                <q-list>
                    <q-item-label header>API keys</q-item-label>

                    <q-item>
                        <q-item-section>
                            <q-input v-model="data.settings.openAiApiKey" label="OpenAI API Key" />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-input v-model="data.settings.azureApiKey" label="Azure TTS API Key" />
                        </q-item-section>
                    </q-item>

                    <q-item-label header>Other settings</q-item-label>

                    <q-item>
                        <q-item-section side>
                            <q-icon name="thermostat" />
                        </q-item-section>
                        <q-item-section>
                            <q-slider v-model="data.settings.chatGptTemperature" :min="0" :max="2" step="0.1" label />
                            <q-item-label caption>What sampling temperature to use, between 0 and 2. Higher values like 0.8
                                will make the output more random, while lower values like 0.2 will make it more focused and
                                deterministic.</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section side>
                            <q-icon name="language" />
                        </q-item-section>
                        <q-item-section>
                            <q-select emit-value map-options v-model="data.settings.voice" :options="data.voiceOptions" @filter="filterFn" filled use-input hide-selected fill-input input-debounce="0"/>
                            <q-item-label caption>
                                Choosing a voice will also define the speech recognition language
                            </q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section>
                            <q-btn color="primary" label="Save" @click="save" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-page>
</template>
  
<script>
import { defineComponent, reactive } from 'vue'
import Settings from 'src/services/Settings'
import { useQuasar } from 'quasar'
import AzureTTS from 'src/services/AzureTTS';

export default defineComponent({
    name: 'ChatGPT',
    setup() {
        let voiceOptions = [];
        const data = reactive({
            settings: Settings.getAll(),
            voiceOptions: []
        });
        const $q = useQuasar();

        function save() {
            Settings.saveAll(data.settings)
            $q.notify('Settings saved!');
        }

        AzureTTS.listVoices().then(voices => {
            voiceOptions = voices;
            data.voiceOptions = voices;
        });

        function filterFn(val, update) {
            update(() => {
                const needle = val.toLowerCase()
                data.voiceOptions = voiceOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
            })
        }


        return {
            data,
            save,
            filterFn
        }
    }
})
</script>
  