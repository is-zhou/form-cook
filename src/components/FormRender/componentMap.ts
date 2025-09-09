import {
  ElButton,
  ElInput,
  ElSwitch,
  ElRate,
  ElRadioGroup,
  ElRadio,
  ElRadioButton,
  ElSelect,
  ElInputNumber,
  ElInputTag,
  ElSlider,
  ElColorPicker,
} from 'element-plus'

export const componentsMap = {
  input: ElInput,
  switch: ElSwitch,
  div: 'div'
}

export type TComponentName = keyof typeof componentsMap
