// Put this at the top of index page
if ( ! (document.cookie.indexOf("CrewCentreSession=Valid")  == -1) ) {
    location.href = "../index.html";
}

var quizeStore = localStorage;

var handleRequest = function(user, type){
    var ajaxRequest = function(user){
        var scriptURL = "https://script.google.com/macros/s/AKfycbwn0wRe1_xCC23Riwy_ZONlzqmwJdhjSBKsjHpY1Xo7ZfTGgL3H41Z90stuS_X9JAHpBA/exec";
        // user = { data : user };
        $.ajax({
            type: "POST",
            url: scriptURL,
            async: true,
            data: user,
            headers: {
                // 'Content-Type': 'text/plain;charset=utf-8',
                'Content-type': 'application/x-www-form-urlencoded',
                // 'Content-type': 'application/json',
            },
            beforeSuccess: function(){
                setTimeout(function(){ alert("Hello"); }, 5000);
            },
            success: function (data)
            {
                switch(type){
                    case 'login':
                        (quizeStore.getItem('login') == 'undefined') ? quizeStore.setItem('login', '0') : '';
                        (quizeStore.getItem('token') == 'undefined') ? quizeStore.setItem('token', '') : '';
                        if(data[type]){
                            quizeStore.setItem('login', '1');
                            data.token.length && quizeStore.setItem('token', data.token);
                            var sessionTimeout = 1; //hours
                            var loginDuration = new Date();
                            loginDuration.setTime(loginDuration.getTime()+(sessionTimeout*60*60*1000));
                            document.cookie = "CrewCentreSession=Valid; "+loginDuration.toGMTString()+"; path=/";
                        }
                        alert(data.result);
                        return data;

                        break;
                    case 'signup':  
                        (quizeStore.getItem('login') == 'undefined') ? quizeStore.setItem('login', '0') : '';
                        (quizeStore.getItem('token') == 'undefined') ? quizeStore.setItem('token', '') : '';
                        console.log(data[type]);
                        if(data[type]){
                            data.token.length && quizeStore.setItem('token', data.token);
                            (quizeStore.getItem('login') == '0') && (window.location.href = '../');
                        }
                        alert(data.result);
                        return data;
        
                        break;
                    default:
                        console.log('Case default');    
                }
                console.log(data);
            }
        });
    } 
    ajaxRequest(user);
    
    
}
$(document).ready(function(){
    
    /**
     * @param {send request URL} url reqired
     * @param {Type for the request} type reqired
     */
    
    $('.login-form').submit(function(e){
        e.preventDefault();
        let user = {
            name: 'login',
            email: $('.login-form #email').val(),
            id: $('.login-form #password').val(),
            action: 'login',
        } 
        handleRequest(user, 'login');
    });

    $('.signup-form').submit(function(e){
        e.preventDefault();
        let user = {
            name: $('.signup-form #name').val(),
            email: $('.signup-form #email').val(),
            id: $('.signup-form #password').val(),
            action: "signup",
        } 
        console.log(user);
        handleRequest(user, 'signup');
    });

    
    
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);
    let user = {
        name: "Name not display For security reson"/*profile.getName()*/,
        email: 'GoogleSignin@googleUser.com'/*profile.getEmail()*/,
        id: 'demo44235234543ID'/*profile.getId()*/,
        action: 'googleSignin',
    } 
    console.log(user);

    handleRequest(user, 'login');

}
