import {
  createElement,
  DOMNode,
  DOMOperation,
  useChildren,
  useNode,
  useProps,
  VEntity,
  VNode,
} from 'million';
import { JSXVNode } from 'million/jsx-runtime';
import { h } from './component';
import { ComponentData, DOM_NODE_REF } from './types';

export const diff = useNode([useChildren(), useProps()]);

export const patch = (
  el: DOMNode,
  newVNode?: VNode | VEntity,
  oldVNode?: VNode | VEntity,
  effects: DOMOperation[] = [],
) => {
  const data = diff(el, newVNode, oldVNode, effects);
  for (let i = 0; i < effects.length; i++) {
    effects[i]();
  }

  return data.el;
};

export const render = (view: VNode | VEntity | (VNode | VEntity)[], el: DOMNode): DOMNode => {
  const ref = el[DOM_NODE_REF];
  const isChildren = Array.isArray(<VNode | VEntity | (VNode | VEntity)[]>view);
  const vnode = isChildren
    ? <VNode>h('_', undefined, ...(<JSXVNode[]>view))
    : <VNode | VEntity>view;
  if (ref) {
    patch(ref, vnode);
  } else {
    const newEl = (<VEntity>view)?.data
      ? (<ComponentData>(<VEntity>view).data.data).el!
      : createElement(vnode);
    el.appendChild(newEl);
    el[DOM_NODE_REF] = newEl;
  }
  return el;
};
