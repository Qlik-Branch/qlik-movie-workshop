import React from "react"
import './login.css'

const Login = () => {
  const goToLogin = () => {
    const loginUrl = new URL(`https://${process.env.REACT_APP_TENANT}/login`)
    loginUrl.searchParams.append("returnto", window.location.href)
    loginUrl.searchParams.append(
      "qlik-web-integration-id",
      process.env.REACT_APP_WEB_INTEGRATION_ID
    )
    window.location.href = loginUrl
  }

  return (
    <div class="Login">
      <button onClick={goToLogin}>Login</button>
    </div>
  )
}

export default Login
