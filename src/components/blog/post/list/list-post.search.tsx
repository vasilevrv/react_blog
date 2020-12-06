import React, {KeyboardEvent} from 'react';
import {useRequiredStore} from "../../../../utils/store";
import {ListPostUIStoreContext} from "./list-post.ui-store";
import {TextField, InputAdornment, IconButton} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {observer} from "mobx-react";

export const ListPostSearch = observer(() => {
    const uiStore = useRequiredStore(ListPostUIStoreContext);

    return (
            <TextField
                fullWidth
                variant="outlined"
                label="Search"
                placeholder="Title or content part"
                value={uiStore.searchValue}
                onChange={e => uiStore.setSearchValue(e.target.value)}
                onKeyPress={(e: KeyboardEvent) => {e.key === 'Enter' && uiStore.search()}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton edge="end" type="submit" onClick={uiStore.search}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

    );
});