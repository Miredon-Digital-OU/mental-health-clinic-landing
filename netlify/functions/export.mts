import { getStore } from "@netlify/blobs";

const SECRET_TOKEN = process.env.ADMIN_EXPORT_SECRET || "opora-admin-secret-2026";

const json = (status: number, body: any) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export default async (request: Request) => {
  // Simple auth check via header
  const authHeader = request.headers.get("x-export-secret");
  const searchParams = new URL(request.url).searchParams;
  const urlSecret = searchParams.get("secret");

  if (authHeader !== SECRET_TOKEN && urlSecret !== SECRET_TOKEN) {
    return json(401, { error: "Unauthorized. Please provide valid x-export-secret header or secret query param." });
  }

  try {
    const store = getStore("lead-submissions");
    const { blobs } = await store.list();

    if (blobs.length === 0) {
      return json(200, { message: "No entries found.", count: 0 });
    }

    const data: any[] = [];
    for (const blobInfo of blobs) {
      const entry = await store.get(blobInfo.key, { type: "json" });
      if (entry) {
        data.push(entry);
      }
    }

    // Sort by submission date (newest first)
    data.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    // Check if user wants CSV or JSON
    const format = searchParams.get("format") || "json";

    if (format === "csv") {
      const headers = [
        "submissionId", "submittedAt", "name", "email", "phone", "contact", 
        "interest", "age", "familyHistory", "funnelStage", "source", 
        "quizAnswers", "abVariant"
      ];
      
      const csvRows = [headers.join(",")];

      for (const row of data) {
        const answers = row.answerSet ? 
          Object.entries(row.answerSet).map(([k, v]) => `${k}:${v}`).join("|") : "";
        
        const line = [
          row.submissionId,
          row.submittedAt,
          `"${row.name || ""}"`,
          row.email || "",
          row.phone || "",
          row.contact || "",
          row.interest || "",
          row.age || "",
          row.familyHistory || "",
          row.metadata?.funnelStage || "",
          row.metadata?.source || "",
          `"${answers.replace(/"/g, '""')}"`,
          `"${row.metadata?.abTestVariant || ""}"`
        ];
        csvRows.push(line.join(","));
      }

      return new Response(csvRows.join("\n"), {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="opora_leads_${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    return json(200, {
      count: data.length,
      lastUpdated: new Date().toISOString(),
      leads: data,
    });

  } catch (error) {
    console.error("Export failed", error);
    return json(500, { error: "Failed to fetch lead data." });
  }
};

export const config = {
  path: "/api/export",
  method: ["GET"],
};
