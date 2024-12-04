export {};

const productDataMemo = {
  records: [
    // Sofa Category
    {
      id: "SC1",
      name: "L-Shaped Sofa",
      description: "Perfect for spacious living rooms.",
      imageUrl:
        "https://i.ibb.co/612YWtZ/Alpha-Furniture-Box-March-2023-27889-Greys-32091-removebg-preview.png",

      //imageUrl: "https://i.ibb.co/SB5wt7m/ccode23121505-2-removebg-preview.png",
      unitPrice: 500,
      categoryName: "Sofa",
      isEnabled: true,
    },
    {
      id: "SC2",
      name: "Leather Sofa",
      description: "A luxurious leather sofa with great.",
      imageUrl:
        "https://i.ibb.co/QMDkxqK/092023-Jack-Burnt-Orange-Shot1-216-R-1-removebg-preview.png",
      unitPrice: 800,
      categoryName: "Sofa",
      isEnabled: true,
    },
    {
      id: "SC6",
      name: "Dark Solid Sofa",
      description: "Convenient for dark theme likers.",
      imageUrl: "https://i.ibb.co/HgxgdKn/crad1.png",
      unitPrice: 700,
      categoryName: "Sofa",
      isEnabled: true,
    },
    {
      id: "SC3",
      name: "Sectional Sofa",
      description: "Versatile sectional for any home.",
      imageUrl: "https://i.ibb.co/7CM97VD/sfavgberafwe-removebg-preview.png",
      unitPrice: 650,
      categoryName: "Sofa",
      isEnabled: true,
    },
    {
      id: "SC4",
      name: "Fabric Sofa",
      description: "Soft fabric sofa for casual living.",
      imageUrl: "https://i.ibb.co/K0S2bwQ/dgsrjytuilkul-removebg-preview.png",
      unitPrice: 400,
      categoryName: "Sofa",
      isEnabled: true,
    },
    {
      id: "SC5",
      name: "Sleeper Sofa",
      description: "Convenient sleeper for guests.",
      imageUrl: "https://i.ibb.co/gzxDPM3/jhskdf-removebg-preview.png",
      unitPrice: 700,
      categoryName: "Sofa",
      isEnabled: true,
    },

    // Tables Category
    {
      id: "TC1",
      name: "Wooden Dining Table",
      description: "A sturdy wooden dining table for family meals.",
      imageUrl: "https://i.ibb.co/0mLwNRr/images-removebg-preview.png",
      unitPrice: 250,
      categoryName: "Table",
      isEnabled: true,
    },
    {
      id: "TC2",
      name: "Glass Coffee Table",
      description: "A sleek glass table for your living room.",
      imageUrl:
        "https://i.ibb.co/wSnJMvN/hay-sofabord-bella-coffee-table-large-brunswick-groen-massiv-eg-2642205-removebg-preview.png",
      unitPrice: 150,
      categoryName: "Table",
      isEnabled: true,
    },
    {
      id: "TC3",
      name: "Marble Side Table",
      description: "Elegant marble side table for your decor.",
      imageUrl:
        "https://i.ibb.co/vkGDJFK/New-Modern-Walnut-Round-GB-removebg-preview.png",
      unitPrice: 180,
      categoryName: "Table",
      isEnabled: true,
    },
    {
      id: "TC4",
      name: "Round Wooden Table",
      description: "Compact round table for small spaces.",
      imageUrl: "https://i.ibb.co/ysYnsCj/images-1-removebg-preview.png",
      unitPrice: 120,
      categoryName: "Table",
      isEnabled: true,
    },
    {
      id: "TC5",
      name: "Console Table",
      description: "Stylish console table for entryways.",
      imageUrl: "https://i.ibb.co/4mTvN3L/23-0210388-removebg-preview.png",
      unitPrice: 100,
      categoryName: "Table",
      isEnabled: true,
    },

    // Lamp Category
    {
      id: "LC1",
      name: "Floor Lamp",
      description: "A tall lamp for ambient room lighting.",
      imageUrl:
        "https://i.ibb.co/6nwQM4n/TL5022-B4-600x660-removebg-preview.png",
      unitPrice: 45,
      categoryName: "Lamp",
      isEnabled: true,
    },
    {
      id: "LC2",
      name: "Table Lamp",
      description: "Compact and stylish table lamp on desks",
      imageUrl:
        "https://i.ibb.co/BNkjrJV/61d-T1zb-Wu0-L-AC-UF894-1000-QL80-removebg-preview.png",
      unitPrice: 30,
      categoryName: "Lamp",
      isEnabled: true,
    },
    {
      id: "LC3",
      name: "Pendant Lamp",
      description: "A hanging lamp for a modern look.",
      imageUrl: "https://i.ibb.co/Y3xcCLq/711-W9-Vv-JUL-removebg-preview.png",
      unitPrice: 60,
      categoryName: "Lamp",
      isEnabled: true,
    },
    {
      id: "LC4",
      name: "Wall Lamp",
      description: "A decorative lamp to illuminate walls.",
      imageUrl:
        "https://i.ibb.co/NxpTxBW/DQ41-RATTAN-BASKET-SHADE-AW-02-removebg-preview.png",
      unitPrice: 35,
      categoryName: "Lamp",
      isEnabled: true,
    },
    {
      id: "LC5",
      name: "Desk Lamp",
      description: "Ideal for workspaces and study desks.",
      imageUrl:
        "https://i.ibb.co/N7NtfZz/TTVM9-SQ2-0000000003-NATURAL-RSr-removebg-preview.png",
      unitPrice: 25,
      categoryName: "Lamp",
      isEnabled: true,
    },

    // Wall Art Category
    {
      id: "WA1",
      name: "Abstract Painting",
      description: "A modern abstract piece for your living room.",
      imageUrl:
        "https://i.ibb.co/QY1J1z2/minimalist-wall-art-abstract-geometric-print-boho-aesthetic-interior-home-decor-prints-burnt-orange.webp",
      unitPrice: 150,
      categoryName: "Wall Art",
      isEnabled: true,
    },
    {
      id: "WA2",
      name: "Landscape Print",
      description: "A serene landscape to brighten up your walls.",
      imageUrl:
        "https://i.ibb.co/VTW5myF/c542c0ac83664512bccca626d3919cb6-tplv-omjb5zjo8w-resize-jpeg-800-800-removebg-preview.png",
      unitPrice: 80,
      categoryName: "Wall Art",
      isEnabled: true,
    },
    {
      id: "WA3",
      name: "Motivational Quote",
      description: "A framed motivational quote for your office.",
      imageUrl:
        "https://i.ibb.co/VCVSjhk/71-Rfdo7-Az5-L-AC-UF894-1000-QL80-removebg-preview.png",
      unitPrice: 40,
      categoryName: "Wall Art",
      isEnabled: true,
    },
    {
      id: "WA4",
      name: "Floral Art",
      description: "A beautiful floral print for the home.",
      imageUrl: "https://i.ibb.co/t4dj1sJ/one-1200x1200-removebg-preview.png",
      unitPrice: 60,
      categoryName: "Wall Art",
      isEnabled: true,
    },
    {
      id: "WA5",
      name: "Modern girl frame",
      description: "A girl change your life like her",
      imageUrl:
        "https://i.ibb.co/9gWkh9w/81do-VZm-Mfk-L-UF1000-1000-QL80-removebg-preview.png",
      unitPrice: 100,
      categoryName: "Wall Art",
      isEnabled: true,
    },
    {
      id: "WA6",
      name: "Love Frame",
      description: "Love means what you",
      imageUrl:
        "https://i.ibb.co/wBg6PpC/71-Ycs3x-Oo-L-AC-UF1000-1000-QL80-removebg-preview.png",
      unitPrice: 100,
      categoryName: "Wall Art",
      isEnabled: true,
    },
    {
      id: "WA7",
      name: "Christmas frame",
      description: "A seasonal collection for yours",
      imageUrl:
        "https://i.ibb.co/qkGMtNN/ART21-OC40-24056-removebg-preview.png",
      unitPrice: 100,
      categoryName: "Wall Art",
      isEnabled: true,
    },
  ],
};
export default productDataMemo;
