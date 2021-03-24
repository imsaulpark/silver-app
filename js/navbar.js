let member_name = document.getElementById('member-name');
member_name.innerHTML = getCookie("data").name + "님 환영합니다.";

function logout(){
    deleteCookie("data");
    location.href="login.html";
}
