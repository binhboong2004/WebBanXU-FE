let categoryData = [
    {
        id: 1,
        title: "Tài khoản Facebook",
        count: 120,
        status: "Đang hoạt động",
        icon: "fab fa-facebook-square",
        isActive: true
    },
    {
        id: 2,
        title: "Tài khoản Instagram",
        count: 45,
        status: "Đang hoạt động",
        icon: "fa-solid fa-coins",
        isActive: true
    },
    {
        id: 3,
        title: "Dịch vụ Gmail",
        count: 0,
        status: "Đang bảo trì",
        icon: "fas fa-envelope",
        isActive: false
    },
    {
        id: 4,
        title: "Tài khoản TikTok",
        count: 89,
        status: "Đang hoạt động",
        icon: "fab fa-tiktok",
        isActive: true
    }
];

function renderCategories() {
    const container = document.getElementById('categoryContainer');
    if (!container) return;

    container.innerHTML = categoryData.map((cat, index) => `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="user-card">
                <div class="user-avatar-wrap d-flex align-items-center justify-content-center bg-light rounded-circle">
                    <i class="${cat.icon} fa-2x text-primary"></i>
                </div>
                <div class="user-name">${cat.title}</div>
                <span class="user-email">Số lượng: ${cat.count} sản phẩm</span>
                
                <span class="role-badge ${cat.isActive ? 'role-user' : 'role-admin'}">
                    ${cat.status}
                </span>
                
                <div class="user-footer">
                    <div class="verify-status">
                        <span class="status-dot ${cat.isActive ? 'dot-green' : 'dot-red'}"></span>
                        <span class="text-muted small">${cat.isActive ? 'Đang hoạt động' : 'Đang bảo trì'}</span>
                    </div>

                    <div class="dropdown">
                        <div class="more-btn" data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer;">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                            <li>
                                <a class="dropdown-item small py-2" href="#" onclick="updateCategoryStatus(${index}, true)">
                                    <i class="fas fa-check-circle me-2 text-success"></i> Đang hoạt động
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item small py-2" href="#" onclick="updateCategoryStatus(${index}, false)">
                                    <i class="fas fa-tools me-2 text-warning"></i> Đang bảo trì
                                </a>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <a class="dropdown-item small py-2 text-danger" href="#" onclick="deleteCategory(${index})">
                                    <i class="fas fa-trash-alt me-2"></i> Xóa danh mục
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Cập nhật trạng thái Hoạt động / Bảo trì
function updateCategoryStatus(index, activeStatus) {
    categoryData[index].isActive = activeStatus;
    categoryData[index].status = activeStatus ? "Đang hoạt động" : "Đang bảo trì";
    renderCategories();
}

// Xóa danh mục
function deleteCategory(index) {
    if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${categoryData[index].title}"?`)) {
        categoryData.splice(index, 1);
        renderCategories();
    }
}

// Khởi tạo logic Sidebar và Render
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.toggle-next');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            document.querySelectorAll('.dropdown-item').forEach(item => {
                if (item !== parent) item.classList.remove('open');
            });
            parent.classList.toggle('open');
            const arrow = this.querySelector('.fa-chevron-down');
            if (parent.classList.contains('open')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });

    renderCategories(); 
});