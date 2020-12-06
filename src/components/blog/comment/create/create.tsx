import React from 'react';
import {Box, Button} from "@material-ui/core";
import {useRequiredStore, useStore} from "../../../../utils/store";
import {CreateUiStore, CreateUiStoreContext} from "./create.ui-store";
import {Observer} from "mobx-react";
import {ListCommentsUIStoreContext} from "../list/list-comments.ui-store";
import {Post} from "../../../../model/blog/post";
import TextField from "@material-ui/core/TextField";

export const CreateCommentComponent = () => {

    const uiStore = useRequiredStore(CreateUiStoreContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        uiStore.updateContent(e.target.value);
    };

    const handleAddComment = async () => {
        await uiStore.addComment();
    }

    return (
        <div>
            <Observer>{() => <>
                <Box mt={2} width='100%'>
                    <TextField
                        value={uiStore.content}
                        onChange={handleChange}
                        disabled={uiStore.inProgress}
                        multiline
                        rows="5"
                        fullWidth
                        variant="outlined"
                        label="Comment"
                        placeholder="Comment"
                    />
                </Box>
                <Box mt={2} width='100%'>
                    <Button
                        variant="contained"
                        size="medium"
                        color="secondary"
                        onClick={handleAddComment}
                        type="submit"
                        disabled={!uiStore.isValid || uiStore.inProgress}>
                        Add comment
                    </Button>
                </Box>
            </>}</Observer>
        </div>
    );
};

export const CreateComment = ({post}: {post: Post}) => {

    const store = new CreateUiStore(post);
    const listUIStore = useStore(ListCommentsUIStoreContext);
    if (listUIStore) {
        store.setListUIStore(listUIStore);
    }

    return (
        <CreateUiStoreContext.Provider value={store}>
            <CreateCommentComponent />
        </CreateUiStoreContext.Provider>
    );
};