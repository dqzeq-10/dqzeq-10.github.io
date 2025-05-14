document.addEventListener('DOMContentLoaded', function () {
    const countdownContainer = document.getElementById('countdown-container');
    // Early exit if the container is not found
    if (!countdownContainer) {
        console.warn("Countdown container not found.");
        return;
    }

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    // Check if all countdown elements are present
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.warn("One or more countdown elements (days, hours, minutes, seconds) not found.");
        // Display a message directly in the container if elements are missing
        countdownContainer.innerHTML = "<div class='text-xl md:text-2xl font-bold text-vietnam-yellow'>Lỗi hiển thị đồng hồ.</div>";
        return;
    }

    // Ngày kỷ niệm - 30 tháng 4 năm 2025
    // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (0 = tháng 1, 1 = tháng 2, ...)
    const anniversaryDate = new Date(2025, 3, 30, 0, 0, 0).getTime(); // 30 tháng 4 năm 2025, 00:00:00

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = anniversaryDate - now;

        if (distance < 0) {
            // Đã qua ngày kỷ niệm
            countdownContainer.innerHTML = "<div class='text-xl md:text-2xl font-bold text-vietnam-yellow'>KỶ NIỆM 50 NĂM ĐÃ DIỄN RA!</div>";
            // Optionally, you can hide or clear the individual day/hour/minute/second elements
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            // Stop the interval if it's running
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    let countdownInterval;

    // Cập nhật ngay khi tải trang và sau đó mỗi giây
    if (anniversaryDate > new Date().getTime()) {
        updateCountdown(); // Cập nhật ngay
        countdownInterval = setInterval(updateCountdown, 1000); // Cập nhật mỗi giây
    } else {
        updateCountdown(); // Hiển thị thông báo "ĐÃ ĐẾN NGÀY KỶ NIỆM!" hoặc tương tự
    }
});
