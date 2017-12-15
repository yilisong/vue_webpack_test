export const cloudhostDoc = {
  documents: {
    title: '基础云计算',
    subTitle:
      '配备全SSD高性能的弹性计算服务，配备基础安全防御能力，旨在为客户提供安全、稳定、高性价比的基础云计算服务，帮助客户有效降低软硬件成本、简化IT运维工作。'
  },
  advantageDocument: [
    {
      icon: 'stabilize',
      title: '稳定可靠',
      info:
        '基于分布式集群智能调度系统，实时监控主机运行状况，确保99.95%的主机可用性、99.999% 的数据可靠性、以及99.999%的网络可用性。'
    },
    {
      icon: 'secure',
      title: '基础安全',
      info:
        '根据客户信誉免费分配DDoS基础清洗能力，支持实时监控和告警；不同租户间进行完全网络隔离，确保数据安全。依托超级流控引擎可配置灵活的网络安全策略组。'
    },
    {
      icon: 'solveAll',
      title: '一站式解决方案',
      info: '免费提供定制化解决方案咨询，基础云计算无缝搭配YUNDUN丰富的云产品，共同为您的业务发展保驾护航。'
    },
    {
      icon: 'flexible',
      title: '灵活弹性',
      info: '支持灵活选购CPU、内存、带宽配置，可根据业务需求随时升级配置。'
    },
    {
      icon: 'highPerformance',
      title: '高性能',
      info: 'G级网络下行带宽，免费提供50G系统磁盘，配备全SSD磁盘，满足用户不同业务场景需求。'
    },
    {
      icon: 'professional',
      title: '专家运维',
      info: '资深运维团队，保证服务稳定安全，7x24x365快速响应。'
    },
    {
      icon: 'personalize',
      title: '私有云部署',
      info:
        '私有云是YUNDUN为满足企业客户单独的云计算平台需求，高效物理机资源利用，高效运维而构建的企业级专属私有云解决方案。提供安全可靠的云计算平台、优质的云数据中心或高性能的专属服务器。'
    }
  ],
  appDocument: {
    titles: ['电商、金融云', '游戏云', '政企云'],
    explains: [
      {
        icon: 'forFinance',
        text: [
          '结合YUNDUN安全基因，为电商、金融平台打造一站式解决方案，确保业务稳定、安全、快捷。',
          '针对电商、金融平台大促、活动等互联网业务量突增情况，提供秒级资源扩展伸缩服务，确保业务高可用、高稳定，且节约企业成本；支持用户灵活生成全量数据内容备份，保障业务数据安全。'
        ]
      },
      {
        icon: 'forGame',
        text: ['针对游戏行业的攻击现状，为游戏平台规划了专属的游戏集群。所有主机均配备SSD高效磁盘，提供超高读写性能，保障游戏体验流畅。']
      },
      {
        icon: 'forGovernment',
        text: [
          '为实现最严等级的数据隔离，实施对政务云和其他类型云的完全物理隔绝。通过利用全面精细的监控系统，帮助政企用户统一监控基础云计算运行状况。提供专属的运维、技术支持，确保政企云的安全性和稳定性。'
        ]
      }
    ]
  }
}

export const cloudmonitorDoc = {
  documents: {
    title: '云监控',
    subTitle:
      '云监控为应用系统提供全生命周期服务可用性闭环监控。监控涵盖HTTP/HTTPS/TCP等协议。支持云端宕机智能联动切换，有效提升运维效率。'
  },
  advantageDocument: [
    {
      icon: 'highPerformance',
      title: '高性能架构',
      info: '监控节点遍布全国，支持多种协议，支持海量监控任务。'
    },
    {
      icon: 'fault-tolerant',
      title: '容灾',
      info: '云内DNS解析联动，多种切换算法，保证业务稳定。'
    },
    {
      icon: 'accurate',
      title: '精准',
      info: '多线路，多监控点联合监控，保证监控结果准确无误报和漏报。'
    },
    {
      icon: 'notify',
      title: '多维告警',
      info: '支持短信、邮件、微信和URL回调等多种告警方式，保证告警信息准确送达。'
    }
  ],
  appDocument: {
    titles: ['多服务集中监控', '应用系统容灾'],
    explains: [
      {
        icon: 'focus-monitor',
        text: [
          '部分服务器在实际使用过程中会部署多种服务和多个应用系统，各服务均需做可用性监控，使得监控任务过多、不方便管理。',
          '云监控采用关联监控算法，仅需一次添加便可对使用同一服务器的多个应用服务进行统一监控，有效提升运维效率。'
        ]
      },
      {
        icon: 'app-fault-tolerant',
        text: [
          '应用服务宕机后如不及时处理，轻则导致服务无法使用，影响用户体验，重则导致名誉受损，用户流失。',
          '云监控提供云内宕机智能联动功能，被监控服务器出现宕机后，云内智能暂停解析线路或切换至备用服务器，整个过程对访客是透明无感知的。在保证服务的稳定性和高可用性的同时提升用户使用体验。'
        ]
      }
    ]
  }
}

