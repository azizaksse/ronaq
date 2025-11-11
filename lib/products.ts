export type Product = {
  id: string;
  nameAr: string;
  slug: string;
  descAr: string;
  priceDzd: number;
  category: string;
  image: string;
  highlights?: string[];
  weightGrams?: number;
};

export const categories = [
  "مكملات غذائية",
  "عناية بالبشرة",
  "عناية بالشعر",
  "زيوت وأعشاب",
] as const;

export const products: Product[] = [
  {
    id: "detox-elixir",
    nameAr: "إكسير الديتوكس الأخضر",
    slug: "detox-elixir",
    descAr: "مزيج كلوريلا وسبيرولينا لتنظيف الجسم وتعزيز المناعة اليومية.",
    priceDzd: 4800,
    category: "مكملات غذائية",
    image: "/products/product-1.png",
    highlights: ["مناعة أقوى", "تنقية طبيعية"],
    weightGrams: 250,
  },
  {
    id: "radiance-caps",
    nameAr: "كبسولات إشراقة البشرة",
    slug: "radiance-caps",
    descAr: "فيتامينات مركزة مع زيوت طبيعية تمنحك بشرة نضرة ومتوازنة.",
    priceDzd: 3650,
    category: "عناية بالبشرة",
    image: "/products/product-2.png",
    highlights: ["نضارة فورية", "مضاد للأكسدة"],
    weightGrams: 200,
  },
  {
    id: "argan-serum",
    nameAr: "سيروم الأرغان الذهبي",
    slug: "argan-serum",
    descAr: "أرغان بكر مع فيتامين E لتغذية عميقة ولمعان طبيعي للشعر.",
    priceDzd: 4200,
    category: "عناية بالشعر",
    image: "/products/product-3.png",
    highlights: ["لمعان فوري", "حماية من التقصف"],
    weightGrams: 180,
  },
  {
    id: "energy-focus",
    nameAr: "مكمل الطاقة والتركيز",
    slug: "energy-focus",
    descAr: "جينسنغ وسيترات المغنيزيوم لرفع التركيز وتقليل التعب اليومي.",
    priceDzd: 5400,
    category: "مكملات غذائية",
    image: "/products/product-4.png",
    highlights: ["يدعم التركيز", "طاقة مستقرة"],
    weightGrams: 220,
  },
  {
    id: "collagen-boost",
    nameAr: "كولاجين رونق البحري",
    slug: "collagen-boost",
    descAr: "كولاجين بحري مع حمض الهيالورونيك لمرونة بشرة محسّنة.",
    priceDzd: 6800,
    category: "عناية بالبشرة",
    image: "/products/product-5.png",
    highlights: ["شدّ مرئي", "ترطيب عميق"],
    weightGrams: 260,
  },
  {
    id: "herbal-oil",
    nameAr: "زيت الأعشاب المتوازن",
    slug: "herbal-oil",
    descAr: "زيوت بكر (غار، روزماري، ورق الزيتون) لتنشيط فروة الرأس.",
    priceDzd: 2950,
    category: "زيوت وأعشاب",
    image: "/products/product-6.png",
    highlights: ["ينشط الدورة", "يرطب الفروة"],
    weightGrams: 150,
  },
  {
    id: "sleep-tea",
    nameAr: "خليط النوم الهادئ",
    slug: "sleep-tea",
    descAr: "أعشاب لافندر وبابونج مع تمر الهند لتعزيز نوم عميق وهادئ.",
    priceDzd: 2300,
    category: "زيوت وأعشاب",
    image: "/products/product-7.png",
    highlights: ["مهدئ طبيعي", "بدون إدمان"],
    weightGrams: 120,
  },
  {
    id: "biotin-chews",
    nameAr: "مضغيات البيوتين الفاخرة",
    slug: "biotin-chews",
    descAr: "جرعة يومية محسوبة لدعم قوة الأظافر وصحة الشعر.",
    priceDzd: 3100,
    category: "عناية بالشعر",
    image: "/products/product-8.png",
    highlights: ["شعر أقوى", "طعم طبيعي"],
    weightGrams: 160,
  },
  {
    id: "collomak",
    nameAr: "Collomak لعلاج الثآليل فوراً",
    slug: "collomak",
    descAr:
      "محلول موضعي يذيب التصلبات وعين السمكة بسرعة بفضل حمض اللاكتيك والمخدر الموضعي بولي دوكانول، ويخفف الألم فوراً.",
    priceDzd: 6700,
    category: "عناية بالبشرة",
    image: "/products/clomac-1.jpg",
    highlights: ["يزيل مسامير القدم", "يقلل الألم فوراً"],
    weightGrams: 50,
  },
  {
    id: "ginseng-power",
    nameAr: "وداعاً للنحافة مع الجنسينج الأصلي",
    slug: "ginseng-original",
    descAr:
      "الجنسينج المطوّر للتسمين وزيادة الوزن، يقوي المناعة ويمنح نشاطاً ذهنياً وطاقة متجددة.",
    priceDzd: 7600,
    category: "مكملات غذائية",
    image: "/products/ginseng-1.jpg",
    highlights: [
      "يزيد الوزن من 8 إلى 12 كلغ",
      "يحسّن التركيز والحفظ",
      "مفيد لمرضى السكري والقلب",
      "يفتح الشهية ويفيد الرياضيين",
    ],
    weightGrams: 300,
  },
];

