<template>
    <div>
    <v-text-field
        v-model="article.name"
        label="Название статьи"
    ></v-text-field>
    <v-btn @click="saveArticle()">
        Сохранить
    </v-btn>
    <v-switch v-model="article.public" class="ma-2" label="Публичная статья"></v-switch>
    <tiptap-vuetify
      v-model="article.text"
      :extensions="extensions"
    />
  </div>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, CodeBlock, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History, Image } from 'tiptap-vuetify'
export default {
    components: { TiptapVuetify },
    data() {
        return {
			extensions: [
                History,
                Blockquote,
                Link,
                Underline,
                Strike,
                Italic,
                ListItem,
                BulletList,
                OrderedList,
                [Heading, {
                    options: {
                    levels: [1, 2, 3]
                    }
                }],
                Bold,
                CodeBlock,
                HorizontalRule,
                Paragraph,
                HardBreak, 
                Image
            ],
        };
    },
    created() {        
        if (this.$route.name == 'EditArticle' && !!this.article.textId) {
            this.$store.dispatch('GET_TEXT')
        };
    },
    computed: {
        article() {
            return this.$store.getters.CURRENT_ARTICLE;
        }
    },
    methods: {
        saveArticle() {
            if (this.$route.name == 'EditArticle') {
                this.$store.dispatch('UPDATE_ARTICLE')
                .then((articleRef) =>{
                    this.$router.push({ path: '/articles' });
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            if (this.$route.name == 'CreateArticle') {
                this.$store.dispatch('SAVE_ARTICLE')
                .then((articleRef) =>{
                    this.$router.push({ path: '/articles' });
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
    },
}
</script>

<style>

</style>