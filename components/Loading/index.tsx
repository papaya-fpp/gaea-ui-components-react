import * as React from 'react';
import ReactDOM from 'react-dom';
import { getPrefixCls } from '../_util/responsiveObserve';
import classNames from 'classnames';
import Icon from '../Icon';

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

const Loading: LoadingComponentProps = ({
  text,
  loading = true,
  fullScreen = false,
  opacity = false,
  className,
  children
}) => {

  const prefixCls = getPrefixCls('loading');
  const classes = classNames(
    prefixCls,
    className,
  );

  const loadingClasses = classNames(
    `${prefixCls}-wrapper`,
    {
      full: fullScreen,
      opacity: opacity
    }
  );

  return (
    <div className={classes}>
      {loading && (
        <div className={loadingClasses}>
          <Icon className={`${prefixCls}-img`} name="Spinnerjiazai1" size={20} />
          <span className={`${prefixCls}-text`}>{text}</span>
        </div>
      )}
      {children}
    </div>
  );
};
const start = (text) => {
  let div = document.createElement('div');
  document.body.appendChild(div);
  // 关闭
  const destroy = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  const render = () => {
    ReactDOM.render(<Loading loading={true} text={text} fullScreen={true} />, div);
  };
  render();
  return {
    destroy: destroy
  };
};
Loading.start = start;
export default Loading;
