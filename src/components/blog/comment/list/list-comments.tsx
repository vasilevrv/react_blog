import React from 'react';
import {useRequiredStore} from "../../../../utils/store";
import {ListCommentsItem} from "./list-comments.item";
import {ListCommentsUIStore, ListCommentsUIStoreContext} from "./list-comments.ui-store";
import {Post} from "../../../../model/blog/post";
import {CreateComment} from "../create/create";
import {Observer} from "mobx-react";
import {createStyles, Divider, List, makeStyles, Theme} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
    }),
);

export const ListCommentsComponent = () => {
    const classes = useStyles();
    const uiStore = useRequiredStore(ListCommentsUIStoreContext);

    return (
        <React.Fragment>
            <Observer>{() => <>
                <List className={classes.root}>
                    {uiStore.comments.map((comment, index) => (
                        <React.Fragment key={comment.id}>
                            {index !== 0 && (<Divider variant="inset" component="li"/>)}
                            <ListCommentsItem comment={comment} />
                        </React.Fragment>
                    ))}
                </List>
                {uiStore.totalPages > 1 && (
                    <Pagination
                    count={uiStore.totalPages}
                    showFirstButton
                    showLastButton
                    onChange={(_, page) => uiStore.setPage(page)}
                    variant={"outlined"}
                    shape={"rounded"} />
                )}
            </>}
            </Observer>
            <CreateComment post={uiStore.post} />
        </React.Fragment>
    );
};

export const ListComments = ({post}: {post: Post}) => {

    const store = new ListCommentsUIStore(post);

    return (
        <ListCommentsUIStoreContext.Provider value={store}>
            <ListCommentsComponent />
        </ListCommentsUIStoreContext.Provider>
    );
};