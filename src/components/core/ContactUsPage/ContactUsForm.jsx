import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from "../../../data/countrycode.json"
import { apiConnector } from "../../../services/apiConnector"
import { contactusEndpoint } from "../../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
      setLoading(false)
    } catch (error) {
      console.error("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)}>
      {/* First and Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="form-control w-full lg:w-1/2">
          <label htmlFor="firstname" className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="input input-bordered w-full"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-xs text-error mt-1">Please enter your name.</span>
          )}
        </div>
        <div className="form-control w-full lg:w-1/2">
          <label htmlFor="lastname" className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="input input-bordered w-full"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email Address</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="input input-bordered w-full"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-xs text-error mt-1">Please enter your Email address.</span>
        )}
      </div>

      {/* Phone Number */}
      <div className="form-control">
        <label htmlFor="phonenumber" className="label">
          <span className="label-text">Phone Number</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="select select-bordered w-full sm:w-[120px]"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code}>
                {ele.code} - {ele.country}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="phonenumber"
            placeholder="12345 67890"
            className="input input-bordered w-full"
            {...register("phoneNo", {
              required: "Please enter your Phone Number.",
              maxLength: { value: 12, message: "Invalid Phone Number" },
              minLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className="text-xs text-error mt-1">{errors.phoneNo.message}</span>
        )}
      </div>

      {/* Message */}
      <div className="form-control">
        <label htmlFor="message" className="label">
          <span className="label-text">Message</span>
        </label>
        <textarea
          id="message"
          rows="6"
          placeholder="Enter your message here"
          className="textarea textarea-bordered"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-xs text-error mt-1">Please enter your Message.</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className="btn btn-primary w-full sm:w-fit disabled:btn-disabled"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
