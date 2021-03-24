
let learning_list = new Array();
var today = new Date();//오늘 날짜//내 컴퓨터 로컬을 기준으로 today에 Date 객체를 넣어줌
var date = new Date();//today의 Date를 세어주는 역할
let categories = new Array(8);
let categories_btn = new Array(8);
let child_category = new Map();

console.log(getCookie("data"));

function initialize_categories(){
    for(let i=0; i<8; i++){
        categories[i] = new Array();
    }
    
    for(let i=0; i<8; i++){
    
            categories_btn[i] = document.querySelector('.category'+(i+6)+'__btn');
            categories_btn[i].addEventListener('click', (event) =>{    
            make_problem_table(categories[i], i+6);
        })
    }    
}

initialize_categories();
parent_category_inquiry();
get_all_learning_list();
get_member_list();  //대상자 목록 받아오기

let visual_problems = ['같은그림찾기(하)', '같은도형찾기', '반쪽그림따라그리기', '특정글자찾기', '틀린그림찾기', '특정인물찾기', '같은글미잇기', '반쪽그림잇기', '이름찾아적기', '같은그림찾기(중)'];
let concentration_problems = ['미로찾기', '사다리타기', '색칠하기', '기념일 색칠하기', '같은 숫자 연결하기', '화투 색칠하기', '글자색깔맞추기', '선따라 그리기', '따라그리기(중)', '따라그리기(하)'];
let thinking_problems = ['물건개수 맞추기', '4x4스도쿠', '개수맞추기', '범주찾기', '주제와다른것찾기', '시장물건 계산하기', '주사위 계산하기', '열매개수세기', '숫자 나열하기'];
let language_problems = ['빈칸채우기', '초성맞추기', '동물속담맞추기', '끝말잇기', '단어와 그림맞추기', '단어만들기', '명언따라쓰고읽기', '문장따라말하기'];
let remembrance_problems = ['기념일 회상하기', '요리재료 맞추기', '식재료 구분하기', '옛물건 회상하기', '정보 기억하기', '음식 회상하기', '사물회상하기', '계절 회상하기', '옛놀이 회상하기'];
let life_problems = ['시간 맞추기', '야외활동 함께하기', '실내활동 함께하기', '집안일 함께하기', '냉장고 식재료 찾기', '표정 맞추기', '실내운동 함께하기', '물건의 용도 알기'];

let category4 = new Array();
let category5 = new Array();
let category6 = new Array();
let category7 = new Array();
let category8 = new Array();

// let data = { "name": "-", "briefDescription":"", "fullDescription":"", "url": "", "categoryId": 0 };
// console.log(data);
// $.ajax({
//     type: 'POST ',
//     url: 'http://13.209.38.201:8080/learnings/new',
//     data: data,
//     contentType: 'application/json; charset=utf-8',
//     dataType: 'json'
// }).done(function (r) {
//     if (r.status == "OK") {
//         // console.log(r.data);
//         alert('등록 성공');
//     } else {
//         alert('통신 실패');
//     }
// }).fail(function (r) {
//     alert('서  버 오류');
// });

var member_list = new Array();
// 처음에 화면 들어오고 나서 데이터 받아오기
// 대상자 목록 받아오기
function get_member_list() {
    let data = { "centerId": getCookie("data").centerId };
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/members/patients',
        data: data,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            member_list = r.data;
            make_member_table(r.data);
            // console.log(r.data);
            // alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });

};

function selectAll(selectAll)  {
    const checkboxes 
         = document.getElementsByName('member');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    })
  }

function make_member_table(member_list) {
    const member_table = document.querySelector('.person-table');
    let count = 1;
    member_list.forEach(member => {
        const row = member_table.insertRow();
        let cell = row.insertCell();
        cell.innerHTML = count++;

        cell = row.insertCell();
        cell.innerHTML += " <input type='checkbox' onchange='get_learning_schedule(this, "+member.id+")' name='member' id="+member.id+" />";
        cell = row.insertCell();
        cell.innerHTML = member.name;
        cell = row.insertCell();
        cell.innerHTML = member.managerName;
        cell = row.insertCell();
        cell.innerHTML = member.grade;
    });
}


function get_all_learning_list() {
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/learnings/all',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            //console.log(r.data);
            set_learning_category(r.data);
            // console.log(r.data);
            // alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });
}

