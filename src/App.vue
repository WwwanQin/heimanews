<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
*{
  margin: 0;
  padding: 0;
  background-color: rgb(242, 242, 242);
}
.w{
  margin: 0 auto;
}
html{
    font-size: 75px;
}
@media screen and (min-width: 750px){
    html{
      font-size: 75px;
    }
}
@media screen and (max-width: 750px) and (min-width: 540px){
    html{
      font-size: 75px;
    }
}
@media screen and (max-width:540px) and (min-width:480px){
    html{
        font-size: 54px;
    }
}
@media screen and (max-width: 480px){
  html{
    font-size: 48px;
  }
}
h1,h2,h3,h4,h5,h6{
  font-size: .4rem;
}
a{
  color: inherit;
  text-decoration: none;
  font-weight: 700;
  font-size: .044444rem;
}
a:hover{
  color: inherit;
  text-decoration: none;
}
</style>
