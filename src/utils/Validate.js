 export const checkValidateData = (email, password , name) =>{

 const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
 const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
 const isNameValid = /^[a-z ,.'-]+$/i.test(name);

 if(!isEmailValid) return "Email is not valid";
 if(!isPasswordValid) return "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character";
 if (!isNameValid) return "Name is not valid";
 
 return null;
 };