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

import { SerializeInput } from "vue-serialize-input"

export const componentsMap = {
  input: ElInput,
  textarea: ElInput,
  inputNumber: ElInputNumber,
  inputTag: ElInputTag,
  rate: ElRate,
  radioGroup: ElRadioGroup,
  radio: ElRadio,
  radioButton: ElRadioButton,
  select: ElSelect,
  switch: ElSwitch,
  slider: ElSlider,
  colorPicker: ElColorPicker,
  div: 'div',
  serializeInput: SerializeInput
}

export type TComponentName = keyof typeof componentsMap