export const cloudresolvingDoc = {
  documents: {
    title: '云解析',
    subTitle:
      '云解析免费为全网域名提供安全可靠的智能解析服务，拥有安全防护能力、海量请求处理能力和智能调度能力，致力于为用户提供高效、稳定、安全的解析体验。'
  },
  advantageDocument: [
    {
      icon: 'safeguard',
      title: '安全保障',
      info:
        '自研DNS解析引擎单机处理能力达1800万QPS，云DNS集群轻松处理亿级QPS，配合太极抗D DNS版防护方案，可抵抗各种针对域名解析的DDoS和查询攻击。'
    },
    {
      icon: 'reduce',
      title: '智能解析',
      info:
        '拥有最权威精准的IP地址库，支持分大洲、大区、省份、运营商、SEO等线路细分，同时支持用户自定义私有线路；智能识别访客来路，为访客提供最佳的访问解析地址，确保最快、最流畅的体验。'
    },
    {
      icon: 'dependence',
      title: '高效可靠',
      info: '全球领先的DNS集群技术，实现服务器宕机自动迁移，SLA最高达100%；解析仅需6S同步到所有DNS服务器，快如闪电。'
    },
    {
      icon: 'extend',
      title: '灵活扩展',
      info:
        '支持根据用户需求灵活扩展功能指标、定制专属DNS集群；同时云解析具有独家AP、CNAMEP负载均衡轮询解析协议，可满足同时使用多家CDN服务。'
    },
    {
      icon: 'protect',
      title: '劫持防护',
      info: '针对移动开发者推出HTTP DNS，使用HTTP协议进行域名解析，代替现有基于UDP的DNS协议具有域名防劫持、精准调度的特性。'
    }
  ],
  paramsDocument: [
    {
      icon: 'meal',
      title: '基础套餐',
      name: 'basic-service',
      parameters: [
        {
          describe: 'edition',
          subTitle: '功能',
          first: '免费版￥0/年',
          second: '畅享版￥390/年',
          third: '定制版咨询商务'
        },
        {
          subTitle: 'DNS Anti DDOS',
          first: '10万QPS 10Gpbs',
          second: '10万QPS 10Gbps',
          third: '升级为太极抗D DNS版'
        },
        {
          subTitle: '服务器集群',
          first: '基础服务器集群',
          second: 'VIP集群',
          third: '按需'
        },
        {
          subTitle: '智能线路',
          first: '省份/大区/大洲/国家/运营商/SEO',
          second: '省份/大区/大洲/国家/运营商/SEO',
          third: '省份/大区/大洲/国家/运营商/SEO'
        },
        {
          subTitle: '自动线路',
          first: '5',
          second: '5（可扩容）',
          third: '按需'
        },
        {
          subTitle: '最小TTL',
          first: '60',
          second: '60',
          third: '按需'
        },
        {
          subTitle: 'DNS负载均衡',
          first: '支持',
          second: '支持',
          third: '支持'
        },
        {
          subTitle: '子域名级别',
          first: '5级',
          second: '5级（可扩容）',
          third: '按需'
        },
        {
          subTitle: '泛解析',
          first: '支持',
          second: '支持',
          third: '支持'
        },
        {
          subTitle: '显/隐性URL转发',
          first: '5条',
          second: '5条（可扩容）',
          third: '按需'
        },
        {
          subTitle: '批量操作',
          first: '支持',
          second: '支持',
          third: '支持'
        },
        {
          subTitle: 'EDNS',
          first: '支持',
          second: '支持',
          third: '支持'
        },
        {
          subTitle: 'HTTP DNS',
          first: '不支持',
          second: '不支持',
          third: '按需'
        },
        {
          subTitle: '自定义NS名称',
          first: '不支持',
          second: '不支持',
          third: '按需'
        },
        {
          subTitle: '移动服务/微信端',
          first: '支持',
          second: '支持',
          third: '支持'
        },
        {
          subTitle: 'SLA',
          first: '99.9',
          second: '99.9',
          third: '100'
        },
        {
          subTitle: '客服支持',
          first: '5*8',
          second: '7*24',
          third: '专属客服经理'
        },
        {
          subTitle: '不限域名数量私有部署版',
          first: '不支持',
          second: '不支持',
          third: '按需'
        },
        {
          subTitle: '自有DNS系统高防IP转发',
          first: '不支持',
          second: '不支持',
          third: '按需'
        },
        {
          subTitle: '同解析域名绑定',
          first: '1条',
          second: '1条（可扩容）',
          third: '按需'
        },
        {
          subTitle: '解析统计',
          first: '标准',
          second: '标准',
          third: '详细'
        },
        {
          describe: 'oriented',
          subTitle: '服务对象',
          first: '非营利性、个人、小微网站',
          second: '个人、中小型网站',
          third: '支持企业、政府定制个人用户仅支持“自定义NS名称”定制'
        }
      ]
    },
    {
      icon: 'valadded',
      title: '增值内容',
      name: 'valadded-service',
      parameters: [
        {
          subTitle: '服务内容',
          first: '服务说明',
          second: '单位',
          third: '费用（元）'
        },
        {
          subTitle: '自定义线路',
          first: '对参加“安孵计划”用户免费赠送一条',
          second: '条/年',
          third: '300.00'
        },
        {
          subTitle: '自动线路',
          first: '自动识别A记录IP线路并作出智能解析',
          second: '条/年',
          third: '300.00'
        },
        {
          subTitle: '子域名级别',
          first: '在主域名下按层级扩展子域名，默认5级',
          second: '级/年',
          third: '300.00'
        },
        {
          subTitle: '同解析域名绑定',
          first: '是对相同内容的域名进行绑定解析，默认1条',
          second: '条/年',
          third: '350.00'
        }
      ]
    }
  ],
  appDocument: {
    titles: ['域名注册商／自建DNS备灾', '域名解析托管', '私有DNS防护'],
    explains: [
      {
        icon: 'register',
        text: [
          '域名注册商面临其用户注册的域名被攻击，导致平台公共DNS解析中断的问题。大型企业自建DNS服务器无防护能力。针对该类问题，云解析提供云备灾高防IP，宕机联动云端防护，保障DNS解析的高可用。'
        ]
      },
      {
        icon: 'resolver',
        text: [
          '对于终端用户，云解析提供DNS解析托管搭配HTTP DNS的解决方案，能有效解决域名解析攻击和防域名劫持。且支持用户定制专有域名名称，彰显企业形象。'
        ]
      },
      {
        icon: 'reserve',
        text: [
          '针对大型企业、金融级自建DNS用户， 云解析提供私有化部署YUNDUN高性能 DNS系统+HTTP DNS+云备灾IP的解决方案，实现用户私有DNS的高性能和高安全性。'
        ]
      }
    ]
  }
}

