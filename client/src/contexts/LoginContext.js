import React, { createContext, useState } from 'react';


export const LoginContext = createContext();


const LoginContextProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
      setLogin(false);
      setUser(null);
  }

  return(
    <LoginContext.Provider value={{ login, setLogin, user, setUser, logout }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;