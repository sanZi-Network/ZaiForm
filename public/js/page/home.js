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
        .home > .intro a {
            font-size: 1.5rem;
            font-weight: 600;
            color: #fff;
            background: #00bcd4;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            margin-top: 1rem;
            text-decoration: none;
        }
        .home .features {
            margin-top: 100px;
        }
        .home .features .feature {
            margin-bottom: 1rem;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
        .home .features .feature .intro {
            font-size: 1.5rem;
            font-weight: 600;
            padding: 30px;
            background-color: #37474f;
            border-radius: 15px;
            margin: 15px;
            flex: 1;
            min-width: 235px;
        }
        .home .features .feature .intro p {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        .home .features .feature .intro h1 {
            margin-bottom: 15px;
        }
    `);
    setContent(`
        <div class="home">
            <div class="intro">
                <h1>The <font style="color: #42a5f5;">Easy</font> Way To Create <font style="color: #f5c642;">Forms</font>!</h1>
                <p>Tired of creating <font style="color: #42a5f5;">awesome</font> forms? Try ZaiForm, this form program will give you the <font style="color: #42a5f5;">best experience</font>.</p>
                <a href="/">Get Started</a>
            </div>
            <div class="features">
                <div class="feature">
                    <div class="intro">
                        <i class="fas fa-code"></i>
                        <h2>Easy to use</h2>
                        <p>ZaiForm is easy to use, you can create forms in seconds.</p>
                        <a href="/create">Learn more</a>
                    </div>
                    <div class="intro">
                        <i class="fas fa-chart-line"></i>
                        <h2>Analytics</h2>
                        <p>ZaiForm has built-in analytics, you can see how your forms performance.</p>
                        <a href="/create">Learn more</a>
                    </div>
                    <div class="intro">
                        <i class="fas fa-code"></i>
                        <h2>Customizable</h2>
                        <p>ZaiForm is customizable, you can change the style of your forms.</p>
                        <a href="/create">Learn more</a>
                    </div>
                    <div class="intro">
                        <i class="fa-brands fa-github"></i>
                        <h2>Open Source</h2>
                        <p>ZaiForm is open source, feel freely to use it.</p>
                        <a href="https://github.com/sanZi-Network/ZaiForm">Check it Out!</a>
                    </div>
                </div>
            </div>
        </div>
    `);
}