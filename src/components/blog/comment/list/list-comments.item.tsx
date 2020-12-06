import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton} from "@material-ui/core";
import {PostComment} from "../../../../model/blog/post-comment";
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useRequiredStore} from "../../../../utils/store";
import {ListCommentsUIStoreContext} from "./list-comments.ui-store";
import {Observer} from "mobx-react";
import {AuthStoreContext} from "../../../../stores";
import {ListCommentsItemUIStore, ListCommentsItemUIStoreContext} from "./list-comments.item.ui-store";
import Moment from 'moment';

const useStyles = makeStyles((theme: Theme) => {
    return {
        content: {
            whiteSpace: 'pre-wrap'
        }
    }
});

export const ListCommentsItemComponent = () => {
    const classes = useStyles();
    const listUiStore = useRequiredStore(ListCommentsUIStoreContext);
    const uiStore = useRequiredStore(ListCommentsItemUIStoreContext);
    const authStore = useRequiredStore(AuthStoreContext);
    const comment = uiStore.comment;

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>
                    <PersonIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.content} primary={comment.content} secondary={Moment(comment.createdAt).format('LLL')} />
            <Observer>{() => <>
                {authStore.isLoggedIn && (
                    <ListItemSecondaryAction>
                        {comment.public && (
                            <IconButton edge="end" aria-label="hide" onClick={() => uiStore.hideComment(comment)}>
                                <VisibilityIcon />
                            </IconButton>
                        )}
                        {!comment.public && (
                            <IconButton edge="end" aria-label="public" onClick={() => uiStore.publicComment(comment)}>
                                <VisibilityOffIcon />
                            </IconButton>
                        )}
                        <IconButton edge="end" aria-label="delete" onClick={() => listUiStore.deleteComment(comment)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                )}
            </>}
            </Observer>
        </ListItem>
    );
}

export const ListCommentsItem = ({comment}: {comment: PostComment}) => {

    const store = new ListCommentsItemUIStore(comment);

    return (
        <ListCommentsItemUIStoreContext.Provider value={store}>
            <ListCommentsItemComponent />
        </ListCommentsItemUIStoreContext.Provider>
    );
};