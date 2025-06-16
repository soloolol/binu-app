export default function PlaceCardSkeleton() {
  return (
    <div className="flex flex-col justify-between w-full space-y-1 bg-white rounded-xl shadow p-4 animate-pulse">
      {/* 상단: 제목 + 북마크 아이콘 자리 */}
      <div className="flex justify-between items-center">
        <div className="h-5 w-3/5 bg-gray-200 rounded"></div>
        <div className="w-6 h-7 bg-gray-200 rounded"></div>
      </div>

      {/* 서브타이틀 자리 */}
      <div className="h-4 w-4/5 bg-gray-200 rounded"></div>

      {/* binu/별점 점수 줄 */}
      <div className="flex items-center space-x-4 mt-1">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>

      {/* 태그 자리 */}
      <div className="flex flex-wrap gap-2 mt-1">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
