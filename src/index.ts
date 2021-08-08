import { VNode, m, patch, schedule, OLD_VNODE_FIELD } from 'million';

// Field for the initial root vnode
const ROOT_NODE_FIELD = '__h_root_node';
// Field for the valuse of the state (can only hold one useState per root vnode)
const STATE_VALUE_FIELD = '__h_state_value';
let currentRootAndVNode: [HTMLElement, VNode];
let i = 0;

// Initial root _cannot have children_
export const initRootVNode = (root: HTMLElement) =>
  m(
    root.tagName.toLowerCase(),
    Object.fromEntries(
      [...root.attributes].map(({ name, value }) => [name, String(value)])
    )
  );

export const render = (root: HTMLElement, vnode: VNode): void => {
  let rootVNode = root[ROOT_NODE_FIELD];
  currentRootAndVNode = [root, vnode];

  if (!rootVNode) {
    rootVNode = initRootVNode(root);
    // Must have a seperate initialization to hold the initial root
    // This is because the rootVNode variable is mutated below
    root[OLD_VNODE_FIELD] = initRootVNode(root);
    root[ROOT_NODE_FIELD] = rootVNode;
  }
  rootVNode.children = [vnode];
  schedule(() => patch(root, rootVNode));
};

export const useState = <T>(initial: T): [T, (value: T) => void] => {
  const [currentRoot, currentVNode] = currentRootAndVNode;

  if (!currentRoot[STATE_VALUE_FIELD]) {
    currentRoot[STATE_VALUE_FIELD] = [initial];
  } else {
    i++;
    // Pushed each time, we do not want this
    // How do we figure out if the initial has already been pushed?
    currentRoot[STATE_VALUE_FIELD].push(initial);
  }
  return [
    currentRoot[STATE_VALUE_FIELD][i],
    (value: T): void => {
      i++;
      currentRoot[STATE_VALUE_FIELD].push(value);
      render(currentRoot, currentVNode);
    },
  ];
};
