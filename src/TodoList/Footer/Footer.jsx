import React, { Component } from 'react';
import PuhSub from 'pubsub-js'
import './Footer.css'
import { TODO_ALLDONE, TODO_DELETEDONE } from '../common';
class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { Todo } = this.props
        return (
            <div id='TodoFooter'>
                <span>完成全部：</span>
                <input
                    type="checkbox"
                    readOnly
                    checked={Todo.filter(item => !item.done).length == 0 && Todo.length != 0 ? true : false}
                    onClick={this.allDone()}
                />
                <span>
                    已完成：{`${Todo.filter(item => item.done).length}`}
                </span>
                <span>
                    未完成：{`${Todo.filter(item => !item.done).length}`}
                </span>
                <span>
                    总数：{`${Todo.length}`}
                </span>
                <button id="deleteDone" onClick={this.deleteDone()}>删除已完成</button>
            </div>
        );
    }
    allDone() {
        const { Todo } = this.props
        return () => {
            let flag
            if (Todo.filter(item => !item.done).length == 0 || Todo.length == 0) {
                flag = false
                PuhSub.publish(TODO_ALLDONE, flag)
                return
            }
            flag = true
            PuhSub.publish(TODO_ALLDONE, flag)
        }
    }
    deleteDone() {
        return () => {
            PuhSub.publish(TODO_DELETEDONE)
        }
    }
}

export default Footer;