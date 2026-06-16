import { __ } from "@wordpress/i18n";
import { Card, CardBody, __experimentalNumberControl as NumberControl } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { TEXT_DOMAIN } from "../../constants";
import { fetch as fetchSettings, save as saveSettings, reset as resetSettings } from "../../api/settings";
import { Checkbox, SaveBar } from "../../components/form";
import { toast } from "../../utils/toast";
import Skeleton from "./skeleton";


function MultipliersSettings() {
    const [settings, setSettings]     = useState(null);
    const [isLoading, setIsLoading]   = useState(true);
    const [isSaving, setIsSaving]     = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [notice, setNotice]         = useState(null);

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

    const updateMultiplier = (roleKey, field, value) => {
        setSettings((prev) => {
            const multipliers = (prev.multipliers && !Array.isArray(prev.multipliers))
                ? { ...prev.multipliers }
                : {};
            multipliers[roleKey] = { ...(multipliers[roleKey] || {}), [field]: value };
            return { ...prev, multipliers };
        });
        setHasChanges(true);
    };

    const handleSave = async () => {
        if (isSaving) return;
        setIsSaving(true);
        try {
            const response = await saveSettings({ section: "multipliers", ...settings });
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
            const response = await resetSettings("multipliers");
            setSettings(response?.settings || {});
            setHasChanges(false);
            setNotice({ status: "success", message: response?.message || __("Multipliers Settings have been reset to default.", TEXT_DOMAIN) });
        } catch (error) {
            setNotice({ status: "error", message: error || __("Failed to reset settings.", TEXT_DOMAIN) });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !settings) return <Skeleton />;

    const multipliers        = settings.multipliers || {};
    const multipliersEnabled = !!settings.multipliersEnabled;
    const availableRoles     = settings.availableRoles || [];

    return (
        <>
            <Card isRounded={false} className="pbur-card">
                <CardBody>
                    <div className="pbur-section-header">
                        <h3>{__("Roles & Multipliers Options", TEXT_DOMAIN)}</h3>
                        <p>{__("Set price multipliers for different user roles", TEXT_DOMAIN)}</p>
                    </div>

                    <div className="pbur-settings-rows">
                        <div className="pbur-settings-row">
                            <div className="pbur-settings-row-label">
                                <label>{__("Enable Multipliers", TEXT_DOMAIN)}</label>
                                <p>{__("Multiply all product prices by the multipliers set below", TEXT_DOMAIN)}</p>
                            </div>
                            <div className="pbur-settings-row-control">
                                <Checkbox
                                    checked={multipliersEnabled}
                                    onChange={(val) => update("multipliersEnabled", val)}
                                />
                            </div>
                        </div>

                        {multipliersEnabled && (
                            <div className="pbur-settings-row no-border">
                                <div className="pbur-settings-row-label">
                                    <label>{__("Apply to Shipping", TEXT_DOMAIN)}</label>
                                    <p>{__("Also apply multipliers to shipping costs", TEXT_DOMAIN)}</p>
                                </div>
                                <div className="pbur-settings-row-control">
                                    <Checkbox
                                        checked={!!settings.multipliersShipping}
                                        onChange={(val) => update("multipliersShipping", val)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {multipliersEnabled && (
                        <>
                            <div className="pbur-section-header pbur-section-header-sub">
                                <h3>{__("Role Multipliers", TEXT_DOMAIN)}</h3>
                                <p>{__("Set a price multiplier for each user role. A value of 1 means no change.", TEXT_DOMAIN)}</p>
                            </div>

                            <div className="pbur-settings-rows">
                                {availableRoles.map((role) => {
                                    const roleData   = (multipliers && multipliers[role.key]) || {};
                                    const value      = roleData.value      ?? 1;
                                    const emptyPrice = !!roleData.emptyPrice;

                                    return (
                                        <div key={role.key} className="pbur-settings-row">
                                            <div className="pbur-settings-row-label">
                                                <label>{role.name}</label>
                                            </div>
                                            <div className="pbur-settings-row-control" style={{ gap: "24px", alignItems: "center" }}>
                                                <span>
                                                    <label className="pbur-field-label">
                                                        {__("Multiplier", TEXT_DOMAIN)}
                                                    </label>
                                                    <NumberControl
                                                        className="pbur-number-control pbur-number-control-left"
                                                        value={value}
                                                        min={0}
                                                        step={0.000001}
                                                        disabled={emptyPrice}
                                                        onChange={(val) => updateMultiplier(role.key, "value", val)}
                                                    />
                                                </span>
                                                <span>
                                                    <Checkbox
                                                        label={__('Make "empty price"', TEXT_DOMAIN)}
                                                        checked={emptyPrice}
                                                        onChange={(val) => updateMultiplier(role.key, "emptyPrice", val)}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
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

export default MultipliersSettings;
