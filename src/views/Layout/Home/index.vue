<template>
  <article class="resume-wrapper text-center position-relative">
    <div class="resume-wrapper-inner mx-auto text-left bg-white shadow-lg">
      <header class="resume-header pt-4 pt-md-0">
        <div class="media flex-column flex-md-row">
          <img class="mr-3 img-fluid picture mx-auto" :src="personalData.picture" alt="" />
          <div class="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0">
            <div class="primary-info">
              <h1 class="name mt-0 mb-1 text-white text-uppercase text-uppercase">
                {{ personalData.name }}
              </h1>
              <div class="title mb-3">{{ personalData.job }}</div>
              <ul class="list-unstyled contact-info">
                <li v-for="(item, index) in personalData.contactWay" :key="'contactWay'+index" class="mb-2">
                  <a :href="item.href">
                    <i class="fa-icon fa-mobile-alt fa-fw mr-2">
                      <svg-icon :icon-name="item.icon"> </svg-icon>
                    </i>
                    <span class="text-content">{{ item.text }}</span>
                  </a>
                </li>

              </ul>
            </div>
            <div class="secondary-info ml-md-auto mt-2">
              <ul class="resume-social list-unstyled">
                <li v-for="(item, index) in personalData.homepage" :key="'homepage'+index" class="mb-3">
                  <a :href="item.href">
                    <span class="fa-container text-center mr-2">
                      <svg-icon :icon-name="item.icon"> </svg-icon>
                    </span>
                    <span class="text-content">{{ item.text }}</span>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </header>
      <div class="resume-body p-5">
        <section class="resume-section summary-section mb-5">
          <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
            个人总结
          </h2>
          <div class="resume-section-content">
            <p class="mb-0">
              {{ personalData.summary }}
            </p>
          </div>
        </section>
        <div class="row">
          <div class="col-lg-12">
            <!-- 工作经验 -->
            <section class="resume-section experience-section mb-5">
              <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                工作经验
              </h2>
              <div class="resume-section-content">
                <div class="resume-timeline position-relative">
                  <article
                    v-for="(item, index) in workExperience"
                    :key="'workExperience' + index"
                    class="resume-timeline-item position-relative"
                  >
                    <div class="resume-timeline-item-header mb-2">
                      <div class="d-flex flex-column flex-md-row justify-content-between">
                        <h3 class="resume-position-title font-weight-bold mb-1">
                          {{ item.job }}
                          <small v-if="item.isInternship" class="text-muted">
                            (实习)
                          </small>
                        </h3>
                        <div class="resume-company-name mb-1">
                          {{ item.company }}
                        </div>
                      </div>
                      <div class="resume-position-time">
                        {{ item.time }}
                      </div>
                    </div>
                    <div class="resume-timeline-item-desc">
                      <p v-for="(content, id) in item.content" :key="'content' + id">
                        <span class="font-weight-bold display-block mb-1 ">{{ content.title }}：</span>
                        <ul class="list-unstyled text-indent-2em">
                          <li v-for="(list, digit) in content.list" :key="'list' + digit" class="mb-2"><template v-if="content.list.length > 1">{{ digit + 1 }}、</template>{{ list }}</li>
                        </ul>
                      </p>

                      <h4 class="resume-timeline-item-desc-heading font-weight-bold">
                        使用的技术:
                      </h4>
                      <ul class="list-inline">
                        <li v-for="(technology, number) in item.technologies" :key="'technology' + number" class="list-inline-item">
                          <span class="badge badge-primary badge-pill">
                            {{ technology }}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </article>
                </div>
              </div>
            </section>
            <!-- 项目经验 -->
            <section class="resume-section education-section mb-5">
              <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                项目经验
              </h2>
              <div v-for="(item, index) in projectExperience" :key="'projectExperience' + index" class="resume-section-content">
                <article class="position-relative">
                  <div class="resume-timeline-item-header mb-2">
                    <div class="d-flex flex-column flex-md-row justify-content-between">
                      <h3 class="resume-position-title font-weight-bold mb-1">
                        {{ item.name }}
                      </h3>
                      <div class="resume-company-name mb-1">
                        {{ item.job }}
                      </div>
                    </div>
                    <div class="resume-position-time">
                      {{ item.time }}
                    </div>
                  </div>
                  <div class="resume-timeline-item-desc">
                    <p v-for="(content, id) in item.content" :key="'content' + id">
                      <span class="font-weight-bold display-block mb-1 ">{{ content.title }}：</span>
                      <ul class="list-unstyled text-indent-2em">
                        <li v-for="(list, digit) in content.list" :key="'list' + digit" class="mb-2"><template v-if="content.list.length > 1">{{ digit + 1 }}、</template>{{ list }}</li>
                      </ul>
                    </p>
                  </div>
                </article>
              </div>

            </section>
          </div>
          <div class="col-lg-12">
            <!-- 技能特长 -->
            <section class="resume-section skills-section mb-5">
              <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                技能特长
              </h2>
              <div class="resume-section-content">
                <div class="resume-skill-item">
                  <!-- <h4 class="resume-skills-cat font-weight-bold">
                    Frontend
                  </h4> -->
                  <ul class="list-unstyled mb-4">
                    <li class="mb-2">
                      <div class="resume-skill-name">
                        Vue
                      </div>
                      <div class="progress resume-progress">
                        <div
                          class="progress-bar theme-progress-bar-dark"
                          role="progressbar"
                          style="width: 96%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </li>
                    <li class="mb-2">
                      <div class="resume-skill-name">
                        React
                      </div>
                      <div class="progress resume-progress">
                        <div
                          class="progress-bar theme-progress-bar-dark"
                          role="progressbar"
                          style="width: 96%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </li>
                    <li class="mb-2">
                      <div class="resume-skill-name">
                        Angular
                      </div>
                      <div class="progress resume-progress">
                        <div
                          class="progress-bar theme-progress-bar-dark"
                          role="progressbar"
                          style="width: 90%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </li>

                    <li class="mb-2">
                      <div class="resume-skill-name">
                        JavaScript
                      </div>
                      <div class="progress resume-progress">
                        <div
                          class="progress-bar theme-progress-bar-dark"
                          role="progressbar"
                          style="width: 96%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </li>
                    <li class="mb-2">
                      <div class="resume-skill-name">
                        TypeScript
                      </div>
                      <div class="progress resume-progress">
                        <div
                          class="progress-bar theme-progress-bar-dark"
                          role="progressbar"
                          style="width: 96%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </li>
                    <li class="mb-2">
                      <div class="resume-skill-name">
                        Node.js
                      </div>
                      <div class="progress resume-progress">
                        <div
                          class="progress-bar theme-progress-bar-dark"
                          role="progressbar"
                          style="width: 92%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </li>
                    <li class="mb-2">
                      <div class="resume-skill-name">
                        HTML/CSS/SASS/LESS
                      </div>
                      <div class="progress resume-progress">
                        <div
                          class="progress-bar theme-progress-bar-dark"
                          role="progressbar"
                          style="width: 96%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="resume-skill-item">
                  <h4 class="resume-skills-cat font-weight-bold">
                    其他
                  </h4>
                  <ul class="list-inline">
                    <li class="list-inline-item">
                      <span class="badge badge-light">
                        DevOps
                      </span>
                    </li>
                    <li class="list-inline-item">
                      <span class="badge badge-light">
                        Code Review
                      </span>
                    </li>
                    <li class="list-inline-item">
                      <span class="badge badge-light">
                        Git
                      </span>
                    </li>
                    <li class="list-inline-item">
                      <span class="badge badge-light">
                        Unit Testing
                      </span>
                    </li>
                    <li class="list-inline-item">
                      <span class="badge badge-light">
                        AntDesign
                      </span>
                    </li>
                    <li class="list-inline-item">
                      <span class="badge badge-light">
                        Element
                      </span>
                    </li>
                    <li class="list-inline-item">
                      <span class="badge badge-light">
                        View Design
                      </span>
                    </li>
                    <li class="list-inline-item">
                      <span class="badge badge-light">
                        Vant
                      </span>
                    </li>
                    <li class="list-inline-item">
                      <span class="badge badge-light">
                        Taro
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <!-- 教育背景 -->
            <section class="resume-section education-section mb-5">
              <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                教育背景
              </h2>
              <div class="resume-section-content">
                <article class="position-relative">
                  <div class="resume-timeline-item-header mb-2">
                    <div class="d-flex flex-column flex-md-row justify-content-between">
                      <h3 class="resume-position-title font-weight-bold mb-1">
                        北京经济技术职业学院
                      </h3>
                      <div class="resume-company-name mb-1">
                        计算机应用技术
                      </div>
                    </div>
                    <div class="resume-position-time">
                      2015.9-2018.7
                    </div>
                  </div>
                  <div class="resume-timeline-item-desc">
                    <p>
                      在校学习成绩优异，在校期间参加蓝桥杯大赛，获得北京市 C/C++ C组 二等奖 ，Java
                      C组 一等奖
                    </p>
                  </div>
                </article>
              </div>
            </section>
            <!-- 自我评价 -->
            <section class="resume-section interests-section mb-5">
              <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                自我评价
              </h2>
              <div class="resume-section-content">
                <p class="mb-0">
                  {{ personalData.selfEvaluation }}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      personalData: {
        name: '王刘洋',
        job: 'WEB前端开发',
        picture: require('@/assets/images/profile.jpg'),
        contactWay: [
          {
            href: 'tel:+8618610392765',
            icon: 'tele',
            text: '18610392765'
          },
          {
            href: require('@/assets/images/wechat.jpg'),
            icon: 'wechat',
            text: 'console_warn'
          },
          {
            href: 'mailto:mr.liuyang.wang@gmail.com',
            icon: 'email',
            text: 'mr.liuyang.wang@gmail.com'
          }
        ],
        homepage: [
          {
            href: 'https://github.com/Liuyang-Wang',
            icon: 'github',
            text: 'github.com/Liuyang-Wang'
          },
          {
            href: 'https://www.npmjs.com/~liuyang-wang',
            icon: 'npm',
            text: 'www.npmjs.com/~liuyang-wang'
          },
          {
            href: 'https://gitee.com/wly_zuishuai',
            icon: 'gitee',
            text: 'gitee.com/wly_zuishuai'
          },
          {
            href: 'https://liuyang-wang.github.io/',
            icon: 'website',
            text: 'liuyang-wang.github.io'
          }
        ],
        summary: '5年WEB前端开发经验，熟悉Vue，React，Angular前端框架，有Nuxt、Next开发经验，熟悉TypeScript，熟练使用git工具进行版本控制，熟练使用npm、pnpm、yarn包管理工具，熟悉W3C标准及规范，熟悉ES6标准与新特性掌握面向对象变成思想，能够快速的将效果图转化为HTML，熟练使用SCSS/LESS CSS预处理器。有NodeJs、Taro、uni-app、微信小程序等H5移动端开发经验，熟练使用ThreeJS、ECharts、Ant Design、Element、View Design、Vant、Taro UI组件库。',
        selfEvaluation: '活泼开朗、乐观向上、勤奋好学，认真负者，抗压能力强，脚踏实地，善于沟通交流、开朗乐观，主动性强，有较强学习能力及项目管理能力'
      },
      workExperience: [
        {
          job: '前端开发',
          isInternship: false,
          company: '石家庄人瑞人力资源服务有限公司北京分公司',
          time: '2024.5-至今',
          content: [
            {
              title: '工作描述',
              list: [
                '本次工作经历是外包到京东CHO体系负责部门多个项目的前端开发，主要使用Vue框架，确保高效、可维护的代码结构。使用Vue CLI进行项目初始化和配置，提升开发效率',
                '开发和维护可复用的Vue组件，提升代码的可维护性和一致性。使用Pinia进行状态管理，确保应用状态的一致性和可预测性。',
                '与UI/UX设计师合作，确保设计稿的高保真还原，提升用户体验。与后端开发团队协作，定义和对接API接口，确保前后端数据交互的顺畅。',
                '通过代码分割、懒加载和异步组件等技术优化页面加载速度。使用工具（如Vue Devtools、Lighthouse）进行性能分析和优化，提升应用性能。',
                '编写单元测试和端到端测试，使用Jest和Cypress等工具确保代码的稳定性和可靠性。进行跨浏览器测试，解决兼容性问题。',
                '使用Git进行版本控制，参与代码评审，确保代码质量和团队协作效率。'
              ]
            },
            {
              title: '工作成果',
              list: [
                '负责大数据管理系统的前端开发，使用Vue.js和Element UI构建用户友好的管理界面。',
                '实现了数据可视化功能，帮助管理层更好地进行决策。',
                '实现了权限管理、角色管理和人员管理等多个模块，提升了企业的管理效率和数据准确性。'
              ]
            }
          ],
          technologies: ['Vue3', 'Vite', 'Element Plus', 'Axios', 'ECharts', 'NodeJS', 'Git']
        },
        {
          job: '前端开发',
          isInternship: false,
          company: '软通动力技术服务有限公司北京分公司',
          time: '2022.1-2024.2',
          content: [
            {
              title: '工作描述',
              list: [
                '本次工作经历是外包到京东物流部门负责一些对内与对外的后端管理系统,如物策，物参，商流，物流官网，小哥工作台等。以及京东物流小程序的开发',
                '主要工作内容为参加需求评审，参加UI交互评审，配合UI设计师搭建页面样式，使用Vue3+TypeScript+ElementUI制作管理端页面，与后端工程师联调接口，代码code review，代码评审，UI走查等内容。',
                '物流官网主要用了Nuxt作为前端框架，让我了解到了Nuxt与Vue的不同'
              ]
            },
            {
              title: '工作成果',
              list: [
                '依据公司软件研发相关规范，根据软件详细设计说明书，按项目进度完成Web前端应用的编写、单元测试和交付工作；',
                '设计核心产品的前端架构，并带领组员实现并持续优化；',
                '协助产品人员进行系统原型的设计和优化工作；',
                '配合测试人员进行系统的测试工作；',
                '完成技术文档编写和更新；'
              ]
            }
          ],
          technologies: ['Vue', 'React', 'Taro', 'ElementUI', 'ECharts', 'TypeScript', 'NuxtJS', 'NextJS', 'NodeJS']
        },
        {
          job: '前端开发',
          isInternship: false,
          company: '智合新天（天津）科技有限公司',
          time: '2019.1-2021.12',
          content: [
            {
              title: '工作描述',
              list: [
                '负责公司各项目中web前端的技术开发和技术选型（PC、web、小程序）；',
                '负责H5，PC及小程序等业务需求研发；',
                '根据产品设计，开发PC、手机等多渠道前端页面和功能；',
                '对现有产品前端做持续性开发和性能优化，对产品前端用户体验改进及基础技术优化；',
                '配合产品经理和UI设计，研究并改善用户体验；',
                '保持高效的前端性能，良好的代码可维护性，良好的浏览器兼容性；',
                '准确理解产品需求和交互原型，配合后端开发人员实现产品界面和功能；',
                'Web前沿技术研究和新技术调研&实践分享；',
                '快速响应产品迭代以及优化升级，持续优化前端体验，并保持良好兼容性，友好和易用性；',
                '与后台开发工程师协调合作，根据后台API完成前端逻辑和功能实现；'
              ]
            },
            {
              title: '工作成果',
              list: [
                '工作中要和产品经理确认需求，讨论需求可不可行，合不合理，知道这个需求是在什么场景下使用的，解决用户的什么问题；设计上和UI工程师确认这样设计的目的是什么，这样的设计对于代码的实现能不能做到，合不合理，代码实现后和预效果是否保持一致，有没有更好的方式提升用户的体验；实现功能上要和后台工程师确认接口，需要给后台传什么样的接口，参数是什么类型的，同时后台返回什么数据给前端。对用户操作错误后如何友好的给出提示，同时考虑代码的安全性，如何让自己的程序更健壮更安全；'
              ]
            }
          ],
          technologies: ['Vue', 'Angular', 'Ant Design', 'HTML/LESS/SCSS', 'TypeScript', 'Git']
        },
        {
          job: '前端开发',
          isInternship: true,
          company: '新知地（北京）科技有限公司',
          time: '2017.1-2018.12',
          content: [
            {
              title: '工作描述',
              list: [
                '根据UI设计师提供的设计图，实现一流的Web界面，优化代码并保持在各浏览器下良好的兼容性；',
                '整体页面结构及样式层结构的设计 、优化；',
                'Web前端表现层及与后端交互的架构设计和开发；',
                'JavaScript程序模块开发，通用类库、框架编写；',
                '配合后台开发人员实现产品界面和功能；',
                '对完成的页面进行维护和对网站前端性能做相应的优化',
                '丰富Web交互方式，通过技术改善用户体验'
              ]
            },
            {
              title: '工作成果',
              list: [
                '通过本次工作对WEB前端技术有了很大的提升，对公司的工作流程以及我平时的一些问题和错误都有了一些了解，只有细心才能有效避免一些错误。对以后的工作有了很大的帮助；'
              ]
            }
          ],
          technologies: ['Vue', 'jQuery', 'HTML/CSS/LESS', 'JavaScript']
        }
      ],
      projectExperience: [
        {
          name: '大数据后端管理项目',
          job: '前端开发',
          time: '2024.5-至今',
          content: [
            {
              title: '项目描述',
              list: ['本项目是一个面向企业级用户的大数据后端管理系统，采用前后端分离的开发模式。前端使用Vue3框架进行开发。系统主要功能包括数据可视化分析、用户权限管理、数据导入导出等。']
            },
            {
              title: '工作内容',
              list: [
                '使用Vue3进行组件化开发，实现数据可视化页面、用户管理页面等核心功能模块。通过Vue-Router实现单页面应用的路由管理，利用Pinia进行状态管理，确保数据的一致性和可维护性。',
                '通过axios与后端API进行数据交互，实现数据的获取、更新和删除等操作。封装了通用的请求方法，处理跨域问题，并统一处理请求和响应中的异常。',
                '利用ECharts图表库实现数据的动态展示，包括折线图、柱状图、饼图等多种图表形式，以满足不同场景下的数据分析需求。',
                '设计并实现了基于角色的权限管理系统（RBAC），通过Element-UI的表格和对话框组件，实现用户、角色和权限的分配和管理。',
                '通过路由懒加载、代码压缩、图片优化等手段，提升系统的加载速度和运行效率。使用Vite进行项目构建和优化，生成打包报告并根据报告调整配置。'
              ]
            },
            {
              title: '项目成果',
              list: [
                '该项目应用于公司内部，帮助用户高效管理和分析大数据，提升了企业的决策效率和业务管理水平。通过持续优化，系统运行稳定，用户反馈良好。'
              ]
            }
          ]
        },
        {
          name: '商流OA审批项目',
          job: '前端开发',
          time: '2023.9-2024.2',
          content: [
            {
              title: '项目描述',
              list: ['此项目为React+Taro+TS+Redux+Taro UI实现的H5端的后台管理系统，我再项目中负责审批流程模块，封装hooks把路由守卫的判断以及权限状态的获取封装起来，把控用户权限，通过项目类型的不同审批展示的内容也不用，职位不同审批可见的内容也不同，以及通过用户权限生成动态路由']
            },
            {
              title: '项目难点',
              list: ['用户权限分配上相对复杂分别为接口权限，按钮权限与路由权限']
            },
            {
              title: '项目成果',
              list: [
                '在接口权限方面，用户登录后通过Redux存储用户信息，通过存储的用户信息传给后端，通过返回信息判断当前是否可访问此接口',
                '在按钮权限方面，封装组件通过获取Redux中的角色信息传入组件判断当前权限是否可用',
                '在路由权限方面，需要根据角色访问接口返回可访问路由，使用useRoutes钩子快速初始化路由列表，封装useAuth hook需要同时满足用户已登录并且有该页面的权限才能访问'
              ]
            }
          ]
        },
        {
          name: '京东物流小程序',
          job: '前端开发',
          time: '2022.12-2023.9',
          content: [
            {
              title: '项目描述',
              list: ['此项目为uni-app实现的小程序，我再项目中负责查快递页面、快递详情以及寄快递页面']
            },
            {
              title: '项目成果',
              list: [
                '负责项目样式搭建与多机型适配，适配IOS与安卓机型的一些样式与js的兼容问题',
                '负责接口对接与联调，处理用户数据，计算运费等',
                '快递详情页面引入腾讯地图，绘制寄件地点与收件地点，通过时间模拟快递送货路线大致位置，以及配送中时地图的定位缩放'
              ]
            }
          ]
        },
        {
          name: '物参后端管理项目',
          job: '前端开发',
          time: '2022.1-2022.11',
          content: [
            {
              title: '项目描述',
              list: ['此项目为Vue3+TypeScript+elementUI+Pinia做的后端管理项目京东物流市场的营销中台，其中有项目管理、预算管理、费用管理、营销工具等模块，我主要负责表单的新增，回显，编辑还有列表查询等常规功能。其中调查问卷工具功能偏复杂，左边为问题配置模块右边为预览模块，配置模块可配置组件类型如输入框、下拉选择框、单选、多选等类型，还可以配置placeholder、主题色、背景图片等，可以通过拖拽实现位置调整，最终组装成一个数组发给后端。另外还有一个表单填写端，通过当前表单ID查询列表配置，封装组件通过类型返回不同类型的表单组件']
            },
            {
              title: '项目成果',
              list: [
                '通过给元素添加draggable="true" 和dragstart+drop方法实现列表拖拽，通过传递的index使用数组的splice方法实现位置调换从而数据与页面同步',
                '通过封装axios拦截器实现接口封装传递用户token，通过返回进行报错、跳转登录页等',
                '通过Pinia中的defineStore+组合式API实现兄弟组件之间的通信',
                '通过 v-bind useAttrs, v-for useSlots封装公共组件'
              ]
            }
          ]
        },
        {
          name: '立达融供应商后台管理系统',
          job: '前端开发',
          time: '2021.2-2021.12',
          content: [
            {
              title: '项目描述',
              list: ['此项目是jQuery的老项目重构成Vue项目，从前后端不分离到前后端分离，有我一人完成用到的技术栈为Vue2+elementUi+axios。主要功能有登录，用户权限配置，产品页面的增删改查等。根据UI提供的原型图设计项目结构，封装公共组件、常用方法以及接口封装']
            },
            {
              title: '项目难点',
              list: ['首页白屏时间较大']
            },
            {
              title: '项目成果',
              list: [
                '通过路由懒加载将页面拆分户需要访问某个模块时才进行加载',
                '封装常用方法比如cookie的设置、时间格式化、常见的验证等',
                '上传图片时进行图片压缩，使用适当的图片格式，减少图片加载时间，图片使用懒加载',
                '代码层面使用keep-alive缓存组件、频繁切换的使用v-show、v-for遍历必须加key避免同时使用v-if，列表数据多使用虚拟滚动、使用Vuex进行状态管理、避免在computed属性中执行复杂操作等',
                '在vue.config中配置忽略打包的第三方库，并且配置对应版本的CND链接'
              ]
            }
          ]
        },
        {
          name: '重庆IoT管理平台',
          job: '前端开发',
          time: '2020.4-2021.2',
          content: [
            {
              title: '项目描述',
              list: ['此项目用到的技术栈为React16+Redux+axios+Arco Design+ECharts，我主要负责登录、首页大屏以及设备接入模块。熟练利用自身技术实现功能并保持界面合理和美观以及易用性。理解业务和客户需求，能够独立开发完成项目。与后端工程师接口联调协作完成']
            },
            {
              title: '项目成果',
              list: [
                '登录有两个方式短信登录与账号密码登录，账号登录时通过验证码接口获取验证码和验证ID，短信登录时通过发短信接口发送短信，登录成功后存储用户信息到Redux，token保存到cookie，通过axios拦截器发送token信息',
                '通过ECharts实现首页大屏，展示饼图，树状图，折线图等，通过点击中国地图查看省级数据',
                '接入模块有列表筛选、新增、回显，其中新增数据时通过扫码枪扫码输入设备SN，通过SN码查询设备信息并赋值到表单中'
              ]
            }
          ]
        },
        {
          name: '大数据管理平台',
          job: '前端开发',
          time: '2019.1-2020.3',
          content: [
            {
              title: '项目描述',
              list: ['该项目为后台大数据管理平台,用到的技术栈为Angular9+Ant Design，主要负责用户管理模块，用户权限分配模块，用户数据的增删改查、创建自定义搜索条件模块封装，当前页面路由导航组件封装，用户登录模块分装，以及用户数据模块分装。主要用到的技术有 TS，angular-router， Injectable 注入依赖，HttpClient，pipe 管道等。']
            }
          ]
        },
        {
          name: '极速家政小程序',
          job: '前端开发',
          time: '2018.8-2018.12',
          content: [
            {
              title: '项目描述',
              list: ['本项目是一款家政类微信小程序，使用了页面跳转，顶部选择栏模块，下拉刷新下拉加载，经纬度定位，微信支付调起等技术']
            },
            {
              title: '岗位职责',
              list: ['负责小程序的页面搭建、接口调用，从后台接口获得数据到前端展示，项目主要功能有：预约下单，调起支付，完成订单，评论订单。']
            }
          ]
        },
        {
          name: 'CCAPP',
          job: '前端开发',
          time: '2018.3-2018.8',
          content: [
            {
              title: '项目描述',
              list: ['本项目是一个机场广告位发布网站，使用vue+webpack构建的单页面应用，项目采用了vuex、vue-route、vue-resource以及ES6语法，采用组件化思想搭建整个项目，从而使组件高度复用，代码十分简洁。']
            },
            {
              title: '岗位职责',
              list: ['主要负责项目页面的布局和数据渲染，完成与后端的接口对接，配合后端的对接联调，解决不同浏览器或者不同手机端页面布局错乱的问题']
            }
          ]
        },
        {
          name: '有好东西WebAPP',
          job: '前端开发',
          time: '2017.12-2018.1',
          content: [
            {
              title: '项目描述',
              list: ['和组内伙伴高效合作，高质量的完成页面开发工作', '对产品进行性能优化，实现极致的Web加载、执行和渲染时间，提升用户体验', '承担部分的前端工组组件的建设工作，和其他FE伙伴一起打造技术领先的前端技术团队']
            },
            {
              title: '岗位职责',
              list: ['负责主线产品web系统前端页面的开发和优化', '参与产品需求、设计阶段的工作并从前端的角度提出意见', '改进前端开发流程，整理最佳实践 ', '分析、优化网站前端性能，为用户提供更好的体验']
            }
          ]
        },
        {
          name: '德成邻居',
          job: '前端开发',
          time: '2017.4-2017.12',
          content: [
            {
              title: '项目描述',
              list: [
                '基于HTML5开发展示类，交互类H5',
                '负责前端代码编写及页面架构设计，用户互动应用设计',
                '与后台开发工程师、客户端工程师、产品视觉等密切配合，完成交互功能、联调等工作',
                '处理开发过程中遇到的问题，客户端的兼容性问题'
              ]
            },
            {
              title: '岗位职责',
              list: [
                '负责web前端系统功能开发，调试和维护',
                '负责前端技术框架和js特效实现',
                '负责和设计人员和技术人员沟通，协助完成开发任务',
                '研发和探索创新的开发思路与新的技术'
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['appTime'])
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import './pillar-1.scss';
</style>
