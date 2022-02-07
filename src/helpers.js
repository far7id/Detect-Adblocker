/**
 * Take a function that normally return a primitive value (ex: Boolean)
 * and return a function that return a Promise instead
 */
export function valueOutputToPromise(func) {
  return function() {
    var args = arguments;
    return new Promise(function(resolve, reject) {
      var result = func.apply(this, args);
      resolve(result);
    });
  };
}

/**
 * Wraps a function so it indicate that it is deprecated
 */
export function wrapDeprecated(func, message){
  return function() {
    console.warn('just-detect-adblock : ' + (message || 'This method is deprecated.'));
    return func.apply(this, arguments);
  };
};

/**
 * Create a DOM element that should be seen as an ad by adblockers
 * @return DOM element
 */
export function createBaitElement(){
  var bait = document.createElement('div');

  bait.setAttribute('class', 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ad-text adSense adBlock adContent adBanner');
  bait.setAttribute('style', 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;');

  return bait;
};

/**
 * Check if a DOM element seems to be blocked by an adblocker or not
 * @return Boolean
 */
export function doesElementIsBlocked(elem){
  if(elem.offsetParent === null
  || elem.offsetHeight == 0
  || elem.offsetLeft == 0
  || elem.offsetTop == 0
  || elem.offsetWidth == 0
  || elem.clientHeight == 0
  || elem.clientWidth == 0) {
    return true;
  } else if(window.getComputedStyle !== undefined) {
    var elemCS = window.getComputedStyle(elem, null);
    if(elemCS && (elemCS.getPropertyValue('display') == 'none' || elemCS.getPropertyValue('visibility') == 'hidden')) {
      return true;
    }
  }

  return false;
};

/**
 * Create and execute an XMLHttpRequest that should be blocked by an adblocker
 * @return Promise
 */
export function createBaitRequest() {
  return new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState == 4) {
        resolve(xhttp);
      }
    };
    xhttp.open('GET', 'https://raw.githubusercontent.com/wmcmurray/just-detect-adblock/master/baits/pagead2.googlesyndication.com', true);
    xhttp.send();
  });
}

