$(document).ready(function() {
    var redirects = new Array();
    redirects[0] = {original: "www.reddit.com", redirect: "old.reddit.com"};
    redirects[1] = {original: "en.m.wikipedia.org", redirect: "en.wikipedia.org"};

    chrome.storage.local.set({redirects: redirects});

    chrome.storage.onChanged.addListener(function(changes, areaName) {
        chrome.storage.local.get('redirects', function(data) {
            redirects = data.redirects
        });
    });

    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
            var request = new URL(details.url);
            for (var i = 0; i < redirects.length; i++) {
                if (request.hostname == redirects[i].original) {
                    return {redirectUrl: "http://" + redirects[i].redirect + request.pathname};
                }
            }
        },
        {
            types: ["main_frame"],
            urls: ["<all_urls>"]
        },   ["blocking"]
    );
});