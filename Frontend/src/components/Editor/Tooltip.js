import {Tooltip, showTooltip} from "@codemirror/view"
import {StateField} from "@codemirror/state"

export const cursorTooltipField = StateField.define({
  create: getCursorTooltips,

  update(tooltips, tr) {
    if (!tr.docChanged && !tr.selection) return tooltips
    return getCursorTooltips(tr.state)
  },

  provide: f => showTooltip.computeN([f], state => state.field(f))
})
