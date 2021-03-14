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
        cell.appendChild(input);

        cell = row.insertCell();
        cell.classList.add('brief_description_cell');
        input = document.createElement('input');
        input.type = 'text';
        input.value = "간단한 설명을 입력하세요";
        input.classList.add('brief_description');
        cell.appendChild(input);

        cell = row.insertCell();
        cell.classList.add('long_description_cell');
        let textarea = document.createElement('textarea');
        textarea.value = "자세한 설명을 입력하세요";
        textarea.classList.add('long_description');
        cell.appendChild(textarea);


        cell = row.insertCell();
        cell.classList.add('brief_description_cell');
        input = document.createElement('input');
        input.type = 'text';
        input.value = "유튜브 링크를 입력하세요";
        input.classList.add('brief_description');
        cell.appendChild(input);



        cell = row.insertCell();
        cell.classList.add('brief_description_cell');
        input = document.createElement('input');
        input.type = 'file';
        input.accept='*';
        input.classList.add('brief_description');
        cell.appendChild(input);


        cell = row.insertCell();
        let btn = document.createElement("button");
        let text = document.createTextNode("변경");
        btn.appendChild(text);
        btn.classList.add('drop-btn');
        cell.appendChild(btn);
        cell.classList.add('transparent-border');

        cell = row.insertCell();
        btn = document.createElement("button");
        text = document.createTextNode("삭제");
        btn.appendChild(text);
        btn.classList.add('drop-btn');
        cell.appendChild(btn);
        cell.classList.add('transparent-border');
    });


}