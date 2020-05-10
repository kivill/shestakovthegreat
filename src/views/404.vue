<template>
    <v-content>
        <v-row align="center" justify="center" class="text-center">
            <v-col cols="12" align-self="center">
                <h1 class="display-1 text--thin login__title">
                    404
                </h1>
            </v-col>
            <v-col cols="12">
                <div class="subtitle is-4">
                    Страница не найдена :(<br>
                </div>
            </v-col>
            <v-col cols="12">
                <v-btn @click="$router.push({path:'/'})" color="primary" medium>Вернуться на главную</v-btn>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
export default {
    name: 'Page404',
}
</script>

<style>

</style>