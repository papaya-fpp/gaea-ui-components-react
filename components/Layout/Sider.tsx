import React from 'react';
import classNames from 'classnames';
import { getPrefixCls} from '../_util/responsiveObserve';
import isNumeric from '../_util/isNumber';

export type SiderTheme = 'light' | 'dark';

export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  width?: number | string;
  theme?: SiderTheme;
  onCollapse?: (collapsed: boolean) => void;
}

const Sider: React.FC<SiderProps> = props => {
  const {
    collapsed: props_collapsed,
    defaultCollapsed = false,
    width = 200,
    theme = 'dark',
    onCollapse,
    className,
    style,
    children,
    ...others
  } = props;
  const [collapsed, setCollapsed] = React.useState('collapsed' in props ? props.collapsed : defaultCollapsed);
  
  React.useEffect(() => {
    if ('collapsed' in props) {
      setCollapsed(props.collapsed);
    }
  }, [props.collapsed]);

  const prefixCls = getPrefixCls('layout-sider');

  const classes = classNames(
    prefixCls,
    `${prefixCls}-${theme}`,
    {
      [`${prefixCls}-collapsed`]: !!collapsed,
    },
    className,
  );
  const rawWidth = collapsed ? 80 : width;
  const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
  const silderStyle: React.CSSProperties = {
    ...style,
    flex: `0 0 ${siderWidth}`,
    maxWidth: siderWidth,
    minWidth: siderWidth,
    width: siderWidth,
  };
  
  return (
    <aside {...others} className={classes} style={silderStyle}>
      <div className={`${prefixCls}-children`}>{children}</div>
    </aside>
  )
}

Sider.displayName = 'Sider';

export default Sider;