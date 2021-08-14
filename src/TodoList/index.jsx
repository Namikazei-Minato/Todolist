import React, { Component } from 'react';
import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import PuhSub from 'pubsub-js'
import './index.css'
import { TODO } from './common';
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Todo: [
                {
                    id: 1,
                    done: false,
                    value: '赚大钱'
                },
                {
                    id: 2,
                    done: true,
                    value: '还是赚大钱'
                },
                {
                    id: 3,
                    done: false,
                    value: '还是tmd赚大钱'
                },
            ],
        }
    }
    componentDidMount() {
        PuhSub.subscribe(TODO, this.dataControl)
    }
    componentWillUnmount() {
        PuhSub.unsubscribe(TODO)
    }
    dataControl = (type, obj) => {
        let funName = type.slice(TODO.length + 1)
        this[funName](obj)
    }
    render() {
        return (
            <div id='TodoList'>
                <h2 id='TodoTitle'>TodoList</h2>
                <Header></Header>
                <Body Todo={this.state.Todo}></Body>
                <Footer Todo={this.state.Todo}></Footer>
            </div>
        );
    }
    addList = (value) => {
        let NewList = this.state.Todo;
        NewList.push({
            id: Symbol(),
            done: false,
            value: value
        })
        this.setState({
            Todo: NewList
        })
    };
    complete = (id) => {
        let NewList = this.state.Todo
        NewList.forEach((item) => {
            if (item.id == id) {
                item.done = !item.done
            }
        })
        this.setState({ Todo: NewList })
    }
    allDone = (flag) => {
        let NewList = this.state.Todo
        NewList.forEach((item) => {
            item.done = flag
        })
        this.setState({ Todo: NewList })
    }
    delete = (id) => {
        let NewList = this.state.Todo
        NewList = NewList.filter((item) => {
            return item.id != id
        })
        this.setState({ Todo: NewList })
    }
    deleteDone = () => {
        let NewList = this.state.Todo
        NewList = NewList.filter((item) => {
            return item.done == false
        })
        this.setState({ Todo: NewList })
    }
};


export default index;