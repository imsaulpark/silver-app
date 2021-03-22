let managerMap = new Map()

get_member_list();

function get_member_list(filter, value) {
    let data = { "centerId": 1 };
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/members/employees',
        data: data,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            member_list = r.data;
            console.log(r.data);
            make_member_table(r.data, filter, value);
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
    get_member_list(select_box.value, input_box.value);
}

function remove_table(){
    const member_table = document.querySelector('.person-table');

    while (member_table.rows.length > 1)
        member_table.deleteRow(1);
}

function make_member_table(member_list,filter, value) {
    const member_table = document.querySelector('.person-table');
    let count = 1;
    let tag= false;
    if(value == undefined)
        tag = true;
    console.log(tag);
    member_list.forEach(member => {


        // manager의 이름과 ID를 매칭시키기 위한 맵 만들어 놓기
        if(member.type == "M"){
            managerMap.set(member.managerName, member.managerId);
        }

        // search를 사용했을 경우에는 search에 걸리지 않을 경우는 row를 만들지 않도록
        if(tag == true || (tag == false && member[filter] == value ))
        {
            const row = member_table.insertRow();

            // 번호
            let cell = row.insertCell();
            cell.innerHTML = count++;

            // 타입
            cell = row.insertCell();
            //cell.innerHTML = member.type;

            // 아이디
            cell = row.insertCell();
            //cell.innerHTML = member.type;

            // 이름
            cell = row.insertCell();
            cell.innerHTML = member.name;

            // 성별
            cell = row.insertCell();
            cell.innerHTML = member.sex;

            // city
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.address.city;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);
            
            // street
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.address.street;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            // zipcode
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.address.zipcode;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            // rrn
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.rrn;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            // email
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.email;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            // phone
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.phone;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            // manager
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.managerName;   
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            // grade
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.grade;   
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            // 승인
            cell = row.insertCell();
            //cell.innerHTML = member.type;


            //변경 버튼
            cell = row.insertCell();
            cell.innerHTML += " <button onclick='edit("+member.id+")' class='edit-btn' />";
            text = document.createTextNode("변경");
            cell.children[0].appendChild(text);
            cell.classList.add('transparent-border');

            //탈퇴 버튼
            cell = row.insertCell();
            cell.innerHTML += " <button onclick='remove("+member.id+")' class='drop-btn' />";
            text = document.createTextNode("삭제");
            cell.children[0].appendChild(text);
            cell.classList.add('transparent-border');
        }
    });


}


function edit(member_id){
    let objects = document.querySelectorAll(".selector"+member_id);
    console.log(objects[2].value);

    let data = {
        "city": objects[0].value,
        "street": objects[1].value,
        "zipcode": objects[2].value,
        //"email": objects[3].value,
        "phone": objects[4].value,
        //"managerId": managerMap.get(objects[5].value),
        //"grade": objects[6].value
    };
    
    console.log(data);
    
    $.ajax({
        type: 'PUT',
        url: 'http://13.209.38.201:8080/members/'+member_id,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
            alert('변경되었습니다.');
        } else {
            alert('변경 중 오류');
        }
    }).fail(function (r) {
        console.log(r);
        alert('변경 서버 오류');
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

