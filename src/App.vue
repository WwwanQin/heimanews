<template>
  <div id="app">
    <keep-alive include="index,search">
      <router-view/>
    </keep-alive>
  </div>
</template>
<style lang="less">
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
@import url('../node_modules/vant/lib/index.css');
// html{
//   filter: grayscale(.7);
// }
*{
  margin: 0;
  padding: 0;
}
.w{
  margin: 0 auto;
}
a{
  text-decoration: none;
  color: black;
}
img{
  border-radius: 5px;
  box-shadow: rgba(49, 35, 35, 0.16) 7px 8px 10px
}
</style>
