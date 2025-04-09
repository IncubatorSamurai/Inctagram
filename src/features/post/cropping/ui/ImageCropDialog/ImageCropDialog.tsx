import { Dropdown } from '@/shared/ui/dropdown'
import { Expand } from '../Expand'
import { ExpandOutlineIcon } from '@/shared/assets/icons/ExpandOutlineIcon'
import { Button } from '@/shared/ui/button'
import { useState } from 'react'
import { resetCropFile, saveCropFile } from '@/shared/store'
import { useAppDispatch } from '@/shared/hooks'
import Cropper, { Area } from 'react-easy-crop'
import { getCroppedFile } from '../../lib/getCroppedFile'
import { Photo } from '@/shared/types'
import s from './ImageCropDialog.module.scss'

type Props = {
  setSelectedFile: (selectedFile: Photo | null) => void
  selectedFile: Photo
}

export const ImageCropDialog = ({ setSelectedFile, selectedFile }: Props) => {
  const [crop, setCrop] = useState(selectedFile.cropInit || { x: 0, y: 0 })
  const [zoom, setZoom] = useState(selectedFile.zoomInit || 1)
  const [aspect, setAspect] = useState(selectedFile.aspectInit || 1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | Area>(null)

  const dispatch = useAppDispatch()

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onSaveCropFile = async () => {
    try {
      const croppedFileUrl = await getCroppedFile(
        selectedFile.fileUrl,
        croppedAreaPixels as Area,
        selectedFile.type
      )

      dispatch(
        saveCropFile({
          file: {
            ...selectedFile,
            zoomInit: zoom,
            cropInit: crop,
            aspectInit: aspect,
            croppedFileUrl,
            filteredFileUrl: null,
          },
        })
      )
      setSelectedFile(null)
    } catch (error) {
      console.error('Error cropping file', error)
    }
  }

  const onResetCropFile = () => {
    dispatch(resetCropFile({ file: selectedFile }))

    setSelectedFile(null)
  }

  return (
    <div className={s.container}>
      <div>
        <Cropper
          image={selectedFile?.fileUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              background: 'transparent',
              width: '100%',
              height: '85%',
              boxShadow: 'none',
            },
          }}
        />
      </div>

      <div className={s.actionButtons}>
        <Dropdown
          className={s.expandDropdown}
          classItemsContainer={s.expandItemsContainer}
          iconTrigger={<ExpandOutlineIcon/>}
        >
          <Expand getAspect={setAspect} />
        </Dropdown>

        <div className={s.buttonsWrapper}>
          <Button onClick={onSaveCropFile}>Save</Button>
          <Button variant="outline" onClick={() => setSelectedFile(null)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={onResetCropFile}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
