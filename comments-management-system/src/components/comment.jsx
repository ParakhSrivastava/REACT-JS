import React, { useState } from 'react'

const Comment = props => {
    const { comment, onSubmitComment, onEditComment, onDeleteComment } = props;
    const [expand, setExpand] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setEditedContent(comment.content);
    }

    const handleEditSubmit = () => {
        onEditComment({
            commentId: comment.id,
            content: editedContent,
        });
        setEditMode(false);
    }

    const handleDeleteSubmit = () => {
        onDeleteComment({
            commentId: comment.id,
        });
    }

    const handleChange = e => {
        if(editMode) {
            setEditedContent(e.target.value);
        } else {
            setReplyContent(e.target.value);
        }
    }

    const handleReplySubmit = () => {
        if(replyContent) {
            onSubmitComment({
                commentId: comment.id,
                content: replyContent,
            })
            setReplyContent("");
        }
    }

    const toggleExpand = () => {
        setExpand(!expand)
    }

    return (
        <div className='comment'>
            {!editMode ? (
                <>
                    <p>{comment.content}</p>
                    <p>Votes: {comment.votes}</p>
                    <p>{new Date(comment.timestamp).toLocaleString()}</p>
                </>
            ) : (
                <div className='add-comment'>
                    <textarea 
                        value={editedContent}
                        name="comment" 
                        id="comment" 
                        rows={3} 
                        columns={50}
                        onChange={handleChange}
                        className='comment-textarea'
                        placeholder='Add a new comment...'
                    />
                    <button className='comment-button' onClick={handleEditSubmit}>Save edit</button>
                    <button className='comment-button' onClick={toggleEditMode}>Cancel edit</button>
                </div>
            )}
            <div className="comment-actions">
                <button className="comment-button" onClick={toggleExpand}>
                    {expand ? "Hide Replies": "Reply"}
                </button>
                <button className="comment-button" onClick={toggleEditMode}>Edit</button>
                <button className="comment-button" onClick={handleDeleteSubmit}>Delete</button>
            </div>
            {expand && (
                <div className="comment-replies">
                    <div className='add-comment'>
                        <textarea 
                            value={replyContent}
                            name="comment" 
                            id="comment" 
                            rows={3} 
                            columns={50}
                            onChange={handleChange}
                            className='comment-textarea'
                            placeholder='Add a new comment...'
                        />
                        <button className='comment-button' onClick={handleReplySubmit}>Add Comment</button>
                    </div>

                    {comment?.replies?.map(reply => {
                        return (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                onSubmitComment={onSubmitComment}
                                onEditComment={onEditComment}
                                onDeleteComment={onDeleteComment}
                            />
                        )
                    })}
                </div>
            )
            }
        </div>
    )
}

export default Comment