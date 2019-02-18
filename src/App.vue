<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import url('./assets/style/index.css');
#app {
  height: 100%;
  .easyFm {
    height: 100%;
    .easyFm-header {
      width: 100%;
      background: #fff;
      .easyFm-header-log {
        width: 200px;
        float: left;
        text-align: center;
        height: 61px;
        line-height: 60px;
      }
      .easyFm-header-list {
        width: calc(100% - 200px);
        float: left;
      }
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }
    .easyFm-main {
      width: 100%;
      height: 100%;
      .easyFm-main-list {
        width: 200px;
        height: 100%;
        background: #fff;
        border-right: solid 1px #e6e6e6;
        float: left;
      }
      .easyFm-main-list-min-width {
        width: 64px;
      }
      .easyFm-main-list-mmax-width {
        width: 200px;
      }
      .easyFm-main-content {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .easyFm-main-content-crumb {
          span {
            font-size: 14px;
            color: #909399
          }
          padding-left: 20px;
          width: 100%;
          height: 50px;
          line-height: 50px;
          box-sizing: border-box;
          background: #fff;
        }
        .easyFm-main-content-content {
          width: 100%;
          height: 100%;
        }
      }
      .easyFm-main-content-padding-small {
        padding-left: 63px;
      }
      .easyFm-main-content-padding-lager {
        padding-left: 200px;
      }
    }
  }
}
</style>
