jRush
===

Rush is a **tiny** wrapper around querySelectorAll with chaining and some events. Nothing more.

 - It's not [jQuery](http://jquery.org) nor [jQuery alternative](http://zeptojs.com/).
 - No animations support. No AJAX. Only DOM
 - NOT cross-browser. Not ultra-optimized. If you need somerthing running in IE8 and working with thousands of elements
 this one is probably not for you. At all.
 - Extending the Element.prototype. It should be considered BAD I guess, somehow. I don't care, really.
 - NOT fail-safe. There is no poka-yokes, syntax checks or exception catching for you.
 
Usage
---

Kinda jQuery. Though it's not jQuery. NOT AT ALL:

    rush('p').css({background:'#f0f0f0'}).html('OwOwOwwww!');