export { Component, h as createElement } from 'preact';

export const Children = {
	only(children) {
		return children && children[0] || null;
	}
};
