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
import { ComponentData } from './types';

export const diff = useNode([useChildren(), useProps()]);

export const patch = (
  el: DOMNode,
  newVNode?: VNode,
  oldVNode?: VNode,
  effects: DOMOperation[] = [],
) => {
  const data = diff(el, newVNode, oldVNode, effects, schedule);
  for (let i = 0; i < effects.length; i++) {
    effects[i]();
  }
  return data.el;
};

export const render = (view: VNode | VEntity, el: DOMNode): DOMNode => {
  if ((<VEntity>view)?.data) {
    el.appendChild((<ComponentData>(<VEntity>view).data.data).el!);
  } else {
    el.appendChild(createElement(view));
  }

  return el;
};
