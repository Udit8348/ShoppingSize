// Shows v1.5 welcome window if v1.5 has not been opened yet
if (localStorage.getItem("version1.5") == null) {
	if (localStorage.getItem("user") == "teacher") {
		localStorage.setItem("schedule", "staff")
	}
	localStorage.removeItem("user");
	document.getElementById("install").style.display = "block";
	document.getElementById("extension-body").style.display = "none";
	localStorage.setItem("version1.5", "opened");
}


// Shows welcome window if teacher has not selected their settings
if (localStorage.getItem("schedule") == "staff") {
	if (localStorage.getItem("teacher-period-1") == null || localStorage.getItem("teacher-period-2") == null || localStorage.getItem("teacher-period-3") == null || localStorage.getItem("teacher-period-4") == null || localStorage.getItem("teacher-period-5") == null || localStorage.getItem("teacher-period-6") == null || localStorage.getItem("teacher-period-7") == null) {
		document.getElementById("install").style.display = "block";
		document.getElementById("extension-body").style.display = "none";
	}
}


// Shows welcome window if user has not selected their settings
if (localStorage.getItem("schedule") == null) {
	document.getElementById("install").style.display = "block";
	document.getElementById("extension-body").style.display = "none";
}


// Slides down the settings panel and slides up the main panel in the popup window when the settings button is clicked.
$("#settings-link").click(function() {
	$("#main").slideUp("slow");
	$("#settings-panel").slideDown("slow");
});


// Slides down the settings panel and slides up the main panel in the popup window when the settings button is clicked.
$("#install-settings-link").click(function() {
	$("#extension-body").slideDown("slow");
	$("#install").slideUp("slow");
	$("#main").slideUp("slow");
	$("#settings-panel").slideDown("slow");
});


// On load, sets the value of the class input dropdowns to what is currently stored in local storage.
window.onload = function getStorage() {
	if (localStorage.getItem("schedule") == "9-10") {
		document.getElementById("class-inputs").value = "freshman-sophomore";
	} else if (localStorage.getItem("schedule") == "11-12") {
		document.getElementById("class-inputs").value = "junior-senior";
	} else if (localStorage.getItem("schedule") == "staff") {
		document.getElementById("class-inputs").value = "staff";
		$(".teacher-inputs-section").slideDown("slow");
		document.getElementById("teacher-input-period-1").value = localStorage.getItem("teacher-period-1");
		document.getElementById("teacher-input-period-2").value = localStorage.getItem("teacher-period-2");
		document.getElementById("teacher-input-period-3").value = localStorage.getItem("teacher-period-3");
		document.getElementById("teacher-input-period-4").value = localStorage.getItem("teacher-period-4");
		document.getElementById("teacher-input-period-5").value = localStorage.getItem("teacher-period-5");
		document.getElementById("teacher-input-period-6").value = localStorage.getItem("teacher-period-6");
		document.getElementById("teacher-input-period-7").value = localStorage.getItem("teacher-period-7");
	} else {
		document.getElementById("class-inputs").value = "no-selection";
	}
}


// Takes value of schedule input dropdowns and saves it in local storage, then closes the window so that changes appear when the extension is reopened.
document.getElementById("save-settings-button").onclick = function saveSettings() {
	if (document.getElementById("class-inputs").value == "freshman-sophomore") {
		localStorage.setItem("schedule", "9-10");
	}
	if (document.getElementById("class-inputs").value == "junior-senior") {
		localStorage.setItem("schedule", "11-12");
	}
	if (document.getElementById("class-inputs").value == "staff") {
		localStorage.setItem("schedule", "staff");
		localStorage.setItem("teacher-period-1", document.getElementById("teacher-input-period-1").value);
		localStorage.setItem("teacher-period-2", document.getElementById("teacher-input-period-2").value);
		localStorage.setItem("teacher-period-3", document.getElementById("teacher-input-period-3").value);
		localStorage.setItem("teacher-period-4", document.getElementById("teacher-input-period-4").value);
		localStorage.setItem("teacher-period-5", document.getElementById("teacher-input-period-5").value);
		localStorage.setItem("teacher-period-6", document.getElementById("teacher-input-period-6").value);
		localStorage.setItem("teacher-period-7", document.getElementById("teacher-input-period-7").value);
	}
	window.close();
}


// Slides down the teacher section of settings when the teacher input is selected, and vice versa. Teachers can then input each of the class periods so that Chronos can determine which schedule to show on which days.
$("#class-inputs").change(function() {
	if ($("#class-inputs").val() == "staff") {
 		$(".teacher-inputs-section").slideDown("slow");
 	} else {
 		$(".teacher-inputs-section").slideUp("slow");
 	}
});


// Assigns a variable with which schedule should be displayed: 9-10, 11-12, staff. If it is a staff schedule, this variable will be overwritten with either 9-10 or 11-12 after it is determined which schedule should be shown.
var scheduleType = localStorage.getItem("schedule");


// Function called to give a number below 10 a leading zero for formatting purposes.
function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}


// Function receives a 24-hour time and returns a 12-hour time, with AM or PM attached
function convertTo12(time) {
	// Takes times that begin with 00 hours and returns 12 the hour as 12 AM
	if (parseInt(time.substr(0, 2)) == 0) {
		return "12" + time.substring(5, 2) + " AM";
	}
	// Takes times that begin between 01 and 09 hours, uses parseInt() to remove leading zero, and tacks on AM to the end
	if (1 <= parseInt(time.substr(0, 2)) && parseInt(time.substr(0, 2)) <= 9) {
		return parseInt(time.substr(0, 2)) + time.substring(5, 2) + " AM";
	}
	// Takes times that begin between 10 and 11 and tacks on AM to the end
	if (10 <= parseInt(time.substr(0, 2)) && parseInt(time.substr(0, 2)) <= 11) {
		return parseInt(time.substr(0, 2)) + time.substring(5, 2) + " AM";
	}
	// Takes times that begin with 12 and tacks on PM to the end
	if (parseInt(time.substr(0, 2)) == 12) {
		return parseInt(time.substr(0, 2)) + time.substring(5, 2) + " PM";
	}
	// Takes times that begin between 13 and 23, converts to 12-hour time, and tacks on PM to the end
	if (13 <= parseInt(time.substr(0, 2)) && parseInt(time.substr(0, 2)) <= 23) {
		return parseInt(time.substr(0, 2))-12 + time.substring(5, 2) + " PM";
	}
}


// Calls displayTime() on load to format and print time and date in title bar.
displayTime();
// setInterval(displayTime, 1000); // Future version: Run displayTime() every second to keep time and date updated while popup remains open


// Formats date and time text and prints them in the GUI.
function displayTime() {

	// Declares a variable as a date object for the current date and time. 
	fulldate = new Date(); // The "var" keyword is left out to declare the variable as a global variable

	// Declares a variable as the current day of the week, expressed as a number 0 thru 7 before being converted to a string in the if-statement.
	day = fulldate.getDay(); // The "var" keyword is not used to declare the variable *day*, making it a global variable
	if (day == 0) {
		day = "Sunday";
	} else if (day == 1) {
		day = "Monday";
	} else if (day == 2) {
		day = "Tuesday";
	} else if (day == 3) {
		day = "Wednesday";
	} else if (day == 4) {
		day = "Thursday";
	} else if (day == 5) {
		day = "Friday";
	} else {
		day = "Saturday";
	}

	// Declares a variable as the current month, expressed as a number 0 thru 11 before being converted to a string in the if-statement.
	var month = fulldate.getMonth();
	if (month == 0) {
		month = "January";
	} else if (month == 1) {
		month = "February";
	} else if (month == 2) {
		month = "March";
	} else if (month == 3) {
		month = "April";
	} else if (month == 4) {
		month = "May";
	} else if (month == 5) {
		month = "June";
	} else if (month == 6) {
		month = "July";
	} else if (month == 7) {
		month = "August";
	} else if (month == 8) {
		month = "September";
	} else if (month == 9) {
		month = "October";
	} else if (month == 10) {
		month = "November";
	} else {
		month = "December";
	}

	// Concatenates date variables, spaces, and commas, printing them in the GUI. 
	document.getElementById("date").innerHTML = day + ", " + month + " " + fulldate.getDate();

	// Prints current year for the copyright statement on the GUI. 
	document.getElementById("year").innerHTML = fulldate.getFullYear();

	// Declares variables for hours and minutes. 
	var h = fulldate.getHours();
	var m = addZero(fulldate.getMinutes());
	
	// Declares a variable for AM or PM for current time. Default is AM, and if-statement changes it to PM if necessary.
	var ampm = "AM";
	if (h >= 12) {
		if (h != 12) {
			h = h - 12;
		}
		ampm = "PM";
	}
	
	// Concatenates time variables, spaces, and colons, printing them in the GUI. 
	document.getElementById("currentTime").innerHTML = h + ":" + m + " " + ampm;

}


// Declares an object with Firebase access credentials.
var config = {
	apiKey: "AIzaSyB6M0UhmfqQ4Gi6tKLgfKk7P6HarjheJLw",
	authDomain: "stem-chronos.firebaseapp.com",
	databaseURL: "https://stem-chronos.firebaseio.com",
	projectId: "stem-chronos",
	storageBucket: "stem-chronos.appspot.com",
	messagingSenderId: "533657331035"
};


// Uses credentials to establish a connection with Firebase.
firebase.initializeApp(config);


// Declares database object.
var database = firebase.firestore();


// Uses start and end times in Firebase to find which periods are during lunches, and considers which grade level teachers teach during those periods to figure out which schedule should be shown
if (localStorage.getItem("schedule") == "staff") {
	
	// Getting Firebase data for schedule
	database.collection("schedules").doc(fulldate.getFullYear() + "-" + addZero(fulldate.getMonth()+1) + "-" + addZero(fulldate.getDate())).get().then(documentSnapshot => {
	
		// Only allows use of data if document with schedule data for today's date exists.
		if (documentSnapshot.exists) {
			
			// The variable firebaseObject is an object with key-pair values for schedule data.
			var firebaseObject = documentSnapshot.data()["firebaseSubmissionObject"];
		
			// Creates an empty array for the following for loop to use.
			var periodRowNumbers = [];

			// Loops through property names in Firebase object and puts them in an array if the 12th character is a number. This array contains all of the names of properties that have period name, start, or end information.
			for (fieldName in firebaseObject) {
				if (isNaN(parseInt(fieldName.substr(11, 1))) == false) {
					periodRowNumbers.push(fieldName.substr(11, 1));
				}
			}

			// Creates a variable to hold the highest period row number out of all period rows in the Firebase object. This number is used in the for loop below to determine how many times to loop.
			var maxPeriodRowNumber = Math.max.apply(null, periodRowNumbers);
			
			// Loops through each of the period rows in Firebase
			for (i = 1; i <= maxPeriodRowNumber; i++) {
			
				// Finds which period row in Firebase is the lunch period for the 9-10 schedule.
				if (firebaseObject["period-row-" + i + "-name-9-10"] == "Lunch") {
					
					// Sets two variables to hold date objects with the start and end times for 9-10 lunch.
					var grade910LunchStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + i + "-start-9-10"].substr(0, 2), firebaseObject["period-row-" + i + "-start-9-10"].substr(3, 2));
					var grade910LunchEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + i + "-end-9-10"].substr(0, 2), firebaseObject["period-row-" + i + "-end-9-10"].substr(3, 2));
					
					// Loops through period rows in the 11-12 schedule
					for (j = 1; j <= maxPeriodRowNumber; j++) {
						
						// Sets two variables with the start and end date object for period row j in the for loop
						var grade1112TestPeriodStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + j + "-start-11-12"].substr(0, 2), firebaseObject["period-row-" + j + "-start-11-12"].substr(3, 2));
						var grade1112TestPeriodEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + j + "-end-11-12"].substr(0, 2), firebaseObject["period-row-" + j + "-end-11-12"].substr(3, 2));
						
						// Figures out if period row j in the 11-12 schedule is opposite the 9-10 lunch period, and if so, assigns the name of the 11-12 period to a variable
						if (grade910LunchStart >= grade1112TestPeriodStart && grade910LunchEnd <= grade1112TestPeriodEnd) {
							var grade1112PeriodOppositeOfGrade910Lunch = firebaseObject["period-row-" + j + "-name-11-12"];
						}
					}
				}
				
				// Finds which period row in Firebase is the lunch period for the 9-10 schedule.
				if (firebaseObject["period-row-" + i + "-name-11-12"] == "Lunch") {
				
					// Sets two variables to hold date objects with the start and end times for 11-12 lunch.
					var grade1112LunchStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + i + "-start-11-12"].substr(0, 2), firebaseObject["period-row-" + i + "-start-11-12"].substr(3, 2));
					var grade1112LunchEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + i + "-end-11-12"].substr(0, 2), firebaseObject["period-row-" + i + "-end-11-12"].substr(3, 2));
					
					// Loops through period rows in the 9-10 schedule
					for (j = 1; j <= maxPeriodRowNumber; j++) {
					
						// Sets two variables with the start and end date object for period row j in the for loop
						var grade910TestPeriodStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + j + "-start-9-10"].substr(0, 2), firebaseObject["period-row-" + j + "-start-9-10"].substr(3, 2));
						var grade910TestPeriodEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + j + "-end-9-10"].substr(0, 2), firebaseObject["period-row-" + j + "-end-9-10"].substr(3, 2));
						
						// Figures out if period row j in the 9-10 schedule is opposite the 11-12 lunch period, and if so, assigns the name of the 9-10 period to a variable
						if (grade1112LunchStart >= grade910TestPeriodStart && grade1112LunchEnd <= grade910TestPeriodEnd) {
							var grade910PeriodOppositeOfGrade1112Lunch = firebaseObject["period-row-" + j + "-name-9-10"];
						}
					}
				}
			}
			
			// This array will hold the grade level (9-10 or 11-12) taught during the two periods opposite of lunch, as identified above
			var gradeLevelsTaughtDuringLunchPeriods = [];
			
			// Finds out what grade level is taught the period opposite of 9-10 lunch, and is pushed to an array
			if (localStorage.getItem("teacher-period-" + grade1112PeriodOppositeOfGrade910Lunch.substr(-1, 1)) == "9-10") {
				gradeLevelsTaughtDuringLunchPeriods.push("9-10");
			} else if (localStorage.getItem("teacher-period-" + grade1112PeriodOppositeOfGrade910Lunch.substr(-1, 1)) == "11-12") {
				gradeLevelsTaughtDuringLunchPeriods.push("11-12");
			} else {
				gradeLevelsTaughtDuringLunchPeriods.push("prep");
			}
			
			// Finds out what grade level is taught the period opposite of 11-12 lunch, and is pushed to an array
			if (localStorage.getItem("teacher-period-" + grade910PeriodOppositeOfGrade1112Lunch.substr(-1, 1)) == "11-12") {
				gradeLevelsTaughtDuringLunchPeriods.push("11-12");
			} else if (localStorage.getItem("teacher-period-" + grade910PeriodOppositeOfGrade1112Lunch.substr(-1, 1)) == "9-10") {
				gradeLevelsTaughtDuringLunchPeriods.push("9-10");
			} else {
				gradeLevelsTaughtDuringLunchPeriods.push("prep");
			}

			// Since there are only two lunch periods, we can test the two indexes in the array
			// If the array is ["9-10", "9-10"], then Chronos will display the 9-10 schedule,
			if (gradeLevelsTaughtDuringLunchPeriods.indexOf("9-10") == 0 && gradeLevelsTaughtDuringLunchPeriods.indexOf("9-10", 1) == 1) {
				scheduleType = "9-10";
			} 
			
			// If the array is ["11-12", "11-12"], then Chronos will display the 11-12 schedule,
			else if (gradeLevelsTaughtDuringLunchPeriods.indexOf("11-12") == 0 && gradeLevelsTaughtDuringLunchPeriods.indexOf("11-12", 1) == 1) {
				scheduleType = "11-12";
			} 
			
			// If the array is ["prep", "prep"], the teacher has a prep period opposite the lunches, so we figure out if the teacher teaches majority 9-10 classes or 11-12 classes
			else if (gradeLevelsTaughtDuringLunchPeriods.indexOf("prep") == 0 && gradeLevelsTaughtDuringLunchPeriods.indexOf("prep", 1) == 1) {
				
				// Creates an array that holds all of the grade levels the teacher teaches
				var gradeLevelsTaught = [localStorage.getItem("teacher-period-1"), localStorage.getItem("teacher-period-2"), localStorage.getItem("teacher-period-3"), localStorage.getItem("teacher-period-4"), localStorage.getItem("teacher-period-5"), localStorage.getItem("teacher-period-6"), localStorage.getItem("teacher-period-7")];
				
				// Creates variables to hold the count for how many 9-10, 11-12, and prep periods he/she has
				var countOf910Items = 0;
				var countOf1112Items = 0;
				var countOfPrepItems = 0;
				
				// Loops through the array of grade levels of each period the teacher teaches, and adds one to the appropriate variable as it loops
				for (i = 0; i < gradeLevelsTaught.length; i++) {
					if (gradeLevelsTaught[i] == "9-10") {
						countOf910Items++;
					} else if (gradeLevelsTaught[i] == "11-12") {
						countOf1112Items++;
					} else {
						countOfPrepItems++;
					}
				}
				
				// Determines whether the number of 9-10 classes taught is larger than number of 11-12 classes taught. In the case of a tie, the 11-12 schedule is shown
				if (countOf910Items > countOf1112Items) {
					scheduleType = "9-10";
				} else {
					scheduleType = "11-12";
				}
				
			// If the array is has prep in index 0 or index 1, but not both, we use the schedule of the class the teacher teaches that is not a prep period.	
			} else if (gradeLevelsTaughtDuringLunchPeriods.indexOf("prep") == 0 || gradeLevelsTaughtDuringLunchPeriods.indexOf("prep", 1) == 1) {
				if (localStorage.getItem("teacher-period-" + grade910PeriodOppositeOfGrade1112Lunch.substr(-1, 1)) == "9-10") {
					scheduleType = "9-10";
				}
				if (localStorage.getItem("teacher-period-" + grade910PeriodOppositeOfGrade1112Lunch.substr(-1, 1)) == "11-12") {
					scheduleType = "11-12";
				}
				if (localStorage.getItem("teacher-period-" + grade1112PeriodOppositeOfGrade910Lunch.substr(-1, 1)) == "9-10") {
					scheduleType = "9-10";
				}
				if (localStorage.getItem("teacher-period-" + grade1112PeriodOppositeOfGrade910Lunch.substr(-1, 1)) == "11-12") {
					scheduleType = "11-12";
				}
			
			// If none of the conditions above accurately describe the array, then the array is ["9-10", "11-12"] or ["11-12", "9-10"] and a schedule cannot be determined because the teacher doesn't have lunch.
			} else {
				console.log("You teach different grade levels during periods associated w/ lunch. Chronos cannot display a schedule.");
			}
		}
	});
}


// Retrieves today's schedule document through a snapshot from Firebase and initiates a function to use the data.
database.collection("schedules").doc(fulldate.getFullYear() + "-" + addZero(fulldate.getMonth()+1) + "-" + addZero(fulldate.getDate())).get().then(documentSnapshot => {
	
	// Only allows retrieval of data if document with schedule data for today's date exists.
	if (documentSnapshot.exists) {
	
		// The variable firebaseObject is an object with key-pair values for schedule data.
		var firebaseObject = documentSnapshot.data()["firebaseSubmissionObject"];

		// Prints letter day in the GUI based on data from Firebase object. 
		if (firebaseObject["letterDay"] == "Other") {
			document.getElementById("letter-day").innerHTML = firebaseObject["otherLetterDay"];
		} else {
			document.getElementById("letter-day").innerHTML = firebaseObject["letterDay"];
		}

		// Prints custom message in the GUI based on datafrom Firebase object, unless we need to notify a teacher that his/her schedule could not be generated
		document.getElementById("notification").innerHTML = firebaseObject["customMessage"];

		// Creates an empty array for the following for loop to use.
		var periodRowNumbers = [];

		// Loops through property names in Firebase object and puts them in an array if the 12th character is a number. This array contains all of the names of properties that have period name, start, or end information.
		for (fieldName in firebaseObject) {
			if (isNaN(parseInt(fieldName.substr(11, 1))) == false) {
				periodRowNumbers.push(fieldName.substr(11, 1));
			}
		}

		// Creates a variable to hold the highest period row number out of all period rows in the Firebase object. This number is used in the for loop below to determine how many times to loop.
		var maxPeriodRowNumber = Math.max.apply(null, periodRowNumbers);

		// Loops through each of the period rows in the Firebase object and prints the necessary information in the GUI.
		for (i = 1; i <= maxPeriodRowNumber; i++) {

			// Appends a row to the table with period name, start, and end time in the GUI based on user's preferred schedule (9-10 or 11-12).
			$("#full-schedule").append("" +
				"<tr " + currentPeriod() + " >" +
				"<td class='column1'>" + firebaseObject["period-row-" + i + "-name-" + scheduleType] + "</td>" +
				"<td class='column2'>" + convertTo12(firebaseObject["period-row-" + i + "-start-" + scheduleType]) + " - " + convertTo12(firebaseObject["period-row-" + i + "-end-" + scheduleType]) + "</td>" +
				"</tr>");
	
			// Executes a function that determines whether the current time falls between the period row i's start and end time, and if so, it returns a CSS class that adds a blue background to that row in the table in the GUI. 
			function currentPeriod() {
				if (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + i + "-start-" + scheduleType].substr(0, 2), firebaseObject["period-row-" + i + "-start-" + scheduleType].substr(3, 2)) <= new Date() && new Date() <= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + i + "-end-" + scheduleType].substr(0, 2), firebaseObject["period-row-" + i + "-end-" + scheduleType].substr(3, 2))) {
					return "class='highlighted-row'";
				} else {
					return "";
				}
			}

			// Finds if the current time falls between period row i's start and end time, and if so, shows the amount of time until the end of the period. 
			if (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + i + "-start-" + scheduleType].substr(0, 2), firebaseObject["period-row-" + i + "-start-" + scheduleType].substr(3, 2)) <= new Date() && new Date() <= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + i + "-end-" + scheduleType].substr(0, 2), firebaseObject["period-row-" + i + "-end-" + scheduleType].substr(3, 2))) {
	
				// Shows the time remaining section of the GUI.
				document.getElementById("time-remaining").style.display = "block";
	
				// Creates a variable that holds a date object with the amount of time left until the end of the period. 
				var timeToPeriodEnd = new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), firebaseObject["period-row-" + i + "-end-" + scheduleType].substr(0, 2), firebaseObject["period-row-" + i + "-end-" + scheduleType].substr(3, 2)) - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes()));
	
				// Determines whether the number of hours until the end of the period is not zero, and if so, shows the number of hours until the end of the period in the GUI. 
				if (timeToPeriodEnd.getHours() - 19 != 0) {
					document.getElementById("hours-remaining").innerHTML = timeToPeriodEnd.getHours() - 19;
					document.getElementById("hours").style.display = "inline-block";
				}
	
				// Determines whether the number of hours until the end of the period is not one, and if so, adds an "s" to the end of the word "hour" in the GUI.
				if (timeToPeriodEnd.getHours() - 19 != 1) {
					document.getElementById("multiple-hours-s").style.display = "inline-block";
				}
	
				// Determines whether the number of minutes until the end of the period is not one, and if so, adds an "s" to the end of the word "minutes" in the GUI. 
				if (timeToPeriodEnd.getMinutes() != 1) {
					document.getElementById("multiple-minutes-s").style.display = "inline-block";
				}
	
				// Prints remaining minutes and period name into GUI. 
				document.getElementById("minutes-remaining").innerHTML = timeToPeriodEnd.getMinutes();
				document.getElementById("current-period").innerHTML = firebaseObject["period-row-" + i + "-name-" + scheduleType];
			}
		}

		// Determines whether it is a snow day based on data from Firebase object, and if so, hides the main part of the extension and instead shows a snow day GIF. 
		if (firebaseObject["isSnowDay"] == "Yes") {
			document.getElementById("main").innerHTML = "";
			document.getElementById("snow-day").style.display = "block";
		} else {
			document.getElementById("snow-day").style.display = "none";
		}

		// Determines whether it is a day off based on data from Firebase object, and if so, hides the main part of the extension and instead shows a snow day GIF. 
		if (firebaseObject["isDayOff"] == "Yes") {
			if (firebaseObject["isSnowDay"] == "No") { // Nested if-statement prevents both snow day and day off GIFs from showing at same time
				document.getElementById("main").innerHTML = "";
				document.getElementById("no-school").style.display = "block";
			}
		} else {
			document.getElementById("no-school").style.display = "none";
		}
	
	}
	
});
	

// Determines whether it is a Saturday and if so, hides the main part of the extension and instead shows a Saturday GIF.
if (day == "Saturday") {
	if (new Date(2018, 5, 8, 12, 0, 0, 0) > new Date() || new Date(2018, 7, 27, 1, 0, 0, 0) < new Date()) { // Nested if-statement prevents both summer and Saturday GIFs from showing at the same time
		document.getElementById("main").innerHTML = "";
		document.getElementById("saturday").style.display = "block";
	}
} else {
	document.getElementById("saturday").style.display = "none";
}


// Determines whether it is a Sunday and if so, hides the main part of the extension and instead shows a Sunday GIF.
if (day == "Sunday") {
	if (new Date(2018, 5, 8, 12, 0, 0, 0) > new Date() || new Date(2018, 7, 27, 1, 0, 0, 0) < new Date()) { // Nested if-statement prevents both summer and Sunday GIFs from showing at the same time
		document.getElementById("main").innerHTML = "";
		document.getElementById("sunday").style.display = "block";
	}
} else {
	document.getElementById("sunday").style.display = "none";
}


// Determines if it is summer and if so, hides the main part of the extension and instead shows a summer GIF.
if (new Date(2019, 5, 8, 12, 0, 0, 0) < new Date() && new Date(2019, 7, 25, 1, 0, 0, 0) > new Date()) {
	document.getElementById("main").innerHTML = "";
	document.getElementById("summer").style.display = "block";
} else {
	document.getElementById("summer").style.display = "none";
}


// Determines if an Internet connection is present, and if not, hides main section of extension and instead shows a no internet GIF. 
if (navigator.onLine == false) {
    document.getElementById("main").innerHTML = "";
    document.getElementById("no-internet").style.display = "block";
}
