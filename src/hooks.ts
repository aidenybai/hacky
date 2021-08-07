import { getCurrentRootAndVNode, render } from './render';

const ROOT_HOOKS_FIELD = '__hacky_hooks';

let i = 0;

export const useState = <T>(initial: T): [T, (value: T) => void] => {
  const [currentRoot, currentVNode] = getCurrentRootAndVNode();

  if (!currentRoot[ROOT_HOOKS_FIELD]) currentRoot[ROOT_HOOKS_FIELD] = [initial];

  return [
    currentRoot[ROOT_HOOKS_FIELD][i],
    (value: T): void => {
      ++i;
      currentRoot[ROOT_HOOKS_FIELD].push(value);
      render(currentVNode, currentRoot);
    },
  ];
};