export const cloudspeedDoc = {
  documents: {
    title: '云加速 - CDN加速',
    subTitle:
      '云加速是一款专业面向WEB业务的高性能加速产品。拥有遍布全球的加速节点、灵活的缓存策略和精细的性能优化能力，配合多种安全风险识别和防护手段，为客户网站提供快速、稳定的访问体验。'
  },
  advantageDocument: [
    {
      icon: 'security',
      title: '安全',
      info: '轻量级DDoS清洗、防CC服务，云IDS有效识别黑客攻击，提供防盗链、区域屏蔽、访问控制 、错误页面自定义等功能。'
    },
    {
      icon: 'speed',
      title: '快速',
      info:
        '提供遍布全球的CDN节点、保证最佳访问链路、提供HTTP2、SSL加速、页面压缩、图片优化、动静分离等精细化加速服务，确保网站访问更快、更稳定。'
    },
    {
      icon: 'online',
      title: '永远在线',
      info: '独特的永远在线功能，当源站宕机后，智能联动替身镜像，实现网站永远在线。'
    },
    {
      icon: 'https',
      title: 'HTTPS',
      info: '支持全网SSL安全加速，提升加密数据传输速度。'
    },
    {
      icon: 'seo',
      title: 'SEO优化',
      info: '提供搜索引擎线路加速，有效提高搜索引擎的检索效率，提高搜索引擎排名。'
    },
    {
      icon: 'hadoop',
      title: '大数据',
      info: '提供丰富的数据统计分析，全方位掌握网站访问情况及安全状况。'
    }
  ],
  paramsDocument: [
    {
      icon: 'optimize',
      title: '性能优化',
      explains: [
        {
          subTitle: 'CDN高级缓存',
          text: 'YUNDUN优质CDN网络，智能缓存网站内容极大提高网站访问速度'
        },
        {
          subTitle: '页面压缩',
          text: 'Gzip压缩网页资源，节约传输内容，提高访问速度，有效改善动态页面的加速支持'
        },
        {
          subTitle: '页面优化',
          text: '自动裁掉脚本文件中不必要的字符，动态减小网页文件尺寸的技术。优化后在保证网页显示不变的同时，节约传输内容，提高访问速度'
        },
        {
          subTitle: '异步加载',
          text: '使页面的渲染不再因为加载长时间运行的脚本而被阻断'
        },
        {
          subTitle: '全链路优化',
          text: '通过大数据网络感知智能调度、TCP优化、路由优化、保障访客--CDN网络--源站最佳链路'
        },
        {
          subTitle: '移动端跳转',
          text: '将来自移动终端的请求自动重定向到指定的URL'
        },
        {
          subTitle: '永远在线',
          text: '当源站出现宕机，将已存在的镜像替身内容提供访客访问。'
        },
        {
          subTitle: '浏览器缓存',
          text: '通过移除请求头中 Entity Tags进行浏览器缓存'
        },
        {
          subTitle: '页面自动动静分离',
          text: '分离网站中动态和静态资源'
        },
        {
          subTitle: 'WebP图片优化',
          text: '在支持WebP格式图片的浏览器访问网站时，云加速会智能将图片转换为WebP格式，有效降低图片传输大小，提升访问速度'
        },
        {
          subTitle: '参数跟随',
          text: '控制是否过滤或跟随访客请求URL中问号之后的参数'
        },
        {
          subTitle: 'WEB负载均衡',
          text: '提供轮询、IP哈希、COOKIE粘住三种负载均衡模式'
        }
      ]
    },
    {
      icon: 'safety',
      title: '基础安全',
      explains: [
        {
          subTitle: '防DDoS',
          text: '默认开启轻量级防DDoS服务，可搭配太极抗D产品，获无限抗DDoS能力。'
        },
        {
          subTitle: '防CC/访客鉴别',
          text:
            '有效防止CC攻击，可搭配太极抗D产品，获海量抗CC能力；可搭配红网卫士产品，享专业的业务系统防刷、反爬虫、反欺诈等业务安全服务。'
        },
        {
          subTitle: '云IDS',
          text: '云端WEB IDS入侵检测，实时更新安全规则，让应用层攻击无处遁逃，可搭配红网卫士，获专业WAF服务。'
        },
        {
          subTitle: '防盗链',
          text: '保护网站资源不被外部盗用'
        },
        {
          subTitle: '区域屏蔽',
          text: '可根据业务需求，允许或禁止特定区域的终端用户对网站资源的访问'
        },
        {
          subTitle: '访问控制-黑名单',
          text: '设置禁止访问的IP或IP段、站内URL'
        }
      ]
    },
    {
      icon: 'config',
      title: '高级配置',
      explains: [
        {
          subTitle: '搜索引擎优化',
          text: '优化搜索引擎抓取数据速度，提高网站SEO'
        },
        {
          subTitle: 'HTTPS',
          text: '提供SSL加速服务'
        },
        {
          subTitle: 'WebSocket',
          text: '支持网站WebSocket协议'
        },
        {
          subTitle: '错误页面自定义',
          text: '支持用户对错误页面显示内容自定义'
        },
        {
          subTitle: '公益404',
          text: '提供公益404页面'
        }
      ]
    },
    {
      icon: 'hadoop',
      title: '数据报表',
      explains: [
        {
          subTitle: '加速数据报表',
          text: '实时统计网站加速流量'
        },
        {
          subTitle: '访问统计报表',
          text: '实时统计网站请求趋势、请求分布等访问数据。'
        },
        {
          subTitle: '安全分析报表',
          text: '实时统计域名安全情况，感知网站安全趋势'
        },
        {
          subTitle: '原始日志下载',
          text: '提供原始访问日志下载'
        }
      ]
    }
  ],
  appDocument: {
    titles: ['页面加速', '下载加速', '视频点播加速', 'HTTPS加速'],
    explains: [
      {
        icon: 'page',
        text: [
          '可将用户网站的静态资源如图片、html、css、js等分发到YUNDUN服务节点上，通过智能调度系统使用户访问距离最近的节点，可以有效地提升网站用户的访问速度和用户体验。'
        ]
      },
      {
        icon: 'download',
        text: [
          '大文件下载例如音视频资源、游戏包、软件等高带宽资源，可将下载文件分发到YUNDUN节点上，通过智能调度系统使用户访问距离最近的节点，从而使用户更快的获取下载资源。'
        ]
      },
      {
        icon: 'media',
        text: [
          '视频加速服务支持目前市面上主流的视频点播格式（包括MP4、FLV、F4V等），为客户提供流畅、稳定的端到端的一站式视频加速解决方案。'
        ]
      },
      {
        icon: 'onhttps',
        text: [
          '网络安全日益重要，HTTPS协议能效方式信息泄露、劫持篡改等安全问题。HTTPS加速能让您的网站兼得SSL的安全性和CDN的高性能。'
        ]
      }
    ]
  }
}

