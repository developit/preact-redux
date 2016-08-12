# preact-redux

[![NPM](http://img.shields.io/npm/v/preact-redux.svg)](https://www.npmjs.com/package/preact-redux)
[![travis-ci](https://travis-ci.org/developit/preact-redux.svg)](https://travis-ci.org/developit/preact-redux)

Wraps [react-redux] up for [Preact], without using [preact-compat](https://github.com/developit/preact-compat).

> Think of this as a version of `react-redux` that is pre-aliased to use preact in place of React.

**See [preact-redux-example](https://github.com/developit/preact-redux-example):** _a full working example of `redux` + `preact` using `preact-redux`!_

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
