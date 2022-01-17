import { createElement, entity, VEntity, VNode } from 'million';
import { Arguments, ComponentData } from './types';
import { patch } from './vdom';

export const component = (iterator: GeneratorFunction): ((...args: Arguments) => VEntity) => {
  return (...args: Arguments) => {
    const { data, component } = createComponent(iterator, args);
    return entity({ iterator, args, data, component }, () => data.diff!(), data.el!);
  };
};

export const createComponent = (iterator: GeneratorFunction, args: Arguments = []) => {
  const data: ComponentData = {
    el: undefined,
    update: undefined,
    state(state: unknown) {
      return {
        get value() {
          return state;
        },
        set value(value: unknown) {
          state = value;
          patch(data.el!, data.diff!());
        },
      };
    },
  };
  const component = iterator.bind(data)(...args);
  data.el = createElement(component.next().value);
  data.diff = () => {
    const vnode = <VNode>component.next().value;
    return vnode;
  };
  data.update = () => {
    const vnode = data.diff!();
    patch(data.el!, vnode);
  };
  return {
    component,
    data,
  };
};
