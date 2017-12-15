<template lang="html">
  <div id="bg" class="" style="transform: translateX(-200px) translateY(300px) rotateZ(-60deg); opacity: 1;">
    <div class="row1">
      <div class="orb1"><div></div></div>
      <div class="orb2"><div></div></div>
      <div class="orb1c"><div></div></div>
      <div class="orb2c"><div></div></div>
    </div>
    <div class="row2">
        <div class="orb1"><div></div></div>
        <div class="orb2"><div></div></div>
        <div class="orb1c"><div></div></div>
        <div class="orb2c"><div></div></div>
    </div>
    <div class="row3">
        <div class="orb1"><div></div></div>
        <div class="orb2"><div></div></div>
        <div class="orb1c"><div></div></div>
        <div class="orb2c"><div></div></div>
    </div>
    <div class="row1c">
        <div class="orb1"><div></div></div>
        <div class="orb2"><div></div></div>
        <div class="orb1c"><div></div></div>
        <div class="orb2c"><div></div></div>
    </div>
    <div class="row2c">
        <div class="orb1"><div></div></div>
        <div class="orb2"><div></div></div>
        <div class="orb1c"><div></div></div>
        <div class="orb2c"><div></div></div>
    </div>
    <div class="row3c">
        <div class="orb1"><div></div></div>
        <div class="orb2"><div></div></div>
        <div class="orb1c"><div></div></div>
        <div class="orb2c"><div></div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SphereBackground'
}
</script>

<style scoped>
@-webkit-keyframes orbloop {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes orbloop {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes orbmove {
  from {
    -webkit-transform: translateX(0px);
  }
  to {
    -webkit-transform: translateX(-2000px);
  }
}
@keyframes orbmove {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-2000px);
  }
}
#bg {
  position: absolute;
  width: 1000px;
  height: 1000px;
  top: 50%;
  left: 50%;
  margin-left: -800px;
  margin-top: 500px;
}
#bg div div {
  position: absolute;
}
#bg {
  opacity: 0;
}
#bg .row1 div {
  -webkit-animation: orbmove 48s linear infinite;
  animation: orbmove 96s linear infinite;
}
#bg .row1 .orb1 {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 30%;
  left: 50%;
  margin-left: -30px;
  margin-top: -380px;
}
#bg .row1 .orb1 div {
  width: 100%;
  height: 100%;
  border-radius: 60px;
  background: -webkit-linear-gradient(top, #c8fae1, #b4effc);
  background: linear-gradient(to bottom, #c8fae1, #b4effc);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row1 .orb2 {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin-left: 40px;
  margin-top: 50px;
}
#bg .row1 .orb2 div {
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background: -webkit-linear-gradient(top, #c8fae1, #b4effc);
  background: linear-gradient(to bottom, #c8fae1, #b4effc);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row1 .orb1c {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  margin-left: 1970px;
  margin-top: -380px;
}
#bg .row1 .orb1c div {
  width: 100%;
  height: 100%;
  border-radius: 60px;
  background: -webkit-linear-gradient(top, #fcfcfc, #fbfbfb);
  background: linear-gradient(to bottom, #fcfcfc, #fbfbfb);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row1 .orb2c {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 5%;
  left: 50%;
  margin-left: 2450px;
  margin-top: 50px;
}
#bg .row1 .orb2c div {
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background: -webkit-linear-gradient(top, #c8fae1, #b4effc);
  background: linear-gradient(to bottom, #c8fae1, #b4effc);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row2 div {
  -webkit-animation: orbmove 24s linear infinite;
  animation: orbmove 48s linear infinite;
}
#bg .row2 .orb1 {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin-left: -500px;
  margin-top: -300px;
}
#bg .row2 .orb1 div {
  width: 100%;
  height: 100%;
  border-radius: 200px;
  background: -webkit-linear-gradient(top, #b3ebfe, #bacaed);
  background: linear-gradient(to bottom, #b3ebfe, #bacaed);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row2 .orb2 {
  position: absolute;
  width: 250px;
  height: 250px;
  top: 50%;
  left: 50%;
  margin-left: 175px;
  margin-top: -125px;
}
#bg .row2 .orb2 div {
  width: 100%;
  height: 100%;
  border-radius: 250px;
  background: -webkit-linear-gradient(top, #fcfcfc, #fbfbfb);
  background: linear-gradient(to bottom, #fcfcfc, #fbfbfb);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row2 .orb1c {
  position: absolute;
  width: 200px;
  height: 200px;
  top: -5%;
  left: 55%;
  margin-left: 2500px;
  margin-top: -300px;
}
#bg .row2 .orb1c div {
  width: 100%;
  height: 100%;
  border-radius: 200px;
  background: -webkit-linear-gradient(top, #b3ebfe, #bacaed);
  background: linear-gradient(to bottom, #b3ebfe, #bacaed);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row2 .orb2c {
  position: absolute;
  width: 250px;
  height: 250px;
  top: 50%;
  left: 50%;
  margin-left: 700px;
  margin-top: -200px;
}
#bg .row2 .orb2c div {
  width: 100%;
  height: 100%;
  border-radius: 400px;
  background: -webkit-linear-gradient(top, #fcfcfc, #fbfbfb);
  background: linear-gradient(to bottom, #fcfcfc, #fbfbfb);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row3 div {
  -webkit-animation: orbmove 12s linear infinite;
  animation: orbmove 24s linear infinite;
}
#bg .row3 .orb1 {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin-left: 550px;
  margin-top: -300px;
}
#bg .row3 .orb1 div {
  width: 100%;
  height: 100%;
  border-radius: 300px;
  background: -webkit-linear-gradient(top, #b3ebfe, #bacaed);
  background: linear-gradient(to bottom, #b3ebfe, #bacaed);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row3 .orb2 {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  margin-left: 0px;
  margin-top: 0px;
}
#bg .row3 .orb2 div {
  width: 100%;
  height: 100%;
  border-radius: 600px;
  background: -webkit-linear-gradient(top, #ffcccc, #ffd5cc);
  background: linear-gradient(to bottom, #ffcccc, #ffd5cc);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row3 .orb1c {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 40%;
  left: 40%;
  margin-left: 2850px;
  margin-top: -300px;
}
#bg .row3 .orb1c div {
  width: 100%;
  height: 100%;
  border-radius: 300px;
  background: -webkit-linear-gradient(top, #ffcccc, #ffd5cc);
  background: linear-gradient(to bottom, #ffcccc, #ffd5cc);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}
#bg .row3 .orb2c {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin-left: 500px;
  margin-top: 0px;
}
#bg .row3 .orb2c div {
  width: 100%;
  height: 100%;
  border-radius: 600px;
  background: -webkit-linear-gradient(top, #fcfcfc, #f7f7f7);
  background: linear-gradient(to bottom, #fcfcfc, #f7f7f7);
  -webkit-animation: orbloop 6s linear infinite;
  animation: orbloop 6s linear infinite;
}

</style>
