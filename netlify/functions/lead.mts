import { getStore } from "@netlify/blobs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UA_PHONE_REGEX = /^(\+380|380|0)\d{9}$/;

const ALLOWED_FORM_TYPES = new Set(["lead-capture", "clinic-intake"]);
const ALLOWED_ENTRY_PLACEMENTS = new Set(["hero", "mid", "lower", "floating"]);
const ALLOWED_INTERESTS = new Set([
  "psychology",
  "psychiatry",
  "neurofeedback",
  "vr",
  "genetics",
  "complex",
  "other",
]);
const ALLOWED_FAMILY_HISTORY = new Set(["no", "yes", "unknown"]);
const ALLOWED_QUIZ_KEYS = new Set([
  "pain",
  "experience",
  "psychiatrist",
  "methods",
  "pricing",
]);

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const cleanText = (value: unknown, maxLength: number): string => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, maxLength);
};

const isEmail = (value: string): boolean => EMAIL_REGEX.test(value);
const isValidUAPhone = (value: string): boolean => {
  const cleaned = value.replace(/[\s\-()]/g, "");
  return UA_PHONE_REGEX.test(cleaned);
};

const parseAge = (value: unknown): number | null => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 120) {
    return null;
  }
  return Math.floor(parsed);
};

const sanitizeQuizAnswers = (value: unknown): Record<string, string> => {
  if (!value || typeof value !== "object") {
    return {};
  }

  const source = value as Record<string, unknown>;
  const answers: Record<string, string> = {};

  for (const [key, rawValue] of Object.entries(source)) {
    if (!ALLOWED_QUIZ_KEYS.has(key)) {
      continue;
    }

    const cleaned = cleanText(rawValue, 240);
    if (cleaned) {
      answers[key] = cleaned;
    }
  }

  return answers;
};

const sanitizeAttribution = (value: unknown) => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const source = value as Record<string, unknown>;

  const attribution = {
    landingPath: cleanText(source.landingPath, 500),
    referrer: cleanText(source.referrer, 500),
    utmSource: cleanText(source.utmSource, 120),
    utmMedium: cleanText(source.utmMedium, 120),
    utmCampaign: cleanText(source.utmCampaign, 120),
    utmTerm: cleanText(source.utmTerm, 120),
    utmContent: cleanText(source.utmContent, 120),
    gclid: cleanText(source.gclid, 120),
    fbclid: cleanText(source.fbclid, 120),
    msclkid: cleanText(source.msclkid, 120),
    firstSeenAt: cleanText(source.firstSeenAt, 60),
  };

  const hasAnyValue = Object.values(attribution).some(Boolean);
  return hasAnyValue ? attribution : undefined;
};

export default async (request: Request, context: any) => {
  if (request.method !== "POST") {
    return json(405, { error: "Method Not Allowed" });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const honeypot = cleanText(payload?.website, 200);
  if (honeypot) {
    return json(400, { error: "Spam detected" });
  }

  const formType = cleanText(payload?.formType, 40);
  if (!ALLOWED_FORM_TYPES.has(formType)) {
    return json(400, { error: "Invalid form type" });
  }

  const name = cleanText(payload?.name, 120);
  if (name.length < 2) {
    return json(400, { error: "Name is required" });
  }

  const consentAccepted = Boolean(payload?.consent?.accepted);
  const consentVersion = cleanText(payload?.consent?.policyVersion, 40);
  if (!consentAccepted || !consentVersion) {
    return json(400, { error: "Consent is required" });
  }

  const contact = cleanText(payload?.contact, 160);
  const email = cleanText(payload?.email, 160).toLowerCase();
  const phone = cleanText(payload?.phone, 40);

  if (formType === "lead-capture") {
    if (!contact || (!isEmail(contact) && !isValidUAPhone(contact))) {
      return json(400, { error: "Valid contact is required" });
    }
  }

  if (formType === "clinic-intake") {
    if (!email || !isEmail(email)) {
      return json(400, { error: "Valid email is required" });
    }
    if (phone && !isValidUAPhone(phone)) {
      return json(400, { error: "Invalid phone number format" });
    }
  }

  const interest = cleanText(payload?.interest, 40);
  if (interest && !ALLOWED_INTERESTS.has(interest)) {
    return json(400, { error: "Invalid interest value" });
  }

  const familyHistory = cleanText(payload?.familyHistory, 40);
  if (familyHistory && !ALLOWED_FAMILY_HISTORY.has(familyHistory)) {
    return json(400, { error: "Invalid family history value" });
  }

  const goal = cleanText(payload?.goal, 1000);
  const age = parseAge(payload?.age);
  const entryPlacement = cleanText(payload?.metadata?.entryPlacement, 20);
  const campaignId = cleanText(payload?.metadata?.campaignId, 120);
  const funnelStage = cleanText(payload?.metadata?.funnelStage, 80);
  const quizStartedAt = cleanText(payload?.metadata?.quizStartedAt, 60);
  const submittedAtClient = cleanText(payload?.metadata?.submittedAtClient, 60);
  const attribution = sanitizeAttribution(payload?.metadata?.attribution);
  const answerSet = sanitizeQuizAnswers(payload?.metadata?.quizAnswers);

  if (entryPlacement && !ALLOWED_ENTRY_PLACEMENTS.has(entryPlacement)) {
    return json(400, { error: "Invalid entry placement" });
  }

  const submissionId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const timestamp = Date.now();

  const submission = {
    submissionId,
    submittedAt,
    formType,
    name,
    contact: contact || undefined,
    email: email || undefined,
    phone: phone || undefined,
    interest: interest || undefined,
    goal: goal || undefined,
    age,
    familyHistory: familyHistory || undefined,
    answerSet: Object.keys(answerSet).length > 0 ? answerSet : undefined,
    consent: {
      accepted: true,
      policyVersion: consentVersion,
      acceptedAt: submittedAt,
    },
    timing: {
      quizStartedAt: quizStartedAt || undefined,
      submittedAtClient: submittedAtClient || undefined,
      submittedAtServer: submittedAt,
    },
    metadata: {
      ip:
        context?.ip ||
        request.headers.get("x-nf-client-connection-ip") ||
        undefined,
      userAgent: request.headers.get("user-agent") || undefined,
      source: cleanText(payload?.metadata?.source, 120) || "landing",
      entryPlacement: entryPlacement || undefined,
      campaignId: campaignId || undefined,
      funnelStage: funnelStage || undefined,
      attribution,
    },
  };

  try {
    const store = getStore("lead-submissions");
    await store.setJSON(`${timestamp}-${submissionId}.json`, submission);
  } catch (error) {
    console.error("Failed to persist lead submission", error);
    return json(500, { error: "Failed to save submission" });
  }

  return json(201, { ok: true, submissionId });
};

export const config = {
  path: "/api/lead",
  method: ["POST"],
};
