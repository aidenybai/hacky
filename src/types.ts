import { DOMNode, VNode } from 'million';

export type Props = Record<string, unknown>;
export interface Component {
  iterator: GeneratorFunction;
  props: Props;
}
export interface ComponentData {
  el?: DOMNode;
  diff?: () => VNode;
  update?: () => void;
  createState: (state: unknown) => [() => unknown, (value: unknown) => void];
}
export const DOM_NODE_REF = '__hacky_dom_node_ref';
