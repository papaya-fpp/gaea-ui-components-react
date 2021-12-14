const fixedScroll = () => {
  const { body, documentElement } = document;
  const scale = (window as any).__scale || 1;
  const scrollTop = body.scrollTop || documentElement.scrollTop;
  body.style.cssText += `position:fixed;width:100%;top:-${scrollTop / scale}px!important;`;
};

const resetScroll = () => {
  const { body, documentElement } = document;
  const scale = (window as any).__scale || 1;
  body.style.position = '';
  const { top } = body.style;

  // 确认 top 值存在时再进行重置，否则在使用时，组件初次渲染进行调用时会有问题
  if (top) {
    body.scrollTop = -parseInt(top, 10) * scale;
    documentElement.scrollTop = -parseInt(top, 10) * scale;
    body.style.top = '';
  }
};

export { fixedScroll, resetScroll };
