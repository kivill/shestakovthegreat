<template>
    <div>
        Добро пожаловать на сайт Шестакова А.П.
    </div>
</template>

<script>
import { db } from '@/plugins/firebase'
export default {
    name: 'mainPage',
    data() {
        return {
            
        }
    },
    methods: {
        
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