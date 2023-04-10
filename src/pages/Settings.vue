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
                            <q-slider v-model="data.settings.chatGptTemperature" :min="0" :max="2" step="0.1" label/>
                            <q-item-label caption>What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.</q-item-label>
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

export default defineComponent({
    name: 'ChatGPT',
    setup() {
        const data = reactive({
            settings: Settings.getAll()
        });
        const $q = useQuasar();

        function save() {
            Settings.saveAll(data.settings)
            $q.notify('Settings saved!');
        }

        return {
            data,
            save
        }
    }
})
</script>
  