import React from 'react';

import { router } from './routes/router-config';
import { RouterProvider } from 'react-router-dom';

function App() {  

  return (
    <>      
      <RouterProvider router={router} />
    </>
  );
}

export default App
