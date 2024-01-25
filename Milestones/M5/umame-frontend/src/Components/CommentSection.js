import React from 'react';
import { Avatar, Card, CardContent, Typography, TextField, Button, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const CommentSection = ({ comments }) => {

    console.log("COMMETS COMMETS");
    console.log(comments);
    
    return (
        <div variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                    Comments
                </Typography>

                <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '8px' }}>
                    {comments && comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} style={{ marginLeft: `${comment.depth * 20}px` }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <Avatar>{comment.commentOwner.charAt(0)}</Avatar>
                                    <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
                                        {comment.commentOwner}
                                    </Typography>
                                </div>
                                <Typography variant="body1">
                                    {comment.content}
                                </Typography>

                                {comment.replies && comment.replies.length > 0 && (
                                    <div style={{ marginLeft: '20px' }}>
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} style={{ marginLeft: `${reply.depth * 20}px` }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                    <Avatar>{reply.replyOwner.charAt(0)}</Avatar>
                                                    <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
                                                        {reply.replyOwner}
                                                    </Typography>
                                                </div>
                                                <Typography variant="body1">
                                                    {reply.content}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <Typography variant="body2">No comments available.</Typography>
                    )}
                </div>

                <div style={{ marginTop: '16px' }}>
                    {/* Add an input for the user to add a comment */}
                    <TextField
                        variant="outlined"
                        label="Add a comment"
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Add Comment
                    </Button>
                </div>
            </CardContent>
        </div>
    );
};

export default CommentSection;