export const doublemirrorDoc = {
  documents: {
    title: '替身镜像',
    subTitle:
      '针对网页篡改和黑客攻击，替身镜像服务能够做到攻击前的有效防御和被攻击后的迅速恢复。我们提供分时分区域的替身服务，保障网站的100%安全。网页遭受破坏和篡改后，自动调用云替身服务，避免篡改页面流出，以免对网站信誉造成不良影响，保证网站永远在线。'
  },
  advantageDocument: [
    {
      icon: 'flexible',
      title: '分时分区替身服务',
      info: '针对敏感地区和敏感时期，云替身提供分时分区域的替身服务，攻击无法到达源服务器，保障网站的100%安全。'
    },
    {
      icon: 'mirror',
      title: '安全镜像一键开启',
      info: '只需简单一步，即可开启安全镜像，无需额外配置，大幅提升安全效率。'
    },
    {
      icon: 'auto',
      title: '自动调用安全替身',
      info: '网页遭受破坏和篡改后，自动调用云替身服务，将之前备份的正常页面内容提供给访客访问，以免对网站声誉造成不良影响。'
    },
    {
      icon: 'online',
      title: '保护网站永远在线',
      info: '若监控到网站源服务器宕机，会自动切换到由云替身服务器向访客提供服务，保证网站永远在线。'
    }
  ],
  appDocument: {
    titles: ['网站宕机时期', '遭遇破坏和篡改', '特殊时期区域访问控制'],
    explains: [
      {
        icon: 'crash',
        text: ['网站宕机时，使用安全镜像功能，可以使用户网站立即“恢复”到宕机之前的原始页面，保障用户网站出现异常时可永久在线。']
      },
      {
        icon: 'destroy',
        text: ['网站遭遇破坏和篡改时，自动调用安全镜像服务，提供正常页面内容提供给访客访问，避免篡改页面流出，以免对网站信誉造成不良影响。']
      },
      {
        icon: 'spcial',
        text: [
          '100%隔离源站的安全镜像，可基于时间区间、区域位置对您网站进行替身访问控制。',
          '正常时期可隔离境外黑客组织渗透，敏感时期100%保障内容不被篡改。'
        ]
      }
    ]
  }
}

export const stargazeDoc = {
  documents: {
    title: '观星风控 (业务安全)',
    subTitle: '观星风控，是上海云盾在数据智能的基础上，为业务安全保障提供的信息核验、征信风控、反垃圾、验证码等服务。'
  },
  advantageDocument: [
    {
      icon: 'verify',
      title: '权威的信息核验',
      info: '基于权威API接口数据，提供身份证、银行卡、手机实名的核验。'
    },
    {
      icon: 'credit',
      title: '征信风控',
      info: '基于用户授权场景，提供稳定高效的互联网诚信分析服务，帮助互联网金融、消费金融识别借贷欺诈行为，提高业务风控能力。'
    },
    {
      icon: 'cloud',
      title: '内容安全云服务',
      info: '基于智能识别及海量样本库、信用库，高效识别色情图片，定位暴恐图像，排查谣言、涉政等违规信息。'
    },
    {
      icon: 'checkCode',
      title: '验证码服务',
      info:
        '依托YUNDUN海量数据分析、特征模型实时更新，根据设备信誉返回不同的验证方法，包括滑动拼图验证码、点选验证码、短信上行验证码等多种验证模式。'
    }
  ]
}

