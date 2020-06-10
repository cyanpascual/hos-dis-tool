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
<<<<<<< HEAD
  const [users, setUsers] = useState('');
  const [landing, setLanding] = useState(0)
=======
>>>>>>> parent of 6edc597... Merge pull request #46 from cyanpascual/develop

  const logout = () => {
    setLogin(false);
    setUser(null);
    setUsername('');
    setPassword('');
    setHelperText('');
  }

  return(
<<<<<<< HEAD
    <LoginContext.Provider value={{ login, setLogin, user, setUser, username, setUsername, password, setPassword, helperText, setHelperText, logout, page, setPage, locPage, setLocPage, users, setUsers, landing, setLanding }}>
=======
    <LoginContext.Provider value={{ login, setLogin, user, setUser, username, setUsername, password, setPassword, helperText, setHelperText, logout, page, setPage, locPage, setLocPage }}>
>>>>>>> parent of 6edc597... Merge pull request #46 from cyanpascual/develop
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;