
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
