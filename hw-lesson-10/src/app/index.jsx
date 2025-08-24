import SelectionProvider from '@providers/SelectionProvider.jsx';
import ThemeProvider from '@providers/ThemeProvider.jsx';
import { router } from '@router/index.jsx';
import { RouterProvider } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider>
      <SelectionProvider>
        <RouterProvider router={router} />
      </SelectionProvider>
    </ThemeProvider>
  );
}
