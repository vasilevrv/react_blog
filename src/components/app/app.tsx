import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {IconButton} from "@material-ui/core";
import Home from "@material-ui/icons/Home";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {UserWidget} from "../ui/user-widget/user-widget";
import {ViewPost} from "../blog/post/view/view-post";
import { RouteComponentProps } from 'react-router';
import {ListPost} from "../blog/post/list/list-post";
import {Login} from "../security/login/login";
import {AuthStoreContext, authStore} from "../../stores";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
}));

export const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AuthStoreContext.Provider value={authStore}>
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="login" component={Link} to="/">
                                <Home />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Another blog in React/MobX & Symfony
                            </Typography>
                            <UserWidget />
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/post/:id" render={({match}: RouteComponentProps<{id: string}>) => (<ViewPost id={parseInt(match.params.id)} />)} />
                        <Route path="/" component={ListPost} />
                    </Switch>
                </Router>
            </AuthStoreContext.Provider>
        </div>
    );
}