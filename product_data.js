const PAPAYA_PRODUCTS = [
// ----- SHIRTS (มีรูปจาก Dropbox ของคุณ) -----
{
    id: 1,
    name: "PAPAYA Oversize Tee - White Logo",
    about: "เสื้อยืดโอเวอร์ไซซ์สีขาว พิมพ์ลายโลโก้ PAPAYA เน้นความเรียบง่ายสไตล์มินิมอล เนื้อผ้านุ่มสบาย ไม่บาง",
    price: 390,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/fr1jnkwrtb0ddkt2znqws/PAPAYA-Oversize-Tee-White-Logo.png?rlkey=rqi029pm71n413mi32bcutu3v&st=zcast0y9&dl=1",
    featured: true
},
{
    id: 2,
    name: "PAPAYA Oversize Tee - Black Logo",
    about: "เสื้อยืดสีดำลายโลโก้ PAPAYA โทนคลาสสิก ใส่ง่ายทุกวัน โดดเด่นด้วยงานพิมพ์สีขาวคมชัดตัดพื้นดำ",
    price: 390,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/jwtr9e4jff51n1sfehsds/PAPAYA-Oversize-Tee-Black-Logo.png?rlkey=yrm0nu6y461azbmzl2wycmu68&st=6ew3kgum&dl=1",
    featured: true
},
{
    id: 3,
    name: "Pog & Pog Street Tee - Orange",
    about: "สีส้มสตรีทจัดจ้านสวยโดน! ลุคสายสตรีทเต็มตัว ใส่คู่กางเกงคาร์โก้หรือยีนส์ก็ดูเท่",
    price: 450,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/wrojn8plh4gfhl6hxu9lc/Pog-Pog-Street-Tee-Orange.png?rlkey=wb7bncam3t5ny30t5iqcnxce2&st=qibg51at&dl=1",
    featured: true
},
{
    id: 4,
    name: "Pog & Pog Street Tee - Navy",
    about: "เสื้อยืดสีน้ำเงินเข้มโทนเท่ สุภาพ ใส่ง่ายทุกโอกาส เนื้อผ้าหนา ฟอร์มสวย คอไม่ย้วย",
    price: 450,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/vvkwatbdsnmvdaresduk6/Pog-Pog-Street-Tee-Navy.png?rlkey=5bb0ttpqwc1rtxgyz74ccvk91&st=09570hk6&dl=1",
    featured: false
},
{
    id: 5,
    name: "PAPAYA Long Sleeve Tee - Cream",
    about: "เสื้อแขนยาวสีครีมสไตล์มินิมอล ให้ลุคอบอุ่น เรียบหรู ใส่ทำงาน ใส่เที่ยวได้หมด",
    price: 520,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/9vdyb2emy5vy6e2cnxrz7/PAPAYA-Long-Sleeve-Tee-Cream.png?rlkey=siqo25ulq6858kr1k5fhvi93s&st=5b2s331n&dl=1",
    featured: false
},
{
    id: 6,
    name: "Graphic Tee - Retro Papaya",
    about: "กราฟิกแนวย้อนยุค PAPAYA สีสดโดดเด่น แฟชั่นจัดเต็ม เหมาะกับคนชอบลุคแฟชั่นสายสตรีท",
    price: 490,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/zsatxmq7abr7cep8dk2qk/Graphic-Tee-Retro-Papaya.png?rlkey=5gst1mu96yd5jy2v4m10bk980&st=q9rvhcj3&dl=1",
    featured: true
},
{
    id: 7,
    name: "Graphic Tee - Neon Pog",
    about: "เสื้อลายกราฟิกเรืองแสง โดดเด่นกลางคืน ใส่ไปงานปาร์ตี้ หรืองานมิวสิคเฟสได้แบบเท่มาก",
    price: 490,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/5z9rz9h73muotkhreet0w/Graphic-Tee-Neon-Pog.png?rlkey=12kmyinv69bnfm0eyto0xfcdu&st=yan7zivu&dl=1",
    featured: false
},
{
    id: 8,
    name: "Basic Tee - Sand",
    about: "เสื้อยืดโทนทรายแบบเรียบ ๆ แต่ใส่ง่ายสุด ๆ เข้ากับทุกลุค ทุกสีผิว ใส่นุ่มสบาย",
    price: 350,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/aa994smgjrm68rrfxd1v3/Basic-Tee-Sand.png?rlkey=fx6feplfsxt2krzefrtuao2c9&e=1&st=qez42917&dl=1",
    featured: false
},

// ----- SHIRTS (เพิ่มรูป Placeholder ตามธีม) -----
{
    id: 33,
    name: "Graphic Tee - City View",
    about: "เสื้อยืดลายกราฟิกวิวเมืองยามค่ำคืน แนว Urban Street wear เนื้อผ้า Cotton 100% สวมใส่สบาย",
    price: 490,
    category: "shirt",
    img: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600&auto=format&fit=crop", 
    featured: false
},
{
    id: 34,
    name: "Striped Tee - Green & White",
    about: "เสื้อยืดลายทางสีเขียวและขาว ให้ลุควินเทจและสดใส ใส่ได้ทั้งชายหญิง ผ้าไม่หนาและไม่บางจนเกินไป",
    price: 420,
    category: "shirt",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 35,
    name: "Pocket Tee - Olive",
    about: "เสื้อยืดคอปกพร้อมกระเป๋าหน้าอกสีเขียวมะกอก ลุค Workwear สุภาพแต่ยังคงความเท่",
    price: 470,
    category: "shirt",
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 36,
    name: "Oversize Tee - Pastel Blue",
    about: "เสื้อยืดโอเวอร์ไซซ์สีฟ้าพาสเทล ไม่มีลาย เหมาะสำหรับสายมินิมอลที่เน้นสีสัน เนื้อผ้าทิ้งตัวสวย",
    price: 390,
    category: "shirt",
    img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=600&auto=format&fit=crop",
    featured: true
},

// ----- OUTER (มีรูปจาก Dropbox ของคุณ) -----
{
    id: 9,
    name: "PAPAYA Hoodie - Yellow",
    about: "ฮู้ดดี้สีเหลืองซิกเนเจอร์ของแบรนด์ PAPAYA ผ้านุ่มมาก กันลมได้ดี ใส่เที่ยวได้ทั้งกลางวันและกลางคืน",
    price: 890,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/uf9skf7fkil1hj0dl8mer/PAPAYA-Hoodie-Yellow.png?rlkey=1t18lp1jjdbz6nk9g1aa79s05&st=wtcj3bby&dl=1",
    featured: true
},
{
    id: 10,
    name: "PAPAYA Hoodie - Black",
    about: "ฮู้ดดี้สีดำสุดเท่ ใส่ง่ายทุกสถานการณ์ พิมพ์โลโก้ PAPAYA เรียบหรู ผ้านุ่ม หนา อบอุ่น แต่ไม่อึดอัด",
    price: 890,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/2y5j4uiebencoo7qkfvyv/PAPAYA-Hoodie-Black.png?rlkey=tq4pzss6pr0904tq9tyxkrxja&st=ms9wtno6&dl=1",
    featured: true
},
{
    id: 11,
    name: "Denim Jacket - Midnight Blue",
    about: "แจ็คเก็ตยีนส์สีครามเข้ม สวยเนี้ยบ ฟอร์มเป๊ะ ดีไซน์แบบคลาสสิก ทนทาน ใส่ได้ทุกฤดูกาล",
    price: 1290,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/2zlp7bsii5im4tlbf2ofq/Denim-Jacket-Midnight-Blue.png?rlkey=j1mcx2c40acjqgi7b65v4ozvb&st=dqetxwf5&dl=1",
    featured: true
},
{
    id: 12,
    name: "Bomber Jacket - Smoke Grey",
    about: "บอมเบอร์แจ็คเก็ตสีเทาควันบุหรี่ ให้ลุคสตรีทจัดเต็ม ใส่กับฮู้ดหรือเสื้อยืดด้านในก็ดูดีมาก",
    price: 1390,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/r7bud9i57o3ikrk0vd15b/Bomber-Jacket-Smoke-Grey.png?rlkey=75esm6m3lekbx8p6sc4olyrs9&st=le8d514g&dl=1",
    featured: false
},
{
    id: 13,
    name: "Coach Jacket - Black Papaya",
    about: "แจ็คเก็ตโค้ชสีดำลาย PAPAYA ดีไซน์เรียบ เท่ แบบมินิมอล กันลมได้ดี เหมาะกับทุกลุค",
    price: 1150,
    category: "shirt",
    img: "https://www.dropbox.com/scl/fi/y9qtc95xq6a2dq0sjajw0/Coach-Jacket-Black-Papaya.png?rlkey=sy1qi9ve7u3n8d5c67307c8wz&st=7comc8xl&dl=1",
    featured: false
},

// ----- OUTER (เพิ่มรูป Placeholder ตามธีม) -----
{
    id: 37,
    name: "Varsity Jacket - Green/White",
    about: "เสื้อแจ็คเก็ต Varsity โทนเขียวขาว สไตล์นักกีฬาวินเทจ ผ้า Wool อุ่นสบาย ลุค Street Fashion",
    price: 1590,
    category: "shirt",
    img: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=600&auto=format&fit=crop",
    featured: true
},
{
    id: 38,
    name: "Windbreaker - Neon Green",
    about: "เสื้อกันลมสีเขียวนีออนสะท้อนแสง น้ำหนักเบา กันน้ำ เหมาะสำหรับกิจกรรมกลางแจ้ง",
    price: 1050,
    category: "shirt",
    img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 39,
    name: "Zip-up Sweater - Oatmeal",
    about: "เสื้อสเวตเตอร์มีซิปสีโอ๊ตมีล เนื้อผ้าหนานุ่ม ให้ลุคอบอุ่นแบบมินิมอล ใส่แทนเสื้อคลุมได้",
    price: 950,
    category: "shirt",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600&auto=format&fit=crop",
    featured: false
},

// ----- PANTS (มีรูปจาก Dropbox ของคุณ) -----
{
    id: 14,
    name: "Cargo Pants - Black",
    about: "กางเกงคาร์โก้สีดำทรงเท่ กระเป๋าเยอะ ใช้งานจริงจังได้ ใส่ได้ทั้งผู้ชายและผู้หญิง",
    price: 820,
    category: "pants",
    img: "https://www.dropbox.com/scl/fi/cw7uc105kchzi7jzn98ae/Cargo-Pants-Black.png?rlkey=mhbkecwhaqtxamomt8kcye437&st=slft5qge&dl=1",
    featured: true
},
{
    id: 15,
    name: "Cargo Pants - Khaki",
    about: "กางเกงคาร์โก้สีคากีสไตล์ลำลอง ใส่สบาย เข้ากับเสื้อยืดเกือบทุกสี ทรงสวย แมทช์ง่าย",
    price: 820,
    category: "pants",
    img: "https://www.dropbox.com/scl/fi/116idqax7ne6e9fnkiyxx/Cargo-Pants-Khaki.png?rlkey=cxirt1lhmdhla8pufmlihaf7r&st=n6vtrbmk&dl=1",
    featured: true
},
{
    id: 16,
    name: "Jogger Pants - Charcoal",
    about: "จ๊อกเกอร์ผ้าเนื้อนุ่ม ทรงสปอร์ต ใส่สบายสุด ๆ ใส่อยู่บ้านก็ได้ ใส่ออกกำลังกายก็ดี",
    price: 750,
    category: "pants",
    img: "https://www.dropbox.com/scl/fi/b79xixuek69png0ixk69c/Jogger-Pants-Charcoal.png?rlkey=ruhx9jxgrri79ulpozeg5ry7n&st=0vxhpq4p&dl=1",
    featured: false
},
{
    id: 17,
    name: "Wide Leg Pants - Cream",
    about: "กางเกงขากว้างสีครีม ลุคเกาหลีมาก ใส่แล้วขาดูยาว เนื้อผ้าไหลสวย ไม่หนาเกินไป",
    price: 890,
    category: "pants",
    img: "https://www.dropbox.com/scl/fi/6ypdouu2jvjy4tmcxybcb/Wide-Leg-Pants-Cream.png?rlkey=da9d838jv71hdcs78p0sfd5ck&st=2a1hppx8&dl=1",
    featured: false
},
{
    id: 18,
    name: "Denim Pants - Light Wash",
    about: "ยีนส์ฟอกอ่อนทรงตรง ใส่ได้ทุกวัน เข้ากับเสื้อทุกสี ใส่ทน ใช้งานได้ยาว",
    price: 990,
    category: "pants",
    img: "https://www.dropbox.com/scl/fi/09y6u79dqkpkgr0pmdq7j/Denim-Pants-Light-Wash.png?rlkey=2iftmfgsfx58m8ehguq9cfh4r&st=ah8gc4h6&dl=1",
    featured: false
},

// ----- PANTS (เพิ่มรูป Placeholder ตามธีม) -----
{
    id: 40,
    name: "Straight Cut Chinos - Navy",
    about: "กางเกงชิโน่ทรงขากระบอกสีน้ำเงินเข้ม สุภาพ ใส่ทำงานหรือใส่เที่ยวแบบ Smart Casual ได้",
    price: 790,
    category: "pants",
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 41,
    name: "Sweat Shorts - Grey",
    about: "กางเกงขาสั้นผ้า Sweat สีเทาอ่อน ใส่อยู่บ้านหรือออกไปเดินเล่นสบาย ๆ เนื้อผ้านุ่มมาก",
    price: 550,
    category: "pants",
    img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 42,
    name: "Ripped Denim Jeans - Black",
    about: "กางเกงยีนส์ดำทรง Skinny มีรอยขาดเล็กน้อย สไตล์ Rock/Street Fashion",
    price: 1050,
    category: "pants",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
    featured: true
},

// ----- SHOES (มีรูปจาก Dropbox ของคุณ) -----
{
    id: 19,
    name: "Chunky Sneakers - WhiteYellow",
    about: "รองเท้าสนีกเกอร์ทรงหนาแนวสตรีท สีขาว/เหลือง โดดเด่นมาก ใส่แล้วลุคดีสุด ๆ",
    price: 1690,
    category: "shoes",
    img: "https://www.dropbox.com/scl/fi/qw1h833pska4rtqqp0y8u/Chunky-Sneakers-WhiteYellow.png?rlkey=9rsu05fgeqjfhjjctv77qy1bq&st=xdmz1bpq&dl=1",
    featured: true
},
{
    id: 20,
    name: "Chunky Sneakers - Black-Red",
    about: "สตรีทสนีกเกอร์สีดำแดง ลุคเท่ ดุดัน แมทช์ง่าย เหมาะกับสายแฟชั่น",
    price: 1690,
    category: "shoes",
    img: "https://www.dropbox.com/scl/fi/wine4udnlkakcofrd2kst/Chunky-Sneakers-Black-Red.png?rlkey=98qdsga2aote5kn87n6r7hfv2&st=vrowihrk&dl=1",
    featured: true
},
{
    id: 21,
    name: "Canvas Sneakers - Cream",
    about: "รองเท้าแคนวาสสีครีม โทนอบอุ่น ใส่ง่าย เบาสบาย เหมาะกับลุคเกาหลี",
    price: 1150,
    category: "shoes",
    img: "https://www.dropbox.com/scl/fi/rd9ygypnufl8ppbi21orz/Canvas-Sneakers-Cream.png?rlkey=3uruf7nm13nq3zy1pvrdznn5k&st=22ulcrct&dl=1",
    featured: false
},
{
    id: 22,
    name: "Slip-on Skate Shoes - Black",
    about: "รองเท้าสลิปออนสีดำ สวย เท่ เรียบ ใส่สบาย ลุคสเกตบอร์ดแบบมินิมอลมาก",
    price: 1290,
    category: "shoes",
    img: "https://www.dropbox.com/scl/fi/gh9xtkw85d0pwxlpy479p/Slip-on-Skate-Shoes-Black.png?rlkey=snryu1h60mwzngl7rqd4mhq2o&st=ot491uqq&dl=1",
    featured: false
},

// ----- SHOES (เพิ่มรูป Placeholder ตามธีม) -----
{
    id: 43,
    name: "Hiking Boots - Brown Leather",
    about: "รองเท้าบูทหุ้มข้อสไตล์ Hiking ลุย ๆ หนังสีน้ำตาลเข้ม พื้นกันลื่น ทนทาน",
    price: 2100,
    category: "shoes",
    img: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 44,
    name: "Classic Loafers - Black",
    about: "รองเท้าหนัง Loafers สีดำ ดีไซน์คลาสสิก ใส่ได้หลายโอกาส ลุคสุภาพแต่ทันสมัย",
    price: 1850,
    category: "shoes",
    img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop",
    featured: false
},

// ----- HATS (มีรูปจาก Dropbox ของคุณ) -----
{
    id: 23,
    name: "PAPAYA Cap - Yellow",
    about: "หมวกแก๊ปสีเหลืองโลโก้ PAPAYA สีสดใส ใส่คู่เสื้อ Oversize เท่มาก!",
    price: 350,
    category: "hat",
    img: "https://www.dropbox.com/scl/fi/1xonmfb2pmwh7rp83qkky/PAPAYA-Cap-Yellow.png?rlkey=kymfseu4uu8i3ydfcc07ozs3v&st=4ts9a0n5&dl=1",
    featured: true
},
{
    id: 24,
    name: "Pog & Pog Cap - Red",
    about: "หมวกสีแดงสดสไตล์สตรีท ใส่แล้วเด่นมาก เหมาะสำหรับคนชอบลุคแฟชั่นจัดเต็ม",
    price: 350,
    category: "hat",
    img: "https://www.dropbox.com/scl/fi/f5hymfc8j69ts0ckymolj/Pog-Pog-Cap-Red.png?rlkey=l0fq3ou99zsrnqk6nchw8d4nb&st=dvycd6ff&dl=1",
    featured: false
},
{
    id: 25,
    name: "Beanie - Charcoal",
    about: "หมวกบีนนี่สีชาร์โคลสไตล์เกาหลี ซอฟต์ ๆ อบอุ่น ใส่ง่ายทั้งชายหญิง",
    price: 260,
    category: "hat",
    img: "https://www.dropbox.com/scl/fi/sjzd0ka0ic0r41j2ql9p1/Beanie-Charcoal.png?rlkey=icphoi146gg1zht2c0s5jtcs8&st=qafaolid&dl=1",
    featured: false
},
{
    id: 26,
    name: "Bucket Hat - Navy",
    about: "บัคเก็ตแฮทสีน้ำเงินเข้ม ลุคชิค ๆ ใส่ถ่ายรูปออกมาสวยมาก เหมาะกับวันสบาย ๆ",
    price: 390,
    category: "hat",
    img: "https://www.dropbox.com/scl/fi/lgigfl4ck63g1nbbmvgsr/Bucket-Hat-Navy.png?rlkey=6kil33dbz5ugfshzledkg4y6u&st=apqq2oxa&dl=1",
    featured: false
},

// ----- HATS (เพิ่มรูป Placeholder ตามธีม) -----
{
    id: 45,
    name: "5-Panel Cap - Black Minimal",
    about: "หมวกแก๊ปทรง 5-Panel สีดำล้วน ไม่มีลาย เน้นความเรียบง่ายแบบมินิมอล ใส่ได้ทุกวัน",
    price: 390,
    category: "hat",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 46,
    name: "Fedora Hat - Beige",
    about: "หมวก Fedora สีเบจ สไตล์วินเทจ/เซมิแคชชวล เหมาะสำหรับไปเที่ยวทะเลหรือถ่ายรูป",
    price: 550,
    category: "hat",
    img: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 47,
    name: "Trapper Hat - Plaid",
    about: "หมวก Trapper ลาย Plaid (ลายสก๊อต) สำหรับกันหนาวโดยเฉพาะ ด้านในบุขนอุ่นมาก",
    price: 690,
    category: "hat",
    img: "https://images.unsplash.com/photo-1575424909138-46b05e5919ec?q=80&w=600&auto=format&fit=crop",
    featured: false
},

// ----- ACCESSORIES (มีรูปจาก Dropbox ของคุณ) -----
{
    id: 27,
    name: "Canvas Tote Bag - Papaya Print",
    about: "กระเป๋าผ้าแคนวาสลาย PAPAYA งานพิมพ์สวยมาก ทน ใช้งานได้จริง ใส่ของได้เยอะ",
    price: 320,
    category: "accessory",
    img: "https://www.dropbox.com/scl/fi/ylb711jcoo7jr3bfmkllp/Canvas-Tote-Bag-Papaya-Print.png?rlkey=fg1w8xdcmgl5v6c8vadh3fge1&st=m6afm1bh&dl=1",
    featured: true
},
{
    id: 28,
    name: "Socks Pack - PAPAYA Pattern",
    about: "ถุงเท้าลาย PAPAYA 3 คู่ต่อแพ็ค ใส่นุ่ม ไม่อับ ระบายอากาศดีมาก",
    price: 190,
    category: "accessory",
    img: "https://www.dropbox.com/scl/fi/663px4kio0y91ui4lvecn/Socks-Pack-PAPAYA-Pattern.png?rlkey=u4w0ocb7vvkx1m2i2jny7rswg&st=qsrodvsm&dl=1",
    featured: false
},
{
    id: 29,
    name: "Silver Chain Necklace",
    about: "สร้อยโซ่สแตนเลสสีเงิน ทน ไม่ลอก ไม่ดำ เพิ่มลุคเท่ได้ทันที",
    price: 290,
    category: "accessory",
    img: "https://www.dropbox.com/scl/fi/fu92jgjs5sgkyh1d0cb9c/Silver-Chain-Necklace.png?rlkey=f3jy4ef4zot8s8iemgoqizto5&st=msemeo47&dl=1",
    featured: false
},
{
    id: 30,
    name: "Logo Keychain - Mini Papaya",
    about: "พวงกุญแจลาย PAPAYA รุ่นมินิ น่ารักมาก เหมาะสำหรับเป็นของขวัญ",
    price: 150,
    category: "accessory",
    img: "https://www.dropbox.com/scl/fi/bv9vq5el6mo0t4gp6ocyu/Logo-Keychain-Mini-Papaya.png?rlkey=m0hazv2so7yl45tty7og9ym89&st=5h51qjw5&dl=1",
    featured: false
},
{
    id: 31,
    name: "Phone Strap - Neon Pog",
    about: "สายคล้องโทรศัพท์สีเนออนสะท้อนแสง ลุคสดใส ใช้งานได้จริง แข็งแรงมาก",
    price: 220,
    category: "accessory",
    img: "https://www.dropbox.com/scl/fi/6lmc4re0b7yzdjp2fh4r6/Phone-Strap-Neon-Pog.png?rlkey=tns2xc7nch5xm67s92zldr8z8&st=qwr4nvgn&dl=1",
    featured: false
},
{
    id: 32,
    name: "Sticker Pack - PAPAYA x Pog",
    about: "สติ๊กเกอร์แพ็คออกแบบพิเศษ PAPAYA x Pog พิมพ์สีสวย กันน้ำ แปะได้ทุกพื้นผิว",
    price: 120,
    category: "accessory",
    img: "https://www.dropbox.com/scl/fi/criq0f7lf5n3w2meziag0/Sticker-Pack-PAPAYA-x-Pog.png?rlkey=yr3d8efdxaxa6lzpqt3fk9g88&st=99v7w4mg&dl=1",
    featured: false
},

// ----- ACCESSORIES (เพิ่มรูป Placeholder ตามธีม) -----
{
    id: 48,
    name: "Bandana - Paisley Black",
    about: "ผ้า Bandana ลาย Paisley สีดำ/ขาว ใช้ผูกผม โพกศีรษะ หรือพันคอ ได้ลุคฮิปฮอป",
    price: 180,
    category: "accessory",
    img: "https://images.unsplash.com/photo-1630950358333-4f6352998839?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 49,
    name: "Leather Belt - Classic Brown",
    about: "เข็มขัดหนังแท้สีน้ำตาล หัวเข็มขัดเรียบง่าย ใช้ได้ทุกโอกาส ทนทาน",
    price: 690,
    category: "accessory",
    img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=600&auto=format&fit=crop",
    featured: false
},

// ----- BAGS & WALLETS (เพิ่มรูป Placeholder ตามธีม) -----
{
    id: 50,
    name: "Crossbody Bag - Black Techwear",
    about: "กระเป๋าสะพายข้างสไตล์ Techwear สีดำ มีช่องเก็บของหลายช่อง กันน้ำ เหมาะกับสายสตรีท",
    price: 990,
    category: "bag",
    img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop",
    featured: true
},
{
    id: 51,
    name: "Bi-fold Wallet - Papaya Logo",
    about: "กระเป๋าสตางค์แบบพับสองตอน พิมพ์ลายโลโก้ PAPAYA ด้านในมีช่องใส่บัตรและธนบัตรครบถ้วน",
    price: 450,
    category: "bag",
    img: "https://images.unsplash.com/photo-1627123424574-18bd75f3194c?q=80&w=600&auto=format&fit=crop",
    featured: false
},

// ----- JEWELRY (เพิ่มรูป Placeholder ตามธีม) -----
{
    id: 52,
    name: "Ring Set - Minimal Silver (3pcs)",
    about: "แหวนเงินสแตนเลสดีไซน์มินิมอล 3 วงต่อชุด ไม่ลอก ไม่ดำ สามารถปรับขนาดได้เล็กน้อย",
    price: 490,
    category: "jewelry",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 53,
    name: "Hoop Earrings - Gold",
    about: "ต่างหูห่วงสีทองขนาดกลาง สไตล์คลาสสิก ใส่ได้ทุกวัน เข้ากับทุกชุด",
    price: 350,
    category: "jewelry",
    img: "https://images.unsplash.com/photo-1635767798638-3e252a018695?q=80&w=600&auto=format&fit=crop",
    featured: false
},
{
    id: 54,
    name: "Leather Bracelet - Black",
    about: "สร้อยข้อมือหนังแท้สีดำ ดีไซน์เรียบง่าย มีตัวล็อกแม่เหล็ก เพิ่มความเท่ให้กับลุค",
    price: 590,
    category: "jewelry",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
    featured: false
}
];