import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Button, Box, Grid, LinearProgress, Rating } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { mens_kurta } from "../../../Data/mens_kurta";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "State/Product/Action";
import { addItemToCart } from "State/Cart/Action";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    {
      id: "white",
      name: "White",
      classes: "bg-white checked:outline-gray-400",
    },
    {
      id: "gray",
      name: "Gray",
      classes: "bg-gray-200 checked:outline-gray-400",
    },
    {
      id: "black",
      name: "Black",
      classes: "bg-gray-900 checked:outline-gray-900",
    },
  ],
  sizes: [
    // { name: "XXS", inStock: false },
    // { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    // { name: "2XL", inStock: true },
    // { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize,setSelectedSize] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { products } = useSelector((store) => store);
  console.log("FINAL PRODUCT:", products.product);



const handleAddToCart = () => {

  if (!selectedSize) {
    alert("Please select a size");
    return;
  }

  const data = {
    productId: products.product.id,
    size: selectedSize,
  };

  console.log("ADDING TO CART:", data);

  dispatch(addItemToCart(data));

  navigate("/cart");
};
  useEffect(() => {
    console.log("PARAM ID:", params.productId);
    dispatch(findProductsById({ productId: params.productId }));
  }, [params.productId]);
  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-x-[30rem] max-h-[35rem]">
              <img
                alt={product.images[0].alt}
                src={products.product?.imageUrl}
                className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {product.images.map((item) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    alt={item.alt}
                    src={item.src}
                    className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
                  />
                </div>
              ))}
              {/* <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                <img
            alt={product.images[2].alt}
            src={product.images[2].src}
            className="col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
            />
            </div>
            <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
            <img
            alt={product.images[3].alt}
            src={product.images[3].src}
            className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
            />
            </div> */}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2 ">
              <h1 className="text-lg lg-text-xl font-semibold text-gray-900">
                {products?.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                {products?.product?.title}{" "}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">
                  {products?.product?.discountedPrice}
                </p>
                <p className="opacity-50 line-through">
                  {products?.product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {products?.product?.discountPercent}% off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex item-center space-x-3">
                  <Rating name="read-only" value={5.5} readOnly />
                  <p className="opacity-50 text-sm">56540 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    3859 Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

             <fieldset aria-label="Choose a size" className="mt-4">
  <div className="grid grid-cols-4 gap-3">
    {product.sizes.map((size) => (
      <label
        key={size.name}
        aria-label={size.name}
        className={`group relative flex items-center justify-center rounded-md border p-3 cursor-pointer
        ${
          selectedSize === size.name
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white border-gray-300"
        }
        ${!size.inStock && "opacity-50 cursor-not-allowed"}`}
      >
        <input
          type="radio"
          name="size"
          value={size.name}
          checked={selectedSize === size.name}
          onChange={() => setSelectedSize(size.name)}
          disabled={!size.inStock}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <span className="text-sm font-medium uppercase">
          {size.name}
        </span>
      </label>
    ))}
  </div>
</fieldset>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  sx={{ p: "2rem", py: "1rem", bgcolor: "#9155fd" }}
                >
                  Add to cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* rating and reviews */}
        <section>
          <h1 className="font-semibold text-lg mb-4">Recent Review & Rating</h1>

          <div className="border p-5 flex gap-10">
            {/* LEFT: Reviews */}
            <div className="w-[65%] space-y-5">
              {[1, 2, 3].map((_, i) => (
                <ProductReviewCard key={i} />
              ))}
            </div>

            {/* RIGHT: Product Ratings */}
            <div className="w-[35%] flex justify-end">
              <div className="w-[320px] space-y-2">
                <h1 className="text-xl font-semibold">Product Ratings</h1>

                <div className="flex items-center gap-2">
                  <Rating value={4.6} precision={0.5} readOnly />
                  <p className="opacity-60 text-sm">85758 Ratings</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <p className="min-w-[80px] font-medium">Excellent</p>
                    <div className="flex-1">
                      <LinearProgress
                        variant="determinate"
                        value={40}
                        color="success"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="min-w-[80px] font-medium">Very Good</p>
                    <div className="flex-1">
                      <LinearProgress
                        variant="determinate"
                        value={30}
                        color="success"
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#bfdbfe", // light blue track
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#2563eb", // blue bar
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="min-w-[80px] font-medium">Good</p>
                    <div className="flex-1">
                      <LinearProgress
                        variant="determinate"
                        value={25}
                        color=""
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#fde68a", // light yellow track
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#facc15", // yellow bar
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="min-w-[80px] font-medium">Average</p>
                    <div className="flex-1">
                      <LinearProgress
                        variant="determinate"
                        value={20}
                        color="warning"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="min-w-[80px] font-medium">Poor</p>
                    <div className="flex-1">
                      <LinearProgress
                        variant="determinate"
                        value={10}
                        color="error"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>

          <div className="flex flex-wrap space-y-5">
            {mens_kurta.map((item) => (
              <HomeSectionCard product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
