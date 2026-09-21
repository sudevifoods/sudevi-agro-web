# Fix failing SEO findings

## Changes
- Replace the generic Lovable social image and account tag with a branded, share-sized Sudevi image and accurate fallback metadata.
- Add unique social titles, descriptions, URLs, and canonical links to About, Careers, Partners, and Privacy.
- Add valid Product/ItemList structured data from active catalog entries and JobPosting structured data from active openings.
- Create a sitemap containing all public pages, regenerate it before preview/build, and reference it from robots.txt.
- Connect Google Search Console, verify the published Lovable site, then submit its sitemap after the source changes are live.

## Validation
- Check the generated sitemap and metadata output.
- Verify the Products and Careers pages render valid JSON-LD from live data.
- Run the SEO scan again and update only findings fully corrected.

## Technical details
- Public SEO URLs will use `https://sudevi-agro-web.lovable.app`, matching the scanner's project domain.
- Admin, sign-in, and missing-page routes will remain outside the sitemap.
- Sitemap entries will omit `lastmod` because the app has no authoritative page-specific update timestamps.
- Google Search Console setup requires the Google authorization card and one publish approval after the verification tag is added.
