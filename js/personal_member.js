get_member_list();

function get_member_list() {
    let data = { "centerId": 3 };
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/members/patients',
        data: data,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            member_list = r.data;
            make_member_table(r.data);
            // console.log(r.data);
            // alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });

};

function make_member_table(member_list) {
    const member_table = document.querySelector('.person-table');
    let count = 1;
    member_list.forEach(member => {
        const row = member_table.insertRow();
        let cell = row.insertCell();
        cell.innerHTML = count++;
        cell = row.insertCell();
        //체크박스 넣기
        cell = row.insertCell();
        cell.innerHTML = member.name;
        cell = row.insertCell();
        //담당자명 넣기
        cell = row.insertCell();
        //등급 넣기
        cell = row.insertCell();
        //등급 넣기
        cell = row.insertCell();
        const btn = document.createElement("button");
        const text = document.createTextNode("탈퇴");
        btn.appendChild(text);
        btn.classList.add('drop-btn');
        // button.innerText('탈퇴');
        cell.appendChild(btn);
        cell.classList.add('transparent-border');
    });


}