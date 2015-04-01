Template['sidebar'].helpers({

});

var collapseSidebar = function () {
	var iconElem = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]');
	var iconLeft = iconElem.getAttribute("data-icon1");
	var iconRight = iconElem.getAttribute("data-icon2");
	/* For Navbar */
	jQuery('.navbar-brand').addClass("mini-menu");
	/* For sidebar */
	jQuery('#sidebar').addClass("mini-menu");
	jQuery('#main-content').addClass("margin-left-50");
	jQuery('.sidebar-collapse i').removeClass(iconLeft);
	jQuery('.sidebar-collapse i').addClass(iconRight);
	/* Remove placeholder from Search Bar */
	jQuery('.search').attr('placeholder', '');
	collapsed = true;
	/* Set a cookie so that mini-sidebar persists */
	$.cookie('mini_sidebar', '1');
}

Template['sidebar'].events({
	'click .sidebar-menu .has-sub > a': function (event) {
		var self = event.target;
		var last = jQuery('.has-sub.open', $('.sidebar-menu'));
		last.removeClass("open");
        jQuery('.arrow', last).removeClass("open");
        jQuery('.sub', last).slideUp(200);

        var thisElement = $(this);
		var slideOffeset = -200;
        var slideSpeed = 200;
		
        var sub = jQuery(self).next();
        if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(self)).removeClass("open");
            jQuery(self).parent().removeClass("open");
            sub.slideUp(slideSpeed, function () {
				if ($('#sidebar').hasClass('sidebar-fixed') == false) {
					scrollTo(thisElement, slideOffeset);
				}
				handleSidebarAndContentHeight();
            });
        } else {
            jQuery('.arrow', jQuery(self)).addClass("open");
            jQuery(self).parent().addClass("open");
            sub.slideDown(slideSpeed, function () {
				if ($('#sidebar').hasClass('sidebar-fixed') == false) {
					scrollTo(thisElement, slideOffeset);
				}
				handleSidebarAndContentHeight();
            });
        }
	},
	'click .sidebar-menu .has-sub .sub .has-sub-sub > a': function() {
		var self = event.target;
		var last = jQuery('.has-sub-sub.open', $('.sidebar-menu'));
        last.removeClass("open");
        jQuery('.arrow', last).removeClass("open");
        jQuery('.sub', last).slideUp(200);
            
        var sub = jQuery(self).next();
        if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(self)).removeClass("open");
            jQuery(self).parent().removeClass("open");
            sub.slideUp(200);
        } else {
            jQuery('.arrow', jQuery(self)).addClass("open");
            jQuery(self).parent().addClass("open");
            sub.slideDown(200);
        }
	}
});

/*-----------------------------------------------------------------------------------*/
/*	Responsive Sidebar Collapse
/*-----------------------------------------------------------------------------------*/
var responsiveSidebar = function () {
	//Handle sidebar collapse on screen width
	var width = $(window).width();
	if ( width < 768 ) {
		is_mobile = true;
		//Hide the sidebar completely
		jQuery('#main-content').addClass("margin-left-0");
	}
	else {
		is_mobile = false;
		//Show the sidebar completely
		jQuery('#main-content').removeClass("margin-left-0");
		var menu = $('.sidebar');
		if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before resizing
			menu.slimScroll({
				destroy: true
			});
			menu.removeAttr('style');
			$('#sidebar').removeAttr('style');
		}
	}
}

