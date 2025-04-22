'use client'
import { Typography } from '@/shared/ui/typography'
import s from './EditDescriptionPost.module.scss'
import { Button } from '@/shared/ui/button'
import { useState } from 'react'
import { useEditPostDescriptionMutation } from '@/shared/api/post/postApi'
import { ErrorResponse } from '@/shared/types/auth'

type EditDescriptionProps = {
  description: string | undefined
  // saveValue: (value: string) => void
  changeEdit: () => void
  postId: number
}

export const EditDescriptionPost = ({ description, changeEdit, postId }: EditDescriptionProps) => {
  const [editDescription] = useEditPostDescriptionMutation()
  const [length, setLength] = useState(description?.length)
  const [textTemp, setTextTemp] = useState(description)

  const showPostLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextTemp(e.currentTarget.value)
    setLength(e.currentTarget.value.length)
  }

  const saveAndCloseHandler = async () => {
    changeEdit()
    try {
      await editDescription({ id: postId, description: textTemp }).unwrap()
    } catch (error) {
      const err = error as ErrorResponse
      console.error(err.data.messages)
    }
  }

  return (
    <div className={s.root}>
      <div>
        <label htmlFor="description">
          <Typography variant="regular_text_14" className={s.lableColor}>
            Add publication descriptions
          </Typography>
        </label>
        <textarea
          onChange={showPostLength}
          name="description"
          cols={46}
          rows={5}
          id="description"
          className={s.area}
          maxLength={500}
          defaultValue={description}
        ></textarea>
      </div>
      <div className={s.counter}>
        <span className="counter-text">
          <span className="counter-text__current">{length}</span>/
          <span className="counter-text__total">500</span>
        </span>
      </div>

      <div className={s.btn}>
        <Button onClick={saveAndCloseHandler}>Save Changes</Button>
      </div>
    </div>
  )
}
