/**
 * context
 */
import {createContext, useContext} from 'react';

export interface UserContextProps {
  name: string;
  books: string[];
}

export const UserContext = createContext<UserContextProps | null>(null);

export const useUserContext = (): UserContextProps | null =>
  useContext(UserContext);
