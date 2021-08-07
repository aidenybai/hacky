# 🔧 Hacky

### *Fun*ctional component-based UI library

Writing React for applications is alright. Sure, it probably works for most use cases and the DX is great! But some of the time, you just want to ~~limit your potential~~ build a super simple application with basic state and components—That's what Hacky is for!

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

const App =
  ({ props }) =>
  () => {
    const [count, setCount] = useState(props);

    return <button onclick={() => setCount(count + 1)}>{count}</button>;
  };

render(document.querySelector('#app'), <App props={0} />);
// HTML is just <div id="app"></div>
```

## Acknowledgments

Hacky takes heavy inspiration from [React](https://reactjs.org), and believes in the core philosophies and values behind [Million](https://million.js.org). Feel free to check them out if you interested in an alternative library to use.

_Why is it called "Hacky"? The name originated from a quote from [@HeyArav](https://twitter.com/HeyArav): "~~Hack Club Framework when~~"_

## License

Million is [MIT-licensed](https://github.com/aidenybai/hacky/blob/master/LICENSE) open-source software by [Aiden Bai](https://github.com/aidenybai).
