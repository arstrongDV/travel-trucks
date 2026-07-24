import React from 'react'
import style from './CommentCard.module.css'
import Avatar from '../../ui/Avatar'
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { CamperReview } from '@/types/campers';

interface CommentCardProps {
    comment: CamperReview;
}

const starRating = (reviewer_rating: number) => {
    return Array.from({ length: 5 }, (_, index) =>
        index < reviewer_rating
            ? <TiStarFullOutline key={index} className={style.starIcon} />
            : <TiStarOutline key={index} className={style.starIcon} />
    )
}

const CommentCard = ({comment}: CommentCardProps) => {
  return (
    <div className={style.commentContainer}>
        <span className={style.userInfo}>
            <Avatar reviewer_name={comment.reviewer_name} />

            <div className={style.reviews}>
                <p>{comment.reviewer_name}</p>

                <span className={style.rating}>
                    {starRating(comment.reviewer_rating)}
                </span>
            </div>
        </span>

        <p className={style.comment}>
            {comment.comment}
        </p>
    </div>
  )
}

export default CommentCard
