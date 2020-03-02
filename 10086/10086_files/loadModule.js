/**
 * Created by ljh on 2017/7/7.
 */
(function () {
  var load = document.createElement("div");
  load.innerHTML = '<div class="mask-background"></div>'+
  '<div class="loadingimg"></div>';
  load.className  = 'mask-wrap';
  document.body.appendChild(load);
})();