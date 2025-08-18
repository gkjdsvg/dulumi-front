"use client"

import { use, useState } from "react"
import { MapPin, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Palanquin } from "next/font/google"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")


    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8087/login-api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username }),
            });
            
            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            router.push("/notice"); //로그인 성공 시 notice 페이지로 이동

        } catch (error) {
            console.error("Error during login:", error);
        }
    }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-[#DCD3FF] rounded-2xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-black">CampusMap</h1>
          </div>
          <p className="text-black text-lg">{isLogin ? "다시 만나서 반가워요!" : "캠퍼스 라이프를 시작해보세요"}</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-[#DCD3FF] p-8">
          {/* Tab Buttons */}
          <div className="flex mb-8 bg-[#DCD3FF] rounded-2xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                isLogin ? "bg-white text-black shadow-sm" : "text-black hover:bg-white hover:bg-opacity-50"
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                !isLogin ? "bg-white text-black shadow-sm" : "text-black hover:bg-white hover:bg-opacity-50"
              }`}
            >
              회원가입
            </button>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-black font-medium">
                    아이디
                </Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                    <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="아이디를 입력하세요"
                    className="pl-11 h-12 bg-white border-[#DCD3FF] text-black focus:border-[#C8A2C8] rounded-xl"
                    />
                </div>
            </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-black font-medium">
                        이메일
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                        <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        className="pl-11 h-12 bg-white border-[#DCD3FF] text-black focus:border-[#C8A2C8] rounded-xl"
                        />
                    </div>
                </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-black font-medium">
                  비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className="pl-11 pr-11 h-12 bg-white border-[#DCD3FF] text-black focus:border-[#C8A2C8] rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-[#C8A2C8] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#C8A2C8] border-[#DCD3FF] rounded focus:ring-[#C8A2C8]"
                  />
                  <span className="text-sm text-black">로그인 상태 유지</span>
                </label>
                <button type="button" className="text-sm text-[#C8A2C8] hover:text-black transition-colors">
                  비밀번호 찾기
                </button>
              </div>

              <Button type="button" onClick={handleLogin} className="w-full bg-[#DCD3FF] text-black hover:bg-white hover:border-[#DCD3FF] border border-transparent h-12 text-lg font-semibold rounded-xl transition-all">
                로그인
              </Button>
        </form>
          ) : (
            /* Sign Up Form */
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black font-medium">
                  이름
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    className="pl-11 h-12 bg-white border-[#DCD3FF] text-black focus:border-[#C8A2C8] rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-black font-medium">
                  이메일
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    className="pl-11 h-12 bg-white border-[#DCD3FF] text-black focus:border-[#C8A2C8] rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-black font-medium">
                  전화번호
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="전화번호를 입력하세요"
                    className="pl-11 h-12 bg-white border-[#DCD3FF] text-black focus:border-[#C8A2C8] rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-black font-medium">
                  비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    className="pl-11 pr-11 h-12 bg-white border-[#DCD3FF] text-black focus:border-[#C8A2C8] rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-[#C8A2C8] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-black font-medium">
                  비밀번호 확인
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력하세요"
                    className="pl-11 pr-11 h-12 bg-white border-[#DCD3FF] text-black focus:border-[#C8A2C8] rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-[#C8A2C8] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#C8A2C8] border-[#DCD3FF] rounded focus:ring-[#C8A2C8] mt-0.5"
                  />
                  <span className="text-sm text-black leading-relaxed">
                    <span className="text-[#C8A2C8] hover:text-black cursor-pointer transition-colors">이용약관</span>{" "}
                    및{" "}
                    <span className="text-[#C8A2C8] hover:text-black cursor-pointer transition-colors">
                      개인정보처리방침
                    </span>
                    에 동의합니다
                  </span>
                </label>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#C8A2C8] border-[#DCD3FF] rounded focus:ring-[#C8A2C8] mt-0.5"
                  />
                  <span className="text-sm text-black">마케팅 정보 수신에 동의합니다 (선택)</span>
                </label>
              </div>

              <Button className="w-full bg-[#DCD3FF] text-black hover:bg-white hover:border-[#DCD3FF] border border-transparent h-12 text-lg font-semibold rounded-xl transition-all">
                회원가입
              </Button>
            </form>
          )}

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#DCD3FF]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-black">또는</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full bg-white border border-[#DCD3FF] text-black hover:bg-[#DCD3FF] h-12 rounded-xl transition-all">
                구글로 {isLogin ? "로그인" : "회원가입"}
              </Button>
              <Button className="w-full bg-white border border-[#DCD3FF] text-black hover:bg-[#DCD3FF] h-12 rounded-xl transition-all">
                카카오로 {isLogin ? "로그인" : "회원가입"}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-black text-sm">
            {isLogin ? "아직 계정이 없으신가요? " : "이미 계정이 있으신가요? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#C8A2C8] hover:text-black font-semibold transition-colors"
            >
              {isLogin ? "회원가입하기" : "로그인하기"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}