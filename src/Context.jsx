import { createContext, useReducer, useEffect } from "react";

// Create the theme context
export const themeContext = createContext();

// Initial state: Fetch from localStorage or default to dark mode
const initialState = { 
  darkMode: JSON.parse(localStorage.getItem("darkMode")) ?? false 
};  

// Reducer function to handle theme changes
const themeReducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      const newTheme = !state.darkMode;
      // Save the new theme state to localStorage
      localStorage.setItem("darkMode", JSON.stringify(newTheme));
      return { darkMode: newTheme };
    default:
      return state;
  }
};

// ThemeProvider component that wraps the entire application
export const ThemeProvider = (props) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    // Sync theme with localStorage without dispatching 'toggle'
    const savedTheme = JSON.parse(localStorage.getItem("darkMode"));
    // console.log(savedTheme,'savedtheme')
    if (savedTheme !== null && savedTheme !== state.darkMode) {
      dispatch({ type: "set_theme", payload: savedTheme });
    }
  }, []);

  return (
    <themeContext.Provider value={{state, dispatch}}>{props.children}</themeContext.Provider>
  );
};