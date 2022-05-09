import React from 'react';
export interface ListProps<T> {
    className?: string;
    children?: React.ReactNode;
}
declare function List<T>({ className, children }: ListProps<T>): JSX.Element;
declare namespace List {
    var Item: typeof import("./Item").default;
}
export default List;
