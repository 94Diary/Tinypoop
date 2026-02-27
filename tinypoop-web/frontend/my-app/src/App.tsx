// App.tsx
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import "../src/App.css"

function App() {
  const products = [
    { id: 1, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/%D0%9C%D1%8B%D1%88%D1%8C_2.jpg", title: "เมาส์หนู", description: "เมาส์หนูจับแล้วนุ่มมือจับปลายเลือดไหล", price: 99.99 },
    { id: 2, imageUrl: "https://fortunetown.co.th/wp-content/uploads/2023/04/6-1024x683.jpg", title: "CustomKeyboard", description: "คีย์บอร์ดสำหรับคนใจฟูนุ่มมุนอร่อยสดชื่น", price: 149.99 },
    { id: 3, imageUrl: "https://cf.shopee.co.th/file/3282269676c272bbb704800e14a3326f", title: "ซูปเปอร์คอมพิวเตอร์", description: "ซูปเปอร์คอมพิวเตอร์ที่ความมีการคำนวณที่เร็วกว่าแสง", price: 79.99 },
    { id: 4, imageUrl: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/13070145/sony-original-walkman-tps-l2.0.1406747932.jpg?quality=90&strip=all&crop=0,7.5033200531209,100,84.993359893758", 
      title: "walkMan", description: "1/15Sony Walkman TPS-L2 The original Walkman portable cassette player, released July 1, 1979.", price: 299.99 },
    { id: 5, imageUrl: "https://toy.bandai.co.jp/img/6_13128_o_1gr27nl2414oi5dbssnt551t4852.jpg", title: "faiz phone", description: "CSM FAIZ DRIVER ver.2 [3rd shipment: October 2023] | KAMEN RIDER TOY WEB | BANDAI Official Website", price: 199.99 },
    { id: 6, imageUrl: "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2023/06/15-cyberpunk-2077-all-sandevistans-and-where-to-find-them.jpg", title: "cyberpunk sandevistan", description: "Cyberpunk 2077: Best Sandevistan Mods ", price: 9999999.99},
  ];

  const handleAddToCart = (title: string) => {
    alert(`Added ${title} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Shop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Navbar></Navbar>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            description={product.description}
            price={product.price}
            onAddToCart={() => handleAddToCart(product.title)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;