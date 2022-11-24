<template>
  <!-- 产品服务 -->
  <div class="zcgh clearFix clearfix">
    <div class="w">
      <!-- 上面 -->
      <div class="zcghTitle">
        <h1>产品服务</h1>
        <p>建立实时、准确、全面的数据透视，来实现数字化精益管理，赋能传统企业数字化转型变革。</p>
      </div>
      <!-- 底下  -->
      <div class="zcghCount">
        <ul>
          <li>热门产品</li>
          <li>数字化装备</li>
          <li>数字化生产</li>
        </ul>
      </div>
      <!--  -->
      <ul class="zcghList">
        <li>
          <img src="https://www.kelicloud.cn/uploads/allimg/20220913/1-220913195034158.png" />
          <h2>智慧园区集成管控平台</h2>
          <p>空间管理，环境监测，智能监控，应急安全</p>
          <div class="zcghShowLink">
            <a href="#" class="SysShow">系统演示</a>
            <a href="#" class="LearnMore">了解更多 ></a>
          </div>
        </li>
        <li>
          <img src="https://www.kelicloud.cn/uploads/allimg/20220913/1-220913195034158.png" />
          <h2>智慧园区集成管控平台</h2>
          <p>空间管理，环境监测，智能监控，应急安全</p>
          <div class="zcghShowLink">
            <a href="#" class="SysShow">系统演示</a>
            <a href="#" class="LearnMore">了解更多 ></a>
          </div>
        </li>
        <li>
          <img src="https://www.kelicloud.cn/uploads/allimg/20220913/1-220913195034158.png" />
          <h2>智慧园区集成管控平台</h2>
          <p>空间管理，环境监测，智能监控，应急安全</p>
          <div class="zcghShowLink">
            <a href="#" class="SysShow">系统演示</a>
            <a href="#" class="LearnMore">了解更多 ></a>
          </div>
        </li>
        <li>
          <img src="https://www.kelicloud.cn/uploads/allimg/20220913/1-220913195034158.png" />
          <h2>智慧园区集成管控平台</h2>
          <p>空间管理，环境监测，智能监控，应急安全</p>
          <div class="zcghShowLink">
            <a href="#" class="SysShow">系统演示</a>
            <a href="#" class="LearnMore">了解更多 ></a>
          </div>
        </li>
        <li>
          <img src="https://www.kelicloud.cn/uploads/allimg/20220913/1-220913195034158.png" />
          <h2>智慧园区集成管控平台</h2>
          <p>空间管理，环境监测，智能监控，应急安全</p>
          <div class="zcghShowLink">
            <a href="#" class="SysShow">系统演示</a>
            <a href="#" class="LearnMore">了解更多 ></a>
          </div>
        </li>
        <li>
          <img src="https://www.kelicloud.cn/uploads/allimg/20220913/1-220913195034158.png" />
          <h2>智慧园区集成管控平台</h2>
          <p>空间管理，环境监测，智能监控，应急安全</p>
          <div class="zcghShowLink">
            <a href="#" class="SysShow">系统演示</a>
            <a href="#" class="LearnMore">了解更多 ></a>
          </div>
        </li>
        <li>
          <img src="https://www.kelicloud.cn/uploads/allimg/20220913/1-220913195034158.png" />
          <h2>智慧园区集成管控平台</h2>
          <p>空间管理，环境监测，智能监控，应急安全</p>
          <div class="zcghShowLink">
            <a href="#" class="SysShow">系统演示</a>
            <a href="#" class="LearnMore">了解更多 ></a>
          </div>
        </li>
        <li>
          <img src="https://www.kelicloud.cn/uploads/allimg/20220913/1-220913195034158.png" />
          <h2>智慧园区集成管控平台</h2>
          <p>空间管理，环境监测，智能监控，应急安全</p>
          <div class="zcghShowLink">
            <a href="#" class="SysShow">系统演示</a>
            <a href="#" class="LearnMore">了解更多 ></a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.w {
  width: 1200px;
  margin: 0 auto;
}
p {
  color: #666;
  font-size: 14px;
  text-align: center;
}
// 产品服务
.zcgh {
  width: 100%;
  // height: 600px;
  margin-top: -145px;
  padding-top: 80px;
  background-color: #f7f7f7;
  overflow: hidden;
  box-sizing: border-box;

  .w {
    // 标题
    .zcghTitle {
      h1 {
        height: 40px;
        margin-bottom: 20px;
        font-size: 40px;
        line-height: 40px;
        text-align: center;
      }
    }

    .zcghCount {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      transition: all 0.5s;
      box-sizing: border-box;

      ul {
        height: 52px;
        padding: 0 20px;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;

        li {
          float: left;
          margin: 0 10px;
          height: 52px;
          line-height: 52px;
          text-align: center;
          font-size: 16px;
          border: 0;
          box-sizing: border-box;
          transition: all 0.3s;
          cursor: pointer;

          &:hover {
            color: #409eff;
            border-bottom: 3px solid #ff8604;
          }
        }
      }
    }
    // 底下的
    .zcghList {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-top: 20px;
      text-align: center;
      overflow: hidden;
      li {
        float: left;
        width: 282px;
        height: 309px;
        padding: 20px;
        margin-bottom: 15px;
        background-color: #fff;
        box-sizing: border-box;
        transition: all 0.5s;
        &:hover {
          box-shadow: 0 1px 20px #ddd;
          transform: translateY(-2px);
        }
        img {
          width: 56px;
          height: 56px;
        }

        h2 {
          height: 242px;
          height: 24px;
          font-size: 22px;
        }
        p {
          width: 242px;
          height: 96px;
          margin: 20px 0px;
          font-size: 14px;
          line-height: 26px;
          // text-align: left;
        }
        .zcghShowLink {
          a {
            display: inline-block;
          }
          .SysShow {
            width: 96px;
            height: 33px;
            margin-right: 15px;
            line-height: 33px;
            border: 1px solid #409eff;
            font-size: 14px;
            color: #409eff;
            &:hover {
              color: #fff;
              background-color: #409eff;
            }
          }
          .LearnMore {
            color: #333;
            font-size: 14px;
            &:hover {
              color: #409eff;
            }
          }
        }
      }
    }
  }
}
</style>
