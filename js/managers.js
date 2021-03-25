let managerMap = new Map()


get_center_list();



function get_center_list() {
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/centers/all',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data)
            r.data.forEach((center)=>{
                get_member_list(null, null, "managers", center.id);
            })
            // alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        console.log(r);
        // alert('서버 오류');
    });
};

function get_member_list(filter, value, member_type, centerId) {
    
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/members/'+member_type +'?centerId='+centerId,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            member_list = r.data;
            console.log(r.data);
            make_member_table(r.data, filter, value, member_type);
            // alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });
};

function search(){
    const select_box = document.querySelector('.search-content__filter');
    const input_box =  document.querySelector('.search-content__text');
    remove_table();
    get_member_list(select_box.value, input_box.value, "managers");
}

function remove_table(){
    const member_table = document.querySelector('.person-table');

    while (member_table.rows.length > 1)
        member_table.deleteRow(1);
}

function make_member_table(member_list,filter, value, member_type) {
    const member_table = document.querySelector('.person-table');
    let tag= false;
    if(value == undefined)
        tag = true;
    member_list.forEach(member => {


        // manager의 이름과 ID를 매칭시키기 위한 맵 만들어 놓기
        if(member_type == "managers" || member_type == "employees"){
            managerMap.set(member.name, member.id);
        }

        
        if(filter == "type" && member[filter] == "E")
            member[filter] = "근로자";
        else if(filter == "type" && member[filter] == "M")
            member[filter] = "관리자";
        else if(filter == "type" && member[filter] == "F")
            member[filter] = "보호자";
        else if(filter == "type" && member[filter] == "P")
            member[filter] = "회원";
        else if(filter == "status" && member[filter] == "YET")
            member[filter] = "미가입";
        else if(filter == "status" && member[filter] == "JOINED")
            member[filter] = "가입";
        else if(filter == "status" && member[filter] == "WAITING")
            member[filter] = "가입대기중";
                
        // search를 사용했을 경우에는 search에 걸리지 않을 경우는 row를 만들지 않도록
        if(tag == true || (tag == false && member[filter] == value ))
        {
            const row = member_table.insertRow();

            // 번호
            let cell = row.insertCell();
            cell.innerHTML = member_table.rows.length-1;

            // 타입
            cell = row.insertCell();
            if(member_type == "managers")
                cell.innerHTML = "관리자";
            else if(member_type == "employees")
                cell.innerHTML = "근로자";
            else if(member_type == "family")
                cell.innerHTML = "보호자";
            else
                cell.innerHTML = "회원";

            // 아이디
            cell = row.insertCell();
            //cell.innerHTML = member.type;

            // 이름
            cell = row.insertCell();
            cell.innerHTML = member.name;

            // 성별
            cell = row.insertCell();
            cell.innerHTML = member.sex;

            // address
            cell = row.insertCell();
            cell.innerHTML = member.address;
            
            // zipcode
            cell = row.insertCell();
            cell.innerHTML = member.zipcode;

            // rrn
            cell = row.insertCell();
            cell.innerHTML = member.rrn;

            // email
            cell = row.insertCell();
            cell.innerHTML = member.email;

            // phone
            cell = row.insertCell();
            cell.innerHTML = member.phone;

            // 가입상태
            cell = row.insertCell();
            if(member.status == "JOINED" || member[filter] == "가입")
                cell.innerHTML = "가입";
            else if(member.status == "YET" || member[filter] == "미가입")
                cell.innerHTML = "미가입";
            else if(member.status == "WAITING" || member[filter] == "가입대기중")
                cell.innerHTML = "가입대기중";

            if(member.status == "JOINED" || member[filter] == "가입" || member.status == "YET" || member[filter] == "미가입")
            {
                //탈퇴 버튼
                cell = row.insertCell();
                cell.innerHTML += " <button onclick='remove("+member.id+")' class='drop-btn' />";
                text = document.createTextNode("삭제");
                cell.children[0].appendChild(text);
                cell.classList.add('transparent-border');                
            }else if(member.status == "WAITING" || member[filter] == "가입대기중"){
                //가입 승인 버튼
                cell = row.insertCell();
                cell.innerHTML += " <button onclick='join_requset("+member.id+", \"approve\")' class='edit-btn' />";
                text = document.createTextNode("승인");
                cell.children[0].appendChild(text);
                cell.classList.add('transparent-border');

                //가입 거절 버튼
                cell = row.insertCell();
                cell.innerHTML += " <button onclick='join_requset("+member.id+", \"decline\")' class='drop-btn' />";
                text = document.createTextNode("거절");
                cell.children[0].appendChild(text);
                cell.classList.add('transparent-border');
            }


        }
    });


}

function remove(member_id){

    $.ajax({
        type: 'PUT',
        url: 'http://13.209.38.201:8080/members/'+member_id,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
            alert('삭제되었습니다.');
        } else {
            alert('삭제 중 오류');
        }
    }).fail(function (r) {
        console.log(r);
        alert('삭제 서버 오류');
    });
}

function join_requset(member_id, join_request_string){

    $.ajax({
        type: 'PUT',
        url: 'http://13.209.38.201:8080/members/managers/approval/'+member_id+"?type="+join_request_string,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
            if(join_request_string == "approve")
                alert('승인되었습니다.');
            else
                alert("거절되었습니다.");
            location.reload();
        } else {
            alert('승인 중 오류');
        }
    }).fail(function (r) {
        console.log(r);
        alert('승인 서버 오류');
    });
}
