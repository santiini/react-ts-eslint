import React from 'react';
export const themes = {
  light: {
    foreground: '#000',
    background: '#eee',
  },
  dark: {
    foreground: '#fff',
    background: '#222',
  },
};

/* React.createContext(defaultValue) 接受默认的参数 */
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: (): void => {},
});
