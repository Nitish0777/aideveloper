import { createContext, useState } from "react";
import PropTypes from 'prop-types';

// Create a context for the user
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )};

// extra
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};