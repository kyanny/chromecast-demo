initializeCastApi = function() {
  console.log('initializeCastApi');
  var sessionRequest = new chrome.cast.SessionRequest(
                     chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    sessionListener,
    receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
  console.log('initializeCastApi 2');
};

function onInitSuccess() {
  console.log('onInitSuccess');
}

function onError() {
  console.log('onError');
}

function receiverListener(e) {
  console.log('receiverListener');
  if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    console.log('AVAILABLE');
    chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
  }
}

function onRequestSessionSuccess(e) {
  console.log('onRequestSessionSuccess');
  console.log(e);
  session = e;

  var mediaInfo = new chrome.cast.media.MediaInfo("https://dl.dropboxusercontent.com/u/4289117/cast/nekoru.jpg", "image/jpeg");
  console.log(mediaInfo);
  var request = new chrome.cast.media.LoadRequest(mediaInfo);
  console.log(request);
  session.loadMedia(request,
                    onMediaDiscovered.bind(this, 'loadMedia'),
                    onMediaError);
  console.log('onRequestSessionSuccess 2');
}

function loadMedia() {
}

function onMediaDiscovered(how, media) {
  console.log('onMediaDiscovered');
  console.log(how);
  console.log(media);
  currentMedia = media;
}

function onMediaError() {
  console.log('onMediaError');
}

function onLaunchError() {
  console.log('onLaunchError');
}

function sessionListener(e) {
  console.log('sessionListener');
  session = e;
  if (session.media.length != 0) {
    onMediaDiscovered('onRequestSessionSuccess', session.media[0]);
  }
  console.log('sessionListener 2');
}

if (!chrome.cast || !chrome.cast.isAvailable) {
  setTimeout(initializeCastApi, 1000);
}
