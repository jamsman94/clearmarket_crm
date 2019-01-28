import React from 'react'
import { Route } from 'react-router-dom'
import Counter from './Counter/index'
// import Login from './Login'
import Exm from './Example'
import AssetReport from './AssetReport'
import TradeHistory from './TradeHistory'
import Contact from './Contact'
import Verify from './verify'
import Report from './Report'
import Platform from './platform'
import Operator from './Operator'
import Role from './Role'
export default store => (
  <React.Fragment>
    <Route path='/asset-report' component={AssetReport(store)} />
    <Route path='/trade-history' component={TradeHistory(store)} />
    <Route path='/verify' component={Verify(store)} />
    <Route path='/contact' component={Contact(store)} />
    <Route path='/example' component={Exm(store)} />
    <Route path='/counter' component={Counter(store)} />
    <Route path='/report' component={Report(store)} />
    <Route path='/platform' component={Platform(store)} />
    <Route path='/operator' component={Operator(store)} />
    <Route path='/role' component={Role(store)} />
  </React.Fragment>
)
