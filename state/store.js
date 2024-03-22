import { PubSub } from './pub-sub.js';

export class Store {
  constructor(state, actions, mutations) {
    this.events = new PubSub();

    // this.state에 변경사항이 생기면
    // 1. state에 변경사항을 기록하고
    // 2. publish하고
    // 3. this.status를 다시 resting으로 돌린다.
    this.state = new Proxy(state || {}, {
      set: (target, prop, value) => {
        target[prop] = value;
        this.events.publish('stateChange', this.state);
        this.status = 'resting';
        return true;
      },
    });

    this.actions = actions || {};
    this.mutations = mutations || {};
    this.status = 'resting'; // 'resting', 'action', 'mutation'
  }

  dispatch(actionKey, payload) {
    if (
      !this.actions.hasOwnProperty(actionKey) ||
      typeof this.actions[actionKey] !== 'function'
    ) {
      throw new Error('dispatch error');
    }

    this.status = 'action';
    this.actions[actionKey](this, payload);
  }

  commit(mutationKey, payload) {
    if (
      !this.mutations.hasOwnProperty(mutationKey) ||
      typeof this.mutations[mutationKey] !== 'function'
    ) {
      throw new Error('commit error');
    }

    this.status = 'mutation';
    const newState = this.mutations[mutationKey](this.state, payload);
    Object.assign(this.state, newState);
  }
}
