export default {
  root: 'dev',
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
    jsxInject: `import { jsx, jsxs, Fragment } from 'million/jsx-runtime';`,
  },
};
