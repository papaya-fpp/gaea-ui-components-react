import * as React from 'react';
interface ILoading {
    children?: React.ReactNode;
    text?: string;
    fullScreen?: boolean;
    opacity?: boolean;
    loading: boolean;
    className?: string;
}
interface LoadingComponentProps extends React.FC<ILoading> {
    start: typeof start;
}
declare const Loading: LoadingComponentProps;
declare const start: (text: any) => {
    destroy: () => void;
};
export default Loading;
