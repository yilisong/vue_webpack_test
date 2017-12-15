<template lang="html">
 <div class="go-btn">
   <span id="go-next" class="go-next" @click="clickSlideDown">
     <span class="next-theme">
       {{name}}
     </span>
     <i></i>
   </span>
 </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    name: ''
  },
  name: 'GoNextBtn',
  methods: {
    clickSlideDown() {
      $.fn.fullpage.moveSectionDown()
    }
  }
}
</script>

<style scoped>
.go-btn {
  position: relative;
  height: inherit;
}

.go-next {
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  z-index: 20;
  width: 30px;
  bottom: 2%;
  height: 50px;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  cursor: pointer;
  opacity: .5;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 50)';
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
  -o-transition: .3s;
  -ms-transition: .3s;
  -moz-transition: .3s;
  -webkit-transition: .3s;
  transition: .3s;
  .next-theme {
    position: absolute;
    width: 70px;
    left: -21px;
    text-align: center;
    top: -25px;
  }
}

.go-next i {
  display: block;
  width: 6px;
  height: 10px;
  background: white;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 10px;
  margin-left: -3px;
  -webkit-animation: point 3s infinite;
  -moz-animation: point 3s infinite;
  -ms-animation: point 3s infinite;
  -o-animation: point 3s infinite;
  animation: point 3s infinite;
}

@-webkit-keyframes point {
  0% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
  50% {
    top: 34px;
    opacity: .4;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 40)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
  }
  100% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
}

@-moz-keyframes point {
  0% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
  50% {
    top: 34px;
    opacity: .4;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 40)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
  }
  100% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
}

@-ms-keyframes point {
  0% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
  50% {
    top: 34px;
    opacity: .4;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 40)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
  }
  100% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
}

@-o-keyframes point {
  0% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
  50% {
    top: 34px;
    opacity: .4;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 40)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
  }
  100% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
}

@keyframes point {
  0% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
  50% {
    top: 34px;
    opacity: .4;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 40)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
  }
  100% {
    top: 10px;
    opacity: 1;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity= 100)';
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  }
}
</style>
