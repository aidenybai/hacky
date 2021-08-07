import { VNode, m, patch, schedule } from 'million';

const ROOT_NODE_FIELD = '__hacky_root_node';

let currentRootAndVNode: [HTMLElement, VNode];

// children must be empty, since this is only used for initializing
const toRootVNode = (el: HTMLElement): VNode =>
  m(
    el.tagName,
    Object.fromEntries(
      [...el.attributes].map(({ name, value }) => [name, String(value)])
    )
  );

export const render = (vnode: VNode, root: HTMLElement): void => {
  currentRootAndVNode = [root, vnode];
  let rootVNode = root[ROOT_NODE_FIELD];
  if (!rootVNode) {
    rootVNode = toRootVNode(root);
    root[ROOT_NODE_FIELD] = rootVNode;
  }
  rootVNode.children = [vnode];
  schedule(() => {
    patch(root, rootVNode);
  });
};

export const getCurrentRootAndVNode = (): [HTMLElement, VNode] =>
  currentRootAndVNode;
