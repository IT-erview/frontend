import { Route, Redirect, RouteProps } from 'react-router-dom'
import { JWT_TOKEN } from 'constants/Oauth'
const PublicRoute: React.FunctionComponent<
  {
    component: React.ElementType
  } & RouteProps
> = ({ component: Component, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={(props) => (JWT_TOKEN ? <Redirect to="/" /> : <Component {...props} />)} />
  )
}
export default PublicRoute
