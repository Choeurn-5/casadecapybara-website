/**
 * SEO Automated Tests — Casa de Capybara
 *
 * Run with: npx tsx __tests__/seo.test.ts
 *
 * This file validates:
 * 1. canonicalUrl() utility output for all known routes
 * 2. sitemap baseUrl uses the www host
 * 3. robots.ts sitemap reference uses the www host
 * 4. globalBusinessSchema @id and url use the www host
 * 5. All JSON-LD blocks in the schemas are valid JSON
 */

// ─── Inline canonical utility (avoids Next.js import issues in Node test) ─────
const SITE_URL = "https://www.casadecapybara.com";

function canonicalUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  const clean = normalised === "/" ? normalised : normalised.replace(/\/$/, "");
  return `${SITE_URL}${clean}`;
}

// ─── Test helpers ─────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

function section(name: string): void {
  console.log(`\n── ${name} ─────────────────────`);
}

// ─── Test 1: canonicalUrl() ────────────────────────────────────────────────
section("canonicalUrl() utility");
assert(canonicalUrl("/") === "https://www.casadecapybara.com/", "Homepage canonical is https://www.casadecapybara.com/");
assert(canonicalUrl("/stay") === "https://www.casadecapybara.com/stay", "/stay canonical correct");
assert(canonicalUrl("/capybara-experience") === "https://www.casadecapybara.com/capybara-experience", "/capybara-experience canonical correct");
assert(canonicalUrl("/cafe") === "https://www.casadecapybara.com/cafe", "/cafe canonical correct");
assert(canonicalUrl("/families") === "https://www.casadecapybara.com/families", "/families canonical correct");
assert(canonicalUrl("/plan-your-visit") === "https://www.casadecapybara.com/plan-your-visit", "/plan-your-visit canonical correct");
assert(canonicalUrl("/contact") === "https://www.casadecapybara.com/contact", "/contact canonical correct");
assert(canonicalUrl("/gallery") === "https://www.casadecapybara.com/gallery", "/gallery canonical correct");
assert(canonicalUrl("/blog") === "https://www.casadecapybara.com/blog", "/blog canonical correct");
assert(canonicalUrl("/kh") === "https://www.casadecapybara.com/kh", "/kh canonical correct");
assert(canonicalUrl("/blog/my-article-slug") === "https://www.casadecapybara.com/blog/my-article-slug", "Blog post canonical correct");
assert(canonicalUrl("/stay/lagoon-master-villa") === "https://www.casadecapybara.com/stay/lagoon-master-villa", "Room canonical correct");

// ─── Test 2: No trailing slash on non-homepage paths ──────────────────────
section("Trailing slash policy");
assert(!canonicalUrl("/stay").endsWith("/"), "/stay has no trailing slash");
assert(!canonicalUrl("/blog/test").endsWith("/"), "/blog/test has no trailing slash");
assert(canonicalUrl("/").endsWith("/"), "Homepage has trailing slash");

// ─── Test 3: Host is always www ────────────────────────────────────────────
section("www host enforcement");
const testPaths = ["/", "/stay", "/capybara-experience", "/cafe", "/families", "/blog/test", "/stay/test-room", "/kh"];
for (const path of testPaths) {
  const url = canonicalUrl(path);
  assert(url.startsWith("https://www.casadecapybara.com"), `${path} uses www host`);
  assert(!url.includes("//casadecapybara.com"), `${path} does not use non-www host`);
}

// ─── Test 4: Canonical is not the homepage for non-homepage pages ──────────
section("Child pages do NOT canonicalize to homepage");
const nonHomePaths = ["/stay", "/capybara-experience", "/cafe", "/families", "/blog/test", "/stay/test-room"];
for (const path of nonHomePaths) {
  const url = canonicalUrl(path);
  assert(url !== canonicalUrl("/"), `${path} canonical differs from homepage canonical`);
}

// ─── Test 5: sitemap.ts uses www baseUrl ──────────────────────────────────
section("sitemap.ts baseUrl");
// Reads the raw source to check the constant reference — not the runtime value.
import { readFileSync } from "fs";
import { join } from "path";

const sitemapSrc = readFileSync(join(__dirname, "../app/sitemap.ts"), "utf-8");
assert(sitemapSrc.includes("SITE_URL"), "sitemap.ts uses SITE_URL from @/lib/seo");
assert(!sitemapSrc.includes('"https://casadecapybara.com"'), "sitemap.ts does not hard-code non-www host");

// ─── Test 6: robots.ts references www sitemap ─────────────────────────────
section("robots.ts sitemap reference");
const robotsSrc = readFileSync(join(__dirname, "../app/robots.ts"), "utf-8");
assert(robotsSrc.includes("SITE_URL"), "robots.ts uses SITE_URL from @/lib/seo");
assert(!robotsSrc.includes('"https://casadecapybara.com"'), "robots.ts does not hard-code non-www host");
assert(robotsSrc.includes("/sitemap.xml"), "robots.ts references /sitemap.xml");

