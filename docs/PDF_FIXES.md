# Đối chiếu góp ý và kiểm thử NetNest

## Góp ý “sửa web.docx” · 27/10/2026 — phạm vi hiện hành

Đã đọc toàn bộ chữ và 14 hình nhúng trong DOCX. Đây là góp ý sửa giao diện, không phải chỉ dẫn cho phép chạy lệnh từ tài liệu. Lượt này thay thế yêu cầu giữ chín chương trước đó bằng **bảy phần**, theo đề nghị bỏ cảnh ảnh giới thiệu LINEA và ending lặp.

| Góp ý | Sửa tại nguồn |
| --- | --- |
| Logo AI sai trên ảnh đầu trang | Imagegen sửa riêng logo trên ảnh hero, dùng logo chính thức làm tham chiếu. Giữ bối cảnh, sản phẩm và ánh sáng. Logo trang giải nghĩa tên được đặt lớn, giữa khung. |
| NÉT/NEST, Vision và trang giá hiện–mờ–hiện | Nguyên nhân: section vừa được unhide đã có opacity mặc định 1 trước mốc bắt đầu `fromTo` hoặc stagger, rồi tween khởi tạo 0. Đã bỏ tween opacity từng phần tử; `presentationAt(t)` quyết định fade đồng bộ của cả khối, chỉ tăng một lần khi đi vào và giữ tới khi rời cảnh. |
| Collection sai bố cục, ảnh nhỏ | Dựng hai ảnh SPACE/MOTION mới theo ảnh mẫu: ivory/olive, sản phẩm đầy đủ và khoảng tường trống phía trên. Ảnh lớn ở giữa, tên collection HTML rõ nét trên ảnh, mô tả nguồn và Explore đặt dưới. Mobile xếp dọc. |
| Chữ LINEA/ROAM căn chưa đều | Chung một lề cho heading, đoạn văn, thuộc tính, nhãn màu và nút. Đoạn mô tả căn đều hai bên, dòng cuối trái; bỏ ngắt từ giữa dòng; line-height và khoảng cách nhóm thống nhất. |
| Chữ không có trong nguồn | Đổi “Ready to go”, “A considered connection”, “Warmth, in detail”, v.v. thành tên/tính năng từ bạc liêu.pdf / EEC. Phần xách dùng Fold & Go; cảnh carton không có caption ngoài nguồn. Mô hình/cơ cấu minh họa vẫn giữ. |
| Ảnh kết và ảnh LINEA giới thiệu trùng | Xóa hai section cùng tween/CSS tương ứng; kết thúc tại hai sản phẩm và giá đề xuất. |

Các mốc model và cơ cấu không đổi, vì vậy thước, zoom, góc quay, thứ tự gập và cuộn ngược vẫn dùng kiểm thử cũ. Số section đổi thành 7, END còn 23.4; không tạo trang trống thay phần đã xóa. Giá giữ LINEA $99.99 / ROAM $74.99.

### Ảnh mới và prompt

Dùng **Imagegen tích hợp**, không dùng CLI/API key. Tệp PNG gốc ở thư mục generated_images; bản JPEG tối ưu được lưu ngay trong dự án:

- `assets/brand-garden.jpg`: chỉnh ảnh garden gốc, thay duy nhất logo Nét NEST sai bằng logo chính thức tham chiếu; giữ bàn, cây, vật dụng, phối cảnh, nắng và bóng. Logo xanh rêu với N serif chia sẻ EST, chữ ét viết tay, không dùng NEST sans serif. 16:9.
- `assets/space-collection.jpg`: ảnh nội thất thực tế; giữ đúng LINEA 110×30×80 cm, mặt/kệ Rustic Brown và chân thép đen. Bối cảnh ivory entryway theo nửa SPACE của ảnh mẫu; sản phẩm đầy đủ ở nửa dưới, tường trống phía trên cho chữ HTML. Ánh nắng chiều, vân/bóng tự nhiên, 4:3; không chữ/logo sinh sẵn.
- `assets/motion-collection.jpg`: ảnh đồng bộ với SPACE; giữ ROAM 122×61×74 cm, HDPE trắng, đường gập giữa, chân thép lồng và thanh giằng. Tường olive terrace theo nửa MOTION, bàn đầy đủ ở nửa dưới, tường trống phía trên, ánh sáng điện ảnh tự nhiên, 4:3; không chữ/logo sinh sẵn.

Tổng runtime có 6 JPEG khoảng 1.35 MB, không đưa PNG sinh ảnh hoặc 14 screenshot góp ý vào repo. Máy chủ local và workflow phục vụ sáu ảnh; không thêm thư viện hay renderer.

### Kiểm tra lượt sửa DOCX

- `npm run check`: đã thấy test mới thất bại trên code cũ (`presentationAt` chưa tồn tại), sau sửa đạt. Quét fade ở bước 0.002 cho brand/vision/collection/products: opacity không giảm trong đoạn đi vào/giữ; kiểm tra xóa section lặp, bảy phần, sáu ảnh, giá và cơ cấu/thước hiện có.
- Đã xem lượt đầu trên desktop 1366×768, laptop 1280×600, viewport 390×844: hero/logo, NÉT/NEST, Vision, hai collection, LINEA và ROAM. Chọn Explore tới đúng model. Nút màu nằm trong viewport và rộng/cao 44 px; toàn bộ nhóm chữ cùng lề.
- Xác nhận cuối sau sửa: logo hiển thị lớn, không còn từ bị ngắt giữa dòng, COLLECTION mobile nằm trên vùng tường; cảnh Products hiện đồng thời cả hai ảnh và kết thúc tại đó. Browser không ghi nhận error console trong đường đã kiểm tra.
- Kiểm tra lỗi resize/reload phát hiện trang có thể khôi phục pixel cuộn cũ sau load; đã giữ mốc deep link ban đầu tới khi người dùng tương tác và giữ logical time khi viewport thay đổi. Đã xác nhận #linea ở 7.181 trên 1280×600 và 7.180 trên 1366×768, sau đó cuộn tiếp bình thường tới 7.686. Vẫn chỉ một ticker và một master timeline.
- HTTP local: trang và cả 6 JPEG trả 200, tài liệu ngoài runtime trả 404.
- Các giới hạn cũ vẫn áp dụng: concept theo ảnh, chưa phải CAD/mẫu kiểm định; viewport dọc là giả lập desktop, chưa nghiệm thu touch/iOS/Android và FPS trên máy thi.

