import type { ComponentConfig, ComponentName, FormCompConfig, LayoutCompConfig } from 'form-cook-render';

export type TSetterGroup = 'formItem' | 'form';
export type TisHide = true | undefined;

export type TSettersItem<T extends TisHide = undefined> = T extends true
  ? {
    isHide?: T;
    group?: TSetterGroup;
    setterChildren?: Record<string, TSettersItem<true> | TSettersItem>;
  }
  : {
    isHide?: T;
    group?: TSetterGroup;
    setterChildren?: Record<string, TSettersItem<true> | TSettersItem>;
  } & ComponentConfig

type CombinedKeys = keyof FormCompConfig | keyof LayoutCompConfig;

export type TSettersModuleType = {
  [key in CombinedKeys]?: TSettersItem<true> | TSettersItem;
};

export type TSetters = {
  [key in ComponentName]?: Array<ComponentConfig>;
};