/*-----------------------------------------------------------------------------------*/
/*	Sidebar Collapse
/*-----------------------------------------------------------------------------------*/
var handleSidebarCollapse = function () {
	var viewport = getViewPort();
    if ($.cookie('mini_sidebar') === '1') {
		/* For Navbar */
		jQuery('.navbar-brand').addClass("mini-menu");
		/* For sidebar */
		jQuery('#sidebar').addClass("mini-menu");
		jQuery('#main-content').addClass("margin-left-50");
		collapsed = true;
    }
	//Handle sidebar collapse on user interaction
	jQuery('.sidebar-collapse').click(function () {
		//Handle mobile sidebar toggle
		if(is_mobile && !(is_mini_menu)){
			//If sidebar is collapsed
			if(collapsed){
				jQuery('body').removeClass("slidebar");
				jQuery('.sidebar').removeClass("sidebar-fixed");
				//Add fixed top nav if exists
				if(is_fixed_header) {
					jQuery('#header').addClass("navbar-fixed-top");
					jQuery('#main-content').addClass("margin-top-100");
				}
				collapsed = false;
				$.cookie('mini_sidebar', '0');
			}
			else {
				jQuery('body').addClass("slidebar");
				jQuery('.sidebar').addClass("sidebar-fixed");
				//Remove fixed top nav if exists
				if(is_fixed_header) {
					jQuery('#header').removeClass("navbar-fixed-top");
					jQuery('#main-content').removeClass("margin-top-100");
				}
				collapsed = true;
				$.cookie('mini_sidebar', '1');
				handleMobileSidebar();
			}
		}
		else { //Handle regular sidebar toggle
			var iconElem = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]');
			var iconLeft = iconElem.getAttribute("data-icon1");
			var iconRight = iconElem.getAttribute("data-icon2");
			//If sidebar is collapsed
			if(collapsed){
				/* For Navbar */
				jQuery('.navbar-brand').removeClass("mini-menu");
				/* For sidebar */
				jQuery('#sidebar').removeClass("mini-menu");
				jQuery('#main-content').removeClass("margin-left-50");
				jQuery('.sidebar-collapse i').removeClass(iconRight);
				jQuery('.sidebar-collapse i').addClass(iconLeft);
				/* Add placeholder from Search Bar */
				jQuery('.search').attr('placeholder', "Search");
				collapsed = false;
				$.cookie('mini_sidebar', '0');
			}
			else {
				/* For Navbar */
				jQuery('.navbar-brand').addClass("mini-menu");
				/* For sidebar */
				jQuery('#sidebar').addClass("mini-menu");
				jQuery('#main-content').addClass("margin-left-50");
				jQuery('.sidebar-collapse i').removeClass(iconLeft);
				jQuery('.sidebar-collapse i').addClass(iconRight);
				/* Remove placeholder from Search Bar */
				jQuery('.search').attr('placeholder', '');
				collapsed = true;
				$.cookie('mini_sidebar', '1');
			}
			$("#main-content").on('resize', function (e) {
				e.stopPropagation();
			});
		}
    });
}

/*-----------------------------------------------------------------------------------*/
/*	Handle Fixed Sidebar on Mobile devices
/*-----------------------------------------------------------------------------------*/
var handleMobileSidebar = function () {
    var menu = $('.sidebar');
	if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
        menu.slimScroll({
            destroy: true
        });
        menu.removeAttr('style');
        $('#sidebar').removeAttr('style');
    }
    menu.slimScroll({
        size: '7px',
        color: '#a1b2bd',
        opacity: .3,
        height: "100%",
        allowPageScroll: false,
        disableFadeOut: false
    });
}
/*-----------------------------------------------------------------------------------*/
/*	Handle Fixed Sidebar
/*-----------------------------------------------------------------------------------*/
var handleFixedSidebar = function () {
    var menu = $('.sidebar-menu');

    if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
        menu.slimScroll({
            destroy: true
        });
        menu.removeAttr('style');
        $('#sidebar').removeAttr('style');
    }

    if ($('.sidebar-fixed').size() === 0) {
        handleSidebarAndContentHeight();
        return;
    }

    var viewport = getViewPort();
    if (viewport.width >= 992) {
        var sidebarHeight = $(window).height() - $('#header').height() + 1;

        menu.slimScroll({
            size: '7px',
            color: '#a1b2bd',
            opacity: .3,
            height: sidebarHeight,
            allowPageScroll: false,
            disableFadeOut: false
        });
        handleSidebarAndContentHeight();
    }
}