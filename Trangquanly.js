// 1. Lấy các phần tử Input từ giao diện HTML
const mssvInput = document.getElementById("mssv"); 
const nameInput = document.getElementById("name"); 
const nvInput = document.getElementById("nv"); 
const hanchotInput = document.getElementById("hanchot"); 
const ghichuInput = document.getElementById("ghichu"); 

// Chọn chính xác phần thân của bảng
const tableBody = document.querySelector(".custom-table tbody"); 

// Biến toàn cục để đếm số nhiệm vụ đã hoàn thành
let completedTasks = 0; 

// 2. Hàm xử lý khi bấm nút Gửi Thông Tin (Chỉ khai báo DUY NHẤT một lần này)
function guithongtin() {
    // Lấy giá trị cắt bỏ khoảng trắng thừa
    let mssv = mssvInput.value.trim(); 
    let name = nameInput.value.trim(); 
    let nv = nvInput.value.trim(); 
    let hanchot = hanchotInput.value.trim(); 
    let ghichu = ghichuInput.value.trim(); 

    // Kiểm tra nếu người dùng bỏ trống bất kỳ ô nào
    if (!mssv || !name || !nv || !hanchot || !ghichu) {
        alert("Vui lòng nhập đầy đủ thông tin vào cả 5 ô nhé!"); 
        return; 
    } 

    // Lấy chữ số cuối cùng của MSSV để xét chẵn lẻ
    let lastDigit = parseInt(mssv.slice(-1)); 

    // Kiểm tra phòng hờ nếu ký tự cuối không phải là số
    if (isNaN(lastDigit)) {
        alert("Ký tự cuối cùng của Mã số sinh viên phải là một chữ số!"); 
        return; 
    } 

    // Xác định vị trí chèn hàng: lẻ thì lên đầu (0), chẵn thì xuống cuối (-1)
    let insertIndex = (lastDigit % 2 !== 0) ? 0 : -1;

    // Tiến hành chèn một hàng (Row) mới vào trong tbody
    let row = tableBody.insertRow(insertIndex); 

    // Tạo 6 ô (Cells) dữ liệu cho hàng vừa tạo
    let cell1 = row.insertCell(0); 
    let cell2 = row.insertCell(1); 
    let cell3 = row.insertCell(2); 
    let cell4 = row.insertCell(3); 
    let cell5 = row.insertCell(4); 
    let cell6 = row.insertCell(5); 

    // Đổ dữ liệu text vào các ô tương ứng
    cell1.innerText = name; 
    cell2.innerText = nv; 
    cell3.innerText = hanchot; 
    cell4.innerText = ghichu; 
    cell5.innerText = mssv; 

    // Chèn ô Checkbox và căn giữa bằng class Bootstrap / CSS custom
    cell6.innerHTML = '<input type="checkbox" class="form-check-input" onchange="kiemTraHieuQua(this)">'; 
    cell6.className = "text-center"; 

    // Xóa sạch dữ liệu các ô nhập trên Form sau khi thêm thành công
    mssvInput.value = ""; 
    nameInput.value = ""; 
    nvInput.value = ""; 
    hanchotInput.value = ""; 
    ghichuInput.value = ""; 
} 

// 3. Hàm đếm số nhiệm vụ hoàn thành
function kiemTraHieuQua(checkboxElement) {
    if (checkboxElement.checked) {
        completedTasks++; 
        if (completedTasks > 15) {
            alert("Nhóm đang làm việc rất hiệu quả!"); 
        } 
    } else {
        completedTasks--; 
    } 
    console.log("Tổng số nhiệm vụ đã hoàn thành: " + completedTasks); 
}
