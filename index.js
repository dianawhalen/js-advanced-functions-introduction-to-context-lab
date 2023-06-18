// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTime) {
  let [date, hour] = dateTime.split(" ");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{4}$/.test(hour)) {
    throw new Error(`Invalid timestamp format: ${dateTime}`);
  }

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
  let [date, hour] = dateTime.split(" ");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{4}$/.test(hour)) {
    throw new Error(`Invalid timestamp format: ${dateTime}`);
  }

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  let inEvent = employeeRecord.timeInEvents.find(e => e.date === date);
  let outEvent = employeeRecord.timeOutEvents.find(e => e.date === date);

  if (!inEvent || !outEvent) {
    throw new Error(`Mismatched TimeIn and TimeOut events for date: ${date}`);
  }

  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, date);

  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  let payableDates = employeeRecord.timeInEvents.map(e => e.date);

  return payableDates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

function calculatePayroll(employees) {
  return employees.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}
