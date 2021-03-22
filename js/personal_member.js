let managerMap = new Map()

call_get_member_list();

function call_get_member_list(){

    get_member_list(null,null,"patients");
    get_member_list(null,null,"family");
    get_member_list(null,null,"managers");
    get_member_list(null,null,"employees");
    
}

function get_member_list(filter, value, member_type) {
    let data = { "centerId": 1 };
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

        
        console.log("---");
        
        console.log(member[filter]);

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
                
            
            console.log((filter == "type") && (value == "회원"));
            console.log(filter=="type");
            console.log(value=="회원");
            console.log(member[filter]);


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

            // city
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.city;
            input.classList.add('brief_description');
            input.classList.add("selector"+member.id);
            cell.appendChild(input);
            
            // street
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = member.street;
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
    // console.log(objects[6].value);

    if(objects[5].value ==""){
        var data = {
            "city": objects[0].value,
            "street": objects[1].value,
            "zipcode": objects[2].value,
            "email": objects[3].value,
            "phone": objects[4].value,
        };      
    }else{
        var data = {
            "city": objects[0].value,
            "street": objects[1].value,
            "zipcode": objects[2].value,
            "email": objects[3].value,
            "phone": objects[4].value,
            "managerId": managerMap.get(objects[5].value),
            "grade": objects[6].value
        };    
    }

    
    // console.log(managerMap);
    
    $.ajax({
        type: 'PUT',
        url: 'http://13.209.38.201:8080/members/patients/'+member_id,
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

