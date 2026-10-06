const canvas = document.getElementById("background-animation");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 150
};

// ========================================
// CONFIGURAÇÕES
// ========================================

const config = {
    particleColor: "rgba(34, 197, 94, 0.8)",
    lineColor: "rgba(34, 197, 94, 0.18)",

    particleSize: 2,

    particleCount: 90,

    maxDistance: 130,

    speed: 0.4
};


// ========================================
// AJUSTA O CANVAS
// ========================================

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();
}

window.addEventListener("resize", resizeCanvas);


// ========================================
// MOUSE
// ========================================

window.addEventListener("mousemove", function (event) {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});


// Quando o mouse sai da tela
window.addEventListener("mouseout", function () {

    mouse.x = null;
    mouse.y = null;

});


// ========================================
// CRIA PARTÍCULAS
// ========================================

function createParticles() {

    particles = [];

    let amount = config.particleCount;

    // Menos partículas em telas pequenas
    if (window.innerWidth < 768) {
        amount = 45;
    }

    for (let i = 0; i < amount; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size: Math.random() * 1.8 + 0.8,

            speedX:
                (Math.random() - 0.5) *
                config.speed,

            speedY:
                (Math.random() - 0.5) *
                config.speed

        });

    }
}


// ========================================
// DESENHA PARTÍCULA
// ========================================

function drawParticle(particle) {

    ctx.beginPath();

    ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = config.particleColor;

    ctx.shadowBlur = 10;

    ctx.shadowColor = "#22c55e";

    ctx.fill();

    ctx.shadowBlur = 0;
}


// ========================================
// MOVIMENTO
// ========================================

function updateParticle(particle) {

    particle.x += particle.speedX;
    particle.y += particle.speedY;


    // Volta pelo outro lado da tela

    if (particle.x < 0) {
        particle.x = canvas.width;
    }

    if (particle.x > canvas.width) {
        particle.x = 0;
    }

    if (particle.y < 0) {
        particle.y = canvas.height;
    }

    if (particle.y > canvas.height) {
        particle.y = 0;
    }


    // Interação com mouse

    if (mouse.x !== null && mouse.y !== null) {

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        if (distance < mouse.radius) {

            const force =
                (mouse.radius - distance) /
                mouse.radius;

            particle.x -=
                (dx / distance) *
                force *
                1.5;

            particle.y -=
                (dy / distance) *
                force *
                1.5;
        }
    }
}


// ========================================
// CONECTA PARTÍCULAS
// ========================================

function connectParticles() {

    for (let i = 0; i < particles.length; i++) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < config.maxDistance) {

                const opacity =
                    1 -
                    distance /
                    config.maxDistance;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(34, 197, 94, ${opacity * 0.25})`;

                ctx.lineWidth = 0.6;

                ctx.stroke();
            }
        }
    }
}


// ========================================
// ANIMAÇÃO
// ========================================

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Atualiza partículas

    particles.forEach(particle => {

        updateParticle(particle);

        drawParticle(particle);

    });


    // Conecta as partículas

    connectParticles();


    requestAnimationFrame(animate);
}


// ========================================
// INICIAR
// ========================================

resizeCanvas();

animate();