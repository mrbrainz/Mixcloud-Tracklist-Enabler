var keyurl = 'https://www.mixcloud.com/player/details/?key='+encodeURIComponent(window.location.pathname);
		
$.getJSON( keyurl ).done(function( brainzrapedata ) {
  var brainzinsertionooo = '',
  trackno = 1,
  tracks = '',
  timeindexes = '',
  showhidebutton = '';
  
  
  
  for (var track in brainzrapedata.cloudcast.sections) {
	  if (brainzrapedata.cloudcast.sections[track].hasOwnProperty('chapter')) {
		  tracks += '<li ng-hide="juno.sections.length" class=""><em>'+trackno+'</em><b title="'+brainzrapedata.cloudcast.sections[track].title+'">'+brainzrapedata.cloudcast.sections[track].chapter+'</b></li>';
	  } else {	 
		  tracks += '<li ng-hide="juno.sections.length" class=""><em>'+trackno+'</em><b title="'+brainzrapedata.cloudcast.sections[track].title+'">'+brainzrapedata.cloudcast.sections[track].title+'</b><small>by <span>'+brainzrapedata.cloudcast.sections[track].artist+'</span></small></li>';
	  }
	  
	  trackno++;
	  timeindexes += (brainzrapedata.cloudcast.sections[track].start_time) ? brainzrapedata.cloudcast.sections[track].start_time+', ' : '';
  }
  

  showhidebutton += '<a class="btn btn-small btn-inverse brainz-mte" m-click="tracklistShown=!tracklistShown" ng-class="{\'btn-toggled\': tracklistShown}"><svg class="" xmlns="http://www.w3.org/2000/svg" width="19px" height="14px" viewBox="0 0 19 14" version="1.1"><path d="M6,2h12c0.6,0,1-0.4,1-1s-0.4-1-1-1H6C5.4,0,5,0.4,5,1S5.4,2,6,2z M18,12H6c-0.6,0-1,0.4-1,1s0.4,1,1,1h12\n\rc0.6,0,1-0.4,1-1S18.6,12,18,12z M1.5,0H1C0.4,0,0,0.4,0,1s0.4,1,1,1h0.5c0.6,0,1-0.4,1-1S2.1,0,1.5,0z M1.5,12H1c-0.6,0-1,0.4-1,1\n\rs0.4,1,1,1h0.5c0.6,0,1-0.4,1-1S2.1,12,1.5,12z \n\rC19,6.4,18.6,6,18,6z M1.5,6H1C0.4,6,0,6.4,0,7s0.4,1,1,1h0.5c0.6,0,1-0.4,1-1S2.1,6,1.5,6z"></path></svg><span ng-show="tracklistShown" class="ng-hide">Hide </span><span ng-show="!tracklistShown" class="">Show </span>tracklist</a>';
  
  
  brainzinsertionooo += '<div ng-init="tracklistShown=false;"><div class="tracklist-wrap" ng-show="tracklistShown"><div class="inner-container"><div class="content"><h1>Tracklist</h1><ul class="show-tracklist" ng-init="tracklistShown=false;">';

  brainzinsertionooo += tracks;
  
  brainzinsertionooo += '</ul></div></div></div></div>';

  $('footer.actions').append(showhidebutton);
  
  $('.show-header').after(brainzinsertionooo);
  
  $('.brainz-mte').click(function() {
	if ( !$('.cloudcast-tracklist').hasClass('btn-toggled') ) {
		$('.cloudcast-tracklist').addClass('btn-toggled');
		$('.tracklist-wrap').removeClass('ng-hide');
	} else {
		$('.cloudcast-tracklist').removeClass('btn-toggled');
		$('.tracklist-wrap').addClass('ng-hide');
	}
  });
  
  return;
});