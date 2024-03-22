import { Store } from '../state/store.js';

const actions = {
  ADD_ITEM(context, item) {
    context.commit('addItem', item);
  },
  DELETE_ITEM(context, index) {
    context.commit('deleteItem', index);
  },
};

const mutations = {
  addItem(state, item) {
    state.items.push(item);
    return state;
  },
  deleteItem(state, index) {
    state.items.splice(index, 1);
    return state;
  },
};

const state = {
  items: [],
};

export const todoStore = new Store(state, actions, mutations);
