import type { ComponentConfig, ComponentName, FormCompConfig, LayoutCompConfig } from 'form-cook-render';

export type TSetterGroup = 'formItem' | 'form';
export type TisHide = true | undefined;

export type TSettersItem = { group?: TSetterGroup } & ComponentConfig


type CombinedKeys = keyof FormCompConfig | keyof LayoutCompConfig;

export type TSettersModuleType = {
  [key in CombinedKeys | string]?: TSettersItem;
};

export type TSetters = {
  [key in ComponentName]?: Array<ComponentConfig>;
};
