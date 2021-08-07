# 🔧 Hacky

### *Fun*ctional component-based UI library

Current Virtual DOM implementations are alright. Sure, they probably work for most use cases and have a comprehensive ecosystem. But some of the time, you just want to build a super simple application with basic state and components—That's what Hacky is for!

> _Plug: Hacky is built on [Million](https://github.com/aidenybai/million), a <1kb compiler-focused virtual DOM. It's fast!_

## Installing Hacky

It is highly recommended you use a build tool, such as Vite (you can see [how we configured our settings](https://github.com/aidenybai/hacky/blob/master/vite.config.js) under the `esbuild` field). You can use NPM to directly install.

```
npm install hacky
```

## Clicker Game Example

Below is an extremely simple implementation of a Clicker Game example using Hacky.

```tsx
import { render, useState } from 'hacky';

const App = () => {
  const [count, setCount] = useState(0);

  return <button onclick={() => setCount(count + 1)}>{count}</button>;
};

render(App, document.querySelector('#app'));
// HTML is just <div id="app"></div>
```

## Acknowledgments

Hacky takes heavy inspiration from [React](https://reactjs.org), and believes in the core philosophies and values behind [Million](https://million.js.org). Feel free to check them out if you interested in an alternative library to use.

_Why is it called "Hacky"? The name originated from a quote from [@HeyArav](https://twitter.com/HeyArav): "Hack Club Framework when"_

## License

Million is [MIT-licensed](https://github.com/aidenybai/hacky/blob/master/LICENSE) open-source software by [Aiden Bai](https://github.com/aidenybai).
