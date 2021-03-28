let cookie = getCookie("data");

get_payment_item();


if(cookie==null){
    location.href = "login.html";
}else if (cookie.memberType != "M"){
    history.back();
}

show_center_information();

function show_center_information(){
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/centers?id='+getCookie("data").centerId,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            console.log(r.data);
            
            let centerInformationDiv = document.querySelector('.center-information');
            let status = "미가입";
            if(r.data.status != "NOT_PAYED")
                status = "가입";
            centerInformationDiv.innerHTML = "센터명: "+r.data.name+"<br> 멤버십 가입 상태: "+status;

        } else {
            reject(r);
            // alert('통신 실패');
        }
    }).fail(function (r) {
        console.log(r);
        reject(r);
        // alert('서버 오류');
    });
}

function get_center_information(price,month,id) {

    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'http://13.209.38.201:8080/centers?id='+getCookie("data").centerId,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done(function (r) {
            if (r.status == "OK") {
                console.log(r.data);
                let paymentInfo = {
                    "price": price,
                    "month": month,
                    "id": id
                }

                let return_value = {
                    "centerInfo" : r.data,
                    "paymentInfo": paymentInfo,
                }
                resolve(return_value);
                // alert('통신 성공');
            } else {
                reject(r);
                // alert('통신 실패');
            }
        }).fail(function (r) {
            console.log(r);
            reject(r);
            // alert('서버 오류');
        });
    })
};

function get_payment_item(){
    
    $.ajax({
        type: 'GET',
        url: 'http://13.209.38.201:8080/items',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (r) {
        if (r.status == "OK") {
            make_buttons(r.data);
        } else {
            // alert('통신 실패');
        }
    }).fail(function (r) {
        console.log(r);
        // alert('서버 오류');
    });
}

function make_buttons(buttonsInfo){
    let div = document.querySelector('.payment-btn-box');
    
    buttonsInfo.forEach(buttonInfo => {
        console.log(buttonInfo);
        div.innerHTML += "<button onclick='payProcess("+buttonInfo.price+", "+buttonInfo.month+", "+buttonInfo.id+")' class='payment-btn'> "+buttonInfo.month+"개월 결제하기 <br><br> "+buttonInfo.price+"원 </button>";
    })
  }

  function payProcess(price, month,id){
      get_center_information(price, month,id)
        .then(pay)
  }

  function pay(values) {


    centerInfo = values.centerInfo;
    price = values.paymentInfo.price;
    month = values.paymentInfo.month;
    paymentId = values.paymentInfo.id;
    var IMP = window.IMP; // 생략가능
    IMP.init('imp77939186');
    // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용
    // i'mport 관리자 페이지 -> 내정보 -> 가맹점식별코드


    IMP.request_pay({
    pg: 'inicis', // version 1.1.0부터 지원.
    /*
    'kakao':카카오페이,
    html5_inicis':이니시스(웹표준결제)
    'nice':나이스페이
    'jtnet':제이티넷
    'uplus':LG유플러스
    'danal':다날
    'payco':페이코
    'syrup':시럽페이
    'paypal':페이팔
    */
    pay_method: 'card',
    /*
    'samsung':삼성페이,
    'card':신용카드,
    'trans':실시간계좌이체,
    'vbank':가상계좌,
    'phone':휴대폰소액결제
    */
    merchant_uid: centerInfo.id,
    /*
    merchant_uid에 경우
    https://docs.iamport.kr/implementation/payment
    위에 url에 따라가시면 넣을 수 있는 방법이 있습니다.
    참고하세요.
    나중에 포스팅 해볼게요.
    */
    name: month+'개월 결제',
    //결제창에서 보여질 이름
    amount: 1000,
    //가격
    buyer_name: centerInfo.name,
    buyer_tel: centerInfo.phone,
    buyer_addr: centerInfo.address,
    buyer_postcode: centerInfo.zipcode,
    m_redirect_url: 'https://www.yourdomain.com/payments/complete'
    /*
    모바일 결제시,
    결제가 끝나고 랜딩되는 URL을 지정
    (카카오페이, 페이코, 다날의 경우는 필요없음. PC와 마찬가지로 callback함수로 결과가 떨어짐)
    */
    }, function (rsp) { // callback

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();

        if(month<10)
            month = "0"+month;
        if(day<10)
            day = "0"+day;

        let data = {
            "paymentDate": year+"-"+month+"-"+day,
            "itemId": values.paymentInfo.id,
            "memberId": getCookie("data").memberId,
            "centerId": values.centerInfo.id
        }

        if (rsp.success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
        // jQuery로 HTTP 요청
            $.ajax({
                type: 'POST',
                url: 'http://13.209.38.201:8080/payments/new',
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).done(function (r) {
                if (r.status == "CREATED") {
                    console.log(r.data);
                } else {
                    // alert('통신 실패');
                }
            }).fail(function (r) {
                console.log(r);
            });
        } else {
            alert("결제에 실패하였습니다. 에러 내용: " +  rsp.error_msg);
        }
    });
}


