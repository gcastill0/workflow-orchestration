const parser = new DOMParser();

async function fetchSVG(svg_name, div_target) {
    const response = await fetch(svg_name);
    const svgText = await response.text();
    const svgDoc = parser.parseFromString(svgText, "text/xml");
    div_target.appendChild(svgDoc.documentElement);
}

window.onload = function () {
    const img_div = document.querySelector(".card-image")
    const img_src = (img_div.children[0].attributes[0].nodeValue)
    const lightbox = document.getElementById("lightbox")

    img_div.addEventListener('click', e => {

        const lightboxSVG = document.createElement("div");
        lightboxSVG.id = "lightbox-svg"
        lightboxSVG.classList.add('lightgox-svg')

        fetchSVG(img_src, lightboxSVG);
        lightbox.appendChild(lightboxSVG)

        lightbox.classList.remove('hidden');

        lightbox.addEventListener('click', e => {
            lightbox.classList.add('hidden')
            lightboxSVG.remove()
        })
    })

    console.log(img_div)
}