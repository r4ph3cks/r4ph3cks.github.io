(function () {
    var layer = document.querySelector("[data-duck-scroll], [data-duck-field]");
    if (!layer) {
        return;
    }

    var duckArt = [
        "  __\n<(o )___\n ( ._> /\n  `---' ",
        "   _\n __( ' )>\n \\_ < _\n  /___/"
    ];
    var host = layer.closest(".writeup-page, #post-index");
    var hostHeight = Math.max(host ? host.scrollHeight : 0, 1);
    var columnCount = Math.max(8, Math.ceil(window.innerWidth / 140));
    var rowHeight = 120;
    var rowCount = Math.max(3, Math.ceil(hostHeight / rowHeight));
    var actualRowHeight = hostHeight / rowCount;
    var columnWidth = 100 / columnCount;

    for (var row = 0; row < rowCount; row += 1) {
        for (var column = 0; column < columnCount; column += 1) {
            var duck = document.createElement("span");
            var verticalOffset = (column % 3 - 1) * 28;
            var isCenter = column > 2 && column < columnCount - 3;

            duck.className = "ascii-duck scroll-duck" +
                (isCenter ? " scroll-duck--center" : "");
            duck.textContent = duckArt[(row + column) % duckArt.length];
            duck.style.top = (row * actualRowHeight + verticalOffset) + "px";
            duck.style.left = ((column + 0.5) * columnWidth) + "%";
            duck.style.setProperty("--duck-tilt", ((row + column) % 2 ? "5deg" : "-5deg"));
            layer.appendChild(duck);
        }
    }

    if (!("IntersectionObserver" in window)) {
        layer.querySelectorAll(".scroll-duck").forEach(function (duck) {
            duck.classList.add("is-visible");
        });
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
