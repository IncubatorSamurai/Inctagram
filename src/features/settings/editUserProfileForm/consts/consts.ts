type RequiredInput = 'name' | 'firstName' | 'lastName'
type InputType = { label: string; value: RequiredInput }

export const requiredInputs: InputType[] = [
  {
    label: 'Username',
    value: 'name',
  },
  {
    label: 'First Name',
    value: 'firstName',
  },
  {
    label: 'Last Name',
    value: 'lastName',
  },
]
