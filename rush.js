(function (rush) {

    // The constructor wrapper
    rush = function (a) {
        return new RushObject(a);
    };

    var extend = function (what, with_what) {
        for (var name in with_what)what[name] = with_what[name];
    };

    // The constructor function
    var RushObject = function (a) {
        if (a != undefined)
            if (typeof a == 'function')
                document.addEventListener('DOMContentReady', a);
            else this.add(a);
    };

    RushObject.prototype = [];

    // Extending the RushObject prototype (Mass-object methods)
    extend(RushObject.prototype, {
        query: function (wat) {
            this.reset();
            this.add(wat);
        },
        add: function (wat) {
            var self = this;
            wat instanceof NodeList && (wat = [].slice.call(wat));
            if(wat instanceof Array)
                wat.forEach(function(el){self.push(el);});
            else if(wat instanceof Element)
                this.push(wat);
            else
                return this.add(document.querySelectorAll(wat));
            return this;
        },
        css: function (csar) {
            this.forEach(function (content) {
                content.css(csar);
            });
            return this;
        },
        html: function (content) {
            this.forEach(function (element) {
                element.html(content);
            });
        },
        reset: function () {
            while (this.length)
                this.pop();
            return this;
        }
    });

    // Extending the Element prototype (Single-object methods)
    extend(Element.prototype, {
        css: function (csar) {
            for (var index in csar) {
                this.style[index] = csar[index];
            }
            return this;
        },
        html: function (html) {
            this.innerHTML = html;
        },
        text: function(text){
            this.textContent = text;
        },
        next: function () {
            return this.nextSibling;
        },
        prev: function () {
            return this.previousSibling;
        },
        hide: function(){
            return this.css('display','none');
        },
        show: function(){
            return this.css('display','');
        },
        addClass: function(className){
            this.classList.add(className);
            return this;
        },
        siblings: function(){
            Array.prototype.filter.call(this.parentNode.children, function(child){
                return child !== el;
            });
        },
        toggleClass: function(className){
            this.classList.toggle(className);
            return this;
        },
        parent: function () {
            return this.parentNode;
        },
        is:function(selector){
            return this.matches.call(this,selector);
        }
    });

    // Adding .matches. Old browsers etc.
    (function(b){b.matches||["","ms","moz","webkit","o"].forEach(function(a){a=a+(a?"M":"m")+"atchesSelector";b[a]&&(b.matches=b[a])})})(Element.prototype);

    window.rush = rush;

})();

window.$ = window.rush;


var ba = {
    matchesSelector:'yes',
    msMatchesSelector:'yep',
    mozMatchesSelector:'yeah'
};







