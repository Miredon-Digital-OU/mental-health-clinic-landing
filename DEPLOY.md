# Deployment Guide: OPORA Mental Health Clinic Landing

This document covers deployment to Netlify, required environment variables, and operational procedures.

## Prerequisites

- GitHub repository connected to Netlify
- Netlify account with Blobs enabled (for lead storage)

## Environment Variables

Configure these in **Netlify Dashboard → Site settings → Environment variables** (or via `netlify env:set`).

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GA4_MEASUREMENT_ID` | GA4 Measurement ID (format `G-XXXXXXXXXX`) | `G-ABC123XYZ` |

### Optional Analytics

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_ANALYTICS_GA4_ENABLED` | Enable Google Analytics 4 | `true` |
| `VITE_ANALYTICS_META_ENABLED` | Enable Meta Pixel | `true` |
| `VITE_ANALYTICS_HOTJAR_ENABLED` | Enable Hotjar | `false` |
| `VITE_META_PIXEL_ID` | Meta Pixel ID (required if Meta enabled) | — |
| `VITE_HOTJAR_ID` | Hotjar site ID (required if Hotjar enabled) | — |
| `VITE_ANALYTICS_DEBUG` | Log analytics events to console | `false` |

### Build-time Notes

- All `VITE_*` variables are embedded at build time. Changes require a new deploy.
- Set variables for Production, and optionally for Branch deploys or Preview deploys.

## Deployment Steps

### 1. Connect Repository

1. In Netlify: **Add new site → Import an existing project**
2. Connect your GitHub account and select this repository
3. Build settings (usually auto-detected):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`

### 2. Configure Environment Variables

Add the variables listed above. At minimum, set `VITE_GA4_MEASUREMENT_ID` for analytics.

### 3. Deploy

- **Automatic:** Pushes to `main` trigger deploys via GitHub Actions (see `.github/workflows/deploy.yml`)
- **Manual:** `netlify deploy --prod` (requires Netlify CLI and `netlify link`)

### 4. Post-Deploy Checks

- [ ] Cookie consent banner appears and blocks analytics until accepted
- [ ] Lead form submits successfully (check Netlify Blobs or function logs)
- [ ] GA4 receives events after consent (Realtime report)
- [ ] `/robots.txt` and `/sitemap.xml` are accessible
- [ ] Direct URLs (e.g. `/privacy` via hash) work with SPA redirect

## Netlify Blobs

Lead submissions are stored in the `lead-submissions` store. Each blob key is `{timestamp}-{submissionId}.json`.

- **Access:** Netlify Dashboard → Blobs, or via Netlify API
- **Retention:** See [Data Retention and Erasure](#data-retention-and-erasure) below

## Data Retention and Erasure

### Retention Policy

- **Lead submissions** (Netlify Blobs): Stored for the duration needed to provide services and fulfill contractual obligations.
- **Analytics data** (GA4, Meta, Hotjar): Governed by each provider’s retention settings. Configure in their respective dashboards.

### Handling Deletion Requests

When a user requests access, correction, or deletion of their data:

1. **Identify the record:** Use email, phone, or name + submission date to locate the blob.
2. **Export (if requested):** Retrieve the blob JSON for the user.
3. **Delete:** Remove the blob from the `lead-submissions` store via Netlify Blobs API or dashboard.
4. **Confirm:** Notify the user that the request has been completed.

### Manual Deletion via Netlify

1. Netlify Dashboard → Blobs → `lead-submissions`
2. Locate the blob by key (e.g. `1730000000000-uuid.json`)
3. Delete the blob

### Automated Deletion (Future)

Consider a scheduled function or admin endpoint to purge submissions older than a defined retention period (e.g. 2 years). Document the retention window in the Privacy Policy.

## Related Documentation

- [GA4_SETUP.md](./GA4_SETUP.md) — GA4 property creation and event mapping
- [AGENTS.md](./AGENTS.md) — Repository guidelines and commands
