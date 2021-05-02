import React from 'react'
import {
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom'

import { appStore } from '~/store'

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>
}

const PrivateRoute = ({ component: Component, ...restRouteProps }: PrivateRouteProps) => (
  <Route
    {...restRouteProps}
    render={({ location }) =>
      appStore.isAuthenticated ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }
  />
)

export { PrivateRoute }