import React, {useState, useEffect, useRef} from 'react';

export function useOnClickOutside(ref, callback) {
    useEffect(() => {
        function handler(event) {
            if (!ref.current?.contains(event.target)) {
                callback();
            }
        }
        window.addEventListener('click', handler);

        return () => window.removeEventListener('click', handler)
    }, [callback, ref]);
}