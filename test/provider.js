import { createStore } from 'redux';
import { Provider, connect, connectAdvanced } from '../';
import { h, render, options } from 'preact';

import * as Redux from '../dist/preact-redux.esm.js';

// disable async rendering entirely to make tests simpler
options.debounceRendering = f => f();

describe('preact-redux', () => {
	it('should export Provider & connect', () => {
		expect(Provider).to.be.a('function');
		expect(connect).to.be.a('function');
	});

	describe('<Provider />', () => {
		it('should commit store prop to context', () => {
			let store = createStore( a => a );
			let Child = sinon.stub().returns(<div />);

			render((
				<Provider store={store}>
					<Child />
				</Provider>
			), document.createElement('div'));

			expect(Child).to.have.been.calledWithMatch({ }, { store });
		});
	});

	describe('connect()', () => {
		it('should connect component to store', () => {
			let initialState = {
				a: 'a',
				b: 'b'
			};

			let reducer = (state=initialState, action) => {
				switch (action.type) {
					case 'A': return { ...state, a: action.data };
					case 'B': return { ...state, b: action.data };
					default: return state;
				}
			};

			let store = createStore(reducer);
			let Child = sinon.stub().returns(<div />);

			let spies = {};

			let ConnectedChild = connect(
				({ a, b }, { c }) => ({ a, b, c }),
				dispatch => ({
					onA: spies.onA = sinon.spy( data => dispatch({ type:'A', data }) ),
					onB: spies.onB = sinon.spy( data => dispatch({ type:'B', data }) )
				})
			)(Child);

			render((
				<Provider store={store}>
					<ConnectedChild c="c" />
				</Provider>
			), document.createElement('div'));

			expect(Child).to.have.been.calledOnce.and.calledWithMatch({
				a: 'a',
				b: 'b',
				c: 'c',
				onA: spies.onA,
				onB: spies.onB
			});

			Child.reset();
			spies.onA('aaa');
			expect(Child).to.have.been.calledOnce.and.calledWithMatch({
				a: 'aaa',
				b: 'b',
				c: 'c',
				onA: spies.onA,
				onB: spies.onB
			});

			Child.reset();
			spies.onB('bbb');
			expect(Child).to.have.been.calledOnce.and.calledWithMatch({
				a: 'aaa',
				b: 'bbb',
				c: 'c',
				onA: spies.onA,
				onB: spies.onB
			});
		});
	});

	describe('connectAdvanced()', () => {
		it('should connectAdvanced component to store', () => {
			let initialState = {
				a: 'a',
				b: 'b'
			};

			let reducer = (state=initialState, action) => {
				switch (action.type) {
					case 'A': return { ...state, a: action.data };
					case 'B': return { ...state, b: action.data };
					default: return state;
				}
			};

			let store = createStore(reducer);
			let Child = sinon.stub().returns(<div />);

			let spies = {};

			function shallowDiffers (a, b) {
				for (let i in a) if (!(i in b)) return true;
				for (let i in b) if (a[i] !== b[i]) return true;
				return false;
			}

			let ConnectedChild = connectAdvanced((dispatch) => {
				/**
				*  from https://github.com/reactjs/react-redux/blob/master/docs/api.md
				*  If a consecutive call to selector returns the same object (===) as its previous call,
				*  the component will not be re-rendered.
				*  It's the responsibility of selector to return that previous object when appropriate.
				*/
				let result = {};
				const onA = spies.onA = sinon.spy(data => dispatch({type: 'A', data}));
				const onB = spies.onB = sinon.spy(data => dispatch({type: 'B', data}));

				return ({a, b}, {c}) => {
					const nextResult = {
						a,
						b,
						c,
						onA,
						onB
					};

					if (shallowDiffers(result, nextResult)) {
						result = nextResult;
					}
					return result;
				};
			})(Child);

			render((
				<Provider store={store}>
					<ConnectedChild c="c" />
				</Provider>
			), document.createElement('div'));

			expect(Child).to.have.been.calledOnce.and.calledWithMatch({
				a: 'a',
				b: 'b',
				c: 'c',
				onA: spies.onA,
				onB: spies.onB
			});

			Child.reset();
			spies.onA('aaa');
			expect(Child).to.have.been.calledOnce.and.calledWithMatch({
				a: 'aaa',
				b: 'b',
				c: 'c',
				onA: spies.onA,
				onB: spies.onB
			});

			Child.reset();
			spies.onB('bbb');
			expect(Child).to.have.been.calledOnce.and.calledWithMatch({
				a: 'aaa',
				b: 'bbb',
				c: 'c',
				onA: spies.onA,
				onB: spies.onB
			});
		});
	});

	describe('jsnext:main', () => {
		it('should export the correct interface', () => {
			expect(Redux.Provider).to.be.a('function');
			expect(Redux.connect).to.be.a('function');
			expect(Redux.connectAdvanced).to.be.a('function');
		});
	});
});

