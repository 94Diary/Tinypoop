// ProductCard.tsx
import React from "react";
import Button from "./Button";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  price,
  onAddToCart,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md max-w-sm">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <div className="m-20">
        <h2 className="text-xl font-bold text-gray-80 mb-1">{title}</h2>
        <p className="text-gray-500 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">${price.toFixed(2)}</span>
          <Button onClick={onAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;