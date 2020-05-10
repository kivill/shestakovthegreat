import { db } from "@/plugins/firebase";

const state = {
    articles: {
        data: [],
    },
    currentArticle: {
        id: '',
        name: '',
        public: false,
        text: '',
        textId: '',
        subsectionId: '',
    }
};

const getters = {
    ARTICLES: state => state.articles.data,
    CURRENT_ARTICLE: state => state.currentArticle,
};

const mutations = {
    SET_ARTICLES: (state, articles) => {
        state.articles.data = articles;
    },
    SET_CURRENT_ARTICLE: (state, article) => {
        state.currentArticle = {
            text: '',
            ...article
        };
    },
    SET_TEXT: (state, text) => {
        state.currentArticle.text = text;
    },
    SET_ARTICLE_DEFAULT: (state) => {
        state.currentArticle = {
            id: '',
            name: '',
            public: false,
            text: '',
            textId: '',
            subsectionId: '',
        };
    },
};

const actions = {
    GET_ARTICLES: (context) => {
        var articles = []
        db.collection('articles').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) =>{
                articles.push({
                    id: doc.id,
                    ...doc.data()
                });
            })
            context.commit('SET_ARTICLES', articles);
        })
    },
    GET_TEXT: (context) => {
        return new Promise((resolve, reject) => {
            db.collection('texts').doc(state.currentArticle.textId).get()
            .then((querySnapshot) => {
                context.commit('SET_TEXT', querySnapshot.data().text);
                resolve(querySnapshot)
            })
            .catch((error) => {
                reject(error);
            });
        })
    },
    EDIT_ARTICLE: (context, article) => {
        context.commit('SET_CURRENT_ARTICLE', article)
    },
    DELETE_ARTICLE: (context, article) => {
        return new Promise((resolve, reject) => {
            db.collection('texts').doc(article.textId).delete()
            .then((textRef) => {
                db.collection('articles').doc(article.id).delete()
                .then((articleRef) => {
                    resolve(articleRef)
                })
                .catch((error) => {
                    reject(error);
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    SAVE_ARTICLE: (context) => {
        console.log(state.currentArticle);
        return new Promise((resolve, reject) => {
            db.collection('texts').add({
                text: state.currentArticle.text
            })
            .then((textRef) => {
                db.collection('articles').add({
                    name: state.currentArticle.name,
                    public: state.currentArticle.public,
                    textId: textRef.id,
                    subsectionId: state.currentArticle.subsectionId,
                })
                .then((articleRef) => {
                    context.commit('SET_ARTICLE_DEFAULT');
                    resolve(articleRef)
                })
                .catch((error) => {
                    reject(error);
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    UPDATE_ARTICLE: (context) => {
        return new Promise((resolve, reject) => {
            db.collection('texts').doc(state.currentArticle.textId).update({
                text: state.currentArticle.text
            })
            .then(() => {
                db.collection('articles').doc(state.currentArticle.id).update({
                    name: state.currentArticle.name,
                    public: state.currentArticle.public,
                    subsectionId: state.currentArticle.subsectionId,
                })
                .then(() => {
                    context.commit('SET_ARTICLE_DEFAULT');
                    resolve()
                })
                .catch((error) => {
                    reject(error);
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
