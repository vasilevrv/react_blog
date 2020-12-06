import React from 'react';
import { observer } from 'mobx-react';
import {ListPostItem} from "../list/list-post.item";
import {useRequiredStore} from "../../../../utils/store";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {ViewPostUiStore, ViewPostUiStoreContext} from "./view-post.ui-store";
import {ListComments} from "../../comment/list/list-comments";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            flexGrow: 1,
            margin: theme.spacing(3)
        }
    }
});

export const ViewPostComponent = observer(() => {
    const classes = useStyles();
    const uiStore = useRequiredStore(ViewPostUiStoreContext);
    const post = uiStore.getPost();

    if (post) {
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ListPostItem post={post}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ListComments post={post} />
                    </Grid>
                </Grid>
            </div>
        );
    }

    return null;
});

export const ViewPost = ({id}: {id: number}) => {
    const store = new ViewPostUiStore(id);

    return (
        <ViewPostUiStoreContext.Provider value={store}>
            <ViewPostComponent />
        </ViewPostUiStoreContext.Provider>
    );
};
