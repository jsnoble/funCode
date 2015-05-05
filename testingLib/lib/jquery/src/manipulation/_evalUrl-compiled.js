"use strict";

define(["../ajax"], function (jQuery) {

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			throws: true
		});
	};

	return jQuery._evalUrl;
});

//# sourceMappingURL=_evalUrl-compiled.js.map