import { Component } from 'react';
declare class Checkbox extends Component<any> {
    static defaultProps: {
        prefixCls: string;
        className: string;
        style: {};
        type: string;
        defaultChecked: boolean;
        onFocus(): void;
        onBlur(): void;
        onChange(): void;
        onKeyDown(): void;
        onKeyPress(): void;
        onKeyUp(): void;
    };
    constructor(props: any);
    static getDerivedStateFromProps(props: any, state: any): any;
    focus(): void;
    blur(): void;
    handleChange: (e: any) => void;
    saveInput: (node: any) => void;
    render(): JSX.Element;
}
export default Checkbox;
