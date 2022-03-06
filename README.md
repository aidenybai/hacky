# ⚙️ Hacky <img src="https://badgen.net/badgesize/brotli/https/unpkg.com/hacky?color=000000&labelColor=00000&label=bundle%20size" alt="Code Size" /> <a href="https://www.npmjs.com/package/hacky" target="_blank"><img src="https://img.shields.io/npm/v/hacky?style=flat&colorA=000000&colorB=000000" alt="NPM Version" /></a>

### `<2kb` tagged template alternative for Crank.js

Hacky is something that I've always wanted. I've used React previously, but I find **hooks too magical** and JSX a **finicky process** that requires a build step.

When I discovered Crank.js, I fell in love because of how intuitive it was to understand. Imagine Hacky as **Crank.js with tagged templates**, but with a lightweight core and simplistic API.

> If you're looking for something a bit more comprehensive, check out [**Million**](https://github.com/aidenybai/million) — Virtual DOM into the future! 💥🦁✨
>
> -Aiden ([@aidenybai](https://github.com/aidenybai))

## `random.cat` API Example

Below is an implementation of a `random.cat` API fetcher example using Hacky ([Live Demo](https://codesandbox.io/s/data-fetching-hacky-75mvi?file=/index.html)).

```js
import { html, render } from 'https://cdn.skypack.dev/hacky';

const fetchCat = async (url = 'https://aws.random.cat/meow') => {
  const res = await fetch(url);
  const { file } = await res.json();
  return file;
};

function* Cats({ width, height }) {
  const [cats, setCats] = this.createState([]);
  const [message, setMessage] = this.createState('Fetch cat image');
  const [disabled, setDisabled] = this.createState(false);

  const addCat = async () => {
    setMessage('Fetching...');
    setDisabled(true);

    try {
      const newCat = await fetchCat();
      setCats([...cats(), newCat]);
      setMessage('Fetch cat image');
      setDisabled(false);
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch. Retrying...');
      setTimeout(() => addCat(), 1000);
    }
  };

  while (true) {
    const catImages = cats().map(
      (cat) => html`<img key=${cat} src=${cat} width=${width} height=${height} />`,
    );
    yield html`
      <button disabled=${disabled()} onClick=${addCat} style="width: 100%">${message()}</button>
      <div>${catImages}</div>
    `;
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
