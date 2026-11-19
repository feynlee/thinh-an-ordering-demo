import { RAW_ITEMS, DRINK_LINES } from "./fullMenu";
/**
 * Representative sample menu for the Thịnh An Kitchen & Tofu ordering concept.
 *
 * SOURCES (all public, checked 2026-11-18):
 *  - CLOVER: the restaurant's own Clover Online Ordering page
 *      https://thinhankitchentofutampa.cloveronline.com/menu/all
 *    Item numbers, English names, descriptions and prices are copied from here.
 *  - ORDER_ONLINE: DoorDash-powered storefront https://order.online/store/thinh-an-kitchen-24151998
 *    Used only to cross-check featured-item prices (all matched Clover on 2026-11-18).
 *
 * VIETNAMESE NAMES: the Clover menu writes dish names without diacritics ("Pho Tai").
 * `nameVi` is our editorial rendering with diacritics ("Phở Tái"). It must be confirmed by the owner.
 *
 * In production the Clover inventory is the authoritative catalog. This file is a demo snapshot.
 */

export type Verification =
  | "verified-clover-online" // seen on the restaurant's Clover ordering page on lastChecked
  | "cross-checked" // seen on Clover AND matched on a second public channel
  | "editorial" // written by us, needs owner confirmation
  | "unverified";

export interface ModifierOption {
  id: string;
  label: string;
  price: number; // USD added to base price
}

export interface ModifierGroup {
  id: string;
  label: string;
  /** "one" = radio (exactly one), "many" = checkboxes */
  select: "one" | "many";
  required?: boolean;
  max?: number;
  options: ModifierOption[];
  /** Where these options came from. */
  source: Verification;
}

export interface MenuItem {
  id: string;
  number: string | null; // the restaurant's menu number, if any
  nameVi: string; // Vietnamese with diacritics (editorial)
  nameClover: string; // exactly as written on the Clover menu
  nameEn: string; // short English explanation
  category: CategoryId;
  description: string; // from Clover where available
  price: number;
  art: ArtKind;
  modifierGroups: string[]; // ids into MODIFIER_GROUPS
  dietary: Dietary[];
  dietaryNote?: string;
  popular?: boolean;
  sourceUrl: string;
  verification: { price: Verification; description: Verification; nameVi: Verification };
  lastChecked: string; // ISO date
  notes?: string;
}

export type Dietary = "vegetarian" | "spicy";

export type ArtKind =
  | "pho"
  | "pho-special"
  | "pho-ga"
  | "pho-chay"
  | "bun-bo-hue"
  | "bun-rieu"
  | "bo-kho"
  | "bun"
  | "bun-chay"
  | "com-tam"
  | "com-suon"
  | "luc-lac"
  | "banh-xeo"
  | "pad-thai"
  | "banh-mi"
  | "banh-mi-chay"
  | "egg-roll"
  | "spring-roll"
  | "spring-roll-chay"
  | "thai-tea"
  | "taro-tea"
  | "mango-smoothie"
  | "che-ba-mau"
  | "che-thai";

export type CategoryId =
  | "appetizers"
  | "pho"
  | "noodle-soup"
  | "vermicelli"
  | "rice"
  | "specialties"
  | "banh-mi"
  | "vegetarian"
  | "drinks"
  | "dessert"
  | "kids"
  | "catering";

