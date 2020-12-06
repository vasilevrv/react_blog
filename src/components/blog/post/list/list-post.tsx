import React from 'react';
import {ListPostItem} from "./list-post.item";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import {ListPostUiStore, ListPostUIStoreContext} from "./list-post.ui-store";
import {Observer} from "mobx-react";
import {useRequiredStore} from "../../../../utils/store";
import {PostCreateDialog} from "../dialog/create/create.dialog";
import {AuthStoreContext} from "../../../../stores";
import {ListPostSearch} from "./list-post.search";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            flexGrow: 1,
            margin: theme.spacing(3)
        }
    }
});

export const ListPostComponent = () => {
    const classes = useStyles();
    const uiStore = useRequiredStore(ListPostUIStoreContext);
    const authStore = useRequiredStore(AuthStoreContext);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Observer>{() => <>
                    {authStore.isLoggedIn && (
                        <Grid item xs={12}>
                            <PostCreateDialog />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <ListPostSearch />
                    </Grid>
                    {uiStore.posts.map((value) => (
                        <Grid key={value.id} item xs={12}>
                            <ListPostItem post={value} showIsReadMoreButton={true} />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Pagination
                            count={uiStore.totalPages}
                            showFirstButton
                            showLastButton
                            onChange={(_, page) => uiStore.setPage(page)}
                            variant={"outlined"}
                            shape={"rounded"} />
                    </Grid>
                </>}
                </Observer>
            </Grid>
        </div>
    );
};

export const ListPost = () => {
    const store = new ListPostUiStore();

    return (
        <ListPostUIStoreContext.Provider value={store}>
            <ListPostComponent />
        </ListPostUIStoreContext.Provider>
    );
}