var keyurl = 'https://www.mixcloud.com/player/details/?key='+encodeURIComponent(window.location.pathname),
  jqsrc = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
  onjQueryAvailable = function(oCallback) {
    if (typeof(jQuery) === 'function') {
        oCallback();
    } else {
        setTimeout(function () {
        window.onjQueryAvailable(oCallback);
        }, 50);
        
    }
},
gmloadScript = function(sScriptSrc) {
    var oHead = document.getElementsByTagName('head')[0],
    oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.src = sScriptSrc;
    oHead.appendChild(oScript);
},
fmtMSS = function(s){
	return(s-(s%=60))/60+(9<s?':':':0')+s;
},
insertMTEButton = function() {
	
	$.getJSON( keyurl ).done(function( brainzrapedata ) {
	  var brainzinsertionooo = '',
	  trackno = 1,
	  tracks = '',
	  timeindexes = '',
	  showhidebutton = '';
	  
	  
	  
	  for (var track in brainzrapedata.cloudcast.sections) {
	  	  starttime = (brainzrapedata.cloudcast.sections[track].start_time) ? brainzrapedata.cloudcast.sections[track].start_time : '';
		  if (brainzrapedata.cloudcast.sections[track].hasOwnProperty('chapter')) {
			  tracks += '<li ng-hide="juno.sections.length" class=""><em>'+trackno+'</em><b title="'+brainzrapedata.cloudcast.sections[track].title+'">'+brainzrapedata.cloudcast.sections[track].chapter+'</b> <span class="starttime"> | '+fmtMSS(starttime)+'</span></li>';
		  } else {	 
			  tracks += '<li ng-hide="juno.sections.length" class=""><em>'+trackno+'</em><b title="'+brainzrapedata.cloudcast.sections[track].title+'">'+brainzrapedata.cloudcast.sections[track].title+'</b> <small>by <span>'+brainzrapedata.cloudcast.sections[track].artist+'</span></small><span class="starttime"> | '+fmtMSS(starttime)+'</span></li>';
		  }
		  
		  trackno++;
		  timeindexes += (brainzrapedata.cloudcast.sections[track].start_time) ? brainzrapedata.cloudcast.sections[track].start_time+', ' : '';
	  }
	  

	  showhidebutton += '<a class="btn btn-small btn-inverse btn-toggled brainz-mte" m-click="tracklistShown=!tracklistShown" ng-class="{\'btn-toggled\': tracklistShown}" style="margin-left: 10px;"><svg class="" xmlns="http://www.w3.org/2000/svg" width="19px" height="14px" viewBox="0 0 19 14" version="1.1"><path d="M6,2h12c0.6,0,1-0.4,1-1s-0.4-1-1-1H6C5.4,0,5,0.4,5,1S5.4,2,6,2z M18,12H6c-0.6,0-1,0.4-1,1s0.4,1,1,1h12\n\r    	c0.6,0,1-0.4,1-1S18.6,12,18,12z M1.5,0H1C0.4,0,0,0.4,0,1s0.4,1,1,1h0.5c0.6,0,1-0.4,1-1S2.1,0,1.5,0z M1.5,12H1c-0.6,0-1,0.4-1,1\n\r    	s0.4,1,1,1h0.5c0.6,0,1-0.4,1-1S2.1,12,1.5,12z M18,6H6C5.4,6,5,6.4,5,7l0,0c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1l0,0\n\r    	C19,6.4,18.6,6,18,6z M1.5,6H1C0.4,6,0,6.4,0,7s0.4,1,1,1h0.5c0.6,0,1-0.4,1-1S2.1,6,1.5,6z"></path></svg><span ng-show="tracklistShown" class="">Hide </span><span ng-show="!tracklistShown" class="ng-hide">Show </span>tracklist</a>';
	  
	  
	  brainzinsertionooo += '<div ng-init="tracklistShown=false;"><div class="tracklist-wrap" ng-show="tracklistShown"><div class="inner-container"><div class="content"><h1>Tracklist <a class="showtimes">Show times</a></h1><ul class="show-tracklist" ng-init="tracklistShown=false;">';

	  brainzinsertionooo += tracks;
	  
	  brainzinsertionooo += '</ul></div></div></div></div><style type="text/css">.starttime { display: none; } .showntimes .starttime { display: inline; } .showtimes {font-size:0.5em; text-transform:uppercase;color: #990000;text-decoration: none;float: right;} body .tracklist-wrap { top: auto; margin-bottom: 0;}</style>';
	  
	  $('footer.actions').append(showhidebutton);
	  
	  $('.show-header').after(brainzinsertionooo);
	  
	  $('.brainz-mte').click(function() {
		if ( !$('.brainz-mte').hasClass('btn-toggled') ) {
			$('.brainz-mte').addClass('btn-toggled');
			$('.brainz-mte span').toggleClass('ng-hide');
			$('.tracklist-wrap').removeClass('ng-hide');
		} else {
			$('.brainz-mte').removeClass('btn-toggled');
			$('.brainz-mte span').toggleClass('ng-hide');
			$('.tracklist-wrap').addClass('ng-hide');
		}
	  });

	  $('.showtimes').click(function() {
		if ( !$('.tracklist-wrap').hasClass('showntimes') ) {
			$('.tracklist-wrap').addClass('showntimes');
			$('.showtimes').text('Hide times');
		} else {
			$('.tracklist-wrap').removeClass('showntimes');
			$('.showtimes').text('Show times');
		}
	  });
	  
	  return;
	});
};

if(!window.jQuery) {
   window.gmloadScript(jqsrc);
   window.onjQueryAvailable(insertMTEButton);
} else {  
   insertMTEButton();
}