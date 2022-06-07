import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// components
import { useSelector } from 'react-redux';
import Login from './screens/Auth/login';
import Signup from './screens/Auth/signup';
import CandidateForm from './screens/candidateForm';
import CandidateList from './screens/candidateList';
// ----------------------------------------------------------------------

const ProtectedRoute = ({
  user,
  redirectPath = '/login',
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
function App() {
  const profile = useSelector(state => state?.profile)
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route index path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/candidate/create"
          element={
            <ProtectedRoute user={profile?.token}>
              <CandidateForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/edit/:id"
          element={
            <ProtectedRoute user={profile?.token}>
              <CandidateForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/list"
          element={
            <ProtectedRoute user={profile?.token}>
              <CandidateList />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
