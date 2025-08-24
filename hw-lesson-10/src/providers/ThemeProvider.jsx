import { ThemeContext } from '@contexts/ThemeContext.js';
import { DEFAULT_THEME, THEMES } from '@shared/constants.js';
import { useLocalStorageState } from '@shared/useLocalStorageState.js';
import { useCallback, useEffect } from 'react';

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useLocalStorageState('app.theme', DEFAULT_THEME);

	// Normalize unexpected stored values
	const safeTheme = theme === THEMES.DARK ? THEMES.DARK : THEMES.LIGHT;

	useEffect(() => {
		if (safeTheme === THEMES.DARK) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [safeTheme]);

	const toggleTheme = useCallback(() => {
		setTheme(t => (t === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
	}, [setTheme]);

	return (
		<ThemeContext.Provider value={{ theme: safeTheme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
