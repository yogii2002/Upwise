import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"
import Lottie from "lottie-react"

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, svg, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-base-100 text-base-content">
      {loading ? (
        <span className="loading loading-spinner loading-lg text-warning"></span>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-screen-xl flex-col-reverse items-center justify-between gap-12 py-12 md:flex-row">
          {/* Left Section: Form & Text */}
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-base-content">{title}</h1>
            <p className="mt-4 text-lg text-base-content/80">
              <span>{description1}</span>{" "}
              <span className="font-semibold italic text-primary">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          {/* Right Section: Animation */}
          <div className="relative w-full max-w-md">
            <Lottie
              animationData={svg}
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-[15rem] right-[4rem] z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
