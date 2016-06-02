/** Passes a `store` property into `context`, making it available to all descendant components. */
export default class Provider {
	getChildContext() {
		return { store: this.props.store };
	}

	render({ children }) {
		return children && children[0] || null;
	}
}
