function send() {

  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  //Regex Patterns
  var phonepatt = new RegExp(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/);
  var emailpatt = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

  //data validation start here
  if (name == "") {
    validationmessage("Name");


  }

  else if (phone == "" || phonepatt.test(phone) == false) {
    validationmessage("Phone no");

  }

  else if (email == "" || emailpatt.test(email) == false) {
    validationmessage("Email");

  }

  else if (subject == "") {
    validationmessage("Subject");

  }

  else if (message == "") {
    validationmessage("Your Message");
  }

  // if data is valid go for it here.


  else {

    var Actualmessage = name + " is trying to connect with you\n " + "Email: " + email + "\n" + "Phone: " + phone + "\n" + "Message: " + message + "\n";
    message = Actualmessage;

    //check weathere is there any internet connection or not 
    if (navigator.onLine) {
      var formData = { To: "twcbyaasthaarora@gmail.com", Name: name, Phone: phone, Email: email, Subject: subject, Message: message }
      $('#cover-spin').show(30)
      //initiate the ajax request
      $.ajax({
        url: "https://contact247.herokuapp.com/email",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
          //On success code here...
          //data - response from server
          console.log(data.Status);
          if (data.Status == '1') {
            clearbox();
            Swal.fire({
              icon: 'success',
              title: 'Thanks for contacting us.',
              text: 'Your message has been sent. Soon! Someone from our team will get back to you.',
              confirmButtonColor: '#7cbd1e'
            })

          }
          else {

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong. Please try again later',
              confirmButtonColor: '#7cbd1e'
            })

          }
          $('#cover-spin').hide(30);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          //On error code here...
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later',
            confirmButtonColor: '#7cbd1e'
          })
          $('#cover-spin').hide(30);
        }
      });



    } else {
      Swal.fire(
        'The Internet?',
        'That thing is still around?',
        'question'
      )

    }

  }


}

//function for clearing the textbox after successful message drop


function clearbox() {
  document.getElementById("name").value = '';
  document.getElementById("phone").value = '';
  document.getElementById("email").value = '';
  document.getElementById("subject").value = '';
  document.getElementById("message").value = '';

}

//function for validation popup message
function validationmessage(msg) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msg + ' is not valid ' + 'Please provide valid ' + msg,
    confirmButtonColor: '#7cbd1e'
  })

}


//function for Newsletter
function subscribe() {

  var newsletteremail = document.getElementById('newsletteremail').value;
  var endpointurl = "https://script.google.com/macros/s/AKfycbxHcCqC7GB6XGFEh2ipHbjD-PMn5yPRIiuAtGwPVzkyIvPCsPeZ/exec?func=addData&email=" + newsletteremail;

  var emailpatt = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

  if (newsletteremail == "" || emailpatt.test(newsletteremail) == false) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email is not valid, Please provide the valid email',
      confirmButtonColor: '#7cbd1e'
    })

  }
  else {
    $('#cover-spin').show(30);
    $.ajax({
      type: 'GET',
      url: endpointurl,
      success: function (data) {

        if (data.status == true) {
          Swal.fire({
            icon: 'success',
            title: 'Newsletter Subscribed successfully!!! for ' + data.email,
            text: 'All the latest content from Aastha Arora will be dropped directly to your inbox.',
            confirmButtonColor: '#7cbd1e'
          })
         
          document.getElementById('newsletteremail').value = '';
          $('#cover-spin').hide(30);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later',
            confirmButtonColor: '#7cbd1e'
          })

        }
      }

    });
  }

}