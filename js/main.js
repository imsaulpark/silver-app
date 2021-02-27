
var today = new Date();//오늘 날짜//내 컴퓨터 로컬을 기준으로 today에 Date 객체를 넣어줌
var date = new Date();//today의 Date를 세어주는 역할

get_member_list();  //대상자 목록 받아오기
get_learning_list(5);   //시지각 영역별 문제 가져오기

let visual_problems = ['같은그림찾기(하)', '같은도형찾기', '반쪽그림따라그리기', '특정글자찾기', '틀린그림찾기', '특정인물찾기', '같은글미잇기', '반쪽그림잇기', '이름찾아적기', '같은그림찾기(중)'];
let concentration_problems = ['미로찾기', '사다리타기', '색칠하기', '기념일 색칠하기', '같은 숫자 연결하기', '화투 색칠하기', '글자색깔맞추기', '선따라 그리기', '따라그리기(중)', '따라그리기(하)'];
let thinking_problems = ['물건개수 맞추기', '4x4스도쿠', '개수맞추기', '범주찾기', '주제와다른것찾기', '시장물건 계산하기', '주사위 계산하기', '열매개수세기', '숫자 나열하기'];
let language_problems = ['빈칸채우기', '초성맞추기', '동물속담맞추기', '끝말잇기', '단어와 그림맞추기', '단어만들기', '명언따라쓰고읽기', '문장따라말하기'];
let remembrance_problems = ['기념일 회상하기', '요리재료 맞추기', '식재료 구분하기', '옛물건 회상하기', '정보 기억하기', '음식 회상하기', '사물회상하기', '계절 회상하기', '옛놀이 회상하기'];
let life_problems = ['시간 맞추기', '야외활동 함께하기', '실내활동 함께하기', '집안일 함께하기', '냉장고 식재료 찾기', '표정 맞추기', '실내운동 함께하기', '물건의 용도 알기'];

