import React from 'react';

export const formContext = React.createContext({});

const FormProvider = (props) => {
  return <formContext.Provider value={props.value}>{props.children}</formContext.Provider>;
};

export { FormProvider };
