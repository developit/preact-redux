# preact-redux

[![NPM](http://img.shields.io/npm/v/preact-redux.svg)](https://www.npmjs.com/package/preact-redux)
[![travis-ci](https://travis-ci.org/developit/preact-redux.svg)](https://travis-ci.org/developit/preact-redux)

Wraps [`react-redux`](https://react-redux.js.org/) up for [Preact] (8.x and prior), without using [preact-compat](https://github.com/developit/preact-compat). Think of this as a version of `react-redux` that is pre-aliased to use preact in place of React.

**See [preact-redux-example](https://github.com/developit/preact-redux-example):** _a full working example of `redux` + `preact` using `preact-redux`!_

### ⚠️ Long time support
With Preact version prior to `10`, users who want to use `redux` without the need for aliasing `preact -> react` could find this package helpful, but in the long run you should use [`react-redux`](https://react-redux.js.org/) since that's the official binding for `redux` and it's going to be updated and maintain by the `redux` team. Updating `preact-redux` to work with `preact@10` it's our last effort to maintain this package and we encourage you to switch to [`react-redux`](https://react-redux.js.org/) for your `redux` needs. This packages has no extra logic inside that's `preact` specific. It only imports and exports the necesary packages from `preact/compat` and `react-redux`.

---


### Usage Example

> This is a contrived example. Please refer to Redux's [Usage with React](http://redux.js.org/docs/basics/UsageWithReact.html) documentation for details on how to work with Redux from Preact.

```js
import { Provider, connect } from 'preact-redux';
import { h, render } from 'preact';

const Main = () => (
	<Provider store={store}>
		<Child />
	</Provider>
);

const Child = connect(
	state => state
)( ({ text, setText }) => (
	<input value={text} onInput={e => setText(e.target.value)} />
) );

render(<Main />, document.body);
```


---


### License

[MIT]


[react-redux]: https://github.com/reactjs/react-redux
[Preact]: https://github.com/developit/preact
[MIT]: http://choosealicense.com/licenses/mit/
