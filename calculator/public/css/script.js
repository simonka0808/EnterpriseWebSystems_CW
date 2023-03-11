const pound = "£"

function validatorFields() {


    var selectedTimePeriod = document.getElementById("selectedTimePeriod").value;
    var selectedTimePeriodOutput;

    var projectName = document.getElementById("projectNameText").value;
    var projectNameOutput;


    //check for the project name
    if (projectName == "") {
        projectNameOutput = "Project name can`t be empy";
    } else {
        projectNameOutput = "";
    }

    //check if there is a selected value inside the dropdown
    if (selectedTimePeriod == "Select a period of time") {
        selectedTimePeriodOutput = "Please select a period!";
    } else {
        selectedTimePeriodOutput = "";
    }


    //print the output on the screen
    document.getElementById("timePeriodCheck").innerHTML = selectedTimePeriodOutput;
    document.getElementById("projectNameCheck").innerHTML = projectNameOutput;



}
function calculateFinalBudgetFigure() {

    //amount of money per hour for a specific position
    var junior = 10;
    var standard = 20;
    var senior = 40;

    //get the selected time period
    var dropdownMenu = document.getElementById("selectedTimePeriod");
    var selectedTimePeriodIndex = dropdownMenu.value;

    //get the developer type

    var devType = document.querySelector('input[name="devType"]:checked').value;




    if (selectedTimePeriodIndex == "1") {

        costPerPerson = findSingleDayWorkingHours() * hourlyPay * calculateRandomFudgeNum();
        document.getElementById("finalResult").innerHTML = costPerPerson.toFixed(2) + pound;


    } else if (selectedTimePeriodIndex == "2") {
        costPerPerson = findTotalWeeklyWorkingHours() * hourlyPay * calculateRandomFudgeNum();
        document.getElementById("finalResult").innerHTML = costPerPerson.toFixed(2) + pound;

    } else if (selectedTimePeriodIndex == "3") {
        costPerPerson = findTotalMonthlyWorkingHours() * hourlyPay * calculateRandomFudgeNum();
        document.getElementById("finalResult").innerHTML = costPerPerson.toFixed(2) + pound;
    } else if (selectedTimePeriodIndex = "4") {
        costPerPerson = findTotalAnnuallyWorkingHours() * hourlyPay * calculateRandomFudgeNum();
        document.getElementById("finalResult").innerHTML = costPerPerson.toFixed(2) + pound;
    }
}

function calculateRandomFudgeNum() {

    // fudge factor`s scope
    max = 1.2;
    min = 0.85;

    let fudgeFactor = Math.random() * (max - min) + min;

    return fudgeFactor;
}


//loop through the form and find the total working hours for each time period



function findSingleDayWorkingHours() {

    var arr = document.getElementsByName('singleDay');
    var timePeriod = $('#selectedTimePeriod option:selected').text();

    var output = 0;
    for (var i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].value))
            output += parseInt(arr[i].value);
    }
    document.getElementById("workedHoursOutput").innerHTML = output;
    document.getElementById("storePeriodCheck").innerHTML = timePeriod;


    return output

}

function findTotalMonthlyWorkingHours() {
    var arr = document.getElementsByName('week');
    var timePeriod = $('#selectedTimePeriod option:selected').text();

    var output = 0;
    for (var i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].value))
            output += parseInt(arr[i].value);
    }
    document.getElementById("workedHoursOutput").innerHTML = output;
    document.getElementById("storePeriodCheck").innerHTML = timePeriod;

    return output

}

function findTotalWeeklyWorkingHours() {
    var arr = document.getElementsByName('day');
    var timePeriod = $('#selectedTimePeriod option:selected').text();

    var output = 0;
    for (var i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].value))
            output += parseInt(arr[i].value);
    }
    document.getElementById("workedHoursOutput").innerHTML = output;
    document.getElementById("storePeriodCheck").innerHTML = timePeriod;


    return output

}



function findTotalAnnuallyWorkingHours() {
    var arr = document.getElementsByName('month');
    var timePeriod = $('#selectedTimePeriod option:selected').text();

    var output = 0;
    for (var i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].value))
            output += parseInt(arr[i].value);
    }
    document.getElementById("workedHoursOutput").innerHTML = output;
    document.getElementById("storePeriodCheck").innerHTML = timePeriod;

    return output
}

//functions to display different inputs based on the dropdown selection

$(function () {
    $("#selectedTimePeriod").change(function () {
        if ($("#weekly").is(":selected")) {
            $(".weekly-scheme").show();

        } else {
            $(".weekly-scheme").hide();
        }
    }).trigger('change');
});
$(function () {
    $("#selectedTimePeriod").change(function () {
        if ($("#monthly").is(":selected")) {
            $(".monthly-scheme").show();


        } else {
            $(".monthly-scheme").hide();
        }
    }).trigger('change');
});


$(function () {
    $("#selectedTimePeriod").change(function () {
        if ($("#daily").is(":selected")) {
            $(".daily-scheme").show();


        } else {
            $(".daily-scheme").hide();
        }
    }).trigger('change');
});

$(function () {
    $("#selectedTimePeriod").change(function () {
        if ($("#annually").is(":selected")) {
            $(".annual-scheme").show();


        } else {
            $(".annual-scheme").hide();
        }
    }).trigger('change');
});

