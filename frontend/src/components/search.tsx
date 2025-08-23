"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const router = useRouter();

  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const input = document.querySelector<HTMLInputElement>("input[name='keyword']")
    if (input) {
      router.push(`/notice/search?keyword=${encodeURIComponent(input.value)}`)
    }
  }

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`http://localhost:8087/api/notice/search?keyword=${keyword}`);
        if (!res.ok) throw new Error("공지 불러오기 실패");

        const data = await res.json();

        // 🔍 검색어 필터링 (title이나 content 안에 포함된 경우만)
        const filtered = data.filter(
          (notice: any) =>
            notice.title?.includes(keyword) || notice.content?.includes(keyword)
        );

        setNotices(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [keyword]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#DCD3FF] rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-black">두루미</h1>
          </div>
        </div>
      </header>

      {/* Search + Notice Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              {/* <Search style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", width: 20, height: 20, color: "black" }} /> */}
              <Input
                name="keyword"
                defaultValue={keyword}
                placeholder="공지사항을 검색해보세요..."
                className="pl-12 h-14 bg-white border-[#DCD3FF] text-lg focus:border-[#C8A2C8] text-black rounded-2xl shadow-lg"
              />
              <Button
                onClick={handleSearch}
                className="absolute right-2 top-2 bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black h-10 px-6 rounded-xl transition-all"
              >
                검색
              </Button>
            </div>
          </div>

          {/* Notice List */}
          <div className="space-y-6 max-w-5xl mx-auto">
            {notices.length === 0 ? (
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            ) : (
              notices.map((notice, idx) => (
                <Card
                  key={idx}
                  className="border border-[#DCD3FF] hover:border-[#C8A2C8] transition-all duration-300 shadow-lg"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge className="bg-[#DCD3FF] text-black px-3 py-1 rounded-full text-sm hover:bg-white hover:border-[#DCD3FF] border border-transparent transition-all">
                            이벤트
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-3 hover:text-[#C8A2C8] cursor-pointer transition-colors">
                          {notice.title}
                        </h3>
                        <p className="text-black mb-4 leading-relaxed">{notice.content}</p>
                        <div className="flex items-center space-x-6 text-black">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-[#C8A2C8]" />
                            <span className="text-sm">
                              {notice.createdAt?.slice(0, 10) || "날짜 없음"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-[#C8A2C8]" />
                            <span className="text-sm">{notice.views || 0}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-3 h-3 bg-[#DCD3FF] rounded-full ml-6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}