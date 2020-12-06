import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {IconButton} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {useRequiredStore} from "../../../utils/store";
import {AuthStoreContext} from "../../../stores";

const useStyles = makeStyles((theme) => ({
    root: {
    }
}));

export const UserWidget = observer(() => {
    const classes = useStyles();
    const authStore = useRequiredStore(AuthStoreContext);

    if (authStore.user) {
        return (
            <div className={classes.root}>
                {authStore.user.firstName} {authStore.user.lastName}
                <IconButton color="inherit" aria-label="login" onClick={authStore.logout}>
                    <ExitToAppIcon />
                </IconButton>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <IconButton color="inherit" aria-label="login" component={Link} to="/login">
                <ExitToAppIcon />
            </IconButton>
        </div>
    );
})