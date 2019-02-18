const express = require('express')

let app = express()

app.post('/easyFm/login', function (req, res) {
    let token = '01092idi18sklaj'
    res.send({
        data: {
            token: token,
            app_menu: [
                {
                    id: 1,
                    path: '/',
                    name: '首页',
                    icon: '',
                    children: []
                },
                {
                    id: 2,
                    path: '/user',
                    name: '用户',
                    icon: '',
                    children: [
                        {
                            id: 201,
                            path: '',
                            icon: '',
                            name: '用户名称',
                            children: [
                                {
                                    id: 20101,
                                    path: '/user/username',
                                    icon: '',
                                    name: '用户名称',
                                    children: []
                                },
                                {
                                    id: 20102,
                                    path: '/user/username1',
                                    icon: '',
                                    name: '用户名称2',
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 202,
                            path: '',
                            icon: '',
                            name: '用户年龄',
                            children: [
                                {
                                    id: 20201,
                                    path: '/user/userage',
                                    icon: '',
                                    name: '用户年龄',
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 203,
                            path: '/user/usermoney',
                            icon: '',
                            name: '用户消费能力',
                            children: []
                        }
                    ]
                },
                {
                    id: 3,
                    path: '/about',
                    name: '关于',
                    icon: '',
                    children: []
                }
            ]
        },
        code: 200,
        message: '请求成功',
        status: 1,
        token: token
    })
})

app.listen(5656, () => {
    console.log('5656服务已经启动')
})

module.exports = app