import {
  createElement,
  DOMNode,
  DOMOperation,
  schedule,
  useChildren,
  useNode,
  useProps,
  VEntity,
  VNode,
} from 'million';
import { ComponentData, DOM_NODE_REF } from './types';

export const diff = useNode([useChildren(), useProps()]);

export const patch = (
  el: DOMNode,
  newVNode?: VNode | VEntity,
  oldVNode?: VNode | VEntity,
  effects: DOMOperation[] = [],
) => {
  const data = diff(el, newVNode, oldVNode, effects, schedule);
  for (let i = 0; i < effects.length; i++) {
    effects[i]();
  }
  return data.el;
};

export const render = (view: VNode | VEntity, el: DOMNode): DOMNode => {
  const ref = el[DOM_NODE_REF];
  if (ref) {
    patch(ref, view);
  } else {
    const newEl = (<VEntity>view)?.data
      ? (<ComponentData>(<VEntity>view).data.data).el!
      : createElement(view);
    el.appendChild(newEl);
    el[DOM_NODE_REF] = newEl;
  }
  return el;
};
