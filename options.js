$(document).ready(function() {
    //var background = chrome.extension.getBackgroundPage().self;
    //var redirects = background.redirects;

    chrome.storage.local.get('redirects', function(data) {
        for (var i = 0; i < data.redirects.length; i++) {
            $('#list').append('<tr class="entry"><td><input class="original" value="' + data.redirects[i].original + '"></td><td><input class="redirect" value="' + data.redirects[i].redirect + '"></td><td><button class="remove">X</button></td></tr>');
        }
    });

    $('table#list').on("click", "button.remove", function() {
        $(this).parent().parent().remove();
    });

    $("button#add").on("click", function() {
        $('#list').append('<tr class="entry"><td><input class="original"></td><td><input class="redirect"></td><td><button class="remove">X</button></td></tr>');
    });

    $("button#save").on("click", function() {
        let redirects = new Array();
        $('table#list tr.entry').each(function(index) {
            redirects[index] = {original: $(this).find('input.original')[0].value, redirect: $(this).find('input.redirect')[0].value}
        });
        chrome.storage.local.set({redirects: redirects});
    });

});