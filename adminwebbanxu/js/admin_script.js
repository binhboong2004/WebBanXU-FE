document.addEventListener('DOMContentLoaded', function() {
    // 1. Khởi tạo Biểu đồ Đơn hàng & Visitors
    const ctx = document.getElementById('mainChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan'],
            datasets: [{
                label: 'Đơn hàng',
                data: [45, 65, 43, 70, 42, 35, 80, 40, 55, 60],
                backgroundColor: '#4361ee',
                borderRadius: 5,
                barThickness: 15
            }, {
                label: 'Khách',
                data: [25, 35, 20, 40, 20, 15, 35, 20, 30, 35],
                backgroundColor: '#adc1ff',
                borderRadius: 5,
                barThickness: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 11 } } },
                y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } }
            }
        }
    });

    // 2. Xử lý đóng/mở Submenu Sidebar
    document.querySelectorAll('.toggle-next').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentElement;
            // Đóng các menu khác nếu muốn (optional)
            // document.querySelectorAll('.dropdown-item').forEach(el => { if(el !== parent) el.classList.remove('open'); });
            parent.classList.toggle('open');
            
            // Xoay icon mũi tên
            const arrow = this.querySelector('.fa-chevron-down');
            if(parent.classList.contains('open')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
});

// Hàm mẫu cho Modal (Bạn có thể tích hợp Modal Bootstrap tại đây)
function openModal(type) {
    alert("Mở giao diện thêm mới cho: " + type);
}