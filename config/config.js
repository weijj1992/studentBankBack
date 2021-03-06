import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  // routes: [
  //   {
  //     path: '/user',
  //     component: '../layouts/UserLayout',
  //     routes: [
  //       {
  //         name: 'login',
  //         path: '/user/login',
  //         component: './user/login',
  //       },
  //     ],
  //   },
  //   {
  //     path: '/',
  //     component: '../layouts/SecurityLayout',
  //     routes: [
  //       {
  //         path: '/',
  //         component: '../layouts/BasicLayout',
  //         authority: ['admin', 'user'],
  //         routes: [
  //           {
  //             path: '/',
  //             redirect: '/welcome',
  //           },
  //           {
  //             path: '/welcome',
  //             name: 'welcome',
  //             icon: 'smile',
  //             component: './Welcome',
  //           },
  //           {
  //             path: '/admin',
  //             name: 'admin',
  //             icon: 'crown',
  //             component: './Admin',
  //             authority: ['admin'],
  //             routes: [
  //               {
  //                 path: '/admin/sub-page',
  //                 name: 'sub-page',
  //                 icon: 'smile',
  //                 component: './Welcome',
  //                 authority: ['admin'],
  //               },
  //             ],
  //           },
  //           {
  //             component: './404',
  //           },
  //         ],
  //       },
  //       {
  //         component: './404',
  //       },
  //     ],
  //   },
  //   {
  //     component: './404',
  //   },
  // ],
  routes: [
    {
      path:'/login',
      name:'login',
      component:'./Login',
      icon:'smile'
    },
    {
      path: '/',
      name:'login',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            // {
            //   path: '/otherpage',
            //   name: 'welcome',
            //   icon: 'smile',
            //   component: './OtherPage/index',
            // },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },
            // {
            //   path: '/manager',
            //   name: 'manager',
            //   icon: 'crown',
            //   // component: './manager',
            //   // authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/manager/rolemanager',
            //       name: 'role',
            //       icon: 'smile',
            //       component: './manager/roleManager',
            //       // authority: ['admin'],
            //     },
            //     {
            //       path: '/manager/usermanager',
            //       name: 'usermanager',
            //       icon: 'smile',
            //       component: './manager/userManager',
            //       // authority: ['admin'],
            //     }
            //   ],
            // },
            {
              path: '/systemmanager',
              name: 'manager',
              icon: 'crown',
              // component: './manager',
              // authority: ['admin'],
              routes: [
                {
                  path: '/systemmanager/rolemanager',
                  name: 'role',
                  icon: 'smile',
                  component: './SystemManager/RoleManager',
                  // authority: ['admin'],
                },
                {
                  path: '/systemmanager/usermanager',
                  name: 'usermanager',
                  icon: 'smile',
                  component: './SystemManager/UserManager',
                  // authority: ['admin'],
                }
              ],
            },
            {
              path: '/schoolmanager',
              name: 'schoolmanager',
              icon: 'crown',
              // component: './manager',
              // authority: ['admin'],
              routes: [
                {
                  path: '/schoolmanager/classmanager',
                  name: 'classmanager',
                  icon: 'smile',
                  component: './SchoolManager/ClassManager',
                  // authority: ['admin'],
                },
                {
                  path: '/schoolmanager/grademanager',
                  name: 'grademanager',
                  icon: 'smile',
                  component: './SchoolManager/GradeManager',
                  // authority: ['admin'],
                }
                ,
                {
                  path: '/schoolmanager/studentmanager',
                  name: 'studentmanager',
                  icon: 'smile',
                  component: './SchoolManager/StudentManager',
                  // authority: ['admin'],
                },
                {
                  path: '/schoolmanager/teachermanager',
                  name: 'teachermanager',
                  icon: 'smile',
                  component: './SchoolManager/TeacherManager',
                  // authority: ['admin'],
                },
                {
                  path: '/schoolmanager/commentmanager',
                  name: 'commentmanager',
                  icon: 'smile',
                  component: './SchoolManager/CommentManager',
                  // authority: ['admin'],
                },
                {
                  path: '/schoolmanager/subjectmanager',
                  name: 'subjectmanager',
                  icon: 'smile',
                  component: './SchoolManager/SubjectManager',
                  // authority: ['admin'],
                }
              ],
            },
            {
              path: '/searchmanager',
              name: 'searchmanager',
              icon: 'crown',
              // component: './manager',
              // authority: ['admin'],
              routes: [
                {
                  path: '/searchmanager/flowersearch',
                  name: 'flowersearch',
                  icon: 'smile',
                  component: './SearchManager/FlowerSearch',
                  // authority: ['admin'],
                },
                {
                  path: '/searchmanager/classsearch',
                  name: 'classsearch',
                  icon: 'smile',
                  component: './SearchManager/ClassSearch',
                  // authority: ['admin'],
                }
                ,
                {
                  path: '/searchmanager/withdrawsearch',
                  name: 'withdrawsearch',
                  icon: 'smile',
                  component: './SearchManager/WithdrawSearch',
                  // authority: ['admin'],
                },
                {
                  path: '/searchmanager/transfersearch',
                  name: 'transfersearch',
                  icon: 'smile',
                  component: './SearchManager/TransferSearch',
                  // authority: ['admin'],
                },
                {
                  path: '/searchmanager/consumptionsearch',
                  name: 'consumptionsearch',
                  icon: 'smile',
                  component: './SearchManager/ConsumptionSearch',
                  // authority: ['admin'],
                },
                {
                  path: '/searchmanager/studentsearch',
                  name: 'studentQR',
                  icon: 'smile',
                  component: './SearchManager/StudentQR',
                  // authority: ['admin'],
                },
                {
                  path: '/searchmanager/teachersearch',
                  name: 'teacherQR',
                  icon: 'smile',
                  component: './SearchManager/TeacherQR',
                  // authority: ['admin'],
                },
                {
                  path: '/searchmanager/checkbooksearch',
                  name: 'checkbooksearch',
                  icon: 'smile',
                  component: './SearchManager/CheckbookSearch',
                  // authority: ['admin'],
                }
              ],
            },
            {
              path: '/QRmanager',
              name: 'QRmanager',
              icon: 'crown',
              // component: './manager',
              // authority: ['admin'],
              routes: [
                {
                  path: '/QRmanager/QRCreate',
                  name: 'QRCreate',
                  icon: 'smile',
                  component: './QRManager/QRCreate',
                  // authority: ['admin'],
                },
                {
                  path: '/QRmanager/QRDistribution',
                  name: 'QRDistribution',
                  icon: 'smile',
                  component: './QRManager/QRDistribution',
                  // authority: ['admin'],
                }
              ],
            },
            {
              path: '/shopmanager',
              name: 'shopmanager',
              icon: 'crown',
              // component: './manager',
              // authority: ['admin'],
              routes: [
                {
                  path: '/shopmanager/bankmanager',
                  name: 'bankmanager',
                  icon: 'smile',
                  component: './ShopManager/BankManager',
                  // authority: ['admin'],
                },
                {
                  path: '/shopmanager/shoppermanager',
                  name: 'shoppermanager',
                  icon: 'smile',
                  component: './ShopManager/ShopperManager',
                  // authority: ['admin'],
                },
                {
                  path: '/shopmanager/goodsmanager',
                  name: 'goodsmanager',
                  icon: 'smile',
                  component: './ShopManager/GoodsManager',
                  // authority: ['admin'],
                }
              ],
            },
            {
              path: '/logmanager',
              name: 'logmanager',
              icon: 'crown',
              // component: './manager',
              // authority: ['admin'],
              routes: [
                {
                  path: '/logmanager/backlog',
                  name: 'backlog',
                  icon: 'smile',
                  component: './LogManager/BackLog',
                  // authority: ['admin'],
                },
                {
                  path: '/logmanager/banklog',
                  name: 'banklog',
                  icon: 'smile',
                  component: './LogManager/BankLog',
                  // authority: ['admin'],
                },
                {
                  path: '/logmanager/shoplog',
                  name: 'shoplog',
                  icon: 'smile',
                  component: './LogManager/ShopLog',
                  // authority: ['admin'],
                },
                {
                  path: '/logmanager/logsearch',
                  name: 'logsearch',
                  icon: 'smile',
                  component: './LogManager/LogSearch',
                  // authority: ['admin'],
                }
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
};
