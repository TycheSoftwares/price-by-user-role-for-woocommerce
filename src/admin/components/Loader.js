import { Spinner } from "@wordpress/components";
import { useData } from "../data/context";

function Loader() {
    const { showLoader } = useData();

    if (!showLoader) {
        return null;
    }

    return (
        <div className="pbur-loading-overlay">
            <Spinner />
        </div>
    );
}

export default Loader;
