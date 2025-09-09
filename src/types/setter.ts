import type { TComponentName, TConfig, TComponentConfig } from '@/types/schema.ts'

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
  } & TComponentConfig

type CombinedKeys = keyof TConfig<'form'> | keyof TConfig<'layout'>;

export type TSettersModuleType = {
  [key in CombinedKeys]?: TSettersItem<true> | TSettersItem;
};

export type TSetters = {
  [key in TComponentName]?: Array<TComponentConfig>;
};
