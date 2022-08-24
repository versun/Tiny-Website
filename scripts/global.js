var darkMode = window.localStorage.getItem('darkMode');
if (!darkMode) {
  darkMode = false;
}
else if (darkMode === "true") {
  darkMode = true;
}
else {
  darkMode = false;
}
mode();


function darkToggle() {
  toggle();
  mode();
}

function mode() {
  var button = document.getElementById("dark-button");
  var amplenote = document.getElementsByClassName("amplenote-embed")[0];
  if (darkMode || darkMode) {
    document.body.classList.add("dark");
    button.innerText = "Light Mode";
    amplenote.setAttribute("data-styles", "/css/amplenote-dark.css");
    
  }
  else {
    document.body.classList.remove("dark");
    button.innerText = "Dark Mode";
    amplenote.setAttribute("data-styles", "/css/amplenote.css");
    document.querySelector("iframe").contentWindow.location.reload(true);
  }
}

function toggle() {
  darkMode = !darkMode;
  window.localStorage.setItem('darkMode', darkMode);
}