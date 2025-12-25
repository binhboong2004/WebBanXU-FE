let userData = [
    {
        name: "admin",
        email: "admin@gmail.com",
        role: "ADMIN",
        avatar: "img/avt.jpg",
        isVerified: false
    },
    {
        name: "Vũ Duy Bình",
        email: "vubinh0212004@gmail.com",
        role: "USER",
        avatar: "img/default-user.png",
        isVerified: true
    },
    {
        name: "Vũ Duy Bình",
        email: "vubinh02122004@gmail.com",
        role: "USER",
        avatar: "img/default-user.png",
        isVerified: false
    },
    {
        name: "Vũ Duy Bình",
        email: "vuduybinh2k4dz@gmail.com",
        role: "USER",
        avatar: "img/default-user.png",
        isVerified: false
    }
];

// Hàm render danh sách người dùng
function renderUsers() {
    const container = document.getElementById('userContainer');
    if (!container) return;

    container.innerHTML = userData.map((user, index) => `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="user-card">
                <div class="user-avatar-wrap">
                    <img src="${user.avatar}" class="user-avatar" alt="Avatar">
                </div>
                <div class="user-name">${user.name}</div>
                <span class="user-email text-truncate">${user.email}</span>
                <span class="role-badge ${user.role === 'ADMIN' ? 'role-admin' : 'role-user'}">
                    ${user.role}
                </span>
                
                <div class="user-footer">
                    <div class="verify-status">
                        <span class="status-dot ${user.isVerified ? 'dot-green' : 'dot-red'}"></span>
                        <span class="text-muted small">${user.isVerified ? 'Đã xác thực mail' : 'Chưa xác thực mail'}</span>
                    </div>
                    
                    <div class="dropdown">
                        <div class="more-btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>
                        <div class="dropdown-menu dropdown-menu-end animated fadeIn">
                            <a class="dropdown-item small text-secondary" href="#" onclick="updateVerifyStatus(${index}, false)">
                                <i class="fas fa-times-circle me-2 text-danger"></i> Chưa xác thực mail
                            </a>
                            <a class="dropdown-item small text-secondary" href="#" onclick="updateVerifyStatus(${index}, true)">
                                <i class="fas fa-check-circle me-2 text-success"></i> Đã xác thực mail
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item small text-danger" href="#" onclick="deleteAccount(${index})">
                                <i class="fas fa-trash-alt me-2"></i> Xóa tài khoản
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Hàm cập nhật trạng thái xác thực
function updateVerifyStatus(index, status) {
    userData[index].isVerified = status;
    renderUsers();
}

// Hàm xóa tài khoản
function deleteAccount(index) {
    const userName = userData[index].name;
    if (confirm(`Bạn có chắc chắn muốn xóa tài khoản của "${userName}"?`)) {
        userData.splice(index, 1);
        renderUsers();
    }
}

// Khởi tạo các sự kiện khi trang load xong
document.addEventListener('DOMContentLoaded', function() {
    // 1. Render danh sách ban đầu
    renderUsers();

    // 2. Xử lý logic đóng/mở Sidebar Submenu
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
});