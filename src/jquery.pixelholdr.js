/*
 *      jQuery PixelHoldr v0.9.1
 *
 *      A tool to quickly grab place holder images from flickr
 *
 *      Copyright (c) 2013 Lenny Urbanowski (http://www.itslennysfault.com)
 *
 *      Released under MIT license:
 *      http://www.opensource.org/licenses/mit-license.php
 *
 *      Inspired by PixelHoldr (http://PixelHoldr.com) by Christopher Dingli (http://chrisdingli.com/)
 *      
 */

(function($){
    $.fn.extend({
        pixelholdr: function(options)
        {
            if(!options.flickrKey){ alert('Missing Flickr API key.'); }
             defaults = {
                flickrKey: null,
                flickrBaseURL: 'http://api.flickr.com/services/rest/',
                flickrSafeSearch: 1,
                showDimensions: true,
                dimensionsFontSize: '40px',
                dimensionsColor: '#FFFFFF'
             }        
            $.extend(defaults, options);
            return this.each(function() {
               new PixelHoldr(this,defaults);                
            });
        }
    });
    
    function PixelHoldr(obj,opts){
        var options=opts;
        //set up the menu... called on each object passed through
        var initializeItem = function(obj)
        {
            //allow img tags
            if($(obj).is('img')){
                var newObj = $('<div>').html($(obj).attr('src')).attr('class',$(obj).attr('class')).attr('id',$(obj).attr('id')).attr('style',$(obj).attr('style')).width($(obj).width()).height($(obj).height());
                $(obj).replaceWith(newObj);
                obj=newObj;
            }
            
            var mySearchTags = $(obj).html();
            $(obj).css({'overflow':'hidden'});
            $.getJSON(_getFlickrSearchURL(mySearchTags),function(data){
                if(!data.photos) return;
                photo = data.photos.photo[Math.floor(Math.random()*data.photos.photo.length)];
                if(photo && photo.id){
                    $.getJSON(_getFlickrImageURL(photo.id),function(pdata){  
                        $(obj).html('').css('position','relative');
                        
                        if(options.showDimensions){
                            $(obj).prepend('<div style="position: absolute; bottom: 0; width: '+$(obj).width()+'px; text-align: center; font-size: '+options.dimensionsFontSize+';color: '+options.dimensionsColor+'; text-shadow: 0.1em 0.1em #333;">'+$(obj).width()+'x'+$(obj).height()+'</div>')
                        }
                        
                        $('<img>').attr({'src':_getProperImageSource(pdata,obj), 'alt':mySearchTags}).appendTo(obj).load(function(){

                            //scale
                            if(($(this).height() * $(obj).width()) /  $(this).width() > $(obj).height()){
                                $(this).css('width',$(obj).width()+'px');
                            }
                            if(($(this).width() * $(obj).height()) /  $(this).height() > $(obj).width()){
                                $(this).css('height',$(obj).height()+'px');
                            }
                            // ... and crop
                            if($(this).width() > $(obj).width()){
                                $(this).css('margin-left','-'+(($(this).width() - $(obj).width())/2)+'px');                                
                            }
                            if($(this).height() > $(obj).height()){
                                $(this).css('margin-top','-'+(($(this).height()-$(obj).height())/2)+'px');
                            }
                        });
                    });
                }
            });
        }
        var _getFlickrSearchURL = function(tags){
            return options.flickrBaseURL+'?method=flickr.photos.search&api_key='+options.flickrKey+'&tags='+tags+'&safe_search='+options.flickrSafeSearch+'&content_type=1&format=json&jsoncallback=?';
        }
        var _getFlickrImageURL = function(pid){
            return options.flickrBaseURL+'?method=flickr.photos.getSizes&api_key='+options.flickrKey+'&photo_id='+pid+'&format=json&jsoncallback=?';
        }
        var _getProperImageSource = function(data,obj){
            var oWidth=$(obj).width();
            var oHeight=$(obj).height();
            for(var i in data.sizes.size){
                var iWidth = parseInt(data.sizes.size[i].width);
                var iHeight = parseInt(data.sizes.size[i].height);
                if(iWidth > oWidth && iHeight > oHeight){
                    return data.sizes.size[i].source;
                }
            }
            //if all else fails just use the biggest one...
            return data.sizes.size.pop().source;
        }
        //start it up
        initializeItem(obj);
    }
})(jQuery);