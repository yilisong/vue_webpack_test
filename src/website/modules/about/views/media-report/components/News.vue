<template lang="html">
<div class="">
  <div class="article-box">
    <img src="" alt="" class="thumbnail">
    <div class="article">
      <h2>{{latest.title}}</h2>
      <p class="origin">来自：<span>1234</span>时间：<span></span><a href="#">阅读原文</a></p>
      <p>{{latest.content}}</p>
    </div>
  </div>
  <div class="article-box">
    <ul>
      <li v-for="item in newsList">
        <div class="list-left">
          <img src="" alt="">
          <p>{{item.date}}</p>
        </div>
        <div class="list-right">
          <h1>{{item.title}}</h1>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      latest: {
        title: '上海云盾：网络安全中国梦，需要共同来守护',
        origin: '',
        date: '',
        link: '',
        img: '',
        content: '自从十八大以来“中国梦”一词开始根植于民心，上海云盾作为一家从事网络安全技术的企业，也一直在紧跟着党的步伐行进。YUNDUN始终为实现网络安全中国梦而不断努力，并指出这个梦想，需要我们共同来守护。'
      },
      newsList: [{
        title: '上海云盾为互联网业务筑建网络安全“金钟罩”',
        date: '2017-06-30 16:36:53',
        img: '',
        content: '道高一尺，魔高一丈，这是现如今互联网平台业务开展所面临着的威胁。伴随着P2P、游戏行业的飞速发展，在被市场青睐的同时，其壮大趋势的背后也迎来了网络、云安全问题的诸多挑战。'
      }]
    }
  }
}
</script>

<style lang="css" scoped="">
.left-box {
  width: 50%;
}

.thumbnail {
  width: 100%;
  height: 350px;
}

.article-box {
  width: 49.5%;
  display: inline-block;
  vertical-align: top;
}

.article {
  h2 {
    font-weight: 100;
    padding: 24px 0 18px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }
  .origin {
    padding: 12px 0 18px 0;
  }
}

.list-left,
.list-right {
  display: inline-block;
  vertical-align: top;
}

.list-left {}

.list-right {
  width: 77%;
}
</style>
