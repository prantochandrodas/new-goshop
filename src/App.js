import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
