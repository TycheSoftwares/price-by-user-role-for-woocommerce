import { CheckboxControl } from "@wordpress/components";

function Checkbox({ label, checked, onChange, help, className = "", ...props }) {
    return (
        <CheckboxControl
            label={label}
            checked={checked}
            onChange={onChange}
            help={help}
            className={`pbur-checkbox ${className}`}
            {...props}
        />
    );
}

export default Checkbox;
