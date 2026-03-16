export type LeadPayload = {
  formType: "lead-capture" | "clinic-intake";
  name: string;
  contact?: string;
  email?: string;
  phone?: string;
  interest?: string;
  goal?: string;
  age?: string;
  familyHistory?: string;
  website?: string;
  consent: {
    accepted: boolean;
    policyVersion: string;
  };
  metadata?: {
    source?: string;
    entryPlacement?: string;
    quizStartedAt?: string;
    submittedAtClient?: string;
    campaignId?: string;
    funnelStage?: string;
    quizAnswers?: Record<string, string>;
    attribution?: {
      landingPath?: string;
      referrer?: string;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      utmTerm?: string;
      utmContent?: string;
      gclid?: string;
      fbclid?: string;
      msclkid?: string;
      firstSeenAt?: string;
    };
  };
};

type LeadResponse = {
  ok: boolean;
  submissionId: string;
};

const getErrorMessage = (value: unknown): string | null => {
  if (typeof value !== "object" || value === null || !("error" in value)) {
    return null;
  }

  const maybeError = (value as { error: unknown }).error;
  return typeof maybeError === "string" ? maybeError : null;
};

export const submitLead = async (payload: LeadPayload): Promise<LeadResponse> => {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let responseBody: unknown = null;
  try {
    responseBody = await response.json();
  } catch {
    // No JSON response body.
  }

  if (!response.ok) {
    const message =
      getErrorMessage(responseBody) ||
      "Не вдалося надіслати форму. Спробуйте, будь ласка, ще раз.";
    throw new Error(message);
  }

  return responseBody as LeadResponse;
};
