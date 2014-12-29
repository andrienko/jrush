var jRush = function(selector){
    return new jRush.f.create(selector);
};

jRush.f = jRush.prototype = {

    select : function(selector){

        //var f = function(){};
        //f.prototype = rush;
        //var obj = new f();

        try{
            var selected = document.querySelectorAll(selector);

            this.selected = [];

            for(var index in selected)
                if(selected.hasOwnProperty(index))
                    this.selected.push(selected[index]);

            this.length = this.selected.length;

        }
        catch (e) { console.log(e.text) }

        return this;
    },

    create : function(context){
        jRush.f.create.prototype = jRush.prototype;
        return jRush.select(context);
    }

};