function set_learning_category(data) {

    // category4.push({ "id": 0, "name": '-' });
    // category5.push({ "id": 0, "name": '-' });
    // category6.push({ "id": 0, "name": '-' });
    // category7.push({ "id": 0, "name": '-' });
    // category8.push({ "id": 0, "name": '-' });
    console.log(data);
    data.forEach(learning => {
        learning_list.push({ "id": learning.id, "name": learning.name });

        switch (learning.categoryId) {
            case 6:
                categories[0].push({ "id": learning.id, "name": learning.name });
                break;
            case 7:
                categories[1].push({ "id": learning.id, "name": learning.name });
                break;
            case 8:
                categories[2].push({ "id": learning.id, "name": learning.name });
                break;
            case 9:
                categories[3].push({ "id": learning.id, "name": learning.name });
                break;
            case 10:
                categories[4].push({ "id": learning.id, "name": learning.name });
                break;
            case 11:
                categories[5].push({ "id": learning.id, "name": learning.name });
                break;
            case 12:
                categories[6].push({ "id": learning.id, "name": learning.name });
                break;
            case 13:
                categories[7].push({ "id": learning.id, "name": learning.name });
                break;
            default:
                break;
        }
    });

    make_problem_table(categories[0],6);
    
    let category_name = document.getElementById("dynamic-header");
    category_name.innerHTML ="시지각 영역" + " 문제 리스트";
    buildCalendar();
    //console.log(category4);

}

var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//이번 달의 첫째 날,
//new를 쓰는 이유 : new를 쓰면 이번달의 로컬 월을 정확하게 받아온다.     
//new를 쓰지 않았을때 이번달을 받아오려면 +1을 해줘야한다. 
//왜냐면 getMonth()는 0~11을 반환하기 때문
var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

// 센터 러닝 스케줄 받아오기
function get_learning_schedule(obj, memberId) {

    if(obj.checked == false)
        return;

    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let year = lastDate.getFullYear().toString();
    let month = (lastDate.getMonth() + 1).toString();
    if (lastDate.getMonth() + 1 < 10)
        month = "0" + month;
    let day = lastDate.getDate().toString();

    let data = {
        "memberId": memberId,
        "start": year + "-" + month + "-01",
        "end": year + "-" + month + "-" + day
    };


    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/member-learnings',
        data: data,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);

            set_learning_schedule(r.data,year,month,day);

            // alert('센터 러닝 스케줄 통신 성공');
        } else {
            alert('센터 러닝 스케줄 통신 실패');
        }
    }).fail(function (r) {
        console.log(r);
        alert('센터 러닝 스케줄 서버 오류');
    });

};

//센터 러닝 스케줄 적용하기
function set_learning_schedule(learning_schedule,year,month,day) {
    console.log(learning_schedule);
    for(let i=1; i<=day; i++){
        let temp_day = i;
        if(i<10)
            temp_day = "0" + temp_day;
        let temp_date = year + "-" + month + "-" + temp_day;

        const select_box = document.getElementsByClassName(temp_date);
        // console.log("% : "+learning_schedule[temp_date].learningIds);
        if(learning_schedule[temp_date]!=undefined){
            let learningIds = learning_schedule[temp_date].learningIds;
            select_box[0].value = learningIds[0];
            select_box[1].value = learningIds[1];
            select_box[2].value = learningIds[2];
            select_box[3].value = learningIds[3];
        }
    }
}

// when the schedul_update button is clicked, collect schedule data and post
const schedule_update = document.querySelector('.schedule-update');
schedule_update.addEventListener('click', (event) => {

    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let year = lastDate.getFullYear().toString();
    let month = (lastDate.getMonth() + 1).toString();
    if (lastDate.getMonth() + 1 < 10)
        month = "0" + month;
    let endDay = lastDate.getDate().toString();
    let memberIds = new Array();
    let learning_schedule = new Array();

    const checkboxes = document.getElementsByName('member');
    
    checkboxes.forEach((checkbox) => {
        if(checkbox.checked == true){
            memberIds.push(parseInt(checkbox.id));
        }
    })


    for (let i = 1; i <= endDay; i++) {
        let day = i;
        if (i < 10)
            day = "0" + day;
        let string_date = year + "-" + month + "-" + day;
        const select_box = document.getElementsByClassName(string_date);
        learning_schedule.push({ "date": string_date, "learningIds": [parseInt(select_box[0].value), parseInt(select_box[1].value), parseInt(select_box[2].value),  parseInt(select_box[3].value)] });
    }

    let body = { "memberIds": memberIds, "start":year+"-"+month+"-01", "end":year+"-"+month+"-"+endDay, "data": learning_schedule };
    console.log(body);

    post_learning_schedule(body);
});



// post learning_schedule
function post_learning_schedule(data) {

    $.ajax({
        type: 'POST',
        url: 'http://13.209.38.201:8080/member-learnings/new',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "CREATED") {
            
            alert('post_learning_schedule success');
        } else {
            console.log(r.status);
            alert('post_learning_schedule failed');
        }
    }).fail(function (r) {
        console.log(r);
        alert('post_learning_schedule server error');
    });
}


