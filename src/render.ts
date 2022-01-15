import {
  DOMNode,
  DOMOperation,
  entity,
  schedule,
  useChildren,
  createElement,
  useNode,
  useProps,
  VEntity,
  VNode,
} from 'million';

export type Props = Record<string, unknown>;
export interface Component {
  iterator: GeneratorFunction;
  props: Props;
}
export interface ComponentData {
  el?: DOMNode;
  update?: () => VNode;
  state: (state: unknown) => {
    get value(): unknown;
    set value(value: unknown);
  };
}

export const component = (iterator: GeneratorFunction, props: Props): VEntity => {
  const { data, component } = createComponent({ iterator, props });
  return entity({ iterator, props, data, component }, () => data.update!(), data.el!);
};

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

export const createComponent = ({ iterator, props }: Component) => {
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
          patch(data.el!, data.update!());
        },
      };
    },
  };
  const component = iterator.bind(data)(props);
  data.el = createElement(component.next().value);
  data.update = () => {
    const vnode = <VNode>component.next().value;
    return vnode;
  };
  return {
    component,
    data,
  };
};

export const render = (entity: VEntity, el: DOMNode): DOMNode => {
  const data = <ComponentData>entity.data.data;
  el.appendChild(data.el!);

  return el;
};
