import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Post} from "../../../../../model/blog/post";
import {PostEditDialogUIStore, PostEditDialogUIStoreContext} from "./edit.dialog.ui-store";
import {useRequiredStore, useStore} from "../../../../../utils/store";
import {observer} from "mobx-react";
import {ListPostUIStoreContext} from "../../list/list-post.ui-store";
import {Box} from "@material-ui/core";

export const PostEditDialogComponent = observer(() => {
    const [open, setOpen] = React.useState(false);
    const uiStore = useRequiredStore(PostEditDialogUIStoreContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleConfirm = async () => {
        await uiStore.update();
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleCancel}
                fullScreen
            >
                <DialogTitle>Edit "{uiStore.post.title}"</DialogTitle>
                <DialogContent>
                    <Box mt={2} width='100%'>
                        <TextField
                            value={uiStore.title}
                            onChange={(e) => uiStore.setTitle(e.target.value)}
                            disabled={uiStore.inProgress}
                            fullWidth
                            variant="outlined"
                            label="Title"
                            placeholder="Title"
                        />
                    </Box>
                    <Box mt={2} width='100%'>
                        <TextField
                            value={uiStore.content}
                            onChange={(e) => uiStore.setContent(e.target.value)}
                            disabled={uiStore.inProgress}
                            multiline
                            rows="40"
                            fullWidth
                            variant="outlined"
                            label="Content"
                            placeholder="Content"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} variant="contained" color="primary" autoFocus disabled={!uiStore.isValid || uiStore.inProgress}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
});

export const PostEditDialog = ({post}: {post: Post}) => {

    const store = new PostEditDialogUIStore(post);
    const listPostUIStore = useStore(ListPostUIStoreContext);
    if (listPostUIStore) {
        store.setListPostUIStore(listPostUIStore);
    }

    return (
        <PostEditDialogUIStoreContext.Provider value={store}>
            <PostEditDialogComponent />
        </PostEditDialogUIStoreContext.Provider>
    );
};