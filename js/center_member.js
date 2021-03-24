let managerMap = new Map()

call_get_member_list();

function call_get_member_list(){

    get_member_list(null,null,"patients");
    get_member_list(null,null,"family");
    get_member_list(null,null,"managers");
    get_member_list(null,null,"employees");
    
}

function get_member_list(filter, value, member_type) {
    let data = { "centerId": getCookie("data").centerId };
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/members/'+member_type,
        data: data,
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
        console.log(r);
        // alert('서버 오류');
    });
};

function search(){
    const select_box = document.querySelector('.search-content__filter');
    const input_box =  document.querySelector('.search-content__text');
    remove_table();
    get_member_list(select_box.value, input_box.value, "patients");
    get_member_list(select_box.value, input_box.value, "family");
    get_member_list(select_box.value, input_box.value, "managers");
    get_member_list(select_box.value, input_box.value, "employees");
}

function remove_table(){
    const member_table = document.querySelector('.person-table');

    while (member_table.rows.length > 1)
        member_table.deleteRow(1);
}

function make_member_table(member_list,filter, value, member_type) {
    const member_table = document.querySelector('.person-table');
    let count = 1;
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
            cell.classList.add("type"+member.id);
            
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
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.address;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);
           
            // zipcode
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.zipcode;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            // rrn
            cell = row.insertCell();
            cell.innerHTML = member.rrn;

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

            
            // 담당자명
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            if(member.managerName != undefined)
                input.value = member.managerName;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            
            // 등급
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            if(member.grade != undefined)
                input.value = member.grade;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);

            
            // 가입상태
            cell = row.insertCell();
            if(member.status == "JOINED" || member[filter] == "가입")
                cell.innerHTML = "가입";
            else if(member.status == "YET" || member[filter] == "미가입")
                cell.innerHTML = "미가입";
            else if(member.status == "WAITING" || member[filter] == "가입대기중")
                cell.innerHTML = "가입대기중";


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
    let type_cell = document.querySelector(".type"+member_id);
    let type = "";
    if(type_cell.innerHTML == "근로자")
        type = "employees";
    else if(type_cell.innerHTML == "관리자")
        type = "managers";
    else if(type_cell.innerHTML == "회원")
        type = "patients";
    else if(type_cell.innerHTML == "보호자")
        type = "family";

    
    // console.log(objects[6].value);

    console.log()

    if(objects[5].value ==""){
        var data = {
            "address": objects[0].value,
            "zipcode": objects[1].value,
            "email": objects[2].value,
            "phone": objects[3].value,
        };      
    }else{
        var data = {
            "address": objects[0].value,
            "zipcode": objects[1].value,
            "email": objects[2].value,
            "phone": objects[3].value,
            "managerId": managerMap.get(objects[4].value),
            "grade": objects[5].value
        };    
    }

    
    // console.log(managerMap);
    
    $.ajax({
        type: 'PUT',
        url: 'http://13.209.38.201:8080/members/'+type+'/'+member_id,
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
        alert('입력 형식이 올바르지 않습니다.');
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

function add() {
    const member_table = document.querySelector('.person-table');
    const row = member_table.insertRow();

    // 번호
    let cell = row.insertCell();
    cell.innerHTML = member_table.rows.length-1;

    // 타입
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);
    
    // 아이디
    cell = row.insertCell();

    // 이름
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);

    // 성별
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);

    // address
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);
    
    // zipcode
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);

    // rrn
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);

    // email
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);

    // phone
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);

    
    // 담당자명
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);

    
    // 등급
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(member_table.rows.length-1));
    cell.appendChild(input);

    
    // 가입상태
    cell = row.insertCell();
    cell.innerHTML = "미가입";    

    //저장 버튼
    cell = row.insertCell();
    cell.innerHTML += " <button onclick='save("+(member_table.rows.length-1)+")' class='create-btn' />";
    text = document.createTextNode("저장");
    cell.children[0].appendChild(text);
    cell.classList.add('transparent-border');
}

function save(row_num){
    let objects = document.querySelectorAll(".created"+row_num);
    // console.log(objects[6].value);
console.log(objects);
    let type = "";
    if(objects[0].value == "관리자")
        type = "M";
    else if(objects[0].value == "근로자")
        type = "E";
    else if(objects[0].value == "보호자")
        type = "F";
    else if(objects[0].value == "회원")
        type = "P";
    
    let data = {
        "type": type,
        "name": objects[1].value,
        "sex":  objects[2].value,
        "address": objects[3].value,
        "zipcode": objects[4].value,
        "rrn": objects[5].value,
        "email": objects[6].value,
        "phone": objects[7].value,
        "managerId": managerMap.get(objects[8].value),
        "grade": objects[9].value,
        "centerId": getCookie("data").centerId
    };    
   
    $.ajax({
        type: 'POST',
        url: 'http://13.209.38.201:8080/members/new',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "CREATED") {
            // console.log(r.data);
            alert('저장되었습니다.');
            location.reload();
        } else {
            console.log(r);
            alert('변경 중 오류');
        }
    }).fail(function (r) {
        console.log(r);
        alert('입력 형식이 올바르지 않습니다.');
    });
}
