import { __ } from "@wordpress/i18n";
import { NavLink } from "react-router-dom";

function SubNav({ links }) {
    return (
        <div className="pbur-sub-nav">
            {links.map((link, index) => (
                <span key={link.path} className="pbur-sub-nav-item">
                    {index > 0 && <span className="pbur-sub-nav-separator">|</span>}
                    <NavLink
                        to={link.path}
                        end
                        className={({ isActive }) => [
                            isActive ? "is-active" : "",
                            link.proOnly ? "pbur-sub-nav-pro-item" : "",
                        ].filter(Boolean).join(" ")}
                    >
                        {link.label}
                        {link.proOnly && <span className="pbur-pro-badge">{__("Pro", "price-by-user-role-for-woocommerce")}</span>}
                    </NavLink>
                </span>
            ))}
        </div>
    );
}

export default SubNav;