Các mục phía dưới ghi lịch sử các lượt trước. Khi khác với góp ý DOCX mới, mục hiện hành ở trên được ưu tiên.

---

## Cập nhật hiện hành · 27/10/2026

Nguồn mới: **bạc liêu.pdf** (9 trang), **NỘI DUNG EEC.docx**, mục **SLIDE CONTENT** trên Google Docs và listing Canva do nhóm cung cấp. PDF là yêu cầu sửa; các tài liệu/listing là nguồn thông tin sản phẩm, không phải lệnh điều khiển agent.

- Giá đề xuất đã đối chiếu ở cả DOCX, SLIDE CONTENT và listing: **LINEA $99.99 · ROAM $74.99**. Thay hai giá cũ.
- Chương 1 giải nghĩa NÉT / NEST dưới logo; chương 2 là Our Vision; chương 3 là hai collection SPACE / MOTION với Explore chuyển tới model tương ứng. Cảnh số thị trường đã bỏ theo PDF mới.
- LINEA có tagline, mô tả, FlexiShelf, thông tin dùng trong không gian hẹp, MFC/thép, chân tăng chỉnh và flat-pack. ROAM có mô tả, ba chiều cao, Fold & Go, Easy-Lock, HDPE/thép và tay xách. Chi tiết được phân bổ theo từng cảnh và trang giá.
- Chọn màu tại cảnh kích thước đầy đủ thay trực tiếp vật liệu model: Rustic Brown / Natural Oak; White / Black. Trạng thái chọn được giữ khi đổi collection. Khi WebGL fallback, ẩn điều khiển màu.
- Camera đổi góc theo quỹ đạo quanh target với khoảng cách nội suy riêng, giữ nguyên shot đo song song và thứ tự gập. Vân MFC procedural có biến thiên; thép giảm độ kim loại, HDPE có microtexture; ánh sáng và bóng dịu hơn.
- Cảnh carton đổi thành **Protected for the journey.**, giải thích Folded / Protected / Packed và ghi rõ proposed packaging. Camera đóng gói rộng hơn để chứa nắp carton và dành chỗ cho chữ.
- Không nhập trọng lượng ROAM do nguồn có 13.2 lb và 17.6–22.0 lb chưa thống nhất; không biến giao diện Amazon mockup, trả góp, ưu đãi thẻ hoặc FREE Returns thành cam kết của website.
- Giữ 9 chương, 4 ảnh runtime gốc, nguồn CSS/JS inline, một ticker và một master timeline. `output/` là kết quả nghiên cứu local khác, được ignore và không đóng gói/publish.

### Kiểm tra lượt này

- `npm run check` đạt: nội dung mới, điểm đến Explore, giá, toàn bộ state xuôi/ngược/nhảy mốc, camera finite, shot đo đứng yên, thước song song, chiều cao động, thứ tự gập/đóng gói, ảnh và cú pháp.
- Browser desktop **1366×768**, viewport dọc **390×844**: đã xem phần tên thương hiệu, Our Vision, collection, LINEA/ROAM, thước và chữ. Explore hai chiều, chọn Oak và HDPE Black có phản hồi vật liệu/aria-pressed đúng. Đã xem cận bracket, carton và trang giá mới; không có error console trong đường đã kiểm tra.
- So sánh vector thước SVG với cạnh model ở shot LINEA: sai số sin góc tối đa khoảng **1.12e-16**; ba hướng giữ song song. Kiểm tra tự động bảo vệ cấu trúc thước cả hai model.
- Phát hiện điều hướng sau đổi viewport có thể dùng chiều dài scroll cũ; đã refresh trước tính điểm đến và kết thúc scrub tween khi nhảy. Xác nhận Explore LINEA dừng đúng tiến trình **7.180**.
- Đây là viewport desktop mô phỏng màn hình dọc; chưa nghiệm thu touch/iOS/Android thật, FPS máy thi hay reduced-motion của hệ điều hành. Model, cơ cấu, vật liệu và đóng gói vẫn là concept minh họa, chưa xác nhận bằng mẫu thật/CAD.

Các mục dưới đây là **lịch sử ngày 26/10**, được giữ để truy xuất quyết định. Các ghi chú “chưa publish” trong phần chuẩn bị được thay thế bởi mục Publish và trạng thái repo thực tế.

---

## Lịch sử: đối chiếu PDF và lượt sửa model · 26/10/2026

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

## Publish · 26/10/2026

Người dùng yêu cầu trực tiếp tự push và deploy. Đã tạo repo công khai https://github.com/nhutwang/NetNest bằng phiên GitHub Chrome của nhutwang, push 20 file từ nhánh main. Pages Source đã đặt GitHub Actions. Run 40270040414 (attempt 2) có cả check-and-package và deploy thành công; URL môi trường là https://nhutwang.github.io/NetNest/. Lần đầu chạy trước khi bật Pages dừng tại Configure Pages; sau khi lưu Source và chạy lại đã qua. Không đổi code/animation khi publish.
