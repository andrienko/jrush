jRush
===

Rush is a **tiny** library for working with DOM. Begina a wrapper around **querySelectorAll** with chaining and some 
events. Nothing more.

 - It's not [jQuery](http://jquery.org) nor [jQuery alternative](http://zeptojs.com/).
 - No animations support. No AJAX. Only DOM
 - NOT cross-browser. Should work in IE11. Intended to be used in modern browser.
 - Not ultra-optimized. If you need something to work with thousands of elements at once this one is probably not for
  you. At all. Actually, I guess the best way would be writing own, native code then.
 - Extending the **Element.prototype**. It should be considered BAD I guess, somehow. Especially from the perspective
  the methods might be already added by some other libraries et cetera.. Also objects which prototype is array are 
  used (not redefining the basic array methods, but may redefine methods added by other libraries etc.) I don't care, 
  really.
 - NOT fail-safe. There is no poka-yokes, syntax checks or exception catching for you.

Usage
---

Most of the features are inspired by jQuery - though never forget that it's wery different jQuery in many aspects.

    rush('p').css({background:'#f0f0f0'}).html('OwOwOwwww!');
    
    
### Anathomy

Some rush methods are added to every DOM element.

The window.rush(selector) method returns an array-like object (it's prototype is array). The object should contain
elements of querySelectorAll(selector) result (ones matching the [selector](http://www.w3.org/TR/css3-selectors/)).

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

This will change the document inline style (accessing style property). If a

    rush('#example').css('background','#fff');
    rush('#example').css('background','#fff');