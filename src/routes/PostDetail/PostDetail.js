import React from 'react';
import { connect } from 'dva';
import { Icon, message } from 'antd';
import _ from 'lodash';
import Comments from '../Comments/Comments';
import CommentModal from '../Comments/CommentModal';
import Loading from '../../components/Loading';

import './index.less';

class PostDetail extends React.Component {
    state = {
        comments: [],
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ comments: nextProps.comments });
    }

    addCommentHandler = (values) => {
        let { comments } = this.state;
        let created = { id: comments.length + 1, ...values };
        comments.push(created);
        
        this.props.dispatch({
            type: 'postDetail/create', 
            payload: values
        });
        
        this.setState({ comments });
        message.success('Create success!');
    }

    editCommentHandler = (values) => {
        let { comments } = this.state;
        let index = _.findIndex(comments, { id: values.id });
        comments.splice(index, 1, { ...values });
        this.props.dispatch({
            type: 'postDetail/patch', 
            payload: values
        });

        this.setState({ comments });
        message.success('Edit success!');
    }

    deleteCommentHandler = (id) => {
        let { comments } = this.state;
        comments = _.filter(comments, item => item.id !== id);
        this.props.dispatch({
            type: 'postDetail/delete', 
            payload: id
        });

        this.setState({ comments });
        message.success('Delete success!');
    }

    render() {
        const {post} = this.props;
        const {comments} = this.state;

        if(!post || !comments || !comments.length) 
            return <Loading />
        return (
            <div className="postDetail">
                <div className="postDetail__content">
                    <h4 className="postDetail__content__title">
                        {post.title}
                    </h4>
                    <div className="postDetail__content_body">
                        {post.body}
                    </div>
                    <div className="postDetail__user">
                        <Icon type="user" style={{marginRight: 7}} />{post.userName}
                    </div>
                </div>
                <Comments comments={comments} postId={post.id} onEdit={this.editCommentHandler} onDelete={this.deleteCommentHandler}/>
                <div className="postDetail__addComment">
                    <CommentModal postId={post.id} onOk={this.addCommentHandler} record={{}}>
                        <a href="javascript:void(0)">Write your comment</a>
                    </CommentModal>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {post, comments} = state.postDetail;
    return {
        post,
        comments
    };
}

export default connect(
    mapStateToProps,
)(PostDetail);