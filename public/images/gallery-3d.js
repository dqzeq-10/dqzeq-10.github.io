document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra nếu GSAP đã được tải
    if (typeof gsap === 'undefined') {
        console.error('GSAP chưa được tải. Vui lòng kiểm tra lại.');
        return;
    }

    // Đường dẫn hình ảnh từ thư mục images-dieubinh
    const imagePaths = [
        'images/images-dieubinh/3.jpg',
        'images/images-dieubinh/4.jpg',
        'images/images-dieubinh/5.jpg',
        'images/images-dieubinh/6.jpg',
        'images/images-dieubinh/7.jpg',
        'images/images-dieubinh/8.jpg',
        'images/images-dieubinh/9.jpg',
        'images/images-dieubinh/10.jpg',
        'images/images-dieubinh/11.jpg',
        'images/images-dieubinh/12.jpg',
        'images/images-dieubinh/13.jpg',
        'images/images-dieubinh/14.jpg',
        'images/images-dieubinh/15.jpg',
        'images/images-dieubinh/16.jpg',
        'images/images-dieubinh/17.jpg',
        'images/images-dieubinh/18.jpg',
        'images/images-dieubinh/19.jpg',
        'images/images-dieubinh/20.jpg',
        'images/images-dieubinh/21.jpg',
        'images/images-dieubinh/24.jpg',
    ];

    let xPos = 0;
    const ring = document.querySelector('.gallery-3d-ring');
    const images = document.querySelectorAll('.gallery-3d-img');

    if (!ring || !images.length) {
        console.error('Gallery 3D elements not found');
        return;
    }

    // Thiết lập ban đầu
    gsap.set(ring, { rotationY: 180, cursor: 'grab' });

    const rotationAngle = 360 / images.length;
    const circleRadius = 1000;



    // Thiết lập vị trí và hình ảnh cho từng element
    images.forEach((img, i) => {
        gsap.set(img, {
            rotationY: i * -rotationAngle,
            transformOrigin: `50% 50% ${circleRadius}px`,
            z: -circleRadius,
            backgroundImage: `url(${imagePaths[i]})`,
            backgroundPosition: 'center center', // Căn giữa hình ảnh
            backgroundSize: 'cover', // Đảm bảo hình ảnh lấp đầy không gian
            backfaceVisibility: 'hidden',
            backgroundRepeat: 'repeat-x', // Thêm dòng này để ngăn lặp lại

        });
    });

    // Animation hiển thị ban đầu
    gsap.from('.gallery-3d-img', {
        duration: 1.5,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        ease: 'expo'
    });

    // Thêm sự kiện hover
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to('.gallery-3d-img', {
                opacity: function (index, target) {
                    return target === img ? 1 : 0.5;
                },
                ease: 'power3'
            });
        });

        img.addEventListener('mouseleave', () => {
            gsap.to('.gallery-3d-img', {
                opacity: 1,
                ease: 'power2.inOut'
            });
        });
    });

    // Xử lý drag
    const stage = document.querySelector('.gallery-3d-stage');

    function dragStart(e) {
        if (e.touches) e.clientX = e.touches[0].clientX;
        xPos = Math.round(e.clientX);
        gsap.set(ring, { cursor: 'grabbing' });
        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag);
    }

    function drag(e) {
        if (e.touches) e.clientX = e.touches[0].clientX;

        gsap.to(ring, {
            rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
            onUpdate: function () {
                updateImagesPosition();
            }
        });

        xPos = Math.round(e.clientX);
    }

    function dragEnd() {
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('touchmove', drag);
        gsap.set(ring, { cursor: 'grab' });
    }

    function getBgPos(i) {
        // Cải tiến hàm này để tạo hiệu ứng lặp lại mượt mà
        const rotationY = gsap.getProperty(ring, 'rotationY') || 0;
        // Tính toán vị trí dựa trên góc xoay hiện tại
        const offset = gsap.utils.wrap(0, 360, rotationY - i * rotationAngle);
        return `${(offset / 360) * 100}% center`;
    }

    function updateImagesPosition() {
        images.forEach((img, i) => {
            gsap.set(img, {
                backgroundPosition: getBgPos(i)
            });
        });
    }

    // Thêm sự kiện mouse/touch
    stage.addEventListener('mousedown', dragStart);
    stage.addEventListener('touchstart', dragStart);
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);

    // ScrollTrigger animation
    if (gsap.ScrollTrigger) {
        gsap.from('.gallery-3d-stage', {
            scrollTrigger: {
                trigger: '.gallery-3d-stage',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            rotationY: -45,
            opacity: 0.5,
            duration: 2
        });
    }
});