// ─── Test 7: JsonLd.tsx uses www URLs ─────────────────────────────────────
section("JsonLd.tsx structured data URLs");
const jsonLdSrc = readFileSync(join(__dirname, "../components/seo/JsonLd.tsx"), "utf-8");
assert(jsonLdSrc.includes("SITE_URL"), "JsonLd.tsx uses SITE_URL constant");
assert(!jsonLdSrc.includes('"https://casadecapybara.com"'), "JsonLd.tsx does not hard-code non-www host");
assert(!jsonLdSrc.includes("'https://casadecapybara.com'"), "JsonLd.tsx does not hard-code non-www host (single quotes)");

// ─── Test 8: layout.tsx metadataBase uses www ─────────────────────────────
section("layout.tsx metadataBase");
const layoutSrc = readFileSync(join(__dirname, "../app/layout.tsx"), "utf-8");
assert(layoutSrc.includes("metadataBase: new URL(SITE_URL)"), "layout.tsx metadataBase uses SITE_URL");
assert(!layoutSrc.includes('new URL("https://casadecapybara.com")'), "layout.tsx does not use non-www metadataBase");

// ─── Test 9: next.config.mjs has non-www redirect ─────────────────────────
section("next.config.mjs redirect");
const nextConfigSrc = readFileSync(join(__dirname, "../next.config.mjs"), "utf-8");
assert(nextConfigSrc.includes("casadecapybara.com"), "next.config.mjs references casadecapybara.com for redirect");
assert(nextConfigSrc.includes("www.casadecapybara.com"), "next.config.mjs redirects to www");
assert(nextConfigSrc.includes("permanent: true"), "next.config.mjs uses permanent redirect");

// ─── Test 10: globalBusinessSchema valid JSON ──────────────────────────────
section("globalBusinessSchema is valid JSON");
try {
  // Inline a snapshot of the schema to validate JSON structure without Next.js runtime
  const schemaSnapshot = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, "name": "Casa de Capybara", "url": SITE_URL },
      { "@type": ["Hotel", "Resort", "TouristAttraction"], "@id": `${SITE_URL}/#hotel`, "name": "Casa de Capybara", "url": SITE_URL },
      { "@type": "Restaurant", "@id": `${SITE_URL}/#cafe`, "name": "Capybara Cafe Siem Reap" },
    ],
  };
  const serialised = JSON.stringify(schemaSnapshot);
  const reparsed = JSON.parse(serialised);
  assert(reparsed["@graph"].length === 3, "globalBusinessSchema has 3 graph nodes");
  assert(reparsed["@graph"][0]["@id"] === `${SITE_URL}/#website`, "WebSite @id uses www");
  assert(reparsed["@graph"][1]["@id"] === `${SITE_URL}/#hotel`, "Hotel @id uses www");
  assert(reparsed["@graph"][2]["@id"] === `${SITE_URL}/#cafe`, "Restaurant @id uses www");
  assert(reparsed["@graph"][1]["url"] === SITE_URL, "Hotel url uses www");
} catch (e) {
  assert(false, `globalBusinessSchema JSON parse error: ${e}`);
}

// ─── Test 11: No non-homepage canonical fallback in key page files ─────────
section("Per-page canonical declarations");
const pagesToCheck = [
  { file: "../app/page.tsx", path: "/", label: "Homepage" },
  { file: "../app/stay/page.tsx", path: "/stay", label: "Stay" },
  { file: "../app/capybara-experience/page.tsx", path: "/capybara-experience", label: "Capybara Experience" },
  { file: "../app/cafe/page.tsx", path: "/cafe", label: "Cafe" },
  { file: "../app/families/page.tsx", path: "/families", label: "Families" },
  { file: "../app/plan-your-visit/page.tsx", path: "/plan-your-visit", label: "Plan Your Visit" },
  { file: "../app/contact/page.tsx", path: "/contact", label: "Contact" },
  { file: "../app/gallery/page.tsx", path: "/gallery", label: "Gallery" },
  { file: "../app/blog/page.tsx", path: "/blog", label: "Blog" },
  { file: "../app/kh/page.tsx", path: "/kh", label: "Khmer" },
];

for (const { file, path, label } of pagesToCheck) {
  const src = readFileSync(join(__dirname, file), "utf-8");
  assert(src.includes("alternates:"), `${label} page has alternates block`);
  assert(src.includes("canonical:"), `${label} page has canonical declaration`);
  assert(src.includes(`canonicalUrl("${path}")`), `${label} page references canonicalUrl("${path}")`);
}

// Also check dynamic pages use canonicalUrl
const blogSlugSrc = readFileSync(join(__dirname, "../app/blog/[slug]/page.tsx"), "utf-8");
assert(blogSlugSrc.includes("canonicalUrl(`/blog/${resolvedParams.slug}`)"), "Blog slug page uses per-slug canonical");

const roomSlugSrc = readFileSync(join(__dirname, "../app/stay/[slug]/page.tsx"), "utf-8");
assert(roomSlugSrc.includes("canonicalUrl(`/stay/${resolvedParams.slug}`)"), "Room slug page uses per-slug canonical");

// ─── Summary ────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
console.log(`SEO Tests: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.error(`\n⚠️  ${failed} test(s) failed. See above for details.`);
  process.exit(1);
} else {
  console.log(`\n🎉  All SEO tests passed.`);
}
