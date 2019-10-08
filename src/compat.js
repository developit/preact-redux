import { createContext, createElement, Component } from 'preact';
import {
	useEffect,
	useContext,
	useMemo,
	useLayoutEffect,
	useRef,
	useReducer
} from 'preact/hooks';

/**
 * Assign properties from `props` to `obj`
 * @template O, P The obj and props types
 * @param {O} obj The object to copy properties to
 * @param {P} props The object to copy properties from
 * @returns {O & P}
 */
function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (let i in props) obj[i] = props[i];
	return /** @type {O & P} */ (obj);
}

function memo(c, comparer) {
	function shouldUpdate(nextProps) {
		let ref = this.props.ref;
		let updateRef = ref==nextProps.ref;
		if (!updateRef && ref) {
			ref.call ? ref(null) : (ref.current = null);
		}
		return (!comparer
			? shallowDiffers(this.props, nextProps)
			: !comparer(this.props, nextProps)) || !updateRef;
	}
    
    

	function Memoed(props) {
		this.shouldComponentUpdate = shouldUpdate;
		return createElement(c, assign({}, props));
	}
	Memoed.prototype.isReactComponent = true;
	Memoed.displayName = 'Memo(' + (c.displayName || c.name) + ')';
	Memoed._forwarded = true;
	return Memoed;
}

/**
 * Pass ref down to a child. This is mainly used in libraries with HOCs that
 * wrap components. Using `forwardRef` there is an easy way to get a reference
 * of the wrapped component instead of one of the wrapper itself.
 * @param {import('./internal').ForwardFn} fn
 * @returns {import('./internal').FunctionalComponent}
 */
function forwardRef(fn) {
	function Forwarded(props) {
		let ref = props.ref;
		delete props.ref;
		return fn(props, ref);
	}
	Forwarded.prototype.isReactComponent = true;
	Forwarded._forwarded = true;
	Forwarded.displayName = 'ForwardRef(' + (fn.displayName || fn.name) + ')';
	return Forwarded;
}

/**
 * Deprecated way to control batched rendering inside the reconciler, but we
 * already schedule in batches inside our rendering code
 * @template Arg
 * @param {(arg: Arg) => void} callback function that triggers the updated
 * @param {Arg} [arg] Optional argument that can be passed to the callback
 */
// eslint-disable-next-line camelcase
const unstable_batchedUpdates = (callback, arg) => callback(arg);

/**
 * Check if two objects have a different shape
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
function shallowDiffers(a, b) {
	for (let i in a) if (i !== '__source' && !(i in b)) return true;
	for (let i in b) if (i !== '__source' && a[i]!==b[i]) return true;
	return false;
}

/**
 * Component class with a predefined `shouldComponentUpdate` implementation
 */
class PureComponent extends Component {
	constructor(props) {
		super(props);
		// Some third-party libraries check if this property is present
		this.isPureReactComponent = true;
	}

	shouldComponentUpdate(props, state) {
		return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
	}
}

const React = {
	Component,
	PureComponent,
	createContext,
	createElement,
	useEffect,
	useContext,
	useMemo,
	useLayoutEffect,
	useRef,
	useReducer,
	forwardRef,
	memo,
	unstable_batchedUpdates
};

export {
	Component,
	PureComponent,
	createContext,
	createElement,
	useEffect,
	useContext,
	useMemo,
	useLayoutEffect,
	useRef,
	useReducer,
	forwardRef,
	memo,
	unstable_batchedUpdates
};

export default React;