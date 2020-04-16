import { db } from "@/plugins/firebase"

const state = {
  sections: {
    data: [],
  },
  currentSection: {
    id: '',
    name: '',
    model: true,
    subsections: []
  }
}

const getters = {
  SECTIONS: state => state.sections.data,
}

const mutations = {
  SET_SECTIONS: (state, sections) => {
    state.sections.data = sections
  },
  SET_CURRENT_SECTION: (state, section) => {
    state.currentSection = {
      ...section,
    }
  },
  SET_SECTION_DEFAULT: state => {
    state.currentSection = {
      id: '',
      name: '',
      model: true,
      subsections: [],
    }
  },
}

const actions = {
  SET_SECTIONS: (context, payload) => {
    context.commit('SET_SECTIONS', payload)
  },
  EDIT_SECTION: (context, payload) => {
    context.commit('SET_CURRENT_SECTION', payload)
  },
  DELETE_SECTION: (context, payload) => {
    return new Promise((resolve, reject) => {
      db.collection('sections').doc(payload.id).delete()
        .then(ref => {
          resolve(ref)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  SAVE_SECTION: context => {
    console.log(state.currentSection)
    return new Promise((resolve, reject) => {
      db.collection('sections').add(state.currentSection)
        .then(ref => {
          context.commit('SET_SECTION_DEFAULT')
          resolve(ref)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  UPDATE_SECTION: context => {
    return new Promise((resolve, reject) => {
      db.collection('sections').doc(state.currentSection.id).update({
        name: state.currentSection.name,
      })
        .then(() => {
          context.commit('SET_ARTICLE_DEFAULT')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}