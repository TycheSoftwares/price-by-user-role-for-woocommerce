import { __ } from "@wordpress/i18n";
import { __experimentalConfirmDialog as ConfirmDialog } from "@wordpress/components";
import { useState } from "@wordpress/element";
import Button from "./Button";
import Notice from "../Notice";

function SaveBar({ onSave, onReset, onCancel, cancelLabel, isSaving = false, hasChanges, notice, setNotice }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleResetClick = () => setConfirmOpen(true);

    const handleConfirm = () => {
        setConfirmOpen(false);
        onReset();
    };

    const handleCancel = () => setConfirmOpen(false);

    return (
        <div className="pbur-save-bar">
            <Button variant="primary" onClick={onSave} isBusy={isSaving} disabled={!hasChanges}>
                {__("Save Changes", "price-by-user-role-for-woocommerce")}
            </Button>
            {onCancel && (
                <Button variant="secondary" onClick={onCancel} disabled={isSaving}>
                    {cancelLabel || __("Cancel", "price-by-user-role-for-woocommerce")}
                </Button>
            )}
            {onReset && (
                <>
                    <Button variant="secondary" className="pbur-button-reset" onClick={handleResetClick} disabled={isSaving}>
                        {__("Reset Settings", "price-by-user-role-for-woocommerce")}
                    </Button>
                    <ConfirmDialog
                        isOpen={confirmOpen}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        confirmButtonText={__("Yes, I want to", "price-by-user-role-for-woocommerce")}
                        cancelButtonText={__("No, cancel", "price-by-user-role-for-woocommerce")}
                    >
                        {__("Are you sure you want to reset this section to default settings? This cannot be undone.", "price-by-user-role-for-woocommerce")}
                    </ConfirmDialog>
                </>
            )}
            {notice && <Notice {...notice} onRemove={() => setNotice(null)} />}
        </div>
    );
}

export default SaveBar;
