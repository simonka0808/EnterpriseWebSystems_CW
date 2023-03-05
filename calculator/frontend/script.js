
function validatorFields() {

    var hourlyPay = document.getElementById("hourlyPay").value;
    var output;

    var selectedTimePeriod = document.getElementById("selectedTimePeriod").value;
    var selectedTimePeriodOutput;

    //check for the hourly pay field
    if (hourlyPay == "") {
        output = "Hourly pay can`t be empty!";
    } else if (hourlyPay < 1) {
        output = "Hourly pay can`t be a negative number!";

    } else {
        output = "";
    }

    //check if there is a selected value inside the dropdown
    if (selectedTimePeriod == "Select a period of time") {
        selectedTimePeriodOutput = "Please select a period!";
    } else {
        selectedTimePeriodOutput = "";
    }
    //print the output on the screen
    document.getElementById("hourlyPayCheck").innerHTML = output;
    document.getElementById("timePeriodCheck").innerHTML = selectedTimePeriodOutput;


}
function calculateFinalBudgetFigure() {
    //get the selected time period
    var dropdownMenu = document.getElementById("selectedTimePeriod")
    var selectedIndex = dropdownMenu.value;
    var text = dropdownMenu.options[dropdownMenu.selectedIndex].text;

    var workedHours = parseFloat(document.getElementById("workedHoursOutput").value);
    var hourlyPay = parseFloat(document.getElementById("hourlyPay").value);

    var costPerPerson;

    if (selectedIndex == "1") {

        costPerPerson = workedHours * hourlyPay * calculateRandomFudgeNum();
    } else if (selectedIndex == "2") {
        costPerPerson = workedHours * hourlyPay * 5 * calculateRandomFudgeNum();
        console.log(costPerPerson);

    } else if (selectedIndex == "3") {
        console.log("Monthly");
    } else {
        console.log("Annually");
    }
    

}

function calculateRandomFudgeNum() {

    // fudge factor`s scope
    max = 1.2;
    min = 0.5;
   
    let fudgeFactor = Math.random() * (max - min) + min;

    console.log(fudgeFactor);

    return fudgeFactor;
}

