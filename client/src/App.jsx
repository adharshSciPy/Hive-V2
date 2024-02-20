import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import { Toaster, NavBar } from './components'
import { useSelector, useDispatch } from 'react-redux'
import Router from './router/Router';


function App() {

  const [isActive, setIsActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <BrowserRouter>
      <Toaster />
      <NavBar isLoggedIn={isActive} isAdmin={isAdmin} setIsActive={setIsActive} />
      <Router active={isActive} setIsActive={setIsActive} />
    </BrowserRouter>
  );
}

export default App;


// role 2000 for user
// role 2525 for admin

















// const dispatch = useDispatch()
// // const active = useSelector((state) => state.loginedUser.isConnected)
// const active = true
// const [isActive, setIsActive] = useState(false)
// const checkUserToken = () => {
//   if (typeof window !== "undefined") {
//     const user = JSON.parse(localStorage.getItem("user-token"));
//     if (user) {
//       const data = { token: user }
//       const verifyUser = async () => {
//         axios
//           .post("http://localhost:5000/user/auth", data)
//           .then((response) => {
//             const X = response.data;
//             dispatch(loggeduser(X._id))
//             dispatch(isConnected())
//           })
//           .catch((err) => {
//             console.log(err.response.data)
//             localStorage.clear();
//           });
//       }
//       verifyUser();
//     } else {
//       dispatch(isNotConnected())
//     }
//   }
// };
// useEffect(() => {
//   checkUserToken();
// }, [active]);

// const Logout = () => {
//   if (localStorage.getItem("user-token")) {
//     localStorage.clear();
//   }
// };