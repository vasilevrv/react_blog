import React from 'react';
import {TextField, Box, Button, Card, CardHeader, CardContent, CardActions} from '@material-ui/core';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {observer} from "mobx-react";
import {LoginUiStore, LoginUiStoreContext} from "./login.ui-store";
import {useRequiredStore} from "../../../utils/store";
import {AuthStoreContext} from "../../../stores";
import { useHistory } from "react-router"

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            backgroundColor: theme.palette.primary.main
        },
        card: {
            marginTop: theme.spacing(10),
            width: '100%'
        }
    };
});

export const LoginComponent = observer(() => {
    
    const classes = useStyles();
    const uiStore = useRequiredStore(LoginUiStoreContext);
    const history = useHistory();

    const auth = async () => {
        try {
            await uiStore.auth();
            history.push('/');
        }
        catch (e) {}
    }

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Login As Administrator" />
                <CardContent>
                    <Box mt={2} width='100%'>
                        <TextField
                            value={uiStore.username}
                            onChange={e => uiStore.setUsername(e.target.value)}
                            disabled={uiStore.inProgress}
                            error={uiStore.invalidCredentials}
                            label="Username"
                            placeholder="Username"
                            fullWidth
                            variant="outlined"
                        />
                    </Box>
                    <Box mt={2} width='100%'>
                        <TextField
                            value={uiStore.password}
                            onChange={e => uiStore.setPassword(e.target.value)}
                            disabled={uiStore.inProgress}
                            error={uiStore.invalidCredentials}
                            helperText={uiStore.passwordHelperText}
                            label="Password"
                            placeholder="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.loginBtn}
                        onClick={auth}
                        type="submit"
                        disabled={!uiStore.isValidPassword || uiStore.inProgress}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
})

export const Login = () => {

    const authStore = useRequiredStore(AuthStoreContext);
    const store = new LoginUiStore(authStore);

    return (
        <LoginUiStoreContext.Provider value={store}>
            <LoginComponent />
        </LoginUiStoreContext.Provider>
    );
}