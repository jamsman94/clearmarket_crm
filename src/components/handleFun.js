import createHistory from 'history/createHashHistory'
export const history = createHistory()

export const changeStyle = (val) => {
  const dom = document.getElementById('loading')
  dom.style.display = val || 'none'
}

export const formatDate = (needTime) =>
{
  const add0=()=>m<10?'0'+m:m

  // needTime是整数，否则要parseInt转换
  const time = new Date(needTime);
  const y = time.getFullYear();
  const m = time.getMonth()+1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
