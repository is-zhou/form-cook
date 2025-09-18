import type { ComponentConfig, ComponentName, FormCompConfig, LayoutCompConfig } from 'form-cook-render';

export type TSetterGroup = 'formItem' | 'form';
export type TisHide = true | undefined;

export type TSettersItem = { group?: TSetterGroup } & ComponentConfig

export type TSettersModuleType = { [key: string]: TSettersItem };

export type TSetters = {
  [key in ComponentName]?: Array<ComponentConfig>;
};
