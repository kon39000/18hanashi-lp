// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// エピソードデータ（サンプル）
const episodes = [
    {
        number: 1,
        title: "ゲスト：sotaro「はじめまして！18歳の自分へ」",
        date: "2024.01.01",
        description: "記念すべき第1回は、ゲストにsotaroさんをお迎えして、18歳の頃の自分に伝えたいメッセージを語ります。",
        thumbnail: "episode-placeholder.jpg",
        youtubeLink: "https://youtu.be/KQCrMqFZtWo?si=2KVp_SCXPSM6XnoU",
        spotifyLink: "https://open.spotify.com/show/2HKE3Dth7Vsro6s89AGwXt"
    },
    {
        number: 2,
        title: "大学受験で学んだこと",
        date: "2024.01.08",
        description: "受験の成功と失敗、そこから学んだ人生の教訓について。",
        thumbnail: "episode-placeholder.jpg",
        youtubeLink: "https://www.youtube.com/@18hanashi",
        spotifyLink: "https://open.spotify.com/show/2HKE3Dth7Vsro6s89AGwXt"
    },
    {
        number: 3,
        title: "初めての就職活動",
        date: "2024.01.15",
        description: "就活で感じた不安と、今だから言える本当に大切なこと。",
        thumbnail: "episode-placeholder.jpg",
        youtubeLink: "https://www.youtube.com/@18hanashi",
        spotifyLink: "https://open.spotify.com/show/2HKE3Dth7Vsro6s89AGwXt"
    },
    {
        number: 4,
        title: "友人関係の築き方",
        date: "2024.01.22",
        description: "18歳の頃の友人関係と、大人になってからの友情について。",
        thumbnail: "episode-placeholder.jpg",
        youtubeLink: "https://www.youtube.com/@18hanashi",
        spotifyLink: "https://open.spotify.com/show/2HKE3Dth7Vsro6s89AGwXt"
    },
    {
        number: 5,
        title: "初めての失恋",
        date: "2024.01.29",
        description: "恋愛で学んだこと、失恋から立ち直る方法。",
        thumbnail: "episode-placeholder.jpg",
        youtubeLink: "https://www.youtube.com/@18hanashi",
        spotifyLink: "https://open.spotify.com/show/2HKE3Dth7Vsro6s89AGwXt"
    },
    {
        number: 6,
        title: "お金の使い方",
        date: "2024.02.05",
        description: "18歳の頃に知っておきたかったお金の知識。",
        thumbnail: "episode-placeholder.jpg",
        youtubeLink: "https://www.youtube.com/@18hanashi",
        spotifyLink: "https://open.spotify.com/show/2HKE3Dth7Vsro6s89AGwXt"
    }
];

// エピソードカードを生成する関数
function createEpisodeCard(episode) {
    const spotifyLink = episode.spotifyLink || "https://open.spotify.com/show/2HKE3Dth7Vsro6s89AGwXt";
    const youtubeLink = episode.youtubeLink || "https://www.youtube.com/@18hanashi";
    
    return `
        <div class="episode-card">
            <div class="episode-thumbnail">
                <img src="${episode.thumbnail}" alt="Episode ${episode.number}">
            </div>
            <div class="episode-content">
                <span class="episode-number">Episode ${episode.number}</span>
                <h3 class="episode-title">${episode.title}</h3>
                <p class="episode-date">${episode.date}</p>
                <p class="episode-description">${episode.description}</p>
                <div class="episode-links">
                    <a href="${spotifyLink}" target="_blank" class="link-spotify">
                        <i class="fab fa-spotify"></i> Spotify
                    </a>
                    <a href="${youtubeLink}" target="_blank" class="link-youtube">
                        <i class="fab fa-youtube"></i> YouTube
                    </a>
                </div>
            </div>
        </div>
    `;
}

// エピソード表示管理
let displayedEpisodes = 3;
const episodesGrid = document.querySelector('.episodes-grid');
const loadMoreBtn = document.getElementById('loadMore');

// 初期表示
function displayEpisodes() {
    episodesGrid.innerHTML = '';
    const episodesToShow = episodes.slice(0, displayedEpisodes);
    episodesToShow.forEach(episode => {
        episodesGrid.innerHTML += createEpisodeCard(episode);
    });
    
    // もっと見るボタンの表示/非表示
    if (displayedEpisodes >= episodes.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

// もっと見るボタンのクリックイベント
loadMoreBtn.addEventListener('click', () => {
    displayedEpisodes += 3;
    displayEpisodes();
});

// 初期表示実行
displayEpisodes();

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 監視する要素を追加
document.querySelectorAll('.mc-card, .episode-card').forEach(el => {
    observer.observe(el);
});

// ページ読み込み時のアニメーション
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});