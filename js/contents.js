

let category_id = 0;
let categories = new Array(8);
let categories_btn = new Array(8);
let child_category = new Map();

console.log(1);
parent_category_inquiry();
console.log(3);
initialize_categories();
console.log(5);

function temp(){
    let category_name = document.querySelector(".learning-problem");
    category_name.innerHTML = "시지각 영역 문제 리스트";
}


//러닝 목록 받아오기
function get_learning_list(categoryId) {
    
console.log(child_category);
    category_id = categoryId;
    let data = { "categoryId": categoryId };
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/learnings',
        data: data,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            make_problem_table(r.data, categoryId);
            console.log(r.data);
            // alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });
}

function make_problem_table(problem_list, categoryId) {    
    
    let category_name = document.querySelector(".learning-problem");
    category_name.innerHTML =child_category.get(categoryId) + " 문제 리스트";

    console.log(problem_list);

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
        console.log(r);
        alert('센터 러닝 스케줄 서버 오류');
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
    cell.innerHTML += " <button onclick='save("+(problem_table.rows.length-1)+")' class='create-btn' />";
    text = document.createTextNode("저장");
    cell.children[0].appendChild(text);
    cell.classList.add('transparent-border');
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
        console.log(r);
        alert('입력 형식이 올바르지 않습니다.');
    });
}



// $.ajax({
//     type: 'GET',
//     url: 'http://13.209.38.201:8080//learning-categories/parentId=5',
//     contentType: 'application/json; charset=utf-8',
//     dataType: 'json'
// }).done(function (r) {
//     if (r.status == "OK") {
//         console.log(r.data);
//         // alert('센터 러닝 스케줄 통신 성공');
//     } else {
//         alert('센터 러닝 스케줄 통신 실패');
//     }
// }).fail(function (r) {
//     console.log(r);
//     alert('센터 러닝 스케줄 서버 오류');
// });


function parent_category_inquiry(){
    console.log(2);
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/learning-categories/parents',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
            r.data.forEach(parent_category => {
                if(parent_category.id != 0)
                    child_category_inquiry(parent_category.id);
            })
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });
}

function child_category_inquiry(parent_category){
    
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/learning-categories/children?parentId='+parent_category,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
            r.data.forEach(element => {
                child_category.set(element.id, element.name);
            })
            
console.log(child_category);
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });
}


function initialize_categories(){
    console.log(4);
    console.log(child_category);
    for(let i=0; i<8; i++){
        categories[i] = new Array();
    }
    for(let i=0; i<8; i++){
    
            categories_btn[i] = document.querySelector('.category'+(i+6)+'__btn');
            categories_btn[i].addEventListener('click', (event) =>{    
                get_learning_list(i+6);
            })
    }    
}