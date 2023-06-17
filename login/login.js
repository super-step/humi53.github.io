document.addEventListener("DOMContentLoaded", () => {
  // 로그인 클릭
  document.querySelector("#login_button").addEventListener("click", () => {
    const login_form = document.querySelector("form#login_form");
    const username = login_form.querySelector("input[name='username']");
    const password = login_form.querySelector("input[name='password']");
    if (!username.value) {
      alert("USER NAME 은 반드시 입력해야 합니다");
      username.focus();
      return false;
    }
    if (!password.value) {
      alert("PASSWORD 는 반드시 입력해야 합니다");
      password.focus();
      return false;
    }
    if (username.value === "test" && password.value === "1234") {
      sessionStorage.setItem("user", username.value);
    } else {
      alert("로그인이 실패하였습니다.");
    }
    document.location.href = "/index.html";
  });

  // 하단 text 클릭 : 회원가입, 아이디/비밀번호 찾기
  document.querySelector("#more_text").addEventListener("click", (e) => {
    const menu = e.target;
    if (menu.id === "login_join") {
      alert(menu.id);
    } else if (menu.id === "login_findId") {
      alert(menu.id);
    } else if (menu.id === "login_findPassword") {
      alert(menu.id);
    }
  });
});
