import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import OAuth from '../components/OAuth'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad user credentials')
    }
  }

  return (
    <>
      <div className="pageContainer main-container-override">
        <header>
          <p className="pageHeader">Welcome back!</p>
        </header>
        <form
          onSubmit={onSubmit}
          style={{ width: '95%' }}
          className="small-container-override"
        >
          <input
            type="email"
            placeholder="Email"
            spellCheck="false"
            autoComplete="off"
            className="emailInput input-override"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv input-override">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <div className="signInBar">
            <p className="signInText">Sign in</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/forgot-password" className="forgotPasswordLink">
          Forgot password
        </Link>
        <Link to="/sign-up" className="registerLink">
          Sign up instead
        </Link>
      </div>
    </>
  )
}
export default SignIn
