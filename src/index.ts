import { VNode, m, patch, schedule, OLD_VNODE_FIELD } from 'million';

const ROOT_NODE_FIELD = '__h_root_node';
const ROOT_HOOKS_FIELD = '__h_hooks';
let currentRootAndComponent: [HTMLElement, () => VNode];

export const initRootVNode = (root: HTMLElement) =>
  m(
    root.tagName.toLowerCase(),
    Object.fromEntries(
      [...root.attributes].map(({ name, value }) => [name, String(value)])
    )
  );

export const render = (component: () => VNode, root: HTMLElement): void => {
  let rootVNode = root[ROOT_NODE_FIELD];
  currentRootAndComponent = [root, component];

  if (!rootVNode) {
    rootVNode = initRootVNode(root);
    root[OLD_VNODE_FIELD] = initRootVNode(root);
    root[ROOT_NODE_FIELD] = rootVNode;
  }
  rootVNode.children = [component()];
  schedule(() => patch(root, rootVNode));
};

export const useState = <T>(initial: T): [T, (value: T) => void] => {
  const [currentRoot, currentComponent] = currentRootAndComponent;

  if (!currentRoot[ROOT_HOOKS_FIELD]) currentRoot[ROOT_HOOKS_FIELD] = initial;
  return [
    currentRoot[ROOT_HOOKS_FIELD],
    (value: T): void => {
      currentRoot[ROOT_HOOKS_FIELD] = value;
      render(currentComponent, currentRoot);
    },
  ];
};
