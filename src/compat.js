export { Component, Component as PureComponent } from "preact";
import { createContext } from "preact-context";
import { h } from "preact";
import empty from "./empty";

export default {
	createContext,
	forwardRef: empty,
	createElement: h
};