export const CATEGORIES: { id: CategoryId; label: string; labelVi: string; cloverCategory: string }[] = [
  { id: "pho", label: "Phở", labelVi: "Phở", cloverCategory: "NOODLE SOUP (17-23)" },
  { id: "noodle-soup", label: "Noodle soups", labelVi: "Bún & Hủ Tiếu", cloverCategory: "NOODLE SOUP (24-46)" },
  { id: "vermicelli", label: "Vermicelli bowls", labelVi: "Bún", cloverCategory: "VERMICELLI (47-57)" },
  { id: "rice", label: "Rice plates", labelVi: "Cơm", cloverCategory: "RICE / BROKEN RICE (85-103)" },
  { id: "banh-mi", label: "Bánh mì", labelVi: "Bánh Mì", cloverCategory: "SANDWICHES (132-143)" },
  { id: "appetizers", label: "Appetizers", labelVi: "Khai Vị", cloverCategory: "APPETIZERS (1-16)" },
  { id: "specialties", label: "Chef's specialties", labelVi: "Món Đặc Biệt", cloverCategory: "CHEF SPEACIALTY (58-84)" },
  { id: "vegetarian", label: "Vegetarian", labelVi: "Món Chay", cloverCategory: "VEGETARIAN (120-131)" },
  { id: "drinks", label: "Tea, smoothies & drinks", labelVi: "Trà, Sinh Tố & Nước", cloverCategory: "MILK TEA / FRUIT TEA / SMOOTHIES / SLUSHIE / BEVERAGES" },
  { id: "dessert", label: "Dessert", labelVi: "Chè & Tráng Miệng", cloverCategory: "VIETNAMESE DESSSERT / WAFFLE" },
  { id: "kids", label: "Kids", labelVi: "Trẻ Em", cloverCategory: "KID'S MENU" },
  { id: "catering", label: "By the pound", labelVi: "Món Mua Ký", cloverCategory: "CATERING" },
];

const CLOVER = "https://thinhankitchentofutampa.cloveronline.com/menu/all";
const CHECKED = "2026-11-18";

/**
 * Modifier groups. Options and prices are a curated subset of what the restaurant's
 * Clover page offers on "18 Pho Tai" (observed 2026-11-18). On Clover, that single long
 * list is attached to many dishes; here we show only the options that make sense per dish.
 * Which options apply to which dish must be confirmed with the owner.
 */
