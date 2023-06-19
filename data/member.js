const members = [
  {
    id: "test",
    password: "test",
    name: "곽두팔",
    nick: "고양이",
  },
];
let member = members;
sessionStorage.setItem("member", JSON.stringify(member));
// console.log(sessionStorage.getItem("member"));
member.push({
  id: "newid",
  password: "1234",
  name: "newname",
  nick: "newnick",
});
sessionStorage.setItem("member", JSON.stringify(member));
// console.log(sessionStorage.getItem("member"));
