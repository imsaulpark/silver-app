

let category_id = 0;

// problem category button clicked
let categories_btn = new Array();
for(let i=0; i<8; i++){
    categories_btn[i] = document.querySelector('.category'+(i+6)+'__btn');
    categories_btn[i].addEventListener('click', (event) => {
        get_learning_list(i+6);
    });
}

//러닝 목록 받아오기
function get_learning_list(categoryId) {
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
            make_problem_table(r.data);
            console.log(r.data);
            // alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });
}

function make_problem_table(problem_list) {
    const problem_table = document.querySelector('.problem-table');
    while (problem_table.rows.length > 1)
        problem_table.deleteRow(1);
    let count = 1;
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

function create_learning(){

    let data = {
        "name": "예시 문제 이름",
        "briefDescription": "간단한 설명",
        "fullDescription": "자세한 설명",
        "url": "유튜브 링크",
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
            console.log(r.data);
            get_learning_list(category_id);
            // alert('센터 러닝 스케줄 통신 성공');
        } else {
            alert('센터 러닝 스케줄 통신 실패');
        }
    }).fail(function (r) {
        console.log(r);
        alert('센터 러닝 스케줄 서버 오류');
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