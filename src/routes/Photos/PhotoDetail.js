import React from 'react';
import { Modal } from 'antd';

class PhotoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { children } = this.props;
    const { title, url } = this.props.record;

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title={this.props.record.title}
          visible={this.state.visible}
          onCancel={this.hideModelHandler}
        >
            <img src={url} alt={title}/> 
        </Modal>
      </span>
    );
  }
}

export default PhotoDetail;