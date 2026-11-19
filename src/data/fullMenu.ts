/**
 * The rest of the restaurant's Clover menu (everything not hand-curated in menu.ts).
 *
 * Copied from https://thinhankitchentofutampa.cloveronline.com/menu/all on 2026-11-19.
 * Columns: number | Clover name | price | Clover description | Vietnamese (our rendering) | English | category
 *
 * Left out on purpose: items priced $0.00 (market price or priced by size), "Sold Out" items,
 * beer and wine, happy-hour placeholders and duplicates. Vietnamese spellings need the owner's review.
 */
import type { CategoryId } from "./menu";

const T = `
2|2 Cha Gio Ga (2 pcs)|5.90|Fried Chicken Eggroll (2PCS)(Crispy)|Chả Giò Gà|Chicken egg rolls (2)|appetizers
3|3 Cha Gio Tom (3pcs)|5.90|Shrimp Eggrolls (3pcs)|Chả Giò Tôm|Shrimp egg rolls (3)|appetizers
5|5 Goi Cuon Tom (2pcs)|5.90|Shrimp Spring Rolls (2PCS)(Soft)|Gỏi Cuốn Tôm|Shrimp spring rolls (2)|appetizers
6|6 Goi Bi Cuon (2 pcs)|5.90|Pork Skin Spring Roll (2PCS)(Soft)|Bì Cuốn|Shredded pork skin spring rolls (2)|appetizers
7|7 Goi Cuon Ga Nuong (2pcs)|5.90|Grilled Chicken Spring Rolls (2PCS)(Soft)|Gỏi Cuốn Gà Nướng|Grilled chicken spring rolls (2)|appetizers
8|8 Goi Cuon Nem Nuong (2pcs)|5.90|Grilled Ground Pork Spring Rolls (2PCS)(Soft)|Gỏi Cuốn Nem Nướng|Grilled pork sausage spring rolls (2)|appetizers
9|9 Goi Cuon Thit Heo Nuong (2pcs)|5.90|Grilled Pork Spring Rolls (2PCS)(Soft)|Gỏi Cuốn Thịt Heo Nướng|Grilled pork spring rolls (2)|appetizers
10|10 Banh Cuon Nhan Thit & Cha|14.90|Vietnamese steam ground pork roll with Vietnamese ham|Bánh Cuốn Nhân Thịt & Chả|Steamed rice rolls with pork & ham|appetizers
11|11 Banh Xep Chien|7.90|Fried Pork Dumpling|Bánh Xếp Chiên|Fried pork dumplings|appetizers
12|12 Krab Rangoon (8pcs)|8.90|Krab rangoon (8 pcs)|Krab Rangoon|Krab rangoon (8)|appetizers
13|13 Banh Xep Hap|7.90|Steamed dumplings filled with pork|Bánh Xếp Hấp|Steamed pork dumplings|appetizers
14|14 Canh Ga Chien Nuoc Mam (4pcs)|12.90|Fried chicken wings glazed with savory fish sauce|Cánh Gà Chiên Nước Mắm|Fish-sauce chicken wings (4)|appetizers
15|15 Sup Hoanh Thanh (4pcs)|6.90|Wontons filled w pork and shrimp|Súp Hoành Thánh|Wonton soup (4)|appetizers
16|16 Goi Ngo Sen|19.90|Lotus roots salad w shrimp and pork|Gỏi Ngó Sen|Lotus root salad with shrimp & pork|appetizers
19|19 Pho Bo Vien|13.90|Beef broth, rice noodle soup w meat balls|Phở Bò Viên|Meatball phở|pho
21|21 Pho Hai San|15.90|Beef broth, rice noodle soup w shrimp, squid, fried fish cube|Phở Hải Sản|Seafood phở|pho
22|22 Pho Nhu Y|14.90|Pick 2 options (Sliced rare beef, well-done flank, tendon, meatball, or tripe)|Phở Như Ý|Build-your-own phở (pick 2 meats)|pho
23|23 Pho Suon Bo|19.90|Beef broth, rice noodle soup with Beef Ribs|Phở Sườn Bò|Beef rib phở|pho
84|84 Pho Bo Filet Mignon|20.90|Beef Noodle Soup Featuring Tender Slices Of Filet Mignon|Phở Bò Filet Mignon|Filet mignon phở|pho
24|24 SEAFOOD Noodle Soup|15.90|Chicken Broth, Rice Noodle Soup With Shrimp, Squid, and Fried Fish Cube|Hủ Tiếu Hải Sản|Seafood noodle soup|noodle-soup
25|25 Hu Tieu Ga|13.90|Chicken Broth, Rice Noodle Soup with Shredded Chicken Breast|Hủ Tiếu Gà|Chicken rice-noodle soup|noodle-soup
26|26 Hu Tieu Tom|15.90|Chicken Broth, Rice Noodle Soup with Shrimp|Hủ Tiếu Tôm|Shrimp rice-noodle soup|noodle-soup
27|27 Mi Thap Cam|15.90|Chicken Broth, Egg Noodle with Vietnamese Ham, Pork, Shrimp, Squid, Fried Fish Cube, and Quail Eggs|Mì Thập Cẩm|House combo egg-noodle soup|noodle-soup
28|28 Mi Xa Xiu|13.90|Chicken Broth, Egg Noodle with Tender Roasted Pork|Mì Xá Xíu|Roast pork egg-noodle soup|noodle-soup
29|29 Mi Hai San|15.90|Chicken Broth, Egg Noodle with Shrimp, Squid, and Fried Fish Cube|Mì Hải Sản|Seafood egg-noodle soup|noodle-soup
30|30 Mi Hoanh Thanh (6pcs)|13.90|Chicken Broth, Egg Noodle with Wonton|Mì Hoành Thánh|Wonton egg-noodle soup|noodle-soup
31|31 Hu Tieu Dac Biet Thinh An|15.90|Chicken Broth, Rice Noodle with Vietnamese Ham, Pork, Shrimp, Squid, Fried Fish Cube, and Quai Eggs|Hủ Tiếu Đặc Biệt Thịnh An|Thịnh An special rice-noodle soup|noodle-soup
32|32 Banh Canh Dac Biet|15.90|Udon Noodle Soup with Vietnamese Ham, Pork, Shrimp, Squid Fried Fish Cube, and Quail Eggs|Bánh Canh Đặc Biệt|Special thick-noodle soup|noodle-soup
33|33 Banh Canh Hai San|15.90|Udon Noodle Soup with Shrimp, Squid, and Fried Fish Cube|Bánh Canh Hải Sản|Seafood thick-noodle soup|noodle-soup
34|34 Banh Canh Tom Thit|15.90|Udon Noodle Soup with Shrimp and Pork|Bánh Canh Tôm Thịt|Shrimp & pork thick-noodle soup|noodle-soup
36|36 Mi Xa Xiu Hoanh Thanh (6pcs)|14.90|Chicken Broth, Egg Noodle with Wonton and Roasted Pork|Mì Xá Xíu Hoành Thánh|Wonton & roast pork egg-noodle soup|noodle-soup
37|37 Hu Tieu / Mi Bo Sa Te|14.90|Satay Beef Noodle Soup with Rice Noodle OR Egg Noodle|Hủ Tiếu / Mì Bò Sa Tế|Satay beef noodle soup|noodle-soup
39|39 Bun Moc|14.90|Vermicelli Noodle Soup with Pork Mushroom Meatballs, Pork Spare Ribs, and Vietnamese Ham|Bún Mọc|Pork meatball vermicelli soup|noodle-soup
40|40 Bun Mang Vit|17.90|Vietnamese Duck and Bamboo Shoots Vermicelli Noodle Soup|Bún Măng Vịt|Duck & bamboo shoot noodle soup|noodle-soup
42|42 Mi Vit Tiem|17.90|Vietnamese Roasted Duck Soup with Egg Noodle|Mì Vịt Tiềm|Braised duck egg-noodle soup|noodle-soup
43|43 Chao Vit|14.90|Duck Congee|Cháo Vịt|Duck congee|noodle-soup
44|44 Chao Ga|12.90|Chicken Congee|Cháo Gà|Chicken congee|noodle-soup
45|45 Mi Quang|14.90|Spicy Quang-style Flat Yellow Noodle Soup with Pork Spare Ribs, Shrimp, and Vietnamese Ham|Mì Quảng|Quảng-style turmeric noodles|noodle-soup
46|46 Chao Long Heo|15.90|Congee with Pork Organ and Pork Blood (Available Sat & Sun)|Cháo Lòng Heo|Pork organ congee (Sat & Sun)|noodle-soup
47|47 Bun Thinh An|18.90|Vermicelli with BBQ Pork, Shrimp Patty, Pork Eggroll, and Grilled Shrimp|Bún Thịnh An|Thịnh An house vermicelli|vermicelli
48|48 Bun Tom Nuong & Cha Gio|14.90|Grilled Shrimp and Pork Eggroll Vermicelli|Bún Tôm Nướng & Chả Giò|Grilled shrimp & egg roll vermicelli|vermicelli
50|50 Bun Thit Ga Xao Sa|14.90|Stir-fried Lemongrass Chicken Vermicelli|Bún Gà Xào Sả|Lemongrass chicken vermicelli|vermicelli
51|51 Bun Thit Ga Nuong & Cha Gio|13.90|Grilled Chicken and Chicken Eggroll Vermicelli|Bún Gà Nướng & Chả Giò|Grilled chicken & egg roll vermicelli|vermicelli
52|52 Bun Nem Nuong & Cha Gio|14.90|Grilled Grounded Pork and Pork Eggroll Vermicelli|Bún Nem Nướng & Chả Giò|Grilled pork sausage & egg roll vermicelli|vermicelli
54|54 Bun Cha Gio|13.90|Pork Eggroll OR Chicken Eggroll Vermicelli|Bún Chả Giò|Egg roll vermicelli|vermicelli
55|55 Banh Hoi Tom Nuong|18.90|Angel Hair Noodle with Grilled Shrimp|Bánh Hỏi Tôm Nướng|Woven rice noodles with grilled shrimp|vermicelli
56|56 Banh Hoi Nem Nuong|18.90|Angel Hair Noodle with Grilled Grounded Pork|Bánh Hỏi Nem Nướng|Woven rice noodles with pork sausage|vermicelli
57|57 Banh Hoi Thit Heo Nuong|16.90|Angel Hair Noodle with BBQ Pork|Bánh Hỏi Thịt Heo Nướng|Woven rice noodles with BBQ pork|vermicelli
104|104 Banh Hoi Heo Quay|19.95|CRISPY PORK w/ ANGEL HAIR NOODLE|Bánh Hỏi Heo Quay|Woven rice noodles with crispy pork|vermicelli
107|107 Bun Dau Mam Tom ( 2 Nguoi )|34.90|Vermicelli with fried tofu, fish cake, and sliced pork (2 servings). Comes with fermented shrimp paste|Bún Đậu Mắm Tôm (2 người)|Tofu & shrimp-paste vermicelli platter for 2|vermicelli
85|85 Com Tam Thinh An|20.90|Thinh An Special Rice Plate with Pork Chop, Shredded Pork Skin, Egg Quiche, Grilled Shrimps, Fried Egg, and Beef Short Ribs with Broken Rice|Cơm Tấm Thịnh An|Thịnh An special broken-rice plate|rice
86|86 Com Tam Suon, Bi, Cha|15.90|Grilled Pork Chop, Shredded Pork Skin, and Egg Quiche with Broken Rice|Cơm Tấm Sườn, Bì, Chả|Pork chop, pork skin & egg quiche broken rice|rice
89|89 Com Dui Ga Nuong|15.90|Grilled Chicken Thigh with Steam Rice|Cơm Đùi Gà Nướng|Grilled chicken thigh with rice|rice
90|90 Com Ga Nuong|14.90|Grilled Chicken with Steam Rice|Cơm Gà Nướng|Grilled chicken with rice|rice
91|91 Com Ga Nuong Kieu Nhat|15.90|Teriyaki Chicken with Steam Rice|Cơm Gà Nướng Kiểu Nhật|Teriyaki chicken with rice|rice
92|92 Com Chien Duong Chau|15.90|Deluxe Fried Rice with Vietnamese Sausage, Shrimp, Chicken, and Roasted Pork|Cơm Chiên Dương Châu|Deluxe Yangzhou fried rice|rice
93|93 Com Chien Tom|14.90|Shrimp Fried Rice|Cơm Chiên Tôm|Shrimp fried rice|rice
94|94 Com Chien Bo Filet Mignon|20.90|Fried Rice with Tender Filet Mignon|Cơm Chiên Bò Filet Mignon|Filet mignon fried rice|rice
95|95 Com Chien Hai San|14.90|Seafood (Shrimp, Squid, and Fried Fish Cube) Fried Rice|Cơm Chiên Hải Sản|Seafood fried rice|rice
96|96 Com Chien Bo|15.90|Beef Fried Rice|Cơm Chiên Bò|Beef fried rice|rice
97|97 Com Chien Xa Xiu|13.90|Roasted Pork Fried Rice|Cơm Chiên Xá Xíu|Roast pork fried rice|rice
98|98 Com Chien Ga|13.90|Chicken Fried Rice|Cơm Chiên Gà|Chicken fried rice|rice
99|99 Com Chien Ga Nuong|13.90|Grilled Chicken Fried Rice|Cơm Chiên Gà Nướng|Grilled chicken fried rice|rice
100|100 Com Chien Heo Nuong|13.90|Grilled Pork Fried Rice|Cơm Chiên Heo Nướng|Grilled pork fried rice|rice
101|101 Com Bo Xao Sa|16.90|Steam Rice with Lemongrass Beef|Cơm Bò Xào Sả|Lemongrass beef with rice|rice
102|102 Com Ga Xao Sa|14.90|Steam Rice with Lemongrass Chicken|Cơm Gà Xào Sả|Lemongrass chicken with rice|rice
105|105 Com Chien Ga Quay|16.90|Roasted Cornish Hen w/ Fried Rice|Cơm Chiên Gà Quay|Roast Cornish hen with fried rice|rice
106|106 Com Chien Vit Quay|16.90|Roasted Duck w/ Fried Rice|Cơm Chiên Vịt Quay|Roast duck with fried rice|rice
110|110 Com Chien Heo Quay|16.90|CRISPY PORK w/ Fried Rice|Cơm Chiên Heo Quay|Crispy pork with fried rice|rice
78|78 Com Chien Tom Rang Me|16.90|Fried Rice with Tangy-Sweet Vietnamese Fried Shrimp|Cơm Chiên Tôm Rang Me|Tamarind shrimp fried rice|rice
81|81 Com Chien Tom Rang Muoi|15.90|Fried Rice with Savory-Salty Seasoning Mix Fried Shrimp|Cơm Chiên Tôm Rang Muối|Salt & pepper shrimp fried rice|rice
82|82 Com Cut Chien Bo|18.90|Butter-Fried Quail with Crispy Skin and Juicy, Flavorful Meat with Rice|Cơm Cút Chiên Bơ|Butter-fried quail with rice|rice
83|83 Com Chien Ga Xoi Mo|14.90|Golden Fried Chicken with Fried Rice|Cơm Chiên Gà Xối Mỡ|Crispy fried chicken with fried rice|rice
59|59 Banh Mi Ca Ri Ga|14.90|Spicy Curry Chicken and Potato with Bread|Bánh Mì Cà Ri Gà|Chicken curry with bread|specialties
61|61 Mi Xao Hai San|15.90|Seafood (Shrimp, Squid, Fish Cubes) w/ Crispy OR Stir-fried Soft Egg Noodle|Mì Xào Hải Sản|Seafood stir-fried egg noodles|specialties
62|62 Mi Xao Thit Ga|15.90|Chicken Breast Meat w/ Crispy OR Stir-fried Soft Egg Noodle|Mì Xào Gà|Chicken stir-fried egg noodles|specialties
63|63 Mi Xao Thit Bo|17.90|Sliced Beef w/ Crispy OR Stir-fried Soft Egg Noodle|Mì Xào Bò|Beef stir-fried egg noodles|specialties
64|64 Goi Vit ( NUA CON )|28.90|Duck Salad (Half Duck and One Bowl of Bamboo Shoots, and Vermicelli Noodle Soup, OR Congee)|Gỏi Vịt (Nửa Con)|Duck salad, half duck|specialties
65|65 Goi Vit ( NGUYEN CON )|48.90|Duck Salad (Whole Duck and Two Bowls of Bamboo Shoots, and Vermicelli Noodle Soup, OR Congee)|Gỏi Vịt (Nguyên Con)|Duck salad, whole duck|specialties
66|66 Pho Ap Chao Hai San|16.90|Seafood (Shrimp, Squid, and Fried Fish Cube) Pan-Fried Rice Noodle with Egg|Phở Áp Chảo Hải Sản|Seafood pan-fried rice noodles|specialties
67|67 Pho Ap Chao Thit Ga|16.90|Chicken Pan-Fried Rice Noodle with Egg|Phở Áp Chảo Gà|Chicken pan-fried rice noodles|specialties
68|68 Pho Ap Chao Thit Bo|16.90|Beef Pan-Fried Rice Noodle with Egg|Phở Áp Chảo Bò|Beef pan-fried rice noodles|specialties
69|69 Hu Tieu Xao Hai San|16.90|Seafood Stir-fried Soft Rice Noodle with Broccoli, Carrot, Beansprout, and Celery|Hủ Tiếu Xào Hải Sản|Seafood stir-fried rice noodles|specialties
70|70 Hu Tieu Xao Thit Ga|16.90|Chicken Stir-fried Soft Rice Noodle with Broccoli, Carrot, Beansprout, and Celery|Hủ Tiếu Xào Gà|Chicken stir-fried rice noodles|specialties
71|71 Hu Tieu Xao Thit Bo|16.90|Beef Stir-fried Soft Rice Noodle with Broccoli, Carrot, Beansprout, and Celery|Hủ Tiếu Xào Bò|Beef stir-fried rice noodles|specialties
72|72 Banh Mi Bo Kho|16.90|Beef Stew and Carrot with Bread|Bánh Mì Bò Kho|Beef stew with bread|specialties
73|73 Ca Kho To|16.90|Vietnamese Braised Catfish in Clay Pot, Served with Rice and Vegetables|Cá Kho Tộ|Clay-pot caramelized catfish|specialties
75|75 Pad Thai Dac Biet|17.90|Special Pad Thai with Chicken, Shrimp, Tofu, and Roasted Pork|Pad Thai Đặc Biệt|Special pad thai|specialties
77|77 Tom Rang Me|24.90|Tangy-Sweet Vietnamese Fried Shrimp|Tôm Rang Me|Tamarind fried shrimp|specialties
79|79 Tom Rang Muoi|24.90|Salted and Pepper Shrimp|Tôm Rang Muối|Salt & pepper shrimp|specialties
80|80 Chim Cut Chien Bo|25.90|Butter-fried Quail|Chim Cút Chiên Bơ|Butter-fried quail|specialties
108|108 Vit Quay Nguyen Con|47.90|Whole Roasted Duck|Vịt Quay Nguyên Con|Whole roast duck|specialties
-|ROASTED DUCK (HALF)|25.90|1/2 roasted duck|Vịt Quay (Nửa Con)|Half roast duck|specialties
109|109 Suon Kho To|16.90|Clay-pot braised pork ribs|Sườn Kho Tộ|Clay-pot braised pork ribs|specialties
113|113 Canh Chua|20.90|Tamarind Sweet & Sour Soup With Your Choice Of Fish, Shrimp, Or Tofu|Canh Chua|Tamarind sweet & sour soup|specialties
114|114 Goi Thai Tom|20.90|THAI STYLE Salad With Shrimp|Gỏi Thái Tôm|Thai-style shrimp salad|specialties
117|117 Rau Muong Xao Toi|16.90|Stir-fried water spinach with garlic|Rau Muống Xào Tỏi|Garlic water spinach|specialties
118|118 Com Dau Hu Sot Me|16.90|Sweet and sesame tofu with steamed rice|Cơm Đậu Hũ Sốt Mè|Sesame tofu with rice|specialties
-|Xoi Chien Vit Quay|18.90|Roasted Duck with crispy sticky rice|Xôi Chiên Vịt Quay|Roast duck with crispy sticky rice|specialties
-|Xoi Chien Heo Quay|18.90|Cripy Pork with crispy sticky rice|Xôi Chiên Heo Quay|Crispy pork with crispy sticky rice|specialties
-|Xoi Chien Ga Quay|18.90|Roasted Cornish Hen Chicken w/ crispy sticky rice|Xôi Chiên Gà Quay|Roast hen with crispy sticky rice|specialties
-|Tom Rangg Bo Toi|24.90|Pan-seared shrimp with butter garlic powder|Tôm Rang Bơ Tỏi|Garlic butter shrimp|specialties
-|MUC RANG BO TOI|19.90|Pan-seared squid with butter garlic powder|Mực Rang Bơ Tỏi|Garlic butter squid|specialties
-|BO LUC LAC|24.90|SHAKING BEEF|Bò Lúc Lắc|Shaking beef (entrée)|specialties
120|120 Cha Gio Chay (2 pcs)|5.90|Vegetarian Eggrolls (2PCS) (Crispy)|Chả Giò Chay|Vegetarian egg rolls (2)|vegetarian
123|123 Banh Canh Chay|14.90|Vegetarian udon noodle soup with tofu and vegetables|Bánh Canh Chay|Vegetarian thick-noodle soup|vegetarian
124|124 Mi Chay Dau Hu & Rau|14.90|Vegetarian tofu and vegetable with egg noodle|Mì Chay Đậu Hũ & Rau|Tofu & vegetable egg-noodle soup|vegetarian
125|125 Mi Xao Chay|15.90|Soft or Crispy egg Noodle w vegetarian stir-fried, tofu and vegetables|Mì Xào Chay|Vegetarian stir-fried egg noodles|vegetarian
126|126 Banh Hoi Chay|15.90|Angel hair noodle w Sauteed lemongrass and chili tofu|Bánh Hỏi Chay|Woven rice noodles with lemongrass tofu|vegetarian
128|128 Bun Bo Hue Chay|15.90|Spicy vegetarian Hue - style rice noodle soup|Bún Bò Huế Chay|Vegetarian spicy Huế noodle soup|vegetarian
129|129 Com Chien Chay Dau Hu ( Co Trung )|13.90|Vegetarian fried rice w tofu, EGG, peas and carrots|Cơm Chiên Chay Đậu Hũ (có trứng)|Tofu fried rice (contains egg)|vegetarian
130|130 Com Tam Dau Hu Xao Sa|14.90|Vegetarian broken rice w sauteed lemongrass and chili tofu|Cơm Tấm Đậu Hũ Xào Sả|Lemongrass tofu broken rice|vegetarian
133|133 Banh Mi Bi|6.90|Shredded pork skin sandwich|Bánh Mì Bì|Shredded pork skin bánh mì|banh-mi
134|134 Banh Mi Xa Xiu|6.90|Roasted pork sandwich|Bánh Mì Xá Xíu|Roast pork bánh mì|banh-mi
135|135 Banh Mi Xiu Mai|6.90|Pork meatball sandwich|Bánh Mì Xíu Mại|Pork meatball bánh mì|banh-mi
136|136 Banh Mi Nem Nuong|6.90|Grilled ground pork sandwich|Bánh Mì Nem Nướng|Grilled pork sausage bánh mì|banh-mi
137|137 Banh Mi Thit Nuong|6.90|BBQ Pork sandwich|Bánh Mì Thịt Nướng|BBQ pork bánh mì|banh-mi
138|138 Banh Mi Pate Va Cha|6.90|Pate and Vietnamese ham sandwich|Bánh Mì Pa-tê & Chả|Pâté & ham bánh mì|banh-mi
139|139 Banh Mi Trung Opla & Cha|6.90|Over-easy egg and Vietnamese ham sandwich|Bánh Mì Trứng Ốp La & Chả|Fried egg & ham bánh mì|banh-mi
140|140 Banh Mi Trung Opla|6.90|Over-easy Egg Sandwich|Bánh Mì Trứng Ốp La|Fried egg bánh mì|banh-mi
142|142 Banh Mi Tom Nuong|8.00|Grilled shrimp sandwich|Bánh Mì Tôm Nướng|Grilled shrimp bánh mì|banh-mi
143|143 Banh Mi Heo Quay|6.90|CRISPY PORK SANDWICH|Bánh Mì Heo Quay|Crispy pork bánh mì|banh-mi
-|Kid Pho|8.90|Kid-size phở|Phở (trẻ em)|Kids' phở|kids
-|Kid Fried Rice|8.90|Kid-size fried rice|Cơm Chiên (trẻ em)|Kids' fried rice|kids
-|KIDS Vermicelli|8.90|Kid-size vermicelli|Bún (trẻ em)|Kids' vermicelli|kids
-|Chicken Nuggets & French Fries|8.90|Chicken nuggets & french fries|Gà Viên & Khoai Tây Chiên|Chicken nuggets & fries|kids
-|Steam Rice|8.90|Steamed rice (listed under KID'S MENU)|Cơm Trắng|Steamed rice|kids
-|French Fries|5.90|French fries|Khoai Tây Chiên|French fries|kids
-|ORANGE / APPLE JUICE|3.90|Orange or apple juice|Nước Cam / Táo|Orange or apple juice|drinks
-|LEMONADE|6.90|Lemonade|Nước Chanh|Lemonade|drinks
-|SODA LEMONADE|6.90|Soda lemonade|Soda Chanh|Soda lemonade|drinks
-|SALTED LEMONADE|6.90|Salted lemonade|Chanh Muối|Salted lemonade|drinks
-|SOY MILK|3.50|Soy milk|Sữa Đậu Nành|Soy milk|drinks
-|COCONUT JUICE|5.90|Coconut juice|Nước Dừa|Coconut juice|drinks
-|BOTTLE WATER|2.00|Bottled water|Nước Suối|Bottled water|drinks
-|PERRIER / PELLEGRINO|3.00|Sparkling water|Nước Khoáng Có Ga|Perrier or Pellegrino|drinks
-|Combination Bean, Pudding, Jelly / Che Thap Cam|7.90|Combination bean, pudding & jelly dessert|Chè Thập Cẩm|Mixed bean & jelly dessert|dessert
-|Four Colors Dessert / Che 4 Mau|7.90|Four colors dessert|Chè Bốn Màu|Four-color dessert|dessert
-|Rainbow Dessert / Che 7 Mau|7.90|Rainbow dessert|Chè Bảy Màu|Rainbow dessert|dessert
-|Jelly Mungbean With Cream Coconut / Che Banh Lot Dau Xanh|7.90|Jelly mungbean with cream coconut|Chè Bánh Lọt Đậu Xanh|Pandan jelly & mung bean with coconut cream|dessert
-|Thai Style Dessert With Durian / Che Thai Sau Rieng|7.90|Thai style dessert with durian|Chè Thái Sầu Riêng|Durian Thai-style dessert|dessert
-|Tropical Fruit With Basil Seed / Che Hat E Trai Cay Theo Mua|7.90|Tropical fruit with basil seed|Chè Hạt É Trái Cây|Seasonal fruit & basil seed dessert|dessert
-|WAFFLE|5.00|Waffle|Bánh Kẹp|Waffle|dessert
-|IC WAFFLE|10.90|Ice cream waffle|Bánh Kẹp Kem|Waffle with ice cream|dessert
-|ICE CREAM 1 SCOOP|5.00|One scoop of ice cream|Kem (1 viên)|Ice cream, 1 scoop|dessert
-|1 Lb Bbq Pork|15.00|GRILLED/BBQ PORK, by the pound|Thịt Nướng (1 lb)|BBQ pork, 1 lb|catering
-|ROASTED CHICKEN|13.00|ROASTED CORNISH HEN|Gà Quay|Roast Cornish hen|catering
-|1 Lb Suon Bo|22.00|Grilled beef short ribs, by the pound|Sườn Bò (1 lb)|Beef short ribs, 1 lb|catering
`;

