import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }

  return (
    <div className="pageContainer main-container-override-2">
      <header>
        <p className="pageHeader">Forgot password</p>
      </header>

      <form onSubmit={onSubmit} className="small-container-override">
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
          className="emailInput input-override"
        />

        <div className="signInBar  input-override">
          <div className="signInText">Send reset link</div>
          <button className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>

        <Link className="forgotPasswordLink" to="/sign-in">
          Sign in instead
        </Link>
      </form>
    </div>
  )
}
export default ForgotPassword
