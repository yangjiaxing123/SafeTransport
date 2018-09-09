import React from 'react';
import { connect } from 'dva';
import { List, Card, Modal } from 'antd';
import Loading from '../../components/Loading';

import './index.less';
const { Meta } = Card;

class Photos extends React.Component {
    viewDetail = (item) => {
        Modal.info({
            title: item.title,
            width: 750,
            content: (
                <div>
                    <p>
                        Album: {item.albumName}
                    </p>
                    <img src={item.url} alt={item.title} className="detailImg"/>
                </div>
            ),
            className: "photoDetail",
            okText: "Close"
        });
    }

    render() {
        const {list} = this.props;
        if(!list || !list.length) 
            return <Loading />
        return (
            <div className="photosWrapper">
                <List
                    className="photosWrapper__list"
                    itemLayout="vertical"
                    grid={{ gutter: 16, column: 6 }}
                    dataSource={list}
                    pagination={{pageSize: 10}}
                    renderItem={item => (
                    <List.Item>
                        <Card 
                            hoverable
                            cover={<img alt={item.title} src={item.thumbnailUrl} /> }
                            onClick={this.viewDetail.bind(this, item)}
                        >
                            <Meta
                                title={item.title}
                                description={item.url}
                            />
                        </Card>
                    </List.Item>
                    )}
                />
               
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.photos.list
    };
}
export default connect(
    mapStateToProps,
)(Photos);