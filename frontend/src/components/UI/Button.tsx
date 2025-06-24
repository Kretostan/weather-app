import React from "react";

type ButtonProps = {
    children: React.ReactNode,
    type?: "submit" | "reset" | "button" | undefined,
    onClick?: () => void
}

const Button = ({ children, type = "button", onClick }: ButtonProps) => {
    return <button type={type} onClick={onClick} className="px-3 py-1 bg-[#0078d4] text-white rounded-md">
        {children}
    </button>
}

export default Button;