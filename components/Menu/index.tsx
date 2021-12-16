
import React from 'react';
import classNames from 'classnames';
import MenuContext, { MenuTheme } from './MenuContext';
import { SiderContext, SiderContextProps } from '../Layout/Sider';
import { getPrefixCls } from '../_util/responsiveObserve';
import SubMenu from './SubMenu';
import Item from './MenuItem';
interface PublicProps {
  theme?: MenuTheme;
  inlineCollapsed?: boolean;
	className?: string;
	defaultOpenKeys?: Array<string>;
	openKeys?: Array<string>;
	defaultSelectedKeys?: string;
	selectedKeys?: string,
	onSelect?: (key: string | string[]) => {};
	onOpenChange?: (openKeys: string | string[]) => {};
}

interface InternalMenuProps extends PublicProps {
  collapsed?: boolean
}

interface MenuProps extends React.FC<PublicProps> {
	Item: typeof Item;
	SubMenu: typeof SubMenu;
}


const InternalMenu: React.FC<InternalMenuProps> = (props) => {
  const {
    collapsed,
    theme = 'dark',
    className,
		children,
		defaultOpenKeys,
		openKeys,
		defaultSelectedKeys,
		onSelect,
		onOpenChange,
    ...others
	} = props;
	
	let initKeys = props.selectedKeys || defaultOpenKeys;
	if (!initKeys) {
		initKeys = (children && children[0].key) || ''
	}

	const [ selectedKeys, set_selectedKeys ] = React.useState(initKeys)

  const prefixCls = getPrefixCls('menu');
  
  const classes = classNames(
    prefixCls,
    `${prefixCls}-${theme}`,
    {
      [`${prefixCls}-collapsed`]: !!collapsed
    },
    className,
  );
  
  const selectHandle = (type: string, key: string | string[]) => {
		if (type === 'item') {
			set_selectedKeys(key)
			onSelect && onSelect(key)
		} else {
			onOpenChange && onOpenChange(key)
		}
	}

  const renderItem = () => {
    return React.Children.map(children, (child: any) => {
      if (!child) return null;
      let childrenProps: any = {
				...child.props,
				value: child.key,
				onChange: selectHandle
      };
      return React.cloneElement(child, childrenProps);
    })
	}
	
	const contextValue = React.useMemo(() => ({
    inlineCollapsed: collapsed || false,
		firstLevel: true,
		selectedKeys,
	}), [ collapsed, selectedKeys ]);
	
  return (
		<MenuContext.Provider value={contextValue}>
			<ul className={classes} {...others}>
				{renderItem()}
			</ul>
		</MenuContext.Provider>
  )
}


const Menu: MenuProps = (props) => {
  const { inlineCollapsed, ...other } = props;
  const { siderCollapsed } = React.useContext(SiderContext)
  const collapsed = siderCollapsed !== undefined ? siderCollapsed : inlineCollapsed;

  return  <InternalMenu {...other} collapsed={collapsed} />;
}

Menu.Item = Item;
Menu.SubMenu = SubMenu;
export default Menu;
