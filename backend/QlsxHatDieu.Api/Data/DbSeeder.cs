using QlsxHatDieu.Api.Models;

namespace QlsxHatDieu.Api.Data;

/// <summary>Creates the default admin account and the intro (home) page content on first run.</summary>
public static class DbSeeder
{
    public static void Seed(AppDbContext db, IConfiguration config)
    {
        if (!db.Users.Any())
        {
            var password = config["Seed:AdminPassword"] ?? "123";
            db.Users.Add(new User
            {
                Username = "admin",
                Name = "Quản trị viên",
                Role = "ADMIN",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            });
        }

        if (!db.Contents.Any())
        {
            db.Contents.AddRange(
            new Content
            {
                Page = "home", Section = "hero", SortOrder = 1,
                Title = "Giải pháp quản lý doanh nghiệp chế biến hạt điều",
                Description = "Hệ thống hỗ trợ quản lý mua hàng, bán hàng, kho, chế biến, công nợ và báo cáo trên một nền tảng.",
                Image = "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/dataimages/201211/original/images787594_13_Dieu.jpg",
            },
            new Content
            {
                Page = "home", Section = "about", SortOrder = 2,
                Title = "Quản lý tập trung trong một hệ thống",
                Description = "Phần mềm giúp doanh nghiệp quản lý xuyên suốt các hoạt động từ mua nguyên liệu, nhập kho, chế biến, quản lý thành phẩm đến bán hàng và theo dõi công nợ",
                Image = "https://base.vn/wp-content/uploads/2025/12/quan-ly-san-xuat.webp",
                Items =
                {
                    new ContentItem { Title = "Nền tảng quản lý", Description = "01", SortOrder = 1 },
                    new ContentItem { Title = "Phân hệ kho", Description = "03", SortOrder = 2 }
                },
            },
            new Content
            {
                Page = "home", Section = "warehouse", SortOrder = 3,
                Title = "Quản lý kho nguyên liệu và thành phẩm",
                Description = "Theo dõi nhập, xuất và tồn kho đối với kho nguyên liệu, kho chế biến và kho thành phẩm. Hệ thống hỗ trợ kiểm soát luân chuyển hàng hóa giữa các kho.",
                Image = "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/4/14/edit-hatdieu-1681510470351825926995.png",
                Items =
                {
                    new ContentItem { Title = "Kho nguyên liệu", Description = "Theo dõi nhập, xuất và tồn nguyên liệu.", SortOrder = 1 },
                    new ContentItem { Title = "Kho chế biến", Description = "Theo dõi nguyên liệu đang trong quá trình chế biến.", SortOrder = 2 },
                    new ContentItem { Title = "Kho thành phẩm", Description = "Quản lý thành phẩm sau khi hoàn tất chế biến.", SortOrder = 3 }
                },
            },
            new Content
            {
                Page = "home", Section = "production", SortOrder = 4,
                Title = "Theo dõi quy trình chế biến",
                Description = "Quản lý quá trình từ nguyên liệu đầu vào, tạo lô, chế biến, phân loại đến chuyển thành phẩm vào kho.",
                Image = "https://cdn-i2.congthuong.vn/resize/th/upload/2026/03/09/unnamed-18-15453520.jpg",
                Items =
                {
                    new ContentItem { Title = "Nhập nguyên liệu", Description = "Tiếp nhận và ghi nhận nguyên liệu đầu vào.", SortOrder = 1 },
                    new ContentItem { Title = "Tạo lô chế biến", Description = "Theo dõi từng lô nguyên liệu đưa vào sản xuất.", SortOrder = 2 },
                    new ContentItem { Title = "Chế biến", Description = "Ghi nhận quá trình chế biến và phân loại.", SortOrder = 3 },
                    new ContentItem { Title = "Nhập thành phẩm", Description = "Chuyển thành phẩm hoàn tất vào kho.", SortOrder = 4 }
                },
            },
            new Content
            {
                Page = "home", Section = "business", SortOrder = 5,
                Title = "Quản lý mua hàng, bán hàng và công nợ",
                Description = "Theo dõi đơn mua, đơn bán, công nợ nhà cung cấp, công nợ khách hàng và các khoản thu chi phát sinh trong quá trình kinh doanh.",
                Image = "https://vincargoservice.com/wp-content/uploads/2021/11/nen-giao-chi-tieu-nhu-the-nao-cho-nhan-vien-kinh-doanh-hinh-anh-1.jpg",
                Items =
                {
                    new ContentItem { Title = "Mua hàng", Description = "Quản lý đơn mua và theo dõi công nợ nhà cung cấp.", SortOrder = 1 },
                    new ContentItem { Title = "Bán hàng", Description = "Quản lý đơn bán, giao hàng và công nợ khách hàng.", SortOrder = 2 },
                    new ContentItem { Title = "Thu chi", Description = "Theo dõi các khoản thu và chi phát sinh.", SortOrder = 3 },
                    new ContentItem { Title = "Đối tác", Description = "Quản lý thông tin khách hàng và nhà cung cấp.", SortOrder = 4 }
                },
            },
            new Content
            {
                Page = "home", Section = "report", SortOrder = 6,
                Title = "Theo dõi và phân tích hoạt động kinh doanh",
                Description = "Tổng hợp dữ liệu nhập, xuất, tồn kho và giá trị giao dịch, hỗ trợ doanh nghiệp theo dõi hiệu quả hoạt động và báo cáo lãi lỗ.",
                Image = "/images/gioi-thieu/dashboard.png",
                Items =
                {
                    new ContentItem { Title = "Theo dõi nhập - xuất - tồn", Description = "Tổng hợp dữ liệu từ các kho trong hệ thống.", SortOrder = 1 },
                    new ContentItem { Title = "Theo dõi doanh thu", Description = "Tổng hợp giá trị các giao dịch bán hàng.", SortOrder = 2 },
                    new ContentItem { Title = "Phân tích hoạt động", Description = "Hỗ trợ theo dõi hiệu quả hoạt động kinh doanh.", SortOrder = 3 }
                },
            },
            new Content
            {
                Page = "home", Section = "cta", SortOrder = 7,
                Title = "Khám phá các tính năng của hệ thống",
                Description = "Tìm hiểu chi tiết các tính năng và quy trình quản lý được hỗ trợ trong hệ thống.",
                Image = null,
            }
            );
        }

        db.SaveChanges();
    }
}
