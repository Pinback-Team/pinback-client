import { router } from '@routes/router';
import AmplitudeProvider from 'src/providers/AmplitudeProvider';
import { RouterProvider } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <AmplitudeProvider>
      <RouterProvider router={router} />
    </AmplitudeProvider>
  );
}

export default App;
