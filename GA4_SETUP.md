# GA4 Setup for Mental Clinic Landing

This project is now instrumented to send GA4 events from the frontend.

For production deployment, environment variables, and Netlify setup, see [DEPLOY.md](./DEPLOY.md).

## 1) Create/select a Google Cloud project

```bash
export PROJECT_ID="opora-mental-analytics"
export PROJECT_NAME="Opora Mental Analytics"
export BILLING_ACCOUNT_ID="YOUR_BILLING_ACCOUNT_ID"

gcloud projects create "${PROJECT_ID}" --name="${PROJECT_NAME}"
gcloud config set project "${PROJECT_ID}"
gcloud beta billing projects link "${PROJECT_ID}" --billing-account="${BILLING_ACCOUNT_ID}"
```

If the project already exists:

```bash
gcloud config set project "${PROJECT_ID}"
```

## 2) Enable required APIs

```bash
gcloud services enable analyticsadmin.googleapis.com analyticsdata.googleapis.com
```

## 3) Authenticate with Analytics scopes

```bash
gcloud auth login --update-adc --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/analytics.edit,https://www.googleapis.com/auth/analytics.readonly"
ACCESS_TOKEN="$(gcloud auth print-access-token)"
```

## 4) Create GA4 account, property, and web data stream

Set deployment URL and naming:

```bash
export APP_URL="https://YOUR_DOMAIN"
export GA_ACCOUNT_NAME="Opora Mental Clinic"
export GA_PROPERTY_NAME="Opora Landing"
export GA_STREAM_NAME="Opora Landing Web"
```

Create account:

```bash
curl -sS -X POST "https://analyticsadmin.googleapis.com/v1beta/accounts" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"displayName\": \"${GA_ACCOUNT_NAME}\",
    \"regionCode\": \"UA\"
  }"
```

From the response, copy the account resource name, for example `accounts/123456789`.

```bash
export GA_ACCOUNT_RESOURCE="accounts/123456789"
```

Create property:

```bash
curl -sS -X POST "https://analyticsadmin.googleapis.com/v1beta/properties" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"parent\": \"${GA_ACCOUNT_RESOURCE}\",
    \"displayName\": \"${GA_PROPERTY_NAME}\",
    \"industryCategory\": \"HEALTHCARE\",
    \"timeZone\": \"Europe/Kyiv\",
    \"currencyCode\": \"UAH\"
  }"
```

From the response, copy property resource name, for example `properties/987654321`.

```bash
export GA_PROPERTY_RESOURCE="properties/987654321"
```

Create web stream:

```bash
curl -sS -X POST "https://analyticsadmin.googleapis.com/v1beta/${GA_PROPERTY_RESOURCE}/dataStreams" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"displayName\": \"${GA_STREAM_NAME}\",
    \"type\": \"WEB_DATA_STREAM\",
    \"webStreamData\": {
      \"defaultUri\": \"${APP_URL}\"
    }
  }"
```

Copy `measurementId` from `webStreamData.measurementId` (format: `G-XXXXXXXXXX`).

## 5) Wire this repository to the new GA4 stream

Create `.env` in the repository root:

```bash
cp .env.example .env
```

Set:

```bash
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GA4_DEBUG=true
VITE_ANALYTICS_GA4_ENABLED=true
VITE_ANALYTICS_META_ENABLED=true
VITE_ANALYTICS_HOTJAR_ENABLED=false
VITE_ANALYTICS_DEBUG=false
```

For production, set `VITE_GA4_DEBUG=false`.

## 6) Register custom dimensions (recommended)

Create event-scoped dimensions for these parameters in GA4 Admin:

- `stage`
- `question_id`
- `question_number`
- `answer_index`
- `form_name`
- `variant`
- `contact_type`
- `interest`
- `age_bucket`
- `family_history`

You can create them via UI (Admin -> Custom definitions) or Admin API endpoint:
`POST https://analyticsadmin.googleapis.com/v1beta/{parent=properties/*}/customDimensions`.

## 7) Events tracked by this app

- `landing_page_visit` and GA4 automatic `page_view`
- `app_stage_viewed` (hero, quiz, result, lead, readiness, clinic)
- `cta_click` (placement: hero, mid, lower, floating)
- `test_started`
- `question_1_answered` ... `question_5_answered`
- `question_answered`
- `test_dropoff`
- `test_completed`
- `result_shown`
- `result_continue_clicked`
- `form_started`
- `lead_submitted`
- `lead_submission_failed`
- `temperature_selected`
- `clinic_form_started`
- `clinic_form_step_completed`
- `clinic_lead_submitted`
- `clinic_lead_submission_failed`

## 8) Verify tracking

Run locally:

```bash
npm install
npm run dev
```

Then open GA4:

- Realtime report for incoming users/events
- DebugView (with `VITE_GA4_DEBUG=true`) to validate each event and parameter

## Privacy and compliance

Do not send personal identifiers (name, phone, email, free text health notes) to GA4.
This implementation tracks form/survey interactions using non-PII categories and booleans.
