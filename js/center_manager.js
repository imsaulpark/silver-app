let managerMap = new Map()

get_center_list();

function get_center_list(filter, value) {
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/centers/all',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
            make_center_table(r.data, filter, value);
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
    get_center_list(select_box.value, input_box.value);
}

function remove_table(){
    const center_table = document.querySelector('.person-table');

    while (center_table.rows.length > 1)
        center_table.deleteRow(1);
}

function make_center_table(center_list, filter, value) {
    const center_table = document.querySelector('.person-table');
    
    let tag= false;
    if(value == undefined)
        tag = true;
    center_list.forEach(center => {

    // search를 사용했을 경우에는 search에 걸리지 않을 경우는 row를 만들지 않도록
        if(tag == true || (tag == false && center[filter] == value ))
        {
            const row = center_table.insertRow();

            // 번호
            let cell = row.insertCell();
            cell.innerHTML = center_table.rows.length-1;
            cell.classList.add("type"+center.id);
            
            // 이름
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = center.name;
            input.classList.add('brief_description');
            input.classList.add("selector"+center.id);
            cell.appendChild(input);

            // address
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = center.address;
            input.classList.add('brief_description');
            input.classList.add("selector"+center.id);
            cell.appendChild(input);
           
           
            // zipcode
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = center.zipcode;
            input.classList.add('brief_description');
            input.classList.add("selector"+center.id);
            cell.appendChild(input);
           

            // phone
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = center.phone;
            input.classList.add('brief_description');
            input.classList.add("selector"+center.id);
            cell.appendChild(input);
           


            // description
            cell = row.insertCell();
            cell.classList.add('brief_description_cell');
            input = document.createElement('input');
            input.type = 'text';
            input.value = center.description;
            input.classList.add('brief_description');
            input.classList.add("selector"+center.id);
            cell.appendChild(input);
           

            //변경 버튼
            cell = row.insertCell();
            cell.innerHTML += " <button onclick='edit("+center.id+")' class='edit-btn' />";
            text = document.createTextNode("변경");
            cell.children[0].appendChild(text);
            cell.classList.add('transparent-border');

            //탈퇴 버튼
            cell = row.insertCell();
            cell.innerHTML += " <button onclick='remove("+center.id+")' class='drop-btn' />";
            text = document.createTextNode("삭제");
            cell.children[0].appendChild(text);
            cell.classList.add('transparent-border');
        }
    });


}


function edit(center_id){
    let objects = document.querySelectorAll(".selector"+center_id);
        var data = {
            "name": objects[0].value,
            "address": objects[1].value,
            "zipcode": objects[2].value,
            "phone": objects[3].value,
            "description": objects[4].value
        };    
    

    
    // console.log(managerMap);
    
    $.ajax({
        type: 'PUT',
        url: 'http://13.209.38.201:8080/centers/'+center_id,
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


function remove(center_id){

    $.ajax({
        type: 'PUT',
        url: 'http://13.209.38.201:8080/centers/'+center_id,
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
    const center_table = document.querySelector('.person-table');

    const row = center_table.insertRow();

    // 번호
    let cell = row.insertCell();
    cell.innerHTML = center_table.rows.length-1;
    
    // 이름
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(center_table.rows.length-1));
    cell.appendChild(input);

    // address
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(center_table.rows.length-1));
    cell.appendChild(input);
   
   
    // zipcode
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(center_table.rows.length-1));
    cell.appendChild(input);
   

    // phone
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(center_table.rows.length-1));
    cell.appendChild(input);
   


    // description
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(center_table.rows.length-1));
    cell.appendChild(input);

    //저장 버튼
    cell = row.insertCell();
    cell.innerHTML += " <button onclick='save("+(center_table.rows.length-1)+")' class='create-btn' />";
    text = document.createTextNode("저장");
    cell.children[0].appendChild(text);
    cell.classList.add('transparent-border');
}

function save(row_num){
    let objects = document.querySelectorAll(".created"+row_num);
    // console.log(objects[6].value);

    var data = {
        "name": objects[0].value,
        "address": objects[1].value,
        "zipcode": objects[2].value,
        "phone": objects[3].value,
        "description": objects[4].value
    };    
   
    $.ajax({
        type: 'POST',
        url: 'http://13.209.38.201:8080/centers/new',
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
