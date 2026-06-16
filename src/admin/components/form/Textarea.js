import { TextareaControl } from "@wordpress/components";

function Textarea({ label, value, onChange, placeholder, help, rows, className = "", ...props }) {
    return (
        <TextareaControl
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            help={help}
            rows={rows}
            className={`pbur-textarea-control ${className}`}
            {...props}
        />
    );
}

export default Textarea;
