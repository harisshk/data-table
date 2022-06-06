import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// components
import { useSelector } from 'react-redux';
import Login from './Screens/Auth/login';
import Signup from './Screens/Auth/signup';
import CandidateForm from './Screens/CandiateForm';
// ----------------------------------------------------------------------

function SecuredRoute(props) {
  const profile = useSelector(state => state?.profile)
  var decoded = profile ? true : false
  //const isMobile = window.matchMedia("only screen and (max-width: 1200px)").matches
  return (

    <div>
      <Route path={props.path} render={(data) => decoded === false ?
        <Navigate to="/login" replace />
        :
        <props.component {...data}></props.component>
      }></Route>
    </div>
  )
}
const ProtectedRoute = ({
  user,
  redirectPath = '/landing',
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route index path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/candidate/create" element={<CandidateForm />} />
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
        {/* <Route
          path="home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;
