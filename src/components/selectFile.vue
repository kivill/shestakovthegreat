<template>
    <v-dialog
      v-model="dialog"
      width="500"
      scrollable
    >
        <template v-slot:activator="{ on }">
            <v-btn
            small
            v-on="on"
            >
                Выбрать файл
            </v-btn>
        </template>

        <v-card>
            <v-card-title
                class="headline grey lighten-2"
                primary-title
            >
                Выберите файл
            </v-card-title>
            <v-card-text>
                <v-container fluid v-if="fileList.length != 0 && folder == 'images'">
                    <v-row dense>
                        <v-col v-for="(image, index) in fileList" :key="index">
                            <v-img :src="image.url" max-width="200" @click="upload(image.url)"></v-img>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container fluid v-if="fileList.length != 0 && folder == 'files'">
                    <v-list dense>
                        <v-list-item v-for="(file, index) in fileList" :key="index" @click="upload(file.url)">
                                <v-list-item-title >{{file.name}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { storage } from "@/plugins/firebase";
export default {
    name: "selectFile",
    props: [
        "folder"
    ],
    data() {
        return {
            dialog: false,
            fileList: [],
        }
    },
    created() {
        this.getfileList().then((data) => {
            this.fileList = data;
            console.log(this.fileList)
        })
    },
    methods: {
        getfileList() {
            return new Promise((resolve, reject) => {
                var list = [];
                var storageRef = storage.ref().child(this.folder +"/");
                storageRef.listAll().then((data) => {
                    for (const file of data.items) {
                        console.log(file);
                        file.getDownloadURL().then((url) => {
                            list.push({
                                url: url,
                                name: file.location.path_
                            })
                            resolve(list);
                        });
                        
                    }
                    
                })
            })
        },
        upload(imgUrl) {
            this.$emit("file-selected", imgUrl);
            this.dialog = false;
        }
    }
}
</script>

<style>

</style>