import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";

import Login from "./components/pages/LoginPage";
import { UnauthorizedPage, NotFoundPage } from "./components/pages/error";

//User
import ProfilePage from "./components/pages/user/profile";
import Notification from "./components/pages/NotificationPage";

//Manager
import { DashboardManagerPage, ApprovedPage } from "./components/pages/manager";

// Admin
import {
  DashboardOnePage,
  DashboardTwoPage,
  DashboardThreePage,
  SettingPage,
} from "./components/pages/admin";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: 0,
  },
}));

const Routers = () => {
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);

  const RedirectLogin = () => (
    <Route>
      <Redirect to="/login" />
    </Route>
  );

  const AdminRoute = ({ component: Component, ...rest }) => {
    if (currentUser) {
      return (
        <Route
          {...rest}
          render={(props) =>
            currentUser.roles.includes("ROLE_ADMIN") === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/unauthorized" />
            )
          }
        />
      );
    } else {
      return <RedirectLogin />;
    }
  };

  const ManagerRoute = ({ component: Component, ...rest }) => {
    if (currentUser) {
      return (
        <Route
          {...rest}
          render={(props) =>
            currentUser.roles.includes("ROLE_MANAGER") === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/unauthorized" />
            )
          }
        />
      );
    } else {
      return <RedirectLogin />;
    }
  };

  const UserRoute = ({ component: Component, ...rest }) => {
    if (currentUser) {
      return (
        <Route
          {...rest}
          render={(props) =>
            currentUser.roles.includes("ROLE_USER") === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/unauthorized" />
            )
          }
        />
      );
    } else {
      return <RedirectLogin />;
    }
  };

  return (
    <Container className={classes.content} maxWidth={false}>
      <Switch>
        <Route
          exact
          path={["/"]}
          component={() =>
            currentUser ? <Redirect to="/profile" /> : <Redirect to="/login" />
          }
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/unauthorized" component={UnauthorizedPage} />

        {/* User Route */}
        <UserRoute exact path="/notification" component={Notification} />
        <UserRoute exact path="/profile" component={ProfilePage} />

        {/* Manager Route */}
        <ManagerRoute
          exact
          path="/manager/dashboard"
          component={DashboardManagerPage}
        />
        <ManagerRoute exact path="/manager/approved" component={ApprovedPage} />

        {/* Admin Route */}
        <AdminRoute
          exact
          path="/admin/dashboard1"
          component={DashboardOnePage}
        />
        <AdminRoute
          exact
          path="/admin/dashboard2"
          component={DashboardTwoPage}
        />
        <AdminRoute
          exact
          path="/admin/dashboard3"
          component={DashboardThreePage}
        />
        <AdminRoute exact path="/admin/setting" component={SettingPage} />

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Container>
  );
};

export default Routers;
