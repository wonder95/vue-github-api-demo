import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addresses: [],
    loaded: false
  },
  getters: {
    getAddresses: state => state.addresses,
    loaded: state => state.loaded
  },
  actions: {
    async loadAddresses ({ commit, dispatch }) {
      const response = await fetch('/api/addresses')
      const data = await response.json()
      commit(types.SET_ADDRESSES, data.addresses)
      dispatch('setLoaded')
    },
    deleteAddress ({ commit, getters }, item) {
      const index = getters.getAddresses.findIndex(address => item.email === address.email)
      commit(types.DELETE_ADDRESS, index)
    },
    addAddress ({ commit }, address) {
      commit(types.ADD_ADDRESS, address)
    },
    updateAddress ({ commit, getters }, item) {
      const index = getters.getAddresses.findIndex(address => item.email === address.email)
      commit(types.UPDATE_ADDRESS, item, index)
    },
    setLoaded ({ commit }) {
      commit(types.SET_LOADED, true)
    }
  },
  mutations: {
    [types.ADD_ADDRESS] (state, address) {
      state.addresses.push(address)
    },
    [types.DELETE_ADDRESS] (state, index) {
      state.addresses.splice(index, 1)
    },
    [types.SET_ADDRESSES] (state, addresses) {
      state.addresses = addresses
    },
    [types.SET_LOADED] (state, loaded) {
      state.loaded = loaded
    },
    [types.UPDATE_ADDRESS] (state, address, index) {
      Vue.set(state.addresses, index, address)
    }
  }
})
