"use client"

import {
  MapPin,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import Script from "next/script"
import { Map, MapTypeControl, ZoomControl, CustomOverlayMap } from 'react-kakao-maps-sdk';

// 타입 정의 추가
interface Place {
  id: number
  name: string
  address_name: string
  category: string
  phone: string
  distance: string
  rating: number
  status: string
  hours: string
  x: string
  y: string
  discount?: string
}

const KAKAO_KEY = "";
const SCHOOL_COORDS = { lat: 35.1429, lng: 126.8004 }
const SEARCH_RADIUS = 1000; // 검색 반경 (미터 단위)

export default function MapPage() {
  const [results, setResults] = useState<Place[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [markers, setMarkers] = useState<Place[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [loaded, setLoaded] = useState(false)
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const formattedCategory = selectedPlace?.category
  .split(" > ")
  .slice(0, -1) // 마지막 항목 제거
  .join(" > ");

  // 검색
  const handleSearch = () => {
    if (!window.kakao || !window.kakao.maps || !inputRef.current) return
    const keyword = inputRef.current.value.trim()
    if (!keyword) return

    const ps = new window.kakao.maps.services.Places()
    ps.keywordSearch(keyword, (data: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const formattedPlaces: Place[] = data.map((place, idx) => ({
          id: idx,
          name: place.place_name,
          address_name: place.address_name,
          category: place.category_name,
          phone: place.phone,
          distance: place.distance ?? "",
          rating: 0,
          status: place.place_name ? "영업중" : "",
          hours: "",
          x: place.x,
          y: place.y,
        }))
        //카카오 API가 반환하는 distance 기준으로 1km filtering
        .filter(p => !p.distance || parseFloat(p.distance) <= SEARCH_RADIUS) // 반경 필터링

        setResults(formattedPlaces)
        setMarkers(formattedPlaces)
      }
    }, {
      location: new window.kakao.maps.LatLng(SCHOOL_COORDS.lat, SCHOOL_COORDS.lng),
      radius: SEARCH_RADIUS,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* <Head> */}
        <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Kakao SDK loaded")
          setLoaded(true)
        }}
      />
      {/* </Head> */}
      {/* ✅ Kakao SDK 로드 */}

      {/* Header */}
      <header className="px-6 py-6 border-b border-white relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#DCD3FF] rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-black">CampusMap</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-black hover:bg-white">
              서비스 소개
            </Button>
            <Button variant="ghost" className="text-black hover:bg-white">
              공지사항
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "w-96" : "w-0"} transition-all duration-300 bg-white border-r border-[#DCD3FF] overflow-hidden relative z-40`}
        >
          <div className="p-6 h-full overflow-y-auto">
            {/* Search Section */}
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                <Input
                  ref={inputRef}
                  placeholder="장소를 검색하세요..."
                  className="pl-10 h-12 bg-white border-[#DCD3FF] focus:border-[#C8A2C8] text-black rounded-xl"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!loaded}
                className="w-full bg-[#DCD3FF] hover:bg-white hover:border-[#DCD3FF] border text-black h-10 rounded-xl"
              >
                <Filter className="w-4 h-4 mr-2" /> 검색
              </Button>
            </div>

            {/* 검색 결과 리스트 */}
            <div className="mt-6 space-y-3">
              {results.map((place) => (
                <Card 
                  key={place.id} 
                  className="border border-[#C8A2C8] cursor-pointer" 
                  onClick={() => { 
                    setSelectedPlace(place);
                    mapRef.current?.panTo(new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)));
                  }}
                >
                  {/* 물방울 모양 */}
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-black font-bold">{place.name}</h3>
                        <span className="text-black text-sm">{place.address_name}</span>
                        <p>
                          <Badge className="bg-[#DCD3FF] text-black">{place.category.split(" > ").slice(0, -1).join(" > ")}</Badge>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Toggle */}
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`fixed top-1/2 transform -translate-y-1/2 z-50 bg-[#DCD3FF] text-black w-6 h-16 transition-all shadow-lg ${
              sidebarOpen ? "left-96 rounded-r-xl border-l-0" : "left-0 rounded-r-xl"
            }`}
          >
            {sidebarOpen ? <ChevronUp className="w-4 h-4 rotate-90" /> : <ChevronDown className="w-4 h-4 -rotate-90" />}
          </Button>
        </div>

        {/* Map Section */}
        <div className="flex-1 relative">
          {loaded ? (
            <Map
              center={SCHOOL_COORDS}
              style={{ width: "100%", height: "100%" }}
              level={3}
            >
              {markers.map((place) => (
                // <MapMarker
                //   key={place.id}
                //   position={{ lat: parseFloat(place.y), lng: parseFloat(place.x) }}
                //   onClick={() => setSelectedPlace(place)}
                // />

                <CustomOverlayMap
                  key={place.id}
                  position={{ lat: parseFloat(place.y), lng: parseFloat(place.x) }}
                  yAnchor={1} // 마커 아래쪽이 좌표 기준
                  clickable={true}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
                      selectedPlace?.id === place.id ? "bg-[#C8A2C8] animate-bounce" : "bg-[#DCD3FF] hover:bg-[#C8A2C8]"
                  }`}
                    onClick={() => setSelectedPlace(place)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all
                        ${selectedPlace?.id === place.id ? "bg-[#C8A2C8] animate-bounce scale-125 z-30" : "bg-[#DCD3FF] hover:bg-[#C8A2C8] z-20"}
                      `}
                    >
                      <MapPin className="w-5 h-5 text-black" />
                    </div>
                    {selectedPlace?.id === place.id && (
                      <div className="w-2 h-2 bg-[#C8A2C8] rotate-45 -mt-1"></div> // 꼬리 표시
                    )}
                  </div>
                </CustomOverlayMap>
              ))}
              <MapTypeControl position={"TOPRIGHT"} />
              <ZoomControl position={"RIGHT"} />
            </Map>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              지도 불러오는 중...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}