export declare const tuple: <T extends string[]>(...args: T) => T;
export declare type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export declare type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export declare type ScreenSizeMap = Partial<Record<Breakpoint, number>>;
export declare type BreakpointMap = Record<Breakpoint, string>;
export declare const getPrefixCls: (suffixCls?: string | undefined, customizePrefixCls?: string | undefined) => string;
export declare const getRootPrefixCls: (rootPrefixCls?: string | undefined, customizePrefixCls?: string | undefined) => string;
export declare const responsiveArray: Breakpoint[];
export declare const responsiveMap: BreakpointMap;
declare type SubscribeFunc = (screens: ScreenMap) => void;
export declare const ResponsiveObserve: {
    matchHandlers: {
        [prop: string]: {
            mql: MediaQueryList;
            listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
        };
    };
    dispatch(pointMap: ScreenMap): boolean;
    subscribe(func: SubscribeFunc): number;
    unsubscribe(token: number): void;
    unregister(): void;
    register(): void;
};
export {};
