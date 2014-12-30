(function (rush) {

    // The constructor wrapper
    rush = function (selector,context) {
        return new RushArray(selector,context);
    };

    var t = function(stuff){
        if(stuff instanceof Node)return stuff;
        else return document.createTextNode(stuff.toString());
    };

    var extend = function (what, with_what) {
        for (var name in with_what)what[name] = with_what[name];
    };

    // The constructor function
    var RushArray = function (selector,context) {
        if (selector != undefined)
            if (typeof selector == 'function')
                document.addEventListener('DOMContentReady', selector);
            else this.add(selector,context);
    };

    RushArray.prototype = [];

    // Extending the RushArray prototype with mass-object methods
    extend(RushArray.prototype, {
        query: function (wat) {
            this.reset();
            this.add(wat);
        },
        add: function (wat,context) {

            if(!(context instanceof Element))context = document;

            var self = this;
            wat instanceof NodeList && (wat = [].slice.call(wat));
            if(wat instanceof Array)
                wat.forEach(function(el){self.push(el);});
            else if(wat instanceof Element)
                this.push(wat);
            else
                return this.add(context.querySelectorAll(wat));
            return this;
        },
        each:RushArray.prototype.forEach,
        reset: function () {
            this.length=0;
            //while (this.length) this.pop();
            return this;
        },
        filter: function(wat){
            var filtered = Array.prototype.filter.call(this,wat);
            this.reset();
            this.add(filtered);
            return this;
        }
    });

    // Extending the RushArray prototype with mass-object methods appliable to single objects
    [

        'css','empty','html','text','attr',
        'hide','show',
        'addClass','toggleClass','removeClass',
        'after','before','append','prepend'

    ].forEach(

        function(type){
            RushArray.prototype[type] = function(content,value){
                this.forEach(function(element){
                    element[type](content,value);
                });
                return this;
            };
        }

    );

    // Extending the Element prototype (Single-object methods)
    extend(Element.prototype, {

        css: function (csar) {
            if(arguments.length>1)this.style[arguments[0]] = arguments[1];
            else for (var index in csar) {
                this.style[index] = csar[index];
            }
            return this;
        },
        html: function (html) {
            this.innerHTML = html;
            return this;
        },
        find: function(selector){
            rush(selector,this);
        },
        text: function(text){
            this.textContent = text;
            return this;
        },
        append: function(el){
            this.appendChild(t(el));
            return this;
        },
        prepend: function (el) {
            this.insertBefore(t(el), this.firstChild);
            return this;
        },
        hide: function(){
            return this.css('display','none');
        },
        empty: function(){
            this.html('');
        },
        show: function(){
            return this.css('display','');
        },
        hasClass:function(classname){
            return this.classList.contains(classname)
        },
        after:function(what){
            this.insertAdjacentHTML('afterend', what)
            return this;
        },
        before:function(what){
            this.insertAdjacentHTML('beforebegin', what);
            return this;
        },
        addClass: function(className){
            this.classList.add(className);
            return this;
        },
        removeClass: function(className){
            this.classList.remove(className);
            return this;
        },
        toggleClass: function(className){
            this.classList.toggle(className);
            return this;
        },
        attr:function(name,value){
            if(value==undefined)value=name;
            else this.setAttribute(name,name);
        },
        next: function () {
            return this.nextSibling;
        },
        prev: function () {
            return this.previousSibling;
        },
        parent: function () {
            return this.parentNode;
        },
        is:function(selector){
            return this.matches.call(this,selector);
        }
        //siblings: function(){
        //    Array.prototype.filter.call(this.parentNode.children, function(child){
        //        return child !== el;
        //    });
        //},


    });

    // Adding .matches. Old browsers etc.
    (function(b){b.matches||["","ms","moz","webkit","o"].forEach(function(a){a=a+(a?"M":"m")+"atchesSelector";b[a]&&(b.matches=b[a])});b.is=b.matches})(Element.prototype);

    window.rush = Element.prototype.rush = rush;

})();