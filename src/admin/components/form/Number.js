import { __experimentalNumberControl as NumberControl } from "@wordpress/components";

function Number({ label, value, onChange, min, max, step, placeholder, className = "", ...props }) {
    return (
        <NumberControl
            label={label}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            className={`pbur-number-control ${className}`}
            {...props}
        />
    );
}

export default Number;
