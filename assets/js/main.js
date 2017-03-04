var wwidth = window.innerWidth;
var wheight = window.innerHeight;
var dragging = false
var sx,sy,cx=0,cy=0,img=document.images[0],isup=true;
var degree;
var lX, lY,lD = 0;


$(function() {
    $('body').height(wheight);
    $('body').width(wwidth);
    $('video').height(wheight-40);
    $('.article-news').height(wheight-40-40);
    $('.theRealNew').height(wheight-40-40);
    $('.menu').width(wwidth);
    $('video').on("timeupdate",function(event){
        var time = this.currentTime;
        checkVisibleElements(time);
    });
    $('#image_id').on('change',function(){
                readURL(this);
    });
    $('body').click(function(){
        $('.activeElement').removeClass('activeElement');
    });
    $('#modal1').modal();
    $('#modal2').modal();
    $('#modal3').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: 0, // Opacity of modal background
    });
    $('#showTheNew').on('click',function(){
        console.log($(this))
        if($(this).attr('act') == "Noticia"){
            $(this).attr('act','Vídeo');
            $(this).find('#showthetext').hide();
            $(this).find('#showthevideo').show();
            $('.theRealNew').width(wwidth);
            $('.theRealNew').slideDown();
            $('#addSticker').fadeOut();
            $('#addText').fadeOut();
            $('#addImage').fadeOut();
            $('.button-beefea').fadeOut();
        }
        else{
            $(this).attr('act','Noticia');
            $('.theRealNew').slideUp();
            $(this).find('#showthetext').show();
            $(this).find('#showthevideo').hide();
            $('#addSticker').fadeIn();
            $('#addText').fadeIn();
            $('#addImage').fadeIn();
            $('.button-beefea').fadeIn();
        }
        
    });
    $('#addText').on('click',function(){
        $('#theNewText').val('');
    });
    $('#newText').on('click',function(){
        addText();
    });
    $('#addImage').on('click',function(){
        $("#image_id").trigger('click');
    });
    $('#newSticker').on('click',function(){
        addSticker();
    });
    $('.sticker').on('click',function(){
        $('.stickerActive').removeClass('stickerActive');
        $(this).addClass('stickerActive');
    });
});

function addText(){
    $('.activeElement').removeClass('activeElement');
    var ww = $('#theNewText').val().length*10;
    $('body').append( "<div class='element elementText activeElement' start_time='0' end_time='10'>"+$('#theNewText').val()+"</div>" );
    $('.activeElement').width(ww);
    initElements();
}

function addSticker(){
    $('.activeElement').removeClass('activeElement');
    var sticker = $('.stickerActive');
    sticker.removeClass('stickerActive');
    $('body').append( "<div class='element elementSticker activeElement' start_time='0' end_time='10'>"+sticker.parent().html()+"</div>" );
    initElements();
}

function checkVisibleElements(time){
    console.log("asda")
    var elements = $('.element');
    elements.each(function(index, elem){
        if(time >= $(elem).attr('start_time') && time<= $(elem).attr('end_time')){
            if(!($(elem).is(":visible"))){
                $(elem).fadeIn();
            }
        }
        else{
            if($(elem).is(":visible")){
                $(elem).fadeOut();
            }
        }
    });
}

