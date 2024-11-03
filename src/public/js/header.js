$("a.logout").click(function (e) {
    fetch("/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
            alert("Đăng xuất thành công!");
            window.location.href = '/'
          }
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error("Lỗi:", error);
          alert("Có lỗi xảy ra!");
        });
  });