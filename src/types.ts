import { DOMNode, VNode } from 'million';

export type Arguments = unknown[];
export interface Component {
  iterator: GeneratorFunction;
  args: Arguments;
}
export interface ComponentData {
  el?: DOMNode;
  diff?: () => VNode;
  update?: () => void;
  state: (state: unknown) => {
    get value(): unknown;
    set value(value: unknown);
  };
}
