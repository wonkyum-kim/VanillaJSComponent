export class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(key, callback) {
    if (!this.events.hasOwnProperty(key)) {
      this.events[key] = [];
    }
    this.events[key].push(callback);
  }

  publish(key, data) {
    this.events[key].forEach((callback) => callback(data));
  }
}
