window.execute = async () => {
    if (!window.userInfo) goPage("/login");

    const userName = window.userInfo.name;
    const userEmail = window.userInfo.email;
    const userID = window.userInfo.id;

    setStyle(`
        section {
            justify-content: unset !important;
            display: block !important;
        }
        .section .md {
            margin: 0 auto;
            width: 100%;
        }
        .page { 
            margin-top: 50px;
            width: 80%;
        }
        a.btn {
            color: #fff;
            background: #3e67ff;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            display: block;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }
        .dashBoxList {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 50px;
        }
        .dashBoxList div {
            flex: 1 1 auto;
        }
        .dashBox {
            padding: 20px;
            margin: 10px;
            background-color: var(--color-card-bg);
            border-radius: 15px;
            min-width: 300px;
            color: var(--color-card-text) !important;
        }
        .dashBox .dashBoxHeader {
            margin-bottom: 15px;
            color: var(--color-card-text);
        }
        .dashBox .dashBoxBody h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--color-card-text);
        }
        .dashBox .dashBoxHeader h2,
        .dashBox .dashBoxBody h2,
        .dashBox .dashBoxBody p,
        .dashBox .dashBoxBody div {
            color: var(--color-card-text) !important;
        }
    `);
    setContent(`
        <div class="home">
            <div class="intro">
                <h1>ZaiForm Dashboard</h1>
            </div>
            <div class="dashBoxList" style="width: 100%;">
                <div>
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Fast Options</h2>
                        </div>
                        <div class="dashBoxBody">
                            <a class="btn" href="/create">Create New Form</a>
                        </div>
                    </div>
                    <div class="dashBox">
                        <div class="dashBoxHeader">
                            <h2>Profile</h2>
                        </div>
                        <div class="dashBoxBody">
                            <h1>${userName}</h1>
                            <p style="font-size: .5rem; font-weight: 600;">${userID}</p>
                            <a class="btn">Edit Profile</a>
                        </div>
                    </div>
                </div>
                <div class="dashBox" style="flex: 10 1 auto;width: 60%;">
                    <div class="dashBoxHeader">
                        <h2>Your Forms</h2>
                    </div>
                    <div class="dashBoxBody">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nunc faucibus est tortor, a tincidunt velit sodales condimentum.In luctus lacus dictum diam auctor porta.Donec accumsan lacinia mauris, sit amet tincidunt ex tempor et.Aenean hendrerit, est ut fringilla convallis, tellus orci sodales massa, ornare semper justo massa quis turpis.Sed consectetur odio non nisi imperdiet vestibulum.Fusce sed tortor dignissim, ullamcorper lacus quis, condimentum ipsum.In hac habitasse platea dictumst.

                        Phasellus et neque fringilla, venenatis nulla eget, commodo felis.Etiam cursus, libero vitae maximus placerat, neque felis luctus purus, quis lobortis mauris mauris in libero.Duis id ante eget urna interdum laoreet at eget neque.Sed at aliquam dui.Donec nibh velit, commodo et fringilla eu, eleifend aliquet lorem.Pellentesque faucibus, dui quis mollis elementum, sem dui vehicula lectus, malesuada aliquam tortor risus id justo.Etiam sed tincidunt eros.Duis quis augue porta, tristique odio sed, lacinia mi.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

                        Nullam condimentum aliquet lectus eget faucibus.Cras congue gravida neque, ac ullamcorper odio dignissim at.Donec pulvinar fermentum nunc, at tincidunt eros elementum ultricies.In rutrum eget nunc et interdum.Quisque ultrices lorem mollis, pharetra turpis a, aliquet urna.In elementum viverra nulla et auctor.Donec rhoncus ut turpis eget vulputate.

                        Sed dignissim quis velit nec lobortis.Phasellus id semper arcu.Integer ac ante tempus, accumsan nunc at, convallis nisl.Nunc consequat nisi mollis, dictum massa eu, convallis nunc.Donec pellentesque dictum commodo.Duis molestie, sapien id pharetra pharetra, velit lorem sodales magna, eget dictum lacus lorem sed lacus.Curabitur finibus dapibus elit, eget tristique turpis accumsan nec.In eu augue felis.Vestibulum pulvinar justo turpis.Donec pretium felis est.

                        Ut leo nibh, ullamcorper eu ipsum a, commodo condimentum urna.Integer orci mi, imperdiet pellentesque velit ut, aliquam ornare sapien.Etiam in risus accumsan, lobortis lectus scelerisque, maximus nunc.Sed nunc magna, semper et urna ut, interdum tempor dolor.Aenean id nibh malesuada, posuere purus at, pellentesque sem.Nulla nec malesuada sapien.Phasellus accumsan nibh sed tincidunt tincidunt.Duis nec elit pellentesque, tincidunt nibh nec, tincidunt magna.Vivamus a leo pharetra, pretium tortor a, vulputate mi.Sed hendrerit tincidunt ante vel faucibus.Sed consequat risus non mollis tincidunt.</p>
                    </div>
                </div>
            </div>
        </div>
    `);
}