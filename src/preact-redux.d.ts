// Based on the DefinitelyTyped typings for react-redux (2.1.2)

/// <reference types="preact" />
/// <reference types="redux" />

declare module "preact-redux" {
  import { Component } from 'preact';
  import { Store, Dispatch, ActionCreator } from 'redux';

  export abstract class ElementClass extends Component<any, any> { }
  export interface ClassDecorator {
    <T extends (typeof ElementClass)>(component: T): T
  }

  /**
   * Connects a React component to a Redux store.
   * @param mapStateToProps
   * @param mapDispatchToProps
   * @param mergeProps
   * @param options
     */
  export function connect(mapStateToProps?: MapStateToProps,
                          mapDispatchToProps?: MapDispatchToPropsFunction|MapDispatchToPropsObject,
                          mergeProps?: MergeProps,
                          options?: Options): ClassDecorator;

  interface MapStateToProps {
    (state: any, ownProps?: any): any;
  }

  interface MapDispatchToPropsFunction {
    (dispatch: Dispatch<any>, ownProps?: any): any;
  }

  interface MapDispatchToPropsObject {
    [name: string]: ActionCreator<any>;
  }

  interface MergeProps {
    (stateProps: any, dispatchProps: any, ownProps: any): any;
  }

  interface Options {
    /**
     * If true, implements shouldComponentUpdate and shallowly compares the result of mergeProps,
     * preventing unnecessary updates, assuming that the component is a “pure” component
     * and does not rely on any input or state other than its props and the selected Redux store’s state.
     * Defaults to true.
     * @default true
     */
    pure: boolean;
  }

  export interface Property {
    /**
     * The single Redux store in your application.
     */
    store?: Store<any>;
    children?: Function;
  }

  /**
   * Makes the Redux store available to the connect() calls in the component hierarchy below.
   */
  export abstract class Provider extends Component<Property, {}> { }
}