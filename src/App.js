import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import PageLayout from '@/components/PageLayout'
import { LoadingView } from '@/components/handleCommon'
import base from './routes/index'
import Home from './routes/Home/index'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <LoadingView />
          <HashRouter>
            <Switch>
              <Route path='/' render={({ match }) => (
                <PageLayout>
                  <Route exact path={match.url} component={Home} />
                  {base(store)}
                </PageLayout>)}
              />
            </Switch>
          </HashRouter>
        </div>
      </Provider>
    )
  }
}

export default App
