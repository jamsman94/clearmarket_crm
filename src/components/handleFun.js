import createHistory from 'history/createHashHistory'
export const history = createHistory()

export const changeStyle = (val) => {
  const dom = document.getElementById('loading')
  dom.style.display = val || 'none'
}

export const formatDate = (needTime) => {
  if (needTime !== null) {
    const time = new Date(needTime)
    const ret = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
    return ret
  } else {
    return '---'
  }
}
