import { createContext, useContext, useState, useEffect } from "@wordpress/element";
import { usePburData } from "./hooks";

const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

const DataProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const { data: pburData, hasResolved } = usePburData();

    useEffect(() => {
        if (!hasResolved) {
            return;
        }

        if (pburData?.data) {
            setData(pburData.data);
        }

        setIsDataLoaded(true);
        setShowLoader(false);
    }, [hasResolved]);

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                showLoader,
                setShowLoader,
                isDataLoaded,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
