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

    // Extending the RushObject prototype with mass-object methods
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
        each:RushObject.prototype.forEach,
        reset: function () {
            while (this.length)
                this.pop();
            return this;
        },
        filter: function(wat){
            var filtered = Array.prototype.filter.call(this,wat);
            this.reset();
            this.add(filtered);
            return this;
        }
    });

    // Extending the RushObject prototype with mass-object methods appliable to single objects
    ['css','html','text','hide','show','addClass','toggleClass','after','append','before','empty'].forEach(function(type){
        RushObject.prototype[type] = function(content){
            this.forEach(function(element){
                element[type](content);
            });
            return this;
        };
    });

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
        text: function(text){
            this.textContent = text;
            return this;
        },
        append: function(el){
            this.appendChild(el);
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
            this.insertAdjacentHTML('afterend', what);
        },
        before:function(what){
            this.insertAdjacentHTML('beforebegin', what);
        },
        addClass: function(className){
            this.classList.add(className);
            return this;
        },
        toggleClass: function(className){
            this.classList.toggle(className);
            return this;
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

    window.rush = rush;

})();