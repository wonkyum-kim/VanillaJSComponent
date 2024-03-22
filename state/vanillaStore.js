export function createStore(createState) {
  let currState;
  const listeners = new Set();

  const getState = () => currState;

  const setState = (partial) => {
    const nextState = partial(currState);
    const prevState = currState;
    currState = Object.assign({}, currState, nextState);
    listeners.forEach((listener) => listener(currState, prevState));
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  currState = createState(setState);

  return { getState, setState, subscribe };
}
