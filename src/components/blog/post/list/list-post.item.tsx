import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Post} from "../../../../model/blog/post";
import {Link} from "react-router-dom";
import ConfirmationDialog from "../../../ui/dialog/confirmation/confirmation.dialog";
import {useRequiredStore} from "../../../../utils/store";
import {ListPostUIStoreContext} from "./list-post.ui-store";
import {PostEditDialog} from "../dialog/edit/edit.dialog";
import {AuthStoreContext} from "../../../../stores";
import {Observer} from "mobx-react"
import Moment from "moment";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            width: '100%',
            padding: theme.spacing(2)
        },
        media: {
            height: 140,
        },
        content: {
            whiteSpace: 'pre-wrap'
        }
    }
});

export function ListPostItem({post, showIsReadMoreButton}: {post: Post, showIsReadMoreButton?: boolean}) {
    const classes = useStyles();
    const uiStore = useRequiredStore(ListPostUIStoreContext);
    const authStore = useRequiredStore(AuthStoreContext);

    return (
        <Card className={classes.root}>
            <CardActionArea component={Link} to={'/post/'+post.id}>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h2">
                        {post.title}
                    </Typography>
                    <Typography variant="caption" gutterBottom color="textSecondary" component="p">
                        {Moment(post.createdAt).format('LLL')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Observer>{() => <>
                    {showIsReadMoreButton && (
                        <Button size="small" color="primary" variant="contained" component={Link} to={'/post/'+post.id}>
                            Read More...
                        </Button>
                    )}
                    {authStore.isLoggedIn && (
                        <React.Fragment>
                            <PostEditDialog post={post} />
                            <ConfirmationDialog title='Remove' message={'Do you want to remove post `'+post.title+'`?'} onConfirm={() => uiStore.removePost(post)} />
                        </React.Fragment>
                    )}
                    </>}
                </Observer>
            </CardActions>
        </Card>
    );
}