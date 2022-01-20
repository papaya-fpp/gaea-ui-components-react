import { useEffect, useLayoutEffect } from 'react';
import canUseDom from '../util/canUseDom';

// It's safe to use `useLayoutEffect` but the warning is annoying
const useIsomorphicLayoutEffect = canUseDom() ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
