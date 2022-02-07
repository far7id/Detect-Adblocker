import { createBaitRequest } from './helpers.js'

/**
 * Detect if any known ad blocker mechanism is detected
 * @return Promise
 */
export default function detectAnyAdblocker(){
  return new Promise(function(resolve, reject) {
    // check dom adblockers first
    resolve(false);
  });
};
