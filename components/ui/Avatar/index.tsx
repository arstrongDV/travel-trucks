import React from 'react'
import style from './Avatar.module.css'

interface AvatarProps {
    reviewer_name: string
}

const Avatar = ({ reviewer_name }: AvatarProps) => {
    const firstLetter = reviewer_name.slice(0, 1);

  return (
    <div className={style.avatar}>
      { firstLetter }
    </div>
  )
}

export default Avatar
