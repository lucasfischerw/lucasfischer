var welcomeTextDescriptionDictionary = {
    0: 'Systems Analysis and Development student',
    1: 'Web Developer',
    2: 'Tech Enthusiast'
};

var popupTextDictionary = {
    0: {
        title: 'About Me',
        text: "<p>I am a Systems Analysis and Development student at Unisinos in São Leopoldo, RS. I have been studying web development for several years and am passionate about technology. Since I was a kid, I have always been fascinated by the potential of technology to change the world and inspire those around us.</p><p>In the 6th grade, I joined my school's robotics team and participated in several competitions throughout the years. I developed numerous skills in coding and teamwork, earning several trophies.</p><p>Later in high school, I started working as a web developer, selling simple projects to customers worldwide. Over the years, my skills improved, and now I offer professional services ranging from simple projects to full platforms supporting user authentication, data collection and analysis, and interactive dashboards.</p><p>Currently, I am helping the robotics students at my school as an assistant teacher, developing projects as a freelancer, and working for a software company. I am always looking for new challenges and opportunities to learn.</p>"
    },
    1: {
        title: 'My Experience',
        text: '<p>Throughout my journey, I have completed over 70 projects as a Freelancer on Fiverr, each contributing to my growth as a programmer. These projects range from simple websites to complex applications, demonstrating my versatility and ability to adapt to different requirements.</p><p>One of my proudest achievements is the consistent 5-star reviews I receive from my clients. This positive feedback from people worldwide is a testament to the quality of my work and my commitment to delivering excellent results. I am driven by a desire to exceed expectations and to continuously improve my skills and knowledge.</p><p>Over the past years, I have dedicated my time to develop code for robots that aim to help in human rescues and progress the technology needed to make this a reality. I earned more than 9 awards in these competitions togheter with my team, including the record-breaking 2nd place on the biggest Brazilian Competition for our school.</p>'
    },
    2: {
        title: 'Coding Skills',
        text: '<p>As I started my projects in Web Development, Robot Coding and University Work and Tests, I have developed skills in different areas, programming languages and frameworks.</p><p>C/C++/C#: Robot Coding, University</p><p>Python: Web Projects, Robot Coding, University, Computer Vision</p><p>HTML/CSS/Javascript/Google Firebase: Web Projects, with and without data management</p><p>OpenCV + Python/Javascript: Computer Vision Projects</p><p>Microsoft .NET: Web Development/Data management</p>'
    }
};

function triggerDescriptionAnimation(text) {
    var animationDuration = 300;
    document.getElementById('welcome-section-description-text').style.animation = 'welcome-section-text-disappear ' + animationDuration + 'ms ease forwards';
    setTimeout(() => {
        document.getElementById('welcome-section-description-text').style.animation = 'welcome-section-text-appear ' + animationDuration + 'ms ease forwards';
        document.getElementById('welcome-section-description-text').innerHTML = text;
    }, animationDuration);
}

var welcomeTextDescriptionIndex = 0;
setInterval(() => {
    triggerDescriptionAnimation(welcomeTextDescriptionDictionary[welcomeTextDescriptionIndex]);
    welcomeTextDescriptionIndex = (welcomeTextDescriptionIndex + 1) % 3;
}, 2000);


var languageMenuIsVisible = false;

function showLanguageMenu() {
    if (languageMenuIsVisible) {
        document.querySelector('.dropdown-content').style.display = 'none';
        document.querySelector('#svg-language-menu').style.transform = 'rotate(0deg)';
        languageMenuIsVisible = false;
    } else {
        document.querySelector('.dropdown-content').style.display = 'flex';
        document.querySelector('#svg-language-menu').style.transform = 'rotate(-180deg)';
        languageMenuIsVisible = true;
    }
}

window.onscroll = function () {
    if(window.scrollY > 50) {
        document.querySelector('nav').style.padding = '8px 25px';
        document.querySelector('nav').style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        document.querySelector('nav').style.borderRadius = '15px';
        document.querySelector('nav').style.top = '10px';
        document.querySelector('nav').style.width = '90%';
        document.querySelector('nav').style.left = '5%';
        document.querySelector('nav').style.backgroundColor = 'rgb(31, 31, 30)';
    } else {
        document.querySelector('nav').style.padding = '25px';
        document.querySelector('nav').style.boxShadow = 'none';
        document.querySelector('nav').style.borderRadius = '0';
        document.querySelector('nav').style.top = '0';
        document.querySelector('nav').style.width = '100%';
        document.querySelector('nav').style.left = '0';
        document.querySelector('nav').style.backgroundColor = '#252422';
    }
}

document.querySelector('#resume-btn').addEventListener('click', () => {
    window.open('cv.pdf', '_blank');
});

const buttons = document.querySelectorAll('button.open-popup');
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        document.querySelector('#popup-title').innerHTML = popupTextDictionary[index].title;
        document.querySelector('#popup-text').innerHTML = popupTextDictionary[index].text;
        document.querySelector('.blur').style.filter = 'blur(5px)';
        document.querySelector('.popup').style.top = button.getBoundingClientRect().top + 'px';
        document.querySelector('.popup').style.width = button.getBoundingClientRect().width + 'px';
        document.querySelector('.popup').style.left = button.getBoundingClientRect().left + 'px';
        document.querySelector('.popup').style.display = 'flex';
        document.querySelector('html').style.overflow = 'hidden';
        setTimeout(() => {
            setTimeout(() => {
                document.querySelectorAll('.popup p').forEach(p => {
                    p.style.opacity = '1';
                });
            }, 250);
            document.querySelectorAll('.popup h1').forEach(h1 => {
                h1.style.opacity = '1';
            });
        }, 500);
    });
});

function closePopup() {
    document.querySelector('.blur').style.filter = 'none';
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('html').style.overflow = 'auto';
    document.querySelectorAll('.popup p').forEach(p => {
        p.style.opacity = '0';
    });
    document.querySelectorAll('.popup h1').forEach(h1 => {
        h1.style.opacity = '0';
    });
}

document.querySelectorAll('button.load-projects-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.blur').style.transform = 'translateX(-100%)';
        document.querySelector('html').style.overflow = 'hidden';
        document.querySelector('.all-projects').style.transform = 'translateX(0)';
        history.pushState(null, null, 'projects');
    });
});

window.addEventListener('popstate', () => {
    document.querySelector('.all-projects').style.transition = 'none';
    goBackHome();
    setTimeout(() => {
        document.querySelector('.all-projects').style.transition = 'transform 0.5s ease';
    }, 100);
});

function goBackHome() {
    document.querySelector('.blur').style.display = 'block';
    document.querySelector('.blur').style.transform = 'none';
    document.querySelector('.all-projects').style.transform = 'translateX(100%)';
    document.querySelector('html').style.overflow = 'auto';
}