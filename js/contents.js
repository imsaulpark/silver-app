

let category_id = 0;
let categories = new Array(8);
let categories_btn = new Array(8);
let child_category = new Map();
let parent_category = new Array();
let cookie = getCookie("data");


if(cookie==null){
    location.href = "login.html";
}else if (cookie.memberType != "A"){
    history.back();
}


parent_category_inquiry()
    .then(child_category_inquiry)


    function parent_category_inquiry(){
    
        return new Promise((resolve, reject) => {
    
            $.ajax({
                type: 'GET',
                url: 'http://13.209.38.201:8080/learning-categories/parents',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).done(function (r) {
                if (r.status == "OK") {
                    resolve(r.data);
                } else {
                    reject(r);
                    // alert('통신 실패');
                }
            }).fail(function (r) {
                reject(r);
                console.log(r);
                // alert('서버 오류');
            });
        })
    }
    
    function child_category_inquiry(parent_categories){
    
    
        return new Promise((resolve, reject) => {
    
            parent_categories.forEach(parent_element => {
                if(parent_element.id != 0)
                    {
                        parent_category.push(
                            {
                                "id": parent_element.id,
                                "name": parent_element.name
                            }
                        );
    
                        $.ajax({
                            type: 'GET',
                            url: 'http://13.209.38.201:8080/learning-categories/children?parentId='+parent_element.id,
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json'
                        }).done(function (r) {
                            if (r.status == "OK") {
                                console.log(r.data);
 
                                r.data.forEach(child_element => {
                                    child_category.set(child_element.id, child_element.name);
                                })
                                make_cateogry_table(parent_element,r.data);
    
                            } else {
                                // alert('통신 실패');
                            }
                        }).fail(function (r) {
                            // alert('서버 오류');
                        });
                    }
            })
    
        });
    }
    

function make_cateogry_table(parent, children){
    console.log(children);
    let categoryTable = document.querySelector('.problem-category__table');
    let tag= false;

    children.forEach(child => {

        let row = document.createElement('tr');
        let childrenHtml = "";

        if(tag == false){
            // 제공 영역
            childrenHtml += "<td rowspan = "+children.length+"> "+parent.name+" </td>";
            // row.appendChild(childrenHtml);

            tag = true;
        }

        // 영역 분류
        childrenHtml += "<td> "+child.name+" </td>";
    
        // 문제 선택 버튼
        childrenHtml += "<td> <button onclick='get_learning_list("+child.id+")' class='category"+child.id+"__btn problem-selection-btn'>문제 선택</button></td>";

        row.innerHTML = childrenHtml;
        categoryTable.appendChild(row);
    });

    console.log("!!!");
    console.log(child_category.keys().next().value);
    // 처음 화면 뜰 때 첫 번째 카테고리를 테이블에 표시해줌
    get_learning_list(child_category.keys().next().value);
}

//러닝 목록 받아오기
function get_learning_list(categoryId) {
    
    console.log(categoryId);
    category_id = categoryId;
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/learnings?categoryId='+categoryId,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            make_problem_table(r.data, categoryId);
            // alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        console.log(r);
        // alert('서버 오류');
    });
}

function make_problem_table(problem_list, categoryId) {    
    
    let category_name = document.querySelector(".learning-problem");
    category_name.innerHTML =child_category.get(categoryId) + " 문제 리스트";


    const problem_table = document.querySelector('.problem-table');
    while (problem_table.rows.length > 1)
        problem_table.deleteRow(1);
    problem_list.forEach(problem => {
        make_table_row(problem, problem_table);
    });
}

