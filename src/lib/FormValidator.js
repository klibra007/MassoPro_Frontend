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

// SIN = 9 digits
export function isSin(sinStr) {
  const regex = /^[0-9]{9}$/;
  
  return regex.test(sinStr);   
}  