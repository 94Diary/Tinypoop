/** @type {import('tailwindcss').Config} */
module.exports = {
  // แก้ไข path ให้ครอบคลุมไฟล์ในโฟลเดอร์ app และ components [cite: 65]
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [], // ลบ require("nativewind/preset") ออกจากที่นี่ [cite: 74]
};