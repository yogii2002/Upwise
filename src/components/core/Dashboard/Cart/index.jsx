import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  const { paymentLoading } = useSelector((state) => state.course)

  if (paymentLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-base-content">Cart</h1>
      <p className="border-b border-base-300 pb-2 font-semibold text-base-content/60">
        {totalItems} Courses in Cart
      </p>

      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-base-content/40">
          Your cart is empty
        </p>
      )}
    </>
  )
}
