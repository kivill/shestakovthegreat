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
    <v-card>
        <v-toolbar dense flat color="grey lighten-4">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div>
                    <v-btn
                        small
                        icon
                        @click="commands.undo">
                        <v-icon>mdi-undo</v-icon>
                    </v-btn>
                    <v-btn
                        small
                        icon
                        @click="commands.redo">
                        <v-icon>mdi-redo</v-icon>
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.bold() }"
                        @click="commands.bold">
                        <v-icon>mdi-format-bold</v-icon>
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.italic() }"
                        @click="commands.italic">
                        <v-icon>mdi-format-italic</v-icon>
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.strike() }"
                        @click="commands.strike">
                        <v-icon>mdi-format-strikethrough</v-icon>
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.underline() }"
                        @click="commands.underline">
                        <v-icon>mdi-format-underline</v-icon>
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.paragraph() }"
                        @click="commands.paragraph">
                        <v-icon>mdi-format-paragraph</v-icon>
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })">
                        H1
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })">
                        H2
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })">
                        H3
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.bullet_list() }"
                        @click="commands.bullet_list">
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.ordered_list() }"
                        @click="commands.ordered_list">
                        <v-icon>mdi-format-list-numbered</v-icon>
                    </v-btn>
                    <v-btn
                        small
                        icon
                        :class="{ 'v-btn--active': isActive.code_block() }"
                        @click="commands.code_block">
                        <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                    <uploadImage :command="commands.image"/>
                </div>
            </editor-menu-bar>
        </v-toolbar>
        <v-card-text>
            <editor-content class="editor__content" :editor="editor" />
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    Image,
} from 'tiptap-extensions';
import uploadImage from "../components/uploadImage"

export default {
    components: {
        EditorContent,
        EditorMenuBar,
        uploadImage
    },
    data() {
        return {
            editor: null,
            uploadImageDialog: false,
        };
    },
    created() {        
        if (this.$route.name == 'EditArticle' && !!this.article.textId) {
            var _this = this;
            this.$store.dispatch('GET_TEXT').then((data) => {
                _this.startEditor(this.article.text);
            })
        };

    },
    computed: {
        article() {
            return this.$store.getters.CURRENT_ARTICLE;
        }
    },
    methods: {
        startEditor(content) {
            this.editor = new Editor({
                extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3] }),
                    new HorizontalRule(),
                    new ListItem(),
                    new OrderedList(),
                    new TodoItem(),
                    new TodoList(),
                    new Link(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Strike(),
                    new Underline(),
                    new History(),
                    new Image(),
                ],
                content: content
            })
        },
        saveArticle() {
            this.article.text = this.editor.getHTML();
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
        showImagePrompt(command) {
            const src = prompt('Enter the url of your image here')
            if (src !== null) {
                command({ src })
            }
        },
        log(item) {
            console.log(item)
        }
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style>

</style>