import { useEffect, useState } from 'react';
import { ResponsiveObserve, ScreenMap } from '../../_util/responsiveObserve';

function useBreakpoint(): ScreenMap {
  const [screens, setScreens] = useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });

  useEffect(() => {
    const token = ResponsiveObserve.subscribe(supportScreens => {
      setScreens(supportScreens);
    });

    return () => ResponsiveObserve.unsubscribe(token);
  }, []);

  return screens;
}

export default useBreakpoint;
