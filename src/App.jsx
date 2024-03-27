
import { Home } from "./Home";
// import './App.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from './components/loginForm';
import store from "./components/store";
import SignUpForm from "./components/SignUpForm";
import ViewUsers from "./components/ViewUsers";
import ViewNearByUser from "./components/ViewNearByUser";


// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/login" element={<LoginForm />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/addUser" element={<SignUpForm />} />
          <Route path="/viewusers" element={<ViewUsers />} />
          <Route path="//viewnearby" element={<ViewNearByUser />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
