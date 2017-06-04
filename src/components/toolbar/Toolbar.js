import Themeable from '../../mixins/themeable'
import Contextualable from '../../mixins/contextualable'

export default {
  functional: true,

  mixins: [Themeable, Contextualable],

  props: {
    fixed: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `toolbar ${data.staticClass}` : 'toolbar'
    if (props.fixed) data.staticClass += ' toolbar--fixed'
    if (props.light) data.staticClass += ' toolbar--light'
    if (props.dark) data.staticClass += ' toolbar--dark'

    let schemeClasses = ['neutral','primary', 'secondary', 'success', 'info', 'warning', 'error']
    schemeClasses.forEach(name => {
      //console.log("prop", props[name])
      if(props[name]) data.staticClass += (' '+ name)
    })
    return h('nav', data, children)
  }
}
