(function() {
  var placeholder;

  placeholder = "placeholder";

  (function($) {
    return $.fn["placeholder"] = function() {
      $(this).each(function() {
        var self, target;
        self = [];
        target = $(this);
        if (target.data(placeholder)) {
          return;
        }
        target.data(placeholder, true);
        self.ph = target.attr("placeholder");
        if (!self.ph) {
          return;
        }
        target.attr("placeholder", "").wrapAll(self.wrapper = $('<span>').css({
          "position": "relative"
        })).before(self.placeholder = $("<span>").addClass('placeholder').text(self.ph).on('click', function() {
          return target.trigger('focus');
        })).on("focus", function() {
          $(this).addClass('focused');
          return self.placeholder.addClass('focused');
        }).on("keydown keyup blur", function() {
          if ($(this).val()) {
            self.placeholder.hide();
          } else {
            self.placeholder.show();
          }
          return self.placeholder.removeClass('focused');
        }).on("blur", function() {
          return $(this).removeClass('focused');
        });
        if (target.val()) {
          return self.placeholder.hide();
        }
      });
      return $(this);
    };
  })(jQuery);

  jQuery(document).ready(function() {
    var actionButton, addNewHobby;
    $("input")[placeholder]();
    actionButton = function(name) {
      return $('<span>', {
        "class": "hobby__action hobby__action-" + name
      }).append($("<i>", {
        "class": "icon icon-" + name
      }));
    };
    addNewHobby = function(text) {
      var remove, res;
      res = $('<li>', {
        "class": "hobby__item"
      }).append($("<span>", {
        "class": "hobby__item_text"
      }).text(text).append(remove = actionButton('remove')), $("<span>", {
        "class": "hobby__item_fader"
      }));
      remove.on("click", function(event) {
        event.preventDefault();
        return res.remove();
      });
      return res;
    };
    $("input[name='newhobby']").on("keydown", function(event) {
      if (event.keyCode === 13) {
        $('.hobby__list-my').prepend(addNewHobby($(this).val()));
        return $(this).val('');
      }
    });
    $('.hobby__list-my').find('.hobby__item').each(function() {
      var item, remove;
      item = $(this);
      item.find('.hobby__item_text').prepend(remove = actionButton('remove'));
      return remove.on("click", function(event) {
        event.preventDefault();
        return item.remove();
      });
    });
    $('.hobby__list-friend').find('.hobby__item').each(function() {
      var add, item, item_text, warn;
      item = $(this);
      item_text = item.find('.hobby__item_text');
      item.find('.hobby__item_fader').append(warn = actionButton('warn').append("пожаловаться"));
      warn.on("click", function(event) {
        event.preventDefault();
        return alert('ябеда!');
      });
      item.find('.hobby__item_text').prepend(add = actionButton('add'));
      return add.on("click", function(event) {
        var ok;
        event.preventDefault();
        $('.hobby__list-my').prepend(addNewHobby(item_text.text()));
        item_text.after(ok = actionButton('ok').append('добавленно в ваши увлечения'));
        return setTimeout(function() {
          return ok.fadeOut(300, function() {
            return $(this).remove();
          });
        }, 1000);
      });
    });
    return $(".hobby__list").each(function() {
      var list;
      list = $(this);
      return list.on("click", ".hobby__item-more a", function(event) {
        event.preventDefault();
        list.find('.hobby__item-hidden').removeClass("hobby__item-hidden");
        return list.find('.hobby__item-more').hide();
      });
    });
  });

}).call(this);
