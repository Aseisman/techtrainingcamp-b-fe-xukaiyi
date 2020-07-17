import React from 'react';
import { Route, Switch } from 'react-router-dom'

import HomePage from '../pages/HomePage/HomePage';
import Video from '../pages/Video/index'
import Cinema from '../pages/Cinema/index'
import Mymessage from '../pages/MyMessage/index'
import NotFound from '../pages/NotFound/index'
import seeDetail from '../component/seeDetail/index'
// 子路由有4个
function SubRouter() {
    return (
        <Switch>
            <Route exact path="/" component={Cinema}></Route>
            <Route path="/Video" component={Video}></Route>
            <Route path="/Cinema" component={HomePage}></Route>
            <Route path="/MyMessage" component={Mymessage}></Route>
            <Route path="/seeDetail" component={seeDetail}></Route>
            <Route path="*" component={NotFound}></Route>
        </Switch>
    )
}
export default SubRouter;