export interface RawItem {
  number: string | null;
  nameClover: string;
  price: number;
  description: string;
  nameVi: string;
  nameEn: string;
  category: CategoryId;
}

const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const RAW_ITEMS: (RawItem & { id: string })[] = T.trim()
  .split("\n")
  .map((line) => {
    const [num, nameClover, price, description, nameVi, nameEn, category] = line.split("|");
    const number = num === "-" ? null : num;
    return {
      id: `${number ? number + "-" : ""}${slug(nameVi)}`,
      number,
      nameClover,
      price: Number(price),
      description,
      nameVi,
      nameEn,
      category: category as CategoryId,
    };
  });

/** Build-your-own drinks: Clover lists each flavor as its own item at one price. */
export const DRINK_LINES = [
  { id: "milk-tea", nameVi: "Trà Sữa", nameEn: "Milk tea", price: 6.9, suffix: "MT",
    flavors: ["Original", "Brown sugar", "Jasmine", "Thai tea", "Mango", "Matcha", "Coffee", "Taro", "Oolong", "Peppermint", "Thai green", "Strawberry", "Honeydew", "Black tea", "Lychee"] },
  { id: "fruit-tea", nameVi: "Trà Trái Cây", nameEn: "Fruit tea", price: 6.9, suffix: "FT",
    flavors: ["Pineapple", "Raspberry", "Strawberry", "Grape", "Kiwi", "Passion fruit", "Honeydew", "Peppermint", "Peach", "Lemon", "Lychee", "Mango", "Soursop"] },
  { id: "smoothie", nameVi: "Sinh Tố", nameEn: "Smoothie", price: 8.5, suffix: "SM",
    flavors: ["Passion fruit", "Honeydew", "Strawberry", "Banana", "Coconut", "Taro", "Avocado", "Pineapple", "Soursop", "Green bean", "Red bean", "Jackfruit", "Mango", "Lychee", "Durian"] },
  { id: "slushie", nameVi: "Đá Xay", nameEn: "Slushie", price: 7.9, suffix: "SL",
    flavors: ["Strawberry", "Passion fruit", "Peppermint", "Grapefruit", "Raspberry", "Pineapple", "Banana", "Thai tea", "Kumquat", "Grape", "Coffee", "Orange", "Mango", "Lemon", "Lychee", "Kiwi", "Peach", "Coconut", "Taro", "Honeydew"] },
  { id: "milk-slush", nameVi: "Sữa Đá Xay", nameEn: "Milk slush", price: 7.9, suffix: "MS",
    flavors: ["Strawberry", "Pineapple", "Peppermint", "Honeydew", "Coconut", "Lemon", "Thai tea", "Kumquat", "Banana", "Coffee", "Matcha", "Taro", "Vanilla", "Lychee", "Kiwi", "Peach", "Mocha", "Mango", "Passion fruit"] },
];
