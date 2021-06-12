function createEmployeeRecord(employeeInfo){
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employeeList){
  return employeeList.map(function(emp) {
    return createEmployeeRecord(emp)
  })
}

function createTimeInEvent(employee, timeIn){
  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(timeIn.split(' ')[1]),
    date: timeIn.split(' ')[0]
  })
  return employee
}

function createTimeOutEvent(employee, timeOut){
  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(timeOut.split(' ')[1]),
    date: timeOut.split(' ')[0]
  })
  return employee
}

function hoursWorkedOnDate(employee, date){

return (getTimeOut(employee, date) - getTimeIn(employee, date)) / 100

}

function getTimeIn(employee, date){
  for (const event of employee.timeInEvents){
    if (event.date === date){
      return event.hour
    }
  }
}

function getTimeOut(employee, date){
  for (const event of employee.timeOutEvents){
    if (event.date === date){
      return event.hour
    }
  }
}

function wagesEarnedOnDate(employee, date){
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee){
  const hoursWorked = employee.timeInEvents.map(time => { // return array of hours worked  
    return hoursWorkedOnDate(employee, time.date)
  })
return hoursWorked.reduce((total, item) => total + item) * employee.payPerHour
}

function calculatePayroll(employees){
  let totalOwed = 0
  employees.forEach(employee => {
    totalOwed += allWagesFor(employee)
  })
  return totalOwed
}

function findEmployeeByFirstName(employees, employeeName){
  return employees.find(emp => emp.firstName === employeeName)
}