function make_table_row(problem, problem_table){

    const row = problem_table.insertRow();
    let cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    let input = document.createElement('input');
    input.type = 'text';
    input.value = problem.name;
    input.classList.add('brief_description');
    input.classList.add("selector"+problem.id);
    cell.appendChild(input);

    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.value = problem.briefDescription;
    input.classList.add('brief_description');
    input.classList.add("selector"+problem.id);
    cell.appendChild(input);

    cell = row.insertCell();
    cell.classList.add('long_description_cell');
    let textarea = document.createElement('textarea');
    textarea.value = problem.fullDescription;
    textarea.classList.add('long_description');
    textarea.classList.add("selector"+problem.id);
    cell.appendChild(textarea);


    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.value = problem.url;
    input.classList.add('brief_description');
    input.classList.add("selector"+problem.id);
    cell.appendChild(input);



    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'file';
    input.accept='*';
    input.classList.add('brief_description');
    input.classList.add("selector"+problem.id);
    cell.appendChild(input);


    cell = row.insertCell();
    cell.innerHTML += " <button onclick='edit("+problem.id+", "+problem.categoryId+")' class='edit-btn' />";
    text = document.createTextNode("변경");
    cell.children[0].appendChild(text);
    cell.classList.add('transparent-border');

    cell = row.insertCell();
    cell.innerHTML += " <button onclick='remove("+problem.id+")' class='drop-btn' />";
    text = document.createTextNode("삭제");
    cell.children[0].appendChild(text);
    cell.classList.add('transparent-border');
}

function edit(problem_id, category_id){
    let objects = document.querySelectorAll(".selector"+problem_id);
    console.log(objects[2].value);

    let data = {
        "name": objects[0].value,
        "briefDescription": objects[1].value,
        "fullDescription": objects[2].value,
        "url": objects[3].value,
        "categoryId": category_id
    };
    
    console.log(data);
    
    $.ajax({
        type: 'PUT',
        url: 'http://13.209.38.201:8080/learnings/'+problem_id,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
            alert('변경되었습니다.');
        } else {
            alert('센터 러닝 스케줄 통신 실패');
        }
    }).fail(function (r) {
        alert("입력을 확인하세요.");
    });
}

function remove(problem_id){

    $.ajax({
        type: 'DELETE',
        url: 'http://13.209.38.201:8080/learnings/'+problem_id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
    
            alert('삭제되었습니다.');
            get_learning_list(category_id);
        } else {
            alert('센터 러닝 스케줄 통신 실패');
        }
    }).fail(function (r) {
        console.log(r);
        alert('센터 러닝 스케줄 서버 오류');
    });
}

function add(){

    const problem_table = document.querySelector('.problem-table');
    
    const row = problem_table.insertRow();
    

    // 이름
    let cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(problem_table.rows.length-1));
    cell.appendChild(input);

    // address
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(problem_table.rows.length-1));
    cell.appendChild(input);
   
   
    // zipcode
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(problem_table.rows.length-1));
    cell.appendChild(input);
   

    // phone
    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('brief_description');
    input.classList.add("created"+(problem_table.rows.length-1));
    cell.appendChild(input);
   



    cell = row.insertCell();
    cell.classList.add('brief_description_cell');
    input = document.createElement('input');
    input.type = 'file';
    input.accept='*';
    input.classList.add('brief_description');
    input.classList.add("created"+(problem_table.rows.length-1));
    cell.appendChild(input);

    cell = row.insertCell();
    cell.innerHTML += " <button onclick='save("+(problem_table.rows.length-1)+")' class='save-btn' />";
    text = document.createTextNode("저장");
    cell.children[0].appendChild(text);
    cell.classList.add('transparent-border');

    cell = row.insertCell();
}


function save(row_num){
    let objects = document.querySelectorAll(".created"+row_num);

    let data = {
        "name": objects[0].value,
        "briefDescription": objects[1].value,
        "fullDescription": objects[2].value,
        "url": objects[3].value,
        "categoryId": category_id
    };
   
    $.ajax({
        type: 'POST',
        url: 'http://13.209.38.201:8080/learnings/new',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "CREATED") {
            // console.log(r.data);
            alert('저장되었습니다.');
            get_learning_list(category_id);
        } else {
            console.log(r);
            alert('변경 중 오류');
        }
    }).fail(function (r) {
        alert(Object.entries(r.responseJSON.data)[0][1]);
    });
}
