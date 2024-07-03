import React, { useState } from 'react'
import './styles.css';
import UseCommentTree from '../hooks/use-comment-tree';
import Comment from './comment';

const NestedComments = props => {
    const { 
        comments,
        onSubmit,
        onEdit,
        onDelete,
    } = props;

    const [comment, setComment] = useState("");
    const { 
        comments: commentsData,
        insertComment,
        editComment,
        deleteComment
    } = UseCommentTree({ initialComments: comments });

    const handleChange = e => setComment(e.target.value); 
    const handleSubmit = () => {
        if(comment) {
            handleReply({
                commentId: undefined,
                content: comment,
            })
            setComment("")
        }   
    }
    const handleReply = ({ commentId, content }) => {
        insertComment({
            commentId,
            content,
        })
        onSubmit(content);
    }; 
    
    const handleEdit = ({ commentId, content }) => {
        editComment({
            commentId,
            content,
        })
        onEdit(content);
    };
    
    const handleDelete = ({ commentId }) => {
        deleteComment({
            commentId,
        });
        onDelete(commentId)
    };

    return (
        <>
            <div className='add-comment'>
                <textarea 
                    value={comment}
                    name="comment" 
                    id="comment" 
                    rows={3} 
                    columns={50}
                    onChange={handleChange}
                    className='comment-textarea'
                    placeholder='Add a new comment...'
                />
                <button className='comment-button' onClick={handleSubmit}>Add Comment</button>
            </div>
            {commentsData.map(comment => {
                return (
                    <Comment 
                        key={comment.id}
                        comment={comment}
                        onSubmitComment={handleReply}
                        onEditComment={handleEdit}
                        onDeleteComment={handleDelete}
                    />

                );
            })}
        </>
    )
}

export default NestedComments;