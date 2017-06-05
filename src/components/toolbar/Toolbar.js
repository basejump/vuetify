import Schemable from '../../mixins/schemable'
import Contextualable from '../../mixins/contextualable'

export default {
  functional: true,

  mixins: [Contextualable,Schemable],

  props: {
    fixed: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = data.staticClass ? `toolbar ${data.staticClass}` : 'toolbar'
    if (props.fixed) data.staticClass += ' toolbar--fixed'
    if (props.dark) data.staticClass += ' dark--text dark--bg'
    if (props.light) data.staticClass += ' light--text light--bg'

    let schemeClasses = ['neutral','primary', 'secondary', 'success', 'info', 'warning', 'error']
    schemeClasses.forEach(name => {
      //console.log("prop", props[name])
      if(props[name]) data.staticClass += (' '+ name)
    })
    return h('nav', data, children)
  }
}
