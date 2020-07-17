import React , { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom'
import Home from '../pages/Home'
import SubRouter from './SubRouter';

// 这个是总的路由入口
class AppRouter extends Component{
    render(){
        return (
            <HashRouter>
                {/* <Route path='/' component={HomePage}></Route> */}
                {/* Home是入口 */}
                <Home path="/">
                    {/* 子路由 */}
                    <SubRouter></SubRouter>
                </Home>
            </HashRouter>
        );
    }
}
export default AppRouter;