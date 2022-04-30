import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function Auth() {

  const {
    isAuthenticated, user
  } = useAuth0();
  
  console.log(user);
  return isAuthenticated ? <LogoutButton /> : <LoginButton />
}

export default withAuth0(Auth);