import { ChangeEvent, useState } from 'react'
import { useAddCommentMutation } from '../api/post/postApi'
import { useSearchParams } from 'next/navigation'

export const useAddComment = () => {
  const [comment, setComment] = useState('')
  const [addComment] = useAddCommentMutation()
  const searchParams = useSearchParams()
  const postIdForSwagger = searchParams.get('postId') as string

  const changeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.currentTarget.value)
  }
  const submitComment = async () => {
    try {
      await addComment({
        postId: postIdForSwagger,
        content: comment,
      }).unwrap()
      setComment('')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    comment,
    changeTextarea,
    submitComment,
  }
}
