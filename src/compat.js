export { Component, Component as PureComponent } from "preact";
import { h, createContext } from "preact";
import empty from "./empty";

export default {
	createContext,
	forwardRef: empty,
	createElement: h
};
