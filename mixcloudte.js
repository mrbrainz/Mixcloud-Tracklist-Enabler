var keyurl = 'https://www.mixcloud.com/player/details/?key='+encodeURIComponent(window.location.pathname);
		
$.getJSON( keyurl ).done(function( brainzrapedata ) {
  var brainzinsertionooo = '',
  trackno = 1,
  tracks = '',
  timeindexes = '';
  
  
  
  for (var track in brainzrapedata.cloudcast.sections) {
	  if (brainzrapedata.cloudcast.sections[track].hasOwnProperty('chapter')) {		  
		  tracks += '<div class="track-row cf"><div class="container"><div class="track-name tracklist-chapter" title="'+brainzrapedata.cloudcast.sections[track].chapter+'"><span class="track-number">'+trackno+'.</span>'+brainzrapedata.cloudcast.sections[track].chapter+'</div></div></div>';
	  } else {	  
		  tracks += '<div class="track-row cf"><div class="container"><div class="track-name" title="'+brainzrapedata.cloudcast.sections[track].title+'"><span class="track-number">'+trackno+'.</span><a class="track-song-name-link" href="'+brainzrapedata.cloudcast.sections[track].track_url+'" target="_blank">'+brainzrapedata.cloudcast.sections[track].title+'</a></div><div class="track-by"><span class="track-by-name">by</span><a class="artist-name-link" href="'+brainzrapedata.cloudcast.sections[track].artist_url+'" target="_blank"><strong>'+brainzrapedata.cloudcast.sections[track].artist+'</strong></a></div></div></div>';
	  }
	  
	  trackno++;
	  timeindexes += (brainzrapedata.cloudcast.sections[track].start_time) ? brainzrapedata.cloudcast.sections[track].start_time+', ' : '';
  }
  
  brainzinsertionooo += '<div ng-controller="CloudcastHeaderCtrl" class="ng-scope"><div ng-init="tracklistShown=false;audioLength='+brainzrapedata.cloudcast.audio_length+';sectionStartTimes=['+timeindexes.substring(0, timeindexes.length - 2)+'"><div class="tracklist-toggle-container"><svg version="1.1" class="tracklist-toggle-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="160px" height="26px" viewBox="0 0 160 26" enable-background="new 0 0 160 26" xml:space="preserve"><switch><g><path fill-rule="evenodd" clip-rule="evenodd" d="M160,26c0,0-5-2.135-5-5.043C155,14.744,155,5,155,5c0-2.761-2.238-5-5-5H10C7.239,0,5,2.239,5,5c0,0,0,9.803,0,16.014C5,23.893,0,26,0,26H160z"></path></g><foreignObject width="0" height="0" overflow="hidden"><div class="tracklist-toggle-fallback"></div></foreignObject></switch></svg><div class="tracklist-toggle-text" m-click="tracklistShown=!tracklistShown"><span ng-show="tracklistShown" class="tracklist-toggle-arrow arrow-show ng-hide"><span class="tracklist-toggle-text-content">Hide </span></span><span ng-show="!tracklistShown" class="tracklist-toggle-arrow"><span class="tracklist-toggle-text-content">Show </span></span><span class="tracklist-toggle-text-content">Tracklist</span></div></div><div class="cloudcast-tracklist" ng-class="{\'open\':tracklistShown}">';
  
  brainzinsertionooo += tracks;
  
  brainzinsertionooo += '</div></div></div>';
  
  $('.cloudcast-header').after(brainzinsertionooo);
  
  $('.tracklist-toggle-text').click(function() {
	if ( !$('.cloudcast-tracklist').hasClass('open') ) {
		$('.tracklist-toggle-arrow:nth-child(2)').addClass('ng-hide');
		$('.arrow-show').removeClass('ng-hide');
		$('.cloudcast-tracklist').addClass('open');
	} else {
		$('.tracklist-toggle-arrow:nth-child(2)').removeClass('ng-hide');
		$('.arrow-show').addClass('ng-hide');
		$('.cloudcast-tracklist').removeClass('open');
	}
  });
  
  return;
});