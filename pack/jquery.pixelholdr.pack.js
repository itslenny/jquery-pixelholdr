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
(function(e){function t(t,n){var r=n;var i=function(t){if(e(t).is("img")){var n=e("<div>").html(e(t).attr("src")).attr("class",e(t).attr("class")).attr("id",e(t).attr("id")).attr("style",e(t).attr("style")).width(e(t).width()).height(e(t).height());e(t).replaceWith(n);t=n}var i=e(t).html();e(t).css({overflow:"hidden"});e.getJSON(s(i),function(n){if(!n.photos)return;photo=n.photos.photo[Math.floor(Math.random()*n.photos.photo.length)];if(photo&&photo.id){e.getJSON(o(photo.id),function(n){e(t).html("").css("position","relative");if(r.showDimensions){e(t).prepend('<div style="position: absolute; bottom: 0; width: '+e(t).width()+"px; text-align: center; font-size: "+r.dimensionsFontSize+";color: "+r.dimensionsColor+'; text-shadow: 0.1em 0.1em #333;">'+e(t).width()+"x"+e(t).height()+"</div>")}e("<img>").attr({src:u(n,t),alt:i}).appendTo(t).load(function(){if(e(this).height()*e(t).width()/e(this).width()>e(t).height()){e(this).css("width",e(t).width()+"px")}if(e(this).width()*e(t).height()/e(this).height()>e(t).width()){e(this).css("height",e(t).height()+"px")}if(e(this).width()>e(t).width()){e(this).css("margin-left","-"+(e(this).width()-e(t).width())/2+"px")}if(e(this).height()>e(t).height()){e(this).css("margin-top","-"+(e(this).height()-e(t).height())/2+"px")}})})}})};var s=function(e){return r.flickrBaseURL+"?method=flickr.photos.search&api_key="+r.flickrKey+"&tags="+e+"&safe_search="+r.flickrSafeSearch+"&content_type=1&format=json&jsoncallback=?"};var o=function(e){return r.flickrBaseURL+"?method=flickr.photos.getSizes&api_key="+r.flickrKey+"&photo_id="+e+"&format=json&jsoncallback=?"};var u=function(t,n){var r=e(n).width();var i=e(n).height();for(var s in t.sizes.size){var o=parseInt(t.sizes.size[s].width);var u=parseInt(t.sizes.size[s].height);if(o>r&&u>i){return t.sizes.size[s].source}}return t.sizes.size.pop().source};i(t)}e.fn.extend({pixelholdr:function(n){if(!n.flickrKey){alert("Missing Flickr API key.")}defaults={flickrKey:null,flickrBaseURL:"http://api.flickr.com/services/rest/",flickrSafeSearch:1,showDimensions:true,dimensionsFontSize:"40px",dimensionsColor:"#FFFFFF"};e.extend(defaults,n);return this.each(function(){new t(this,defaults)})}})})(jQuery)