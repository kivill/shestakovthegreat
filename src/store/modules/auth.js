import { auth, } from "@/plugins/firebase"

const state = {
    auth: {
        creditionals: {
            email: '',
            password: '',
        },
        isAdmin: localStorage.getItem('isAdmin') || 0 ,
    },
}

const getters = {
    AUTH_CREDITIONALS: state => state.auth.creditionals,
    AUTH_TOKEN: state => state.auth.token,
    IS_ADMIN: state => !!state.auth.isAdmin,
}

const mutations = {
    SET_ADMIN_STATUS: (state, status) => {
        state.auth.isAdmin = status;
    },
}

const actions = {
    AUTH: (context) => {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(state.auth.creditionals.email, state.auth.creditionals.password)
            .then((data) => {
                context.commit('SET_ADMIN_STATUS', 1);
                localStorage.setItem('isAdmin', 1)
                resolve(data)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            }) 
        })
    },

    ADMIN_STATUS: (context, status) => {
        context.commit('SET_ADMIN_STATUS', status);
    },

    ADMIN_SIGN_OUT: (context) => {
        context.commit('SET_ADMIN_STATUS', false);
        localStorage.removeItem('isAdmin');
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}