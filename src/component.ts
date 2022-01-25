import { createElement, entity, schedule, VElement, VEntity, VNode, VProps } from 'million';
import { h as m, JSXVNode } from 'million/jsx-runtime';
import { Props, ComponentData } from './types';
import { patch } from './vdom';

export const h = (
  tag: string | Function,
  props?: VProps | undefined,
  ...children: JSXVNode[]
): VElement | VEntity => {
  if (typeof tag === 'function') {
    if (tag.constructor.name.toLowerCase().includes('generatorfunction'))
      return component(<GeneratorFunction>tag)(<Props>props);
    else return tag(props);
  } else {
    return m(tag, props, ...children);
  }
};

export const component =
  (iterator: GeneratorFunction): ((props: Props) => VEntity) =>
  (props: Props): VEntity => {
    const { data, component } = createComponent(iterator, props);
    return entity({ iterator, props, data, component }, () => data.diff!(), data.el!);
  };

export const createComponent = (iterator: GeneratorFunction, props: Props = {}) => {
  const data: ComponentData = {
    el: undefined,
    update: undefined,
    createState(state: unknown) {
      return [
        () => state,
        (value: unknown): void => {
          state = value;
          data.update!();
        },
      ];
    },
  };
  const component = iterator.bind(data)(props);
  data.diff = () => <VNode>component.next().value;
  data.el = createElement(data.diff());
  data.update = () => {
    const vnode = data.diff!();
    schedule(() => {
      console.log(vnode);
      patch(data.el!, vnode);
    });
  };
  return {
    component,
    data,
  };
};
