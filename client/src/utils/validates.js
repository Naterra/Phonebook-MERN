const re_zipcode = /^[0-9]{1,5}$/;
const re_phone_numbe = /^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

export const validateZipcode = function(zipcode){
    const validZipcode =   re_zipcode.test(zipcode) ;

    console.log('validZipcode', validZipcode);

    if (!validZipcode) {
        return `The zipcode are invalid: ${zipcode}`;
    }
};

export const validatePhonenumber = function(val){
    const validPhone =   re_zipcode.test(val) ;

    console.log('validPhone', validPhone);

    if (!validPhone) {
        return `The phone number are invalid: ${val}`;
    }
};