import React from 'react';
import { Menu, Icon } from 'antd';

function Header () {
    return (
      <Menu
        mode="horizontal"
      >
        <Menu.Item key="home">
          <a href="/">
            <Icon type="home" />主页
          </a>
        </Menu.Item>
        <Menu.Item key="post">
          <a href="#posts">
            <Icon type="form" />乘客点评
          </a>
        </Menu.Item>
        <Menu.Item key="user">
          <a href="#users">
            <Icon type="user" />账户
          </a>
        </Menu.Item>
      </Menu>
    );
}

export default Header;