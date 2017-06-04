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
    //data.staticClass += props.light ? ' toolbar--light' : ' toolbar--dark'
    console.log("props", props)
    let tones = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
    tones.forEach(tone => {
      console.log("prop", props[tone])
      if(props[tone]) data.staticClass += (' '+ tone)
    })
    return h('nav', data, children)
  }
}
