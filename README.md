# 🔧 Hacky

### *Fun*ctional component-based UI library

## Installing Hacky

It is highly recommended you use a build tool, such as Vite (you can see [how we configured our settings](https://github.com/aidenybai/hacky/blob/master/vite.config.js) under the `esbuild` field). You can use NPM to directly install.

```
npm install million
```

## Clicker Game Example

Below is an extremely simple implementation of a Clicker Game example using Hacky.

```ts
import { render, useState } from 'hacky';

const App = () => {
  const [count, setCount] = useState(0);

  return <button onclick={() => setCount(count + 1)}>{count}</button>;
};

render(App, document.querySelector('#app'));
// HTML is just <div id="app"></div>
```

## Acknowledgments

Million takes heavy inspiration from [React](https://reactjs.org), and believes in the core philosophies and values behind [Million](https://million.js.org). Feel free to check them out if you interested in an alternative library to use.

_Why is it called "Hacky"? The name originated from a quote from [@HeyArav](https://twitter.com/HeyArav): "Hack Club Framework when"_

## License

Million is [MIT-licensed](https://github.com/aidenybai/hacky/blob/master/LICENSE) open-source software by [Aiden Bai](https://github.com/aidenybai).
