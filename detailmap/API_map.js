var container = document.querySelector(".API_map");

/* 넘어온 지역명으로 area 셋팅 */
const urlParams = new URLSearchParams(window.location.search);
let paramName = urlParams.get("name");
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
let positions = JSON.parse(JSON.stringify(TestFile)).gj;
// 마커 이미지의 이미지 주소입니다
var imageSrc =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

let makers = []; // 마커 리스트
let customOverlays = []; // 커스텀 오버레이 리스트
for (var i = 0; i < positions.length; i++) {
  // 마커 이미지의 이미지 크기 입니다
  var imageSize = new kakao.maps.Size(24, 35);
  // 마커 이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
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
    titleLable.textContent = marker.getTitle();

    sideList.appendChild(titleLable);
    sideList.classList.add("right_showit");
    sideCon.appendChild(sideList);
    // 선택한 오버레이를 열어준다.
    customOverlay.setMap(map);
  });
}
/*
  마커 관련 부분 끝
*****************************************/
