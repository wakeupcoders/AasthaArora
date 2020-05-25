
//function for Newsletter
function subscribe() {

  var newsletteremail = document.getElementById('newsletteremail').value;
  var endpointurl = "https://script.google.com/macros/s/AKfycbxHcCqC7GB6XGFEh2ipHbjD-PMn5yPRIiuAtGwPVzkyIvPCsPeZ/exec?func=addData&email=" + newsletteremail;

  var emailpatt = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
  if (navigator.onLine) {


    if (newsletteremail == "" || emailpatt.test(newsletteremail) == false) {
      Swal.fire({
        type: 'error',
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
              type: 'success',
              title: 'Newsletter Subscribed successfully!!! for ' + data.email,
              text: 'All the latest content from Aastha Arora will be dropped directly to your inbox.',
              confirmButtonColor: '#7cbd1e'
            })

            document.getElementById('newsletteremail').value = '';
            $('#cover-spin').hide(30);
          }
          else {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong. Please try again later',
              confirmButtonColor: '#7cbd1e'
            })

          }
        }

      });
    }

  }
  else { 
    Swal.fire({
      type: 'question',
      title: 'The Internet?',
      text: 'That thing is still around?',
      confirmButtonColor: '#7cbd1e'
    })
    
  }


}