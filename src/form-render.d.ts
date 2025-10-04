import "form-cook-render"

// 使用 declare module 关键字来“打开”这个模块
declare module 'form-cook-render' {
  // 重新声明同名的 interface ComponentNameMap
  // TypeScript 会自动将这里的声明和库里原始的声明进行“合并”
  export interface ComponentNameMap {
    // 在这里添加你想要扩展的组件名
    // 属性值设为 unknown 即可，与原始定义保持一致
    SerializeInput: unknown;
    RuleEditor: unknown;
    OptionsEditor: unknown;
    BoolOrFnEditor: unknown;
    EventEditor: unknown;
  }
}
