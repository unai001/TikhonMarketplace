let close = true;
/*
function openNav() {
  document.getElementById("mySidenav").style.width = "260px";
  document.getElementById("navbarArriba").style.marginLeft = "260px";
  document.getElementById("contenido").style.marginLeft = "260px";
}*/

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("navbarArriba").style.marginLeft = "0";
    document.getElementById("contenido").style.marginLeft = "0";
    document.getElementById("botonNav").style.display = "initial";
    close = true;
}

function closeOpenNav() {
    if (close == true) {
        document.getElementById("mySidenav").style.width = "220px";
        document.getElementById("navbarArriba").style.marginLeft = "220px";
        document.getElementById("contenido").style.marginLeft = "220px";
        document.getElementById("botonNav").style.display = "none";
        close = false;
    } else {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("navbarArriba").style.marginLeft = "0";
        document.getElementById("contenido").style.marginLeft = "0";
        close = true;
    }
}

function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}
