import { SelectControl } from "@wordpress/components";

function Select({ label, value, options, onChange, help, className = "", ...props }) {
    return (
        <SelectControl
            label={label}
            value={value}
            options={options}
            onChange={onChange}
            help={help}
            className={`pbur-select-control ${className}`}
            {...props}
        />
    );
}

export default Select;
