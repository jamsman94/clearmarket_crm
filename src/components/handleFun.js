import createHistory from 'history/createHashHistory'
export const history = createHistory()

export const changeStyle = (val) => {
  const dom = document.getElementById('loading')
  dom.style.display = val || 'none'
}

export const dateFormate = date => (date || '').replace(/T/, ' ').replace(/\+.*/, '')
