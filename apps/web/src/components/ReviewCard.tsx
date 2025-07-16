import { Review } from "@/types/Place";
import Image from "next/image";
import BinuScore from "./BinuScore";
import ReviewMoreActionButton from "./ReviewMoreActionButton";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="flex flex-col gap-3 items-start rounded-lg border-secondary border-1 bg-light p-4">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-5 font-source">
          <Image
            src={review.profileImgUrl}
            alt="userProfileImg"
            width={100}
            height={100}
            className="rounded-ful w-12 h-12 object-cover"
          />
          <div className="flex flex-col">
            <div className="font-semibold">{review.userNick}</div>
            <p className="text-gray-500">{review.date}</p>
          </div>
        </div>
        <ReviewMoreActionButton reviewId={review.id} reviewerId={review.userId } />
      </div>
      <BinuScore score={review.binuScore} />
      <div>{review.content}</div>
    </article>
  );
}
