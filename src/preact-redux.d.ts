import { AnyComponent, Component, ComponentConstructor, VNode, render } from 'preact';
import { Store, Dispatch, ActionCreator } from 'redux';

export interface DispatchProp<T> {
  dispatch: Dispatch<T>
}

interface ComponentDecorator<TMergedProps> {
    <TOwnProps>(component: AnyComponent<(TOwnProps & TMergedProps) | TOwnProps, any>): ComponentConstructor<TOwnProps, any>;
}

interface ComponentMergeDecorator<TMergedProps, TOwnProps> {
    (component: AnyComponent<TMergedProps, any>): ComponentConstructor<TOwnProps, any>;
}

/**
 * Connects a Preact component to a Redux store.
 *
 * - Without arguments, just wraps the component, without changing the behavior / props
 *
 * - If 2 params are passed (3rd param, mergeProps, is skipped), default behavior
 * is to override ownProps (as stated in the docs), so what remains is everything that's
 * not a state or dispatch prop
 *
 * - When 3rd param is passed, we don't know if ownProps propagate and whether they
 * should be valid component props, because it depends on mergeProps implementation.
 * As such, it is the user's responsibility to extend ownProps interface from state or
 * dispatch props or both when applicable
 *
 * @param mapStateToProps
 * @param mapDispatchToProps
 * @param mergeProps
 * @param options
 */
export declare function connect(): ComponentDecorator<DispatchProp<any>>;

export declare function connect<TStateProps, no_dispatch, TOwnProps>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>
): ComponentDecorator<DispatchProp<any> & TStateProps>;

export declare function connect<no_state, TDispatchProps, TOwnProps>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): ComponentDecorator<TDispatchProps & TOwnProps>;

export declare function connect<TStateProps, TDispatchProps, TOwnProps>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): ComponentDecorator<TStateProps & TDispatchProps>;

export declare function connect<TStateProps, no_dispatch, TOwnProps, TMergedProps>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
    mapDispatchToProps: null | undefined,
    mergeProps: MergeProps<TStateProps, undefined, TOwnProps, TMergedProps>,
): ComponentMergeDecorator<TMergedProps, TOwnProps>;

export declare function connect<no_state, TDispatchProps, TOwnProps, TMergedProps>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: MergeProps<undefined, TDispatchProps, TOwnProps, TMergedProps>,
): ComponentMergeDecorator<TMergedProps, TOwnProps>;

export declare function connect<no_state, no_dispatch, TOwnProps, TMergedProps>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: null | undefined,
    mergeProps: MergeProps<undefined, undefined, TOwnProps, TMergedProps>,
): ComponentMergeDecorator<TMergedProps, TOwnProps>;

export declare function connect<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
): ComponentMergeDecorator<TMergedProps, TOwnProps>;

export declare function connect<TStateProps, no_dispatch, TOwnProps>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
    mapDispatchToProps: null | undefined,
    mergeProps: null | undefined,
    options: Options
): ComponentDecorator<DispatchProp<any> & TStateProps & TOwnProps>;

export declare function connect<no_state, TDispatchProps, TOwnProps>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: null | undefined,
    options: Options
): ComponentDecorator<TDispatchProps>;

export declare function connect<TStateProps, TDispatchProps, TOwnProps>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: null | undefined,
    options: Options
): ComponentDecorator<TStateProps & TDispatchProps>;

export declare function connect<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
    options: Options
): ComponentMergeDecorator<TMergedProps, TOwnProps>;

interface MapStateToProps<TStateProps, TOwnProps> {
    (state: any, ownProps?: TOwnProps): TStateProps;
}

interface MapStateToPropsFactory<TStateProps, TOwnProps> {
    (initialState: any, ownProps?: TOwnProps): MapStateToProps<TStateProps, TOwnProps>;
}

type MapStateToPropsParam<TStateProps, TOwnProps> = MapStateToProps<TStateProps, TOwnProps> | MapStateToPropsFactory<TStateProps, TOwnProps>;

interface MapDispatchToPropsFunction<TDispatchProps, TOwnProps> {
    (dispatch: Dispatch<any>, ownProps?: TOwnProps): TDispatchProps;
}

interface MapDispatchToPropsObject {
    [name: string]: ActionCreator<any>;
}

type MapDispatchToProps<TDispatchProps, TOwnProps> =
    MapDispatchToPropsFunction<TDispatchProps, TOwnProps> | MapDispatchToPropsObject;

interface MapDispatchToPropsFactory<TDispatchProps, TOwnProps> {
    (dispatch: Dispatch<any>, ownProps?: TOwnProps): MapDispatchToProps<TDispatchProps, TOwnProps>;
}

type MapDispatchToPropsParam<TDispatchProps, TOwnProps> = MapDispatchToProps<TDispatchProps, TOwnProps> | MapDispatchToPropsFactory<TDispatchProps, TOwnProps>;

interface MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> {
    (stateProps: TStateProps, dispatchProps: TDispatchProps, ownProps: TOwnProps): TMergedProps;
}

interface Options {
    /**
     * If true, implements shouldComponentUpdate and shallowly compares the result of mergeProps,
     * preventing unnecessary updates, assuming that the component is a “pure” component
     * and does not rely on any input or state other than its props and the selected Redux store’s state.
     * Defaults to true.
     * @default true
     */
    pure?: boolean;
    /**
     * If true, stores a ref to the wrapped component instance and makes it available via
     * getWrappedInstance() method. Defaults to false.
     */
    withRef?: boolean;
}

export interface ProviderProps {
    /**
     * The single Redux store in your application.
     */
    store?: Store<any>;
    children?: VNode;
}

/**
 * Makes the Redux store available to the connect() calls in the component hierarchy below.
 */
export class Provider extends Component<ProviderProps, {}> {
    render(props: ProviderProps): VNode
}