export const MODIFIER_GROUPS: Record<string, ModifierGroup> = {
  "pho-size": {
    id: "pho-size",
    label: "Size",
    select: "one",
    required: true,
    source: "verified-clover-online",
    options: [
      { id: "regular", label: "Regular", price: 0 },
      { id: "xl", label: "X-Large", price: 3 },
    ],
  },
  "soup-style": {
    id: "soup-style",
    label: "How would you like it?",
    select: "many",
    source: "verified-clover-online",
    options: [
      { id: "beef-side", label: "Rare beef on the side (Tái riêng)", price: 0 },
      { id: "dry", label: "Dry style, broth on the side (Làm khô)", price: 0 },
    ],
  },
  "noodle-choice": {
    id: "noodle-choice",
    label: "Noodles",
    select: "one",
    required: true,
    source: "verified-clover-online",
    options: [
      { id: "banh-pho", label: "Rice noodle (Bánh phở)", price: 0 },
      { id: "mi", label: "Egg noodle (Mì)", price: 0 },
      { id: "bun", label: "Vermicelli (Bún)", price: 0 },
      { id: "banh-canh", label: "Udon (Bánh canh)", price: 0 },
    ],
  },
  "add-beef": {
    id: "add-beef",
    label: "Add more",
    select: "many",
    source: "verified-clover-online",
    options: [
      { id: "tai", label: "Rare beef (Tái)", price: 3 },
      { id: "bo-vien", label: "Meatballs (Bò viên)", price: 3 },
      { id: "gan", label: "Tendon (Gân)", price: 3 },
      { id: "nam", label: "Well-done flank (Nạm)", price: 3 },
      { id: "extra-noodle", label: "Extra rice noodles", price: 3 },
    ],
  },
  "add-protein": {
    id: "add-protein",
    label: "Add more",
    select: "many",
    source: "verified-clover-online",
    options: [
      { id: "grilled-pork", label: "Grilled pork (Thịt nướng)", price: 7 },
      { id: "grilled-chicken", label: "Grilled chicken (Gà nướng)", price: 4 },
      { id: "egg", label: "Fried egg (Trứng ốp la)", price: 2 },
      { id: "eggroll", label: "Egg roll (Chả giò)", price: 2.5 },
      { id: "shrimp", label: "Grilled shrimp, 5 pcs (Tôm nướng)", price: 5 },
    ],
  },
  "add-veg": {
    id: "add-veg",
    label: "Add more",
    select: "many",
    source: "verified-clover-online",
    options: [
      { id: "tofu", label: "Extra tofu", price: 3 },
      { id: "broccoli", label: "Broccoli & carrot", price: 3 },
      { id: "extra-noodle", label: "Extra noodles", price: 3 },
    ],
  },
  "leave-off": {
    id: "leave-off",
    label: "Leave off",
    select: "many",
    source: "verified-clover-online",
    options: [
      { id: "no-cilantro", label: "No cilantro", price: 0 },
      { id: "no-scallion", label: "No scallion", price: 0 },
      { id: "no-onion", label: "No onion", price: 0 },
    ],
  },
  "banh-mi-options": {
    id: "banh-mi-options",
    label: "Make it yours",
    select: "many",
    source: "verified-clover-online",
    options: [
      { id: "no-cilantro", label: "No cilantro", price: 0 },
      { id: "no-cucumber", label: "No cucumber", price: 0 },
      { id: "no-pickle", label: "No pickled carrot & daikon", price: 0 },
      { id: "egg", label: "Add fried egg", price: 2 },
    ],
  },
  "rice-choice": {
    id: "rice-choice",
    label: "Rice",
    select: "one",
    required: true,
    source: "verified-clover-online",
    options: [
      { id: "broken", label: "Broken rice (Cơm tấm)", price: 0 },
      { id: "steam", label: "Steamed rice", price: 0 },
      { id: "fried", label: "Fried rice", price: 3 },
    ],
  },
  "pad-thai-meat": {
    id: "pad-thai-meat",
    label: "Choice of meat",
    select: "one",
    required: true,
    source: "verified-clover-online", // from the Clover description: "1 Choice Of Meat: Beef/Roasted Pork/Shrimp/Chicken"
    options: [
      { id: "chicken", label: "Chicken", price: 0 },
      { id: "beef", label: "Beef", price: 0 },
      { id: "roast-pork", label: "Roasted pork", price: 0 },
      { id: "shrimp", label: "Shrimp", price: 0 },
    ],
  },
  "eggroll-choice": {
    id: "eggroll-choice",
    label: "Egg roll",
    select: "one",
    required: true,
    source: "verified-clover-online", // from the Clover description of #54 / #49
    options: [
      { id: "pork", label: "Pork egg roll", price: 0 },
      { id: "chicken", label: "Chicken egg roll", price: 0 },
    ],
  },
  "bo-kho-noodle": {
    id: "bo-kho-noodle",
    label: "Served with",
    select: "one",
    required: true,
    source: "verified-clover-online", // Clover description: "with Egg Noodle OR Rice Noodle"
    options: [
      { id: "mi", label: "Egg noodle", price: 0 },
      { id: "banh-pho", label: "Rice noodle", price: 0 },
      { id: "banh-mi", label: "Bread instead (#72 Bánh Mì Bò Kho)", price: 0 },
    ],
  },
  "banh-mi-chay": {
    id: "banh-mi-chay",
    label: "Filling",
    select: "one",
    required: true,
    source: "verified-clover-online", // Clover description: "Vegetarian Tofu OR Plant-based Shredded Pork Skin"
    options: [
      { id: "tofu", label: "Tofu (Đậu hũ)", price: 0 },
      { id: "bi-chay", label: "Plant-based shredded “pork skin” (Bì chay)", price: 0 },
    ],
  },
  "drink-options": {
    id: "drink-options",
    label: "Options",
    select: "many",
    source: "editorial",
    options: [
      { id: "less-sweet", label: "Less sweet", price: 0 },
      { id: "less-ice", label: "Less ice", price: 0 },
    ],
  },
  "crispy-soft": {
    id: "crispy-soft", label: "Noodles", select: "one", required: true, source: "verified-clover-online",
    options: [
      { id: "crispy", label: "Crispy egg noodle (Mì giòn)", price: 0 },
      { id: "soft", label: "Soft stir-fried egg noodle (Mì mềm)", price: 0 },
    ],
  },
  "rice-or-egg-noodle": {
    id: "rice-or-egg-noodle", label: "Noodles", select: "one", required: true, source: "verified-clover-online",
    options: [
      { id: "hu-tieu", label: "Rice noodle (Hủ tiếu)", price: 0 },
      { id: "mi", label: "Egg noodle (Mì)", price: 0 },
    ],
  },
  "canh-chua-protein": {
    id: "canh-chua-protein", label: "Choice of", select: "one", required: true, source: "verified-clover-online",
    options: [
      { id: "fish", label: "Fish", price: 0 },
      { id: "shrimp", label: "Shrimp", price: 0 },
      { id: "tofu", label: "Tofu", price: 0 },
    ],
  },
  "pho-nhu-y": {
    id: "pho-nhu-y", label: "Pick 2 meats", select: "many", required: true, max: 2, source: "verified-clover-online",
    options: [
      { id: "tai", label: "Rare beef (Tái)", price: 0 },
      { id: "nam", label: "Well-done flank (Nạm)", price: 0 },
      { id: "gan", label: "Tendon (Gân)", price: 0 },
      { id: "bo-vien", label: "Meatballs (Bò viên)", price: 0 },
      { id: "sach", label: "Tripe (Sách)", price: 0 },
    ],
  },
  "duck-side": {
    id: "duck-side", label: "Served with", select: "one", required: true, source: "verified-clover-online",
    options: [
      { id: "bun-mang", label: "Bamboo shoot vermicelli soup", price: 0 },
      { id: "chao", label: "Congee (Cháo)", price: 0 },
    ],
  },
  "juice-choice": {
    id: "juice-choice", label: "Juice", select: "one", required: true, source: "verified-clover-online",
    options: [
      { id: "orange", label: "Orange", price: 0 },
      { id: "apple", label: "Apple", price: 0 },
    ],
  },
  "boba": {
    id: "boba", label: "Toppings", select: "many", source: "editorial",
    options: [
      { id: "boba", label: "Tapioca pearls (boba)", price: 0 },
      { id: "jelly", label: "Jelly", price: 0 },
    ],
  },
};

