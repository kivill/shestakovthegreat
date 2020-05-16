import store from '@/store/index';

const Middlewares = {
    adminAccess(to, from, next) {
        const route = store.getters.IS_ADMIN
            ? undefined
            : '/404';
        next(route);
    },
    articleIsEmpty(to, from, next) {
        const route = store.getters.CURRENT_ARTICLE.id != ''
            ? undefined
            : '/articles';
        next(route);
    },
    
}

export { Middlewares }
