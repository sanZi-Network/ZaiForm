window.execute = async () => {
    setStyle(`
        .page {
            margin: 0 auto;
            margin-top: 100px;
        }
        .home .intro h1 {
            font-size: 5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }
        .home .intro p {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5em;
        }
    `);
    setContent(`
        <div class="home">
            <div class="intro">
                <h1>Oops! You Found A <font id="secr">Secret Page</font>!</h1>
                <p>This page is not available. Please go back to the <a href="/">home page</a>.</p>
            </div>
        </div>
    `);

    // #secr color
    function makeColor() {
        var myWebColors = ['#ffbb00', '#c3ff00', '#9500ff', '#0044ff', '#00ff80', '#ff0073', '#ff6f00', '#0088ff', '#5900ff'];
        var randomColor = myWebColors[Math.floor(Math.random() * myWebColors.length)];
        
        return randomColor;
    }
    setInterval(() => {
        var secr = document.querySelector("#secr");
        if (!secr) return;
        secr.style.color = makeColor();
    }, 500);
}