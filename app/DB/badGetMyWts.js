//
// (function(){
//     angular
//     .module('countryApp')
//     .factory('GetMyWts', [ 'WTS', 'pnUsers', '$q', '$firebaseObject',
//     GetMyWts
// ])
//
// function GetMyWts(WTS, pnUsers, $q, $fbo) {
//     var _GetMyWts = {
//         getKeys: getKeys
//         // me: me
//     }
//     function getKeys() {
//         var wts = WTS.wts_fbo()
//         var me_ref = pnUsers.me_ref()
//         var me_wts_ref = me_ref.child('wts')
//         var me_wts_fbo = $fbo(me_wts_ref)
//         var my_wts_posts = []
//         me_wts_fbo.$loaded().then(init)
//         function init() {
//             console.log(me_wts_fbo);
//             var mywtsids = _.filter(Object.keys(me_wts_fbo), function(k){
//                 if (k.charAt(0) != '$') return k
//             });
//             _.map(mywtsids, function(id){
//                 console.log(id);
//                 console.log(wts[id]);
//                 if (wts[id]) my_wts_posts.push(wts[id]);
//             })
//             return  $q.resolve(my_wts_posts)
//             // var mywtsids = _.pluck(me_wts_fbo, '$id')
//             // console.log(mywtsids);
//         }
//         return $q.defer()
//         // var myWts = []
//         // $q.all(wts, me).then(init)
//         // function init() {
//         //     // _.map(me.wts, functi)
//         //     // var mywtsids = _.pluck(me.wts, 'id')
//         //     console.log(me.wts);
//         //     // console.log(Object.keys(me.wts));
//         //
//         //     _.each( _.pluck(me.wts, 'id'), function(id){
//         //         myWts.push(wts[id])
//         //     })
//         //     return myWts
//         // }
//
//     }
//
//     //
//     return _GetMyWts
// };
//
// })();
