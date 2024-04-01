const path = require("path");
module.exports = {
    title: 'Front-end Notes',
    description: 'Front-end Notes 前端笔记',
    // 路径名为 "/<REPO>/"
    base: '/front-end-notes/',
    markdown: {
        lineNumbers: true
    },
    // theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },

    themeConfig: {
        search: true,
        subSidebar: 'auto',
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        sidebarDepth: 1,
        nav: [
            { text: '首页', link: '/' },
            { text: 'Hexo博客', link: 'https://yihan12.github.io/' },
            {
                text: '易函123 的 博客',
                items: [
                    { text: 'Github', link: 'https://github.com/yihan12' },
                    { text: '掘金', link: 'https://juejin.cn/user/3016715638158381/posts' },
                    { text: 'segmentfault', link: 'https://segmentfault.com/u/yihan123/articles' },
                    { text: '博客园', link: 'https://www.cnblogs.com/yihan123' },
                    { text: 'CSDN', link: 'https://blog.csdn.net/qq_43485006' },
                ]
            }
        ],
        sidebar: [
            {
                title: "写在最前面",
                collapsable: false,
                children: [["start/", "写在最前面"]]
            },
            {
                title: "ES6+",
                collapsable: false, // 不折叠
                children: [
                    { title: "前言", path: "ES6+/" },
                    { title: "变量", path: 'ES6+/variable' },
                    { title: "解构赋值", path: 'ES6+/destructuring' },
                    { title: "字符串", path: 'ES6+/stringES6' },
                    { title: "模板字符串", path: 'ES6+/string' },
                    { title: "字符串ES6+", path: 'ES6+/stringES6+' },
                    { title: "数值类型", path: 'ES6+/number' },
                    { title: "数值方法新增", path: 'ES6+/numberMethod' },


                ],
            },
            {
                title: "算法与数据结构",
                collapsable: false, // 不折叠
                children: [
                    { title: "前言", path: "leetcode/" },
                    { title: "时间复杂度", path: "leetcode/time_complexity" },
                    { title: "空间复杂度", path: "leetcode/space_complexity" },
                    { title: "leetcode 0001", path: "leetcode/leetcode 0001" }
                ],
            }
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "public", "assets")
            }
        }
    },
    head: [
        [
            "link",
            {
                rel: "icon",
                href: `/logo.png`
            }
        ],
    ],
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        ['@vuepress/back-to-top', true],
        // ['@vuepress/blog', true],
        ['@vuepress/nprogress', true],
        [
            "vuepress-plugin-medium-zoom",
            {
                options: {
                    margin: 24,
                    background: "white",
                    scrollOffset: 0
                }
            }
        ],
    ]
}