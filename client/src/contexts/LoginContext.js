import React, { createContext, useState } from 'react';


export const LoginContext = createContext();


const LoginContextProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [helperText, setHelperText] = useState('');
  const [page, setPage] = useState(0);
  const [locPage, setLocPage] = useState(0)

  const logout = () => {
    setLogin(false);
    setUser(null);
    setUsername('');
    setPassword('');
    setHelperText('');
  }

  return(
    <LoginContext.Provider value={{ login, setLogin, user, setUser, username, setUsername, password, setPassword, helperText, setHelperText, logout, page, setPage, locPage, setLocPage }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;