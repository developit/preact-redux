import defaults, * as named from '../dist/preact-redux.esm.js';

describe('exports', () => {
	it('should export default', () => {
		expect(defaults).to.have.property('connect').that.is.a('function');
		expect(defaults).to.have.property('connectAdvanced').that.is.a('function');
		expect(defaults).to.have.property('Provider').that.is.a('function');
	});

	it('should export named', () => {
		expect(named).to.have.property('connect').that.is.a('function');
		expect(named).to.have.property('connectAdvanced').that.is.a('function');
		expect(named).to.have.property('Provider').that.is.a('function');
	});
});
