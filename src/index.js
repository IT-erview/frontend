import React from 'react'
import ReactDOM from 'react-dom'
import 'sass/app.sass'
import App from './App'
// import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
