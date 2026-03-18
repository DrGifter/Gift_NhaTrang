document.addEventListener('DOMContentLoaded', () => {
    const initLoadMore = (gridSelector, btnId) => {
        const grid = document.querySelector(gridSelector);
        if (!grid) return;
        const cards = Array.from(grid.querySelectorAll('.card'));
        const btn = document.getElementById(btnId);

        let initialCount = window.innerWidth > 1024 ? 3 : 2;
        let currentCount = initialCount;

        cards.forEach((card, index) => {
            if (index >= initialCount) {
                card.classList.add('card-hidden');
            }
        });

        if (cards.length <= initialCount) {
            btn.parentElement.style.display = 'none';
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let added = 0;
            let addedLimit = window.innerWidth > 1024 ? 3 : 2;

            for (let i = currentCount; i < cards.length && added < addedLimit; i++) {
                cards[i].classList.remove('card-hidden');
                setTimeout(() => {
                    cards[i].classList.add('visible');
                }, 50);
                added++;
            }
            currentCount += added;

            if (currentCount >= cards.length) {
                btn.parentElement.style.display = 'none';
            }
        });
    };

    initLoadMore('#places .grid', 'loadMorePlaces');
    initLoadMore('#food .grid', 'loadMoreFood');

    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navbar.classList.toggle('menu-active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navbar.classList.remove('menu-active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });

    const bg1 = document.getElementById('bg1');
    const bg2 = document.getElementById('bg2');
    const banners = [];

    for (let i = 1; i <= 9; i++) {
        banners.push(`img/banner/Banner (${i}).jpg`);
    }
    let currentBanner = 0;
    let isBg1Active = true;

    bg1.style.backgroundImage = `url('${banners[0]}')`;
    bg2.style.backgroundImage = `url('${banners[1]}')`;

    setInterval(() => {
        currentBanner = (currentBanner + 1) % banners.length;
        const nextBanner = banners[(currentBanner + 1) % banners.length];

        if (isBg1Active) {
            bg2.style.backgroundImage = `url('${banners[currentBanner]}')`;
            bg2.classList.add('active');
            bg1.classList.remove('active');
        } else {
            bg1.style.backgroundImage = `url('${banners[currentBanner]}')`;
            bg1.classList.add('active');
            bg2.classList.remove('active');
        }

        isBg1Active = !isBg1Active;
    }, 5000);

    // Modal Details Logic
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModal = document.querySelector('.close-modal');

    const extendedInfo = {
        "VinWonders Nha Trang": {
            desc: "VinWonders Nha Trang là thiên đường giải trí được thiết kế theo mô hình công viên giải trí 'tất cả trong một'. Tại đây có hệ thống cáp treo vượt biển, công viên nước hiện đại, thủy cung với hàng ngàn sinh vật quý hiếm và các show diễn nghệ thuật đẳng cấp thế giới.",
            location: "Đảo Hòn Tre, Vĩnh Nguyên, Nha Trang",
            hours: "08:30 - 21:00",
            map: "VinWonders+Nha+Trang"
        },
        "Tháp Bà Ponagar": {
            desc: "Quần thể kiến trúc Chăm Pa này là minh chứng sống động cho thời kỳ hưng thịnh của vương quốc cổ. Tháp nằm trên đồi Cù Lao, nơi du khách có thể ngắm toàn cảnh sông Cái và thưởng thức các vũ điệu Chăm truyền thống.",
            location: "2 Tháng 4, Vĩnh Phước, Nha Trang",
            hours: "06:00 - 18:00",
            map: "Tháp+Bà+Ponagar"
        },
        "Tháp Trầm Hương": {
            desc: "Được coi là biểu tượng lãng mạn của thành phố, Tháp Trầm Hương mang dáng dấp của búp sen hồng rực rỡ bên bờ biển. Bên trong tháp trưng bày nhiều hình ảnh và sản vật địa phương đặc trưng.",
            location: "Quảng trường 2/4, Lộc Thọ, Nha Trang",
            hours: "Mở cửa cả ngày (Bên trong: 08:00 - 20:00)",
            map: "Tháp+Trầm+Hương"
        },
        "Viện Hải Dương Học": {
            desc: "Là cơ sở nghiên cứu biển lớn nhất Đông Nam Á, nơi lưu giữ hơn 20.000 mẫu vật của hơn 4.000 loại sinh vật biển và động vật quý hiếm, nổi bật nhất là bộ xương cá voi khổng lồ dài 26m.",
            location: "01 Cầu Đá, TP. Nha Trang",
            hours: "06:00 - 18:00",
            map: "Viện+Hải+dương+học"
        },
        "Nhà thờ Chánh tòa": {
            desc: "Còn gọi là Nhà thờ Đá, công trình mang nét kiến trúc Gothic Pháp đậm nét with những khối đá sừng sững, cửa sổ màu rực rỡ và không gian yên bình, tôn nghiêm giữa lòng thành thị.",
            location: "31 Thái Nguyên, Phước Tân, Nha Trang",
            hours: "05:30 - 17:00",
            map: "Nhà+thờ+Chánh+tòa+Nha+Trang"
        },
        "Nhà hát Đó": {
            desc: "Một công trình nghệ thuật mang tính biểu tượng mới của Nha Trang. Với kiến trúc hình chiếc Đó khổng lồ, nơi đây tổ chức các show diễn Rối Mơ độc đáo kết hợp âm nhạc bản địa và nghệ thuật đương đại.",
            location: "Vega City, Bãi Tiên, Nha Trang",
            hours: "09:00 - 22:00",
            map: "Nhà+hát+Đó"
        },
        "Yến sào": {
            desc: "Yến sào Nha Trang được đánh giá có chất lượng tốt nhất nhờ điều kiện tự nhiên tại các đảo yến. Đây là thực phẩm bổ dưỡng cực kỳ quý giá, thường được dùng để bồi bổ sức khỏe và làm quà tặng sang trọng.",
            location: "Sản xuất tại các đảo yến (Khánh Hòa)",
            hours: "Các showroom mở cửa từ 08:00 - 21:00",
            map: "Yến+Sào+Khánh+Hòa"
        },
        "Bún sứa": {
            desc: "Sứa dùng làm bún phải là loại sứa chân, màu trắng đục, dày và giòn. Nước dùng được nấu từ cá liệt, không dầu mỡ, tạo nên vị thanh ngọt tự nhiên khó quên.",
            location: "Các quán tại đường Phan Bội Châu, Ngô Gia Tự...",
            hours: "07:00 - 22:00",
            map: "Bún+sứa+Nha+Trang"
        },
        "Bánh ướt": {
            desc: "Bánh ướt Diên Khánh nổi tiếng với độ mỏng, dai và mùi thơm của gạo mới. Ăn kèm xì dầu, mỡ hành và tôm cháy tạo nên hương vị mộc mạc nhưng cực kỳ lôi cuốn.",
            location: "Thị trấn Diên Khánh, Nha Trang",
            hours: "06:00 - 10:00 & 16:00 - 22:00",
            map: "Bánh+ướt+Diên+Khánh"
        }
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const img = card.querySelector('img').src;
            const shortDesc = card.querySelector('p').innerText;
            const category = card.dataset.category;
            const folder = card.dataset.folder;

            const info = extendedInfo[title] || { desc: shortDesc, location: "Đang cập nhật", hours: "Đang cập nhật", map: title };

            modalTitle.innerText = title;
            modalImg.src = img;
            modalDesc.innerText = info.desc;
            document.getElementById('modalLocation').innerHTML = `<i class="fa-solid fa-location-dot" style="color: var(--secondary-color); margin-right: 8px;"></i> Vị trí: ${info.location}`;
            document.getElementById('modalHours').innerHTML = `<i class="fa-solid fa-clock" style="color: var(--secondary-color); margin-right: 8px;"></i> Giờ mở cửa: ${info.hours}`;
            const mapIframe = document.getElementById('mapIframe');
            mapIframe.src = `https://www.google.com/maps?q=${info.map}&output=embed`;

            const gallery = document.getElementById('modalGallery');
            gallery.innerHTML = '';

            for (let i = 1; i <= 5; i++) {
                const thumbImg = document.createElement('img');
                thumbImg.src = `img/${category}/${folder}/Anh (${i}).jpg`;
                thumbImg.alt = `${title} - Image ${i}`;
                thumbImg.addEventListener('click', () => {
                    modalImg.src = thumbImg.src;
                });
                gallery.appendChild(thumbImg);
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) modalBody.scrollTop = 0;
        });
    });

    function program(delay = 200) {
        (function () {
            const _b = (s) => decodeURIComponent(escape(atob(s)));
            const _d = [
                "QuG6o24gcXV54buBbiB0aHXhu5ljIHbhu4IgRHIuR2lmdGVy",
                "VGlrdG9rOiBodHRwczovL3d3dy50aWt0b2suY29tL0Bkci5naWZ0ZXIzMDY=",
                "R2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vRHJHaWZ0ZXI="
            ];

            setTimeout(() => {
                _d.forEach(x => console.log(_b(x)));
            }, delay);
        })();
    }

    const hideModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeModal) closeModal.addEventListener('click', hideModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .section-title, .card, .about-segment, .milestone').forEach(el => {
        scrollObserver.observe(el);
    });

    document.querySelectorAll('.read-more-btn').forEach(btn => {
        let currentLines = 3;
        btn.addEventListener('click', function () {
            const segment = this.parentElement;
            const textEl = segment.querySelector('p');

            currentLines += 3;
            textEl.style.display = '-webkit-box';
            textEl.style.webkitLineClamp = currentLines;
            textEl.style.lineClamp = currentLines;
            textEl.style.webkitBoxOrient = 'vertical';

            if (currentLines >= 20) {
                this.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    program();
});