// put learning_schedule
function put_learning_schedule(data) {

    $.ajax({
        type: 'PUT',
        url: 'http://13.209.38.201:8080/learning-schedules/present',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            alert('러닝 스케줄 통신 성공');
        } else {
            alert('러닝 스케줄 통신 실패');
        }
    }).fail(function (r) {
        console.log(r);
        alert('러닝 스케줄 서버 오류');
    });
}


function prevCalendar() {//이전 달
    // 이전 달을 today에 값을 저장하고 달력에 today를 넣어줌
    //today.getFullYear() 현재 년도//today.getMonth() 월  //today.getDate() 일 
    //getMonth()는 현재 달을 받아 오므로 이전달을 출력하려면 -1을 해줘야함
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    buildCalendar(); //달력 cell 만들어 출력 

}

function nextCalendar() {//다음 달
    // 다음 달을 today에 값을 저장하고 달력에 today 넣어줌 
    //today.getFullYear() 현재 년도//today.getMonth() 월  //today.getDate() 일 
    //getMonth()는 현재 달을 받아 오므로 다음달을 출력하려면 +1을 해줘야함
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    buildCalendar();//달력 cell 만들어 출력

}
function buildCalendar() {//현재 달 달력 만들기
    var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    //이번 달의 첫째 날,
    //new를 쓰는 이유 : new를 쓰면 이번달의 로컬 월을 정확하게 받아온다.     
    //new를 쓰지 않았을때 이번달을 받아오려면 +1을 해줘야한다. 
    //왜냐면 getMonth()는 0~11을 반환하기 때문
    var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    //이번 달의 마지막 날
    //new를 써주면 정확한 월을 가져옴, getMonth()+1을 해주면 다음달로 넘어가는데
    //day를 1부터 시작하는게 아니라 0부터 시작하기 때문에 
    //대로 된 다음달 시작일(1일)은 못가져오고 1 전인 0, 즉 전달 마지막일 을 가져오게 된다
    var tbCalendar = document.getElementById("calendar");
    //날짜를 찍을 테이블 변수 만듬, 일 까지 다 찍힘
    var tbCalendarYM = document.querySelectorAll(".tbCalendarYM");
    tbCalendarYM.forEach(element => {
        //테이블에 정확한 날짜 찍는 변수
        //innerHTML : js 언어를 HTML의 권장 표준 언어로 바꾼다
        //new를 찍지 않아서 month는 +1을 더해줘야 한다. 
        element.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";
    });

    /*while은 이번달이 끝나면 다음달로 넘겨주는 역할*/
    while (tbCalendar.rows.length > 2) {
        //열을 지워줌
        //기본 열 크기는 body 부분에서 2로 고정되어 있다.
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
        //테이블의 tr 갯수 만큼의 열 묶음은 -1칸 해줘야지 
        //30일 이후로 담을달에 순서대로 열이 계속 이어진다.
    }
    var row = null;
    row = tbCalendar.insertRow();
    //테이블에 새로운 열 삽입//즉, 초기화
    var cnt = 0;// count, 셀의 갯수를 세어주는 역할
    var emptyCnt = 0; // 1일 전에 공백 개수 세기
    // 1일이 시작되는 칸을 맞추어 줌

    cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
    cell.innerHTML = "학습일";
    cell.classList.add('calendar__index');

    for (i = 0; i < doMonth.getDay(); i++) {
        /*이번달의 day만큼 돌림*/
        cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
        cell.classList.add('calendar__number');
        cnt = cnt + 1;//열의 갯수를 계속 다음으로 위치하게 해주는 역할
    }

    emptyCnt = cnt;

    /*달력 출력*/
    for (i = 1; i <= lastDate.getDate(); i++) {
        //1일부터 마지막 일까지 돌림 
        cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
        cell.innerHTML = i;//셀을 1부터 마지막 day까지 HTML 문법에 넣어줌
        cell.classList.add('calendar__number');
        cnt = cnt + 1;//열의 갯수를 계속 다음으로 위치하게 해주는 역할
        if (cnt % 7 == 1) {/*일요일 계산*/
            //1주일이 7일 이므로 일요일 구하기
            //월화수목금토일을 7로 나눴을때 나머지가 1이면 cnt가 1번째에 위치함을 의미한다
            cell.innerHTML = "<font color=#F79DC2>" + i
            //1번째의 cell에만 색칠
        }
        if (cnt % 7 == 0) {/* 1주일이 7일 이므로 토요일 구하기*/
            //월화수목금토일을 7로 나눴을때 나머지가 0이면 cnt가 7번째에 위치함을 의미한다
            cell.innerHTML = "<font color=skyblue>" + i
            //7번째의 cell에만 색칠

            let year = today.getFullYear().toString();
            let month = (today.getMonth() + 1).toString();
            if (today.getMonth() + 1 < 10)
                month = "0" + month;


            create_schedule_row("오전 (1)",emptyCnt,year,month,tbCalendar);
            create_schedule_row("오전 (2)",emptyCnt,year,month,tbCalendar);
            create_schedule_row("오후 (1)",emptyCnt,year,month,tbCalendar);
            create_schedule_row("오후 (2)",emptyCnt,year,month,tbCalendar);

            row = calendar.insertRow();
            cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
            cell.innerHTML = "학습일";
            cell.classList.add('calendar__index');


            //토요일 다음에 올 셀을 추가
        }
        /*오늘의 날짜에 노란색 칠하기*/
        if (today.getFullYear() == date.getFullYear()
            && today.getMonth() == date.getMonth()
            && i == date.getDate()) {
            //달력에 있는 년,달과 내 컴퓨터의 로컬 년,달이 같고, 일이 오늘의 일과 같으면
            cell.bgColor = "#FAF58C";//셀의 배경색을 노랑으로 
        }
    }

    let lastEmptyCnt = 0; //달력 뒤 숫자 이후 공백 카운트하기

    while (true) {
        if (cnt % 7 != 0) {
            cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
            cell.classList.add('calendar__number');
            cnt = cnt + 1;//열의 갯수를 계속 다음으로 위치하게 해주는 역할
            lastEmptyCnt++;
        } else {
            let year = today.getFullYear().toString();
            let month = (today.getMonth() + 1).toString();
            if (today.getMonth() + 1 < 10)
                month = "0" + month;

            create_last_row("오전 (1)",lastEmptyCnt,year,month);
            create_last_row("오전 (2)",lastEmptyCnt,year,month);
            create_last_row("오후 (1)",lastEmptyCnt,year,month);
            create_last_row("오후 (2)",lastEmptyCnt,year,month);

            break;
        }
    }
}

