
import React from 'react';
import classNames from 'classnames';
import MenuContext, { MenuTheme } from './MenuContext';
import { SiderContext } from '../Layout/Sider';
import { getPrefixCls } from '../_util/responsiveObserve';
import SubMenu from './SubMenu';
import Item from './MenuItem';
interface PublicProps {
	theme?: MenuTheme;
	multiple?: boolean;
  inlineCollapsed?: boolean;
	className?: string;
	defaultOpenKeys?: Array<string>;
	openKeys?: string[];
	defaultSelectedKeys?: string;
	selectedKeys?: string,
	onSelect?: (key: string | string[]) => void
	onOpenChange?: (openKeys: string | string[]) => void;
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
		multiple = false,
    theme = 'dark',
    className,
		children,
		defaultOpenKeys,
		defaultSelectedKeys,
		onSelect,
		onOpenChange,
    ...others
	} = props;
	
	let initKeys = props.selectedKeys || defaultOpenKeys;
	let initOpenKeys = props.openKeys || defaultOpenKeys || [];

	const [ selectedKeys, set_selectedKeys ] = React.useState(initKeys || '')
	const [ openKeys, set_openKeys ] = React.useState(initOpenKeys)

  const prefixCls = getPrefixCls('menu');
  
  const classes = classNames(
    prefixCls,
    `${prefixCls}-${theme}`,
    {
      [`${prefixCls}-collapsed`]: !!collapsed
    },
    className,
  );
  
  const selectHandle = (type: string, key: any) => {
		if (type === 'item') {
			!props.selectedKeys && set_selectedKeys(key)
			onSelect && onSelect(key)
		} else {
			let o_k = [...openKeys]
			const index = o_k.findIndex( k => k === key);
			if (index > -1) {
				o_k.splice(index, 1)
			} else {
				o_k.push(key)
			}
			!props.openKeys && set_openKeys(o_k)
			onOpenChange && onOpenChange(o_k)
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
	
	React.useEffect(()=> {
		props.selectedKeys && set_selectedKeys(props.selectedKeys)
	}, [props.selectedKeys])

	React.useEffect(()=> {
		props.openKeys && set_selectedKeys(props.openKeys)
	}, [props.openKeys])

	const contextValue = React.useMemo(() => ({
    inlineCollapsed: collapsed || false,
		firstLevel: true,
		selectedKeys,
		openKeys: openKeys || []
	}), [ collapsed, selectedKeys, openKeys ]);
	
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
