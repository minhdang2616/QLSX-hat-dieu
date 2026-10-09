import IntroSections from "@/components/IntroSections";
import { getContents, type Content } from "@/lib/api";

// Content is edited in /admin, so always render with fresh data.
export const dynamic = "force-dynamic";

export default async function Home() {
  let contents: Content[] = [];
  let failed = false;

  try {
    contents = await getContents("home");
  } catch (error) {
    console.error("Không thể tải nội dung trang chủ:", error);
    failed = true;
  }

  if (failed || contents.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            {failed ? "Không thể tải nội dung" : "Chưa có nội dung"}
          </h1>
          <p className="mt-3 text-slate-600">
            {failed
              ? "Không kết nối được máy chủ API. Vui lòng thử lại sau."
              : "Hãy thêm nội dung cho trang chủ trong khu vực quản trị."}
          </p>
        </div>
      </main>
    );
  }

  return <IntroSections contents={contents} />;
}
