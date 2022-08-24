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
    amplenote.setAttribute("data-styles", "/css/amplenote-dark.css");
    document.querySelector("iframe").contentWindow.location.reload(true);
    button.innerText = "Light Mode";
  }
  else {
    document.body.classList.remove("dark");
    amplenote.setAttribute("data-styles", "/css/amplenote.css");
    document.querySelector("iframe").contentWindow.location.reload(true);
    button.innerText = "Dark Mode";
  }
}

function toggle() {
  darkMode = !darkMode;
  window.localStorage.setItem('darkMode', darkMode);
}