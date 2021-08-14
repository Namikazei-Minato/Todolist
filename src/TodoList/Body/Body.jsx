import React, { Component } from 'react';
import PuhSub from 'pubsub-js'
import './Body.css'
import { TODO_COMPLETE, TODO_DELETE } from '../common';
class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: ''
        }
    }
    render() {
        const { Todo } = this.props
        const { current } = this.state
        return (
            <div id='TodoBody'>
                <ul>
                    {Todo.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onMouseOver={() => { this.active(item.id) }}
                                onMouseOut={() => { this.active('') }}
                                style={{ backgroundColor: item.id == current ? 'skyblue' : '#fff' }}
                            >
                                <span className='TodoValue'>{item.value}</span>
                                <button
                                    id='delete'
                                    style={{ display: item.id == current ? 'block' : 'none' }}
                                    onClick={() => {
                                        this.delete(item.id)
                                    }}
                                >
                                    删除
                                </button>
                                <input
                                    className='DoneBox'
                                    type='checkbox'
                                    checked={item.done ? true : false}
                                    onChange={() => {
                                        this.complete(item.id)
                                    }}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
    complete(id) {
        PuhSub.publish(TODO_COMPLETE, id)
    }
    active(id) {
        this.setState({ current: id })
    }
    delete(id) {
        PuhSub.publish(TODO_DELETE, id)
    }
}

export default Body;