var countDownDate = new Date("Dec 2, 2022 11:50:00").getTime();

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    console.log(distance);
    if (distance <= 0) {
        document.getElementById("title-1").innerHTML = "Contagem Finalizada 🎉🎉🎉";
        document.getElementById("title-2").innerHTML = "Contagem Finalizada 🎉🎉🎉";

        document.getElementById("seconds-contdown-1").innerHTML = 0;
        
        clearInterval(x);
    } else if((days-30 <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) || days-30 < 0) {
        document.getElementById("title-2").innerHTML = "Contagem Finalizada 🎉🎉🎉";
        
        document.getElementById("days-contdown-1").innerHTML = days;
        document.getElementById("hours-contdown-1").innerHTML = hours;
        document.getElementById("minutes-contdown-1").innerHTML = minutes;
        document.getElementById("seconds-contdown-1").innerHTML = seconds;

        document.getElementById("seconds-contdown-2").innerHTML = 0;
    } else {
    
        document.getElementById("days-contdown-1").innerHTML = days;
        document.getElementById("hours-contdown-1").innerHTML = hours;
        document.getElementById("minutes-contdown-1").innerHTML = minutes;
        document.getElementById("seconds-contdown-1").innerHTML = seconds;
    
        document.getElementById("days-contdown-2").innerHTML = days-60;
        document.getElementById("hours-contdown-2").innerHTML = hours;
        document.getElementById("minutes-contdown-2").innerHTML = minutes;
        document.getElementById("seconds-contdown-2").innerHTML = seconds;
    }

}, 1000);

setTimeout(() => {
    document.body.style.opacity = 1;
}, 1000);