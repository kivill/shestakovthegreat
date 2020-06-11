import { db, } from "@/plugins/firebase"

const state = {
  sections: {
    data: [],
  },
  currentSection: {
    id: '',
    parent: false,
    name: '',
    subsections: []
  },
}

const getters = {
  SECTIONS: state => state.sections.data,
  CURRENT_SECTION: state => state.currentSection,
  SECTIONS_FOR_ARTICLES: state => {
    function getLeaves(node, obj) {
      if (node.subsections.length == 0) {
        obj.push({ value: node.id, name: node.name })
      } else {
        node.subsections.forEach((child)=>{getLeaves(child, obj)})
      }
    }
    var list = []
    state.sections.data.forEach((child)=>getLeaves(child, list));
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
    }
  },

}

const actions = {
  SET_DEFAULT: context => {
    context.commit('SET_DEFAULT')
  },
  SET_SECTIONS: async (context) => {
    function getFromRef(ref) {
      return ref.get()
        .then(querySnapshot => {
          let r = []
          querySnapshot.forEach(doc => {
            let data = doc.data()
            r.push({
              id: doc.id,
              ...data
            })
          });
          return r
        })
    }
    function findInResult(id) {
      for (let r in Object.keys(result)) {
        if (result[r].id == id)
          return result[r]
      }
      return -1
    }
    function setSubs(node) {
      if (node.subsections.length == 0)
        return node

      let mas = []
      node.subsections.forEach(async sub => {
        let del = findInResult(sub.id)
        if (del != -1) {
          mas.push(setSubs(del))

        }
        else {
          // let doc = db.collection('subsections').doc(node.id)
          // let new_subs = (await doc.get()).data().subsections.filter(el => el.id != sub.id)
          // doc.update({
          //   subsections: new_subs
          // })
          //   .then(() => {
          //     return db.collection('subsections').doc(sub.id).delete()
          //   })
          //   .catch(error => {
          //     reject(error)
          //   })
          // console.log('del ', node.id)
        }
      })
      node.subsections = mas
      return node
    }
    let result = await getFromRef(db.collection('subsections'))
    result = result.map(e => {
      return setSubs(e)
    }).filter(e => e.parent == true)
    console.log('SECTIONS', result)
    context.commit('SET_SECTIONS', result);
    // db.collection('subsections').get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       let data = doc.data()
    //       sections.push({
    //         id: doc.id,
    //         ...data
    //       });
    //     })
    //     console.log('SECTIONS', sections)
    //     
    //   })
  },
  EDIT_SECTION: (context, payload) => {
    context.commit('SET_CURRENT_SECTION', payload)
  },

  EDIT_SUBSECTION: (context, payload) => {
    context.commit('SET_CURRENT_SUBSECTION', payload)
  },

  DELETE_SECTION: (context, payload) => {
    return new Promise((resolve, reject) => {
      db.collection('subsections').doc(payload.id).delete()
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
      let doc = db.collection('subsections').doc(section.id)
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
      db.collection('subsections').add({
        name: state.currentSection.name,
        parent: state.currentSection.parent,
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
        name: state.currentSection.name,
        parent: false,
        subsections: [],
      })
        .then(async ref => {
          let docREF = db.collection('subsections').doc(state.currentSection.id)
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
      db.collection('subsections').doc(state.currentSection.id).update({
        name: state.currentSection.name,
      })
        .then((r) => {
          context.commit('SET_DEFAULT')
          resolve(r)
        })
        .catch(error => reject(error))
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}