$(document).ready(function(){
    $("#menu_toggle").click(function(){
        $(".add").toggleClass('hidden');
    });


    var words_reference = firebase.database().ref().child("words");
    if(words_reference){
        words_reference.on('value',function(snapshot){
            if(snapshot.val()!==null){
                initDictionary(snapshot.val());
            }else{
                stopLoading();
            }
        });
    }
});

function addWord(){
    if(authorizeUser()){
        
        var new_word = $("#word").val();
        var word_type = $("#word_type").val();
        var word_def = $("#definition").val();
        var word_ex = $("#example").val();

        var db = firebase.database();
        db.ref('words').push().set({
            word_name:new_word,
            word_type:word_type,
            word_def:word_def,
            word_ex:word_ex
        });

    }else{
        alert("Nepareizi dati!");
    }
}

function authorizeUser(){
    var enc_un1 = "8f7e0aa0b781511d04e96ff44a837589";
    var enc_un2 = "37eea3446c4a445e2f1cfeaca89d2d71";
    var enc_pas = "520e7f95ab7f91ba7580a2fcf7358029";

    var username = prompt("Ievadi lietotājvārdu!");
    var password = prompt("Ievadi paroli!");

    if(MD5(password) == enc_pas && (MD5(username) == enc_un1 || MD5(username) == enc_un2)){
        return true;
    }else{
        return false;
    }
}

function initDictionary(dict){
    $(".items").html("");
    Object.keys(dict).forEach(function(key,index) {
        var word = dict[key]["word_name"];
        var type = dict[key]["word_type"];
        var def = dict[key]["word_def"];
        var ex = dict[key]["word_ex"];

        $(".items").append('<div class="item"><h2>'+word+'</h2><span>'+type+'</span><p class="def">'+def+'</p><h3>Piemērs:</h3><p>'+ex+'</p></div>');
    });
    stopLoading();
}

function stopLoading(){
    $(".circle_3").fadeOut(400, function(){
        $(".circle_2").fadeOut(400, function(){
            $(".circle_1").fadeOut(400, function(){
                $(".loader_wrapper span").addClass("loader_scaled");
                setTimeout(function(){
                        $(".loading_screen").fadeOut(1000);
                },600);
            });
        });
    });
}