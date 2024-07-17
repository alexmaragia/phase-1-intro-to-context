// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    console.log(`Creating employee record for: ${firstName} ${familyName}`);
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    console.log('Creating multiple employee records...');
    return employeeData.map(createEmployeeRecord);
}

// Function to add a time-in event to an employee record
function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    console.log(`Adding time-in event for ${employeeRecord.firstName} on ${date} at ${hour}`);
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date
    });
    return employeeRecord;
}

// Function to add a time-out event to an employee record
function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    console.log(`Adding time-out event for ${employeeRecord.firstName} on ${date} at ${hour}`);
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date
    });
    return employeeRecord;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    console.log(`${employeeRecord.firstName} worked ${hoursWorked} hours on ${date}`);
    return hoursWorked;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wages = hoursWorked * employeeRecord.payPerHour;
    console.log(`${employeeRecord.firstName} earned $${wages} on ${date}`);
    return wages;
}

// Function to calculate total wages for all dates worked by an employee
function allWagesFor(employeeRecord) {
    const totalWages = employeeRecord.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
    console.log(`${employeeRecord.firstName} earned a total of $${totalWages}`);
    return totalWages;
}

// Function to calculate the total payroll for all employees
function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, record) => {
        return total + allWagesFor(record);
    }, 0);
    console.log(`Total payroll for all employees is $${totalPayroll}`);
    return totalPayroll;
}

// Example usage
const employees = [
    ['John', 'Doe', 'Developer', 30],
    ['Jane', 'Smith', 'Designer', 25]
];

const employeeRecords = createEmployeeRecords(employees);
createTimeInEvent(employeeRecords[0], '2024-07-17 0800');
createTimeOutEvent(employeeRecords[0], '2024-07-17 1600');
createTimeInEvent(employeeRecords[1], '2024-07-17 0900');
createTimeOutEvent(employeeRecords[1], '2024-07-17 1700');

calculatePayroll(employeeRecords);