export const redguardDoc = {
  documents: {
    title: '红网卫士 (云WAF)',
    subTitle:
      '红网卫士是基于海量攻击特征和YUNDUN智脑打造出的新一代企业级云WAF产品。为政府、企业客户的WEB应用提供入侵、篡改、漏洞、WebShell、业务安全等类型的防护；通过大数据行为模型对黑客进行全网追溯，让攻击可感知、可防御、可追溯、可推演。'
  },
  advantageDocument: [
    {
      icon: 'artificialIntelligence',
      title: '人工智能',
      info: '拥有大数据和人工智能两大核心技术，智能识别并防御未知威胁。'
    },
    {
      icon: 'substitute',
      title: '安全替身',
      info: '全球独创的页面内容虚拟镜像服务，保证网页内容100%安全。'
    },
    {
      icon: 'features',
      title: '海量特征',
      info: '十年安全研究实践经验，积累了海量且完备的设备指纹、漏洞、黑客档案等特征库。'
    },
    {
      icon: 'traceHacker',
      title: '黑客追溯',
      info: '基于人工智能、海量特征库和WEB蜜罐，站在客户视角对黑客进行全网追溯。'
    },
    {
      icon: 'businessSecurity',
      title: '业务安全',
      info: '实时解决恶意爬虫、垃圾注册、恶意登录、业务被刷等业务安全问题。'
    },
    {
      icon: 'highPerformance',
      title: '高性能架构',
      info: '云端分布式集群部署，资源弹性可扩展，支持海量域名。'
    },
    {
      icon: 'privateNode',
      title: '私有节点',
      info: '支持私有节点部署，灵活可控，可接入公有云混合架构。'
    }
  ],
  paramsDocument: [
    {
      icon: 'waf',
      title: '云WAF',
      explains: [
        {
          text:
            '基于大数据人工智能攻击识别引擎，采用因子类型组成规则库，以少量的因子叠加效果代替了大量的模式串和特征码，在避免了频繁更新规则库的同时大大提高了检测效率，具有强大的未知威胁防御能力。同时结合云盾研究院0day研究，使得红网卫士云WAF具备高效防御CVE、OWASP、CNVD、0day等各种漏洞和WebShell的能力。'
        }
      ]
    },
    {
      icon: 'anti-tamper',
      title: '防篡改',
      explains: [
        {
          text: '强制静态化缓存锁定应用系统中指定资源，锁定期间即使源站内容遭遇篡改，红网卫士仍可将锁定的内容返至访客，防止篡改内容流出。'
        }
      ]
    },
    {
      icon: 'replace',
      title: '内容替换',
      explains: [
        {
          text:
            '无需修改源站内容，一键过滤和替换整个应用系统中敏感信息、反动言论和淫秽内容，支持定制专属敏感词库，可避免因敏感信息导致的业务系统被关停的风险。'
        }
      ]
    },
    {
      icon: 'double',
      title: '安全替身',
      explains: [
        {
          text: '全球独创的分区域、分时间虚拟替身镜像访问控制服务，敏感时期可100%保障内容安全。'
        }
      ]
    },
    {
      icon: 'lock',
      title: '关键资源锁',
      explains: [
        {
          text: '独创的高级访问控制功能，对应用系统指定资源进行精准访问控制，有效防止暴力破解后台及其它敏感URL。'
        }
      ]
    },
    {
      icon: 'bait',
      title: 'WEB蜜罐',
      explains: [
        {
          text: '依多年攻防实战经验，推出了针对高风险攻击者使用的工具及其攻击手法的诱捕技术，同时支持多种实施部署方案。'
        }
      ]
    },
    {
      icon: 'risk',
      title: '业务风控',
      explains: [
        {
          text:
            '无需修改源代码和调用API等繁琐操作，实时解决恶意爬虫、垃圾注册、扫号撞库、活动作弊、刷单占座等业务风险，支持第三方灰白名单数据处置。'
        }
      ]
    },
    {
      icon: 'deduce',
      title: '可视化推演',
      explains: [
        {
          text: '基于大数据展示技术，实时追踪应用系统攻防态势，支持全球攻防推演，用户可挂载大屏展示。'
        }
      ]
    },
    {
      icon: 'analyse',
      title: '高级威胁分析',
      explains: [
        {
          text:
            '通过十年安全实战和管家式服务形成的用户视角思维，以大数据行为建模、访问模型分析、设备指纹、IP信誉库、代理／Bot网络、攻击特征、扫描器动态搜集识别、APT攻击挖掘等技术手段，让红网卫士不仅具备发现未知威胁的能力，并能从中发现和挖掘出真实、准确的威胁。'
        }
      ]
    },
    {
      icon: 'trace',
      title: '黑客追溯分析',
      explains: [
        {
          text:
            '从黑客发起第一次试探访问开始红网卫士便会对其进行锁定，同时依靠自身PB级大数据分析能力，结合全网攻击大数据日志进行全网追溯，绘制出黑客攻击关联网络、攻击发起地、攻击链路、攻击手法、擅长攻击手段和活跃度，形成清晰的黑客画像和完备的黑客档案。'
        }
      ]
    }
  ],
  appDocument: {
    titles: ['政企事业单位防入侵', '新金融数据和业务安全', '教育系统防信息泄漏'],
    explains: [
      {
        icon: 'forGovernment',
        text: [
          '政府事业单位重要信息系统代表着其在人民群众心目中的权威形象，一旦遭受入侵将造成极大的名誉损失和政治风险。',
          '红网卫士为政企事业单位重要信息系统提供云WAF、防篡改、内容替换、安全替身、关键资源锁、攻击推演等功能。实时解决Web漏洞、弱口令、篡改、拖库、定向APT攻击以及网页存在敏感信息等安全威胁，保证其安全性和权威性。'
        ]
      },
      {
        icon: 'forFinance',
        text: [
          '金融行业作为货币流通行业，涉及国计民生，一旦其遭受破坏、丧失功能或者数据泄露，可能严重危害国家安全。同时随着传统金融业务互联网化以及互联网金融等飞速发展，种种业务逻辑漏洞、羊毛党等业务风控问题层出不穷。',
          '红网卫士通过云端和本地部署两种部署方式为金融行业提供云WAF、关键资源锁、WEB蜜罐、业务风控、高级威胁分析、黑客追溯分析等功能保障金融行业网络免受干扰、破坏或者未经授权的访问，防止网络数据泄露或者被窃取、篡改。实时解决垃圾注册、恶意扫号撞库、活动作弊、恶意刷单抢单、恶意爬虫等严重业务风险。'
        ]
      },
      {
        icon: 'forEducation',
        text: [
          '随着网络技术的高速发展，教育系统网络的安全问题日益突出。近两年来，黑客攻击、网络病毒等已经屡见不鲜，因此导致的数据泄漏、数据篡改、数据破坏问题一次比一次严重。',
          '红网卫士为教育系统提供云WAF、防篡改、内容替换、WEB蜜罐、高级威胁分析等功能，有效抵御来自外部和内部网络的非法攻击。'
        ]
      }
    ]
  }
}

export const serverguardDoc = {
  documents: {
    title: '服卫士 (主机防火墙)',
    subTitle: '服卫士是针对Windows Server系统开发的集服务器安全防护和安全管理为一体的综合性服务器防火墙软件。'
  },
  paramsDocument: [
    {
      icon: 'package',
      title: '网络流量及包情况',
      explains: [
        {
          text: '显示各种协议包及总的数据包在发送和接受时, 被服务器卫士拦截前和拦截后的字节数及趋势'
        }
      ]
    },
    {
      icon: 'rate',
      title: '资源使用率',
      explains: [
        {
          text: '显示CPU和内容等使用率'
        }
      ]
    },
    {
      icon: 'tcp',
      title: 'TCP连接',
      explains: [
        {
          text: '显示主机和远程IP已经建立连接的情况'
        }
      ]
    },
    {
      icon: 'port',
      title: '端口管理',
      explains: [
        {
          text: '显示本地端口监听状态，提供端口保护策略配置'
        }
      ]
    },
    {
      icon: 'list',
      title: '黑白名单',
      explains: [
        {
          text: 'IP黑白名单管理，支持批量导入导出'
        }
      ]
    },
    {
      icon: 'ddos',
      title: 'DDoS防火墙',
      explains: [
        {
          text: '保护服务器免受各种类型的流量攻击'
        }
      ]
    },
    {
      icon: 'web',
      title: 'WEB防火墙',
      explains: [
        {
          text: '实时保护服务器免遭应用层CC攻击'
        }
      ]
    },
    {
      icon: 'defend',
      title: '防护日志',
      explains: [
        {
          text: '展示DDoS、WEB防火墙、端口保护等各种安全防护日志'
        }
      ]
    }
  ],
  appDocument: {
    titles: ['Windows Server全系列操作系统'],
    explains: [
      {
        icon: 'forWindServer',
        text: [
          '服务器在日常运行中会遭受来自各方的威胁，如端口扫描、DDoS、CC等攻击。',
          '服卫士支持Windows Server全系列操作系统（Windows2003/Windows2008/Windows2012 32位 64位）。采用NDIS驱动层和应用层相结合，具有防DDoS攻击、防CC攻击、端口扫描防护、动态显示包过滤情况监控、端口等管理功能，保障Windows Server系列服务器安全。'
        ]
      }
    ]
  }
}

