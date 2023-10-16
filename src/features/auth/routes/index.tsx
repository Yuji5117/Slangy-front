import { Route } from "react-router-dom";

import { Login } from "./Login";
import { Register } from "./Register";

export const AuthRoute = () => {
  return (
    <Route>
      <Route path={"/auth/register"} element={<Register />} />
      <Route path={"/auth/login"} element={<Login />} />
    </Route>
  );
};
