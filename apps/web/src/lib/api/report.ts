import { Review } from "@/types/Place";
import { ReportReasonKey } from "@/types/Report";

export async function reportReview(
  reviewId: Review["id"],
  userId: string,
  reason: ReportReasonKey
): Promise<Response> {
  const res = await fetch("/api/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reviewId,
      userId,
      reason,
    }),
  });

  if (!res.ok) throw new Error("Failed to report");

  return res;
}
