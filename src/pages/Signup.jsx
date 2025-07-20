import Signup_Svg from '../assets/svgs/signup.json'
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions learning to code with Upwise for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      svg={Signup_Svg}
      formType="signup"
    />
  )
}

export default Signup
