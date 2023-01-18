// Return true if valid email
export default function isEmail(email) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 

    return regex.test(email);
}

// Valide Telephone format: XXX-XXX-XXXX, XXX XXX XXXX
export function isTelephone(tel) {
   const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

   return regex.test(tel);
}

// Valid only number 0-9
export function isOnlyNumber( num ) {
    const regex = /^[0-9\b]+$/;

    return regex.test(num);   
}

// Return true if string not empty
export function isNull(str) {
  if (!str || str.length === 0) {
    return false;
  } else {
    return true;
  }   
}

// Is leap year if 
// -The year is multiple of 400
// -The year is multiple of 4 and not multiple of 100
// Year 2000,2400 = Leap Year
// Year 1700, 1800, 1900, 2100, 2200, 2300, 2500 not Leap Year
export function isLeapYear(year) {  
  return ((year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0)));
}

export function isDate(dateStr) {
    // YYYY = 1xxx, 2xxx
    // MM = start with 0 or 1, 2 digits
    // DD = 01 - 31
    const regex = /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regex.test(dateStr)) {
       return false;
    }  

    let year=parseInt(dateStr.substring(0,5));
    let month=parseInt(dateStr.substring(5,7));
    let day=parseInt(dateStr.substring(8,10));
    
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
      return false;
    }    

    if (month === 2) {   // Check if it's Leap year
      if (!isLeapYear(year)) {
         return false;      
      }
    }

  return true;    
}  

// Valid for 24hr format HH:MM
// 03:15 = true
// 13:22 = true
// 24:00 = false
// 11:20 PM = false
export function isTime( time ) {
  // Return false if time is empty
  if (!isNull( time )) { return false; }

  // 24-hour format
  // ( = start of group
  // [01]?[0-9] = time start 0-9,1-9,00-09,10-19
  // | = or
  // 2[0-3] = time starting 20-23
  // ) = end of group
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

  return regex.test(time);   
}

// Compare 24hr format HH:MM
// Return 0 = same
//        1 = time1 > time2
//        2 = time1 < time2
export function compareTime (time1_str, time2_str) {
    if (time1_str == time2_str) { return 0 }

    const [hour1, minutes1] = time1_str.split(':');
    const [hour2, minutes2] = time2_str.split(':');

    let t1=new Date(parseInt("2022",10),(parseInt("01",10))-1,parseInt("01",10),
                    parseInt(hour1,10),parseInt(minutes1,10),0);
    let t2=new Date(parseInt("2022",10),(parseInt("01",10))-1,parseInt("01",10),
                    parseInt(hour2,10),parseInt(minutes2,10),0);                 
                    
    let time1 = t1.valueOf(); 
    let time2 = t2.valueOf();   
    
    if (time1 < time2) {
       return 2;   // time1 < time2
    }

    return 1;   // time1 > time2
}

// SIN = 9 digits
export function isSin(sinStr) {
  const regex = /^[0-9]{9}$/;
  return regex.test(sinStr);   
}  