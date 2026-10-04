// The legacy downloader discarded original-file URLs and license metadata.
// Disable that unsafe publication path; a reviewed manifest must precede imports.
console.error("Portrait import requires a reviewed source/author/license/attribution manifest. See docs/portrait-audit.json.");
process.exitCode = 1;
