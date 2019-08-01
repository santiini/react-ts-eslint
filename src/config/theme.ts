/**
 * emotion-theme
 */
interface ThemeSettings {
  color: string;
}

type ThemeTypes = 'light' | 'dark';

const themeMap: Record<ThemeTypes, ThemeSettings> = {
  light: {
    color: '#000',
  },
  dark: {
    color: 'red',
  },
};

export default themeMap;
