import { __ } from "@wordpress/i18n";
import { Card, CardBody, Button, Modal } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { TEXT_DOMAIN } from "../../constants";
import { fetch as fetchSettings, save as saveSettings, reset as resetSettings, resetTracking } from "../../api/settings";
import { Checkbox, SaveBar } from "../../components/form";
import { toast } from "../../utils/toast";
import Skeleton from "./skeleton";

function GeneralSettings() {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [notice, setNotice] = useState(null);
    const [isResettingTracking, setIsResettingTracking] = useState(false);
    const [showTrackingConfirm, setShowTrackingConfirm] = useState(false);

    useEffect(() => {
        let mounted = true;
        fetchSettings()
            .then((data) => { if (mounted) setSettings(data || {}); })
            .catch(() => toast.error(__("Failed to load settings", TEXT_DOMAIN)))
            .finally(() => { if (mounted) setIsLoading(false); });
        return () => { mounted = false; };
    }, []);

    const update = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        if (isSaving) return;
        setIsSaving(true);
        try {
            const response = await saveSettings({ section: "general", ...settings });
            setHasChanges(false);
            setNotice({ status: "success", message: response?.message || __("Settings saved.", TEXT_DOMAIN) });
        } catch (error) {
            setNotice({ status: "error", message: error || __("Failed to save settings.", TEXT_DOMAIN) });
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = async () => {
        setIsSaving(true);
        try {
            const response = await resetSettings("general");
            setSettings(response?.settings || {});
            setHasChanges(false);
            setNotice({ status: "success", message: response?.message || __("General Settings have been reset to default.", TEXT_DOMAIN) });
        } catch (error) {
            setNotice({ status: "error", message: error || __("Failed to reset settings.", TEXT_DOMAIN) });
        } finally {
            setIsSaving(false);
        }
    };

    const handleResetTracking = async () => {
        setShowTrackingConfirm(false);
        if (isResettingTracking) return;
        setIsResettingTracking(true);
        try {
            const response = await resetTracking();
            setSettings((prev) => ({ ...prev, trackingStatus: response?.trackingStatus ?? "" }));
            toast.success(response?.message || __("Plugin usage tracking has been reset.", TEXT_DOMAIN));
        } catch {
            toast.error(__("Failed to reset plugin usage tracking.", TEXT_DOMAIN));
        } finally {
            setIsResettingTracking(false);
        }
    };

    if (isLoading || !settings) return <Skeleton />;

    const pluginEnabled = !!settings.pluginEnabled;

    return (
        <>
            <Card isRounded={false} className="pbur-card">
                <CardBody>
                    <div className="pbur-section-header">
                        <h3>{__("General Options", TEXT_DOMAIN)}</h3>
                        <p>{__("Configure the basic settings for Product Prices by User Roles", TEXT_DOMAIN)}</p>
                    </div>

                    <div className="pbur-settings-rows">
                        <div className="pbur-settings-row">
                            <div className="pbur-settings-row-label">
                                <label>{__("Enable Plugin", TEXT_DOMAIN)}</label>
                                <p>{__("Product Prices by User Roles for WooCommerce", TEXT_DOMAIN)}</p>
                            </div>
                            <div className="pbur-settings-row-control">
                                <Checkbox
                                    checked={!!settings.pluginEnabled}
                                    onChange={(val) => update("pluginEnabled", val)}
                                />
                            </div>
                        </div>

                        {pluginEnabled && (
                            <>
                                <div className="pbur-settings-row">
                                    <div className="pbur-settings-row-label">
                                        <label>{__("Search Engine Bots", TEXT_DOMAIN)}</label>
                                        <p>{__("Disable for bots (search engines will see default prices)", TEXT_DOMAIN)}</p>
                                    </div>
                                    <div className="pbur-settings-row-control">
                                        <Checkbox
                                            checked={!!settings.disableForBots}
                                            onChange={(val) => update("disableForBots", val)}
                                        />
                                    </div>
                                </div>

                                <div className="pbur-settings-row pbur-settings-row--pro-locked">
                                    <div className="pbur-settings-row-label">
                                        <label>{__("Exclude Product Categories", TEXT_DOMAIN)} <span className="pbur-pro-badge">{__("Pro", TEXT_DOMAIN)}</span></label>
                                        <p>{__("Excluded categories only affect Per Product pricing and Multipliers. Pricing Rules will still apply based on their configured conditions", TEXT_DOMAIN)}</p>
                                    </div>
                                    <div className="pbur-settings-row-control">
                                        <input type="text" disabled />
                                    </div>
                                </div>

                                {process.env.PBUR_WC_BUILD !== 'true' && (
                                    <>
                                        <div className="pbur-settings-row no-border">
                                            <div className="pbur-settings-row-label">
                                                <label>{__("Reset Tracking", TEXT_DOMAIN)}</label>
                                                <p>{__("Clear the stored tracking consent so the opt-in notice is shown again on the next admin page load.", TEXT_DOMAIN)}</p>
                                            </div>
                                            <div className="pbur-settings-row-control">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => setShowTrackingConfirm(true)}
                                                    isBusy={isResettingTracking}
                                                    disabled={isResettingTracking || settings.trackingStatus === ""}
                                                >
                                                    {__("Reset", TEXT_DOMAIN)}
                                                </Button>
                                            </div>
                                        </div>

                                        {showTrackingConfirm && (
                                            <Modal
                                                title={__("Reset Plugin Usage Tracking", TEXT_DOMAIN)}
                                                onRequestClose={() => setShowTrackingConfirm(false)}
                                                size="small"
                                            >
                                                <p>{__("This will clear the stored tracking consent and show the opt-in notice again on the next admin page load. Are you sure?", TEXT_DOMAIN)}</p>
                                                <div className="pbur-modal-actions">
                                                    <Button variant="primary" onClick={handleResetTracking} isBusy={isResettingTracking}>
                                                        {__("Yes", TEXT_DOMAIN)}
                                                    </Button>
                                                    <Button variant="secondary" onClick={() => setShowTrackingConfirm(false)}>
                                                        {__("No", TEXT_DOMAIN)}
                                                    </Button>
                                                </div>
                                            </Modal>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </CardBody>
                <SaveBar
                    onSave={handleSave}
                    onReset={handleReset}
                    isSaving={isSaving}
                    hasChanges={hasChanges}
                    notice={notice}
                    setNotice={setNotice}
                />
            </Card>

        </>
    );
}

export default GeneralSettings;
