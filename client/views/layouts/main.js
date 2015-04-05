Template['MainLayout'].helpers({
	
});

Template['MainLayout'].events({
	'click .footer-tools': function () {
		scrollTop();
		event.preventDefault;
	},

	/*-----------------------------------------------------------------------------------*/
	/* Box tools
	/*-----------------------------------------------------------------------------------*/
	//Collapse
	'click .box .tools .collapse, click .box .tools .expand': function (event) {
		var self = event.currentTarget;
        var el = jQuery(self).parents(".box").children(".box-body");
        if (jQuery(self).hasClass("collapse")) {
			jQuery(self).removeClass("collapse").addClass("expand");
            var i = jQuery(self).children(".fa-chevron-up");
			i.removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideUp(200);
        } else {
			jQuery(self).removeClass("expand").addClass("collapse");
            var i = jQuery(self).children(".fa-chevron-down");
			i.removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideDown(200);
        }
        event.preventDefault();
    }
});