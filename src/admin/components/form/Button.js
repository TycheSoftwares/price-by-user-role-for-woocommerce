import { Button as WPButton } from "@wordpress/components";

function Button({
    children,
    variant = "primary",
    isBusy = false,
    disabled = false,
    fullWidth = false,
    onClick,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <WPButton
            variant={variant}
            isBusy={isBusy}
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`pbur-button ${fullWidth ? "pbur-button-full" : ""} ${className}`}
            {...props}
        >
            {children}
        </WPButton>
    );
}

export default Button;
