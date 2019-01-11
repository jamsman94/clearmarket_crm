import React from 'react'
import { Route } from 'react-router-dom'
import Counter from './Counter/index'
// import Login from './Login'
import Exm from './Example'
import AssetReport from './AssetReport'
import TradeHistory from './TradeHistory'
import Contact from './Contact'
export default store => (
  <React.Fragment>
    <Route path='/asset-report' component={AssetReport(store)} />
    <Route path='/trade-history' component={TradeHistory(store)} />
    <Route path='/contact' component={Contact(store)} />
    <Route path='/example' component={Exm(store)} />
    <Route path='/counter' component={Counter(store)} />
  </React.Fragment>
)
