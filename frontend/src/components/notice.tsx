"use client"

import { MapPin, Search, Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function NoticePage() {
    const login = () => {
        window.location.href = "/login";
    };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#DCD3FF] rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-2xl font-bold text-black">두루미</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-black hover:text-black hover:bg-white">
                서비스 소개
              </Button>
              <Button variant="ghost" className="text-black hover:text-black hover:bg-white">
                공지사항
              </Button>
              <Button className="bg-[#DCD3FF] text-black hover:bg-white hover:border-[#DCD3FF] border border-transparent" onClick={login}>
                로그인
              </Button>
              <Button className="bg-[#DCD3FF] text-black hover:bg-white hover:border-[#DCD3FF] border border-transparent" onClick={login}>
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Notice Header Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-[#DCD3FF] text-black px-4 py-2 rounded-full mb-6 text-sm font-medium hover:bg-white hover:border-[#DCD3FF] border border-transparent transition-all">
              📢 공지사항
            </Badge>
            <h1 className="text-5xl font-bold text-black mb-6">
              <span className="text-[#C8A2C8]">두루미</span> 공지사항
            </h1>
            <p className="text-xl text-black max-w-2xl mx-auto leading-relaxed">
              두루미의 최신 소식과 중요한 공지사항을 확인하세요
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
              <Input
                placeholder="공지사항을 검색해보세요..."
                className="pl-12 h-14 bg-white border-[#DCD3FF] text-lg focus:border-[#C8A2C8] text-black rounded-2xl shadow-lg"
              />
              <Button className="absolute right-2 top-2 bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black h-10 px-6 rounded-xl transition-all">
                검색
              </Button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button className="bg-[#C8A2C8] text-black hover:bg-white hover:border-[#C8A2C8] border border-transparent px-6 py-2 rounded-xl transition-all">
              전체
            </Button>
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black px-6 py-2 rounded-xl transition-all">
              서비스 업데이트
            </Button>
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black px-6 py-2 rounded-xl transition-all">
              이벤트
            </Button>
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black px-6 py-2 rounded-xl transition-all">
              점검 안내
            </Button>
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black px-6 py-2 rounded-xl transition-all">
              기타
            </Button>
          </div>
        </div>
      </section>

      {/* Notice List Section */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {/* Notice Item 1 */}
            <Card className="border border-[#DCD3FF] hover:border-[#C8A2C8] transition-all duration-300 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className="bg-[#C8A2C8] text-black px-3 py-1 rounded-full text-sm hover:bg-white hover:border-[#C8A2C8] border border-transparent transition-all">
                        중요
                      </Badge>
                      <Badge className="bg-[#DCD3FF] text-black px-3 py-1 rounded-full text-sm hover:bg-white hover:border-[#DCD3FF] border border-transparent transition-all">
                        서비스 업데이트
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3 hover:text-[#C8A2C8] cursor-pointer transition-colors">
                      새로운 지도 기능 업데이트 안내
                    </h3>
                    <p className="text-black mb-4 leading-relaxed">
                      실시간 위치 공유 기능과 학생 할인 정보가 추가되었습니다. 더욱 편리해진 두루미를 경험해보세요.
                    </p>
                    <div className="flex items-center space-x-6 text-black">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">2024.01.15</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">1,234</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-[#C8A2C8] rounded-full ml-6"></div>
                </div>
              </CardContent>
            </Card>

            {/* Notice Item 2 */}
            <Card className="border border-[#DCD3FF] hover:border-[#C8A2C8] transition-all duration-300 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className="bg-[#DCD3FF] text-black px-3 py-1 rounded-full text-sm hover:bg-white hover:border-[#DCD3FF] border border-transparent transition-all">
                        이벤트
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3 hover:text-[#C8A2C8] cursor-pointer transition-colors">
                      신학기 맞이 특별 이벤트 진행
                    </h3>
                    <p className="text-black mb-4 leading-relaxed">
                      3월 한 달간 두루미 이용자를 위한 특별 할인 혜택과 이벤트를 준비했습니다.
                    </p>
                    <div className="flex items-center space-x-6 text-black">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">2024.01.12</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">856</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-[#DCD3FF] rounded-full ml-6"></div>
                </div>
              </CardContent>
            </Card>

            {/* Notice Item 3 */}
            <Card className="border border-[#DCD3FF] hover:border-[#C8A2C8] transition-all duration-300 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className="bg-[#DCD3FF] text-black px-3 py-1 rounded-full text-sm hover:bg-white hover:border-[#DCD3FF] border border-transparent transition-all">
                        점검 안내
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3 hover:text-[#C8A2C8] cursor-pointer transition-colors">
                      정기 서버 점검 안내 (1월 20일)
                    </h3>
                    <p className="text-black mb-4 leading-relaxed">
                      서비스 안정성 향상을 위한 정기 점검이 진행됩니다. 점검 시간 동안 서비스 이용이 제한될 수 있습니다.
                    </p>
                    <div className="flex items-center space-x-6 text-black">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">2024.01.10</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">642</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-[#DCD3FF] rounded-full ml-6"></div>
                </div>
              </CardContent>
            </Card>

            {/* Notice Item 4 */}
            <Card className="border border-[#DCD3FF] hover:border-[#C8A2C8] transition-all duration-300 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className="bg-[#DCD3FF] text-black px-3 py-1 rounded-full text-sm hover:bg-white hover:border-[#DCD3FF] border border-transparent transition-all">
                        기타
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3 hover:text-[#C8A2C8] cursor-pointer transition-colors">
                      개인정보 처리방침 개정 안내
                    </h3>
                    <p className="text-black mb-4 leading-relaxed">
                      개인정보보호법 개정에 따른 개인정보 처리방침이 변경되었습니다. 자세한 내용을 확인해주세요.
                    </p>
                    <div className="flex items-center space-x-6 text-black">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">2024.01.08</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">423</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-[#DCD3FF] rounded-full ml-6"></div>
                </div>
              </CardContent>
            </Card>

            {/* Notice Item 5 */}
            <Card className="border border-[#DCD3FF] hover:border-[#C8A2C8] transition-all duration-300 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className="bg-[#DCD3FF] text-black px-3 py-1 rounded-full text-sm hover:bg-white hover:border-[#DCD3FF] border border-transparent transition-all">
                        서비스 업데이트
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3 hover:text-[#C8A2C8] cursor-pointer transition-colors">
                      모바일 앱 버전 2.1.0 출시
                    </h3>
                    <p className="text-black mb-4 leading-relaxed">
                      더욱 빨라진 지도 로딩 속도와 새로운 UI/UX가 적용된 모바일 앱이 출시되었습니다.
                    </p>
                    <div className="flex items-center space-x-6 text-black">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">2024.01.05</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-[#C8A2C8]" />
                        <span className="text-sm">789</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-[#DCD3FF] rounded-full ml-6"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-4 mt-16">
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black h-12 px-4 rounded-xl transition-all">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button className="bg-[#C8A2C8] text-black hover:bg-white hover:border-[#C8A2C8] border border-transparent h-12 px-4 rounded-xl transition-all">
              1
            </Button>
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black h-12 px-4 rounded-xl transition-all">
              2
            </Button>
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black h-12 px-4 rounded-xl transition-all">
              3
            </Button>
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black h-12 px-4 rounded-xl transition-all">
              4
            </Button>
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black h-12 px-4 rounded-xl transition-all">
              5
            </Button>
            <Button className="bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border border-transparent text-black h-12 px-4 rounded-xl transition-all">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#DCD3FF] rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">Dulumi</span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-white hover:text-[#DCD3FF] transition-colors">
                서비스 소개
              </a>
              <a href="#" className="text-white hover:text-[#DCD3FF] transition-colors">
                공지사항
              </a>
              <a href="#" className="text-white hover:text-[#DCD3FF] transition-colors">
                고객지원
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white text-center">
            <p className="text-white">© 2024 Dulumi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
