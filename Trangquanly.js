// Lấy các phần tử Input từ giao diện HTML
let mssvInput = document.getElementById("mssv"); // Đã cập nhật ô nhập MSSV
let nameInput = document.getElementById("name");
let nvInput = document.getElementById("nv");
let hanchotInput = document.getElementById("hanchot");
let ghichuInput = document.getElementById("ghichu");
let table = document.querySelector(".custom-table");

// Biến toàn cục để đếm số nhiệm vụ đã hoàn thành (> 15 việc)
let completedTasks = 0;

function guithongtin() {
  let mssv = mssvInput.value.trim();
  let name = nameInput.value.trim();
  let nv = nvInput.value.trim();
  let hanchot = hanchotInput.value.trim();
  let ghichu = ghichuInput.value.trim();

  // 1. Kiểm tra nhập đủ cả 5 ô dữ liệu (Bao gồm ô MSSV mới thêm)
  if (!mssv || !name || !nv || !hanchot || !ghichu) {
    alert("Vui lòng nhập đầy đủ thông tin vào cả 5 ô nhé!");
    return;
  }

  // ==========================================================================
  // XỬ LÝ LOGIC RÀNG BUỘC ĐỊNH DANH (CHẴN / LẺ THEO SỐ CUỐI MSSV)
  // ==========================================================================
  // Lấy ký tự cuối cùng của chuỗi MSSV và chuyển đổi sang số nguyên
  let lastDigit = parseInt(mssv.slice(-1));

  // Kiểm tra phòng hờ trường hợp người dùng nhập ký tự cuối không phải là số
  if (isNaN(lastDigit)) {
    alert("Ký tự cuối cùng của Mã số sinh viên phải là một chữ số!");
    return;
  }

  let insertIndex;
  if (lastDigit % 2 !== 0) {
    // Nếu số cuối là SỐ LẺ: Chèn hàng mới vào ĐẦU BẢNG (Vị trí 0)
    insertIndex = 0;
    console.log(
      `MSSV kết thúc bằng số lẻ (${lastDigit}) -> Tự động chèn vào ĐẦU BẢNG`,
    );
  } else {
    // Nếu số cuối là SỐ CHẴN: Chèn hàng mới vào CUỐI BẢNG (Vị trí -1)
    insertIndex = -1;
    console.log(
      `MSSV kết thúc bằng số chẵn (${lastDigit}) -> Tự động chèn vào CUỐI BẢNG`,
    );
  }

  // 2. Chèn một hàng mới dựa trên vị trí (insertIndex) đã tính toán ở trên
  let row = table.insertRow(insertIndex);

  // 3. Tạo 6 ô (Cột) tương ứng trong bảng (Thêm 1 cột để hiển thị giá trị MSSV)
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4); // Ô chứa nội dung MSSV
  let cell6 = row.insertCell(5); // Ô chứa ô tích hoàn thành (Checkbox)

  // 4. Gán dữ liệu vào các ô tương ứng
  cell1.innerText = name;
  cell2.innerText = nv;
  cell3.innerText = hanchot;
  cell4.innerText = ghichu;
  cell5.innerText = mssv; // Hiển thị mã sinh viên lên bảng

  // Chèn ô Checkbox để tích chọn hoàn thành (Dùng class của Bootstrap)
  cell6.innerHTML =
    '<input type="checkbox" class="form-check-input" onchange="kiemTraHieuQua(this)">';
  cell6.className = "text-center"; // Căn giữa ô tích chọn cho đẹp mắt

  console.log("Đã thêm thành viên: " + name);

  // 5. Xóa sạch dữ liệu trong form sau khi thêm thành công để người tiếp theo nhập
  mssvInput.value = "";
  nameInput.value = "";
  nvInput.value = "";
  hanchotInput.value = "";
  ghichuInput.value = "";
}

// ==========================================================================
// TÍNH NĂNG BỔ SUNG: ĐẾM SỐ NHIỆM VỤ HOÀN THÀNH ĐỂ THÔNG BÁO HIỆU QUẢ
// ==========================================================================
function kiemTraHieuQua(checkboxElement) {
  if (checkboxElement.checked) {
    completedTasks++; // Tăng thêm 1 việc nếu người dùng tích chọn

    // Nếu tổng số nhiệm vụ vượt ngưỡng 15, hiển thị thông báo alert
    if (completedTasks > 15) {
      alert("Nhóm đang làm việc rất hiệu quả!");
    }
  } else {
    completedTasks--; // Trừ bớt 1 việc đi nếu người dùng hủy tích chọn
  }

  // Log ra màn hình console để bạn tiện theo dõi số lượng đếm thực tế khi test bài
  console.log("Tổng số nhiệm vụ đã hoàn thành hiện tại: " + completedTasks);
}
