import { useReducer, createContext, useCallback } from "react";

const initialState = {
  FacilityId: null,
  type: null,
  account: null,
  email: null,
  fullName: null,
};

export const UserContext = createContext(initialState);

const UserStore = ({ children }) => {
  const UserReducer = useCallback((state, action) => {
    switch (action.type) {
      case "login":
        return { ...action.payload };
      case "logout":
        return {
          ...initialState,
        };
      default:
        return state;
    }
  }, []);

  const [userState, userDispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={[userState, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserStore };
