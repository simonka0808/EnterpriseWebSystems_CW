// const pound = "£"

// function validatorFields() {


//     var selectedTimePeriod = document.getElementById("selectedTimePeriod").value;
//     var selectedTimePeriodOutput;

//     var projectName = document.getElementById("projectNameText").value;
//     var projectNameOutput;


//     //check for the project name
//     if (projectName == "") {
//         projectNameOutput = "Project name can`t be empy";
//     } else {
//         projectNameOutput = "";
//     }

//     //check if there is a selected value inside the dropdown
//     if (selectedTimePeriod == "Select a period of time") {
//         selectedTimePeriodOutput = "Please select a period!";
//     } else {
//         selectedTimePeriodOutput = "";
//     }


//     //print the output on the screen
//     document.getElementById("timePeriodCheck").innerHTML = selectedTimePeriodOutput;
//     document.getElementById("projectNameCheck").innerHTML = projectNameOutput;



// }
// function calculateFinalBudgetFigure() {

//     //amount of money per hour for a specific position
//     var junior = 10;
//     var standard = 20;
//     var senior = 40;

//     //get the selected time period
//     var dropdownMenu = document.getElementById("selectedTimePeriod");
//     var selectedTimePeriodIndex = dropdownMenu.value;

//     //get the developer type

//     var devType = document.querySelector('input[name="devType"]:checked').value;




//     if (selectedTimePeriodIndex == "1") {

//         costPerPerson = findSingleDayWorkingHours() * hourlyPay * calculateRandomFudgeNum();
//         document.getElementById("finalResult").innerHTML = costPerPerson.toFixed(2) + pound;


//     } else if (selectedTimePeriodIndex == "2") {
//         costPerPerson = findTotalWeeklyWorkingHours() * hourlyPay * calculateRandomFudgeNum();
//         document.getElementById("finalResult").innerHTML = costPerPerson.toFixed(2) + pound;

//     } else if (selectedTimePeriodIndex == "3") {
//         costPerPerson = findTotalMonthlyWorkingHours() * hourlyPay * calculateRandomFudgeNum();
//         document.getElementById("finalResult").innerHTML = costPerPerson.toFixed(2) + pound;
//     } else if (selectedTimePeriodIndex = "4") {
//         costPerPerson = findTotalAnnuallyWorkingHours() * hourlyPay * calculateRandomFudgeNum();
//         document.getElementById("finalResult").innerHTML = costPerPerson.toFixed(2) + pound;
//     }
// }


function showDiv() {
    container = document.getElementById('humanResources');
    section = document.getElementById('resouceElements')
    container.appendChild(section.cloneNode(true));
}