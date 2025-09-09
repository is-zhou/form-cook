import type { Component } from 'vue'

interface ModuleType {
  default: Component
}


const modules = import.meta.glob('./*.vue', { eager: true }) as Record<string, ModuleType>

const materialIconMap: { [key: string]: Component } = {}
Object.keys(modules).forEach((path) => {
  const componentName = path.split('/').pop()!.replace('.vue', '');
  materialIconMap[componentName] = modules[path].default
});


export default materialIconMap
