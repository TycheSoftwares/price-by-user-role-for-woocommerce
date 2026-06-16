function Skeleton() {
    return (
        <div className="pbur-settings-skeleton">
            {[0, 1, 2].map((i) => (
                <div key={i} className="pbur-settings-skeleton-row">
                    <div className="pbur-skeleton-line" style={{ width: "160px" }} />
                    <div className="pbur-skeleton-line" style={{ width: "260px" }} />
                </div>
            ))}
        </div>
    );
}

export default Skeleton;
