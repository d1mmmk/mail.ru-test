placeholder = "placeholder"
(($)->
    $.fn["placeholder"] = ->
        $(this).each ->
            self = []
            target = $(this)

            if target.data placeholder then return
            target.data placeholder, true

            self.ph = target.attr "placeholder"
            if !self.ph then return
            target
                .attr("placeholder","")
                .wrapAll(
                    self.wrapper = $('<span>').css {
                                        "position": "relative"
                                    }
                    ).before(
                        self.placeholder = $("<span>")
                            .addClass('placeholder')
                            .text(self.ph)
                            .on 'click', ->
                                target.trigger 'focus'
                    )
                .on("focus", ->
                    $(this).addClass 'focused'
                    self.placeholder.addClass 'focused'
                )
                .on("keydown keyup blur", ->
                    if $(this).val()
                        self.placeholder.hide()
                    else
                        self.placeholder.show()
                    self.placeholder.removeClass 'focused'
                )
                .on("blur", ->
                    $(this).removeClass 'focused'
                )

            if target.val()
                self.placeholder.hide()

        $(this)

)(jQuery)

jQuery(document).ready ->
    $("input")[placeholder]()
    actionButton = (name) ->
        $('<span>',{
            "class": "hobby__action hobby__action-"+name
            }).append($("<i>",{
                "class": "icon icon-"+name
                }))

    addNewHobby = (text) ->
        res = $('<li>', {
            "class": "hobby__item"
        }).append(
            $("<span>",{
                "class": "hobby__item_text"
                }).text(text).append(remove = actionButton('remove')),
            $("<span>",{
                "class": "hobby__item_fader"
            })
            )
        remove.on "click", (event)->
            event.preventDefault()
            res.remove()
        res
    $("input[name='newhobby']").on "keydown", (event) ->
        if event.keyCode is 13
            $('.hobby__list-my').prepend addNewHobby($(this).val()) 
            $(this).val('')
    $('.hobby__list-my')
        .find('.hobby__item')
        .each ->
            item = $(this)
            item.find('.hobby__item_text').prepend(remove = actionButton('remove'))
            remove.on "click", (event)->
                event.preventDefault()
                item.remove()

    $('.hobby__list-friend')
        .find('.hobby__item')
        .each ->
            item = $(this)
            item_text = item.find('.hobby__item_text')
            item.find('.hobby__item_fader')
                .append(warn = actionButton('warn').append("пожаловаться"))
            warn.on "click", (event)->
                event.preventDefault()
                alert('ябеда!')

            item.find('.hobby__item_text').prepend(add = actionButton('add'))
            add.on "click", (event)->
                event.preventDefault()
                $('.hobby__list-my').prepend(
                    addNewHobby(
                        item_text.text()
                    )
                )

                item_text.after ok = actionButton('ok').append('добавленно в ваши увлечения')
                setTimeout ->
                    ok.fadeOut 300, ->
                        $(this).remove()
                ,1000
    $(".hobby__list").each ->
        list = $(this)
        list.on "click", ".hobby__item-more a", (event)->
            event.preventDefault()
            list.find('.hobby__item-hidden').removeClass("hobby__item-hidden")
            list.find('.hobby__item-more').hide()