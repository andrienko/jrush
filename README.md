jRush
===

Rush is a **tiny** (~3KB) library for working with DOM. Begina a wrapper around **querySelectorAll** with chaining and some 
events. Nothing more.

 - It's not [jQuery](http://jquery.org) nor [jQuery alternative](http://zeptojs.com/). Although, it is inspired by it
 a lot. So if you know jQuery - you will easily use rush.
 - No animations support. No AJAX. Only DOM
 - NOT cross-browser. Should work in IE11. Intended to be used in modern browser.
 - Not ultra-optimized. If you need something to work with thousands of elements at once this one is probably not for
  you. At all. Actually, I guess the best way would be writing own, native code then.
 - Extending the **Element.prototype**. It should be considered BAD I guess, somehow. Especially from the perspective
  the methods might be already added by some other libraries et cetera.. Also objects which prototype is array are 
  used (not redefining the basic array methods, but may redefine methods added by other libraries etc.) I don't care, 
  really.
 - NOT fail-safe. There is no poka-yokes, syntax checks or exception catching for you.
 - Idea is take as much as you can from CSS3 selectors. Say, you can use rush('p')[0] to get first p element, but
 sometimes (depends on document structure) you could use rush('p:first-of-type'). You got the point.  

Usage
---

Most of the features are inspired by jQuery - though never forget that it's wery different jQuery in many aspects.

    rush('p').css({background:'#f0f0f0'}).html('OwOwOwwww!');
    
    
### Anathomy

Some rush methods are added to every DOM element.

The window.rush(selector) method returns an array-like object (it's prototype is array). The object should contain
elements of querySelectorAll(selector) result (ones matching the [selector](http://www.w3.org/TR/css3-selectors/)).

Each Element object now has several additional methods (described below).

### Side effects

The script adds `Element.prototype.matches` if there is none (using prefixed functions)

### Multiple element features

#### add

Adds new elements to query

    rush('p').addClass('paragraph').add('h2').addClass('rushed');
    // Adds paragraph class to p elements, then adds rushed class to h2 and p elements,  

#### query

Same as previous, only it resets the object before adding new elements

    rush('p').addClass('paragraph').query('h2').addClass('heading');
    // Adds paragraph class to p, then resets query and adds heading class to h2 elements
    
#### each

Alias for array's forEach

#### filter

Filters the array. Works like usual Array.filter when function passed, filters with selector when selector string passed

    rush('p, h2').filter('.active, .visible').filter(':not(.active):not(.visible)');
    // Will select all p and h2 elements, having either active or visible class but not both

### Single element features

#### find

Creates new rush object by running query over element's children

    document.getElementByID('#header').find('p').hide();
    // Hide all p elements inside header
    
#### hasClass

Returns true if element has the class

    if(document.getElementByID('#header').hasClass('floating')){
        console.log('The element has the "floating" class');
    }
    
#### next, prev and parent

Returns nextSibling, previousSibling and parentNode
       
#### siblings

Returns all element's siblings as a rush array

    rush('h2')[0].siblings().hide()
    // Will hide all neighbors of first h2 element on the document
    
#### is

An alias for `Element.prototype.matches`. Returns true if element matches selector.

### Both single element and multiple element features

#### html and text

These will change matched elements' innerHTML and textContent properties: 

    rush('#example').html('<b>Hello, people</b>');
    rush('#example').text('Hey, people!');
    
    rush('#example')[0].html('<b>Hello, people</b>');
    rush('#example')[0].text('Hey, people!');
    
    document.getElementById('example').html('<b>Hello, people</b>');
    document.getElementById('example').text('Hey, people!');
    
#### css

This will change the document inline style (accessing style property).

If a single parameter passed - it should be object, which keys should 

    rush('#example').css('background','#fff').css('color','#000');
    rush('#example').css({background:'#fff',color:'#000'});
    
#### empty

Will call html('');

#### hide and show

Will call css('display','none') and css('display','');

#### addClass, removeClass and toggleClass

Will add, remove and toggle class passed by classname:

    rush('#button').toggleClass('active');
    
#### after, before and append, prepend
 
Inserts text right after/before element and adds text right after/before element contents.
 
    rush('a')
      .before('The link: ').after(' (click it!)')
      .prepend('[').append(']');
      
#### remove

Deletes the element.

    rush('p').remove();
    
Will return an array of no longer existing elements.
      
Extending
---

Just like in jQuery - there is a rush.fn object you can extend with your own functions (or override rush built-in ones)

    rush.fn.dbg = function() {
        this.each(function(a){
            console.log(a);
        });
        return this;
    };
    
However, this function will be applied only to mass-object functions (the Element prototype will be not extended for it)
To add the function to single element, too - we would have to extend the Element.prototype object:
 
    Element.prototype = function() {
            console.log(this);
            return this;
    };
    
To add function to BOTH mass- and single-element - you can use rush.extend function which takes 2 parameters - the name
of method and it's function:

    rush.extend('turn_red',function(){
        this.css({color:'#fff',background:'#f00'});
        return this;
    });
    
    rush('p').turn_red();
    rush('p')[0].turn_red();
    

    