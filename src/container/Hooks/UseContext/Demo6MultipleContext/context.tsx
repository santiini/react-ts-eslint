import {createContext} from 'react';
interface ThemeContextProps {
  bg: string;
  font: string;
}

interface UserContextProps {
  name: string;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const UserContext = createContext<UserContextProps | null>(null);
