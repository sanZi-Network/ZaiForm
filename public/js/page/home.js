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
        .home > .intro .buttons {
            display: flex;
            flex-wrap: wrap;
        }
        .home > .intro a {
            font-size: 1.5rem;
            font-weight: 600;
            color: #fff;
            background: #005fd4;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            margin-top: 1rem;
            text-decoration: none;
            border: 3px #005fd4 solid;
            margin-right: 5px;
        }
        .home > .intro a:hover {
            background: #3e67ff;
            border: 3px #3e67ff solid;
        }
        .home > .intro a.special {
            background-color: unset;
            color: var(--color-font);
        }
        .home > .intro a.special:hover {
            background-color: var(--color-button-blur-bg);
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
            background-color: var(--color-card-bg);
            border-radius: 15px;
            margin: 15px;
            flex: 1;
            min-width: 235px;
        }
        .home .features .feature .intro p {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--color-card-text);
        }
        .home .features .feature .intro h2 {
            margin-bottom: 30px;
            color: var(--color-card-text);
        }
        .home .features .feature .intro i {
            color: var(--color-card-text);
        }
        .home .features .feature .intro a {
            color: var(--color-card-a);
        }
    `);
    setContent(`
        <div class="home">
            <div class="intro">
                <h1>The <font style="color: #42a5f5;">Easy</font> Way To Create <font style="color: #f5c642;">Forms</font>!</h1>
                <p>Tired of making <font style="color: #42a5f5;">awesome</font> forms with <font style="color: #ff382c;">Bad Form App</font>? Try ZaiForm, this form program will give you the <font style="color: #42a5f5;">best experience</font>.</p>
                <div class="buttons">
                    <a href="/create">Get Started</a>
                    ${window.userInfo ? `<a href="/dashboard" class="special">Manage Your Forms</a>` : ""}
                </div>
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
                        <i class="fa-solid fa-paint-roller"></i>
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