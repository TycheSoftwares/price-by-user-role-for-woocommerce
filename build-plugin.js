const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");
const { minify } = require("terser");
const postcss = require("postcss");
const cssnano = require("cssnano");

const PLUGIN_SLUG = "price-by-user-role-for-woocommerce";
const pluginHeader = fs.readFileSync(`${PLUGIN_SLUG}.php`, "utf8");
const versionMatch = pluginHeader.match(/^\s*\*\s*Version:\s*(.+)$/m);
if (!versionMatch) throw new Error(`❌ Could not read Version from ${PLUGIN_SLUG}.php`);
const version = versionMatch[1].trim();

const DEST = path.join("dist", PLUGIN_SLUG);
const ZIP_PATH = path.join("dist", `${PLUGIN_SLUG}.${version}.zip`);

const INCLUDE = [
    "build",
    "languages",
    "includes",
    "assets",
    `${PLUGIN_SLUG}.php`,
    "index.php",
    "uninstall.php",
    "readme.txt",
    "changelog.txt",
];

const JS_FILES = [
    "assets/js/tyche.js",
    "assets/js/dismiss-tracking-notice.js",
    "assets/js/plugin-deactivation.js",
];

const CSS_FILES = ["assets/css/admin.css"];

if (!fs.existsSync("build")) {
    throw new Error("❌ Missing /build. Run npm run build first.");
}

fs.removeSync("dist");
fs.mkdirpSync(DEST);

console.log("\nPackaging plugin…");

INCLUDE.forEach((item) => {
    const src = path.resolve(item);
    const dest = path.join(DEST, item);
    if (fs.existsSync(src)) {
        fs.copySync(src, dest);
    } else {
        console.warn(`  ⚠  Skipped missing: ${item}`);
    }
});

const minifyJs = JS_FILES.map(async (file) => {
    const dest = path.join(DEST, file);
    if (!fs.existsSync(dest)) return;
    const code = fs.readFileSync(dest, "utf8");
    const result = await minify(code, { compress: true, mangle: true });
    fs.writeFileSync(dest.replace(/\.js$/, ".min.js"), result.code, "utf8");
    console.log(`  ✓ Minified ${file}`);
});

const minifyCss = CSS_FILES.map(async (file) => {
    const dest = path.join(DEST, file);
    if (!fs.existsSync(dest)) return;
    const code = fs.readFileSync(dest, "utf8");
    const result = await postcss([cssnano({ preset: "default" })]).process(code, { from: dest });
    fs.writeFileSync(dest.replace(/\.css$/, ".min.css"), result.css, "utf8");
    console.log(`  ✓ Minified ${file}`);
});

Promise.all([...minifyJs, ...minifyCss]).then(() => {
    const output = fs.createWriteStream(ZIP_PATH);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(DEST, PLUGIN_SLUG);
    archive.finalize();

    output.on("close", () => {
        const kb = Math.round(archive.pointer() / 1024);
        console.log(`  ✓ ZIP created: ${ZIP_PATH} (${kb} KB)\n`);
    });
});
