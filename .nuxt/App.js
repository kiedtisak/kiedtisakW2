import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'


let layouts = {

  "_default": () => import('..\\layouts\\default.vue'  /* webpackChunkName: "layouts_default" */).then(m => m.default || m),

  "_public": () => import('..\\layouts\\public.vue'  /* webpackChunkName: "layouts_public" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"APP TITLE","meta":[{"charset":"utf-8"},{"http-equiv":"X-UA-Compatible","content":"IE=edge"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"theme-color","content":"#0ff5"},{"name":"fragment","content":"!"},{"name":"mobile-web-app-capable","content":"yes"},{"name":"apple-mobile-web-app-capable","content":"yes"},{"name":"apple-mobile-web-app-status-bar-style","content":"black"},{"name":"msapplication-TileImage","content":"\u002Ficons\u002Ffavicon.png"},{"name":"msapplication-TileColor","content":"#000"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"app"},{"hid":"description","name":"description","content":"app template"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"app"},{"hid":"og:description","name":"og:description","property":"og:description","content":"app template"}],"link":[{"rel":"shortcut icon","href":"\u002Ficons\u002Ffavicon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Ficons\u002Ffavicon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Ficons\u002Ffavicon.png"},{"rel":"apple-touch-icon","href":"\u002Ficons\u002Ffavicon.png"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.761754ae.json"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}

