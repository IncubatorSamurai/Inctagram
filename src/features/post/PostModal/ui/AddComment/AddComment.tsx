'use client'
import { Button } from '@/shared/ui/button'
import s from './AddComment.module.scss'
import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAddCommentMutation } from '@/shared/api/comments/commentsApi'
export const AddComment = () => {

 const [comment, setComment]= useState('')
 const [addComment] = useAddCommentMutation()
 const searchParams = useSearchParams()
 const postIdForSwagger = searchParams.get('postId') as string
 
  const changeTextarea = (event:ChangeEvent<HTMLTextAreaElement>) => {
     setComment(event.currentTarget.value)
  }
  const submitComment = async () => {
    try {
      await addComment({
        postId: postIdForSwagger,
        content: comment ,
      }).unwrap()
      setComment('')
    } catch (error) {
      console.error(error)
    }
  }

  const disabledBTN = comment
  return (
    <div className={s.postsSideAddComment}>
      <textarea maxLength={300} onChange={changeTextarea} value={comment} placeholder="Add a Comment..."></textarea>
      <Button name="Publish" variant="text" disabled={!disabledBTN} onClick={submitComment}>
        Publish
      </Button>
    </div>
  )
}
