import React from 'react';
import { connect } from 'dva';
import { List, Icon } from 'antd';
import Loading from '../../components/Loading';
import './Albums.less';

class Albums extends React.Component {
  render() {
    const { list } = this.props;
    if(!list || !list.length)
      return <Loading />
    return (
      <div className="albumWrapper">
        <List
          itemLayout="vertical"
          grid={{ gutter: 30, column: 6 }}
          dataSource={list}
          pagination={{
            pageSize: 12,
          }}
          renderItem={item => (
            <List.Item
                key={item.id}
                actions={[
                    <a href={`#albums/${item.id}/photos`}>Details</a>
                ]}
            >
              <List.Item.Meta
                  title={<a href={`#albums/${item.id}/photos`}>{item.title}</a>}
                  description={<span><Icon type="user" style={{marginRight: 7}} /> {item.userName}</span>}
                />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.albums.list
  };
}

export default connect(mapStateToProps)(Albums);