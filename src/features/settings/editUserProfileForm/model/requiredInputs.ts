type RequiredInput = 'name' | 'firstName' | 'lastName'
type InputType = { label: string; value: RequiredInput }

export const requiredInputs = (t: (key: string) => string): InputType[] => {
  return [
    {
      label: t('name'),
      value: 'name',
    },
    {
      label: t('firstName'),
      value: 'firstName',
    },
    {
      label: t('lastName'),
      value: 'lastName',
    },
  ]
}
// export type RequiredInput = 'name' | 'firstName' | 'lastName'
