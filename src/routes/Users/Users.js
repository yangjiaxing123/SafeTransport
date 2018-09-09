import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import Loading from '../../components/Loading';
import './Users.less';

class Users extends React.Component {
  render() {
    const { list } = this.props;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Current Balance',
        dataIndex: 'balance',
        key: 'balance',
      },
      {
        title: 'Actions',
        key: 'operation',
        render: (text, record) => (
          <span className="operation">
            <a href={`#posts?userId=${record.id}`}>View Posts</a>
          </span>
        ),
      },
    ];

    if(!list || !list.length)
      return <Loading />

    return (
      <div className="usersWrapper">
        <div>
          <Table
            columns={columns}
            dataSource={list}
            rowKey={record => record.id}
            pagination={false}
          />
        </div>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.users.list
  };
}

export default connect(mapStateToProps)(Users);