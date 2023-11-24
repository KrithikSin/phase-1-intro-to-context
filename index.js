// Your code here

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(function (arr) {
        return createEmployeeRecord(arr);
    });
}

function createTimeInEvent(record, dateTime) {
    let newDateTime = dateTime.split(' ');
    const date = newDateTime[0];
    const time = parseInt(newDateTime[1]);
    record.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: time,
    });
    return record;
}

function createTimeOutEvent(record, dateTime) {
    let newDateTime = dateTime.split(' ');
    const date = newDateTime[0];
    const time = parseInt(newDateTime[1]);
    record.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: time,
    });
    return record;
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find((event) => event.date === date);
    const timeOut = record.timeOutEvents.find((event) => event.date === date);

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(record, date) {
    const wage = record.payPerHour * hoursWorkedOnDate(record, date);
    return wage;
}

function allWagesFor(record) {
    let totalWage = 0;
    const wageDate = record.timeInEvents.map((event) => event.date);
    wageDate.forEach((date) => {
        const wageDate = wagesEarnedOnDate(record, date);
        totalWage += wageDate;
    });

    return totalWage;
}

function calculatePayroll(employees) {
    let totalPayRoll = 0;
    employees.forEach((employee) => {
        totalPayRoll += allWagesFor(employee);
    });
    return totalPayRoll;
}
