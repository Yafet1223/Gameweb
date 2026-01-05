const navicon1 = document.getElementById("icon1");
const content = document.getElementById("content1");

navicon1.addEventListener("click", () => {
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
});
const toggle=document.getElementById("theme-toggle");
toggle.addEventListener("click",() =>  {
    const toggle = document.getElementById('theme-toggle');

        toggle.addEventListener('click', () => {
           
            document.body.classList.toggle('dark-mode');

          
            if (document.body.classList.contains('dark-mode')) {
                toggle.textContent = '☀️';
            } else {
                toggle.textContent = '🌙'; 
            }
        });
});

const button = document.getElementById('play1');


button.addEventListener('click', () => {
    window.location.href = 'login.html';
});
const button2=document.getElementById('play2');
button2.addEventListener('click',()=>{
    window.location.href='login.html';
});
const button3=document.getElementById('play3');
button3.addEventListener('click', () => {
    window.location.href = 'login.html';
});
const button4=document.getElementById('play4');
button4.addEventListener('click',() =>{
    window.location.href='login.html';
});
const button5=document.getElementById("signup");
button5.addEventListener('click',() =>{
    window.location.href='signup.html';
});
