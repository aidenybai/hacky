import { VNode, createElement, patch, DOMNode, schedule } from 'million';

export type State = unknown | Record<string, unknown>;
export type Update = (state: State, update: Update) => DOMNode;
export type FC = (state: State) => VNode;

export const init = (component: FC): Update => {
  let el: DOMNode | undefined = undefined;
  let prevState: State | undefined = undefined;
  return (state: State): DOMNode => {
    if (!el) el = createElement(component(state));
    else schedule(() => patch(el!, component(state)));
    prevState = state;
    return el!;
  };
};

export const memo = (component: FC): FC => {
  const cache = new Map<State, VNode>();

  return (state: State) => {
    if (cache.has(state)) {
      return cache.get(state)!;
    } else {
      const vnode = component(state);
      cache.set(state, vnode);
      return vnode;
    }
  };
};
