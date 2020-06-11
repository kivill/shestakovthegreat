<template>
  <div>
    <template v-if="isEditable">
      <v-text-field v-model="article.name" label="Название статьи"></v-text-field>
      <v-text-field v-model="article.subtitle" label="Описание статьи"></v-text-field>
      <v-btn @click="saveArticle()">Сохранить</v-btn>
      <v-switch v-model="article.public" class="ma-2" label="Публичная статья"></v-switch>
      <v-select
        v-model="article.subsectionId"
        :items="sections"
        label="Выберите тематику"
        item-text="name"
        item-value="value"
      ></v-select>
    </template>
    <editor-menu-bubble v-if="isEditable" :elevation="20" class="menububble" :editor="editor" @hide="hideLinkMenu" v-slot="{ commands, isActive, getMarkAttrs, menu }">
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >

        <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
          <v-btn small icon class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
            <v-icon>mdi-link-variant-plus</v-icon>
          </v-btn>
        </form>

        <template v-else>
          <v-btn
            small
            class="menububble__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
          >
            <span>{{ isActive.link() ? 'Обновить ссылку' : 'Добавить ссылку'}}</span>
            <v-icon>mdi-link</v-icon>
          </v-btn>
          
          <uploadImage :command="commands.link" folder="files"/>
        </template>

      </div>
    </editor-menu-bubble>
    <v-card>
      <v-toolbar v-if="isEditable" dense flat color="grey lighten-4">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div>
            <v-btn small icon @click="commands.undo">
              <v-icon>mdi-undo</v-icon>
            </v-btn>
            <v-btn small icon @click="commands.redo">
              <v-icon>mdi-redo</v-icon>
            </v-btn>
            <v-btn small icon :class="{ 'v-btn--active': isActive.bold() }" @click="commands.bold">
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.italic() }"
              @click="commands.italic"
            >
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.strike() }"
              @click="commands.strike"
            >
              <v-icon>mdi-format-strikethrough</v-icon>
            </v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.underline() }"
              @click="commands.underline"
            >
              <v-icon>mdi-format-underline</v-icon>
            </v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.paragraph() }"
              @click="commands.paragraph"
            >
              <v-icon>mdi-format-paragraph</v-icon>
            </v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
            >H1</v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
            >H2</v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
            >H3</v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.heading({ level: 4 }) }"
              @click="commands.heading({ level: 4 })"
            >H4</v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.heading({ level: 5 }) }"
              @click="commands.heading({ level: 5 })"
            >H5</v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.bullet_list() }"
              @click="commands.bullet_list"
            >
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.ordered_list() }"
              @click="commands.ordered_list"
            >
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-btn>
            <v-btn
              small
              icon
              :class="{ 'v-btn--active': isActive.code_block() }"
              @click="commands.code_block"
            >
              <v-icon>mdi-code-tags</v-icon>
            </v-btn>
            <uploadImage :command="commands.image" folder="images"/>
            <v-btn
              small
              icon
              @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
            >
              <v-icon>mdi-table-large</v-icon>
            </v-btn>
            <span v-if="isActive.table()">
						<v-btn
              small
              icon							
							@click="commands.deleteTable"
						>
							<v-icon>mdi-table-large-remove</v-icon>
						</v-btn>
						<v-btn
              small
              icon
							@click="commands.addColumnBefore"
						>
							<v-icon>mdi-table-column-plus-before</v-icon>
						</v-btn>
						<v-btn
              small
              icon
							@click="commands.addColumnAfter"
						>
							<v-icon>mdi-table-column-plus-after</v-icon>
						</v-btn>
						<v-btn
              small
              icon
							@click="commands.deleteColumn"
						>
							<v-icon>mdi-table-column-remove</v-icon>
						</v-btn>
						<v-btn
              small
              icon
							@click="commands.addRowBefore"
						>
							<v-icon>mdi-table-row-plus-before</v-icon>
						</v-btn>
						<v-btn
              small
              icon
							@click="commands.addRowAfter"
						>
							<v-icon>mdi-table-row-plus-after</v-icon>
						</v-btn>
						<v-btn
              small
              icon
							@click="commands.deleteRow"
						>
							<v-icon>mdi-table-row-remove</v-icon>
						</v-btn>
						<v-btn
              small
              icon
							@click="commands.toggleCellMerge"
						>
							<v-icon>mdi-table-merge-cells</v-icon>
						</v-btn>
					</span>
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
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,  
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from "tiptap-extensions";
import uploadImage from "../components/uploadImage";

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    uploadImage,
    EditorMenuBubble
  },
  data() {
    return {
      editor: null,
      uploadImageDialog: false,
      linkUrl: null,
      linkMenuIsActive: false,
    };
  },
  created() {
    if ("EditArticle" == this.$route.name && !!this.article.textId) {
      var _this = this;
      this.$store.dispatch("GET_TEXT").then(data => {
        _this.startEditor(this.article.text);
      });
    } else if ("CreateArticle" == this.$route.name) {
      var _this = this;
      _this.startEditor(this.article.text);
    } else if (this.$route.params.id) {
      var _this = this;
      this.$store.dispatch("GET_TEXT", this.$route.params.id).then(data => {
        _this.startEditor(this.article.text);
      });
    }
    
  },
  computed: {
    article() {
      return this.$store.getters.CURRENT_ARTICLE;
    },
    sections() {
      return this.$store.getters.SECTIONS_FOR_ARTICLES;
    },
    isEditable() {
      let isAdmin = this.$store.getters.IS_ADMIN;
      return (
        ["CreateArticle", "EditArticle"].includes(this.$route.name) && isAdmin
      );
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
          new Heading({ levels: [1, 2, 3, 4, 5] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Table({
            resizable: true,
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
        ],
        content: content,
        editable: this.isEditable
      });
    },
    saveArticle() {
      this.article.text = this.editor.getHTML();
      if (this.$route.name == "EditArticle") {
        this.$store
          .dispatch("UPDATE_ARTICLE")
          .then(articleRef => {
            this.$router.push({ path: "/articles" });
            this.$toast.success("Статья сохранена");
          })
          .catch(error => {
            this.$toast.warning("Ошибка при сохранении");
            console.log(error);
          });
      }
      if (this.$route.name == "CreateArticle") {
        this.$store
          .dispatch("SAVE_ARTICLE")
          .then(articleRef => {
            this.$router.push({ path: "/articles" });
            this.$toast.success("Статья создана");
          })
          .catch(error => {
            this.$toast.warning("Ошибка при создании");
            console.log(error);
          });
      }
    },
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },
  },
  beforeDestroy() {
    if (this.editor == null) {
      this.editor.destroy();
    }
    this.$store.commit('SET_ARTICLE_DEFAULT');
  }
};
</script>

<style lang="scss">
.ProseMirror-focused {
  outline: none;
}
table, th, td {
  border: 1px solid rgb(75, 75, 75);
}
$color-black: rgb(0, 0, 0);
$color-white: rgb(255, 255, 255);
.menububble {
  position: absolute;
  display: flex;
  z-index: 9999;
  background: $color-black;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba($color-white, 0.1);
    }

    &.is-active {
      background-color: rgba($color-white, 0.2);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: $color-white;
  }
}
</style>