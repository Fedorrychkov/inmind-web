import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { CoursePage } from './pages/course-page'
import { AuthPage } from './pages/auth-page'

const ScrollToTop = withRouter(({ history }: any) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [history])

  return null
})

export const Routes = () => (
  <Router basename={process.env.REACT_APP_PUBLIC_URL_PATHNAME}>
    <ScrollToTop />
    <Switch>
      <Route path="/" exact component={CoursePage} />
      <Route path="/login" exact component={AuthPage} />
      <Redirect to="/" />
    </Switch>
  </Router>
)
