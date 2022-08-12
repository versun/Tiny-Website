const e = React.createElement;
class addNavigation extends React.Component {
  render() {
    return e("nav", {
  className: "navbar"
}, e("span", {
  className: "navbar-item"
}, e("a", {
  className: "nav-btn",
  href: "/"
}, "Home")), e("span", {
  className: "navbar-item"
}, e("a", {
  className: "nav-btn",
  href: "/projects/"
}, "Projects")), e("span", {
  className: "navbar-item"
}, e("a", {
  className: "nav-btn",
  href: "/challenge"
}, "Challenge")), e("span", {
  className: "navbar-item"
}, e("a", {
  className: "nav-btn",
  href: "/blog"
}, "Blog")));
    
  }
}
class addFooter extends React.Component {
  render() {
    return e("p", null, "Made by ", e("a", {
  href: "https://versun.me",
  target: "_blank"
}, "Versun"), " | email: ", e("a", {
  href: "mailto:me@versun.me"
}, "me@versun.me"));
  }
}

const header = ReactDOM.createRoot(document.querySelector('header'));
header.render(e(addNavigation));

const footer = ReactDOM.createRoot(document.querySelector('footer'));
footer.render(e(addFooter));
