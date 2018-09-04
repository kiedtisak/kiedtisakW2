import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _973983d0 = () => import('..\\pages\\tabled.vue' /* webpackChunkName: "pages_tabled" */).then(m => m.default || m)
const _03c9fff9 = () => import('..\\pages\\student\\index.vue' /* webpackChunkName: "pages_student_index" */).then(m => m.default || m)
const _3903272c = () => import('..\\pages\\search.vue' /* webpackChunkName: "pages_search" */).then(m => m.default || m)
const _bbac9fd2 = () => import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */).then(m => m.default || m)
const _d01776cc = () => import('..\\pages\\chat.vue' /* webpackChunkName: "pages_chat" */).then(m => m.default || m)
const _079258f7 = () => import('..\\pages\\pictures.vue' /* webpackChunkName: "pages_pictures" */).then(m => m.default || m)
const _31b6fa19 = () => import('..\\pages\\student2.vue' /* webpackChunkName: "pages_student2" */).then(m => m.default || m)
const _dab47f9a = () => import('..\\pages\\student\\edit.vue' /* webpackChunkName: "pages_student_edit" */).then(m => m.default || m)
const _4efbe600 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'hash',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/tabled",
			component: _973983d0,
			name: "tabled"
		},
		{
			path: "/student",
			component: _03c9fff9,
			name: "student"
		},
		{
			path: "/search",
			component: _3903272c,
			name: "search"
		},
		{
			path: "/login",
			component: _bbac9fd2,
			name: "login"
		},
		{
			path: "/chat",
			component: _d01776cc,
			name: "chat"
		},
		{
			path: "/pictures",
			component: _079258f7,
			name: "pictures"
		},
		{
			path: "/student2",
			component: _31b6fa19,
			name: "student2"
		},
		{
			path: "/student/edit",
			component: _dab47f9a,
			name: "student-edit"
		},
		{
			path: "/",
			component: _4efbe600,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
