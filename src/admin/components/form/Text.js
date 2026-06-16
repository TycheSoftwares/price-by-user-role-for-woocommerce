import { TextControl } from "@wordpress/components";

function Text({ label, value, onChange, placeholder, help, className = "", ...props }) {
    return (
        <TextControl
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            help={help}
            className={`pbur-text-control ${className}`}
            {...props}
        />
    );
}

export default Text;
