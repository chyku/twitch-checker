$( document ).ready(function(){
  var channels = ['freecodecamp', 'annemunition', 'gamesdonequick', 'nightblue3', 'boxbox', 'TSM_dyrus', 'clintstevens', 'summit1g', 'BeyondTheSummit', 'brunofin'];
  var arr = [0,1,2,3,4,5,6,7,8,9];
  $.each(arr, function(index, i) {
    $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/'+channels[i], function(cinfo) {
      
      if (cinfo.hasOwnProperty('error')){
        var addhtml = '<a href="https://twitch.tv/' + channels[i] + '/" target="_blank"><div class="part offline">' + '<img src="https://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png"><span class="name"><b>'+channels[i] + '</b></span><div class="info">Channel does not exist or has been deleted.</div></div></a>';
        $(".channels").append(addhtml);
      } else {
        var addhtml = '<a href="https://twitch.tv/' + cinfo.name + '/" target="_blank">';

        $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+channels[i], function(sinfo) {
          if(sinfo.stream == null){
            addhtml += '<div class="part offline">' + '<img src="'+cinfo.logo+'"><span class="name"><b>'+cinfo.display_name + '</b></span><div class="info">Offline';

          } else {
            addhtml += '<div class="part online"><img src="'+cinfo.logo+'"><span class="name"><b>'+cinfo.display_name + '</b></span><div class="info">' + cinfo.status;
          }

          addhtml+= '</div></div></a>';
          $(".channels").append(addhtml);
        });
      }
    });

  });
  
  //sorting
  $(".all").click(function(){
    $(this).addClass("active");
    $(".small").removeClass("active");
    $(".part").removeClass("hidden");
    });
  });
  
  $(".on").click(function(){
    $(this).addClass("active");
    $(".all, .off").removeClass("active");
    $("div.part").each(function(thing){
    $(".online").removeClass("hidden");
    $(".offline").addClass("hidden");
  });
  
  $(".off").click(function(){
    $(this).addClass("active");
    $(".all, .on").removeClass("active");
    $(".offline").removeClass("hidden");
    $(".online").addClass("hidden");
  });
  
});