type Seed = Omit<MenuItem, "sourceUrl" | "lastChecked" | "verification"> & {
  verification?: Partial<MenuItem["verification"]>;
};

const seed: Seed[] = [
  // ── Phở ───────────────────────────────────────────────
  {
    id: "17-pho-dac-biet", number: "17", nameVi: "Phở Đặc Biệt", nameClover: "17 Pho Dac Biet",
    nameEn: "Special combination phở", category: "pho",
    description: "Special Pho (rare beef, well-done flank, tendon, meatball, and tripe)",
    price: 16.9, art: "pho-special", popular: true,
    modifierGroups: ["pho-size", "soup-style", "add-beef", "leave-off"], dietary: [],
    verification: { price: "cross-checked" },
  },
  {
    id: "18-pho-tai", number: "18", nameVi: "Phở Tái", nameClover: "18 Pho Tai",
    nameEn: "Rare beef phở", category: "pho",
    description: "Beef broth, rice noodle soup with sliced rare beef",
    price: 13.9, art: "pho", popular: true,
    modifierGroups: ["pho-size", "soup-style", "add-beef", "leave-off"], dietary: [],
    verification: { price: "cross-checked" },
  },
  {
    id: "20-pho-ga", number: "20", nameVi: "Phở Gà", nameClover: "20 Pho Ga",
    nameEn: "Chicken phở", category: "pho",
    description: "Beef broth, rice noodle soup w shredded chicken breast",
    price: 13.9, art: "pho-ga",
    modifierGroups: ["pho-size", "leave-off"], dietary: [],
    verification: { price: "cross-checked" },
    notes: "Clover description says beef broth for Phở Gà. Confirm with owner whether a chicken broth option exists.",
  },
  {
    id: "122-pho-chay", number: "122", nameVi: "Phở Chay Đậu Hũ & Rau", nameClover: "122 Pho Chay Dau Hu & Rau",
    nameEn: "Vegetarian tofu & vegetable phở", category: "vegetarian",
    description: "Vegetarian Tofu and Vegetable with Rice Noodle Soup",
    price: 14.9, art: "pho-chay",
    modifierGroups: ["pho-size", "add-veg", "leave-off"], dietary: ["vegetarian"],
    dietaryNote: "Listed in the restaurant's VEGETARIAN section. Broth ingredients not published.",
  },
  // ── Noodle soups ─────────────────────────────────────
  {
    id: "38-bun-bo-hue", number: "38", nameVi: "Bún Bò Huế Giò Heo", nameClover: "38 Bun Bo Hue Gio Heo",
    nameEn: "Spicy Huế-style beef & pork noodle soup", category: "noodle-soup",
    description: "Spicy Hue Style Rice Noodle Soup with Vietnamese Ham, Shank, Sliced Pork, Pork Hock, and Pork Blood Cubes",
    price: 16.9, art: "bun-bo-hue", popular: true,
    modifierGroups: ["pho-size", "leave-off"], dietary: ["spicy"],
  },
  {
    id: "41-bun-rieu-cua", number: "41", nameVi: "Bún Riêu Cua", nameClover: "41 Bun Rieu Cua",
    nameEn: "Crab & tomato noodle soup", category: "noodle-soup",
    description: "Crab Paste Rice Noodle, Shrimp, Squid and Tofu",
    price: 15.9, art: "bun-rieu",
    modifierGroups: ["pho-size", "leave-off"], dietary: [],
    verification: { price: "cross-checked" },
  },
  {
    id: "bo-kho", number: null, nameVi: "Bò Kho", nameClover: "Bo Kho",
    nameEn: "Vietnamese beef stew", category: "noodle-soup",
    description: "Beef Stew with Carrot with Egg Noodle OR Rice Noodle",
    price: 16.9, art: "bo-kho",
    modifierGroups: ["bo-kho-noodle", "leave-off"], dietary: [],
    verification: { price: "cross-checked" },
    notes: "No menu number on Clover (likely #35). Bánh Mì Bò Kho (#72, $16.90) is a separate item on Clover.",
  },
  // ── Vermicelli ───────────────────────────────────────
  {
    id: "49-bun-thit-nuong", number: "49", nameVi: "Bún Thịt Nướng Chả Giò", nameClover: "49 Bun Thit Heo Nuong & Cha Gio",
    nameEn: "Grilled pork & egg roll vermicelli", category: "vermicelli",
    description: "BBQ Pork and Pork Eggroll Vermicelli",
    price: 13.9, art: "bun", popular: true,
    modifierGroups: ["add-protein", "leave-off"], dietary: [],
    verification: { price: "cross-checked" },
  },
  {
    id: "53-bun-bo-xao-sa", number: "53", nameVi: "Bún Bò Xào Sả", nameClover: "53 Bun Thit Bo Xao Sa",
    nameEn: "Lemongrass beef vermicelli", category: "vermicelli",
    description: "Stir fried Lemongrass Beef w Vermicelli Noodle",
    price: 15.9, art: "bun",
    modifierGroups: ["add-protein", "leave-off"], dietary: [],
  },
  {
    id: "127-bun-chay", number: "127", nameVi: "Bún Chay Đậu Hũ & Chả Giò", nameClover: "127 Bun Chay Dau Hu & Cha Gio",
    nameEn: "Tofu & vegetarian egg roll vermicelli", category: "vegetarian",
    description: "Vermicelli w tofu and vegetarian eggroll",
    price: 13.9, art: "bun-chay",
    modifierGroups: ["add-veg", "leave-off"], dietary: ["vegetarian"],
    dietaryNote: "Listed in the restaurant's VEGETARIAN section. Dipping sauce ingredients not published.",
    verification: { price: "cross-checked" },
  },
  // ── Rice plates ──────────────────────────────────────
  {
    id: "87-com-tam", number: "87", nameVi: "Cơm Tấm Thịt Nướng, Bì, Chả", nameClover: "87 Com Tam Thit Nuong, Bi, Cha",
    nameEn: "Broken rice with grilled pork, pork skin & egg quiche", category: "rice",
    description: "BBQ Pork, Shredded Pork Skin, Egg Quiche with Broken Rice",
    price: 15.9, art: "com-tam", popular: true,
    modifierGroups: ["add-protein"], dietary: [],
    verification: { price: "cross-checked" },
  },
  {
    id: "88-com-suon-bo", number: "88", nameVi: "Cơm Sườn Bò Nướng", nameClover: "88 Com Suon Bo Nuong",
    nameEn: "Grilled beef short ribs with rice", category: "rice",
    description: "Grilled Beef Short Ribs with Steam Rice",
    price: 15.9, art: "com-suon",
    modifierGroups: ["rice-choice", "add-protein"], dietary: [],
    verification: { price: "cross-checked" },
  },
  {
    id: "103-com-bo-luc-lac", number: "103", nameVi: "Cơm Bò Lúc Lắc", nameClover: "103 Com Bo Luc Lac",
    nameEn: "Shaking beef with rice", category: "rice",
    description: "Shaking Beef and Onion with Steam Rice",
    price: 17.9, art: "luc-lac", popular: true,
    modifierGroups: ["rice-choice", "add-protein"], dietary: [],
    verification: { price: "cross-checked" },
  },
  // ── Specialties ──────────────────────────────────────
  {
    id: "60-banh-xeo", number: "60", nameVi: "Bánh Xèo", nameClover: "60 Banh Xeo",
    nameEn: "Crispy turmeric crêpe with shrimp & pork belly", category: "specialties",
    description: "Vietnamese Shrimp and Pork Belly Crispy Pancake",
    price: 14.9, art: "banh-xeo",
    modifierGroups: ["leave-off"], dietary: [],
    verification: { price: "cross-checked" },
  },
  {
    id: "76-pad-thai", number: "76", nameVi: "Pad Thai", nameClover: "76 Pad Thai",
    nameEn: "Stir-fried rice noodles, choice of meat", category: "specialties",
    description: "Pad Thai w 1 Choice Of Meat: Beef/Roasted Pork/Shrimp/Chicken",
    price: 16.9, art: "pad-thai",
    modifierGroups: ["pad-thai-meat"], dietary: [],
    verification: { price: "cross-checked", nameVi: "verified-clover-online" },
  },
  // ── Bánh mì ──────────────────────────────────────────
  {
    id: "132-banh-mi-dac-biet", number: "132", nameVi: "Bánh Mì Đặc Biệt", nameClover: "132 Banh Mi Dac Biet",
    nameEn: "The house special bánh mì", category: "banh-mi",
    description: "Special sandwich w pate, Vietnamese ham, roasted pork, and headcheese",
    price: 6.9, art: "banh-mi", popular: true,
    modifierGroups: ["banh-mi-options"], dietary: [],
  },
  {
    id: "141-banh-mi-ga-nuong", number: "141", nameVi: "Bánh Mì Gà Nướng", nameClover: "141 Banh Mi Ga Nuong",
    nameEn: "Grilled chicken bánh mì", category: "banh-mi",
    description: "Grilled chicken sandwich",
    price: 6.9, art: "banh-mi",
    modifierGroups: ["banh-mi-options"], dietary: [],
  },
  {
    id: "131-banh-mi-chay", number: "131", nameVi: "Bánh Mì Đậu Hũ / Bì Chay", nameClover: "131 Banh Mi Dau Hu / Bi Chay",
    nameEn: "Vegetarian tofu bánh mì", category: "vegetarian",
    description: "Vegetarian Tofu OR Plant-based Shredded Pork Skin Sandwich",
    price: 6.9, art: "banh-mi-chay",
    modifierGroups: ["banh-mi-chay", "banh-mi-options"], dietary: ["vegetarian"],
    dietaryNote: "Listed in the restaurant's VEGETARIAN section. Bread and sauce ingredients not published.",
  },
  // ── Appetizers ───────────────────────────────────────
  {
    id: "1-cha-gio-heo", number: "1", nameVi: "Chả Giò Heo (2)", nameClover: "1 Cha Gio Heo (2pcs)",
    nameEn: "Crispy pork egg rolls, 2 pcs", category: "appetizers",
    description: "Pork Eggroll (2pcs) (Crispy)",
    price: 5.9, art: "egg-roll",
    modifierGroups: [], dietary: [],
  },
  {
    id: "4-goi-cuon", number: "4", nameVi: "Gỏi Cuốn Tôm Thịt (2)", nameClover: "4 Goi Cuon Tom Thit (2pcs)",
    nameEn: "Fresh shrimp & pork spring rolls, 2 pcs", category: "appetizers",
    description: "Shrimp and Pork Spring Rolls (2PCS) (Soft)",
    price: 5.9, art: "spring-roll", popular: true,
    modifierGroups: [], dietary: [],
  },
  {
    id: "121-goi-cuon-chay", number: "121", nameVi: "Gỏi Cuốn Chay (2)", nameClover: "121 Goi Cuon Chay (2pcs)",
    nameEn: "Fresh tofu spring rolls, 2 pcs", category: "vegetarian",
    description: "Tofu Spring Rolls (2PCS)(Soft)",
    price: 5.9, art: "spring-roll-chay",
    modifierGroups: [], dietary: ["vegetarian"],
    dietaryNote: "Listed in the restaurant's VEGETARIAN section. Dipping sauce ingredients not published.",
  },
  // ── Drinks ───────────────────────────────────────────
  {
    id: "thai-tea-mt", number: null, nameVi: "Trà Sữa Thái", nameClover: "THAI TEA MT",
    nameEn: "Thai tea milk tea", category: "drinks",
    description: "Milk tea. Clover lists it as “THAI TEA MT”; description not published.",
    price: 6.9, art: "thai-tea",
    modifierGroups: ["drink-options"], dietary: [],
    verification: { description: "editorial" },
  },
  {
    id: "taro-mt", number: null, nameVi: "Trà Sữa Khoai Môn", nameClover: "TARO MT",
    nameEn: "Taro milk tea", category: "drinks",
    description: "Milk tea. Clover lists it as “TARO MT”; description not published.",
    price: 6.9, art: "taro-tea",
    modifierGroups: ["drink-options"], dietary: [],
    verification: { description: "editorial" },
  },
  {
    id: "mango-sm", number: null, nameVi: "Sinh Tố Xoài", nameClover: "MANGO SM",
    nameEn: "Mango smoothie", category: "drinks",
    description: "Smoothie. Clover lists it as “MANGO SM”; description not published.",
    price: 8.5, art: "mango-smoothie",
    modifierGroups: ["drink-options"], dietary: [],
    verification: { description: "editorial" },
  },
  // ── Dessert ──────────────────────────────────────────
  {
    id: "che-3-mau", number: null, nameVi: "Chè Ba Màu", nameClover: "Three Color Dessert / Che 3 Mau",
    nameEn: "Three-color bean & jelly dessert", category: "dessert",
    description: "Three Color Dessert / Che 3 Mau",
    price: 7.9, art: "che-ba-mau",
    modifierGroups: [], dietary: [],
  },
];

