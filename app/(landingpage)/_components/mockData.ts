export const mockCategories = [
  {
    _id: "mock-cat-1",
    name: "Furniture Painting",
    slug: "PAINTING",
    image: {
      secure_url: "/images/category_painting.png",
    },
  },
  {
    _id: "mock-cat-2",
    name: "Furniture Restoration",
    slug: "RESTORATION",
    image: {
      secure_url: "/images/category_restoration.png",
    },
  },
  {
    _id: "mock-cat-3",
    name: "Wood Finishing",
    slug: "FINISHING",
    image: {
      secure_url: "/images/category_finishing.svg",
    },
  },
  {
    _id: "mock-cat-4",
    name: "Professional Workshops",
    slug: "WORKSHOPS",
    image: {
      secure_url: "/images/category_workshop.svg",
    },
  },
  {
    _id: "mock-cat-5",
    name: "Furniture Renovation",
    slug: "RENOVATION",
    image: {
      secure_url: "/images/category_renovation.svg",
    },
  },
];

export const mockProducts = [
  {
    _id: "mock-prod-1",
    name: "Apex Airless Paint Sprayer",
    originalPrice: 249.99,
    salePrice: 199.99,
    category: {
      name: "Equipment",
    },
    images: [
      {
        secure_url: "/images/product_paint_sprayer.svg",
      },
    ],
  },
  {
    _id: "mock-prod-2",
    name: "Satin Polyurethane Varnish",
    originalPrice: 45.00,
    salePrice: 39.99,
    category: {
      name: "Coatings",
    },
    images: [
      {
        secure_url: "/images/product_wood_varnish.svg",
      },
    ],
  },
  {
    _id: "mock-prod-3",
    name: "Pro-Glide Orbital Sander",
    originalPrice: 120.00,
    salePrice: 89.99,
    category: {
      name: "Tools",
    },
    images: [
      {
        secure_url: "/images/product_sander.svg",
      },
    ],
  },
];
