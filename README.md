# 🔧 Hacky

### *Fun*ctional iterator-based UI library

Writing React for applications is alright. Sure, it probably works for most use cases and the DX is great! But some of the time, you just want to ~~limit your potential~~ build a super simple application with basic state and components—That's what Hacky is for!

> _Plug: Hacky is built on [Million](https://github.com/aidenybai/million), a <1kb compiler-focused virtual DOM. It's fast!_

## Installing Hacky

It is highly recommended you use a build tool, such as Vite. You can use NPM to directly install.

```
npm install hacky
```

## Clicker Game Example

Below is an extremely simple implementation of a Clicker Game example using Hacky.

```js
import { button, component, render } from 'hacky';

function* Clicker({ initialCount }) {
  let count = initialCount;
  // We do an infinite loop here because the yield statement
  // will wait until you call `this.update`.
  while (true) {
    yield button(
      {
        onClick: () => this.update(count++),
      },
      [count],
    );
  }
}

render(component(Clicker, { initialCount: 0 }), document.body);
```

## Acknowledgments

Hacky takes heavy inspiration from [React](https://reactjs.org), and believes in the core philosophies and values behind [Million](https://million.js.org). Feel free to check them out if you interested in an alternative library to use.

## License

Million is [MIT-licensed](https://github.com/aidenybai/hacky/blob/master/LICENSE) open-source software by [Aiden Bai](https://github.com/aidenybai).
