export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-warning bg-transparent" : "bg-warning"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-base-content ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={outline ? "text-warning" : ""}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
