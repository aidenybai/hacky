import {
  createElement,
  DOMNode,
  useNode,
  useProps,
  useChildren,
  VNode,
  schedule,
  DOMOperation,
} from 'million';

export type Props = Record<string, unknown>;
export interface Component {
  iterator: GeneratorFunction;
  props: Props;
}
export interface ComponentData {
  el?: DOMNode;
  update?: () => DOMNode;
  state: (state: unknown) => {
    get value(): unknown;
    set value(value: unknown);
  };
}

export const component = (iterator: GeneratorFunction, props: Props): Component => ({
  iterator: iterator,
  props: props,
});

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

export const render = ({ iterator, props }: Component, el: DOMNode): DOMNode => {
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
          data.update!();
        },
      };
    },
  };
  const component = iterator.bind(data)(props);
  data.update = () => {
    const vnode = <VNode>component.next().value;
    return patch(data.el!, vnode);
  };
  data.el = createElement(component.next().value);
  el.appendChild(data.el);
  return el;
};
