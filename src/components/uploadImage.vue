<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >
        <template v-slot:activator="{ on }">
            <v-btn
            small
            icon
            v-on="on"
            >
                <v-icon>mdi-image</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="headline grey lighten-2"
            primary-title
            >
            Загрузить картинку
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="src"
                    placeholder="Ссылка на картинку"
                ></v-text-field>
                Или
                <v-file-input accept="image/*" label="File input" v-model="img"></v-file-input>
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
        </v-dialog>
</template>

<script>
import { storage } from "@/plugins/firebase";
export default {
    name: "uploadImage",
    props: [
        "command"
    ],
    data() {
        return {
            dialog: false,
            src: '',
            img: null,
        }
    },
    methods: {
        upload() {
            if ( this.src != null) {
                this.command({src: this.src});
                this.dialog = false;
            }
            if ( this.img != null) {
                var _this = this;
                var storageRef = storage.ref();
                var uploadTask = storageRef.child('images/'+this.img.name).put(this.img);
                uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, (error) => {
                    console.log('error', error)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('File available at', downloadURL);
                        _this.command({src: downloadURL});
                        _this.dialog = false;
                    });
                })
            }
        }
    }
}
</script>