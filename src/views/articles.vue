<template>
    <v-container>
        Список статей
        <v-btn @click="createArticle()">
            Добавить новую статью
        </v-btn>
        <v-list >
            <v-list-item
                v-for="article in articles"
                :key="article.id"
            >
                <v-list-item-content>
                    <v-list-item-title v-text="article.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="d-inline">
                    <v-btn icon @click="editArticle(article)">
                        <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteArticle(article)">
                        <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
import { db } from "@/plugins/firebase";
export default {
    data() {
		return {

		};
    },
    created() {
        this.$store.dispatch('GET_ARTICLES');
    },
    computed: {
        articles() {
            return this.$store.getters.ARTICLES;
        }
    },
    methods: {
        createArticle() {
            this.$router.push({ path: '/articles/create' });
        },
        editArticle(article) {
            this.$store.dispatch('EDIT_ARTICLE', article)
            this.$router.push({ path: '/articles/edit' });
        },
        deleteArticle(article) {
            this.$store.dispatch('DELETE_ARTICLE', article)
            .then((articleRef) =>{
                this.$store.dispatch('GET_ARTICLES');
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>

<style>

</style>