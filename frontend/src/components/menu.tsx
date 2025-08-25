"use client"

import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Menu() {
  const router = useRouter();

  return (
    <header className="px-6 py-4 border-b border-[#DCD3FF] bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* 로고 */}
        <div 
          onClick={() => router.push("/")} 
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-[#DCD3FF] rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-black">CampusMap</span>
        </div>

        {/* 메뉴 */}
        <nav className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/notice")}
            className="text-black hover:text-black hover:bg-white"
          >
            공지사항
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/map")}
            className="text-black hover:text-black hover:bg-white"
          >
            지도
          </Button>
        </nav>
      </div>
    </header>
  )
}