export type Bundle = {
  id: string;
  nameAr: string;
  descAr: string;
  priceDzd: number;
  originalPriceDzd: number;
  products: string[];
  badge: string;
};

export const bundles: Bundle[] = [
  {
    id: "daily-vitality",
    nameAr: "حزمة عافية يومية",
    descAr: "مزيج الديتوكس والطاقة لترطيب جسدك ونشاطك طوال اليوم.",
    priceDzd: 9150,
    originalPriceDzd: 10200,
    products: ["detox-elixir", "energy-focus"],
    badge: "وفر 10%",
  },
  {
    id: "natural-beauty",
    nameAr: "حزمة جمال طبيعي",
    descAr: "كولاجين + كبسولات الإشراقة لبشرة مليئة بالحياة.",
    priceDzd: 8900,
    originalPriceDzd: 10450,
    products: ["collagen-boost", "radiance-caps"],
    badge: "وفر 15%",
  },
  {
    id: "focus-power",
    nameAr: "حزمة طاقة وتركيز",
    descAr: "جينسنغ مع مضغيات البيوتين للعقل والشعر معاً.",
    priceDzd: 7950,
    originalPriceDzd: 9400,
    products: ["energy-focus", "biotin-chews"],
    badge: "وفر 12%",
  },
];

export type Review = {
  id: string;
  author: string;
  state: string;
  quote: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    id: "1",
    author: "سهيلة",
    state: "وهران",
    quote: "خدمة راقية وسرعة في التوصيل، منتجاتكم حسستني بفرق حقيقي في أسبوعين.",
    rating: 5,
  },
  {
    id: "2",
    author: "سمير",
    state: "الجزائر",
    quote: "مكمل الطاقة خلاّني نركز في العمل بدون توتر، شكراً على الجودة.",
    rating: 5,
  },
  {
    id: "3",
    author: "حياة",
    state: "قسنطينة",
    quote: "سيروم الأرغان من أروع ما جرّبت، الرائحة منعشة والنتيجة واضحة.",
    rating: 4,
  },
  {
    id: "4",
    author: "مروان",
    state: "سطيف",
    quote: "التعامل عبر واتساب كان سهل وواضح، والدفع عند الاستلام آمن.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "هل متوفر الدفع عند الاستلام؟",
    answer: "نعم، نوفر الدفع عند الاستلام في كل ولايات الجزائر مع إمكانية فحص الطلب قبل الدفع.",
  },
  {
    question: "ما هي مدة التوصيل؟",
    answer: "عادةً ما يتم التوصيل خلال 48 إلى 72 ساعة حسب الولاية ومسار شركة الشحن.",
  },
  {
    question: "هل يمكنني إرجاع المنتج؟",
    answer: "نمنحك مهلة 7 أيام للاسترجاع أو الاستبدال طالما أن المنتج غير مستخدم وبحالته الأصلية.",
  },
  {
    question: "مم تتكوّن منتجاتكم؟",
    answer: "جميع التركيبات تعتمد على مكونات طبيعية مختبرة ومصرّح بها من الجهات الصحية الجزائرية.",
  },
  {
    question: "كيف أستعمل كل منتج؟",
    answer: "نرسل مع كل طلب دليل استخدام مفصل بالعربية مع نصائح تناسب احتياجك.",
  },
  {
    question: "هل يوجد دعم بعد الشراء؟",
    answer: "فريق خدمة الزبائن متواجد يومياً عبر الهاتف وواتساب لأي استفسار أو متابعة.",
  },
];
