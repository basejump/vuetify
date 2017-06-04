import Contextualable from '../../mixins/contextualable'
export default {
  functional: true,

  mixins: [Contextualable],

  props: {
    fixed: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `toolbar ${data.staticClass}` : 'toolbar'
    if (props.fixed) data.staticClass += ' toolbar--fixed'

    let schemeClasses = ['neutral','primary', 'secondary', 'success', 'info', 'warning', 'error']
    schemeClasses.forEach(name => {
      //console.log("prop", props[name])
      if(props[name]) data.staticClass += (' '+ name)
    })
    return h('nav', data, children)
  }
}
