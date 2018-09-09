import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import request from '../../utils/request';

const {Item: FormItem} = Form;
const {TextArea} = Input;
const {Option} = Select;

class PostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      users: [],
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

  okHandler = () => {
    const { onOk, form, record } = this.props;
    const { id } = record;
    form.validateFields((err, values) => {
      if (!err) {
        if(values && values.userName && !isNaN(values.userName)) {
          values['userId'] = parseInt(values.userName, 10);
          delete values['userName'];
          onOk(id, values);
          form.resetFields();
        }
        this.hideModelHandler();
      }
    });
  };

  handleUserChange = (value) => {
    console.log(value);
  }

  handleFocus = () => {
    request('/api/users')
      .then(res => {
        this.setState({users: res.data});
      })
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { title, body, userName } = this.props.record;
    const { users } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title={this.props.record.id ? "Edit Post": "新点评"}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="信息">
              {getFieldDecorator('title', {
                initialValue: title,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="评价">
              {getFieldDecorator('body', {
                initialValue: body,
              })(<TextArea autosize={{minRows: 2, maxRows: 6}} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="我">
              {getFieldDecorator('userName', {
                initialValue: userName,
              })(
                <Select
                  style={{ width: 200 }}
                  onChange={this.handleUserChange}
                  onFocus={this.handleFocus}
                >
                  {
                    users.map(user => <Option key={user.id}>{user.name}</Option>)
                  }
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PostModal);