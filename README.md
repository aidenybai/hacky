# ⚙️ Hacky

### <2kb tagged template alternative for Crank.js

Hacky is something that I've always wanted. I've used React previously, but I find hooks too magical and JSX a finicky process that requires a build step. When I discovered Crank.js, I fell in love because of how intuitive it was to understand. Imagine Hacky as Crank.js with tagged templates, but with a lightweight core and simplistic API.

> _Plug: Hacky is built on [Million](https://github.com/aidenybai/million), a <1kb compiler-focused virtual DOM. It's fast!_

## Clicker Game Example

Below is an extremely simple implementation of a Clicker Game example using Hacky.

```js
import { html, render } from 'https://cdn.skypack.dev/hacky';

function* Clicker({ initial }) {
  const [count, setCount] = this.createState(initial);

  // We do an infinite loop here because the yield statement
  // will generate a new button vnode every time the state of
  // `count` changes.
  while (true) {
    yield html`<button onClick=${() => setCount(count() + 1)}>${count()}</button>`;
  }
}

render(html`<${Clicker} initial=${0} />`, document.body);
```

`render()` function has a standard interface that is used in many Virtual DOM libraries. First argument is a Virtual DOM to render, and the second one is a DOM node that will be used as the live DOM reference.

`html\`\`` tagged templates can produce Virtual DOM nodes, which define your DOM view.

`this.createState()` function will instantiate a new state reference, in which you can mutate by the `.value` property.

## Acknowledgments

Hacky takes heavy inspiration from [Crank.js](https://github.com/bikeshaving/crank), and depends on [Million](https://million.js.org). Feel free to check them out if you interested in an alternative library to use.

## License

Million is [MIT-licensed](https://github.com/aidenybai/hacky/blob/master/LICENSE) open-source software by [Aiden Bai](https://github.com/aidenybai).