export const riskdetectDoc = {
  documents: {
    title: '盾眼 - 风险观测',
    subTitle:
      '盾眼提供全维度、高效实时的应用安全风险识别服务，利用分布式集群和大数据分析模型，精准洞察应用漏洞、迅速捕获应用异常、高效直观呈现观测数据。'
  },
  advantageDocument: [
    {
      icon: 'accurate',
      title: '高准确性',
      info:
        '采用双引擎扫描机制，支持主动网页爬取或云内日志被动式抓取，基于云内云外安全大数据的漏洞规则库，结合安全专家团队的0Day漏洞挖掘能力，实现了应用系统漏洞发现的高准确性和完整性。'
    },
    {
      icon: 'realtime',
      title: '全面实时',
      info: 'YUNDUN的监测探针分布在全球各地，通过分布式任务集群进行大数据存储与分析，独家支持对应用系统的实时监测。'
    },
    {
      icon: 'visual',
      title: '可视化呈现',
      info: '直观展示实时、全面的风险观测数据、历史统计分析数据，精准感知系统整体安全态势，为安全事件处置和安全能力优化提供数据决策支撑。'
    },
    {
      icon: 'saas',
      title: '零部署、灵活扩展',
      info: 'SAAS模式，用户无需部署任何软硬件，支持根据用户需求灵活扩展监测规则。'
    },
    {
      icon: 'linked',
      title: '篡改联动',
      info: '可第一时间精准捕获网站异常、智能识别篡改并联动替身镜像迅速恢复。'
    }
  ],
  paramsDocument: [
    {
      icon: 'asset',
      title: '资产列表',
      explains: [
        {
          text: '支持WEB及IP资产添加'
        },
        {
          text: '实时显示资产的漏洞及页面风险状况'
        }
      ]
    },
    {
      icon: 'loophole',
      title: '漏洞扫描',
      explains: [
        {
          text: '支持常规漏洞、CMS模板漏洞、WEB2.0动态扫描；'
        },
        {
          text: '支持自定义规则库，提供0Day漏洞挖掘能力；'
        },
        {
          text: '支持对CDN加速的域名源站漏洞扫描；'
        },
        {
          text: '支持扫描任务暂停和计划任务扫描；'
        },
        {
          text: '丰富的在线报表；'
        },
        {
          text: '详细扫描报告下载，支持中英双语。'
        }
      ]
    },
    {
      icon: 'detect',
      title: '页面风险监测',
      explains: [
        {
          text: '支持资产的首页、指定页面、全站的页面风险最快1分钟实时观测；'
        },
        {
          text: '多种监控算法进行页面篡改监测，结合YUNDUN其它产品可联动防篡改（红网卫士）；'
        },
        {
          text: 'YUNDUN专有的敏感词库，可自定义叠加，及时发现敏感内容；'
        },
        {
          text: '可对指定内容观测，预防关键内容缺失；'
        },
        {
          text: '支持异常链接和恶意代码的观测，发现代码异常；'
        },
        {
          text: '支持页面异常状态码观测；'
        },
        {
          text: '可查看异常内容快照。'
        }
      ]
    },
    {
      icon: 'verify',
      title: '高危漏洞验证',
      explains: [
        {
          text: '安全专家进行远程的高危漏洞验证，研发漏洞利用效果，出具修复方案。'
        }
      ]
    },
    {
      icon: 'notify',
      title: '通知服务',
      explains: [
        {
          text: '提供免费的漏洞扫描结果、页面风险结果站内邮件短信通知和告警;'
        },
        {
          text: '提供页面风险监测结果7*24小时人工验证通知。'
        }
      ]
    },
    {
      icon: 'percept',
      title: '盾眼-可视化态势感知',
      explains: [
        {
          text: '实时大数据存储，分析和可视化展示；'
        },
        {
          text: '提供数据钻取，情景式数据分析；'
        },
        {
          text: '0DAY漏洞实时推送；'
        },
        {
          text: 'YUNDUN安全指数推送；'
        },
        {
          text: '支持通报预警服务，对异常内容按需进行汇总并通报至指定对象；'
        },
        {
          text: '可定制的数据呈现效果；'
        }
      ]
    }
  ],
  appDocument: {
    titles: ['政府、教育单位', '区域监管', '企业'],
    explains: [
      {
        icon: 'forPublic',
        text: [
          '应用系统内容屡遭篡改、漏洞修复不及时等问题严重影响了政府、教育单位形象，针对此类问题，盾眼通过实时监测应用系统漏洞、敏感词、关键词、篡改等事件，迅速识别网页异常并通知告警，通过联动替身镜像迅速恢复网页内容，避免篡改内容流出。'
        ]
      },
      {
        icon: 'forArea',
        text: [
          '帮助监测部门统一管理、统一防护、统一监测，实现精准洞察网站漏洞、迅速捕获应用系统异常，直观展示监测结果，第一时间发现风险或攻击，并实时告警。同时，人工专家团队能提供更深入的应用系统风险评估和渗透服务，协助指导区域安全防护。'
        ]
      },
      {
        icon: 'forCompany',
        text: [
          '近年来针对企业的新型威胁和攻击不断增长，对企业的业务发展和商业利益造成严重影响。盾眼基于大数据分析统计模型和0day漏洞挖掘能力，出具全面的漏洞检测报告，确保通过扫描检测备案。且资深的安全专家团队会进一步对漏洞进行分析并提出修复加固建议，让系统弱点无可循。'
        ]
      }
    ]
  }
}

