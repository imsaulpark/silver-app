/*
let data = { "categoryId": 8 };
$.ajax({
    type: 'GET',
    url: 'http://13.209.38.201:8080/learnings',
    data: data,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
}).done(function (r) {
    if (r.status == "OK") {
        //make_member_table(r.data);
        console.log(r.data);
        alert('통신 성공');
    } else {
        // alert('통신 실패');
    }
}).fail(function (r) {
    // alert('서버 오류');
});
*/

// problem category button clicked
let category_btn = new Array();
for(let i=1; i<=8; i++){
    category_btn[i] = document.querySelector('.category'+i+'__btn');
    category_btn[i].addEventListener('click', (event) => {
        get_learning_list(i);
    });
}

//러닝 목록 받아오기
function get_learning_list(categoryId) {
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
        input.value = "간단한 설명을 입력하세요";
        input.classList.add('brief_description');
        input.classList.add("selector"+problem.id);
        cell.appendChild(input);

        cell = row.insertCell();
        cell.classList.add('long_description_cell');
        let textarea = document.createElement('textarea');
        textarea.value = "자세한 설명을 입력하세요";
        textarea.classList.add('long_description');
        textarea.classList.add("selector"+problem.id);
        cell.appendChild(textarea);


        cell = row.insertCell();
        cell.classList.add('brief_description_cell');
        input = document.createElement('input');
        input.type = 'text';
        input.value = "유튜브 링크를 입력하세요";
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
        cell.innerHTML += " <button onclick='edit("+problem.id+", "+problem.categoryId+")' class='drop-btn' />";
        text = document.createTextNode("삭제");
        cell.children[0].appendChild(text);
        cell.classList.add('transparent-border');

        cell = row.insertCell();
        cell.innerHTML += " <button onclick='edit("+problem.id+", "+problem.categoryId+")' class='drop-btn' />";
        text = document.createTextNode("삭제");
        cell.children[0].appendChild(text);
        cell.classList.add('transparent-border');
    });
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
    
            // alert('센터 러닝 스케줄 통신 성공');
        } else {
            alert('센터 러닝 스케줄 통신 실패');
        }
    }).fail(function (r) {
        console.log(r);
        alert('센터 러닝 스케줄 서버 오류');
    });
}

/* 
let data = {
    "name": "-",
    "briefDescription": "brief",
    "fullDescription": "full",
    "url": "url",
    "categoryId": 7
};


$.ajax({
    type: 'PUT',
    url: 'http://13.209.38.201:8080/learnings/10',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
}).done(function (r) {
    if (r.status == "OK") {
        console.log(r.data);

        // alert('센터 러닝 스케줄 통신 성공');
    } else {
        alert('센터 러닝 스케줄 통신 실패');
    }
}).fail(function (r) {
    console.log(r);
    alert('센터 러닝 스케줄 서버 오류');
});

*/