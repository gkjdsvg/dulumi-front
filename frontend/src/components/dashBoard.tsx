"use client"

import { MapPin, Bell, Search, Heart, Clock, Settings, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Notice {
  id: number
  title: string
  content: string
  type: string
}

export default function Dashboard() {
  const [notices, setNotices] = useState<Notice[]>([])
  const router = useRouter()

  const goToMap = () => {
    router.push("/map")
  }

  const goToNotice = () => {
    router.push("/notice")
  }

  const logout = () => {
    router.push("/")
  }

   useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("http://localhost:8087/api/notice", {
          method: "POST", // 서버에서 @PostMapping("/api/notice") 이라서 POST 요청
        });
        if (!res.ok) throw new Error("공지 불러오기 실패");

        const data = await res.json();
        setNotices(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#DCD3FF] rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-black">두루미</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
              <User className="w-5 h-5" />
            </Button>
            <Button onClick={logout} variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">안녕하세요! 👋</h2>
          <p className="text-gray-600">오늘도 두루미를 즐겨보세요</p>
        </div>

        {/* Quick Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="어디로 가고 싶으신가요? (예: 스타벅스, 도서관, 편의점)"
                className="pl-12 h-12 text-lg border-gray-200 focus:border-[#C8A2C8]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black">빠른 실행</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={goToMap}
                    className="h-20 bg-[#DCD3FF] hover:bg-[#C8A2C8] text-black flex flex-col items-center justify-center space-y-2"
                  >
                    <MapPin className="w-6 h-6" />
                    <span>지도 보기</span>
                  </Button>

                  <Button
                    onClick={goToNotice}
                    className="h-20 bg-white border-2 border-[#DCD3FF] hover:bg-[#DCD3FF] text-black flex flex-col items-center justify-center space-y-2"
                  >
                    <Bell className="w-6 h-6" />
                    <span>공지사항</span>
                  </Button>

                  <Button
                    onClick={() => router.push("/favorites")}
                    className="h-20 bg-white border-2 border-[#C8A2C8] hover:bg-[#C8A2C8] text-black flex flex-col items-center justify-center space-y-2"
                  >
                    <Heart className="w-6 h-6" />
                    <span>즐겨찾기</span>
                  </Button>

                  <Button
                    onClick={() => router.push("/history")}
                    className="h-20 bg-white border-2 border-gray-300 hover:bg-gray-100 text-black flex flex-col items-center justify-center space-y-2"
                  >
                    <Clock className="w-6 h-6" />
                    <span>최근 검색</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black">최근 활동</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-[#C8A2C8] rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-black">스타벅스 신촌점</p>
                      <p className="text-sm text-gray-600">2시간 전 검색</p>
                    </div>
                    <Badge variant="secondary" className="bg-[#DCD3FF] text-black">
                      카페
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-[#C8A2C8] rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-black">중앙도서관</p>
                      <p className="text-sm text-gray-600">어제 방문</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      도서관
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-[#C8A2C8] rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-black">CU 편의점</p>
                      <p className="text-sm text-gray-600">3일 전 검색</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      편의점
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-black flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  오늘의 공지
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notices.slice(-4).map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded`}
                    >
                        <p className="font-medium text-yellow-800 text-sm">{n.title}</p>
                        <p className="text-yellow-600 text-xs">{n.content}</p>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorites */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-black flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  즐겨찾기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#DCD3FF] rounded-lg flex items-center justify-center">
                        <span className="text-xs">☕</span>
                      </div>
                      <span className="text-sm font-medium text-black">스타벅스</span>
                    </div>
                    <span className="text-xs text-gray-500">5분</span>
                  </div>

                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs">📚</span>
                      </div>
                      <span className="text-sm font-medium text-black">도서관</span>
                    </div>
                    <span className="text-xs text-gray-500">3분</span>
                  </div>

                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs">🏪</span>
                      </div>
                      <span className="text-sm font-medium text-black">CU편의점</span>
                    </div>
                    <span className="text-xs text-gray-500">2분</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Widget */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-black">오늘 날씨</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl mb-2">☀️</div>
                  <p className="text-2xl font-bold text-black">18°C</p>
                  <p className="text-sm text-gray-600">맑음, 산책하기 좋은 날씨</p>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  )
}
