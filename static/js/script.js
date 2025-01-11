// function matchPasswords_in_register() {
//     var password = document.getElementById("password").value;
//     var confirm_password = document.getElementById("confirm_password").value;
  
//     if (password != confirm_password) {
//         document.getElementById("password_not_match").classList.add("op-0");
//     } else {
//         document.getElementById("password_not_match").classList.remove("op-0");
//     }
//   }
  
//   var password = document.getElementById('password');
//       var flag = 1; //1 -> no error | 0 -> error
//       function check(elem) {
//           if (elem.value.length > 0) {
//               if (elem.value != password.value) {
//                   document.getElementById('alert').innerText = "Confirm password does not match";
//                   flag = 0;
//               }else{
//                   document.getElementById('alert').innerText = "";
//                   flag = 1;
//               }
//           }else{
//               document.getElementById('alert').innerText = "Please enter confirm password";
//               flag = 0;
//           }
//       }
//       function validate() {
//           if (flag == 1) {
//               return true;
//           } else {
//               return false;
//           }
//       }