$(document).ready(function() {
 

  var oldText,
    newText;
  //we attach classes which show user that the element is editadle with the help of Jquery in order to make sure that JS is enabled in browser 
  $(".editable").hover(
    function() {
      $(this).addClass("editHover");
    },
    function() {
      $(this).removeClass("editHover");
    }
  );

  $(".editable").on("click", replaceHTML);

  $(document).on("click", ".btnSave",
    function() {
      newText = $(this).parents("form")
        .children(".editBox")
        .val().replace(/"/g, "&quot;");

      $(this).parent().parent()
        .text(newText)
        .bind("click", replaceHTML);
      console.log($(this).parent())
      $(this).removeClass('editHover');
    }

  );

  $(document).on("click", ".btnDiscard",
    function() {
      $(this).parent()
        .html(oldText)
        .bind("click", replaceHTML);
    }
  );

  function replaceHTML() {
    if ($('editBox')) {
      $(".btnDiscard").click();
    }
    oldText = $(this).html()
      .replace(/"/g, "&quot;");

    $(this).html("")
      .html("<form><input type=\"text\" class=\"editBox\" value=\"" + oldText + "\" /> <a href=\"#\" class=\"btnSave\"></a> <a href=\"#\" class=\"btnDiscard\"></a></form>")
      .unbind('click', replaceHTML);

  }

  // Skills add
  $('.add-skill-link').on('click', function(e) {
      e.preventDefault();
      //deleting skills
      var deleteLink = "<a class=\"deleteLink\" href=\"#\"><i class=\"fa fa-times\"></i></a>"
      $('.skills-list-item').addClass('deleteable');
      $('.skills-list-item').append(deleteLink);
      if ($('.skills-list-item').hasClass('deleteable')) {
        $(document).on('click', '.deleteLink', function(e) {
          e.preventDefault();
          $(this).parent().remove();
        });
      }
    })
    // adding new skills
  function addSkill(e) {
    var oldText = $(this).html().replace(/"/g, "&quot;");
    var input = "<input type=\"text\" class=\"editBox\" placeholder=\"" + oldText + "\" />";
    var select = "<select class = \"skill-style-select\"><option value = \"strong\">Strong</option><option value = \"middle\">Middle</option><option value = \"light\">Light</option></select>";
    var saveButton = "<a href=\"#\" class=\"btnSaveSkill\"></a>";
    var form = "<form>" + input + select + saveButton + "</form>";

    $(this).html("")
      .html(form)
      .unbind('click', addSkill);


    $(document).on('click', '.btnSaveSkill', function(e) {
      e.preventDefault();
      var newSkillValue = $(this).parent("form")
        .children("input")
        .val();
      var selectValue = $(this).parent("form")
        .children('select')
        .val();
        //prevent adding empty skill
        if (newSkillValue.length>0) 
        {
        	$('.skills-list').append("<li class =\"skills-list-item " + selectValue + "\">" + newSkillValue + "</li>")
        }
 
    });
  }

  $('.add-skill-link').on('click', addSkill);

});