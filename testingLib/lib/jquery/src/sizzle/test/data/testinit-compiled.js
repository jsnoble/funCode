"use strict";

var fireNative,
    jQuery = undefined.jQuery || "jQuery",
    // For testing .noConflict()
$ = undefined.$ || "$",
    originaljQuery = jQuery,
    original$ = $;

(function () {
	// Config parameter to force basic code paths
	QUnit.config.urlConfig.push({
		id: "basic",
		label: "Bypass optimizations",
		tooltip: "Force use of the most basic code by disabling native querySelectorAll; contains; compareDocumentPosition"
	});
	if (QUnit.urlParams.basic) {
		document.querySelectorAll = null;
		document.documentElement.contains = null;
		document.documentElement.compareDocumentPosition = null;
		// Return array of length two to pass assertion
		// But support should be false as its not native
		document.getElementsByClassName = function () {
			return [0, 1];
		};
	}
})();

/**
 * Returns an array of elements with the given IDs
 * @example q("main", "foo", "bar")
 * @result [<div id="main">, <span id="foo">, <input id="bar">]
 */
function q() {
	var r = [],
	    i = 0;

	for (; i < arguments.length; i++) {
		r.push(document.getElementById(arguments[i]));
	}
	return r;
}

/**
 * Asserts that a select matches the given IDs
 * @param {String} a - Assertion name
 * @param {String} b - Sizzle selector
 * @param {String} c - Array of ids to construct what is expected
 * @example t("Check for something", "//[a]", ["foo", "baar"]);
 * @result returns true if "//[a]" return two elements with the IDs 'foo' and 'baar'
 */
function t(a, b, c) {
	var f = Sizzle(b),
	    s = "",
	    i = 0;

	for (; i < f.length; i++) {
		s += (s && ",") + "\"" + f[i].id + "\"";
	}

	deepEqual(f, q.apply(q, c), a + " (" + b + ")");
}

/**
 * Add random number to url to stop caching
 *
 * @example url("data/test.html")
 * @result "data/test.html?10538358428943"
 *
 * @example url("data/test.php?foo=bar")
 * @result "data/test.php?foo=bar&10538358345554"
 */
function url(value) {
	return value + (/\?/.test(value) ? "&" : "?") + new Date().getTime() + "" + parseInt(Math.random() * 100000);
}

var createWithFriesXML = function createWithFriesXML() {
	var string = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> \t<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" \t\txmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" \t\txmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"> \t\t<soap:Body> \t\t\t<jsconf xmlns=\"http://www.example.com/ns1\"> \t\t\t\t<response xmlns:ab=\"http://www.example.com/ns2\"> \t\t\t\t\t<meta> \t\t\t\t\t\t<component id=\"seite1\" class=\"component\"> \t\t\t\t\t\t\t<properties xmlns:cd=\"http://www.example.com/ns3\"> \t\t\t\t\t\t\t\t<property name=\"prop1\"> \t\t\t\t\t\t\t\t\t<thing /> \t\t\t\t\t\t\t\t\t<value>1</value> \t\t\t\t\t\t\t\t</property> \t\t\t\t\t\t\t\t<property name=\"prop2\"> \t\t\t\t\t\t\t\t\t<thing att=\"something\" /> \t\t\t\t\t\t\t\t</property> \t\t\t\t\t\t\t\t<foo_bar>foo</foo_bar> \t\t\t\t\t\t\t</properties> \t\t\t\t\t\t</component> \t\t\t\t\t</meta> \t\t\t\t</response> \t\t\t</jsconf> \t\t</soap:Body> \t</soap:Envelope>";

	return jQuery.parseXML(string);
};

fireNative = document.createEvent ? function (node, type) {
	var event = document.createEvent("HTMLEvents");
	event.initEvent(type, true, true);
	node.dispatchEvent(event);
} : function (node, type) {
	var event = document.createEventObject();
	node.fireEvent("on" + type, event);
};

function testIframeWithCallback(title, fileName, func) {
	test(title, function () {
		var iframe;

		stop();
		window.iframeCallback = function () {
			var self = this,
			    args = arguments;
			setTimeout(function () {
				window.iframeCallback = undefined;
				iframe.remove();
				func.apply(self, args);
				func = function () {};
				start();
			}, 0);
		};
		iframe = jQuery("<div/>").css({ position: "absolute", width: "500px", left: "-600px" }).append(jQuery("<iframe/>").attr("src", url("./data/" + fileName))).appendTo("#qunit-fixture");
	});
};
window.iframeCallback = undefined;

function moduleTeardown() {}

//# sourceMappingURL=testinit-compiled.js.map