webpackJsonp([2],{612:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),e.d(t,"mapDispatchToProps",function(){return o}),e.d(t,"mapStateToProps",function(){return c});var r=e(71),a=e(239),u=e(783),o={updateData:function(n){return e.i(a.a)(n)},add:function(){return e.i(a.b)()},req:function(n){return e.i(a.c)(n)}},c=function(n){return{count:n.example.count,list:n.example.list}};t.default=e.i(r.connect)(c,o)(u.a)},783:function(n,t,e){"use strict";var r=e(0),a=e.n(r),u=e(57),o=e(1),c=e.n(o),i=e(784),l=function(n){var t=n.match;return a.a.createElement(a.a.Fragment,null,a.a.createElement(u.Route,{path:t.url+"/:id",component:i.a}),a.a.createElement(u.Route,{exact:!0,path:""+t.url,component:i.b}))};l.propTypes={match:c.a.object},t.a=l},784:function(n,t,e){"use strict";e.d(t,"b",function(){return o}),e.d(t,"a",function(){return c});var r=e(39),a=e.n(r),u=e(38),o=a()({loader:function(){return e.e(11).then(e.bind(null,785))},loading:u.a}),c=a()({loader:function(){return e.e(12).then(e.bind(null,786))},loading:u.a})}});