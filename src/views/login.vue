<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" xl="4" lg="6" md="8" sm="12">
                <v-container fluid>
                    <h1 class="display-1 text--thin login__title">Вход</h1>
                    <form dense class="registration-card">
                        <v-col cols="12" md="12" style="padding: 0">
                            <v-text-field
                                label="Email"
                                outlined
                                autocomplete="false"
                                v-model="creditionals.email"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="12" style="padding: 0">
                            <v-text-field
                                label="Пароль"
                                outlined
                                autocomplete="new-password"
                                v-model="creditionals.password"
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="showPassword = !showPassword"
                                required
                                ref="password"
                                class="pa-0 ma-0"
                                @keyup.enter.native="auth"
                            ></v-text-field>
                        </v-col>
                        <div class="login__button">
                            <v-btn width="100%" large depressed color="secondary"
                                   @click="auth()">Вход
                            </v-btn>
                        </div>
                    </form>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { auth, } from "@/plugins/firebase"

export default {
    name: 'Login',
    data() {
            return {
                showPassword: false,
            }
    },
    created() {

    },
    computed: {
        creditionals() {
            return this.$store.getters.AUTH_CREDITIONALS;
        },
    },
    methods: {
        auth() {
            this.$store.dispatch('AUTH')
            .then((data) => {
                this.$router.push({path:'/sections'});
                this.$toast.success('Успешная авторизация');            
            })
            .catch((error) => {
                this.$toast.warning('Ошибка авторизации!');
            });                 
        },
    },
}
</script>

<style>

</style>