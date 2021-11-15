import { VNode, createElement, patch, DOMNode } from 'million';

export type State = unknown | Record<string, unknown>;
export type Update = (state: State, update: Update) => DOMNode;
export type FC = (state: State) => VNode;

export const realize = (component: FC): Update => {
  let el: DOMNode | undefined = undefined;
  const update = (state: State): DOMNode => {
    if (!el) el = createElement(component(state));
    else patch(el, component(state));
    return el;
  };
  return update;
};
