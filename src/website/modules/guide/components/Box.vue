<template>
<div class="box" @click="enter">
  <div class="box-content">
    <p class="box-title">{{ name }}</p>
    <button type="button"
      class="enter-btn">立即进入</button>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    domain: String
  },
  methods: {
    enter() {
      window.location = this.domain
    }
  }
}
</script>

<style scoped>
.box {
  cursor: pointer;
  width: 231px;
  height: 100px;
  border-bottom: 1px solid #2d90e6;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  float: left;

  &:not(:first-child) {
    margin-left: 20px;
  }

  .box-content {
    transition: all .4s cubic-bezier(.4,0,.2,1);
    position: absolute;
    top: 50%;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;

    .box-title {
      color: #333;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
    }

    .box-domain {
      opacity: 0;
      margin-top: 4px;
      text-align: center;
      font-size: 14px;
    }

    .enter-btn {
      cursor: pointer;
      border: 1px solid #fff;
      background-color: #2d90e6;
      color: #fff;
      opacity: 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 17px;
      padding: 5px 18px;
      border-radius: 4px;
    }
  }

}

.box:hover {
  .box-content {
    top: 0;
    background-color: #2d90e6;

    .box-title {
      color: #fff;
    }

    .box-domain {
      opacity: 1;
      color: #fff;
    }

    .enter-btn {
      opacity: 1;
      color: #fff;
    }
  }
}
</style>
