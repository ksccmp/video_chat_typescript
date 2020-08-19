import * as React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from '../../modules/reducer/index';
import { Iuser } from '../../api/interface';

interface Iroom {
    roomId: string;
    createId: string;
    contents: string;
}

const room = ({ roomId, createId, contents }: Iroom) => {
    const reduxUser: Iuser = useSelector((state: reducerState) => state.user.user);

    const Open = () => {
        if (reduxUser.userId != '' && reduxUser.userId.length > 0) {
            window.open(
                `http://localhost:8888/socket/chat/${roomId}/${reduxUser.userId}`,
                'windowName',
                'toolbar=no, menubar=no',
            );
        }
    };

    return (
        <Card style={{ maxWidth: 345, marginBottom: 10 }}>
            <CardActionArea>
                <CardMedia
                    style={{ height: 140 }}
                    image="https://www.sisajournal.com/news/photo/201909/190944_95563_5753.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="h5">
                        {createId}의 방 ({roomId})
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {contents}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={Open}>
                    참여
                </Button>
            </CardActions>
        </Card>
    );
};

export default room;
