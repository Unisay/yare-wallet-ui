export function unsafeSetInnerHTML(element) {
    return function (html) {
        return function () {
            element.innerHTML = html;
        };
    };
}
