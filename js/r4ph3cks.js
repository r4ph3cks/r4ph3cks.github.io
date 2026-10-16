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
    var columnsPerSide = 3;
    var rowHeight = 120;
    var rowCount = Math.max(3, Math.ceil(hostHeight / rowHeight));
    var actualRowHeight = hostHeight / rowCount;
    var columnOffsets = [-145, -75, -5];

    for (var row = 0; row < rowCount; row += 1) {
        for (var side = 0; side < 2; side += 1) {
            for (var column = 0; column < columnsPerSide; column += 1) {
                var duck = document.createElement("span");
                var isRight = side === 1;
                var verticalOffset = (column - 1) * 28;
                var horizontalOffset = columnOffsets[column];

                duck.className = "ascii-duck scroll-duck scroll-duck--" +
                    (isRight ? "right" : "left");
                duck.textContent = duckArt[(row + column + side) % duckArt.length];
                duck.style.top = (row * actualRowHeight + verticalOffset) + "px";
                duck.style.setProperty("--duck-offset", horizontalOffset + "px");
                duck.style.setProperty("--duck-tilt", ((row + column) % 2 ? "5deg" : "-5deg"));
                layer.appendChild(duck);
            }
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
