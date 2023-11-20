import Calendar from './Calendar';
import Missing from './Missing';
import { Route, Routes } from 'react-router-dom';

import './index.css';
function App() {

  return (
      <Routes>
        <Route path="/">
          <Route index element={<Calendar/>} />
          <Route path=":id" element={<Calendar/>} />
          <Route path="*" element={<Missing/>} />
        </Route>
      </Routes>
      
  );
}

export default App;
