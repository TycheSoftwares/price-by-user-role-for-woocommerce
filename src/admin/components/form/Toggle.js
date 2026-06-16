import { ToggleControl } from "@wordpress/components";

function Toggle({ label, checked, onChange, help, className = "", ...props }) {
    return (
        <ToggleControl
            label={label}
            checked={checked}
            onChange={onChange}
            help={help}
            className={`pbur-toggle-control ${className}`}
            {...props}
        />
    );
}

export default Toggle;
