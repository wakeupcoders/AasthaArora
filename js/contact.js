function send() {

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var Actualmessage=name+" is trying to connect with you\n "+"Email: "+email+"\n"+"Phone: "+phone+"\n"+"Message: "+message+"\n";
    message=Actualmessage;

    if (navigator.onLine) {
      var formData = { To: "iotapp420@gmail.com", Name: name, Phone: phone, Email: email, Subject: subject, Message: message }
      $('#cover-spin').show(30)

      $.ajax({
        url: "https://warm-refuge-56194.herokuapp.com/email",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
          //data - response from server
          console.log(data.Status);
          if (data.Status == '1') {
            clearbox();
            Swal.fire(
              'Thanks for contacting us.',
              'Your message has been sent. Soon! Someone from our team will get back to you.',
              'success'
            )

          }
          else {
            clearbox();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong. Please try again later'
            })

          }
          $('#cover-spin').hide(30);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          clearbox();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later'
          })
          $('#cover-spin').hide(30);
        }
      });



    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not connected with internet.'

      })
      clearbox();
    }

  }


  function clearbox() {
    document.getElementById("name").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("email").value = '';
    document.getElementById("subject").value = '';
    document.getElementById("message").value = '';

  }
