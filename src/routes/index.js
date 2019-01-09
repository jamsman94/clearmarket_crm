import React from 'react'
import { Route } from 'react-router-dom'
import Counter from './Counter/index'
import Login from './Login'
import Exm from './Example'
export default store => (
  <React.Fragment>
    <Route path='/example' component={Exm(store)} />
    <Route path='/login' component={Login(store)} />
    <Route path='/counter' component={Counter(store)} />
  </React.Fragment>
)
