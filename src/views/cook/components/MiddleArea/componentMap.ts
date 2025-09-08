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
import type { Component } from 'vue'

export const componentsMap: { [key: string]: Component } = {
  input: ElInput,
  textarea: ElInput,
  switch: ElSwitch,
  rate: ElRate,
  radioGroup: ElRadioGroup,
  radio: ElRadio,
  radioButton: ElRadioButton,
  select: ElSelect,
  inputNumber: ElInputNumber,
  inputTag: ElInputTag,
  slider: ElSlider,
  colorPicker: ElColorPicker,
}