function initElements(){
    $('.element').unbind('touchmove');
    $('.element').unbind('touchend');
    $('.element').unbind('touchstart');
    $('.element').off('focus');
    //$('.element').off('blur');

    $('.element').bind('touchstart',function(e) {
        e.preventDefault();

            $('.activeElement').removeClass('activeElement');
            $(this).addClass('activeElement');
            console.log("asdsaddasd")
            var twi = $(this).width();
            console.log(twi)
            var ac_el = $(this);
            console.log(ac_el)
            if($(this).hasClass('elementSticker')){
                console.log("sticker")
                var start_time = 0, end_time = 10;
                if(ac_el[0].hasAttribute('start_time')){
                    start_time = ac_el.attr('start_time');
                }
                if(ac_el[0].hasAttribute('end_time')){
                    end_time = ac_el.attr('end_time');
                }
                $('#modal3').html('<div class="modal-content"><h6>Cambiar tamaño del sticker</h6><input type="range" id="rangeElement" min="23" max="200" /><br><div class="row"><div class="input-field col s6"><input id="start_time" max="100" min="0" type="number" class="validate"><label for="start_time">Segundo de inicio</label></div><div class="input-field col s6"><input id="end_time" max="100" min="0" type="number" class="validate"><label for="end_time">Segundo final</label></div></div></div><div class="modal-footer"><a href="#!"  class="modal-action modal-close waves-effect waves-green btn-flat ">Cerrar</a><a id="deleteElement" href="#!" class="modal-action waves-effect waves-green btn-flat ">Borrar elemento</a></div>');
                $('#deleteElement').click(function(){
                    ac_el.remove();
                    $('#deleteElement').off('click');
                    $('#modal3').modal('close');
                });
                $('#start_time').val(start_time);
                $('#end_time').val(end_time);
                $('#rangeElement').val(twi);
                $('#rangeElement').on("change touchmove propertychange keyup input paste", function() {
                    var new_value = $(this).val();
                    ac_el.width(new_value);
                    ac_el.height(new_value);
                });
                $('#start_time').change(function(){
                    ac_el.attr('start_time',$(this).val());
                });
                $('#end_time').change(function(){
                    ac_el.attr('end_time',$(this).val());
                });
            }
            else if($(this).hasClass('elementText')){
                var start_time = 0, end_time = 10;
                if(ac_el[0].hasAttribute('start_time')){
                    start_time = ac_el.attr('start_time');
                }
                if(ac_el[0].hasAttribute('end_time')){
                    end_time = ac_el.attr('end_time');
                }
                var fontsize = parseInt($('.activeElement').css('font-size'));
                $('#modal3').html('<div class="modal-content"><div class="input-field col s6"><input  id="the_text" type="text" class="validate"><label for="the_text">Cambia el texto</label></div><br><label >Cambia el tamaño</label><input type="range" id="rangeElement" min="8" max="30" /><div class="row"><div class="input-field col s6"><input id="start_time" max="100" min="0" type="number" class="validate"><label for="start_time">Segundo de inicio</label></div><div class="input-field col s6"><input id="end_time" max="100" min="0" type="number" class="validate"><label for="end_time">Segundo final</label></div></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Cerrar</a><a id="deleteElement" href="#!" class="modal-action waves-effect waves-green btn-flat ">Borrar elemento</a></div>');
                $('#deleteElement').click(function(){
                    ac_el.remove();
                    $('#deleteElement').off('click');
                    $('#modal3').modal('close');
                });
                $('#rangeElement').val(fontsize);
                $('#the_text').val(ac_el.text());
                $('#start_time').val(start_time);
                $('#end_time').val(end_time);
                $('#the_text').on('propertychange change keyup input paste',function(){
                    ac_el.text($(this).val());
                });
                $('#rangeElement').on("change touchmove propertychange keyup input paste", function() {
                    var new_value = $(this).val();
                    ac_el.css('font-size',new_value+'px');
                    ac_el.css('width',new_value*10+'px');
                });
                $('#start_time').change(function(){
                    ac_el.attr('start_time',$(this).val());
                });
                $('#end_time').change(function(){
                    ac_el.attr('end_time',$(this).val());
                });
            }
            $('#modal3').modal('open');
            lD = getRotationDegrees($(this));
            var toff = $(this).offset();
            cx = toff.left;
            cy = toff.top;
        
        dragging = true;
        if (e.originalEvent.touches.length  == 1){
            ts($('.activeElement'),e);
        }
        else{
            dragging = true;
        }
    });
    $('.element').bind('touchend',function(e) {
        e.preventDefault();
        if (e.originalEvent.changedTouches.length == 1){
            te($('.activeElement'),e);
        }
        else{
            dragging = false
        }
    });
    $('.element').bind('touchmove',function(e) {
        if (e.originalEvent.touches.length == 1){
            tm($('.activeElement'),e);
        }
        else{
            if (dragging) {
                var mouse_x = e.originalEvent.touches[0].pageX;
                var mouse_y = e.originalEvent.touches[0].pageY;
                var radians = Math.atan2(mouse_x - 10, mouse_y - 10);
                degree = (radians * (180 / Math.PI) * -1) + 90;
                lD = degree;
                $('.activeElement').css({'-webkit-transform': 'rotate(' + lD + 'deg) translate3d('+cx+'px, '+cy+'px,0px)'});
            }
        }
    });
}

function ts(target,e){
    sx=e.originalEvent.touches[0].pageX-cx;
    sy=e.originalEvent.touches[0].pageY-cy;
    isup=false;
}
function tm(target,e){
    lY = e.originalEvent.touches[0].pageY-sy;
    lX = e.originalEvent.touches[0].pageX-sx;
    $('.activeElement').css({'-webkit-transform': 'rotate(' + lD + 'deg) translate3d('+lX+'px, '+lY+'px,0px)'});
    //isup||
      //  (document.getElementById("target").style.webkitTransform='translate3d('+lX+'px,'+lY+'px,0)');

}
function te(target,e){
    cx=lX;
    cy=lY;
    
    isup=true;
}

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } 
    else { var angle = 0; }
    return (angle < 0) ? angle +=360 : angle;
}

function readURL(input) {
                if (input.files && input.files[0]) {
                    $('.activeElement').removeClass('activeElement');
                    $('body').append("<div class='element elementSticker activeElement' start_time='0' end_time='10'><img style='display: none;width: 100%;height: 100%' id='image_preview' src='' ></div>");
                    initElements();
                    var reader = new FileReader();
                    var img = $('#image_preview');
                    reader.onload = function (e) {
                        //img.width('200px');
                        //img.height('200px');
                        img.attr('src', e.target.result);
                        img.fadeIn();
                    }

                    reader.readAsDataURL(input.files[0]);
                }
}