import { Notice } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";
import { useEffect } from "@wordpress/element";

function Toast() {
    const notices = useSelect((select) => select(noticesStore).getNotices("pbur"), []);

    const { removeNotice } = useDispatch(noticesStore);

    // Auto-dismiss after 20 seconds
    useEffect(() => {
        if (!notices.length) return;

        const timers = notices.map((notice) =>
            setTimeout(() => {
                removeNotice(notice.id, "pbur");
            }, 20000)
        );

        return () => timers.forEach(clearTimeout);
    }, [notices]);

    if (!notices.length) return null;

    return (
        <div className="pbur-toast">
            {notices.map((notice) => (
                <Notice
                    key={notice.id}
                    status={notice.status}
                    isDismissible={true}
                    onRemove={() => removeNotice(notice.id, "pbur")}
                    className="pbur-toast-notice"
                >
                    {notice.content}
                </Notice>
            ))}
        </div>
    );
}

export default Toast;
