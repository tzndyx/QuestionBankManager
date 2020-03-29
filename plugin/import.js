/**
 * @author tongzn
 */
(function () {
    console.log(222)
    var baseUrl = '../../'
    var jsfiles = [
        "plugin/angular.js",
        "plugin/jquery.js",
        "plugin/main.js",
        "plugin/router.js",
    ];
    var cssfiles = [
        "css/common.css",
        "css/style.css",
    ];

    var i;
    for (i = 0; i < jsfiles.length; i++) {
        addTag('script', {
            "type": "text/javascript",
            "src": baseUrl + jsfiles[i]
        });
    }
    for (i = 0; i < cssfiles.length; i++) {
        addTag('link', {
            "rel": "stylesheet",
            "href": baseUrl + cssfiles[i]
        });
    }
    window.addTag = addTag;

    function addTag(name, attributes) {
        var el = document.createElement(name), attrName;
        for (attrName in attributes) {
            el[attrName] = attributes[attrName];
            // el.setAttribute(attrName, attributes[attrName]);
        }
        document.write(outerHTML(el));
        document.close();
    }

    function outerHTML(node) {
        // if IE, Chrome take the internal method otherwise build one
        return node.outerHTML || (function (n) {
            var div = document.createElement('div'), h;
            div.appendChild(n);
            h = div.innerHTML;
            div = null;
            return h;
        })(node);
    }

})();

