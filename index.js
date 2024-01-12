class Employee {
    constructor(record) {
        this.record = record;
    }

    static wagesEarnedOnDate(record, date) {
        let timeInEvents = record.timeInEvents.filter(event => event.date <= date);
        let timeOutEvents = record.timeOutEvents.filter(event => event.date <= date);

        if (timeInEvents.length === 0 && timeOutEvents.length === 0) {
            return 0;
        }

        let wage = record.wage;

        if (timeOutEvents.length === 0) {
            return (24 - timeInEvents[timeInEvents.length - 1].hour) * wage;
        }

        if (timeInEvents.length === 0) {
            return timeOutEvents[0].hour * wage;
        }

        let timeWorked = (timeOutEvents[0].hour - timeInEvents[timeInEvents.length - 1].hour) % 24;
        return timeWorked * wage;
    }

    static allWagesFor(record) {
        let dates = Array.from(new Set([...record.timeInEvents, ...record.timeOutEvents].map(event => event.date))).sort();
        return dates.reduce((wages, date) => wages + this.wagesEarnedOnDate(record, new Date(date)), 0);
    }
}

let totalWages = employeeRecords.reduce((sum, record) => sum + Employee.allWagesFor(record), 0);
return totalWages;
