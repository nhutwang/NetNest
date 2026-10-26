# Đối chiếu PDF và lượt sửa model · 26/10/2026

Nguồn: “Những điểm cần sửa.pdf” (9 trang), bản góp ý tiếp theo “Những điểm cần sửa (1).pdf” (6 trang) do người dùng cung cấp; sau khi hỏi rõ, người dùng xác nhận sửa website theo PDF. Bổ sung trực tiếp sau đó: không dùng khối chữ Low/Middle/High position; kẻ thước và ghi chiều dài tại model; cải thiện model, bảng màu và hòa nền logo.

## Những phần đã thay đổi

| Yêu cầu | Thực hiện |
| --- | --- |
| Logo không có ô nền, ảnh không thừa chữ ST | Logo gốc không sửa pixel; tăng sáng nền ảnh trước multiply, đặt nền ivory ngay trong stacking context của cảnh đầu. Khung cạnh logo dùng ảnh terrace không có chữ thương hiệu bị cắt. |
| Collections và ending thấy đủ bàn | Dùng nguyên ảnh linea-lifestyle/roam-lifestyle và contain; caption đều hàng, có khoảng cách. Cảnh giá dùng hai ảnh lifestyle hoàn chỉnh. |
| Số liệu hiện đủ rồi mới mờ | Theo PDF mới, hai số cùng trượt lên và rõ dần bằng một hàm theo tiến trình 2.6–3.05; không dùng hai tween khởi tạo riêng. Sau đó giữ nguyên đến hết cảnh, không hiện–mất–hiện lại. Mốc là tiến trình theo cuộn, không phải đồng hồ autoplay. Nguồn MPG/ITK giữ trong README. |
| Không chồng tiêu đề | Chỉ một section được hiện; caption độc lập chỉ dùng trong chương model. Không crossfade hai khối chữ. Cảnh kết chỉ có một h2 đổi nội dung. |
| Ảnh LINEA bớt màn trắng | Giảm vùng phủ gradient; mobile bỏ lớp phủ trên ảnh. |
| LINEA sát ảnh hơn | Mặt bo cạnh, vân walnut/bump/clearcoat nhẹ, kệ có khuyết quanh chân, khung thép mảnh, thanh liên kết, chân tăng chỉnh, giá đỡ và vít. |
| Đo tại model | Theo hai ảnh mẫu kích thước cung cấp sau PDF: khung đo dùng hình chiếu song song, chuyển vào/ra từ camera phối cảnh hiện có. Thước dài nằm trên cạnh sau; thước sâu gặp thước dài tại đúng cùng góc sau ở cao độ +5.5 cm. Thước cao đặt bên trái, từ sàn đến mặt trên. Cả ba là đoạn 3D theo trục model, mũi tên hai đầu và vạch chặn; nhãn đặt ngoài nét. Không ép đường dọc trên một model vẫn đang bị hội tụ phối cảnh. Kệ 10/25/40 cm và ROAM 55/65/74 cm dùng thước cao, ẩn hẳn inspector chữ. Camera giữ nguyên trong khoảng đo. Thước chỉ có fade vào/ra ở đầu/cuối mỗi nhóm đo, không vẽ nét. Theo PDF mới, khôi phục chiều dài và số cm/inches cập nhật liên tục theo geometry khi kệ/chân nâng hạ; camera vẫn đứng yên. Mobile đặt nhãn cao dưới đầu thước để tránh chạm nét ở mép màn hình. |
| Zoom vật liệu, giá đỡ, lắp/tháo | Các shot cận walnut, thép, chân và bracket; leader line là một đoạn thẳng tới mép detail box, bỏ khuỷu gấp khúc; cả đường và hộp fade vào/ra theo mốc chi tiết. Vít rút xuống khỏi mặt gỗ rồi trở lại; các bộ phận tách ra ở exploded view. |
| ROAM gập và đóng gói | Mặt HDPE là shell rỗng với mép bo, gân dưới và vị trí bắt khung; chân ống tròn có đoạn cong, chân lồng, thanh giằng hai đoạn. Lật → thu/gập chân → gập đôi → chốt → xách; sau đó xem vật liệu và carton có bảo vệ góc/nắp đóng. |
| Màu và mobile | Xanh rừng #1F3D2E; LINEA giữ ivory ấm #F8F3E9, ROAM dùng xám xanh nhạt #E6EEE8 để phân biệt hai vật liệu/collection. Đo kích thước ưu tiên model ở giữa; cận cảnh dành vùng phía dưới cho chữ trên màn hình dọc. |
| Giữ repo gọn | index.html vẫn là nguồn inline; 4 ảnh nguồn thực sự dùng, 3 ảnh README. Không khôi phục renderer/build cũ, không thêm framework hoặc thư viện. |

Một GSAP ticker và một master ScrollTrigger điều khiển toàn bộ. State được tính từ mốc hiện tại nên cuộn ngược/nhảy mốc không tích lũy sai số. Có nhánh reduced-motion giảm camera/reveal và chọn trạng thái ổn định; render/shadow không dựng lại khi state tương ứng không đổi.

## Kiểm tra đã thực hiện