export const sslcertificateDoc = {
  documents: {
    title: 'SSL - 证书管理',
    subTitle:
      'YUNDUN证书管理模块为用户提供自有证书上传和管理功能，并支持免费版SSL证书服务，零成本启用全站HTTPS。在线申购的付费证书可直接在云平台使用，支持证书下载。针对银行等高保密要求的企业客户，提供Key-less SSL部署方案，以保证私钥的安全性。'
  },
  advantageDocument: [
    {
      icon: 'unifiedManage',
      title: '统一管理简单易用',
      info: 'SSL证书信息可自动导入到证书管理中心，并支持手动导入自有证书，方便用户对证书进行统一管理。'
    },
    {
      icon: 'easyApply',
      title: '免费证书一键申请',
      info: '只需简单一步，即可完成证书申请，DV证书极速签发，0技术基础用户也能快速申请，大幅提升申请效率。'
    },
    {
      icon: 'knownBrand',
      title: '知名品牌安全可信赖',
      info: 'CA证书服务全面对接最值得信赖的第三方数字证书颁发机构(CA)，确保数字证书认证可信力，让用户真正安全。'
    },
    {
      icon: 'keyLess',
      title: 'Key-less SSL安全无忧',
      info: '针对有特殊需求的用户，只需提供证书，私匙自主保管，保障您的绝对安全。'
    }
  ],
  appDocument: {
    titles: [
      '企业网站安全加密',
      '企业应用安全加密',
      '政务信息安全加密',
      '支付体系安全加密',
      '电子邮件安全加密',
      'API接口安全加密'
    ],
    explains: [
      {
        icon: 'forWeb',
        text: [
          '启用企业网站全站https安全加密，激活绿色安全标识(DV/OV)或地址栏企业名称标识(EV)，为潜在客户带来更可信、更放心的访问体验，极大增强企业诚信力和用户信赖感，有效提升成单率。'
        ]
      },
      {
        icon: 'forApp',
        text: [
          '越来越多的企业将OA、CRM、进销存、ERP、HRM等企业应用系统部署于云端，享受云计算的高效和便捷性。而升级为https安全加密，可进一步提升系统安全性，确保敏感信息不被劫持。'
        ]
      },
      {
        icon: 'forAffairs',
        text: [
          '公信力是政务平台要打造的最重要特性。而越来越多的钓鱼欺诈网站和信息劫持手段，对政务平台的信息安全带来严重威胁。启用权威认证的SSL证书能最大化保障信息安全和网站公信力。'
        ]
      },
      {
        icon: 'forPay',
        text: [
          '支付环节是用户最敏感也最容易受到安全威胁的部分，极易成为不法用户信息劫持和伪装欺诈的重要目标。因此，实现网站支付环节的https信息传输加密，已经成为各大网站的标配。'
        ]
      },
      {
        icon: 'forEmail',
        text: [
          '电子邮件是互联网应用最广的服务。启用权威认证的SSL证书的电子邮件系统，用户可以以非常安全的进行信息传输，保证邮件内容完全完整的传送到收件人手中。'
        ]
      },
      {
        icon: 'forAPI',
        text: [
          'API接口是第三方网站进行信息交互的重要形式，因为大多涉及敏感信息或重要操作指令的传输，因此其安全性至关重要。使用SSL证书进行信息传输的高强度加密，可有效杜绝信息劫持。'
        ]
      }
    ]
  }
}

export const taichiddosappDoc = {
  documents: {
    title: '太极抗D - APP版',
    subTitle:
      '太极抗D APP版是YUNDUN针对游戏行业、常规PC客户端和移动端应用的下一代创新性端联动抗D解决方案，以终端用户的视角解决DDOS。'
  },
  advantageDocument: [
    {
      icon: 'distributedNode',
      title: '融合抗D节点，防护效果出众',
      info:
        '融合多个自有超大抗D数据中心以及第三方清洗资源，拥有Tb级单节点清洗能力以及数万个节点资源池。同时以独特的智能算法极大增加攻击成本，是YUNDUN抗D专家10年攻防经验落地成果，成功应用于多个被海量攻击客户的在线业务。'
    },
    {
      icon: 'autoAntiCC',
      title: '100% 防CC',
      info: '太极抗D App版包含防御CC服务集群，通过客户端设备信誉认证，云节点智能通信驱动，100%无损防御各类CC攻击。'
    },
    {
      icon: 'access',
      title: '多种接入方式，适应不同场景',
      info: '针对不同客户需求，提供API，SDK和客户端三种接入模式供用户灵活选择支持溯源取证。'
    }
  ],
  appDocument: {
    titles: ['Windows客户端', '安卓APP', 'IOS'],
    explains: [
      {
        icon: 'window',
        text: [
          'Windows客户端依然是目前主流的互联网应用形态之一，太极抗D APP版为Windows客户端提供便捷的部署方案，根据用户的不同需求，可选择专属太极终端或SDK两种接入模式'
        ]
      },
      {
        icon: 'android',
        text: [
          '基于安卓系统80%以上的移动设备系统占有率，安卓APP在移动端具有举足轻重的地位，容易受到黑客的针对性网络抓包或逆向分析。',
          '太极抗D APP版为安卓端APP提供SDK接入方式，帮助安卓APP有效防御网络流量攻击。'
        ]
      },
      {
        icon: 'ios',
        text: [
          'IOS用户是高端用户的代名词，具有很高的体验需求，如果IOS应用因网络攻击服务停止，很可能导致大范围用户流失。',
          '太极抗D APP版为IOS APP提供SDK接入方式，保障应用用户的高价值体验。'
        ]
      }
    ]
  }
}