function create_schedule_row(learning_time,emptyCnt,year,month,tbCalendar){
    
            // 일상 생활 활동 영역 생성
            row = calendar.insertRow();
            cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
            cell.innerHTML = learning_time;
            cell.classList.add('calendar__index');
            let tempEmptyCnt = emptyCnt;
            //console.log(learning_list);

            for (j = 1; j <= 7; j++) {
                cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                if (tempEmptyCnt == 0 || tbCalendar.rows.length >= 8) {
                    const select = document.createElement('select');
                    let day = i - 7 + j;
                    if (day < 10)
                        day = "0" + day;
                    const temp_date = year + "-" + month + "-" + day;
                    select.classList.add(temp_date);
                    select.classList.add("learning3");
                    select.classList.add("bo_w_select");

                    learning_list.forEach(element => {
                        const option = document.createElement("option");
                        option.value = element.id;
                        option.text = element.name;
                        select.appendChild(option);
                    });

                    cell.appendChild(select);
                } else {
                    tempEmptyCnt--;
                }

            }
}

function create_last_row(learning_time,lastEmptyCnt,year,month) {
    row = calendar.insertRow();
    cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
    cell.innerHTML = learning_time;
    cell.classList.add('calendar__index');
    tempEmptyCnt = 7 - lastEmptyCnt;

    for (j = 1; j <= 7; j++) {
        cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
        if (tempEmptyCnt > 0) {
            const select = document.createElement('select');

            let day = i + j - (7 - lastEmptyCnt) - 1;
            if (day < 10)
                day = "0" + day;
            const temp_date = year + "-" + month + "-" + day;

            select.classList.add(temp_date);
            select.classList.add("learning3");
            select.classList.add("bo_w_select");

            learning_list.forEach(element => {
                const option = document.createElement("option");
                option.value = element.id;
                option.text =element.name;
                select.appendChild(option);
            });

            cell.appendChild(select);
            tempEmptyCnt--;
        }
    }
}



//러닝 목록 받아오기
function get_learning_list(childrenId) {
    let data = { "childrenId": childrenId };
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/learnings',
        data: data,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            make_member_table(r.data);
            console.log(r.data);
            alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });
}



function make_problem_table(problems, category_num) {

    
console.log(child_category);
    let category_name = document.getElementById("dynamic-header");
    category_name.innerHTML = child_category.get(category_num) + " 문제 리스트";

    let cnt = 0;
    const problems_table = document.querySelector('.problems__table');
    while (problems_table.rows.length > 1)
        problems_table.deleteRow(1);
    while (true) {
        if (cnt == 18)
            break;

        if ((cnt) % 3 == 0)
            var row = problems_table.insertRow();

        cell = row.insertCell();
        cell.classList.add('problems__td');
        if (cnt < problems.length) {
            cell.innerHTML = problems[cnt].name;
        }

        cnt++;
    }
}

function parent_category_inquiry(){
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/learning-categories/parents',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
            r.data.forEach(parent_category => {
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
            console.log(r);
            r.data.forEach(element => {
                child_category.set(element.id, element.name);
            })
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        // alert('서버 오류');
    });
}