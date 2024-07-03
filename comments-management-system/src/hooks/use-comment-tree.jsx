import React, { useState } from 'react';

const UseCommentTree = props => {
    const {
        initialComments = [],
    } = props;

    const insertNode = ({ prevComments, commentId, newComment }) => {
        return prevComments.map(comment => {
            if(comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, newComment],
                }
            } else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: insertNode({
                        prevComments: comment.replies,
                        commentId,
                        newComment,
                    })
                }
            }

            return comment;
        })
    }

    const insertComment = ({ commentId, content }) => {
        
        const newComment = {
            id: Date.now(),
            content,
            votes: 0,
            timestamp: new Date().toISOString(),
            replies: [],
        }
        if(commentId) {
            setComments(prevComments => insertNode({ prevComments, commentId, newComment }))
        } else {
            setComments(prevComments => [newComment, ...prevComments]);
        }
    }

    const editNode = ({ prevComments, commentId, newComment }) => {
        return prevComments.map(comment => {
            if(comment.id === commentId) {
                return {
                    ...comment,
                    content: newComment,
                    timestamp: new Date().toISOString(),
                }
            } else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: editNode({
                        prevComments: comment.replies,
                        commentId,
                        newComment,
                    })
                }
            }

            return comment;
        })
    }

    const editComment = ({ commentId, content }) => {
        setComments(prevComments => editNode({ prevComments, commentId, newComment: content }))
    }

    const deleteNode = ({ prevComments, commentId }) => {
        return prevComments.reduce((acc, comment) => {
            if(comment.id === commentId) {
                return acc;
            } else if (comment.replies && comment.replies.length > 0) {
                comment.replies = deleteNode({
                    prevComments: comment.replies,
                    commentId,
                });
            }

            return [...acc, comment];
        }, [])
    }

    const deleteComment = ({ commentId }) => {
        setComments(prevComments => deleteNode({ prevComments, commentId }))
    }

    const [comments, setComments] = useState(initialComments);

    return {
        comments,
        insertComment,
        editComment,
        deleteComment,
    }
}

export default UseCommentTree