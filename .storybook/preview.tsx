import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@/app/_styles/ui/index.scss'

import { themes } from '@storybook/theming'
import type { Preview } from '@storybook/react'
import { IntlProvider } from 'next-intl'

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
}

export default preview
