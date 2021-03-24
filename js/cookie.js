// function setCookie(memberId, centerId, memberType) {
//     var date = new Date();
//     date.setTime(date.getTime() + 100*24*60*60*1000);

//     let data = {};//Creating custom object  
//     data.memberId = memberId;  
//     data.centerId = centerId;
//     data.memberType = memberType;
//     document.cookie="";
//     console.log(document.cookie);
//     //Converting JavaScript object to JSON string      
//     let jsonString = JSON.stringify(data);  
//     console.log(jsonString);
//     document.cookie = jsonString;  
// };

var setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
    };
    
    
function getCookie(name) {
    // console.log(document.cookie);
    if( document.cookie.length!=0){
        var value = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ))[1];
        // console.log(value);
        //Parsing JSON string to JSON object  
        value = JSON.parse(value);  
    }
    return value? value : null;
    };
    

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    // console.log(document.cookie);
};
        