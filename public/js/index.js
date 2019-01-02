//initializes validation flags for user input form
var titleValid = false;
var dateValid = true;
var durationValid = false;

//adds event listeners on load for form validation
$(document).ready(function() {
    $("#runTitle").on("input", checkTitle);
    $("#date").on("input",checkDate);
    $("#duration").on("input",checkDuration);
    $("form").on("submit", checkForm);
});

//checks to make sure a title input exists
function checkTitle() {
    var title = $("#runTitle");
    if(title.val() == null || title.val() == ""){
        titleValid = false;
    }
    else {
        titleValid = true;
        titleError.style.visibility="hidden";
    }
}

//checks that date is formatted in the correct way
function checkDate() {
    var date = $("#date");
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date.val())) {
        dateValid = false;
    }
    else {
        dateValid = true;
        dateError.style.visibility="hidden";
    }    
}

//checks that exercises duration is formatted properly
function checkDuration() {
    var duration = $("#duration");   
    if(!/^\d+:\d{2}:\d{2}$/.test(duration.val())) {
        durationValid = false;
    }
    else {
        durationValid = true;
        durationError.style.visibility="hidden";
    }    
}

//shows bootstrap modal if user input is incorrect
function showModal() {
    $("#noAlert").show();
}

//performs form validation on button click 
function checkForm(event) {
    var titleError = $("#titleError");
    var dateError = $("#dateError");
    var durationError = $("#durationError");
    if(!dateValid){
        event.preventDefault();
        dateError.css('visibility', 'visible');
        showModal();
    }
    if(!durationValid){
        event.preventDefault();
        durationError.css('visibility', 'visible');
        showModal();
    }
    if(!titleValid){
        event.preventDefault();
        titleError.css('visibility', 'visible');
        showModal();
    }
}

//grabs current date and formats mm/dd/yyyy
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    
    return [month, day, year].join('/');
}

//autofills with the formatted current date
$(document).ready(function() {
    document.getElementById("date").value = (formatDate(new Date()));
});

//onload function to post exercise data to DB on submit
$(document).ready(function() {
    $("#submitForm").submit(ajaxPost);
});

//formats user input data as JSON object, stringifies, and posts to api
function ajaxPost() {
    var exercise = {
        title: $("#runTitle").val(),
        date: $("#date").val(),
        type: $("#type").val(),
        duration: $("#duration").val(),
        weather: $("#weather").val(),
        comments: $("#comments").val()   
    };
    
    $.ajax({
        type: "post",
        dataType:'json',
        url: "http://localhost:3000/api/exercises",
        data: JSON.stringify(exercise),
        contentType: "application/json"
    }).done(function(data) {
        $("form").trigger("reset");
    }).fail(function(jqXHR) {
        showModal();
    });
};

//onload get function that retrieves JSON objects from api
$(document).ready(function() {
    $.get("api/exercises",addExercises);
});

//populates home webpage with all exercises stored in db
function addExercises(exercises) {
    var listHTML = "";
    for (var i=0; i < exercises.length; i++) {
        listHTML += "<li id='last_runs'>" +
                    "<b style='text-decoration: underline;'>Title</b>:" + exercises[i].title + "<br>" +
                    " <b style='text-decoration: underline;'>Date</b>:" + exercises[i].date + "<br>" +
                    " <b style='text-decoration: underline;'>Type</b>:" + exercises[i].type + "<br>" +
                    " <b style='text-decoration: underline;'>Duration</b>:" + exercises[i].duration + "<br>" +
                    " <b style='text-decoration: underline;'>Weather</b>:" + exercises[i].weather + "<br>" +
                    " <b style='text-decoration: underline;'>Comments</b>:" + exercises[i].comments.substring(0,20) + "..."+ "</li><br>";
    }
    
    var listElement = $(listHTML);
    
    $(".myList ul").append(listElement);
}