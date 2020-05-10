import { db, } from "@/plugins/firebase"

const state = {
  sections: {
    data: [],
  },
  currentSection: {
    id: '',
    name: '',
    subsections: []
  },
  currentSubsection: {
    id: '',
    name: '',
  }
}

const getters = {
  SECTIONS: state => state.sections.data,
  CURRENT_SECTION: state => state.currentSection,
  CURRENT_SUBSECTION: state => state.currentSubsection,

  SECTIONS_FOR_ARTICLES: state => {
    var list = []
    for (const section of state.sections.data) {
      list.push({header: section.name})
      for (const subsection of section.subsections) {
        list.push({name: subsection.name, value: subsection.id})
      }
    }
    return list
  },
}

const mutations = {
  SET_SECTIONS: (state, sections) => {
    state.sections.data = sections
  },
  SET_CURRENT_SECTION: (state, section) => {
    state.currentSection = {
      id: section.id,
      ...section,
    }
  },
  SET_CURRENT_SUBSECTION: (state, subsection) => {
    state.currentSubsection = {
      id: subsection.id,
      ...subsection,
    }
  },
  SET_DEFAULT: state => {
    state.currentSection = {
      id: '',
      name: '',
      subsections: [],
    },
      state.currentSubsection = {
        id: '',
        name: '',
      }
  },
}

const actions = {
  SET_DEFAULT: context => {
    context.commit('SET_DEFAULT')
  },
  SET_SECTIONS: (context, payload) => {
    context.commit('SET_SECTIONS', payload)
  },
  EDIT_SECTION: (context, payload) => {
    context.commit('SET_CURRENT_SECTION', payload)
  },

  EDIT_SUBSECTION: (context, payload) => {
    context.commit('SET_CURRENT_SUBSECTION', payload)
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
  DELETE_SUBSECTION: (context, { subsection, section }) => {
    return new Promise(async (resolve, reject) => {
      let doc = db.collection('sections').doc(section.id)
      let new_subs = (await doc.get()).data().subsections.filter(el => el.id != subsection.id)
      doc.update({
        subsections: new_subs
      })
        .then(() => {
          return db.collection('subsections').doc(subsection.id).delete()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  SAVE_SECTION: context => {
    return new Promise((resolve, reject) => {
      db.collection('sections').add({
        name: state.currentSection.name,
        subsections: [],
      })
        .then(ref => {
          context.commit('SET_DEFAULT')
          resolve(ref)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  //TODO - НАПИСАТЬ ПО-ЧЕЛОВЕЧЕСКИ.
  SAVE_SUBSECTION: context => {
    return new Promise((resolve, reject) => {
      db.collection('subsections').add({
        name: state.currentSubsection.name,
      })
        .then(async ref => {
          let docREF = db.collection('sections').doc(state.currentSection.id)
          let doc = await docREF.get()
          return docREF.update({
            subsections: [...doc.data().subsections, ref]
          })
        })
        .then(r => {
          context.commit('SET_DEFAULT')
          resolve(r)
        })
        .catch(error => reject(error))
    })
  },

  UPDATE_SECTION: context => {
    return new Promise((resolve, reject) => {
      db.collection('sections').doc(state.currentSection.id).update({
        name: state.currentSection.name,
      })
        .then((r) => {
          context.commit('SET_DEFAULT')
          resolve(r)
        })
        .catch(error => reject(error))
    })
  },
  UPDATE_SUBSECTION: context => {
    return new Promise((resolve, reject) => {
      db.collection('subsections').doc(state.currentSubsection.id).update({
        name: state.currentSubsection.name,
      })
        .then((r) => {
          context.commit('SET_DEFAULT')
          resolve(r)
        })
        .catch(error => reject(error))
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}