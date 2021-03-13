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
        cell.innerHTML = problem.name;
        cell = row.insertCell();
        cell.innerHTML = problem.description;
        cell = row.insertCell();
        cell.innerHTML = problem.description;
        cell = row.insertCell();
        cell.innerHTML = problem.url;
        cell = row.insertCell();
        //파일 넣기
        cell = row.insertCell();
        const btn = document.createElement("button");
        const text = document.createTextNode("삭제");
        btn.appendChild(text);
        btn.classList.add('drop-btn');
        cell.appendChild(btn);
        cell.classList.add('transparent-border');
    });


}