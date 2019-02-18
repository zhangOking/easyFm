const views404 = resolve => require(['../views/404'], resolve)
const viewsAbout = resolve => require(['../views/About'], resolve)
const viewsHome = resolve => require(['../views/Home'], resolve)
const viewsindex = resolve => require(['../views/index'], resolve)
const viewslogin = resolve => require(['../views/login'], resolve)
const viewsuser = resolve => require(['../views/user'], resolve)
const viewsuserUserage = resolve => require(['../views/user/userage'], resolve)
const viewsuserUsermoney = resolve => require(['../views/user/usermoney'], resolve)
const viewsuserUsername = resolve => require(['../views/user/username'], resolve)
const viewsuserUsername1 = resolve => require(['../views/user/username1'], resolve)
export const routes = [
  {
    name: "404",
    path: "/404",
    component: views404
  },
  {
    name: "About",
    path: "/About",
    component: viewsAbout
  },
  {
    name: "Home",
    path: "/Home",
    component: viewsHome
  },
  {
    name: "login",
    path: "/login",
    component: viewslogin
  },
  {
    name: "user",
    path: "/user",
    component: viewsuser,
    children: [
      {
        name: "userage",
        path: "userage",
        component: viewsuserUserage
      },
      {
        name: "usermoney",
        path: "usermoney",
        component: viewsuserUsermoney
      },
      {
        name: "username",
        path: "username",
        component: viewsuserUsername
      },
      {
        name: "username1",
        path: "username1",
        component: viewsuserUsername1
      }
    ]
  },
  {
    name: "index",
    path: "/",
    component: viewsindex
  }
]