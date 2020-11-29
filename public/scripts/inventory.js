var holding = null,
    dropInto = undefined,
    grabbed = null;

$('#inventory').click(function (e) {
    e.stopPropagation();
});

$('#inventory header').mousedown(function (e) {
    if (!holding) {
        var closest_div = $(this).closest('div');
        grabbed = {
            element: closest_div,
            clientX: e.clientX - closest_div.offset().left,
            clientY: e.clientY - closest_div.offset().top
        }
    }
});

$('#gameUI').mousemove(function (e) {
    var m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0,
        obj = this;
    //get mouse position on document crossbrowser
    if (!e) { e = window.event; }
    if (e.pageX || e.pageY) {
        m_posx = e.pageX;
        m_posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        m_posx = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
        m_posy = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }
    //get parent element position in document
    if (obj.offsetParent) {
        do {
            e_posx += obj.offsetLeft;
            e_posy += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }

    // mouse position minus elm position is mouseposition relative to element:
    if (grabbed) {
        let $grabbedLeft = (m_posx - e_posx);
        let $grabbedTop = (m_posy - e_posy);
        if ($grabbedLeft < 520 && $grabbedTop > 24 && $grabbedTop < 468) {
            grabbed.element.css({
                left: $grabbedLeft,
                top: $grabbedTop
            });
        }
    }

});

$('#inventory').mousedown(function (e) {
    e.stopPropagation();

    $('#inventory').removeClass('focused');
    $(this).addClass('focused');
});



$('#inventory header').mousedown(function (e) {
    if (!holding) {
        var closest_div = $(this).closest('div');
        //console.log(e.clientX);
        //console.log(closest_div.offset());
        grabbed = {
            element: closest_div,
            clientX: e.clientX -
                - closest_div.offset().left,
            clientY: e.clientY
                - closest_div.offset().top
        }
    }
});

$('#gameUI').mouseup(function (e) {
    if (grabbed)
        grabbed = null;
});



$('#gameUI').bind('mousedown', function (e) {
    //  $('#inventory').removeClass('focused');

    //$('.preview').attr('src', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/109682/adultlink.png');

});

$('button.close').mousedown(function () {
    $(this).closest('div').addClass('closed');
})

$('#gameUI').keydown(function (e) {

    //c 67
    if (e.keyCode == 67)
        $('#character').toggleClass('closed');

    if (e.keyCode == 73)
        //i 73
        $('#inventory').toggleClass('closed');
});

$('#inventory .item, #character .item').mousedown(function (e) {

    var from = "";
    if ($(this).parents('#inventory').length > 0)
        from = "inventory";
    if ($(this).parents('#character').length > 0)
        from = "character";

    holding = {
        element: $(this),
        from: from,
        offsetInElementX: (e.clientX - $(this).offset().left) * 1.1,
        offsetInElementY: (e.clientY - $(this).offset().top) * 1.1,
        clientX: e.clientX,
        clientY: e.clientY
    }
})

$(window).bind('mousemove', function (e) {

    if (holding && !grabbed && (Math.abs(e.clientX - holding.clientX) > 10 ||
        Math.abs(e.clientY - holding.clientY) > 10)) {
        holding.element.addClass('held');

        $('#holding').html(holding.element.clone().removeClass('held'))

        $('#holding').addClass('show');

        $('#holding').css({
            //position: "fixed",
            left: e.clientX - holding.offsetInElementX,
            top: e.clientY - holding.offsetInElementY
        })

    }
})

$(window).bind('mouseup', function () {

    if (holding) {

        if (dropInto)
            alert(JSON.stringify(dropInto))

        dropInto = null;

        holding.element.removeClass('held'); holding.element.parents('li').removeClass('highlight');

        $('#holding').html("");

        $('#holding').removeClass('show');

        holding = null;
    }
})

$('#inventory .item, #character .item').mouseenter(function () {
    if (!holding) {
        $(this).addClass('highlight');
    }
})

$('#inventory .item, #character .item').mouseleave(function () {
    $(this).removeClass('highlight');
})

$('#inventory li, #character li').mouseenter(function () {
    if (holding) {

        var to = "";
        if ($(this).parents('#inventory').length > 0)
            to = "inventory";
        if ($(this).parents('#character').length > 0)
            to = "character";

        dropInto = {
            to: to,
            from: holding.from,
            slot:
                to == "character" ?
                    $(this).attr('id') :
                    $(this).index()
        }

        $(this).addClass('highlight');
    }
})

$('#inventory li, #character li').mouseleave(function () {
    $(this).removeClass('highlight');
    dropInto = null;
})