/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {
  console.log("ahhahaahh");

  ("use strict");

  let usernameError = true,
    emailError = true,
    passwordError = true,
    passConfirm = true;
    loginUsernameErr = true;
    loginPassErr = true;

  // Detect browser for css purpose
  if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
    $(".form form label").addClass("fontSwitch");
  }

  // Label effect
  $("input").focus(function () {
    $(this).siblings("label").addClass("active");
  });

  // Form validation
  $("input").blur(function () {
    // User Name
    if ($(this).hasClass("name")) {
      if ($(this).val().length === 0) {
        $(this)
          .siblings("span.error")
          .text("Please type your user name")
          .fadeIn()
          .parent(".form-group")
          .addClass("hasError");
        usernameError = true;
      } else {
        $(this)
          .siblings(".error")
          .text("")
          .fadeOut()
          .parent(".form-group")
          .removeClass("hasError");
        usernameError = false;
      }
    }
    // Email
    if ($(this).hasClass("email")) {
      if ($(this).val().length == "") {
        $(this)
          .siblings("span.error")
          .text("Please type your email address")
          .fadeIn()
          .parent(".form-group")
          .addClass("hasError");
        emailError = true;
      } else {
        $(this)
          .siblings(".error")
          .text("")
          .fadeOut()
          .parent(".form-group")
          .removeClass("hasError");
        emailError = false;
      }
    }

    // PassWord
    if ($(this).hasClass("pass")) {
      if ($(this).val().length < 6) {
        $(this)
          .siblings("span.error")
          .text("Please type at least 6 charcters")
          .fadeIn()
          .parent(".form-group")
          .addClass("hasError");
        passwordError = true;
      } else {
        $(this)
          .siblings(".error")
          .text("")
          .fadeOut()
          .parent(".form-group")
          .removeClass("hasError");
        passwordError = false;
      }
    }

    // PassWord confirmation
    if ($(".pass").val() !== $(".passConfirm").val()) {
      $(".passConfirm")
        .siblings(".error")
        .text("Passwords don't match")
        .fadeIn()
        .parent(".form-group")
        .addClass("hasError");
      passConfirm = true;
    } else {
      $(".passConfirm")
        .siblings(".error")
        .text("")
        .fadeOut()
        .parent(".form-group")
        .removeClass("hasError");
      passConfirm = false;
    }
    //login
    if ($(this).hasClass("loginUsername")) {
      if ($(this).val().length == "") {
        $(this)
          .siblings("span.error")
          .text("Please type your user name")
          .fadeIn()
          .parent(".form-group")
          .addClass("hasError");
          loginUsernameErr = true;
      } else {
        $(this)
          .siblings(".error")
          .text("")
          .fadeOut()
          .parent(".form-group")
          .removeClass("hasError");
          loginUsernameErr = false;
      }
    }
    if ($(this).hasClass("loginPassword")) {
      if ($(this).val().length < 6) {
        $(this)
          .siblings("span.error")
          .text("Please type at least 6 charcters")
          .fadeIn()
          .parent(".form-group")
          .addClass("hasError");
          loginPassErr = true;
      } else {
        $(this)
          .siblings(".error")
          .text("")
          .fadeOut()
          .parent(".form-group")
          .removeClass("hasError");
          loginPassErr = false;
      }
    }

    // label effect
    if ($(this).val().length > 0) {
      $(this).siblings("label").addClass("active");
    } else {
      $(this).siblings("label").removeClass("active");
    }
  });

  // form switch
  $("a.switch").click(function (e) {
    $(this).toggleClass("active");
    e.preventDefault();
    let currentUrl = window.location.href;
    let path = currentUrl.split("/").pop(); // Use pop() to get the last non-empty element

    if (path == "/login") {
      console.log("doi qua register");

      window.history.pushState({}, "", "http://localhost:3000/register");
    } else {
      console.log("doi qua login");

      window.history.pushState({}, "", "http://localhost:3000/login");
    }
    if ($("a.switch").hasClass("active")) {
      $(this)
        .parents(".form-peice")
        .addClass("switched")
        .siblings(".form-peice")
        .removeClass("switched");
    } else {
      $(this)
        .parents(".form-peice")
        .removeClass("switched")
        .siblings(".form-peice")
        .addClass("switched");
    }
  });

  // Form submit
  $("form.signup-form").submit(function (event) {
    event.preventDefault();
    $(".name, .email, .pass, .passConfirm").blur();
    if (
      usernameError == true ||
      emailError == true ||
      passwordError == true ||
      passConfirm == true
    ) {
      console.log(passConfirm);

      $(".name, .email, .pass, .passConfirm").blur();
    } else {
      console.log(passConfirm);

      const username = $('input[name="username"]').val();
      const email = $('input[name="emailAdress"]').val();
      const password = $('input[name="password"]').val();
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Lỗi khi gửi dữ liệu!");
          }
          return response.json();
        })
        .then((data) => {
          // Xử lý phản hồi từ API
          console.log(data);
          // Ví dụ: Hiển thị thông báo thành công
          if (data.EC !== "0") {
            alert(data.EM);
          } else {
            alert("Đăng ký thành công!");
            $("a.switch").click()

            
          }
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error("Lỗi:", error);
          alert("Có lỗi xảy ra!");
        });
    }
  });
  $("form.login-form").submit(function (event) {
    event.preventDefault();
    $(".loginUsername, .loginPassword").blur();

    if (
      loginUsernameErr == true ||
      loginPassErr == true 
    ) {
      console.log(loginUsernameErr,loginPassErr);

      $(".loginUsername, .loginPassword").blur();
    } else {
      console.log(passConfirm);

      const username = $('input[name="loginUsername"]').val();
      const password = $('input[name="loginPassword"]').val();
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Lỗi khi gửi dữ liệu!");
          }
          return response.json();
        })
        .then((data) => {
          // Xử lý phản hồi từ API
          console.log(data);
          // Ví dụ: Hiển thị thông báo thành công
          if (data.EC !== "0") {
            alert(data.EM);
          } else {
            alert("Đăng ký thành công!");
            $(".signup, .login").addClass("switched");

            setTimeout(function () {
              $(".signup, .login").hide();
            }, 700);
            setTimeout(function () {
              $(".brand").addClass("active");
            }, 300);
            setTimeout(function () {
              $(".heading").addClass("active");
            }, 600);
            setTimeout(function () {
              $(".success-msg p").addClass("active");
            }, 900);
            setTimeout(function () {
              $(".success-msg a").addClass("active");
            }, 1050);
            setTimeout(function () {
              $(".form").hide();
            }, 700);
          }
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error("Lỗi:", error);
          alert("Có lỗi xảy ra!");
        });
    }
  });

  // Reload page
  $("a.profile").on("click", function () {
    location.reload(true);
  });
});
