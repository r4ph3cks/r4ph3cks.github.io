(function () {
    var layer = document.querySelector("[data-duck-scroll], [data-duck-field]");
    if (!layer) {
        return;
    }

    var duckArt = [
        "  __\n<(o )___\n ( ._> /\n  `---' ",
        "   _\n __( ' )>\n \\_ < _\n  /___/"
    ];
    var count = 74;
    var host = layer.closest(".writeup-page, #post-index");
    var hostHeight = host ? host.scrollHeight : 0;

    for (var index = 0; index < count; index += 1) {
        var duck = document.createElement("span");
        duck.className = "ascii-duck scroll-duck--" + (index % 2 ? "right" : "left");
        duck.textContent = duckArt[index % duckArt.length];
        duck.style.top = (index * hostHeight / count) + "px";
        duck.style.setProperty("--duck-tilt", (index % 2 ? "5deg" : "-5deg"));
        layer.appendChild(duck);
    }

    if (!("IntersectionObserver" in window)) {
        layer.classList.add("is-visible");
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    }, { rootMargin: "0px 0px -12% 0px" });

    layer.querySelectorAll(".scroll-duck").forEach(function (duck) {
        observer.observe(duck);
    });
}());
