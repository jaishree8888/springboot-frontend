import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GetEmployees from "./components/GetEmployees";
import AddEmployee from "./components/AddEmployee"; 

function App() {
  return (
    <Router> 
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/getemployees" element={<GetEmployees />} />
         <Route path="/add" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
