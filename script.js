document.addEventListener('DOMContentLoaded', () => {
    const API = 'http://localhost:3000';

    const form = document.getElementById('submitMessage');
    const formSubscibe = document.getElementById('subscribeForm');


    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await fetch(`${API}/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: form.firstName.value,
                    lastName: form.lastName.value,
                    email: form.email.value,
                    message: form.message.value,
                    agreement: form.agreement.checked
                })
            });
            form.reset();
        });
    }

    if (formSubscibe) {
        formSubscibe.addEventListener('submit', async (e) => {
            e.preventDefault();
            await fetch(`${API}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formSubscibe.email.value
                })
            });
            formSubscibe.reset();
        });
    }

    const buttons = document.querySelectorAll('.products__button');
    const cards = document.querySelectorAll('.products__card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Сначала скрываем все карточки
            cards.forEach(card => {
                card.classList.add('visually-hidden');
            });

            let selectedCards = [];

            if (filter === 'cat' || filter === 'fish') {
                selectedCards = Array.from(cards).slice(0, 3);
            } else if (filter === 'dog' || filter === 'bird') {
                selectedCards = Array.from(cards).slice(-3);
            } else if (filter === 'random') {
                selectedCards = Array.from(cards)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
            }

            selectedCards.forEach(card => {
                card.classList.remove('visually-hidden');
            });
        });
    });

    //viewmore

    const viewMoreButton = document.querySelectorAll('.products__button[data-filter]');
    const viewMoreCards = document.querySelectorAll('.products__card');
    const viewMoreBtn = document.getElementById('viewMoreBtn');

    let isExpanded = false; // флаг состояния кнопки

    viewMoreButton.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            isExpanded = false; // сбрасываем состояние
            viewMoreBtn.textContent = 'View More';

            viewMoreCards.forEach(card => {
                card.classList.add('visually-hidden');
            });

            let selectedCards = [];

            if (filter === 'cat') {
                selectedCards = Array.from(viewMoreCards).slice(0, 3);
            } else if (filter === 'dog') {
                selectedCards = Array.from(viewMoreCards).slice(-3);
            } else if (filter === 'random') {
                selectedCards = Array.from(viewMoreCards)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
            }

            selectedCards.forEach(card => {
                card.classList.remove('visually-hidden');
            });

            viewMoreBtn.style.display = 'block';
        });
    });

    viewMoreBtn.addEventListener('click', () => {
        const allCards = Array.from(viewMoreCards);

        if (!isExpanded) {
            // Показать все карточки
            allCards.forEach(card => {
                card.classList.remove('visually-hidden');
            });
            viewMoreBtn.textContent = 'View Less >>>';
            isExpanded = true;
        } else {
            // Скрыть нижние 3 карточки, оставить верхние 3
            allCards.forEach((card, index) => {
                card.classList.toggle('visually-hidden', index >= 3);
            });
            viewMoreBtn.textContent = 'View More >>>';
            isExpanded = false;
        }
    });

    function initVideo() {
        const allVideoCards = document.querySelectorAll('.blog__video');

        allVideoCards.forEach(videoContainer => {
            const previewImg = videoContainer.querySelector('.blog__preview-img');
            const video = videoContainer.querySelector('.blog__preview-video');
            const playBtn = videoContainer.querySelector('.blog__play-button');
            const playIcon = videoContainer.querySelector('.blog__play-icon');
            const pauseIcon = videoContainer.querySelector('.blog__pause-icon');

            playBtn.addEventListener('click', () => {
                if (video.paused) {
                    allVideoCards.forEach(vc => {
                        const otherVideo = vc.querySelector('.blog__preview-video');
                        const otherImg = vc.querySelector('.blog__preview-img');
                        const otherPlayIcon = vc.querySelector('.blog__play-icon');
                        const otherPauseIcon = vc.querySelector('.blog__pause-icon');

                        otherVideo.pause();
                        otherVideo.currentTime = 0;
                        otherVideo.style.display = 'none';
                        otherImg.style.display = 'block';
                        otherPlayIcon.style.display = 'block';
                        otherPauseIcon.style.display = 'none';
                    });

                    previewImg.style.display = 'none';
                    video.style.display = 'block';
                    video.currentTime = 0;
                    video.play();

                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';

                } else {
                    video.pause();
                    video.currentTime = 0;
                    video.style.display = 'none';
                    previewImg.style.display = 'block';

                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                }
            });

            video.addEventListener('ended', () => {
                video.style.display = 'none';
                previewImg.style.display = 'block';
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            });
        });
    }

    initVideo();
});