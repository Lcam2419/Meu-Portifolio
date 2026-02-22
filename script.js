// animação ao rolar
function reveal(){
    const reveals = document.querySelectorAll(".reveal");

    for(let i=0;i<reveals.length;i++){
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 100;

        if(elementTop < windowHeight - elementVisible){
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
function animarSkills(){
    const section = document.querySelector("#habilidades");
    const posicao = section.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;

    if(posicao < alturaTela - 100){
        const barras = document.querySelectorAll(".progresso");
        barras.forEach(barra=>{
            barra.style.width = barra.classList.contains("html") ? "90%" :
                                barra.classList.contains("css") ? "85%" :
                                barra.classList.contains("js") ? "70%" :
                                barra.classList.contains("react") ? "55%" :
                                barra.classList.contains("git") ? "65%" : "0";
        });
    }
}

window.addEventListener("scroll", animarSkills);