let member_list;
// 처음에 화면 들어오고 나서 데이터 받아오기
// 대상자 목록 받아오기
function get_member_list() {
    let data = {"centerId":3};
    $.ajax({
        type : 'GET',
        url : 'http://13.209.38.201:8080/patients',
        data : data,
        contentType : 'application/json; charset=utf-8',
        dataType : 'json'
    }).done(function(r) {
        if (r.status == "OK") {
            member_list = r.data;
            make_member_table(r.data);
            // console.log(r.data);
            // alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function(r) {
        // alert('서버 오류');
    });

};

var doMonth = new Date(today.getFullYear(),today.getMonth(),1);
    //이번 달의 첫째 날,
    //new를 쓰는 이유 : new를 쓰면 이번달의 로컬 월을 정확하게 받아온다.     
    //new를 쓰지 않았을때 이번달을 받아오려면 +1을 해줘야한다. 
    //왜냐면 getMonth()는 0~11을 반환하기 때문
    var lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
    

// 센터 러닝 스케줄 받아오기
function get_learning_schedule() {
    let data = {
        "centerId":3,
        "start":today.getFullYear().toString()+"-"+today.getMonth().toString()+"-"+1,
        "end":today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+0,
    };

    $.ajax({
        type : 'GET',
        url : 'http://13.209.38.201:8080/center-learnings',
        data : data,
        contentType : 'application/json; charset=utf-8',
        dataType : 'json'
    }).done(function(r) {
        if (r.status == "OK") {
            
            set_learning_schedule(r.data);
            // console.log(r.data);
            alert('센터 러닝 스케줄 통신 성공');
        } else {
            alert('센터 러닝 스케줄 통신 성공 통신 실패');
        }
    }).fail(function(r) {
        alert('센터 러닝 스케줄 통신 성공 서버 오류');
    });

};

//센터 러닝 스케줄 적용하기
function set_learning_schedule(learning_schedule){
    learning_schedule.forEach(daily_schedule => {
        const select_box1 = document.querySelector('.'+daily_schedule.date+'.learning1');
        const select_box2 = document.querySelector('.'+daily_schedule.date+'.learning2');
        const select_box3 = document.querySelector('.'+daily_schedule.date+'.learning3');
        select_box1.value=daily_schedule.learnings[0];
        select_box2.value=daily_schedule.learnings[1];
        select_box3.value=daily_schedule.learnings[2];
    })
}

function collect_learning_schedule(){
    let lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
    let year = lastDate.getFullYear().toString();
    let month = lastDate.getMonth().toString();
    let endDay = lastDate.getDay().toString();
    let learning_schedule = null;
    for(let i=1; i<=endDay; i++){
        let string_date = year+"-"+month+"-"+endDay;
        const select_box1 = document.querySelector('.'+string_date+'.learning1');
        const select_box2 = document.querySelector('.'+string_date+'.learning2');
        const select_box3 = document.querySelector('.'+string_date+'.learning3');
        learning_schedule.push({"date":string_date, "learnings":[select_box1.value,select_box2.value,select_box3.value]});
    }
    post_learning_schedule(learning_schedule);
}

// post learning_schedule
function post_learning_schedule(data) {
 
    $.ajax({
		type : 'POST',
		url : 'http://13.209.38.201:8080/center-learnings',
		data : JSON.stringify(data),
		contentType : 'application/json; charset=utf-8',
		dataType : 'json'
	}).done(function(r) {
		if (r.status == "OK") {
            alert('러닝 스케줄 통신 성공');
		} else {
			alert('러닝 스케줄 통신 실패');
		}
	}).fail(function(r) {
		alert('러닝 스케줄 서버 오류');
	});
}


// ajax communication example
const person_add = document.querySelector('.person-control__add');
person_add.addEventListener('click', (event) => {
    
    let data = "fucking good";

    $.ajax({
		type : 'GET',
		url : 'http://13.209.38.201:8080/center-learnings',
		data : JSON.stringify(data),
		contentType : 'application/json; charset=utf-8',
		dataType : 'json'
	}).done(function(r) {
		if (r.status == "OK") {
            alert('통신 성공');
		} else {
			alert('통신 실패');
		}
	}).fail(function(r) {
		alert('서버 오류');
	});
});


buildCalendar();
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
function buildCalendar(){//현재 달 달력 만들기
    var doMonth = new Date(today.getFullYear(),today.getMonth(),1);
    //이번 달의 첫째 날,
    //new를 쓰는 이유 : new를 쓰면 이번달의 로컬 월을 정확하게 받아온다.     
    //new를 쓰지 않았을때 이번달을 받아오려면 +1을 해줘야한다. 
    //왜냐면 getMonth()는 0~11을 반환하기 때문
    var lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
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
            tbCalendar.deleteRow(tbCalendar.rows.length-1);
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

        for (i=0; i<doMonth.getDay(); i++) {
        /*이번달의 day만큼 돌림*/
            cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
            cell.classList.add('calendar__number');
            cnt = cnt + 1;//열의 갯수를 계속 다음으로 위치하게 해주는 역할
        }

        emptyCnt = cnt;

    /*달력 출력*/
        for (i=1; i<=lastDate.getDate(); i++) { 
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
            if (cnt%7 == 0){/* 1주일이 7일 이므로 토요일 구하기*/
                //월화수목금토일을 7로 나눴을때 나머지가 0이면 cnt가 7번째에 위치함을 의미한다
                cell.innerHTML = "<font color=skyblue>" + i
                //7번째의 cell에만 색칠

                // 인지활동(1) 영역 생성
                row = calendar.insertRow();
                cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                cell.innerHTML = "인지활동 (1)";
                cell.classList.add('calendar__index');
                let tempEmptyCnt = emptyCnt;
  
                for (j=1; j<=7; j++){
                    cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                    
                    if(tempEmptyCnt==0 || tbCalendar.rows.length >= 7){
                        const select = document.createElement('select');
                        const temp_date = today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+(i-7+j);
                        select.classList.add(temp_date);
                        select.classList.add("learning1");
                        // console.log(temp_date);
                        //console.log(temp_date.toString());
                        visual_problems.forEach(element => {
                            const option = document.createElement("option");
                            option.value = element;
                            option.text = element;
                            select.appendChild(option);
                        });

                        cell.appendChild(select);
                    }else {
                        tempEmptyCnt--;
                    }

                }

                // 인지활동(2) 영역 생성
                row = calendar.insertRow();
                cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                cell.innerHTML = "인지활동 (2)";
                cell.classList.add('calendar__index');
                tempEmptyCnt = emptyCnt;
  
                for (j=1; j<=7; j++){
                    cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                    if(tempEmptyCnt==0 || tbCalendar.rows.length >= 7){
                        const select = document.createElement('select');
                        const temp_date = today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+(i-7+j);
                        select.classList.add(temp_date);
                        select.classList.add("learning2");
    
                        thinking_problems.forEach(element => {
                            const option = document.createElement("option");
                            option.value = element;
                            option.text = element;
                            select.appendChild(option);
                        });

                        cell.appendChild(select);
                    }else {
                        tempEmptyCnt--;
                    }

                }

                // 일상 생활 활동 영역 생성
                row = calendar.insertRow();
                cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                cell.innerHTML = "일상 생활 활동";
                cell.classList.add('calendar__index');
                tempEmptyCnt = emptyCnt;
  
                for (j=1; j<=7; j++){
                    cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                    if(tempEmptyCnt==0 || tbCalendar.rows.length >= 7){
                        const select = document.createElement('select');
                        const temp_date = today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+(i-7+j);
                        select.classList.add(temp_date);
                        select.classList.add("learning3");
                        
                        life_problems.forEach(element => {
                            const option = document.createElement("option");
                            option.value = element;
                            option.text = element;
                            select.appendChild(option);
                        });

                        cell.appendChild(select);
                    }else {
                        tempEmptyCnt--;
                    }

                }
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

        while(true){
            if(cnt%7 != 0){
                cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                cell.classList.add('calendar__number');
                cnt = cnt + 1;//열의 갯수를 계속 다음으로 위치하게 해주는 역할
                lastEmptyCnt++;
            }else{
                row = calendar.insertRow();
                cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                cell.innerHTML = "인지활동 (1)";
                cell.classList.add('calendar__index');
                tempEmptyCnt = 7-lastEmptyCnt;
  
                for (j=1; j<=7; j++){
                    cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                    if(tempEmptyCnt>0){
                        const select = document.createElement('select');
                        const temp_date = today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+(i+j-(7-lastEmptyCnt)-1);
                        select.classList.add(temp_date);
                        select.classList.add("learning1");
        
                        visual_problems.forEach(element => {
                            const option = document.createElement("option");
                            option.value = element;
                            option.text = element;
                            select.appendChild(option);
                        });

                        cell.appendChild(select);
                        tempEmptyCnt--;
                    }
                }
                row = calendar.insertRow();
                cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                cell.innerHTML = "인지활동 (2)";
                cell.classList.add('calendar__index');
                tempEmptyCnt = 7-lastEmptyCnt;
  
                for (j=1; j<=7; j++){
                    cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                    if(tempEmptyCnt>0){
                        const select = document.createElement('select');
                        const temp_date = today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+(i+j-(7-lastEmptyCnt)-1);
                        select.classList.add(temp_date);
                        select.classList.add("learning2");
        
                        thinking_problems.forEach(element => {
                            const option = document.createElement("option");
                            option.value = element;
                            option.text = element;
                            select.appendChild(option);
                        });

                        cell.appendChild(select);
                        tempEmptyCnt--;
                    }
                }
                row = calendar.insertRow();
                cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                cell.innerHTML = "일상 생활 활동";
                cell.classList.add('calendar__index');
                tempEmptyCnt = 7-lastEmptyCnt;
  
                for (j=1; j<=7; j++){
                    cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
                    if(tempEmptyCnt>0){
                        const select = document.createElement('select');
                        const temp_date = today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+(i+j-(7-lastEmptyCnt)-1);
                        select.classList.add(temp_date);
                        select.classList.add("learning3");

                        life_problems.forEach(element => {
                            const option = document.createElement("option");
                            option.value = element;
                            option.text = element;
                            select.appendChild(option);
                        });

                        cell.appendChild(select);
                        tempEmptyCnt--;
                    }
                }
                break;
            }
        }
}

// problem category button clicked
const visual_btn = document.querySelector('.visual__btn');
const concentration_btn = document.querySelector('.concentration__btn');
const thinking_btn = document.querySelector('.thinking__btn');
const language_btn = document.querySelector('.language__btn');
const remembrance_btn = document.querySelector('.remembrance__btn');
const life_btn = document.querySelector('.life__btn');

make_problem_table(visual_problems);

visual_btn.addEventListener('click', (event) => {
    get_learning_list(5);
});

concentration_btn.addEventListener('click', (event) => {
    get_learning_list(6);
});

thinking_btn.addEventListener('click', (event) => {
    get_learning_list(7);
});

language_btn.addEventListener('click', (event) => {
    get_learning_list(8);
});

remembrance_btn.addEventListener('click', (event) => {
    get_learning_list(9);
});

life_btn.addEventListener('click', (event) => {
    get_learning_list(10);
});


//러닝 목록 받아오기
function get_learning_list(childrenId){
    let data = {"childrenId":childrenId};
    $.ajax({
        type : 'GET',
        url : 'http://13.209.38.201:8080/learnings',
        data : data,
        contentType : 'application/json; charset=utf-8',
        dataType : 'json'
    }).done(function(r) {
        if (r.status == "OK") {
            make_member_table(r.data);
            console.log(r.data);
            alert('통신 성공');
        } else {
            // alert('통신 실패');
        }
    }).fail(function(r) {
        // alert('서버 오류');
    });
}

function make_member_table(member_list){
    const member_table = document.querySelector('.person-table');
    let count = 1;
    member_list.forEach(member => {
        const row = member_table.insertRow();
        let cell = row.insertCell();
        cell.innerHTML = count++;
        cell = row.insertCell();
        //체크박스 넣기
        cell = row.insertCell();
        cell.innerHTML = member.name;
        cell = row.insertCell();
        //담당자명 넣기
        cell = row.insertCell();
        //등급 넣기
    });
                        

}

function make_problem_table(problems){

    let cnt = 0;
    const problems_table = document.querySelector('.problems__table');
    while(problems_table.rows.length > 1)
        problems_table.deleteRow(1);
    while(true){
        if(cnt==18)
            break;

        if(cnt%3 == 0)        
            var row = problems_table.insertRow();
        
        cell = row.insertCell();
        cell.classList.add('problems__td');
        if(cnt<problems.length){
            cell.innerHTML = problems[cnt];
        }

        cnt++;
    }
}
