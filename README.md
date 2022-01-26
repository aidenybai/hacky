# ⚙️ Hacky

### <2kb tagged template alternative for Crank.js

Hacky is something that I've always wanted. I've used React previously, but I find hooks too magical and JSX a finicky process that requires a build step. When I discovered Crank.js, I fell in love because of how intuitive it was to understand. Imagine Hacky as Crank.js with tagged templates, but with a lightweight core and simplistic API.

> _Plug: Hacky is built on [Million](https://github.com/aidenybai/million), a <1kb compiler-focused virtual DOM. It's fast!_

## `random.cat` API Example

Below is an implementation of a `random.cat` API fetcher example using Hacky ([Live Demo](https://codesandbox.io/s/data-fetching-hacky-75mvi?file=/index.html)).

```js
import { html, render } from 'https://cdn.skypack.dev/hacky';

const fetchCat = async (url = 'https://aws.random.cat/meow') => {
  try {
    const res = await fetch(url);
    const { file } = await res.json();
    return file;
  } catch (err) {
    console.error(err);
  }
};

function* Cats({ width, height }) {
  const [cats, setCats] = this.createState([]);
  const addCat = () => {
    fetchCat().then((newCat) => {
      setCats([newCat, ...cats()]);
    });
  };

  while (true) {
    yield html`<div>
      <button onClick=${addCat}>Fetch cat image</button>
      <br />
      <br />
      <div>
        ${cats().map((cat) => html`<img key=${cat} src=${cat} width=${width} height=${height} />`)}
      </div>
    </div>`;
  }
}

render(html`<${Cats} width=${100} height=${100} />`, document.body);
```

`render()` function has a standard interface that is used in many Virtual DOM libraries. First argument is a Virtual DOM to render, and the second one is a DOM node that will be used as the live DOM reference.

`html` tagged templates can produce Virtual DOM nodes, which define your DOM view.

`this.createState()` function will instantiate a new state reference, in which you can mutate by destructuring the getter (index `0`) and setter (index `1`).

## Acknowledgments

Hacky takes heavy inspiration from [Crank.js](https://github.com/bikeshaving/crank), and depends on [Million](https://million.js.org). Feel free to check them out if you interested in an alternative library to use.

## License

Million is [MIT-licensed](https://github.com/aidenybai/hacky/blob/master/LICENSE) open-source software by [Aiden Bai](https://github.com/aidenybai).
