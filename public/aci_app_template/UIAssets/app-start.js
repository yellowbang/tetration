/**
 * Store token data sent by server locally and use it to set headers
 * (APIC-Challenge and DevCookie) while making REST API requests.
 * It is called in app-start.html when we open an app in APIC.
 * Unless the app is able to receive the token from backend in onBodyLoad function,
 * it does not set current window.location to app.html.
 */
function onBodyLoad() {
    var arr, url, newUrl = 'app.html';
    window.addEventListener('message', function(e) {
        // remove the loading spinner once we get response from server
        document.getElementById('loader').style.display = 'none';
        // confirm that the event was triggered by APIC
        if (e.source === window.parent) {
            var tokenObj = null;
            try {
                tokenObj = JSON.parse(e.data, true);
            }
            catch (e) {
                tokenObj = null;
            }
            if (tokenObj) {
                // Set cookie with token value which will be used to set headers while making api requests
                document.cookie = 'app_' + tokenObj.appId + '_token' + '=' + tokenObj.token;
                document.cookie = 'app_' + tokenObj.appId + '_urlToken' + '=' + tokenObj.urlToken;
                url = window.location.href;
                arr = url.split('?');
                // remove trailing "?" and set new href
                if (arr.length >= 2 && !(arr[1] == null || arr[1].length == 0)) {
                    newUrl += '?' + arr[1];
                }
                window.location.href = newUrl;
            } else {
                alert('Error - Can not load token from backend.');
            }
        }
    });
}