export const taichiddosdnsDoc = {
  documents: {
    title: '太极抗D - DNS版',
    subTitle: '对于突发大量随机HOST A记录查询攻击、递归DNS穿透攻击、DNS流量攻击等多种针对域名解析的攻击提供高效的防护服务。'
  },
  advantageDocument: [
    {
      icon: 'antiAttack',
      title: '抗攻击效果出众',
      info: '太极抗D DNS版可抵御超大流量的DDoS攻击和高密度的DNS查询攻击，最大防御能力可达亿级QPS，完美保障网站解析业务正常运行。'
    },
    {
      icon: 'stable',
      title: '智能解析',
      info:
        '支持多线路智能解析，覆盖全国各省市和海外32个国家和地区，根据用户解析所在地区智能判断提供最佳的访问解析地址，使访问用户获得最快捷、最流畅的体验。'
    },
    {
      icon: 'autoAnalyse',
      title: '多种接入模式',
      info: '支持域名解析托管，可定制私有NS名称及服务器集群，针对自建DNS客户使用高防IP云备灾方案（参见云解析）'
    }
  ]
}

export const taichiddosplusDoc = {
  documents: {
    title: '太极抗D - PLUS版',
    subTitle:
      '太极抗D Plus版是一款防御超大规模的DDoS和高密度CC的安防产品，为用户提供独享防护资源，产品支持全业务抗D场景，致力于完美无损解决大规模DDoS攻击。'
  },
  advantageDocument: [
    {
      icon: 'uniqueIP',
      title: '独享防护IP',
      info:
        '根据用户购买套餐不同，分配电信、联通、BGP线路至多5个独享IP，丰富的独享防护资源提供充足的防护基础，全网储备带宽3Tb，黑洞牵引能力10Tb。'
    },
    {
      icon: 'forAll',
      title: '全业务场景支持',
      info: '支持网站和非网站防护接入，包括游戏应用、社区论坛、流媒体等，太极抗D Plus均能为这些业务场景提供快速有效的防护。'
    },
    {
      icon: 'recognizer',
      title: '应用层攻击识别算法',
      info: '秒级攻击响应时延，动态指纹学习机制，并且支持攻击指纹报文匹配、丢弃。'
    },
    {
      icon: 'flexibleBill',
      title: '根据用量弹性计费',
      info: '使用防护过程中，攻击超过基础套餐部分，根据实际用量弹性计费。'
    },
    {
      icon: 'definedRule',
      title: '自定义规则数',
      info: '套餐默认可添加规则数为50条，允许用户根据实际业务需求，自定义添加可使用规则数。'
    },
    {
      icon: 'banTime',
      title: '封禁时间短',
      info: '当攻击极大导致套餐内IP被封禁时，默认IP封禁时间最短可至2分钟。'
    },
    {
      icon: 'unlimitedGuard',
      title: '无上限防护增值服务',
      info: '对大型会议等重要业务场景，提供无上限的防护服务，承诺保证重大活动期间零网络事故。'
    },
    {
      icon: 'tractPath',
      title: '支持溯源取证',
      info: '对于遭受网络攻击需要调查取证的机关或企业，太极抗D Plus版支持为用户提供溯源取证服务，帮助净化互联网行动。'
    }
  ],
  appDocument: {
    titles: ['网站类应用', '非网站类应用', '重大活动保障场景'],
    explains: [
      {
        icon: 'forWebsite',
        text: [
          '网站类应用时刻面临着DDoS和CC攻击，是攻击的重灾区。',
          '太极抗D Plus版为网站类用户提供超大规模DDoS的防御能力和专家级CC防御模式，并且在网站遭遇特殊类型攻击时提供安全专家技术支持，帮助网站客户抵御DDoS和CC攻击。'
        ]
      },
      {
        icon: 'forOthers',
        text: [
          '非网站类应用，如客户端游戏、企业应用服务等也面临着被流量攻击的威胁。巨大的流量将完全阻塞服务，使正常的业务难以维持。',
          '太极抗D Plus版为非网站类用户提供四层的TCP/UDP转发服务，针对TCP CC攻击有着丰富的防护经验，雄厚的技术实力完美保障用户的业务安全。'
        ]
      },
      {
        icon: 'forConference',
        text: [
          '重大会议、促销活动期间，相关组织单位的在线业务往往是黑客攻击的首选目标，一旦发生事故会造成极其严重的损失。',
          '太极抗D Plus版为大型会议和企业促销活动提供全程网络安防定制化服务，无上限防护DDoS和CC。会议活动期间特约专家值守，快速响应突发事件，全力保障会议活动期间的网络安全。'
        ]
      }
    ]
  }
}

export const taichiddoswebDoc = {
  documents: {
    title: '太极抗D - WEB版',
    subTitle: '太极抗D Web版基于高防共享IP资源，通过SAAS云平台为网站类应用场景提供全方位抗DDoS服务。'
  },
  advantageDocument: [
    {
      icon: 'ddosClean',
      title: '超高DDoS清洗防护能力',
      info:
        '超过3T的DDoS清洗能力，完美防御各种类型DDoS流量，100%清洗SYN Flood、UDP Flood、ICMP Flood等攻击，充足的防护资源让网站永不宕机。'
    },
    {
      icon: 'appGuard',
      title: '应用层高效防护',
      info:
        '多重验证识别手段快速区分恶意访问和真实访问，有效解决大批量网络僵尸攻击引起的服务器CPU100%、IIS无法响应等攻击现象，对伪造搜索爬虫攻击、伪造浏览器攻击、假人攻击等效果极佳。'
    },
    {
      icon: 'definedRule',
      title: '可自定义防护规则',
      info: '可自定义防护模型，允许具有独特业务场景的网站在遭遇到特殊形态攻击时，根据实际业务需求自定义部分防护规则。'
    },
    {
      icon: 'suitedPrice',
      title: '套餐价格亲民',
      info: '相较于传统硬件防护厂商，基于云防护平台的太极抗D Web版使用成本低廉，同样的防护套餐可以为用户节省80%的防护费用。'
    }
  ],
  appDocument: {
    titles: ['个人站长网站'],
    explains: [
      {
        icon: 'forIndividual',
        text: [
          '个人站长网站的攻击量相对较小，并且对网站防护预算的承受能力相对较小。',
          '太级抗D Web版套餐价格低廉，为个人站长网站提供质优价低的保镖服务。'
        ]
      }
    ]
  }
}
