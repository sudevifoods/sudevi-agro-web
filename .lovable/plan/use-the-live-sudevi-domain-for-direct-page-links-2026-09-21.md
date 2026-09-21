# Use the live Sudevi domain for direct page links

## Changes
- Replace the temporary Lovable address in page metadata, structured data, image links, sitemap, and robots file with `https://www.sudevifoods.com`.
- Keep the existing clickable navigation links and `/recipes` page route.
- Confirm `https://www.sudevifoods.com/recipes` loads directly and internal page navigation still works.

## Technical detail
The site already uses browser routes for `/recipes` and the other pages. This update makes every public URL consistently reference the connected live domain; the hosting configuration must also return the app for direct requests to nested paths.
