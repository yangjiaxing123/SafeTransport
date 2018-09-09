import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { List, Popconfirm, Button, Icon, message } from 'antd';
import PostModal from './PostModal';
import Loading from '../../components/Loading';
import './Posts.less';

class Posts extends React.Component {
  state = {
    list: [],
  };

  componentWillReceiveProps(nextProps) {
    const { list, users } = nextProps;
    this.setState({ list, users });
  }

  voteHandler = (id) => {
    let { list } = this.state;
    list = _.filter(list, item => item.id !== id);
    
    //this.props.dispatch({
    //  type: 'posts/vote',
    //  payload: { id },
    //});

    this.setState({ list });
    message.success('vote success!');
  }  

  editHandler = (id, values) => {
    let { list, users } = this.state;
    let index = _.findIndex(list, { id });
    let _users = users.filter(item => item.id === values.userId);
    
    this.props.dispatch({
      type: 'posts/patch',
      payload: { id, values },
    });
    
    values.userName = _users[0].name;
    list[index] = values;
    this.setState({ list });
    message.success('Edit success!')
  }

  createHandler = (id = -1, values) => {
    let { list, users } = this.state;
    let obj = { id, ...values };
    let _users = users.filter(item => item.id === values.userId);
    obj.userName = _users[0].name;
    
    this.props.dispatch({
      type: 'posts/create',
      payload: values,
    });

    // insert new item to the list
    list.splice(0, 0 , obj);
    this.setState({ list });
    message.success('Create success!');
  }

  render() {
    const { list } = this.state;

    if(!list.length) return <Loading />

    return (
      <div className="postWrapper">
        <div className="create" style={{textAlign: "left"}}>
            <PostModal record={{}} onOk={this.createHandler}>
              <Button type="primary" icon="plus">新点评</Button>
            </PostModal>
        </div>
        <List
          itemLayout="vertical"
          dataSource={list}
          pagination={{
            pageSize: 5,
          }}
          renderItem={post => (
            <List.Item
              actions={[
                <Popconfirm>
                  <div>0 Token </div>
                </Popconfirm>,
                <Popconfirm
                  title="是否打赏1积分给评价者?"
                  onConfirm={this.voteHandler.bind(this, post.id)}
                >
                  <a href="javascript:void(0)" style={{marginLeft: 10, color: "#f20"}}><Icon type="like" /></a>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={<a href={`#posts/${post.id}`}>{post.title}</a>}
                description={post.body}
              />
              <span><Icon type="user" />{` ${post.userName}`}</span>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, users } = state.posts;
  return {
    list: list,
    users: users
  };
}

export default connect(mapStateToProps)(Posts);