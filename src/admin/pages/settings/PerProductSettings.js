import { __ } from "@wordpress/i18n";
import { Card, CardBody, FormTokenField } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { TEXT_DOMAIN } from "../../constants";
import { fetch as fetchSettings, save as saveSettings, reset as resetSettings } from "../../api/settings";
import { Checkbox, SaveBar } from "../../components/form";
import { toast } from "../../utils/toast";
import Skeleton from "./skeleton";

function PerProductSettings() {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [notice, setNotice] = useState(null);

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
            const response = await saveSettings({ section: "per_product", ...settings });
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
            const response = await resetSettings("per_product");
            setSettings(response?.settings || {});
            setHasChanges(false);
            setNotice({ status: "success", message: response?.message || __("Per Product Settings have been reset to default.", TEXT_DOMAIN) });
        } catch (error) {
            setNotice({ status: "error", message: error || __("Failed to reset settings.", TEXT_DOMAIN) });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !settings) return <Skeleton />;

    const perProductEnabled = !!settings.perProductEnabled;
    const availableRoles    = settings.availableRoles || [];
    const selectedRoleNames = (settings.perProductRoles || [])
        .map((key) => availableRoles.find((r) => r.key === key)?.name)
        .filter(Boolean);

    const handleRoleChange = (tokens) => {
        const keys = tokens
            .map((name) => availableRoles.find((r) => r.name === name)?.key)
            .filter((key) => key !== undefined);
        update("perProductRoles", keys);
    };

    return (
        <>
            <Card isRounded={false} className="pbur-card">
                <CardBody>
                    <div className="pbur-section-header">
                        <h3>{__("Per Product Options", TEXT_DOMAIN)}</h3>
                        <p>{__("Configure per-product pricing settings", TEXT_DOMAIN)}</p>
                    </div>

                    <div className="pbur-settings-rows">
                        <div className="pbur-settings-row">
                            <div className="pbur-settings-row-label">
                                <label>{__("Enable Per Product", TEXT_DOMAIN)}</label>
                                <p>{__("When enabled, adds a Per Product Settings panel to each product's edit page", TEXT_DOMAIN)}</p>
                            </div>
                            <div className="pbur-settings-row-control">
                                <Checkbox
                                    checked={perProductEnabled}
                                    onChange={(val) => update("perProductEnabled", val)}
                                />
                            </div>
                        </div>

                        {perProductEnabled && (
                            <>
                                <div className="pbur-settings-row">
                                    <div className="pbur-settings-row-label">
                                        <label>{__("Roles with Per Product Pricing", TEXT_DOMAIN)}</label>
                                        <p>{__("Select which roles to show in the Per Product Settings panel. Leave blank to show all roles.", TEXT_DOMAIN)}</p>
                                    </div>
                                    <div className="pbur-settings-row-control">
                                        <FormTokenField
                                            value={selectedRoleNames}
                                            suggestions={availableRoles.map((r) => r.name)}
                                            onChange={handleRoleChange}
                                            placeholder={__("Add roles…", TEXT_DOMAIN)}
                                            className="pbur-token-field"
                                            label=""
                                            __experimentalShowHowTo={false}
                                            hideLabelFromVision={true}
                                        />
                                    </div>
                                </div>

                                <div className="pbur-settings-row no-border pbur-settings-row--pro-locked">
                                    <div className="pbur-settings-row-label">
                                        <label>{__("Show Multiple Role Prices", TEXT_DOMAIN)} <span className="pbur-pro-badge">{__("Pro", TEXT_DOMAIN)}</span></label>
                                        <p>{__("Display prices for multiple roles on the product page", TEXT_DOMAIN)}</p>
                                    </div>
                                    <div className="pbur-settings-row-control">
                                        <input type="checkbox" disabled />
                                    </div>
                                </div>
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

export default PerProductSettings;
