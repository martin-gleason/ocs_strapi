export const state = () => ({
  list: []
})

export const mutations = {
  add(state, trainings) {
    state.list.push(trainings)
  },
  emptyList(state){
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list

  }
}