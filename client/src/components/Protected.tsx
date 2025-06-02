import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
interface ProtectedProps {
  compo: React.ReactNode;
}
const Protected: React.FC<ProtectedProps> = ({ compo }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  // console.log("userr", user);

  return user ? compo : <Navigate to="/login" />;
};

export default Protected;
