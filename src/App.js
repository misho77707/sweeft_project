
import { Route, Routes} from 'react-router-dom';
import './App.css';
import User from './User';
import Main  from './Main';

function App() {
  return (
    <Routes>
    <Route exact path="/" element={<Main/>}/>
    <Route path="/User/:id" element={<User />}/>
     
    </Routes>
    
  );
}

export default App;
