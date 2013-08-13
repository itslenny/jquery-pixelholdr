/*
 *      jQuery PixelHoldr v0.8.1 
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
         options:
         {
            flickrKey: null,
            flickrBaseURL: 'http://api.flickr.com/services/rest/',
            flickrSafeSearch: 1
         },
        pixelholdr: function(options)
        {
            if(!options.flickrKey){ alert('Missing Flickr API key.'); }
            var self=this;
            $.extend(self.options, options);
            return this.each(function() {
               var o=options;
               self.initializeItem(this);                
            });
        },
        //set up the menu... called on each object passed through
        initializeItem: function(obj)
        {
            var self=this;
            var mySearchTags=$(obj).html();

            $(obj).css({'overflow':'hidden'});
            $.getJSON(self._getFlickrSearchURL(mySearchTags),function(data){
                if(!data.photos) return;
                photo = data.photos.photo[Math.floor(Math.random()*data.photos.photo.length)];
                if(photo && photo.id){
                    $.getJSON(self._getFlickrImageURL(photo.id),function(pdata){  
                        $(obj).html('');
                        $('<img>').attr({'src':self._getProperImageSource(pdata,obj), 'alt':mySearchTags}).appendTo(obj).load(function(){
                            console.log('obj (div): '+$(obj).width()+'x'+$(obj).height());
                            console.log('this (img): '+$(this).width()+'x'+$(this).height());
                            console.log((($(obj).height() * $(this).width()) /  $(obj).height())+' > '+$(obj).width());

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
        },
        _getFlickrSearchURL: function(tags){
            return this.options.flickrBaseURL+'?method=flickr.photos.search&api_key='+this.options.flickrKey+'&tags='+tags+'&safe_search='+this.options.flickrSafeSearch+'&content_type=1&format=json&jsoncallback=?';
        },
        _getFlickrImageURL: function(pid){
            return this.options.flickrBaseURL+'?method=flickr.photos.getSizes&api_key='+this.options.flickrKey+'&photo_id='+pid+'&format=json&jsoncallback=?';
        },
        _getProperImageSource: function(data,obj){
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
    });
})(jQuery);