for (const d of DRINK_LINES) {
  MODIFIER_GROUPS[`flavor-${d.id}`] = {
    id: `flavor-${d.id}`, label: "Flavor", select: "one", required: true, source: "verified-clover-online",
    options: d.flavors.map((f) => ({ id: f.toLowerCase().replace(/[^a-z]+/g, "-"), label: f, price: 0 })),
  };
}

/** Pick a stand-in illustration for items without a hand-picked one. */
function artFor(name: string, cat: CategoryId): ArtKind {
  const n = name.toLowerCase();
  if (cat === "drinks") return /coconut|soy|lemon|water|perrier|juice/.test(n) ? "mango-smoothie" : "thai-tea";
  if (cat === "dessert") return /durian|thai/.test(n) ? "che-thai" : "che-ba-mau";
  if (/bánh mì|banh mi/.test(n)) return cat === "vegetarian" ? "banh-mi-chay" : "banh-mi";
  if (/gỏi cuốn|bì cuốn/.test(n)) return "spring-roll";
  if (/chả giò|xếp|rangoon|cánh gà|khoai|gà viên/.test(n)) return cat === "vegetarian" ? "egg-roll" : "egg-roll";
  if (/phở/.test(n) && !/áp chảo/.test(n)) return cat === "vegetarian" ? "pho-chay" : "pho";
  if (/bún bò huế/.test(n)) return "bun-bo-hue";
  if (/riêu|canh chua|mì quảng/.test(n)) return "bun-rieu";
  if (/bún|bánh hỏi/.test(n)) return cat === "vegetarian" ? "bun-chay" : "bun";
  if (/xào|áp chảo|pad thai/.test(n)) return "pad-thai";
  if (/lúc lắc|kho tộ|tôm rang|mực|bò kho|cà ri/.test(n)) return "luc-lac";
  if (/cơm tấm/.test(n)) return "com-tam";
  if (/cơm|xôi|vịt|gà quay|sườn|thịt nướng|cút/.test(n)) return "com-suon";
  if (/hủ tiếu|mì|bánh canh|cháo|súp/.test(n)) return cat === "vegetarian" ? "pho-chay" : "pho-ga";
  return "banh-xeo";
}

