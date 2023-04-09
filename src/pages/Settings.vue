<template>
    <q-page class="flex">
        <div class="row full-width justify-center">
            <div class="col-8">
                <q-list>
                    <q-item-label header>User Controls</q-item-label>

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
  