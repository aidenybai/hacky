import { VNode, m, patch, schedule, OLD_VNODE_FIELD } from 'million';

// Field for the initial root vnode
const ROOT_NODE_FIELD = '__h_root_node';
// Field for the value of the state (can only hold one useState per root vnode)
const ROOT_HOOKS_FIELD = '__h_hooks';
let currentRootAndComponent: [HTMLElement, () => VNode];

// Initial root _cannot have children_
export const initRootVNode = (root: HTMLElement) =>
  m(
    root.tagName.toLowerCase(),
    Object.fromEntries(
      [...root.attributes].map(({ name, value }) => [name, String(value)])
    )
  );

export const render = (root: HTMLElement, component: () => VNode): void => {
  let rootVNode = root[ROOT_NODE_FIELD];
  currentRootAndComponent = [root, component];

  if (!rootVNode) {
    rootVNode = initRootVNode(root);
    // Must have a seperate initialization to hold the initial root
    // This is because the rootVNode variable is mutated below
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
      render(currentRoot, currentComponent);
    },
  ];
};
