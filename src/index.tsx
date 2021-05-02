
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import { reportWebVitals } from './reportWebVitals'
import { Routes } from './routes'
import { store } from './store'
import { GlobalStyle } from './theming/global'
import { ThemeProvider } from './theming/provider'
import { snowTheme } from './theming/snow'
import { initFirebaseApp } from './infra/firebase'
import { Auth } from './infra/firebase/auth'
import { appStore } from './store'

initFirebaseApp()

Auth.onUserSignIn((authProviderUser) => {
  const userProps = {
    id: authProviderUser.uid,
    email: authProviderUser.email,
    displayName: authProviderUser.displayName,
  }

  appStore.signIn(userProps)
})

Auth.onUserSignOut(() => {
  appStore.signOut()
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={snowTheme}>
      <Provider store={store}>
        <GlobalStyle />
        <Routes />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
