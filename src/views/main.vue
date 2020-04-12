<template>
    <div>
        Добавить новый пункт в меню
        <v-text-field
          v-model="name"
          label="Название раздела"
        ></v-text-field>
        <v-btn @click="addSection()">
            Добавить
        </v-btn>
        <pre>
            {{menu}}
        </pre>
    </div>
</template>

<script>
import { db } from '@/plugins/firebase'
export default {
    name: 'mainPage',
    data() {
        return {
            menu: [],
            name: '',
        }
    },
    methods: {
        addSection() {
            if (this.name.length > 0) {
                db.collection('sections').add({
                    name: this.name,
                })
            };
            this.name = '';
        },
    },
	firestore() {
		return {
            menu: db.collection('sections')
        }
	},
}
</script>

<style>

</style>