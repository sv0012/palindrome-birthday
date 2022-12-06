function reverseString(str){
    return str.split('').reverse().join('');
}

function isPalindrome(string){
    const reversedString = reverseString(string);
    if(reversedString === string){
        return true;
    }
    else{
        return false;
    }
}

let date = {
    day : 31,
    month : 12,
    year : 2020
}

function convertDateToString(d){
    let dateStr = {
        day : '',
        month : '',
        year : '',
    }

    if(d.day < 10){
        dateStr.day = '0' + d.day;
    }
    else{
        dateStr.day = d.day.toString();
    }
    if(d.month < 10){
        dateStr.month = '0' + d.month;
    }
    else{
        dateStr.month = d.month.toString();
    }

    dateStr.year = d.year.toString();
    return dateStr;
}

function getAllDateFormats(d){
    let dateStr = convertDateToString(d);

    let ddmmyyyy = dateStr.day+ dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day+ dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
 
}

function checkPalindromeForAllDateFormats(d){
    let list = getAllDateFormats(d);
    let flag = false
    for(let i=0;i<list.length;i++){
        if(isPalindrome(list[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
if(year % 400 === 0){
    return true;
}
if(year % 100 === 0){
    return false;
}
if(year % 4 === 0){
    return true
}
}

function getNextDate(d){
    let day = d.day + 1;
    let month = d.month;
    let year = d.year;

    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day=1;
                month++;
            }
        }else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }else {
        if(day > daysInMonth[month-1]){
            day=1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}


function getNextPalindromeDate(d){
    let count = 0;
    let nextDate = getNextDate(d);

    while(1){
        count++;
        let palindrome = checkPalindromeForAllDateFormats(nextDate);
        if(palindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [count, nextDate];
}

const dateInput = document.querySelector('#bday-input');
const btn = document.querySelector('#btn');


function clickHandler(){
    let bdayStr = dateInput.value;
    let dateObj
    if(bdayStr !== ''){
        let dateSplit = bdayStr.split('-');
        dateObj = {
            day : Number(dateSplit[2]),
            month : Number(dateSplit[1]),
            year : Number(dateSplit[0]),
        }
    }

    let checkPalindrome = checkPalindromeForAllDateFormats(dateObj);

    if(checkPalindrome){
        output.innerText = 'Yay!, your birthday is a palidrome';
    }
    else {
        const [count , nextDate ] = getNextPalindromeDate(dateObj)
        output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${count}`
    }


}
btn.addEventListener('click', clickHandler)