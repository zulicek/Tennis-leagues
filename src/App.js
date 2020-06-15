import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import { LeaguesList } from "./modules/LeaguesList/LeaguesList";
import { LoginForm } from "./modules/Forms/LoginForm/LoginForm";
import { RegisterForm } from "./modules/Forms/RegisterForm/RegisterForm";
import { UserProfile } from "./modules/UserProfile/UserProfile";
import { Events } from "./modules/Events/Events";
import { League } from "./modules/League/League";
import { MainNav } from "./components/MainNav/MainNav";
import { useSelector } from "react-redux";
import { logout } from "./actionCreators/sessionActionCreators";
import { useDispatch } from "react-redux";
import { checkTokenRequest } from "./api/repository";

export function App() {
  const dispatch = useDispatch();
  const { keepLoggedIn, token } = useSelector((state) => state.session);

  useEffect(() => {
    if (typeof keepLoggedIn === "boolean") {
      if (keepLoggedIn) {
        checkTokenRequest({
          token: token,
        })
          .then((response) => {
            if (response.error) {
              dispatch(logout());
            }
          })
          .catch(() => {
            dispatch(logout());
          });
      } else {
        dispatch(logout());
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <main className={`${token ? "app-main" : ""}`}>
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/logout">
            <LoginForm />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <ProtectedRoute path="/events">
            <Events />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <UserProfile />
          </ProtectedRoute>
          <ProtectedRoute path="/leagues/:id">
            <League />
          </ProtectedRoute>
          <ProtectedRoute exact path="/">
            <LeaguesList />
          </ProtectedRoute>
          <Route path="*">
            <h1>404 - page not found</h1>
          </Route>
        </Switch>
        <Switch>
          <ProtectedRoute path="*">
            <MainNav />
          </ProtectedRoute>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

function ProtectedRoute({ children, ...routeProps }) {
  const token = useSelector((state) => state.session.token);

  return token ? (
    <Route {...routeProps}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
}
