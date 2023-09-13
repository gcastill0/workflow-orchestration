const track_pages = [
    [
        "slide-1",
        "slide-2",
        "slide-3",
        "slide-4",
        "slide-5",
        "slide-6",
        "slide-7",
        "slide-8",
        "slide-9",
        "slide-10"
    ]
];

const current_page = (location.href.split("/").slice(-1)[0]).split(".")[0];

var challenge_pages;

function find_section(pageName) {
    track_pages.forEach(section => {
        if (section.indexOf(pageName) !== -1) {
            challenge_pages = section;
        }
    })
}

find_section(current_page);

function isCurrentPage(pageName) {
    return current_page === pageName;
}

function setNextPage(nextPage) {
    const next_page = document.createElement('div');
    const next_url = "../html/" + nextPage + ".html";
    next_page.classList.add("next");
    next_page.addEventListener("click", function () {
        window.location.replace(next_url);
    });
    document.body.appendChild(next_page);
}

function setLastPage(lastPage) {
    const last_page = document.createElement('div');
    const last_url = "../html/" + lastPage + ".html";
    last_page.classList.add("last");
    last_page.addEventListener("click", function () {
        window.location.replace(last_url);
    });
    document.body.appendChild(last_page);
}

for (let i = 0; i < challenge_pages.length; i++) {
    if (isCurrentPage(challenge_pages[i])) {
        if (i == 0 && (i + 1) < challenge_pages.length) {
            setNextPage(challenge_pages[i + 1]);
        } else if (i == (challenge_pages.length - 1) && challenge_pages.length > 1 && i >= 0) {
            setLastPage(challenge_pages[i - 1]);
        } else if (challenge_pages.length > 1) {
            setNextPage(challenge_pages[i + 1]);
            setLastPage(challenge_pages[i - 1]);
        }
    }
}