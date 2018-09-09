import React from 'react';
import { Icon, Popconfirm } from 'antd';
import CommentModal from '../Comments/CommentModal';
import './index.less';

function Comments({ comments, postId, onEdit, onDelete }) {
    function deleteCommentHandler(id) {
        onDelete(id);
    }
    function okHandler(values) {
        onEdit(values);
    }

    return (
        <div className="comments">
            {
                comments.map((item, index) => {
                    return (
                        <div key={index} className="comments__item">
                            <span className="comments__userIcon">
                                <Icon type="user" /> 
                            </span>
                            <p className="comments__name">{item.name}</p>
                            <p className="comments__body">{item.body}</p>
                            <p className="comments__email">{item.email} </p>
                            <div className="comments__operations">
                                <CommentModal record={item} postId={item.postId} onOk={okHandler}>
                                    <a href="javascript:void(0)"><Icon type="edit" /></a>
                                </CommentModal>
                                
                                <Popconfirm
                                    title="Confirm to delete?"
                                    onConfirm={deleteCommentHandler.bind(this, item.id)}
                                    >
                                    <a href="javascript:void(0)" style={{marginLeft: 10, color: "#f20"}}><Icon type="delete" /></a>
                                </Popconfirm>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Comments;