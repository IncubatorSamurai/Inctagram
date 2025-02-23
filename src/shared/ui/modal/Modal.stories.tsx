import type { Meta, StoryObj } from '@storybook/react'
import { Modal, DialogClose } from '@/shared/ui/modal/Modal'
import { Button } from '@/shared/ui/button'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: <Button>Open</Button>,
    children: (
      <div style={{ display: 'flex' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur consequuntur,
        dolorum earum eos harum minus non quo quos veniam.
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </div>
    ),
    title: 'Error',
  },
}

export const Post: Story = {
  args: {
    trigger: <Button>Open</Button>,
    children: (
      <div>
        <DialogClose asChild>
          <Button fullWidth>dsa</Button>
        </DialogClose>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur
          consequuntur, dolorum earum eos harum minus non quo quos veniam.
        </p>
      </div>
    ),
  },
}
