
import Template from "../components/core/Auth/Template"

import Login_Svg from "../assets/svgs/login.json"
function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      svg={Login_Svg}
      formType="login"
    />
  )
}

export default Login
