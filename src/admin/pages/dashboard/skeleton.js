function Skeleton() {
    return (
        <div className="pbur-dashboard-skeleton">
            <div className="pbur-skeleton-card">
                <div className="pbur-skeleton-title pbur-skeleton-line" />
                <div className="pbur-skeleton-progress" />
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="pbur-skeleton-check-row">
                        <div className="pbur-skeleton-box" />
                        <div className="pbur-skeleton-line pbur-skeleton-text" />
                    </div>
                ))}
            </div>
            <div className="pbur-skeleton-card">
                <div className="pbur-skeleton-title pbur-skeleton-line" />
                <div className="pbur-dashboard-summary-grid">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="pbur-skeleton-summary-tile" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Skeleton;
