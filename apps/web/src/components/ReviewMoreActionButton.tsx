"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MoreVertical, X } from "lucide-react";
import { ReportReasonKey, REPORT_REASON_OPTIONS } from "@/types/Report";
import { Review } from "@/types/Place";
import { reportReview } from "@/lib/api/report";
import { useAuthStore } from "@/stores/authStore";

interface ReviewMoreActionButtonProps {
  reviewId: Review["id"];
  reviewerId: Review["userId"];
}

export default function ReviewMoreActionButton({
  reviewId,
  reviewerId,
}: ReviewMoreActionButtonProps) {
  const userId = useAuthStore((state) => state.userId);
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const goReview = useCallback((id: string) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "GO_REVIEW", id })
      );
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
    setShowReportModal(false);
  };

  const handleReport = async (reasonKey: ReportReasonKey) => {
    try {
      await reportReview(reviewId, userId, reasonKey);
      alert("신고가 접수되었어요!");
    } catch (error) {
      alert("신고에 실패했어요.");
    } finally {
      setShowReportModal(false);
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (showMenu && menuRef.current && !menuRef.current.contains(target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <div className="relative flex justify-end">
      <button
        className="flex justify-end w-8 h-8"
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
      >
        <MoreVertical className="stroke-secondary" />
      </button>

      {/* 드롭다운 메뉴 */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute w-20 right-0 top-8 bg-white shadow rounded-md text-xs z-20"
        >
          <button
            className="w-full border-b border-gray-200 p-2 hover:bg-gray-50"
            onClick={() => {
              setShowMenu(false);
              setShowReportModal(true);
            }}
          >
            신고
          </button>
          {reviewerId === userId && (
            <button
              className="w-full p-2 hover:bg-gray-50"
              onClick={() => {
                goReview(reviewId);
              }}
            >
              수정
            </button>
          )}
        </div>
      )}

      {/* 신고 모달 */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-80 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold">
                신고 사유를 선택해주세요
              </h3>
              <button onClick={() => setShowReportModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {REPORT_REASON_OPTIONS.map((reason) => (
                <button
                  key={reason.key}
                  onClick={() => handleReport(reason.key)}
                  className="text-left text-sm p-2 rounded hover:bg-gray-100"
                >
                  {reason.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
