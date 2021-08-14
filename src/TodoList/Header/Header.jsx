import React, { Component } from 'react';
import PuhSub from 'pubsub-js'
import './Header.css'
import { TODO_ADDLIST } from '../common';
class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id='TodoHeader'>
                <input type='text' placeholder='请输入待办事件' onKeyDown={this.addList()} ref={(input) => {
                    this.addValue = input
                }} />
            </div>
        );
    }
    addList() {
        return (event) => {
            if (event.keyCode == 13 && this.addValue.value != '') {
                PuhSub.publish(TODO_ADDLIST, this.addValue.value)
                this.addValue.value = ''
            }
        }
    }
}

export default Header;