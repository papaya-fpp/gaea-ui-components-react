import React from 'react';
interface PaginationProps {
    total?: number;
    current?: number;
    PageSize?: number;
    showSizeChanger?: boolean;
    showTotal?: any;
    onChange?: any;
}
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
