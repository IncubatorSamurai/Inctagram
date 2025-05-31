'use client'
import { useState } from 'react'
import {
  useLazyGetCommentAnswersQuery,
  usePostAnswerCommentMutation,
  useUpdateCommentAnswersLikeMutation,
  useUpdateCommentLikeMutation,
} from '@/shared/api/comments/commentsApi'

export const useCommentItem = (postId: number, commentId: number, isLiked: boolean) => {
  const [updateLike] = useUpdateCommentLikeMutation()
  const [updateAnswerLike] = useUpdateCommentAnswersLikeMutation()
  const [postAnswerComment] = usePostAnswerCommentMutation()
  const [fetchAnswers, { data: answersData }] = useLazyGetCommentAnswersQuery()

  const [isAnswersVisible, setAnswersVisible] = useState(false)
  const [isActiveTextField, setActiveTextField] = useState(false)
  const [answerContent, setAnswerContent] = useState('')

  const onPublishAnswer = async () => {
    try {
      await postAnswerComment({
        postId,
        commentId,
        content: answerContent,
      })
      setActiveTextField(false)
      setAnswerContent('')
    } catch (e) {
      console.error('Ошибка при публикации', e)
    }
  }

  const onVisibleAnswer = async () => {
    if (!isAnswersVisible) {
      try {
        await fetchAnswers({ postId, commentId }).unwrap()
      } catch (e) {
        console.error('Ошибка при загрузке ответов', e)
      }
    }
    setAnswersVisible(prev => !prev)
  }

  const onCommentLike = async () => {
    try {
      await updateLike({
        postId,
        commentId,
        likeStatus: isLiked ? 'NONE' : 'LIKE',
      }).unwrap()
    } catch (error) {
      console.error('Ошибка при обновлении лайка:', error)
    }
  }

  const onAnswerLike = async (answerId: number, isLiked: boolean) => {
    try {
      await updateAnswerLike({
        postId,
        commentId,
        answerId,
        likeStatus: isLiked ? 'NONE' : 'LIKE',
      }).unwrap()
    } catch (error) {
      console.error('Ошибка при обновлении лайка:', error)
    }
  }
  const onAnswer = () => {
    setActiveTextField(!isActiveTextField)
  }
  const onAnswerContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswerContent(e.target.value)
  }
  return {
    onAnswerLike,
    onCommentLike,
    onPublishAnswer,
    onVisibleAnswer,
    isAnswersVisible,
    isActiveTextField,
    setActiveTextField,
    answerContent,
    setAnswerContent,
    answersData,
    onAnswer,
    onAnswerContent,
  }
}
