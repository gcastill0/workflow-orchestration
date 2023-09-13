const parser = new DOMParser();

async function fetchSVG(svg_name, div_target) {
  const response = await fetch(svg_name);
  const svgText = await response.text();
  const svgDoc = parser.parseFromString(svgText, "text/xml");
  div_target.appendChild(svgDoc.documentElement);
}

window.onload = function () {
  const svg_diagram = document.getElementById("svg-diagram");

  fetchSVG("img/gitlab-logo-500.svg", svg_diagram);

  Promise.all(
    svg_diagram
      .getAnimations({ subtree: true })
      .map((animation) => animation.finished)
  ).then(() => window.location.replace("slide-1.html"));
};
