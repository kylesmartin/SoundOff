import React, { useReducer } from 'react';

/**
 * Creates and returns context
 * @param reducer The reducer that updates context
 * @param actions Actions that can be performed on context
 * @param defaultValue Initial state of context
 */
export default (reducer, actions, defaultValue) => {
  // Create context
  const Context = React.createContext();

  // Create provider with child
  const Provider = ({ children }) => {
    // Initialize reducer state
    const [state, dispatch] = useReducer(reducer, defaultValue);

    // Assign dispatch function to all action callbacks
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    // Set provider relationship to child
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};