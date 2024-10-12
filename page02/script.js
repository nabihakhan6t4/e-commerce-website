// // function validateForm() {
// //   let name = document.getElementById("name").value;
// //   if (name === "") {
// //     alert("name must be written");
// //     return false;
// //   }

// //   let country = document.getElementById("country").value;
// //   if (country === "") {
// //     alert("atleast select one country");
// //     return false;
// //   }

// //   let genders = document.getElementsByName('gender');
// //   let selected = false
// //   for(let i=0; i< genders.length; i++){
// //     if(genders[i].checked){
// //       selected = true
// //     }
// //   }
// //   if(!selected){
// //     alert("please select gender")
// //     return false
// //   }

  
// // }

































// function validateForm(){
//     let name = document.getElementById('name').value;
//     if(name === ""){
//         alert("name must be written")
//         return false
//     }
//     let country = document.getElementById('country').value;
//     if(country === ""){
//         alert("atleast select one country")
//         return false
//     }

//     let genders = document.getElementsByName('gender');
//     let selected = false;
//     for(let i=0; i<genders.length;i++){
//         if(genders[i].checked){
//             selected = true
//         }
//     }
//     if(!selected){
//         alert("please selct gender")
//         return false
//     }
// }









function validateForm(){
    let name = document.getElementById('name').value;
    if(name === ""){
        alert('please enter your name')
        return false
    }

    let country = document.getElementById('country').value;
    if(country === ""){
        alert('atleast select one country')
        return false
    }
    let genders = document.getElementsByName('gender')
    let selected = false
    for(let i=0; i< genders.length;i++){
        if(genders[i].checked){
            selected = true
        }
    }if(!selected){
        alert('please select gender')
        return false
    }


    let zip = document.getElementById('zip').value;
    let zipPattern = /^[0-9]{5}$/;
    if(zip === ""){
        alert('please fill these field')
        return false
    }else if(!zip.match(zipPattern)){
        alert('please fill zipcode in proper way')
        return false
    }

    let email = document.getElementById('email').value;
    let emailPattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email === ""){
        alert('please fill these field')
        return false
    }else if(!email.match(emailPattern)){
        alert('please write proper email')
        return false
    }
}












let zipPattern = /^[0-9]{5}$/;
let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;