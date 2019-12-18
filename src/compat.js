import { createContext, createElement, Component } from 'preact';
import {
	useEffect,
	useContext,
	useMemo,
	useLayoutEffect,
	useRef,
	useReducer
} from 'preact/hooks';
import { memo, forwardRef, PureComponent, unstable_batchedUpdates } from 'preact/compat';

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