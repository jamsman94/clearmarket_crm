// 代码拆分 -- splitcode
import Loadable from 'react-loadable'
import Loading from 'components/Loading'
// 功能首页
export const HomePage = (
  Loadable({
    loader: () => import('./tmpl/homePage'),
    loading: Loading
  })
)
// 雪儿
export const Test = (
  Loadable({
    loader: () => import('./tmpl/test'),
    loading: Loading
  })
)
