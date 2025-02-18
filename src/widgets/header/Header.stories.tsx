import type { Meta, StoryObj } from '@storybook/react'
import {Header} from "@/widgets/header/Header";




const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {

    isAuth: {
      options: [true, false],  // Это корректно для переключателя
      control: { type: 'radio' },
    },
  },

} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderDemo: Story = {


  args: {
    headerTitle: 'Inctagram',
    isAuth:true,
  },
}
