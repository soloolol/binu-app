// 신고 사유의 key (API에 전달되는 값)
export type ReportReasonKey =
  | "abusive"
  | "irrelevant"
  | "advertisement"
  | "other";

// 신고 사유의 객체 형태 (UI에 표시할 label 포함)
export interface ReportReasonOption {
  key: ReportReasonKey;
  label: string;
}

// 실제 사용할 리스트
export const REPORT_REASON_OPTIONS: ReportReasonOption[] = [
  { key: "abusive", label: "욕설이 포함된 내용이에요" },
  { key: "irrelevant", label: "리뷰와 무관한 내용이에요" },
  { key: "advertisement", label: "광고/홍보성 내용이에요" },
  { key: "other", label: "기타 문제가 있어요" },
];
