<template>
  <div  class="VPFeatures VPHomeFeatures">
    <div  class="container">
      <div  class="items">
        <div class="item">
          <div class="VPLink no-icon VPFeature">
            <article  class="box">
              <div class="comp_list_container">
                <div class="info ">
                   <h2  class="title name clip">组件物料</h2>
                    <p  class="details">
                    1、可以通过分类，及搜索快速找到组件物料
                  </p>
                  <p  class="details">
                    2、拖拽、或者点击组件即可快速添加组件到画布，拖拽搭建表单结构，无需手写繁琐代码，实时预览生成效果，显著提升开发效率。
                  </p>
                  <div class="actions" >
                    <div class="action">
                      <span class="VPButton medium brand">组件分类</span>
                    </div>
                    <div class="action">
                      <span   class="VPButton medium brand">快速搜索</span>
                    </div>
                    <div class="action">
                      <span  class="VPButton medium brand">拖拽新增</span>
                    </div>
                    <div class="action">
                      <span  class="VPButton medium brand">点击新增</span>
                    </div>
                  </div>
                </div>
                <div class="image ">
                  <img src="../../../public/comp_list.png" width="100%"></img>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div  class="item">
          <div  class="VPLink no-icon VPFeature">
            <article  class="box">
              <div class="comp_list_container">
                 <div class="image">
                  <img src="../../../public/filed_edit.png" width="100%"></img>
                </div>
                <div class="info">
                  <h2  class="title name clip">快速导入</h2>
                  <p class="details">
                    1、可以直接通过添加导入字段，来快速实现表单结构；
                  </p>
                   <p class="details">
                    2、可以批量的修改删除字段，根据需求批量修改字段对应的组件类型；
                  </p>
                     <p class="details">
                    3、也可以通过后写入或粘贴JSON数据结构，并配置解析选项来解析字段，来实现批量字段导入，方便快捷。
                  </p>

                  <div class="actions" >
                    <div class="action">
                      <span class="VPButton medium brand">批量编辑</span>
                    </div>
                    <div class="action">
                      <span class="VPButton medium brand">JSON解析</span>
                    </div>
                  </div>

                </div>

              </div>
            </article>
          </div>
        </div>
        <div  class="item">
          <div class="VPLink no-icon VPFeature">
            <article  class="box">
              <div class="comp_list_container">
                <div class="info">
                  <h2 class="title name clip">画布及Schema</h2>
                  <p class="details">
                    1、通过点击/拖拽物料组件到画布，后会渲染组件视图，同时左侧会生成结构树；
                  </p>
                  <p class="details">
                    2、查看完整的表单协议代码，且可以直接修改编辑Schema然后保存；
                  </p>
                  <p class="details">
                    3、画布及Schema的更新修改会有操作历史，可以通过撤销及重做来选择当前步骤；
                  </p>
                   <p class="details">
                    3、表单预览，及生成代码，预览当前画布已完成的表单，生成代码后可以直接复制或下载。
                  </p>
                  <div class="actions" >
                    <div class="action">
                      <span class="VPButton medium brand">结构树</span>
                    </div>
                    <div class="action">
                      <span class="VPButton medium brand">Schema操作</span>
                    </div>
                    <div class="action">
                      <span class="VPButton medium brand">撤销重做</span>
                    </div>
                    <div class="action">
                      <span class="VPButton medium brand">表单预览</span>
                    </div>
                    <div  class="action">
                      <span class="VPButton medium brand">代码生成</span>
                    </div>
                  </div>
                </div>
                <div class="image">
                  <img src="../../../public/canvas_schema.png" width="100%"></img>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div  class="item">
          <div  class="VPLink no-icon VPFeature">
            <article class="box">
              <h2  class="title name clip">组件设置器</h2>
              <p  class="details">
                组件设置器，分为表单域设置器、基础设置器和组件设置器三类，表单域设置器是针对表单域的整体属性配置；基础设置器是动态，根据表单组件或者布局组件来动态匹配对应的设置器；组件设置器也是动态的根据组件取加载对应该组件的配置器选项。常用设置器如下：
              </p>
              <div class="setters ">
                <div>
                  <p>校验规则</p>
                  <img src="../../../public/setter_rule.png" alt="">
                </div>
                <div>
                  <p>组件样式</p>
                     <img src="../../../public/setter_style.png" alt="">
                </div>
                <div>
                  <p>列表选项</p>
                  <img src="../../../public/setter_options.png" alt="">
                </div>
                <div>
                  <p>组件事件</p>
                  <img src="../../../public/setter_event.png" alt="">
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.VPFeatures {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPFeatures {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPFeatures {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
  width: 100%;
}


.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.VPFeature.link:hover {
  border-color: var(--vp-c-brand-1);
}

.box {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.box > :deep(.VPImage) {
  margin-bottom: 20px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background-color 0.25s;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.link-text {
  padding-top: 8px;
}

.link-text-value {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.link-text-icon {
  margin-left: 6px;
}

.VPButton {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.VPButton:active {
  transition: color 0.1s, border-color 0.1s, background-color 0.1s;
}

.VPButton.medium {
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
}

.VPButton.big {
  border-radius: 24px;
  padding: 0 24px;
  line-height: 46px;
  font-size: 16px;
}

.VPButton.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}

.VPButton.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}

.VPButton.brand:active {
  border-color: var(--vp-button-brand-active-border);
  color: var(--vp-button-brand-active-text);
  background-color: var(--vp-button-brand-active-bg);
}

.VPButton.alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.VPButton.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.VPButton.alt:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
}

.VPButton.sponsor {
  border-color: var(--vp-button-sponsor-border);
  color: var(--vp-button-sponsor-text);
  background-color: var(--vp-button-sponsor-bg);
}

.VPButton.sponsor:hover {
  border-color: var(--vp-button-sponsor-hover-border);
  color: var(--vp-button-sponsor-hover-text);
  background-color: var(--vp-button-sponsor-hover-bg);
}

.VPButton.sponsor:active {
  border-color: var(--vp-button-sponsor-active-border);
  color: var(--vp-button-sponsor-active-text);
  background-color: var(--vp-button-sponsor-active-bg);
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
  }
}

.main {
  position: relative;
  z-index: 10;
  order: 2;
  flex-grow: 1;
  flex-shrink: 0;
}



@media (min-width: 960px) {
  .main {
    order: 1;
    width: calc((100% / 3) * 2);
  }

}

.heading {
  display: flex;
  flex-direction: column;
}

.name,
.text {
  width: fit-content;
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

@media (min-width: 640px) {
  .name,
  .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }

}

@media (max-width: 640px) {

  .comp_list_container .image{
    display: none;
  }
  .setters > div{
    display: none;
  }
}

@media (min-width: 960px) {
  .name,
  .text {
    line-height: 64px;
    font-size: 56px;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
  padding-top: 24px;
}



@media (min-width: 640px) {
  .actions {
    padding-top: 32px;
  }
}


.action {
  flex-shrink: 0;
  padding: 6px;
}

.comp_list_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}
.comp_list_container .info {
  flex: 1;

}
.comp_list_container .info  span{
  display: inline-block;
}
.comp_list_container .image {
  flex: 1;
  border-radius: 2%;
  overflow: hidden;

}

.setters{
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
.setters > div{
  flex: 1;
  padding: 10px;
  text-align: center;

  border-radius: 2%;
  background-color: #fff;
  color: #000000;
}

.setters > div img {
  width: 100%;
  border-radius: 2%;
  margin-top: 6px;
  border: 1px dashed #d2d2d7;
  padding: 2px;

}
</style>