- Lượt tinh chỉnh thước/số liệu theo năm ảnh bổ sung: xem desktop 1280×720 và viewport 390×844; thước ba trục theo bố cục hai ảnh mẫu, hình chiếu song song, góc chung giữa dài/sâu, không vẽ nét, nhãn không che đường; số thị trường cùng trượt lên, không khởi tạo tween riêng. Đã xem ROAM 55 cm và giá trị trung gian 63 cm, leader vật liệu LINEA/ROAM, nền riêng và viewport dọc.
- Đối chiếu bổ sung với ảnh kích thước LINEA/ROAM: browser 1280×720 và 390×844. Ở hai khung đo desktop, so sánh vector SVG với hai đầu cạnh model chiếu qua cùng camera: sai lệch góc tối đa dưới 1e-10 độ (sai số số thực); chiều dài chiếu trùng nhau, thước cao đứng dọc. Camera phối cảnh và các cảnh khác được giữ, chỉ đổi các shot đo và chuyển vào/ra shot đo.
- `npm run check`: fade đầu/cuối nhóm thước, song song cạnh/đứng dọc, cập nhật chiều cao, camera cố định xuyên khoảng đo, hàm số liệu đi lên đơn điệu, fade leader đầu/cuối, không còn tween vẽ nét; chín chương, camera đứng yên trong khoảng đo, khoảng giữ số liệu, các mức kệ, thước chiều cao không dùng caption, thứ tự gập/đóng gói, cuộn ngược/nhảy mốc, camera finite, 4 ảnh được tham chiếu, giá, JavaScript inline và ảnh README.
- `node --check` cho hai script Node.
- Browser 1366×768: collections đủ bàn, số liệu đủ hai phía; LINEA kích thước/kệ/vật liệu/giá đỡ/exploded; ROAM chiều cao, mặt dưới có gân, gập, xách, carton; ending.
- Laptop 1280×600: đường đo đủ khung, không còn khối Low position; zoom giá đỡ có tiêu đề/chú thích rõ và không nằm trên mặt gỗ. Ảnh bằng chứng mới thay trực tiếp trong docs/images.
- Viewport 390×844: logo không còn ô nền, thước LINEA/ROAM, 55 cm/21.7 in ngay tại model; cận bracket có vùng chữ riêng, không tràn ngang. Đây là trình duyệt desktop với viewport dọc, không phải nghiệm thu điện thoại thật.
- Cuộn ngược qua model, chi tiết và các chương; active heading đếm tối đa một tại các trạng thái kiểm tra. Kiểm tra state tự động quét toàn timeline cả xuôi/ngược/nhảy mốc.
- Fallback ép bằng `?fallback=1` tại mốc 7.348: chỉ ảnh nguồn và thông báo 3D unavailable; thước 3D ẩn. Không phải thử nghiệm hỏng GPU vật lý.
- Không quan sát lỗi JavaScript chặn render trong các đường đã xem. Cảnh báo deprecation của Three global r152 vẫn có; giữ phiên bản theo nền ZIP hiện hành.

## Giới hạn

Model là bản dựng procedural theo ảnh, không phải CAD sản xuất hoặc cơ cấu đã kiểm định. Không có xác nhận tải trọng, độ bền, vật liệu sản xuất hay khả năng vận chuyển. Camera/geometry và chuỗi lắp, gập, đóng gói là minh họa trình bày; chưa nghiệm thu cơ khí bằng mẫu thật.

Chưa đo FPS trên máy trình chiếu, chưa thử touch/iOS/Android thật hoặc end-to-end bằng thiết lập reduced-motion của hệ điều hành. CDN vẫn cần Internet. Không publish, đổi quyền chia sẻ hoặc đẩy GitHub trong lượt này.

## Chuẩn bị GitHub / deploy · NetNest

Tên package là `netnest`, workspace VS Code là `NetNest.code-workspace`; gói bàn giao `releases/NetNest.zip` có thư mục gốc `NetNest/`. Bốn ảnh runtime đã đổi tên mô tả, đồng bộ HTML và máy chủ local; nội dung ảnh và animation được giữ nguyên. README là tài liệu chính, ảnh minh họa LINEA/ROAM đã thay bằng khung đo mới nhất.

Workflow `.github/workflows/pages.yml` kiểm tra trên push/PR vào `main`; chỉ push hoặc chạy thủ công mới đóng gói/deploy. Artifact chỉ có index.html, .nojekyll và 4 ảnh, không kèm docs/script/Git. Repo local đã khởi tạo nhánh main; chưa commit, thêm remote, push hoặc publish. Cần chọn GitHub Actions trong Settings → Pages của repo đích trước khi chạy deploy. Workflow đã được đối chiếu cấu hình với hướng dẫn GitHub, chưa chạy trên GitHub thực tế.

Kiểm tra bàn giao: npm run check đạt; HTTP local trả 200 cho trang và 4 ảnh mới, 404 cho đường dẫn ngoài runtime. Artifact 6 file đã chạy qua HTTP dưới /NetNest/: ảnh tải đủ, WebGL ready và model LINEA/thước hiển thị. NetNest.zip gồm 20 file nguồn, kiểm tra CRC và SHA-256 từng entry trùng nguồn; không chứa .git, releases hoặc cache. Kiểm tra artifact local không thay thế một lần chạy workflow GitHub thật.
