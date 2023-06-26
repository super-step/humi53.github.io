const nav_sns_all = document.getElementById("nav_sns_all");
const nav_sns_fes = document.getElementById("nav_sns_fes");
const nav_sns_travel = document.getElementById("nav_sns_travel");
const nav_sns_res = document.getElementById("nav_sns_res");
const nav_sns_upload = document.getElementById("nav_sns_upload");

nav_sns_all.addEventListener("click", () => {
  location.replace(`API_map.html?type=0&name=${area.name}`);
});
nav_sns_fes.addEventListener("click", () => {
  location.replace(`API_map.html?type=1&name=${area.name}`);
});
nav_sns_travel.addEventListener("click", () => {
  location.replace(`API_map.html?type=2&name=${area.name}`);
});
nav_sns_res.addEventListener("click", () => {
  location.replace(`API_map.html?type=3&name=${area.name}`);
});
nav_sns_upload.addEventListener("click", () => {
  let inputHTML = `<div class="sns_contents">
                  <div class="upload_header_box">${
                    document.querySelector(".marker").id
                  }</div>
                  <form id="upload_form">
                    <div id="upload_img_container">
                      <label id="upload_img"
                        ><img src="/image/img_book_none.png" alt=""
                      /></label>
                      <input
                type="text"
                id="imguri"
                placeholder="이미지 주소를 입력하세요."
              />
                    </div>
                    <div id="upload_title">
                      <label>title</label>
                      <input
                type="text"
                id="sns_inputTitle"
                placeholder="제목을 입력하세요"
              />
                    </div>
                    <div id="upload_contents">
                      <label>contents</label>
                      <textarea
                        name="contents"
                        id="sns_contents"
                        cols="1"
                        rows="2"
                        maxlength="55"
                      ></textarea>
                    </div>
                    <div id="upload_btn_container">
                      <button type="button" id="upload_btn">UPLOAD</button>
                    </div>
                  </form>
                  </div>
                `;
  const sideList = document.querySelector(".right_list");
  sideList.innerHTML = inputHTML;

  const imguri = document.querySelector("#imguri");
  const img = document.querySelector("#upload_img>img");
  imguri.addEventListener("blur", () => {
    img.src = imguri.value;
  });
  const sns_inputTitle = document.querySelector("#sns_inputTitle");
  const sns_contents = document.querySelector("#sns_contents");
  const upload_btn = document.querySelector("#upload_btn");
  upload_btn.addEventListener("click", () => {
    console.log(sns_inputTitle);
    console.log(sns_contents);
    snsCotents.push({
      mName: document.querySelector(".marker").id,
      userId: sessionUser.id,
      title: sns_inputTitle.value,
      content: sns_contents.value,
      img: img.src,
      heart: 1,
    });
    sessionStorage.setItem("snsCotents", JSON.stringify(snsCotents));
    alert("작성이 완료되었습니다.");
    location.replace(`API_map.html?type=0&name=${area.name}`);
  });
  console.log(sessionUser);
  console.log(snsCotents);
  console.log(document.querySelector(".marker").id);
});