function modsFor(r: { nameClover: string; category: CategoryId }): string[] {
  const n = r.nameClover.toLowerCase();
  if (/nhu y/.test(n)) return ["pho-nhu-y", "pho-size", "leave-off"];
  if (/mi xao/.test(n)) return ["crispy-soft", "leave-off"];
  if (/sa te/.test(n)) return ["rice-or-egg-noodle", "leave-off"];
  if (/canh chua/.test(n)) return ["canh-chua-protein"];
  if (/goi vit/.test(n)) return ["duck-side"];
  if (/bun cha gio$/.test(n)) return ["eggroll-choice", "leave-off"];
  if (/orange \/ apple/.test(n)) return ["juice-choice"];
  if (r.category === "pho") return ["pho-size", "soup-style", "leave-off"];
  if (r.category === "banh-mi") return ["banh-mi-options"];
  if (r.category === "drinks") return ["drink-options"];
  if (["noodle-soup", "vermicelli", "rice", "specialties", "vegetarian"].includes(r.category)) return ["leave-off"];
  return [];
}

const curated: MenuItem[] = seed.map((s) => ({
  ...s,
  sourceUrl: CLOVER,
  lastChecked: CHECKED,
  verification: {
    price: "verified-clover-online",
    description: "verified-clover-online",
    nameVi: "editorial",
    ...s.verification,
  },
}));

