var container = document.querySelector(".API_map");

let snsCotents = JSON.parse(sessionStorage.getItem("snsCotents")); // 글 스토리지 불러오기
const sessionUser = JSON.parse(sessionStorage.getItem("user")); // 로그인 유저 스토리지 불러오기

/* 넘어온 지역명으로 area 셋팅 */
const urlParams = new URLSearchParams(window.location.search);
let paramName = urlParams.get("name");
let paramType = urlParams.get("type");

let area;
arrCenter.forEach((element) => {
  if (element.name == paramName) {
    area = element;
    return false;
  }
});

/* area 좌표와 확대값으로 해당 지역을 센터로 표시 */
var options = {
  center: new kakao.maps.LatLng(area.Latitude, area.longitude),
  level: 3,
};
// var options = {
//   center: new kakao.maps.LatLng(35.16, 126.8512),
//   level: 3,
// };

// 지도 띄우기
var map = new kakao.maps.Map(container, options);

/***************************************
  마커 관련 부분 시작 
*/

// 마커 좌표 데이터 로드
let positions;

if (paramName == "gj") {
  positions = JSON.parse(JSON.stringify(TestFile)).gj;
} else if (paramName == "Yeosu") {
  positions = JSON.parse(JSON.stringify(TestFile)).Yeosu;
}
// 마커 이미지의 이미지 주소입니다
var imageSrc =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
var imageArry = [
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
  "../image/icon/pin_1.png", //축제
  "../image/icon/pin_2.png", // 관광지
  "../image/icon/pin_3.png", // 음식
];

let makers = []; // 마커 리스트
let customOverlays = []; // 커스텀 오버레이 리스트
for (var i = 0; i < positions.length; i++) {
  if (paramType == "0") {
    // console.log(paramType);
    // console.log(positions[i]);
  } else if (paramType != positions[i].type) {
    // console.log(paramType);
    continue;
  }
  // 마커 이미지의 이미지 크기 입니다
  // var imageSize = new kakao.maps.Size(24, 35);
  var imageSize = new kakao.maps.Size(40, 40);
  // 마커 이미지를 생성합니다
  let markerType = positions[i].type;

  // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  var markerImage = new kakao.maps.MarkerImage(
    imageArry[markerType],
    imageSize
  );
  let position = new kakao.maps.LatLng(
    positions[i].Latitude,
    positions[i].longitude
  );
  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: position, // 마커를 표시할 위치
    image: markerImage, // 마커 이미지
    title: positions[i].name,
    clickable: true,
  });
  makers.push(marker);

  // 마커에 표시할 커스텀 오버레이 생성.
  let customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: `<div id="${positions[i].name}" class="marker"> <span class="title">${positions[i].name}</span> </div>`,
    yAnchor: 1,
  });
  customOverlays.push(customOverlay);

  // 마커 클릭 이벤트
  kakao.maps.event.addListener(marker, "click", () => {
    // 커스텀 오버레이를 전부 닫고
    customOverlays.forEach((element) => {
      element.setMap(null);
    });
    // Todo : 선택한 마커의 글 리스트를 보여주는 부분을 추가해줘야 됨.
    const sideCon = document.querySelector(".side_right");
    const sideList = document.querySelector(".right_list");
    const titleLable = document.querySelector(".titleLable");
    // 리스트의 내용 전부 지우기
    if (sideCon.firstChild) {
      sideCon.removeChild(sideCon.firstChild);
    }
    while (sideList.firstChild) {
      sideList.removeChild(sideList.firstChild);
    }

    // 글 리스트 불러와서 세팅
    // titleLable.textContent = marker.getTitle();
    // sideList.appendChild(titleLable);
    let totalHTML = "";
    totalHTML = `<div class="titleLable"><label for="" >${marker.getTitle()}</label></div>`;
    snsCotents.forEach((element) => {
      if (element.mName == marker.getTitle()) {
        const snsboxString = `<div class="sns_box">
                                <div class="sns_img">
                                  <img class="img" src="${element.img}" alt="" />
                                </div>
                                <div class="sns_title"><h2>${element.title}</h2></div>
                              </div>`;
        totalHTML = totalHTML + snsboxString;
      }
    });

    sideList.innerHTML = totalHTML;

    sideList.classList.add("right_showit");
    sideCon.appendChild(sideList);

    if (sessionUser != null) {
      document.querySelector("#nav_sns_upload").classList.remove("right_write");
    }
    // 선택한 오버레이를 열어준다.
    customOverlay.setMap(map);
  });
}
/*
  마커 관련 부분 끝
*****************************************/
