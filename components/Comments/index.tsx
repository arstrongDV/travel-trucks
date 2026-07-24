'use client'
import { getCamperReviews } from '@/services/campers';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import CommentCard from './CommentCard';
import SmallLoader from '../ui/Loader/SmallLoader';
import style from './Comments.module.css'

interface CommentsProps {
    catalogId: string;
}

const Comments = ({ catalogId }: CommentsProps) => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['camper-reviews', catalogId],
        queryFn: () => getCamperReviews(catalogId)
    })

    if (isLoading) return <SmallLoader />

    if (isError || !data || data.length === 0) {
        return <p>No comments yet.</p>;
    }

  return (
    <>
      <ul className={style.commentsContainer}>
        {data.map((comment) => (
            <li key={comment.id}>
                <CommentCard comment={comment} />
            </li>
        ))}
      </ul>
    </>
  )
}

export default Comments;
