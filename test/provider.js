import { createStore } from 'redux';
import { Provider, connect } from '../';
import { h, render, options } from 'preact';

import Redux from '../dist/preact-redux.esm.js';

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

	describe('jsnext:main', () => {
	  it('should export the correct interface', () => {
	    expect(Redux.Provider).to.be.a('function');
	    expect(Redux.connect).to.be.a('function');
	  });
	});
});
