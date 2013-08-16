jQuery PixelHoldr
=================

A tool to quickly grab place holder images from flickr. Meant for use on demo / development sites (not for production)

This project is inspired by PixelHoldr (http://PixelHoldr.com) by Christopher Dingli (http://chrisdingli.com/)

## USAGE

To setup jQuery PixelHoldr include jQuery and this script.

To use jQuery PixelHoldr simply create a div with a defined height / width and the keyword(s) you want to use as the contents. Then, just call the `pixelholdr` method on it (including your Flickr API key) and jQuery PixelHoldr will fill the div with a random image from Flickr tagged with that keyword.

```html
<script>
  $(document).ready(function(){
    // add your flickr API key in the quotes below.
    $(".pixelholdr").pixelholdr({flickrKey:'#######'});
  });
</script>
<div style="width: 400px; height: 300px;" class="pixelholdr">Kittens</div>

<img src="puppy" width="400" height="300" class="pixelholdr">
```

Both of the above images would be filled with images from flickr on page load.

See the index.html file in the demo directory for a simple example.

## OPTIONS

* flickrKey: Used to pass in your Flickr API key (required).
* flickrSafeSearch: Can be used to disable safe search. Defaults to 1 (safe search enabled) to disable set it to 0.
* showDimensions: overlays dimensions of each image (default: true)
* dimensionsFontSize: allows you to change the font size of the dimensions displayed (default: 40px)
* dimensionsColor: allows you to change the color of the dimensions displayed (default: white)
