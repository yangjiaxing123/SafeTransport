import React from 'react';
import { Modal, Form, Input } from 'antd';
import Loading from '../../components/Loading';

const {Item: FormItem} = Form;
const {TextArea} = Input;

class CommentModal extends React.Component {
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

  okHandler = () => {
    const { onOk, form, postId, record } = this.props;
    const { id } = record;
    form.validateFields((err, values) => {
      if (!err) {
        values['postId'] = postId;
        values["id"] = id;
        onOk(values);
        form.resetFields();
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children, form, record } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    if (!record) {
      return <Loading />
    } else {
      const { name, body, email } = record;
      return (
        <span>
          <span onClick={this.showModelHandler}>{children}</span>
          <Modal
            title="Add Comment"
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModelHandler}
          >
            <Form layout="horizontal" onSubmit={this.okHandler}>
              <FormItem {...formItemLayout} label="Name">
                {getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Body">
                {getFieldDecorator('body', {
                  initialValue: body,
                })(<TextArea autosize={{minRows: 2, maxRows: 6}} />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Email">
                {getFieldDecorator('email', {
                  initialValue: email,
                })(
                  <Input type="email" />
                )}
              </FormItem>
            </Form>
          </Modal>
        </span>
      );
    }
  }
}

export default Form.create()(CommentModal);