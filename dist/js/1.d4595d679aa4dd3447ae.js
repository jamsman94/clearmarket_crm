webpackJsonp([1],{614:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),e.d(n,"mapDispatchToProps",function(){return o}),e.d(n,"mapStateToProps",function(){return c});var r=e(71),a=e(240),u=e(788),o={updateData:function(t){return e.i(a.a)(t)},add:function(){return e.i(a.b)()},req:function(t){return e.i(a.c)(t)}},c=function(t){return{count:t.tradeHistory.count,list:t.tradeHistory.list}};n.default=e.i(r.connect)(c,o)(u.a)},788:function(t,n,e){"use strict";var r=e(0),a=e.n(r),u=e(57),o=e(1),c=e.n(o),i=e(789),s=function(t){var n=t.match;return a.a.createElement(a.a.Fragment,null,a.a.createElement(u.Route,{path:n.url+"/:id",component:i.Test}),a.a.createElement(u.Route,{exact:!0,path:""+n.url,component:i.b}))};s.propTypes={match:c.a.object},n.a=s},789:function(t,n,e){"use strict";e.d(n,"b",function(){return o});var r=e(39),a=e.n(r),u=e(38),o=a()({loader:function(){return e.e(15).then(e.bind(null,787))},loading:u.a})}});