import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat with us",
    description: "Our friendly team is here to help.",
    details: "info@upwise.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Rammurthy Nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-base-200 p-4 lg:p-6">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele?.icon] || Icon2[ele?.icon] || Icon3[ele?.icon]
        return (
          <div
            className="flex flex-col gap-[2px] p-3 text-base-content"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} className="text-primary" />
              <h1 className="text-lg font-bold">{ele?.heading}</h1>
            </div>
            <p className="text-sm opacity-80">{ele?.description}</p>
            <p className="text-sm font-semibold">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails
