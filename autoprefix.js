var AutoprefixStyleProp = function(styleProp, userAgent) {

    if (!userAgent) {
        // use `this` instead of `global` to be accomodate browsers without Webpack
        userAgent = window.navigator
          ? window.navigator.userAgent
          : null;

        var isSafari = userAgent && userAgent.includes("WebKit") && !userAgent.includes("Chrom");
    }

    var result = {};

    for (var key in styleProp) {

        // Browser sniffing sucks, but Safari overloads display, and there's
        // no way to set a style key to two values in React
        if (isSafari && key === "display" && styleProp["display"].includes("flex")) {
            result["display"] = "-webkit-" + styleProp["display"];

        } else if (isSafari && flexboxKeys.includes(key)) {
            var titleCasedKey = key.substring(0, 1).toUpperCase() + key.substring(1);
            result[titleCasedKey] = styleProp[key];

        } else {
            result[key] = styleProp[key];
        }
        
    };
    
    return result;
}

export default AutoprefixStyleProp;