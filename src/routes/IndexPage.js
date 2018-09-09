import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import './IndexPage.less';

class IndexPage extends React.PureComponent{
  state = {
    text: '',
  }

  buttonClickHandler = () => {
    this.setState({text: 'Welcome to dva!'});
  }

  render() {
    
    return (
      <div className="normal">
        <h1 className="title">Welcome to Safe Transport! </h1>
        <h4 className="author">By 16 组</h4>
      </div>
    );
  }

}

export default connect()(IndexPage);
