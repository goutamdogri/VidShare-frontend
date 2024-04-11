import propTypes from 'prop-types'

export default function Button({
    children,
    type= "button",
    bgColor= "bg-[#ae7aff]",
    textColor= "text-black",
    className="",
    ...props
}) {
    return (
        <button
        type={type}
        className={`${bgColor} ${textColor} ${className}`}
        {...props}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: propTypes.node,
    type: propTypes.string,
    bgColor: propTypes.string,
    textColor: propTypes.string,
    className: propTypes.string
}