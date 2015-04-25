// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Runelytics',
  DESCRIPTION: 'RuneScape professional tracking system.'
};

getViewPort = function () {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    }
}

runResponsiveFunctions = function () {
    // reinitialize other subscribed elements
    for (var i in responsiveFunctions) {
        var each = responsiveFunctions[i];
        each.call();
    }
}

/*-----------------------------------------------------------------------------------*/
/*	Sidebar & Main Content size match
/*-----------------------------------------------------------------------------------*/
handleSidebarAndContentHeight = function () {
    var content = $('#content');
    var sidebar = $('#sidebar');
    var body = $('body');
    var height;

    if (body.hasClass('sidebar-fixed')) {
        height = $(window).height() - $('#header').height() + 1;
    } else {
        height = sidebar.height() + 20;
    }
    if (height >= content.height()) {
        content.attr('style', 'min-height:' + height + 'px !important');
    }
}

// Scroll to top
scrollTop = function (el, offeset) {
    pos = (el && el.size() > 0) ? el.offset().top : 0;
    jQuery('html,body').animate({
        scrollTop: pos + (offeset ? offeset : 0)
    }, 'slow');
}


