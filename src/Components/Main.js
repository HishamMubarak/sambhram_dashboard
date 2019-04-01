import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../Pages/Home'
import Dept from '../Pages/Dept'
import Batch from '../Pages/Batch'
import Teacher from '../Pages/Teacher'
import Student from '../Pages/Student'

const Main = () => {
    return(
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/dept" exact component={Dept} />
                <Route path="/batch/:batchId" exact component={Batch} />
                <Route path='/student' exact component={Student} />
                <Route path='/teacher' exact component={Teacher} />
            </Switch>
        </React.Fragment>
    )
}

export default Main