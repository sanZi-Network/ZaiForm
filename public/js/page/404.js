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
    
    // Life Code:
    // MTAyNjgsMTQ3MTQsMTU2MjYsNTcwOCwxNDAz
    // MCwxNTI4NCw1NzA4LDE0MzcyLDE0NzE0LDE0
    // NjAwLDEzODAyLDU3MDgsMTQwMzAsMTUxNzAs
    // MTQ2MDAsNjUwNiwxNTI4NCw1NzA4LDE0MDMw
    // LDE0NDg2LDE0ODI4LDE0NzE0LDE1MDU2LDE1
    // Mjg0LDEzMTE4LDE0NjAwLDE1Mjg0LDU3MDgs
    // MTMxMTgsMTUyODQsNTcwOCwxMzExOCwxNDM3
    // MiwxNDM3Miw3MDc2LDU3MDgsMTMyMzIsMTUz
    // OTgsMTUyODQsNTcwOCwxNTYyNiwxMzkxNiwx
    // MzExOCwxNTI4NCw1NzA4LDE1NTEyLDEzMTE4
    // LDE0MzcyLDE1Mzk4LDEzNTc0LDU3MDgsMTQw
    // MzAsMTUyODQsNTcwOCwxMzM0NiwxNTA1Niwx
    // MzU3NCwxMzExOCwxNTI4NCwxMzU3NCwxNTE3
    // MCw3MzA0LDU3MDgsOTQ3MCwxNTE3MCw1NzA4
    // LDE0MDMwLDE1Mjg0LDU3MDgsMTQzNzIsMTQw
    // MzAsMTQyNTgsMTM1NzQsMTUxNzAsNTcwOCwx
    // NTg1NCwxNDcxNCwxNTM5OCwxNTA1Niw1NzA4
    // LDE0ODI4LDE0MzcyLDEzNTc0LDEzMTE4LDE1
    // MTcwLDE1Mzk4LDE1MDU2LDEzNTc0LDczMDQs
    //
    // Tips: encode 2^6, CaF2 and eyes, Machine Learning, Strings.

    var lfCode = ["MTAyNjgsMTQ3MTQsMTU2MjYsNTcwOCwxNDAz", "MCwxNTI4NCw1NzA4LDE0MzcyLDE0NzE0LDE0", "NjAwLDEzODAyLDU3MDgsMTQwMzAsMTUxNzAs", "MTQ2MDAsNjUwNiwxNTI4NCw1NzA4LDE0MDMw", "LDE0NDg2LDE0ODI4LDE0NzE0LDE1MDU2LDE1", "Mjg0LDEzMTE4LDE0NjAwLDE1Mjg0LDU3MDgs", "MTMxMTgsMTUyODQsNTcwOCwxMzExOCwxNDM3", "MiwxNDM3Miw3MDc2LDU3MDgsMTMyMzIsMTUz", "OTgsMTUyODQsNTcwOCwxNTYyNiwxMzkxNiwx", "MzExOCwxNTI4NCw1NzA4LDE1NTEyLDEzMTE4", "LDE0MzcyLDE1Mzk4LDEzNTc0LDU3MDgsMTQw", "MzAsMTUyODQsNTcwOCwxMzM0NiwxNTA1Niwx", "MzU3NCwxMzExOCwxNTI4NCwxMzU3NCwxNTE3", "MCw3MzA0LDU3MDgsOTQ3MCwxNTE3MCw1NzA4", "LDE0MDMwLDE1Mjg0LDU3MDgsMTQzNzIsMTQw", "MzAsMTQyNTgsMTM1NzQsMTUxNzAsNTcwOCwx", "NTg1NCwxNDcxNCwxNTM5OCwxNTA1Niw1NzA4", "LDE0ODI4LDE0MzcyLDEzNTc0LDEzMTE4LDE1", "MTcwLDE1Mzk4LDE1MDU2LDEzNTc0LDczMDQs"];
    console.clear();
    console.log("What is the feeling in your heart?");
    console.log("");
    for (var i = 0; i < lfCode.length; i++) {
        console.log(lfCode[i]);
    }

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