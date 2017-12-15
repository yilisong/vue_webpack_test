<template lang="html">
  <div class="areaMapBackground">
    <div class="left">
      <div class="areaTitle left1">
        <div>
          <span class="years">{{years}}<br/>
            <span class="week">{{week}}</span>
          </span>
          <span class="chinaWeek">周 <br/> {{chinaWeek}}</span>
          <span class="hours">{{hours}}</span>
        </div>
      </div>
      <div class="left2 eventTrend">
        <div id="trendEvent"></div>
      </div>
      <div class="left3 downTime">
        <div class="imgPostion">
          <img src="./assets/img/Shape.png">
        </div>
        <div class="downTimes">
          <span class="downTimesValue">{{monitorNumbe}}</span>
          <span class="downTimesUnit">次</span>
        </div>
      </div>
      <div class="left4 sensitiveWords">
        <div id="sensitiveWordsChart"></div>
      </div>
      <div class="left5 riskRanking">
        <div>
          <img src="./assets/img/fxpm.png">
        </div>
        <div class="riskRankingTable">
          <table>
              <thead>
                <tr>
                  <td><span>漏洞名</span></td>
                  <td><span>出现次数</span></td>
                  <td><span>影响页面</span></td>
                </tr>
              </thead>
              <tbody id="riskRankingTable">
                <tr v-for="(item, index) in riskRanking">
                    <td><span>{{ item.loophole_type }}</span></td>
                    <td><span>{{ item.count_number }}</span></td>
                    <td><span>{{ item.influence_page }}</span></td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="areaMap title">
        <div id="areaMap"></div>
    </div>
    <div class="right">
        <div class="right1">
            <div class="chartsBarWebsite" id="abnormalWebsite"></div>
            <div class="chartsBar" id="highRiskOf"></div>
            <div class="chartsBar" id="tamperingWith"></div>
            <div class="chartsBar" id="sensitiveWords"></div>
            <div class="chartsBar" id="hijackingOfDNS"></div>
            <div class="chartsBar" id="outage"></div>
        </div>
        <div class="right1_title">
            <div class="chartsBarWebsite_title">异常网站</div>
            <div class="chartsBar_title">高风险占比</div>
            <div class="chartsBar_title">篡改</div>
            <div class="chartsBar_title">敏感词</div>
            <div class="chartsBar_title">DNS劫持</div>
            <div class="chartsBar_title">宕机</div>
        </div>
        <div class="right2">
            <div>
                <img src="./assets/img/zxcg.png">
            </div>
            <div class="tampering">
                <table>
                    <thead>
                        <tr>
                          <td><span>域名URL（资源）</span></td>
                          <td><span>时间</span></td>
                        </tr>
                    </thead>
                    <tbody id="tampering">
                       <tr v-for="(item, index) in tamperTop">
                         <td>
                           <el-tooltip placement="left" effect="light">
                             <div slot="content">{{ item.tamper_url }}</div>
                             <span>{{ item.tamper_url }}</span>
                           </el-tooltip>
                         </td>
                         <td><span>{{ item.tamper_time }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="right3">
            <div>
                <img src="./assets/img/ldfb.png">
            </div>
            <div class="distribution">
                <table>
                    <thead>
                        <tr>
                          <td><span>域名</span></td>
                          <td><span><span class="high">●</span>高</span></td>
                          <td><span><span class="middle">●</span>中</span></td>
                          <td><span><span class="low">●</span>低</span></td>
                        </tr>
                    </thead>
                    <tbody id="distribution">
                        <tr v-for="(item, index) in loopholeCount">
                            <td><span>{{ item.domain }}</span></td>
                            <td><span>{{ item.level_high }}</span></td>
                            <td><span>{{ item.level_middle }}</span></td>
                            <td><span>{{ item.level_low }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="right4">
            <div class="tab_banner">
                <div class="tab_title loophole active" id="loophole_banner" @click="tabPageChange('loophole')">漏洞<span>({{taskTotalList[5]}})</span></div>
                <div class="tab_title tamper" id="tamper_banner" @click="tabPageChange('tamper')">篡改<span>({{taskTotalList[0]}})</span></div>
                <div class="tab_title" id="antistop_banner" @click="tabPageChange('antistop')">关键词<span>({{taskTotalList[2]}})</span></div>
                <div class="tab_title sensitiveWord" id="sensitiveWord_banner" @click="tabPageChange('sensitiveWord')">敏感词<span>({{taskTotalList[1]}})</span></div>
                <div class="tab_title abnormalStatusCode" id="abnormalStatusCode_banner" @click="tabPageChange('abnormalStatusCode')">异常状态码<span>({{taskTotalList[3]}})</span></div>
            </div>
            <div class="tab_content">
                <div class="tabContent" id="loophole">
                    <div class="loophole_div">
                        <div class="loopholeDiv">
                            <div class="active" @click="mainWords($event, 0, 'loophole')">
                                <img src="./assets/img/all.png"> 全部漏洞</div>
                            <div @click="mainWords($event, 3, 'loophole')">
                                <img src="./assets/img/high.png"> 高危漏洞</div>
                            <div @click="mainWords($event, 2, 'loophole')">
                                <img src="./assets/img/middle.png"> 中危漏洞</div>
                            <div @click="mainWords($event, 1, 'loophole')">
                                <img src="./assets/img/low.png"> 低危漏洞</div>
                        </div>
                    </div>
                    <div class="loopholeTable_div">
                        <div class="riskRankingTable loopholeTable">
                          <table>
                              <thead>
                                <tr>
                                  <td><span>域名</span></td>
                                  <td><span>风险名称</span></td>
                                  <td><span>数量</span></td>
                                </tr>
                              </thead>
                              <tbody id="loopholeTable">
                                <tr v-for="(item, index) in LoopholeData" @click="showLoopholeDetails($event, item.id)">
                                    <td><span class="wap wapDmain">{{ item.scan_domain }}</span></td>
                                    <td>
                                        <span v-if="item.level === '1'" class="low">●</span>
                                        <span v-else-if="item.level === '2'" class="middle">●</span>
                                        <span v-else class="high">●</span>
                                        <span class="wap">{{ item.loophole_name }}</span>
                                    </td>
                                    <td>{{ item.number }}</td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="loophole_detials">
                        <div class="polygon">详情</div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">风险名称：</div>
                            <div class="detailsContent">
                                <span>{{ loopholeListDataDetails.loophole_name }}</span>
                            </div>
                        </div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">风险等级：</div>
                            <div class="detailsContent" v-if="loopholeListDataDetails.level === '1'">
                                <span>低</span>
                                <div class="lineGradient lineLow"></div>
                            </div>
                            <div class="detailsContent" v-else-if="loopholeListDataDetails.level === '2'">
                                <span>中</span>
                                <div class="lineGradient lineMiddle"></div>
                            </div>
                            <div class="detailsContent" v-else-if="loopholeListDataDetails.level === '3'">
                                <span>高</span>
                                <div class="lineGradient lineHigh"></div>
                            </div>
                            <div v-else></div>
                        </div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">影响URL：</div>
                            <div class="detailsContent detailsUrl">
                                <div v-for="(item, index) in loopholeListDataDetails.influence_url">{{ item }}</div>
                            </div>
                        </div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">风险描述：</div>
                            <div class="detailsContent">
                                <div>{{ loopholeListDataDetails.loophole_desc }}</div>
                            </div>
                        </div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">解决方案：</div>
                            <div class="detailsContent">
                                <div v-if="loopholeListDataDetails.solution !== ''">{{ loopholeListDataDetails.solution }}</div>
                                <div v-else>暂无数据</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContent" id="tamper">
                    <div class="tamperTable_div">
                        <div class="riskRankingTable tamperTable">
                          <table>
                              <thead>
                                <tr>
                                  <td><span>域名</span></td>
                                  <td><span>数量</span></td>
                                </tr>
                              </thead>
                              <tbody id="tamperTable">
                                <tr @click="showLoopholeDetails($event, item.domain)" v-for="(item, index) in tabTamper">
                                    <td><span>{{ item.domain }}</span></td>
                                    <td><span>{{ item.number }}</span></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="tamper_detials">
                        <div class="polygon">详情</div>
                        <!-- one -->
                        <div v-for="(item, index) in tamperDetails">
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">影响URL：</div>
                                <div class="detailsContent detailsUrl">
                                    <div>{{item.influence_url}}</div>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">疑似篡改数量：</div>
                                <div class="detailsContent">
                                    <span>{{item.number}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">发现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.first_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">最近出现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.last_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">快照查看：</div>
                                <div class="phoneHeight detailsContent">
                                    <div class="phone">
                                        <div class="swiper-container">
                                            <div class="swiper-wrapper">
                                                <div v-for="(item, index) in item.risk_image_url" class="swiper-slide">
                                                    <a :href="item" target="_blank">
                                                        <img :src="item">
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="swiper-button-next"></div>
                                            <div class="swiper-button-prev"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContent" id="antistop">
                    <div class="antistop_div">
                        <div class="antistopDiv">
                            <div class="active" @click="mainWords($event, '', 'antistop')">所有关键词</div>
                            <div v-for="(item, index) in bannerAntistop" @click="mainWords($event, item.content, 'antistop')">{{ item.content }}</div>
                        </div>
                    </div>
                    <div class="antistopTable_div">
                        <div class="riskRankingTable antistopTable">
                          <table>
                              <thead>
                                <tr>
                                  <td><span>域名</span></td>
                                  <td><span>关键词</span></td>
                                  <td><span>数量</span></td>
                                </tr>
                              </thead>
                              <tbody id="antistopTable">
                                <tr @click="showLoopholeDetails($event, item.domain)" v-for="(item, index) in tabAntistop">
                                    <td><span>{{ item.domain }}</span></td>
                                    <td><span>{{ item.content }}</span></td>
                                    <td><span>{{ item.number }}</span></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="antistop_detials">
                        <div class="polygon">详情</div>
                        <!-- one -->
                        <div v-for="(item, index) in antistopDetails">
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">影响URL：</div>
                                <div class="detailsContent detailsUrl">
                                    <div>{{item.influence_url}}</div>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">疑似篡改数量：</div>
                                <div class="detailsContent">
                                    <span>{{item.number}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">发现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.first_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">最近出现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.last_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">快照查看：</div>
                                <div class="phoneHeight detailsContent">
                                    <div class="phone">
                                        <div class="swiper-container">
                                            <div class="swiper-wrapper">
                                                <div v-for="(item, index) in item.risk_image_url" class="swiper-slide">
                                                    <a :href="item" target="_blank">
                                                        <img :src="item">
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="swiper-button-next"></div>
                                            <div class="swiper-button-prev"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContent" id="sensitiveWord">
                    <div class="antistop_div">
                        <div class="antistopDiv">
                            <div class="active" @click="mainWords($event, '', 'sensitiveWord')">所有敏感词</div>
                            <div v-for="(item, index) in bannerSensitiveWord" @click="mainWords($event, item.content, 'sensitiveWord')">{{ item.content }}</div>
                        </div>
                    </div>
                    <div class="antistopTable_div">
                        <div class="riskRankingTable antistopTable">
                          <table>
                              <thead>
                                <tr>
                                  <td><span>域名</span></td>
                                  <td><span>敏感词</span></td>
                                  <td><span>数量</span></td>
                                </tr>
                              </thead>
                              <tbody id="sensitiveWordTable">
                                <tr @click="showLoopholeDetails($event, item.domain)" v-for="(item, index) in tabSensitiveWord">
                                    <td><span>{{ item.domain}}</span></td>
                                    <td><span>{{ item.content }}</span></td>
                                    <td><span>{{ item.number }}</span></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="antistop_detials">
                        <div class="polygon">详情</div>
                        <!-- one -->
                        <div v-for="(item, index) in sensitiveWordDetails">
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">影响URL：</div>
                                <div class="detailsContent detailsUrl">
                                    <div>{{item.influence_url}}</div>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">疑似篡改数量：</div>
                                <div class="detailsContent">
                                    <span>{{item.number}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">发现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.first_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">最近出现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.last_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">快照查看：</div>
                                <div class="phoneHeight detailsContent">
                                    <div class="phone">
                                        <div class="swiper-container">
                                            <div class="swiper-wrapper">
                                                <div v-for="(item, index) in item.risk_image_url" class="swiper-slide">
                                                    <a :href="item" target="_blank">
                                                        <img :src="item">
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="swiper-button-next"></div>
                                            <div class="swiper-button-prev"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContent" id="abnormalStatusCode">
                    <div class="antistop_div">
                        <div class="antistopDiv">
                            <div class="active" @click="mainWords($event, '', 'abnormalStatusCode')">所有</div>
                            <div v-for="(item, index) in bannerAbnormalStatusCode" @click="mainWords($event, item.content, 'abnormalStatusCode')">{{ item.content }}</div>
                        </div>
                    </div>
                    <div class="antistopTable_div">
                        <div class="riskRankingTable antistopTable">
                          <table>
                              <thead>
                                <tr>
                                  <td>域名</td>
                                  <td>异常状态码</td>
                                  <td>数量</td>
                                </tr>
                              </thead>
                              <tbody id="abnormalStatusCodeTable">
                                <tr @click="showLoopholeDetails($event, item.domain)" v-for="(item, index) in tabAbnormalStatusCode">
                                    <td><span>{{ item.domain}}</span></td>
                                    <td><span>{{ item.content }}</span></td>
                                    <td><span>{{ item.number }}</span></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="antistop_detials">
                        <div class="polygon">详情</div>
                        <!-- one -->
                        <div v-for="(item, index) in abnormalStatusCodeDetails">
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">影响URL：</div>
                                <div class="detailsContent detailsUrl">
                                    <div>{{item.influence_url}}</div>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">出现次数：</div>
                                <div class="detailsContent">
                                    <span>{{item.number}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">发现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.first_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">最近出现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.last_time}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mimicryBox" id="mimicryBox">
        <div class="mimicryBox_body">
            <div class="cursor closeMimicryBox" @click="closeMimicryBox"><img src="./assets/img/close.png"></div>
            <div v-if="logStatus === '1'">
                <div class="titleOfWarning">
                    <div class="titleOfWarning1">
                        <span class="warningInfo">您的网站发现
                        <span v-if="scanLog.level === '1'">低危</span>
                        <span v-if="scanLog.level === '2'">中危</span>
                        <span v-else>高危</span>漏洞
                        </span>
                        <br>
                        <span class="warningDomain">{{scanLog.domain}}</span>
                    </div>
                    <div class="titleOfWarning2">
                        <span class="beforeTime">{{beforeTime}}</span></span>
                        <br>
                        <span class="timeOfOccurrence">{{scanLog.updated_at}}</span>
                    </div>
                </div>
                <div class="warningDiv">
                    <div>
                        <div class="warningTitle">漏洞名:</div>
                        <div class="warningDetails">
                            {{scanLog.loophole_name}}
                            <span v-if="scanLog.level === '1'">低危</span>
                            <span v-if="scanLog.level === '2'">中危</span>
                            <span v-else>高危</span>
                        </div>
                    </div>
                    <div>
                        <div class="warningTitle">影响URL:</div>
                        <div class="warningDetails">
                            <div v-for="(item, index) in scanLog.influence_url">{{item}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="logStatus === '2'">
                <div class="titleOfWarning">
                    <div class="titleOfWarning1">
                        <span class="warningInfo">您的网站发现<span>疑似篡改</span></span>
                        <br>
                        <span class="warningDomain">{{tamperLog.domain}}</span>
                    </div>
                    <div class="titleOfWarning2">
                        <span class="beforeTime">{{beforeTime}}</span></span>
                    </div>
                </div>
                <div class="warningDiv">
                    <div>
                        <div class="warningTitle">网站名称:</div>
                        <div class="warningDetails">{{tamperLog.website_name}}</div>
                    </div>
                    <div>
                        <div class="warningTitle">疑似篡改URL:</div>
                        <div class="warningDetails">
                            <div>{{tamperLog.risk_url}}</div>
                        </div>
                    </div>
                    <div>
                        <div class="warningTitle">疑似篡改数量:</div>
                        <div class="warningDetails">
                            <div>{{tamperLog.number}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="logStatus === '3'">
                <div class="titleOfWarning">
                    <div class="titleOfWarning1">
                        <span class="warningInfo">您的网站发现<span>敏感词</span></span>
                        <br>
                        <span class="warningDomain">{{sensitiveWordLog.domain}}</span>
                    </div>
                    <div class="titleOfWarning2">
                        <span class="beforeTime">{{beforeTime}}</span></span>
                    </div>
                </div>
                <div class="warningDiv">
                    <div>
                        <div class="warningTitle">网站名称:</div>
                        <div class="warningDetails">{{sensitiveWordLog.website_name}}</div>
                    </div>
                    <div>
                        <div class="warningTitle">敏感词:</div>
                        <div class="warningDetails">
                            <span v-for="(item, index) in sensitiveWordLog.content">{{item}}  </span>
                        </div>
                    </div>
                    <div>
                        <div class="warningTitle">影响URL:</div>
                        <div class="warningDetails">
                            <div>{{sensitiveWordLog.risk_url}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="logStatus === '4'">
                <div class="titleOfWarning">
                    <div class="titleOfWarning1">
                        <span class="warningInfo">您的网站发现<span>关键词缺失</span></span>
                        <br>
                        <span class="warningDomain">{{keywordLog.domain}}</span>
                    </div>
                    <div class="titleOfWarning2">
                        <span class="beforeTime">{{beforeTime}}</span></span>
                    </div>
                </div>
                <div class="warningDiv">
                    <div>
                        <div class="warningTitle">网站名称:</div>
                        <div class="warningDetails">{{keywordLog.website_name}}</div>
                    </div>
                    <div>
                        <div class="warningTitle">缺失关键词:</div>
                        <div class="warningDetails">
                            <span v-for="(item, index) in keywordLog.content">{{item}}  </span>
                        </div>
                    </div>
                    <div>
                        <div class="warningTitle">关键词缺失URL:</div>
                        <div class="warningDetails">
                            <div>{{keywordLog.risk_url}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="titleOfWarning">
                    <div class="titleOfWarning1">
                        <span class="warningInfo">您的网站发现<span>访问异常</span></span>
                        <br>
                        <span class="warningDomain">{{abnormalStatusCodeLog.domain}}</span>
                    </div>
                    <div class="titleOfWarning2">
                        <span class="beforeTime">{{beforeTime}}</span></span>
                    </div>
                </div>
                <div class="warningDiv">
                    <div>
                        <div class="warningTitle">网站名称:</div>
                        <div class="warningDetails">{{abnormalStatusCodeLog.website_name}}</div>
                    </div>
                    <div>
                        <div class="warningTitle">访问异常码:</div>
                        <div class="warningDetails">
                            <span v-for="(item, index) in abnormalStatusCodeLog.content">{{item}}  </span>
                        </div>
                    </div>
                    <div>
                        <div class="warningTitle">影响URL:</div>
                        <div class="warningDetails">
                            <div>{{abnormalStatusCodeLog.risk_url}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'
import ConversionTime from 'common/utils/conversionTime'
import EchartsLine from 'echarts/lib/chart/line'
import EchartsBar from 'echarts/lib/chart/bar'
import areaJson from '../../common/json/chongqing.json'
import Swiper from 'swiper'
import Perception from './resource/perception'

export default {
  components: {
    Echarts,
    ConversionTime
  },
  data() {
    return {
        /*弹框*/
        beforeTime: '1分钟前',
        /**/
        globalDistributionSeries: [],
        years: '',
        hours: '',
        week: '',
        chinaWeek: '',
        sensitiveWordsChartSeries: [],
        abnormalWebsiteSeries: [],
        tabStatus: 1,
        tabPageId: 'scan',
        riskRanking: [],
        loopholeCount: [],
        LoopholeData: [],
        loopholeListDataDetails: {},
        chongqingData: [],
        sevensjqsData: {
            time: [],
            value: []
        },
        taskTotalList:[],
        monitorNumbe: '0',
        featureCount: [],
        tamperTop: [{ tamper_url: '暂无数据', tamper_time: '0' }],
        tabTamper: [],
        tabAntistop: [],
        tabSensitiveWord: [],
        tabAbnormalStatusCode: [],
        bannerAntistop: [],
        bannerSensitiveWord: [],
        bannerAbnormalStatusCode: [],
        tamperDetails: [{
            first_time: '暂无信息',
            last_time: '暂无信息',
            number: '0',
            influence_url: '暂无信息',
            risk_image_url: []
        }],
        antistopDetails: [{
            first_time: '暂无信息',
            last_time: '暂无信息',
            number: '0',
            influence_url: '暂无信息',
            risk_image_url: []
        }],
        sensitiveWordDetails: [{
            first_time: '暂无信息',
            last_time: '暂无信息',
            number: '0',
            influence_url: '暂无信息',
            risk_image_url: []
        }],
        abnormalStatusCodeDetails: [{
            first_time: '暂无信息',
            last_time: '暂无信息',
            number: '0',
            influence_url: '暂无信息',
            risk_image_url: []
        }],
        /*弹框信息*/
        logStatus: '1',
        scanLog: {},
        tamperLog: {},
        sensitiveWordLog: {},
        keywordLog: {},
        abnormalStatusCodeLog: {}
    }
  },
  created() {
    this.getScancountData()
    this.getLoopholeListData({ level: '0' })
    this.getLoopholeListDetails()
    this.getChongQingChartsData()
    this.getSevenDateData()
    this.getTaskTotalList()
    this.getSensitiveWordView()
    this.getMonitorNumber()
    this.getFeatureCount()
    this.getTamperTop()
    setInterval(this.getNoticeLogStatus, 80000)
  },
  watch: {
  },
  mounted() {
    this.weekCheck()
    this.timeR()
    this.swiperRun()
    document.getElementById('loophole').style.display = 'block'
  },
  methods: {
    getNoticeLog(parmas) {
        Perception.getNoticeLog(parmas).then(response => {
            if (response.data.status.code = 1 && response.data.data) {
                const data = response.data.data
                switch (parmas.log_type) {
                    case 'scan_log':
                        this.scanLog.domain = data.domain
                        this.scanLog.level = data.level
                        this.scanLog.loophole_name = data.loophole_name
                        this.scanLog.updated_at = data.updated_at
                        this.scanLog.website_name = data.website_name
                        this.scanLog.influence_url = data.influence_url
                        this.logStatus = '1'
                    break
                    case 'tamper_log':
                        this.tamperLog.domain = data.domain
                        this.tamperLog.number = data.number
                        this.tamperLog.content = data.content
                        this.tamperLog.risk_url = data.risk_url
                        this.tamperLog.website_name = data.website_name
                        this.logStatus = '2'
                    break
                    // case 'monitor_log':
                    // break
                    case 'sensitive_word_log':
                        this.sensitiveWordLog.domain = data.domain
                        this.sensitiveWordLog.content = data.content
                        this.sensitiveWordLog.risk_url = data.risk_url
                        this.sensitiveWordLog.website_name = data.website_name
                        this.logStatus = '3'
                    break
                    case 'keyword_log':
                        this.keywordLog.domain = data.domain
                        this.keywordLog.content = data.content
                        this.keywordLog.risk_url = data.risk_url
                        this.keywordLog.website_name = data.website_name
                        this.logStatus = '4'
                    break
                    case 'abnormal_status_code_log':
                        this.abnormalStatusCodeLog.domain = data.domain
                        this.abnormalStatusCodeLog.content = data.content
                        this.abnormalStatusCodeLog.risk_url = data.risk_url
                        this.abnormalStatusCodeLog.website_name = data.website_name
                        this.logStatus = '5'
                    break
                    default:
                }
            }
        })
    },
    getNoticeLogStatus() {
        Perception.getNoticeLogStatus().then(response => {
            if (response.data.status.code = 1 && response.data.data) {
                const data = response.data.data
                const tamperTop = data.tamper_top //篡改top10
                const monitorCount = data.monitor_count //宕机统计
                const sensitiveWordCount = data.sensitive_word_count //敏感词统计
                const riskRanking = data.risk_ranking //风险排名
                const scanCount = data.scan_count //漏洞统计
                const tamperLog = data.tamper_log //篡改日志
                const monitorLog = data.monitor_log //宕机日志
                const scanLog = data.scan_log //扫描日志
                const sensitiveWordLog = data.sensitive_word_log //敏感词日志
                const keywordLog = data.keyword_log //关键字日志
                const abnormalStatusCodeLog = data.abnormal_status_code_log //异常状态码日志
                if (tamperTop === '1') {
                    this.getTamperTop()
                }
                if (monitorCount === '1') {
                    this.getMonitorNumber()
                }
                if (sensitiveWordCount === '1') {
                    this.getSensitiveWordView()
                }
                if (riskRanking === '1' || scanCount === '1') {
                    this.getScancountData()
                }
                /*弹框*/
                const tamperLogStatus = () => {
                    if (tamperLog === '1') {
                        this.getNoticeLog({ log_type: 'tamper_log' })
                        this.alarmPrompt('mimicryBox', 3000)
                    } else {
                        return
                    }
                }
                setTimeout(tamperLogStatus, 500)
                // if (monitorLog === '1') {
                //     this.getNoticeLog({ log_type: 'monitor_log' })
                // }
                const scanLogStatus = () => {
                    if (scanLog === '1') {
                        this.getNoticeLog({ log_type: 'scan_log' })
                        this.alarmPrompt('mimicryBox', 3000)
                    } else {
                        return
                    }
                }
                setTimeout(scanLogStatus, 4100)
                const sensitiveWordLogStatus = () => {
                    if (sensitiveWordLog === '1') {
                        this.getNoticeLog({ log_type: 'sensitive_word_log' })
                        this.alarmPrompt('mimicryBox', 3000)
                    } else {
                        return
                    }
                }
                setTimeout(sensitiveWordLogStatus, 8500)
                const keywordLogStatus = () => {
                    if (keywordLog === '1') {
                        this.getNoticeLog({ log_type: 'keyword_log' })
                        this.alarmPrompt('mimicryBox', 3000)
                    } else {
                        return
                    }
                }
                setTimeout(keywordLogStatus, 12500)

                const abnormalStatusCodeLogStatus = () => {
                    if (abnormalStatusCodeLog === '1') {
                        this.getNoticeLog({ log_type: 'abnormal_status_code_log' })
                        this.alarmPrompt('mimicryBox', 3000)
                    } else {
                        return
                    }
                }
                setTimeout(abnormalStatusCodeLogStatus, 16500)
                /*固定刷新*/
                this.getSevenDateData()//7天趋势
                this.getFeatureCount()//6个圈
                this.getChongQingChartsData()//重庆地图
            }
        })
    },
    swiperRun() {
        new Swiper('.swiper-container', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 30
        })
    },
    showLoopholeDetails(event, domain) {
        const eve = event.target.parentNode.parentNode.parentNode.getElementsByTagName('tr')
        const len = eve.length
        for (let i = 0; i < len; i++) {
            eve[i].className = ''
        }
        this.swiperRun()
        event.target.parentNode.parentNode.className = 'sensitize'
        const switchKey = this.tabPageId
        switch (switchKey) {
            case 'scan':
            this.getLoopholeListDetails({ id: domain })
            break
            case 'tamper':
            this.getLogcontentListDetail({ risk_type: '0', risk_domain: domain }, switchKey)
            break
            case 'keyword':
            this.getLogcontentListDetail({ risk_type: '2', risk_domain: domain }, switchKey)
            break
            case 'sensitiveWord':
            this.getLogcontentListDetail({ risk_type: '1', risk_domain: domain }, switchKey)
            break
            case 'abnormalStatusCode':
            this.getLogcontentListDetail({ risk_type: '3', risk_domain: domain }, switchKey)
            break
            default:
        }
    },
    mainWords(event, nameVal, type) {
        const ev = event.target
        const len = ev.parentNode.getElementsByTagName('div').length
        for (let i = 0; i < len; i++) {
            ev.parentNode.getElementsByTagName('div')[i].className = ''
        }
        ev.className = 'active'
        console.log(nameVal)
        let params
        switch (type) {
            case 'loophole':
                //漏洞
              this.getLoopholeListData({ level: nameVal })
              break
            case 'tamper':
                // 篡改
              break
            case 'antistop':
                //关键词
                if (nameVal !== '') {
                    params = {
                        content: nameVal,
                        type: 2
                    }
                } else {
                    params = {
                        type: 2
                    }
                }
              this.getLogcontentList(params, 'antistop')
              break
            case 'sensitiveWord':
                //敏感词
                if (nameVal !== '') {
                    params = {
                        content: nameVal,
                        type: 1
                    }
                } else {
                    params = {
                        type: 1
                    }
                }
              this.getLogcontentList(params, 'sensitiveWord')
              break
            case 'abnormalStatusCode':
                //错误码
                if (nameVal !== '') {
                    params = {
                        content: nameVal,
                        type: 3
                    }
                } else {
                    params = {
                        type: 3
                    }
                }
              this.getLogcontentList(params, 'abnormalStatusCode')
              break
            default:
        }
        this.swiperRun()
    },
    tabPageChange(id) {
      switch (id) {
        case 'loophole':
            //漏洞
          this.tabPageId = 'scan'
          break
        case 'tamper':
            // 篡改
          this.tabPageId = 'tamper'
          this.getLogcontentList({ type: 0 }, 'tamper')
          break
        case 'antistop':
            //关键词
          this.tabPageId = 'keyword'
          this.getLogcontentList({ type: 2 }, 'antistop')
          this.getContentByType({ type: 2 }, 'antistop')
          break
        case 'sensitiveWord':
            //敏感词
          this.tabPageId = 'sensitiveWord'
          this.getLogcontentList({ type: 1 }, 'sensitiveWord')
          this.getContentByType({ type: 1 }, 'sensitiveWord')
          break
        case 'abnormalStatusCode':
            //错误码
          this.tabPageId = 'abnormalStatusCode'
          this.getLogcontentList({ type: 3 }, 'abnormalStatusCode')
          this.getContentByType({ type: 3 }, 'abnormalStatusCode')
          break
        default:
      }
        const eventId = document.getElementById(id)
        const banner = document.getElementById(id + '_banner')
        for (let i = 0; i < 5; i++) {
            eventId.parentNode.getElementsByClassName('tabContent')[i].style.visibility = 'hidden'
            banner.parentNode.getElementsByTagName('div')[i].className = 'tab_title'
        }
        eventId.style.visibility = 'visible'
        banner.className = document.getElementById(id + '_banner').className + ' ' + 'active'
        this.swiperRun()
    },
    chartsOfChongQingMap() {
      if (!document.getElementById('areaMap')) {
        return
      }
      this.areaCharts = Echarts.init(document.getElementById('areaMap'))
        Echarts.registerMap('重庆', areaJson)
        this.areaCharts.setOption({
            tooltip: {
                trigger: 'item',
                formatter(params) {
                    const  res = '重庆态势感知<br/>' + params.name + ': ' + (params.value ? params.value : 0) + '次'
                    return res
                }
            },
            layoutCenter: ['38%', '48%'],
            layoutSize: 1100,
            series: [{
                type: 'map',
                map: '重庆',
                selectedMode:'single',
                roam: true,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter(params) {
                           const value = params.value ? params.value : 0
                           return params.name + '(' + value + '次)'
                        },
                        textStyle: {
                           color: '#444'
                        }
                    }
                },
                itemStyle:{
                    normal:{
                        areaColor: 'rgba(47, 47, 47, 0.4)',
                        borderColor: '#424242',
                        label:{
                            show:true
                        }
                    },
                    emphasis:{
                        areaColor: '#444',
                        borderColor: 'rgba(0,0,0,0)',
                        borderWidth: 1,
                        // areaStyle: {
                        //     color: 'rgba(68, 68, 68, 0.8)'
                        // },
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:this.chongqingData
            }]
          })
    },
    chartsOfTrend() {
        //趋势图
      this.eventTrendChart = Echarts.init(document.getElementById('trendEvent'))
      this.eventTrendChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
              splitLine: false,
              type : 'category',
              boundaryGap : false,
              data : this.sevensjqsData.time
            }
        ],
        yAxis : [
            {
              type : 'value',
              splitLine: false,
              scale: false,
              axisLine: {
                lineStyle: {
                    color: '#020202'
                }
              }
            }
        ],
        series : [
            {
              name: '事件趋势',
              type: 'line',
              stack: '总量',
              symbol: 'none',
              itemStyle : {
                normal : {
                  color:'#2d90e6',
                  lineStyle:{
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(97, 0, 153, 0.5)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(0, 198, 255, 0.5)' // 100% 处的颜色
                        }]
                    }
                  }
                }
              },
              areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(97, 0, 153, 0.3)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(0, 198, 255, 0.3)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
              },
              data: this.sevensjqsData.value
            }
        ]
      })
    },
    chartsOfSensitiveWords() {
        //敏感词
      this.sensitiveWordsChart = Echarts.init(document.getElementById('sensitiveWordsChart'))
      this.sensitiveWordsChart.setOption({
        tooltip: {
            trigger: 'axis',
            formatter(params) {
               const value = params[0].value[0] ? params[0].value[0] : 0
               return params[0].value[3] + '(' + value + '次)'
            }
        },
        xAxis: {
            splitLine: false,
            axisLine: {
                lineStyle: {
                    color: '#5a5a5a'
                }
            }
        },
        yAxis: {
            splitLine: false,
            scale: false,
            axisLine: {
                lineStyle: {
                    color: '#020202'
                }
            }
        },
        series: [{
            name: '2015',
            data: this.sensitiveWordsChartSeries,
            type: 'scatter',
            symbolSize(data) {
                return Math.sqrt(data[2]) / 5e2
            },
            showAllSymbol: true,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter(params) {
                        return params.data[3]
                    },
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: (0.4, 0.3, 0.2, [{
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                    }, {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                    }])
                }
            }
        }]
      })
    },
    chartsOfTheRing(id, name, val) {
        //右上角圆环图
      this.chartsOfTheRingChart = Echarts.init(document.getElementById(id))
      this.chartsOfTheRingChart.setOption({
        series: [{
            type: 'pie',
            radius: ['55%', '75%'],
            silent: true,
            data: [{
                value: 1,
                itemStyle: {
                    normal: {
                        color: '#050f58',
                        // borderColor: '#162abb',
                        // borderWidth: 2,
                        shadowBlur: 50,
                        shadowColor: 'rgba(21,41,185,.75)'
                    }
                }
            }]
        }, {
            type: 'pie',
            radius: ['55%', '75%'],
            silent: true,
            label: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 1,
                itemStyle: {
                    normal: {
                        color: '#050f58',
                        shadowBlur: 50,
                        shadowColor: 'rgba(21,41,185,.75)'
                    }
                }
            }]
        }, {
            name: '占比',
            type: 'pie',
            radius: ['59%', '72%'],
            hoverAnimation: false,
            data: [{
                value: val,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 15,
                                fontWeight: 'bold'
                            },
                            position: 'center'
                        },
                        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(27, 123, 206, 1)'
                        }, {
                            offset: 1,
                            color: 'rgba(103, 53, 254, 1)'
                        }])
                    }
                }
            }, {
                value: (100 - val),
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 15,
                                fontWeight: 'bold'
                            },
                            position: 'center'
                        },
                        color: '#21242c'
                    }
                }
            }]
        }, {
            name: '',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: [200, 200],
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: 0,
                label: {
                    normal: {
                        formatter: val + '%',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    }
                }
            }]
        }]
      })
    },
    abnormalWebsite() {
        this.chartsOfTheRing('abnormalWebsite', '异常网站', this.featureCount[0].value)
    },
    highRiskOf() {
        this.chartsOfTheRing('highRiskOf', '高风险占比', this.featureCount[1].value)
    },
    tamperingWith() {
        this.chartsOfTheRing('tamperingWith', '篡改', this.featureCount[2].value)
    },
    sensitiveWords() {
        this.chartsOfTheRing('sensitiveWords', '敏感词', this.featureCount[3].value)
    },
    hijackingOfDNS() {
        this.chartsOfTheRing('hijackingOfDNS', 'DNS劫持', this.featureCount[4].value)
    },
    outage() {
        this.chartsOfTheRing('outage', '宕机', this.featureCount[5].value)
    },
    chartsOfAttackTimes() {
        //漏洞次数
      const vm = this
      if (!document.getElementById('areaMap')) {
        return
      }
      this.globalDistributionChart = Echarts.init(document.getElementById('areaMap'))
      this.globalDistributionChart.setOption({

      })
    },
    weekCheck() {
        const d = new Date()
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const chinaWeek = ['日', '一', '二', '三', '四', '五', '六']
        this.week = weekday[d.getDay()]
        this.chinaWeek = chinaWeek[d.getDay()]
    },
    timeR() {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        this.years = year + '.' + ((month > 9) ? month : (0 + '' + month))  + '.' + ((day > 9) ? day : (0 + '' + day))
        this.hours = ((hours > 9) ? hours : (0 + '' + hours)) + ':' + ((minutes > 9) ? minutes : (0 + '' + minutes)) + ':' + ((seconds > 9) ? seconds : (0 + '' + seconds))
        setTimeout(this.timeR, 1000)
    },
    alarmPrompt(boxid, time) {
        document.getElementById(boxid).style.display = 'block'
        const alarmPromptNone = function() {
            document.getElementById(boxid).style.display = 'none'
        }
        // this.fadeout('mimicryBox', 1)
        //document.getElementById('mimicryBox').style.transition = 'opacity 0.1s ease-in-out'
        setTimeout(alarmPromptNone, time)
    },
    closeMimicryBox() {
        document.getElementById('mimicryBox').style.display = 'none'
    },
    //读取透明度
    setOpacity(elem, level) {
        if (elem.filters) {
            elem.style.filter = 'alpha(opacity=' + level + ')'
        } else {
            elem.style.opacity = level / 100
        }
    },
    //渐现
    fadeIn(elem, speed) {
        const e = typeof elem === 'string' ? document.getElementById(elem) : elem
        this.setOpacity(e, 0)
        e.style.display = 'block'
        let i = 0
        const dg = () => {
            if (i <= 100) {
                (() => {
                    const pos = i
                    setTimeout((() => { this.setOpacity(e, pos) }), (pos + 1) * speed)
                })()
                i += 1
                dg()
            }
        }
        dg()
    },
    //渐隐
    fadeout(elem, speed) {
        const e = typeof elem === 'string' ? document.getElementById(elem) : elem
        this.setOpacity(e, 1)
        let i = 0
        const dg = () => {
            if (i <= 100) {
                (() => {
                    const pos = i
                    setTimeout((() => {this.setOpacity(e, (100 - pos))}), (pos + 1) * speed)
                })()
                i += 1
                dg()
            } else if (i = 0) {
                e.style.display = 'none'
            }
        }
        dg()
    },
    getScancountData() {
        Perception.getScancount().then(response => {
        if (response.data.status.code = 1 && response.data.data) {
          const data = response.data.data
          if (data === '') {
            this.riskRanking = [{ loophole_type: '暂无数据', count_number: '0', influence_page: '0' }]
            this.loopholeCount = [{
                domain: '暂无数据',
                level_high: '0',
                level_middle: '0',
                level_low: '0'
            }]
          } else {
            this.riskRanking = data.risk_ranking
            this.loopholeCount = data.loophole_count
          }
        } else {
            this.riskRanking = [{ loophole_type: '暂无数据', count_number: '0', influence_page: '0' }]
            this.loopholeCount = [{
                domain: '暂无数据',
                level_high: '0',
                level_middle: '0',
                level_low: '0'
            }]
        }
      })
    },
    getLoopholeListData(parmas) {
        Perception.getLoopholeList(parmas).then(response => {
        if (response.data.status.code = 1 && response.data.data) {
          const data = response.data.data
          this.LoopholeData = data.list
        }
      })
    },
    getLoopholeListDetails(parmas) {
        Perception.getLoopholeListDetails(parmas).then(response => {
        if (response.data.status.code = 1 && response.data.data) {
          const data = response.data.data
          this.loopholeListDataDetails.influence_url = data.influence_url
          this.loopholeListDataDetails.level = data.level
          this.loopholeListDataDetails.loophole_desc = data.loophole_desc
          this.loopholeListDataDetails.loophole_name = data.loophole_name
          this.loopholeListDataDetails.solution = data.solution
        }
      })
    },
    getChongQingChartsData() {
      Perception.getChongQingChartsData().then(response => {
        if (response.data.status.code = 1 && response.data.data) {
          const data = response.data.data
          this.chongqingData = data
        } else {
          this.chongqingData = []
        }
      }).then(res => {
        this.$nextTick(function(e) {
          this.chartsOfChongQingMap('chongqing')
        })
      })
    },
    timeForSimplify(date) {
        const currentDate = new Date(date)
        const videosInformation = (currentDate.getMonth() + 1) + '/' + currentDate.getDate()
        return videosInformation
    },
    getSevenDateData() {
      Perception.getSevenDateData().then(response => {
        if (response.data.status.code = 1 && response.data.data) {
          const data = response.data.data
          const len = data.length
          for (let i = 0; i < len; i++) {
            this.sevensjqsData.time[i] = this.timeForSimplify(data[i].date)
            this.sevensjqsData.value[i] = data[i].value
          }
        } else {
            this.sevensjqsData.value = ['0', '0']
            this.sevensjqsData.time = [0, 0]
        }
      }).then(res => {
        this.$nextTick(function(e) {
          this.chartsOfTrend('trendEvent')
        })
      })
    },
    getTaskTotalList() {
      Perception.getTaskTotalList().then(response => {
        if (response.data.status.code = 1 && response.data.data) {
            const data = response.data.data
            if (data.length < 1) {
                this.taskTotalList = [{
                    type: '0',
                    total_number: '0'
                },
                {
                    type: '1',
                    total_number: '0'
                },
                {
                    type: '2',
                    total_number: '0'
                },
                {
                    type: '3',
                    total_number: '0'
                },
                {
                    type: '4',
                    total_number: '0'
                },
                {
                    type: '5',
                    total_number: '0'
                }]
            } else {
                for (let i = 0; i < data.length; i++) {
                  this.taskTotalList[i] = response.data.data[i].total_number
              }
            }
        }
      })
    },
    getSensitiveWordView() {
      Perception.getSensitiveWordView().then(response => {
        if (response.data.status.code = 1 && response.data.data) {
            const data = response.data.data
            const len = data.length
            const y = [60.8, 78.7, 85.9, 78.5, 40.8]
            const lagerData = [888489430, 359399270, 550345700, 213895620, 239689730]
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    this.sensitiveWordsChartSeries[i] = [Number(data[i].value), y[i], lagerData[i], data[i].name]
                }
            } else {
                this.sensitiveWordsChartSeries = []
            }
        }
      }).then(res => {
        this.$nextTick(function(e) {
          this.chartsOfSensitiveWords('sensitiveWordsChart')
        })
      })
    },
    getMonitorNumber() {
      Perception.getMonitorNumber().then(response => {
        if (response.data.status.code = 1 && response.data.data) {
            if (response.data.data.total === '') {
                this.monitorNumbe = 0
            } else {
                this.monitorNumbe = response.data.data.total
            }
        }
      })
    },
    getFeatureCount() {
      Perception.getFeatureCount().then(response => {
        if (response.data.status.code = 1 && response.data.data) {
            this.featureCount = response.data.data
        }
      }).then(res => {
        this.$nextTick(function(e) {
          this.abnormalWebsite('abnormalWebsite')
          this.highRiskOf('highRiskOf')
          this.tamperingWith('tamperingWith')
          this.sensitiveWords('sensitiveWords')
          this.hijackingOfDNS('hijackingOfDNS')
          this.outage('outage')
        })
      })
    },
    getTamperTop() {
      Perception.getTamperTop().then(response => {
        if (response.data.status.code = 1 && response.data.data) {
            if (response.data.data.length < 1) {
                this.tamperTop = [{ tamper_url: '暂无数据', tamper_time: '0' }]
            } else {
                this.tamperTop = response.data.data
            }
        }
      })
    },
    getLogcontentList(parmas, type) {
      Perception.getLogcontentList(parmas).then(response => {
        if (response.data.status.code = 1 && response.data.data) {
            const data = response.data.data
            if (data.length < 1) {
                return
            } else {
                switch (type) {
                    case 'tamper':
                        // 篡改
                        this.getLogcontentListDetail({ risk_type: 0, risk_domain: data.list[0].domain }, type)
                        this.tabTamper = data.list
                      break
                    case 'antistop':
                        //关键词
                        this.getLogcontentListDetail({ risk_type: 2, risk_domain: data.list[0].domain }, type)
                        this.tabAntistop = data.list
                      break
                    case 'sensitiveWord':
                        //敏感词
                        this.getLogcontentListDetail({ risk_type: 1, risk_domain: data.list[0].domain }, type)
                        this.tabSensitiveWord = data.list
                      break
                    case 'abnormalStatusCode':
                        //错误码
                        this.getLogcontentListDetail({ risk_type: 3, risk_domain: data.list[0].domain }, type)
                        this.tabAbnormalStatusCode = data.list
                      break
                    default:
                }
            }
        }
      })
    },
    getLogcontentListDetail(parmas, type) {
      Perception.getLogcontentListDetail(parmas).then(response => {
        if (response.data.status.code = 1 && response.data.data) {
            const data = response.data.data
            this.swiperRun()
            if (data.length < 1) {
                return
            } else {
                switch (type) {
                    case 'tamper':
                        // 篡改
                        this.tamperDetails = data
                      break
                    case 'antistop':
                        //关键词
                        this.antistopDetails = data
                      break
                    case 'sensitiveWord':
                        //敏感词
                        this.sensitiveWordDetails = data
                      break
                    case 'abnormalStatusCode':
                        //错误码
                        this.abnormalStatusCodeDetails = data
                      break
                    default:
                }
            }
        }
      })
    },
    getContentByType(parmas, type) {
        Perception.getContentByType(parmas).then(response => {
            if (response.data.status.code = 1 && response.data.data) {
                const data = response.data.data
                if (data.length < 1) {
                    return
                } else {
                    switch (type) {
                        case 'antistop':
                            //关键词
                            this.bannerAntistop = data
                          break
                        case 'sensitiveWord':
                            //敏感词
                            this.bannerSensitiveWord = data
                          break
                        case 'abnormalStatusCode':
                            //错误码
                            this.bannerAbnormalStatusCode = data
                          break
                        default:
                    }
                }
            }
        })
    }
  }
}
</script>
<style scoped>
    .lineGradient {
        width: 150px;
        height: 10px;
        display: inline-block;
        border-radius: 5px;
    }
    .lineHigh {
        background: linear-gradient(to right, #ff5f00, #ff0000);
    }
    .lineMiddle {
        background: linear-gradient(to right, #00c6ff, #2139b7);
    }
    .lineLow {
        background: linear-gradient(to right, #50ec91, #52eb64);
    }
</style>
<style lang="css">
  .sensitize {
    background: rgba(0, 132, 255, 0.5);
    color: #fff;
    height: 26px;
  }
  .high {
    color: #ff0042;
  }
  .middle {
    color: #0b89c3;
  }
  .low {
    color: #00c295;
  }
  .areaMapBackground {
    width: 100%;
    height: 1080px;
  }
  .areaMap {
    position: absolute;
    height: 1080px;
    width: 100%;
    z-index: 2;
  }
  .areaMap #areaMap {
    width: 100%;
    height: 1080px;
  }
  .border {
    border: 1px solid skyblue;
  }
  .left {
    position: absolute;
    height: 100vh;
    padding-left: 10px;
  }
  .left1 {
    height: 160px;
    background: url('./assets/img/logo.png') no-repeat 0 0;
    width: 600px;
    color: #e3e3e4;
    display: inline-block;
  }
  .left1 .years {
    display: block;
    padding-left: 2%;
    padding-top: 18%;
  }
  .left1 .hours {
    color: #e3e3e4;
    font-size: 32px;
    padding-left: 22%;
    display: block;
    margin-top: -7%;
  }
  .chinaWeek {
    display: block;
    margin-left: 17%;
    margin-top: -7%;
  }
  .week {
    font-size: 12px;
  }
  .left2 {
    height: 210px;
    width: 280px;
    position: absolute;
    z-index: 3;
    margin-top: 20px;
  }
  .left3 {
    height: 190px;
    width: 270px;
    position: absolute;
    z-index: 3;
    margin-top: 240px;
  }
  .left4 {
    height: 215px;
    width: 270px;
    position: absolute;
    z-index: 3;
    margin-top: 435px;
  }
  .left5 {
    height: 265px;
    width: 343px;
    position: absolute;
    z-index: 3;
    margin-top: 620px;
  }
  .title {
    color: #e3e3e4;
    font-size: 16px;
  }
  /*事件趋势样式*/
  .eventTrend {
    background: url('./assets/img/sjqs.png') no-repeat 0 0;
  }
  #trendEvent {
    height: 200px;
    width: 280px;
  }
  /*宕机*/
  .downTime {
    background: url('./assets/img/djcs.png') no-repeat 0 0;
  }
  .imgPostion img{
    margin-top: 30px;
  }
  .downTime .max {
    color: rgb(219, 245, 255);
    font-size: 12px;
    display: block;
    margin-left: 71px;
    margin-top: -130px;
  }
  .downTime .downTimesValue, .downTime .downTimesUnit {
    font-size: 36px;
    color: #0084ff;
    font-style: italic;
  }
  .downTime .downTimesUnit{
    font-size: 22px;
  }
  .downTime .downTimes {
    margin-left: 50px;
    margin-top: -95px/*10px*/;
  }
  /*敏感词*/
  .sensitiveWords {
    background: url('./assets/img/mgc.png') no-repeat 0 0;
  }
  #sensitiveWordsChart {
    height: 200px;
    width: 260px;
  }
  /*风险排名*/
  .riskRankingTable table, .tampering table, .distribution table {
    width: 100%;
    color: #e3e3e4;
    font-size: 12px;
    border-collapse: collapse;
  }
  .riskRankingTable table>thead>tr>td, .tampering table>thead>tr>td, .distribution table>thead>tr>td {
    font-size: 14px;
  }
  .riskRankingTable table thead, .tampering table thead, .distribution table thead {
    border: 1px solid #1b3953;
    background: rgba(0, 132, 255, 0.2);
    color: #017ff5;
    padding: 5px 0;
    display:block;
  }
  .riskRankingTable table>tbody>tr>td, .tampering table>tbody>tr>td, .distribution table>tbody>tr>td {
    border: 1px solid rgba(0, 0, 0, 0.4);
    background: rgba(49, 49, 49, 0.3);
    padding: 2px 0;
  }
  .riskRankingTable table>tbody, .tampering table>tbody, .distribution table>tbody {
    margin-top: 2px;
  }
  .riskRankingTable table>tbody>tr>td:nth-child(2),
  .riskRankingTable table>thead>tr>td:nth-child(2),
  .riskRankingTable table>tbody>tr>td:nth-child(3),
  .riskRankingTable table>thead>tr>td:nth-child(3)  {
    text-align: right;
    padding-right: 3px;
    width: 85px;
  }
  .riskRankingTable table>tbody>tr>td:nth-child(1) span,
  .riskRankingTable table>thead>tr>td:nth-child(1) span {
    padding-left: 3px;
    width: 170px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .riskRankingTable table>tbody>tr:hover, .tampering table>tbody>tr:hover, .distribution table>tbody>tr:hover {
    background: rgba(49, 49, 49, 0.8);
    cursor: pointer;
    width: 350px;
    height: 26px;
  }
  .riskRankingTable tbody {
    height: 230px;
    overflow-y: scroll;
    display:block;
  }
  .tampering tbody, .distribution tbody {
    display:block;
  }
  .tampering, .distribution {
    margin-top: -3px;
  }
  /*tampering*/
  .tampering table>tbody>tr>td:nth-child(1) span,
  .tampering table>thead>tr>td:nth-child(1) span,
  .distribution table>tbody>tr>td:nth-child(1) span,
  .distribution table>thead>tr>td:nth-child(1) span {
    padding-left: 3px;
    width: 200px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tampering table>tbody>tr>td:nth-child(2),
  .tampering table>thead>tr>td:nth-child(2) {
    text-align: right;
    padding-right: 3px;
    width: 150px;
  }
  /*distribution*/
  .distribution table>tbody>tr>td:nth-child(2),
  .distribution table>thead>tr>td:nth-child(2),
  .distribution table>tbody>tr>td:nth-child(3),
  .distribution table>thead>tr>td:nth-child(3),
  .distribution table>tbody>tr>td:nth-child(4),
  .distribution table>thead>tr>td:nth-child(4) {
    text-align: right;
    padding-right: 3px;
    width: 50px;
  }
  .distribution table>tbody>tr>td:nth-child(2) {
    color: #ff0042;
  }
  .distribution table>tbody>tr>td:nth-child(3) {
    color: #0b89c3;
  }
  .distribution table>tbody>tr>td:nth-child(4) {
    color: #00c295;
  }
  /*right*/
  .right {
    position: relative;
    float: right;
  }
  .right1 {
    height: 165px;
    width: 760px;
    position: absolute;
    z-index: 3;
    margin-left: -760px;
  }
  .right1_title {
    width: 760px;
    position: absolute;
    z-index: 3;
    height: 30px;
    margin-top: 135px;
    margin-left: -760px;
  }
  .right2 {
    height: 285px;
    width: 350px;
    float: right;
    margin-top: 170px;
    margin-left: -360px;
    position: absolute;
    z-index: 3;
  }
  .right3 {
    height: 285px;
    width: 350px;
    clear: both;
    float: right;
    margin-top: 465px;
    margin-left: -360px;
    position: absolute;
    z-index: 3;
  }
  .right4 {
    height: 318px;
    width: 930px;
    clear: both;
    float: right;
    z-index: 888;
    position: absolute;
    margin-top: 760px;
    margin-left: -940px;
  }
  .chartsBar {
    width: 120px;
    height: 120px;
  }
  .chartsBar_title {
    width: 120px;
    height: 30px;
  }
  .chartsBarWebsite {
    width: 160px;
    height: 160px;
  }
  .right1 div ,.right1_title div{
    float: left;
  }
  .right1_title div {
    text-align: center;
    color: #d8d8d8;
    margin-top: -29px;
  }
  .chartsBarWebsite_title {
    width: 160px;
    height: 30px;
    margin-top: 5px!important;
  }
  /*滚动条样式（不兼容火狐）*/
  ::-webkit-scrollbar-track-piece {
    background-color:#f5f5f5;
    border-left:1px solid #d2d2d2;
  }
  ::-webkit-scrollbar{
    width:5px;
    height:5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color:#c2c2c2;
    background-clip:padding-box;
    border:1px solid #979797;
    min-height:28px;
  }
  ::-webkit-scrollbar-thumb:hover {
    border:1px solid #636363;
    background-color:#929292;
  }
</style>
<style>
    /*tab pages*/
    .tab_banner {
        color: #e3e3e4;
        background: rgba(34, 34, 34, 0.4);
        height: 35px;
    }
    .tab_title {
        width: 186px;
        display: inline-block;
        float: left;
        text-align: center;
        font-size: 14px;
        padding: 8px 0;
        cursor: pointer;
        border-bottom: 2px solid #0171dc;
    }
    .right4 .tab_content {
        height: 280px;
        color: #e3e3e4;
    }
    .tab_content>div {
        height: 280px;
        background: rgba(0, 132, 255, 0.2);
        color: #017ff5;
    }
    .active {
        background: rgba(0, 132, 255, 0.2);
        color: #017ff5;
        border: 2px solid #0171dc;
        border-bottom: none;
        display: block;
    }
    .loophole_div, .antistop_div {
        width: 124px;
        height: 100%;
        display: inline-block;
    }
    .loopholeDiv, .antistopDiv {
        /*padding-top: 10px;*/
        margin-left: 10px;
    }
    .loophole_div .loopholeDiv>div, .antistop_div .antistopDiv>div {
        line-height: 33px;
        width: 100%;
        text-align: center;
        cursor: pointer;
        margin-top: 10px;
    }
    .loophole_div .active, .antistop_div .active {
        border: 2px solid #0171dc;
        border-right: none;
    }
    .antistop_div {
        height: 275px;
        overflow-y: scroll;
    }
    .loopholeTable_div, .loophole_detials, .tamper_detials, .antistopTable_div, .antistop_detials {
        display: inline-block;
        position: absolute;
        float: left;
        margin-left: 20px;
        margin-top: 10px;
    }
    .loopholeTable_div, .antistopTable_div {
        width: 430px;
    }
    .tamperTable_div {
        width: 450px;
        display: inline-block;
    }
    .tamperTable_div table {
        margin-top: 10px;
        display: inline-block;
        margin-left: 10px;
    }
    .antistopTable_div tbody,
    .loopholeTable_div tbody,
    .tamperTable_div tbody {
        background: rgba(0, 132, 255, 0.1);
    }
    .antistopTable_div table>thead>tr>td:nth-child(1),
    .antistopTable_div table>tbody>tr>td:nth-child(1),
    .loopholeTable_div table>thead>tr>td:nth-child(1),
    .loopholeTable_div table>tbody>tr>td:nth-child(1) {
        width: 200px;
        padding-left: 3px;
    }
    .tamperTable_div table>thead>tr>td:nth-child(1),
    .tamperTable_div table>tbody>tr>td:nth-child(1) {
        width: 360px;
        padding-left: 3px;
    }
    .tamperTable_div table>thead>tr>td:nth-child(2),
    .tamperTable_div table>tbody>tr>td:nth-child(2) {
        width: 190px;
        padding-left: 3px;
        text-align: right;
    }
    .antistopTable_div table>thead>tr>td:nth-child(2),
    .antistopTable_div table>tbody>tr>td:nth-child(2),
    .loopholeTable_div table>thead>tr>td:nth-child(2),
    .loopholeTable_div table>tbody>tr>td:nth-child(2) {
        text-align: left;
        padding-left: 3px;
        width: 150px;
    }
    .wap {
        width: 130px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .detailsUrl {
        display: block;
        word-break: break-all;
    }
    .wapDmain {
        width: 200px;
    }
    #loopholeTable .low, #loopholeTable .middle, #loopholeTable .high {
        float: left;
    }
    .antistopTable_div table>thead>tr>td:nth-child(3),
    .antistopTable_div table>tbody>tr>td:nth-child(3),
    .loopholeTable_div table>thead>tr>td:nth-child(3),
    .loopholeTable_div table>tbody>tr>td:nth-child(3) {
        text-align: right;
        padding-right: 3px;
        width: 80px;
    }
    .antistopTable_div table>thead>tr:hover,
    .loopholeTable_div table>tbody>tr:hover,
    .tamperTable_div table>tbody>tr:hover {
        background: rgba(0, 132, 255, 0.4);
        background: url('./assets/img/polygon.png') no-repeat 10 0;
    }
    .loophole_detials, .tamper_detials, .antistop_detials {
        height: 260px;
        width: 340px;
        overflow-y: scroll;
        margin-left: 460px;
        background: rgba(0, 132, 255, 0.3);
        padding-left: 10px;
    }
    .tamper_detials{
        margin-left: 20px;
        margin-top: 10px;
        height: 265px;
        width: 455px;
    }
    .polygon {
        padding-top: 3px;
        background: url('./assets/img/polygon.png') no-repeat 0 6px;
        padding-left: 16px;
        color: #e3e3e4;
    }
    .detailsTitle {
        font-size: 12px;
        display: inline-block;
        width: 76px;
        text-align: center;
        line-height: 30px;
    }
    .loophole_detials_content {
        font-size: 12px;
        width: 320px;
    }
    .detailsContent {
        font-size: 12px;
        width: 245px;
        display: inline-block;
        float: right;
        margin-top: -25px;
        color: #e3e3e4;
    }
    .tamper_detials_content {
        width: 430px;
    }
    .tamper_detials_content .detailsContent,
    .antistop_detials_content .detailsContent {
        width: 100%;
        padding-left: 100px;
    }
    .tamper_detials_content .detailsTitle, .antistop_detials_content .detailsTitle {
        width: 100px;
        text-align: left;
        padding-left: 10px;
    }
    .phoneSize img{
        width: 85px;
        height: 60px;
        border: 1px solid #0171dc;
        margin-left: 5px;
    }
</style>
<style scoped>
    /*swiper*/
    .swiper-container {
        width: 100%;
        height: 62px;
        margin: 20px auto;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        width: 85px!important;
        margin-left: 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .append-buttons {
        text-align: center;
        margin-top: 20px;
    }
    .append-buttons a {
        display: inline-block;
        border: 1px solid #007aff;
        color: #007aff;
        text-decoration: none;
        padding: 4px 10px;
        border-radius: 4px;
        margin: 0 10px;
        font-size: 13px;
    }
    .swiper-wrapper, .swiper-container {
        z-index: 889!important;
    }
    .swiper-pagination, .swiper-button-next, .swiper-button-prev {
        z-index: 999!important;
    }
    .phone img{
        width: 85px;
        height: 62px;
    }
    .swiper-button-next, .swiper-button-prev {
        position: absolute;
        top: 60%!important;
        width: 28px!important;
        height: 25px!important;
        margin-top: -22px;
        z-index: 10;
        cursor: pointer;
        background-size: 27px 44px;
        background-position: center;
        background-repeat: no-repeat;
    }
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
        left: 0px!important;
    }
</style>
<style>
    .warningDetails>div {
        width: 420px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    #tamper, #antistop, #sensitiveWord, #abnormalStatusCode {
        visibility: hidden;
        margin-top: -280px;
    }
    .mimicryBox {
        background: rgba(0, 0, 0, 0);
        width: 100%;
        height: 1080px;
        z-index: 9999999;
        position: absolute;
        display: none;
    }
    .mimicryBox_body {
        height: 410px;
        width: 644px;
        margin-left: 32%;
        margin-top: 12%;
        background: url('./assets/img/alarmPrompt.png') no-repeat 0 0;
    }
    .cursor {
        cursor: pointer;
    }
    .closeMimicryBox {
        float: right;
    }
    .timeOfOccurrence {
        color: #7b6262;
        font-size: 12px;
    }
    .beforeTime {
        color: #fdc2cc;
        font-size: 20px;
    }
    .warningDomain {
        color: #fdc2cc;
        font-size: 20px;
    }
    .warningInfo {
        color: #c4c4c4;
        font-size: 22px;
    }
    .titleOfWarning {
        height: 130px;
    }
    .titleOfWarning1 {
        margin-left: 75px;
        margin-top: 35px;
        display: inline-block;
    }
    .titleOfWarning2 {
        display: inline-block;
        float: right;
        margin-top: 45px;
    }
    .warningTitle {
        font-size: 14px;
        color: #d9d9d9;
        padding-left: 75px;
        display: inline-block;
        position: absolute;
    }
    .warningDetails {
        font-size: 16px;
        color: #fff;
        margin-left: 180px;
    }
    .warningDiv {
        height: 280px;
    }
    .warningDiv>div {
        margin-top: 20px;
    }
</style>
