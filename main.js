var $banner=(function(){
  var $ban = $(''
    + '<div class="slider" id="slider">'
      + '<div class="slide"><img src="img/b5.png" alt=""></div>'
      + '<div class="slide"><img src="img/b1.png" alt=""></div>'
      + '<div class="slide"><img src="img/b2.png" alt=""></div>'
      + '<div class="slide"><img src="img/b3.png" alt=""></div>'
      + '<div class="slide"><img src="img/b4.png" alt=""></div>'
      + '<div class="slide"><img src="img/b5.png" alt=""></div>'
      + '<div class="slide"><img src="img/b1.png" alt=""></div>'
    + '</div>'
    + '<span id="left"><</span>'
    + '<span id="right">></span>'
    + '<ul class="nav" id="navs">'
      + '<li class="active">1</li>'
      + '<li>2</li>'
      + '<li>3</li>'
      + '<li>4</li>'
      + '<li>5</li>'
    + '</ul>');

  function show(){
    var num = 1,
        isloading = false;
    var timer = setInterval(next, 3000);
    var $box = $('#box');
    $box.append($ban);
    var $slider = $('#slider');
    var $left = $('#left');
    var $right = $('#right');
    var $navs = $('#navs').children();

    $box.mouseover(function(){
      left.style.opacity = 0.5;
      right.style.opacity = 0.5;
      clearInterval(timer)
    })

    $box.mouseout(function(){
      left.style.opacity = 0;
      right.style.opacity = 0;
      timer = setInterval(next,3000);
    })

    $left.click(function(){
      prev();
    })

    $right.click(function(){
      next();
    })

    function prev(){
      if(isloading){
        return;
      }
      isloading = true;
      num--;
      navs();
      animate(slider, {left: -1200*num}, function(){
        if(num == 0){
          slider.style.left = '-6000px';
          num = 5;
        }
        isloading = false;
      });
    }

    function next(){
      if(isloading){
        return;
      }
      isloading = true;
      num++;
      navs();
      animate(slider, {left: -1200*num}, function(){
        if(num == 6){
          slider.style.left = '-1200px';
          num = 1;
        }
        isloading = false;
      });
    }

    for(var i = 0; i < $navs.length; i++){
      (function(i){
        $navs[i].onclick = function(){
          num = i+1;
          navs();
          animate(slider, {left: -1200*num});
        }
      })(i);
    }

    function navs(){
      for(var i = 0; i < $navs.length; i++){
        $navs[i].className = "";
      }
      if(num > 5){
        $navs[0].className = "active";
      }else if(num <= 0){
        $navs[4].className = "active";
      }else {
        $navs[num-1].className = "active";
      }
    }

    function getStyle(obj, attr){
      if(obj.currentStyle){
        return obj.currentStyle[attr];
      } else {
        return getComputedStyle(obj, null)[attr];
      }
    }

    function animate(obj, json, callback){
      clearInterval(obj.timer);
      obj.timer = setInterval(function(){
        var isStop = true;
        for(var attr in json){
          var now = 0;
          if(attr == 'opacity'){
            now = parseInt(getStyle(obj, attr) * 100);
          }else{
            now = parseInt(getStyle(obj, attr));
          }
          var speed = (json[attr] - now) / 8;
          speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
          var cur = now + speed;
          if(attr == 'opacity'){
            obj.style[attr] = cur / 100;
          }else{
            obj.style[attr] = cur + 'px';
          }
          if(json[attr] !== cur){
            isStop = false;
          }
        }
        if(isStop){
          clearInterval(obj.timer);
          callback&&callback();
        }
      }, 30)
    }
  }
  return {show: show}
})()
