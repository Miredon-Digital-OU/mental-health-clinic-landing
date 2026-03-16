| Metric / question | Already tracked? | Stored where | Viewed in | Needs to be added |
| --- | --- | --- | --- | --- |
| Landing visit | Yes | GA4/Meta event `landing_page_visit` | GA4 Realtime / Events | Keep GA4 custom dimensions for UTM fields |
| CTA click by placement | Yes | Event `cta_click` with `placement` | GA4 event params | Optional dashboard breakdown by placement |
| Test started | Yes | Event `test_started` | GA4 funnel exploration | None |
| Question answered | Yes | Events `question_answered` + `question_n_answered` | GA4 custom reports | Add custom dimension for `completion_percent` if needed |
| Drop-off step | Yes | Event `test_dropoff` with `step` and `question_id` | GA4 event breakdown | Add explicit BigQuery export if long-term cohort analysis required |
| Test completion | Yes | Event `test_completed` | GA4 conversions/funnels | None |
| Result continue click | Yes | Event `result_continue_clicked` | GA4 event detail | None |
| Lead form start | Yes | Event `form_started` | GA4 event detail | None |
| Final lead submission | Yes | Event `lead_submitted`; server submission in Netlify Blobs | GA4 + Blob store | Build BI dashboard for conversion rate by campaign |
| Submission failure rate | Yes | Event `lead_submission_failed` | GA4 event detail | Alerting for sustained error spikes |
| Structured answer set | Yes | `answerSet` in Netlify Blobs payload | Blob export / downstream BI | Add scheduled export to warehouse if needed |
| Campaign attribution | Yes | `metadata.attribution`, `campaignId` in submission + UTM in events | GA4 + Blob store | Ensure all media links include UTMs |
| Device split | Partial | GA4 default dimensions; user agent in submission metadata | GA4 device reports | Optional normalized device field in backend export |
