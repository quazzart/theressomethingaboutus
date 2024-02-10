const DEBUG = false

$(document).ready(function () {
    $('#no').bind('touchstart mouseenter', function () {
        $('.moon')
            .removeClass('green')
            .addClass('red')
    }).bind('touchend mouseleave', function () {
        $('.moon').removeClass('red')
    }).bind('touchstart mousedown', function () {
        let yes = $('#yes')
        let e = $(this)
        let prev = e.offset()

        do {
            // Make random values
            let x = Math.random() * (window.innerWidth - e.outerWidth()),
                y = Math.random() * (window.innerHeight - e.outerHeight())

            // Account for translate
            x += e.outerWidth() / 2
            y += e.outerHeight() / 2

            // Move to random location
            e.css("left", x).css("top", y)
        } while (areOverlapping(e, yes, 20))

        $('.moon').removeClass('red', 'green')
    })

    $('#yes').bind('touchstart mouseenter', function () {
        $('.moon')
            .removeClass('red')
            .addClass('green')
    }).bind('touchend mouseleave', function () {
        $('.moon').removeClass('green')
    }).click(function(evt) {
        $('.removeMe').fadeOut(400, function() {
            $(this).remove()
            $('.proposal').fadeIn(400)
        })
    })

    $(window).on('resize', function () {
        // Do something
    })
})

function areOverlapping(e1, e2, clearance) {
    let rect1 = e1.get(0).getBoundingClientRect()
    let rect2 = e2.get(0).getBoundingClientRect()

    if (DEBUG) {
        $('.line1').remove()
        $('.line2').remove()

        $('.container')
            // Yes
            .append($('<div />').addClass('line1').css({
                width: 1,
                height: window.innerHeight,
                left: rect2.left - clearance
            }))
            .append($('<div />').addClass('line1').css({
                width: 1,
                height: window.innerHeight,
                left: rect2.right + clearance
            }))
            .append($('<div />').addClass('line1').css({
                width: window.innerWidth,
                height: 1,
                top: rect2.top - clearance
            }))
            .append($('<div />').addClass('line1').css({
                width: window.innerWidth,
                height: 1,
                top: rect2.bottom + clearance
            }))
            // No
            .append($('<div />').addClass('line2').css({width: 1, height: window.innerHeight, left: rect1.left}))
            .append($('<div />').addClass('line2').css({width: 1, height: window.innerHeight, left: rect1.right}))
            .append($('<div />').addClass('line2').css({width: window.innerWidth, height: 1, top: rect1.top}))
            .append($('<div />').addClass('line2').css({width: window.innerWidth, height: 1, top: rect1.bottom}))
    }

    return rect1.right >= rect2.left - clearance && rect1.left <= rect2.right + clearance && rect1.bottom >= rect2.top - clearance && rect1.top <= rect2.bottom + clearance
}
