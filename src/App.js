import React from "react"
import {
  Router, Switch, Redirect,
  Route,
} from 'react-router-dom'
import HomeLayout from './pages/Home'
// import Home from './pages/Home'
import Login from './pages/Login'
import Share from './pages/ShareLink'
import createHistory from 'history/createHashHistory'
const history = createHistory()

export default class App extends React.Component {



  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home/allfiles" push />} />
          <Route path="/home" component={HomeLayout} />
          <Route path="/login" component={Login} />
          <Route path="/sharelink" component={Share} />
        </Switch>
      </Router>
    )
  }
}


