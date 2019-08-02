/**
 * context
 */
import {createContext, useContext} from 'react';

export interface TeamContextProps {
  name: string;
  users: string[];
}

export const TeamContext = createContext<TeamContextProps | null>(null);

export const useTeamContext = (): TeamContextProps | null =>
  useContext(TeamContext);
