document.addEventListener("DOMContentLoaded", () => {
  // 회원계정정보 로드
  let member = JSON.parse(sessionStorage.getItem("member"));

  // 사용자 ID 중복 확인.
  let id_button = document.querySelector("#idcheck");
  let id_input = document.querySelector("#userid");
  id_button.addEventListener("click", () => {
    let isDup = false;
    member.forEach((element) => {
      if (element.id === id_input.value) {
        isDup = true;
        return false;
      }
    });
    if (id_input.value.trim() == "") {
      alert("ID가 입력되지 않았습니다");
    } else if (isDup) {
      alert("'" + id_input.value + "'는 이미 존재합니다.");
    } else {
      alert("'" + id_input.value + "'는 사용가능합니다.");
      id_button.classList.add("check_passed");
      id_button.textContent("확인완료");
    }
  });
});
