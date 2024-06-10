import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onClickSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          className="desktop-image"
          alt="website login"
          src="https://res.cloudinary.com/duzolwm0p/image/upload/v1697808990/Rectangle_1467_1_n31v0l.png"
        />
        <img
          className="login-website-mobile-image"
          alt="website login"
          src="https://res.cloudinary.com/duzolwm0p/image/upload/v1697809328/Ellipse_99_2_wdstsf.png"
        />

        <div className="form-main-container">
          <form onSubmit={this.onClickSubmitForm} className="form-container">
            <img
              alt="login website logo"
              src="https://res.cloudinary.com/duzolwm0p/image/upload/v1697809040/Group_7731_1_wkrpoy.png"
            />
            <div className="input-container">
              <label htmlFor="username" className="label-text">
                Username*
              </label>
              <input
                id="username"
                type="text"
                className="input-field"
                placeholder="EX-lavanya"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-text">
                Password*
              </label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="EX-lavanya@2021"
                onChange={this.onChangePassword}
              />
              <p className="error-message">{errorMsg}</p>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
