<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >
        <template v-slot:activator="{ on }">
            <v-btn
            small
            :icon="folder == 'images'"
            v-on="on"
            >   
                <v-icon v-if="folder == 'images'">mdi-image</v-icon>
                <span v-if="folder == 'files'">Добавить файл</span>
            </v-btn>
        </template>

        <v-card v-if="folder == 'images'">
            <v-card-title
            class="headline grey lighten-2"
            primary-title
            >
            Загрузить картинку
            </v-card-title>

            <v-card-text>
                <selectFile :folder="folder" @file-selected="fileSelected($event)"/>
                Или
                <v-text-field
                    v-model="src"
                    placeholder="Ссылка на картинку"
                ></v-text-field>
                Или
                <v-file-input accept="image/*" label="Прикрепите изображение" v-model="img"></v-file-input>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="upload"
            >
                Закгрузить картинку
            </v-btn>
            </v-card-actions>
        </v-card>

        <v-card v-if="folder == 'files'">
            <v-card-title
            class="headline grey lighten-2"
            primary-title
            >
            Загрузить файл
            </v-card-title>

            <v-card-text>
                <selectFile :folder="folder" @file-selected="fileSelected($event)"/>
                Или
                <v-text-field
                    v-model="src"
                    placeholder="Ссылка на файл"
                ></v-text-field>
                Или
                <v-file-input label="Прикрепите файл" v-model="img"></v-file-input>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="upload"
            >
                Закгрузить файл
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { storage } from "@/plugins/firebase";
import selectFile from "./selectFile";
export default {
    name: "uploadImage",
    props: [
        "command",
        "folder"
    ],
    components: {
        selectFile,
    },
    data() {
        return {
            dialog: false,
            src: '',
            img: null,
        }
    },
    
    methods: {
        fileSelected(fileUrl) {
            this.src = fileUrl;
            this.upload();
        },
        upload() {
            if ( this.src != null) {
                if (this.folder == "images") {
                    this.command({src: this.src});
                    this.dialog = false;
                }
                if (this.folder == "files") {
                    this.command({href: this.src});
                    this.dialog = false;
                }
                
            }
            if ( this.img != null) {
                var _this = this;
                var storageRef = storage.ref();
                var uploadTask = storageRef.child(this.folder +"/"+this.img.name).put(this.img);
                uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, (error) => {
                    if (this.folder == "images") {
                        _this.$toast.warning("Ошибка при загрузке изображения");
                    }
                    if (this.folder == "files") {
                        _this.$toast.warning("Ошибка при загрузке файла");
                    }
                    
                    console.log('error', error)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        if (_this.folder == "images") {
                            _this.$toast.success("Изображение успешно загруженно");
                            _this.command({src: downloadURL});
                        }
                        if (_this.folder == "files") {
                            _this.$toast.success("Файл успешно загружен");
                            _this.command({href: downloadURL});
                        }
                        
                        
                        _this.dialog = false;
                    });
                })
            }
        }
    }
}
</script>