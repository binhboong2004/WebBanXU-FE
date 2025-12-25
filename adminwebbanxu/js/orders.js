const orderData = [
    {
        id: "#ORD-88210",
        customer: "Vũ Duy Bình",
        product: "Xu Trao Đổi Sub 1 Triệu Xu",
        price: "150,000đ",
        time: "25/12/2023 14:20",
        status: "Hoàn thành",
        statusClass: "role-user", // Màu xanh lá từ user_list.css
        icon: "fas fa-check-circle"
    },
    {
        id: "#ORD-99102",
        customer: "Nguyễn Văn A",
        product: "Xu Tương Tác Chéo 500k",
        price: "75,000đ",
        time: "25/12/2023 15:45",
        status: "Đang xử lý",
        statusClass: "text-warning bg-warning-subtle", // Màu vàng
        icon: "fas fa-clock"
    },
    {
        id: "#ORD-77215",
        customer: "Trần Thị B",
        product: "Xu TikTok 20 Nghìn Xu",
        price: "2,500đ",
        time: "25/12/2023 16:10",
        status: "Thất bại",
        statusClass: "role-admin", // Màu đỏ từ user_list.css
        icon: "fas fa-times-circle"
    },
    {
        id: "#ORD-66231",
        customer: "Lê Văn C",
        product: "Xu Trao Đổi Sub 2 Triệu Xu",
        price: "300,000đ",
        time: "24/12/2023 09:00",
        status: "Hoàn thành",
        statusClass: "role-user",
        icon: "fas fa-check-circle"
    }
];

function renderOrders() {
    const container = document.getElementById('orderContainer');
    if (!container) return;

    document.getElementById('totalOrders').innerText = orderData.length;

    container.innerHTML = orderData.map((order, index) => `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="user-card">
                <div class="user-avatar-wrap d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm">
                    <i class="${order.icon} fa-2x text-primary"></i>
                </div>
                
                <div class="user-name text-truncate mt-2">${order.id}</div>
                <div class="user-email mb-3">${order.time}</div>
                
                <div class="fw-bold text-dark mb-1">${order.price}</div>
                <div class="small text-muted text-truncate px-2 mb-3" title="${order.product}">
                    ${order.product}
                </div>
                
                <span class="role-badge ${order.statusClass}">
                    ${order.status}
                </span>
                
                <div class="user-footer mt-4">
                    <div class="verify-status">
                        <i class="fas fa-user-circle text-muted"></i>
                        <span class="text-dark fw-medium small">${order.customer}</span>
                    </div>
                    <div class="dropdown">
                        <div class="more-btn" data-bs-toggle="dropdown" style="cursor: pointer;">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm">
                            <li><a class="dropdown-item small" href="order_detail.html?id=${order.id}"><i class="fas fa-eye me-2"></i> Chi tiết</a></li>
                            <li><a class="dropdown-item small text-danger" href="#" onclick="deleteOrder(${index})"><i class="fas fa-trash me-2"></i> Xóa đơn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteOrder(index) {
    if(confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
        orderData.splice(index, 1);
        renderOrders();
    }
}

// Tìm kiếm đơn hàng
document.getElementById('orderSearch')?.addEventListener('input', function(e) {
    const keyword = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('#orderContainer > div');
    
    cards.forEach(card => {
        const content = card.innerText.toLowerCase();
        card.style.display = content.includes(keyword) ? "block" : "none";
    });
});

document.addEventListener('DOMContentLoaded', renderOrders);

// Thêm đoạn này vào cuối file js/orders.js

function initSidebar() {
    const dropdownToggles = document.querySelectorAll('.toggle-next');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            
            // Đóng các dropdown khác đang mở (nếu muốn)
            document.querySelectorAll('.dropdown-item').forEach(item => {
                if (item !== parent) item.classList.remove('open');
            });

            // Toggle class open cho item hiện tại
            parent.classList.toggle('open');
            
            // Xử lý xoay mũi tên (nếu có i tag chevron)
            const arrow = this.querySelector('.fa-chevron-down');
            if (arrow) {
                if (parent.classList.contains('open')) {
                    arrow.style.transform = 'rotate(180deg)';
                } else {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}

// Cập nhật lại sự kiện DOMContentLoaded để gọi hàm initSidebar
document.addEventListener('DOMContentLoaded', function() {
    renderOrders(); // Hàm vẽ đơn hàng hiện tại của bạn
    initSidebar();  // Kích hoạt sidebar
});
