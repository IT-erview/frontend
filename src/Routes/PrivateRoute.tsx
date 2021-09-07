import { Route, Redirect, RouteProps } from 'react-router-dom'
import { JWT_TOKEN } from 'constants/Oauth'
import React from 'react'

const PrivateRoute: React.FunctionComponent<
  {
    component: React.ElementType
  } & RouteProps
> = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page

    <Route
      {...rest}
      render={(props) =>
        JWT_TOKEN ? (
          <Component {...props} />
        ) : (
          <>
            <Redirect to="/LoginPage" />
          </>
        )
      }
    />
  )
}
export default PrivateRoute
