import React from 'react'
import {format} from 'date-fns'

const COPYRIGHT = `\u00A9 2008 – ${format(Date.now(), 'yyyy')} Raul Matei`

export default () => (
  <footer>
    {COPYRIGHT}
  </footer>
)