const curatedNumbers = new Set(curated.map((m) => m.number).filter(Boolean));

const generated: MenuItem[] = RAW_ITEMS.filter((r) => !r.number || !curatedNumbers.has(r.number)).map((r) => ({
  id: r.id,
  number: r.number,
  nameVi: r.nameVi,
  nameClover: r.nameClover,
  nameEn: r.nameEn,
  category: r.category,
  description: r.description,
  price: r.price,
  art: artFor(r.nameVi, r.category),
  modifierGroups: modsFor(r),
  dietary: r.category === "vegetarian" ? ["vegetarian"] : /bún bò huế|cay|spicy|sa tế|mì quảng/i.test(r.nameVi + r.description) ? ["spicy"] : [],
  dietaryNote: r.category === "vegetarian" ? "Listed in the restaurant's VEGETARIAN section. Broth ingredients not published." : undefined,
  sourceUrl: CLOVER,
  lastChecked: "2026-11-19",
  verification: { price: "verified-clover-online", description: "verified-clover-online", nameVi: "editorial" },
}));

const drinks: MenuItem[] = DRINK_LINES.map((d) => ({
  id: d.id,
  number: null,
  nameVi: d.nameVi,
  nameClover: d.flavors.map((f) => `${f.toUpperCase()} ${d.suffix}`).join(", "),
  nameEn: `${d.nameEn}, ${d.flavors.length} flavors`,
  category: "drinks" as CategoryId,
  description: `Choose from ${d.flavors.slice(0, 5).join(", ").toLowerCase()} and ${d.flavors.length - 5} more.`,
  price: d.price,
  art: d.id === "smoothie" ? "mango-smoothie" : d.id === "milk-tea" ? "taro-tea" : "thai-tea",
  modifierGroups: [`flavor-${d.id}`, ...(d.id === "milk-tea" || d.id === "fruit-tea" ? ["boba"] : []), "drink-options"],
  dietary: [],
  sourceUrl: CLOVER,
  lastChecked: "2026-11-19",
  verification: { price: "verified-clover-online", description: "editorial", nameVi: "editorial" },
}));

const num = (m: MenuItem) => (m.number ? Number(m.number) : 999);
export const MENU: MenuItem[] = [...curated, ...generated, ...drinks].sort((a, b) => num(a) - num(b));
export const MENU_COUNT = MENU.length;

/** Real Clover prices we could not use in the demo, kept for the record. */
export const EXCLUDED_NOTES = [
  "Beer and wine (12 beers, 4 wines on Clover) are left out of the online demo. Whether alcohol can be sold for online pickup is the owner's call.",
  "Items Clover shows as Sold Out (Happy Hour specials, Golden Poultry, Spring Roll) and the unexplained “PHO PERFECTION” ($23.90) and “UPGRADE YOUR DRINK” ($2.50) are left out.",
  "VIETNAMESE COFFEE, SUGARCANE, Iced Tea, Hot Tea and SOFT DRINK show $0.00 on Clover (price likely set by a size option). Left out until the owner confirms prices.",
  "Cajun Boiled Crawfish / Shrimp are market price ($0.00 on Clover). Left out.",
];

export function findItem(id: string) {
  return MENU.find((m) => m.id === id);
}
