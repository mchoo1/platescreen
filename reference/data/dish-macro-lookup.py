# dish_name (as it literally appears in kopitiam-stall-dishes.json) -> 
# (emoji, category, price, calories, protein, carbs, fat)
DISH_DB = {
    "Basil Chicken Rice": ("🍛","Thai",5.5,550,28,65,18),
    "Pad Thai": ("🍜","Thai",5.5,500,18,65,16),
    "Pineapple Fried Rice": ("🍚","Thai",6,500,15,70,15),
    "Tom Yum Soup": ("🍲","Thai",6,280,20,15,15),
    "Coffee": ("☕","Beverages",1.8,120,2,20,4),
    "Kopi": ("☕","Beverages",1.7,120,2,20,4),
    "Tea": ("🍵","Beverages",1.6,90,0,20,0),
    "Teh": ("🍵","Beverages",1.7,140,2,28,3),
    "Fried Fish Soup": ("🍲","Seafood",6.5,420,26,30,20),
    "Seafood Soup": ("🍲","Seafood",7,320,26,20,14),
    "Sliced Fish Soup": ("🍲","Seafood",6,320,28,25,10),
    "Roasted Chicken Rice": ("🍗","Chicken Rice/Poultry",4.5,550,28,65,18),
    "Steamed Chicken Rice": ("🍗","Chicken Rice/Poultry",4.5,530,28,63,16),
    "Suyuan Set (2 Veg Meat + 1 Veg)": ("🥗","Local Hawker",4,380,14,55,12),
    "Veg Mixed Rice": ("🥗","Local Hawker",3.8,400,12,58,14),
    "Curry Chicken Cutlet Rice": ("🍛","Seafood",5,550,25,60,22),
    "Curry Fish Cutlet Rice": ("🍛","Seafood",5.5,520,26,55,20),
    "Signature Tofu": ("🍢","Chicken Rice/Poultry",3.5,220,10,15,14),
    "Curry Chicken Rice": ("🍛","Chicken Rice/Poultry",5,550,25,60,22),
    "Lor Mee": ("🍜","Noodles",4.5,480,18,60,18),
    "Prawn Mee": ("🍜","Noodles",5.5,500,22,55,18),
    "Prawn Noodles": ("🍜","Noodles",5.5,500,22,55,18),
    "Pig Trotter Rice": ("🍚","Local Hawker",5.5,580,25,55,28),
    "Pork Belly rice": ("🍚","Local Hawker",5.5,600,24,55,32),
    "Wanton Mee": ("🍜","Noodles",4.5,420,18,55,12),
    "Wanton Noodle": ("🍜","Noodles",4.5,420,18,55,12),
    "Cheng Tng": ("🥣","Desserts",2,180,3,40,1),
    "Tau Suan": ("🥣","Desserts",2,220,6,38,4),
    "Char Siew Rice": ("🍚","Chinese Roast",5,550,25,65,18),
    "Duck Rice": ("🍚","Chinese Roast",5,520,26,60,20),
    "Roast Duck": ("🦆","Chinese Roast",6,480,30,30,26),
    "Chwee Kueh": ("🥟","Local Hawker",2.5,320,6,45,12),
    "Black Glutinous Rice": ("🍚","Desserts",2.2,220,4,42,4),
    "Peng Kueh": ("🥟","Local Hawker",1.5,150,4,20,6),
    "Soon Kueh": ("🥟","Local Hawker",1.5,150,4,20,6),
    "ABC Chicken Soup": ("🍲","Chicken Rice/Poultry",5.5,320,22,20,16),
    "Peanut Chicken Feet Soup": ("🍲","Chicken Rice/Poultry",5.5,340,20,25,18),
    "Mutton Mixture": ("🍲","Local Hawker",6.5,400,28,15,24),
    "Mutton Soup": ("🍲","Local Hawker",6,380,28,15,20),
    "Fish Congee": ("🥣","Seafood",4.5,280,18,35,6),
    "Pork Congee": ("🥣","Seafood",4.5,300,18,38,7),
    "Beef Noodles": ("🍜","Noodles",6,500,25,60,15),
    "Pork Ribs Noodles": ("🍜","Noodles",6,520,24,60,17),
    "Spring Onion Diced Chicken Set Meal": ("🍚","Chicken Rice/Poultry",5.5,550,25,55,22),
    "Sweet & Sour Pork Set Meal": ("🍚","Chicken Rice/Poultry",5.5,580,22,60,26),
    "Black Carrot Cake": ("🍘","Bakery/Dessert",4,450,10,55,20),
    "Fried Carrot Cake": ("🍘","Bakery/Dessert",4,450,10,55,20),
    "Fried Oyster": ("🦪","Local Hawker",6,450,15,45,22),
    "White Carrot Cake": ("🍘","Bakery/Dessert",4,420,10,53,18),
    "Fried Bee Hoon": ("🍜","Indonesian/Malay",3.5,380,10,55,12),
    "Fried Mee": ("🍜","Indonesian/Malay",4,420,12,58,14),
    "Ice Kachang": ("🍧","Local Hawker",3.5,320,4,65,6),
    "Watermelon Fruit Cocktail": ("🍉","Local Hawker",2,120,1,28,0),
    "Curry Chicken Set": ("🍛","Western",5.5,550,25,60,22),
    "Pork Chop Set": ("🍽️","Western",6.5,650,32,55,30),
    "Fishball Noodles": ("🍜","Noodles",4.5,400,20,55,10),
    "Kampung Suasage Egg Fried Rice": ("🍚","Local Hawker",4,480,14,65,17),
    "Plain Egg Fried Rice": ("🍚","Local Hawker",3.5,450,10,65,15),
    "Nasi Lemak Set": ("🍛","Indonesian/Malay",5,550,22,65,22),
    "Black Chicken Soup": ("🍲","Chicken Rice/Poultry",6.5,340,28,10,18),
    "Du Zhong Pig’s Tail Soup": ("🍲","Chicken Rice/Poultry",6.5,360,26,12,22),
    "BBQ Pork Bun": ("🥟","Dim Sum",1.8,220,8,30,7),
    "Fun Choy": ("🥬","Dim Sum",4,280,10,35,10),
    "Cheng Teng": ("🥣","Bakery/Dessert",2,180,3,40,1),
    "Spring Chicken w Fries / Rice": ("🍗","Chicken Rice/Poultry",6.5,600,35,50,28),
    "Hor Fun": ("🍜","Local Hawker",5,500,18,60,18),
    "Ban Mian": ("🍜","Noodles",4.5,480,20,60,15),
    "Mee Hoon Kueh": ("🍜","Noodles",4.5,470,19,58,15),
    "U-Mian": ("🍜","Noodles",4.5,480,20,60,15),
    "Char Kway Teow": ("🍜","Local Hawker",4.5,550,15,65,25),
    "Fried Kway Teow": ("🍜","Local Hawker",4.5,550,15,65,25),
    "Chicken Wing Set": ("🍗","Chicken Rice/Poultry",5.5,500,25,55,20),
    "Yong Tau Foo": ("🍲","Chicken Rice/Poultry",4.5,380,22,45,10),
    "Cai Fan": ("🍱","Local Hawker",4.5,500,22,60,18),
    "Econ Rice": ("🍱","Local Hawker",4.5,500,22,60,18),
    "Economical Rice": ("🍱","Local Hawker",4.5,500,22,60,18),
    "Mixed Rice": ("🍱","Local Hawker",4.5,500,22,60,18),
    "Fried Hokkien Mee": ("🍜","Noodles",5,550,20,60,22),
    "Chongqing Grilled Fish": ("🐟","Seafood",15,550,40,25,30),
    "Kaya Butter Toast": ("🍞","Coffeeshop Fare",2.2,190,4,26,8),
    "Kaya Toast": ("🍞","Coffeeshop Fare",2.2,190,4,26,8),
    "Duck Rice ": ("🍚","Chinese Roast",5,520,26,60,20),
    "Kway Chap": ("🍲","Chinese Roast",5.5,500,25,45,22),
    "Spinach Seafood Soup": ("🍲","Seafood",6,280,25,15,12),
    "Satay": ("🍢","Local Hawker",6,375,30,20,18),
    "Sugar Cane Juice": ("🥤","Coffeeshop Fare",2,180,0,45,0),
    "Chicken Chop": ("🍗","Western",6.5,650,35,55,30),
    "Pork Chop": ("🍽️","Western",6.5,650,32,55,30),
    "Rojak": ("🥗","Local Hawker",4,320,6,45,14),
    "Spring Roll": ("🥢","Local Hawker",1.4,130,3,15,6),
    "Curry Chicken Noodles": ("🍜","Noodles",5,480,22,55,18),
    "Fruit juice": ("🥤","Local Hawker",2.5,150,1,35,0),
    "Banana Fritter": ("🍌","Local Hawker",1.5,180,2,28,8),
    "Sweet Potato": ("🍠","Local Hawker",1.3,110,1,18,4),
    "Mee Rebus": ("🍜","Indonesian/Malay",4.5,450,18,55,16),
    "Mee Soto": ("🍜","Indonesian/Malay",4.5,420,20,50,14),
    "Nasi Ayam": ("🍛","Indonesian/Malay",5,550,25,65,20),
    "Nasi Goreng Ayam": ("🍛","Indonesian/Malay",5.5,580,25,68,22),
    "Mee Hoon Soto": ("🍜","Indonesian/Malay",4.5,420,20,50,14),
    "Ayam Masak Merah": ("🍗","Indonesian/Malay",5.5,520,28,45,24),
    "Chicken Bryani": ("🍛","Indian",5.5,600,25,75,20),
    "Egg Prata": ("🫓","Indian",2,270,9,32,12),
    "Roti Prata": ("🫓","Indian",1.2,200,5,28,8),
    "Chicken Rice": ("🍗","Chicken Rice/Poultry",4.5,550,28,65,18),
    "Signature Boneless Chicken Rice(White)": ("🍗","Chicken Rice/Poultry",5,540,29,62,17),
    "Teochew Sliced Fish Porridge": ("🥣","Seafood",5,300,20,32,7),
}

def emoji_cat_for(dish):
    return DISH_DB.get(dish)

if __name__ == "__main__":
    import json
    print(len(DISH_DB))

# --- Batch D additions (Lau Pa Sat) ---
DISH_DB.update({
    "Grilled Chicken Chop with Brown Sauce": ("🍗","Western",7,650,35,55,30),
    "Grilled Pork Chop": ("🍽️","Western",7,650,32,50,32),
    "Grilled USA Pork Loin with Homemade Apple Sauce": ("🍽️","Western",9,600,38,35,32),
    "Pasta": ("🍝","Western",7.5,580,20,68,20),
    "Japanese Taco": ("🌮","Japanese",5,320,14,30,15),
    "Singapore Taco": ("🌮","Japanese",5,340,15,32,16),
    "Butter Chicken": ("🍛","Indian",7,550,28,35,32),
    "Naan": ("🫓","Indian",2,280,8,45,7),
    "Braised Pork Belly Noodle": ("🍜","Western",6,580,24,55,28),
    "Signature Scramble Egg with Pork Chop Rice": ("🍚","Western",6.5,620,28,55,30),
    "Green Tea Rice": ("🍵","Local Hawker",4.5,380,10,55,12),
    "Thunder Tea Rice": ("🍵","Local Hawker",4.5,400,12,55,14),
    "Thunder Tea Special": ("🍵","Local Hawker",5,420,14,58,15),
    "Fried Kway Tiao": ("🍜","Noodles",4.5,550,15,65,25),
    "Berries Muffin": ("🧁","Bakery/Dessert",3.5,320,5,45,13),
    "Blueberry Muffin": ("🧁","Bakery/Dessert",3.5,320,5,45,13),
    "Hokkaido Cream Muffin": ("🧁","Bakery/Dessert",4,380,6,48,17),
    "Salted Egg Lava tart": ("🥧","Bakery/Dessert",3.8,340,5,38,18),
    "Double Fish Soup": ("🍲","Seafood",7.5,400,32,25,16),
    "Nasi Briyani": ("🍛","Indian",5.5,600,25,75,20),
    "Pork Belly": ("🥓","Local Hawker",6,450,22,10,38),
    "Pork Satay": ("🍢","Local Hawker",6,375,28,20,20),
    "Bak Kwa Bao": ("🥟","Dim Sum",2.5,250,10,32,8),
    "Har Gao Prawn Dumpling": ("🥟","Dim Sum",4,180,10,18,6),
    "Olive Fried Rice": ("🍚","Indian",4.5,480,10,65,17),
    "Vegetarian Biryani": ("🍛","Indian",5.5,550,14,85,15),
    "Fried Sliced Pork": ("🍖","Noodles",6,480,22,30,28),
    "Beer": ("🍺","Local Hawker",8,150,1,12,0),
    "Cold Beverages": ("🥤","Local Hawker",2.5,150,0,38,0),
    "Grilled Tiger Prawn": ("🦐","Seafood",9,220,28,4,10),
    "Black Pepper Crab": ("🦀","Seafood",25,500,38,20,30),
    "Chilli Crab": ("🦀","Seafood",25,480,36,32,22),
    "Amber Pearl Milk Tea": ("🧋","Local Hawker",3.9,350,5,55,14),
    "Mango Green Tea": ("🥭","Local Hawker",3.8,200,1,50,0),
    "Sheng Jian Bao": ("🥟","Bakery/Dessert",4.5,320,10,38,14),
    "Xiao Long Bao": ("🥟","Bakery/Dessert",5,300,12,32,12),
    "Fried Spring Chicken": ("🍗","Seafood",7,550,32,35,32),
    "Seafood Platter": ("🍤","Seafood",15,480,38,25,24),
    "Sugarcane": ("🥤","Local Hawker",2,180,0,45,0),
    "Fried Pork Intestines with Pickled Cabbage": ("🥘","Local Hawker",7,420,25,15,28),
    "Stir-Fried Pork with Chillies": ("🥘","Local Hawker",7,450,28,20,30),
    "Western Food": ("🍽️","Western",6.5,600,28,55,28),
    "1 Meat + 2 Veg": ("🍱","Indonesian/Malay",4.5,480,20,55,18),
    "Ayam Lemak Chilli Padi Set": ("🍛","Indonesian/Malay",6,550,26,55,24),
    "Beef Rendang": ("🍛","Indonesian/Malay",6.5,550,28,30,32),
    "Nasi Campur": ("🍛","Indonesian/Malay",5,520,22,60,20),
    "Char Siew": ("🍖","Chinese Roast",5,400,24,25,22),
    "Roast Pork": ("🥓","Chinese Roast",5,450,26,15,32),
    "Signature Vegan BBQ Pork & Patties": ("🌱","Local Hawker",6.5,420,20,35,20),
    "Vegan Bun Bo Hu": ("🍜","Local Hawker",6.5,450,16,58,16),
    "Vegan Noodles": ("🍜","Local Hawker",5.5,420,14,55,14),
    "Vegan Pate Banmi": ("🥖","Local Hawker",5.5,380,12,50,12),
    "Doner Roll": ("🌯","Local Hawker",6,480,25,45,22),
    "Iskender": ("🍽️","Local Hawker",9,600,32,40,30),
    "Kunefe": ("🍰","Bakery/Dessert",5,420,8,50,20),
    "Fried Fish": ("🐟","Seafood",6.5,450,28,30,24),
    "Curry Puff": ("🥟","Bakery/Dessert",1.5,180,4,20,9),
    "Barbecue Prawn": ("🦐","Local Hawker",8,220,26,6,10),
    "Barbecue Squid": ("🦑","Local Hawker",8,240,28,8,10),
    "Duck Set Kway Chap": ("🍲","Chinese Roast",6,520,26,45,24),
    "Beef Bulgogi": ("🥩","Korean",7.5,580,30,60,22),
    "Gochujang Burger": ("🍔","Korean",7,600,26,55,28),
    "Mentaiko Ribeye Rice Bowl": ("🍚","Korean",8.5,620,30,60,26),
    "Curry": ("🍛","Local Hawker",5,480,20,45,22),
    "Black Char Kway Teow": ("🍜","Local Hawker",4.5,550,15,65,25),
    "White Char Kway Teow": ("🍜","Local Hawker",4.5,500,14,62,22),
    "Shreebhaavan Special Meals": ("🍛","Indian",6,600,18,85,18),
    "Heng Hwa Fried Bee Hoon": ("🍜","Noodles",4.5,420,14,55,15),
    "Pu Tian Lo Mee": ("🍜","Noodles",5,480,16,60,17),
    "Beef Noodle": ("🍜","Noodles",6,500,25,60,15),
    "Teochew Porridge": ("🥣","Local Hawker",4,280,15,42,6),
    "Japanese cuisine": ("🍱","Japanese",7,500,22,55,18),
    "Thai Zha Chai": ("🥗","Thai",4.5,180,4,20,8),
    "Bak Kut Teh": ("🍲","Local Hawker",6.5,420,28,10,28),
    "Claypot Rice": ("🍚","Local Hawker",6.5,600,25,75,20),
})
DISH_DB.update({
    "Fish Soup": ("🍲","Seafood",6,320,28,25,10),
    "Teh Tarik": ("🍵","Coffeeshop Fare",1.8,150,2,30,4),
    "Big Prawn U-Mee": ("🍜","Noodles",6.5,550,25,60,20),
    "Chicken Steak Aglio Olio": ("🍝","Western",6.8,580,28,65,22),
})
DISH_DB.update({
    "Hainanese Bee Hoon": ("🍜","Local Hawker",4.5,380,15,55,12),
    "Pig Trotter Rice with Onsen Egg": ("🍚","Local Hawker",6.9,580,26,55,26),
    "Crispy Fried Chicken Wings with Fries": ("🍗","Western",7,650,30,55,30),
    "BBQ Seafood Platter": ("🍤","Seafood",12,500,32,25,26),
    "Hainanese Curry Rice (Pork Chop)": ("🍛","Western",6,620,28,65,26),
    "BBQ Pork Rice": ("🍖","Chinese Roast",5.5,550,26,60,22),
    "Ayam Berempah with Coconut Rice": ("🍛","Indonesian/Malay",7.5,550,30,55,22),
    "Teochew Noodle": ("🍜","Noodles",4.5,420,18,55,12),
    "Caramelised Char Siew Don": ("🍚","Japanese",7.5,580,24,70,18),
    "Shawarma Plate": ("🥙","Local Hawker",8,550,30,40,26),
    "Mee Goreng": ("🍜","Indonesian/Malay",4,450,12,60,18),
    "Beef Boat Noodle": ("🍜","Thai",6,480,22,55,16),
    "Chicken Quesadilla": ("🌮","Local Hawker",6.2,480,22,40,24),
    "Ayam Merah (Red Chicken) Rice": ("🍛","Indonesian/Malay",6,580,28,55,26),
    "Scrambled Egg Rice": ("🍚","Local Hawker",5,480,18,55,20),
})
DISH_DB.update({
    "Bibimbap": ("🍚","Korean",6.5,550,20,75,16),
    "Mala Xiang Guo": ("🌶️","Mala/Hotpot",8,550,25,35,32),
})
DISH_DB.update({
    "Ginseng Chicken Classic": ("🍲","Chicken Rice/Poultry",7,380,30,15,20),
    "Econ Bee Hoon": ("🍜","Local Hawker",3.5,380,10,55,12),
    "Indian Goreng": ("🍜","Indian",4.5,460,14,60,18),
    "Steamed Fish": ("🐟","Seafood",8,380,35,10,18),
    "Braised Duck": ("🦆","Chinese Roast",5.5,500,26,55,22),
    "Curry Noodle": ("🍜","Noodles",5,480,22,55,18),
    "Kebab Plate": ("🥙","Local Hawker",7,550,28,45,26),
    "Masala Dosa": ("🫓","Indian",4,320,8,50,10),
    "Pig Organ Soup": ("🍲","Local Hawker",6,380,28,10,22),
    "Korean Fried Chicken": ("🍗","Korean",7.5,650,32,45,32),
    "Glutinous Rice Ball Dessert": ("🥣","Bakery/Dessert",2.2,220,4,42,4),
    "Soya Bean Drink": ("🥤","Bakery/Dessert",1.6,140,6,20,4),
})
DISH_DB.update({
    "Popiah": ("🌯","Local Hawker",3.5,260,8,38,8),
    "Laksa": ("🍜","Local Hawker",5.5,550,20,55,28),
})
DISH_DB.update({
    "Fried Fritters": ("🍤","Local Hawker",1.5,180,3,20,9),
    "Herbal Chicken Soup": ("🍲","Local Hawker",6.5,350,28,10,20),
    "Chendol": ("🍧","Bakery/Dessert",3,320,3,60,8),
    "Seafood Pao Fan": ("🥣","Local Hawker",6,380,22,45,10),
    "Army Stew": ("🍲","Korean",7,480,25,35,26),
    "Grilled Fish": ("🐟","Seafood",7,400,32,15,18),
    "Mee Sua": ("🍜","Local Hawker",4.5,380,15,55,12),
    "Malay Snacks": ("🍡","Indonesian/Malay",1.5,180,3,25,8),
    "Nasi Goreng": ("🍚","Indonesian/Malay",4.5,500,15,68,18),
    "Porridge": ("🥣","Local Hawker",3.5,260,10,42,5),
    "Bread": ("🍞","Bakery/Dessert",2.5,250,6,42,6),
    "Oyster Cake": ("🦪","Local Hawker",4.5,380,12,42,18),
    "Indian Mediterranean Fusion Plate": ("🥙","Indian",7.5,550,28,45,26),
})
DISH_DB.update({
    "Peanut Pancake": ("🥞","Snacks",1.8,220,5,30,9),
    "Curry Fish head": ("🐟","Seafood",12,550,40,30,30),
})
DISH_DB.update({
    "Steamed Pau": ("🥟","Local Hawker",1.5,220,7,32,7),
    "Watercress Pork Ribs Soup": ("🍲","Chicken Rice/Poultry",6.5,340,26,10,20),
    "Meatball Minced Meat Noodle": ("🍜","Noodles",5,430,22,55,13),
    "Salted Egg Shrimp Ball": ("🍤","Local Hawker",9,480,26,25,30),
    "Chicken Oyako Don": ("🍚","Japanese",6,520,26,60,16),
    "Cheong Fun": ("🥟","Dim Sum",3.5,300,10,45,7),
    "ABC Juice": ("🥤","Local Hawker",3,150,1,35,0),
    "Ipoh Hor Fun": ("🍜","Noodles",5.5,480,20,55,15),
    "South Indian Banana Leaf Rice": ("🍛","Indian",6,600,20,80,20),
})
DISH_DB.update({
    "You Tiao": ("🥖","Bakery/Dessert",1,180,4,25,7),
    "Nasi Lemak Ayam Taliwang": ("🍛","Indonesian/Malay",6.5,620,28,60,28),
})
DISH_DB.update({
    "Ayam Penyet Set": ("🍗","Indonesian/Malay",6.5,620,32,55,28),
    "Chicken Wings": ("🍗","Local Hawker",1.6,180,14,8,11),
    "Dim Sum": ("🥟","Dim Sum",4,320,10,42,10),
    "Nasi Rendang": ("🍛","Indonesian/Malay",5.5,600,26,62,26),
    "Herbal Bak Kut Teh": ("🍲","Local Hawker",6.5,400,26,10,26),
    "Jjajangmyeon": ("🍜","Korean",6.8,650,20,90,18),
    "XL Chicken Cutlet": ("🍗","Western",8.9,700,38,55,32),
    "Tang Yuan Peanut Soup": ("🍥","Bakery/Dessert",2.4,280,6,50,6),
    "Kimchi Jjigae": ("🍲","Korean",8,420,24,20,24),
    "Minced Meat Noodle": ("🍜","Noodles",5,480,20,60,16),
    "Hakka Thunder Tea Rice": ("🍚","Local Hawker",5,480,16,70,14),
    "Teppanyaki Bento": ("🍱","Japanese",8,620,32,60,24),
    "Butter Chicken Naan Set": ("🍛","Indian",7.5,650,32,55,30),
})
DISH_DB.update({
    "Signature Minced Meat Noodle": ("🍜","Noodles",8,520,24,60,18),
    "Sliced Fish Porridge": ("🍚","Local Hawker",6.5,380,22,50,8),
    "Century Egg w Lean Meat Porridge": ("🍚","Local Hawker",4,320,16,45,7),
    "Cut Fruits": ("🍉","Bakery/Dessert",2.5,90,1,22,0),
    "Roasted Duck Pizza": ("🍕","Western",9.8,650,26,68,28),
})
DISH_DB.update({
    "Ayam Penyet": ("🍗","Indonesian/Malay",6,580,30,50,26),
    "Nasi Sambal Goreng Set": ("🍛","Indonesian/Malay",6,560,20,68,22),
    "Indian Muslim Rojak": ("🥗","Indian",4,380,14,48,14),
    "Signature Claypot Herbal Mutton Soup": ("🍲","Local Hawker",8,480,32,15,30),
    "Traditional Lor Mee": ("🍜","Noodles",4.5,470,16,68,14),
    "Signature Braised Pork Rice Combo": ("🍚","Local Hawker",5,560,24,60,22),
    "Chicken Cutlet": ("🍗","Western",6,600,32,50,26),
    "Cafe Latte": ("☕","Beverages",4.5,150,6,15,7),
    "Longan Walnut Muffin": ("🧁","Bakery/Dessert",3.5,340,6,42,16),
    "Flying Dragon Noodles": ("🍜","Noodles",5,500,20,62,16),
    "Grilled Chicken with Mushroom Sauce": ("🍗","Western",7,520,38,30,24),
    "Nasi Lemak with Chicken Wing Set": ("🍛","Indonesian/Malay",5.5,600,26,65,25),
    "Ayam Curry Kapitan Set": ("🍛","Indonesian/Malay",6,580,26,60,26),
    "Sliced Bak Kwa (100g)": ("🥓","Local Hawker",7.5,320,28,18,16),
    "Kueh Lapis": ("🍰","Bakery/Dessert",2,220,3,32,9),
    "Special Prawn Noodles": ("🍜","Noodles",6.5,480,26,55,16),
    "Thai Boat Noodles": ("🍜","Thai",5.5,420,18,58,12),
    "Hamburg Hot Bun": ("🍔","Japanese",7.9,580,28,55,26),
})
DISH_DB.update({
    "Beef Noodles and Claypot": ("🍜","Noodles",5.5,520,26,55,20),
    "Vegetarian Rice": ("🥦","Local Hawker",3.5,380,14,55,10),
    "Economical Bee Hoon": ("🍜","Noodles",1.2,320,10,45,10),
    "Japanese Curry Rice": ("🍛","Japanese",5.5,580,22,68,20),
    "Herbal Soup": ("🍲","Local Hawker",6,380,26,12,22),
    "Chicken Bowl": ("🍚","Japanese",6,540,28,58,18),
    "Mee Siam": ("🍜","Local Hawker",4,450,14,62,14),
    "Saba Fish": ("🐟","Japanese",6.5,420,32,20,22),
    "Lobster King Pao Fan": ("🦞","Seafood",15,520,32,45,20),
    "Rendang Dishes": ("🍛","Indonesian/Malay",6,600,26,55,28),
    "Indian Punjab": ("🍛","Indian",6.5,600,26,60,25),
    "Nasi Padang": ("🍛","Indonesian/Malay",5.5,580,24,62,24),
})
DISH_DB.update({
    "Nasi Lemak": ("🍛","Indonesian/Malay",4.5,530,18,62,22),
    "Fried Banana": ("🍌","Bakery/Dessert",2,240,3,42,8),
    "Grilled Chicken": ("🍗","Local Hawker",5.5,480,38,10,26),
    "Braised Pig Trotter": ("🍖","Local Hawker",6,520,32,15,32),
    "Curry Chicken": ("🍛","Indonesian/Malay",5,560,26,55,26),
    "Congee": ("🍚","Local Hawker",3.5,280,10,42,6),
    "Chicken Wing": ("🍗","Local Hawker",1.6,180,14,8,11),
    "Indian Rojak": ("🥗","Indian",4,380,14,48,16),
    "Economic Bee Hoon": ("🍜","Noodles",1.2,320,10,45,10),
})
DISH_DB.update({
    "White Pepper Fish Maw Pig Stomach Chicken Soup": ("🍲","Local Hawker",7,420,30,15,24),
    "Chicken Teriyaki & Salmon Teriyaki Bento": ("🍱","Japanese",8.5,650,38,60,26),
    "Knife Shaven Noodle Soup": ("🍜","Noodles",5.5,500,20,65,15),
    "Bimbimbap": ("🍚","Korean",7,550,24,70,18),
    "Grilled Salmon with Aglio Olio": ("🍝","Western",8.5,620,32,55,26),
    "Beef Rendang Set": ("🍛","Indonesian/Malay",6.5,600,28,58,26),
    "Yong Tow Foo Soup": ("🍲","Chicken Rice/Poultry",4.5,380,22,45,10),
    "Sweet & Sour Pork Rice Set": ("🍚","Chinese Roast",5.5,580,24,68,22),
})
DISH_DB.update({
    "North Indian Veg Set": ("🍛","Indian",6,550,18,70,20),
    "Signature Mixed Beef Noodle with Tendon": ("🍜","Noodles",7,560,28,58,20),
    "Vegetarian": ("🥦","Local Hawker",4,380,14,55,10),
    "Pork Bao": ("🥟","Dim Sum",1.8,220,8,32,7),
    "Chicken Chop Curry Rice Set": ("🍛","Local Hawker",6,600,30,58,26),
    "Egg Fried Rice w Pork Cutlet": ("🍚","Local Hawker",6,650,26,68,26),
    "BBQ Pork Chop Rice": ("🍚","Vietnamese",6,600,30,60,22),
    "HK Steamed Golden Pomfret Set": ("🐟","Seafood",12,450,38,15,22),
    "Seafood White Bee Hoon": ("🍜","Noodles",6.5,480,28,50,16),
    "Oyster Omelette": ("🍳","Local Hawker",5.5,480,18,35,28),
    "Grilled Chicken Chop w Mushroom Cream": ("🍗","Western",7,620,36,40,30),
    "Nasi Ambeng Set": ("🍛","Indonesian/Malay",6.5,620,25,70,22),
    "Nasi Kandar": ("🍛","Indian",6.0,580,22,68,20),
    "Spinach Soup": ("🥬","Local Hawker",4.0,150,8,12,6),
    "Teppan Donburi": ("🍱","Japanese",7.0,550,28,62,18),
    "Sarawak Laksa": ("🍜","Noodles",5.5,480,20,55,16),
    "Grilled Chicken Salad Bowl": ("🥗","Western",7.5,380,32,25,14),
    "Charcoal Grilled Pork Steak": ("🥩","Western",9.0,520,38,15,32),
    "Hotplate BBQ Stingray": ("🐟","Seafood",14.0,420,32,12,24),
    "Har Cheong Gai": ("🍗","Chicken Rice/Poultry",6.0,480,24,20,32),
    "Char Siew Don": ("🍱","Japanese",7.0,620,26,78,20),
    "Basil Minced Pork Rice": ("🍛","Thai",5.5,520,24,55,20),
    "Kebab Rice": ("🥙","Western",7.0,580,32,60,22),
    "Fried Chicken Wing": ("🍗","Chicken Rice/Poultry",4.8,420,22,20,28),
    "Egg Fried Rice": ("🍚","Local Hawker",4.2,480,12,68,16),
    "Char Siew Kolo Noodles": ("🍜","Local Hawker",4.5,420,16,62,10),
    "Chicken Pho": ("🍜","Vietnamese",5.5,420,26,50,10),
    "Teochew Fishball Noodle": ("🍜","Noodles",4.5,400,20,55,10),
    "Cantonese Porridge": ("🥣","Local Hawker",5.5,340,20,42,8),
    "Fish and Chips": ("🍟","Western",8.0,650,28,55,32),
    "Fresh Fruit Juice": ("🥤","Beverages",3.5,120,1,28,0),
    "Soya Sauce Chicken Noodles": ("🍜","Noodles",6.0,480,26,58,14),
    "Claypot Laksa": ("🍜","Local Hawker",6.0,580,20,55,32),
    "Beef Hor Fun": ("🍜","Local Hawker",5.5,540,24,58,20),
    "Double-Boiled Herbal Soup": ("🍲","Local Hawker",5.5,220,20,10,10),
    "Char Siew Noodles": ("🍜","Chinese Roast",5.0,460,22,55,14),
    "Putian Fried Bee Hoon": ("🍜","Local Hawker",4.5,420,14,58,14),
    "Teochew Roast Duck": ("🦆","Chinese Roast",6.0,480,28,20,30),
    "Claypot Chicken Rice": ("🍚","Chicken Rice/Poultry",6.5,600,28,68,20),
    "Teochew Crystal Dumpling": ("🥟","Dim Sum",4.5,320,10,45,10),
    "Avocado Juice": ("🥤","Beverages",3.5,280,4,32,14),
    "Chinese Dessert Soup": ("🍮","Desserts",3.2,180,4,32,4),
    "Bakery Muffin": ("🧁","Bakery/Dessert",3.35,340,5,42,16),
    "Bakery Bread": ("🍞","Bakery/Dessert",2.5,260,7,42,7),
    "Mookata": ("🍢","Local Hawker",12.0,650,35,40,38),
    "Mixed Veg Rice": ("🍱","Local Hawker",4.0,450,18,55,15),
    "Min Jiang Kueh": ("🥞","Bakery/Dessert",1.6,220,5,32,8),
    "Bing Su": ("🍧","Desserts",6.0,380,8,65,10),
    "Zi Char": ("🍲","Local Hawker",9.0,600,28,35,32),
    "Mee Hoon Kway": ("🍜","Local Hawker",5.5,460,20,58,14),
    "Crispy Lemongrass Chicken Nasi Lemak": ("🍛","Indonesian/Malay",5.5,580,26,60,24),
    "Chili Egg Fried Rice": ("🍚","Local Hawker",4.5,520,14,68,18),
    "Bak Chor Mee": ("🍜","Noodles",4.5,450,20,58,14),
    "Pig Trotters": ("🍖","Chinese Roast",7.0,580,32,15,38),
    "Tandoori Chicken": ("🍗","Indian",6.5,480,38,10,28),
    "Curry Fish Head": ("🍛","Seafood",14.0,480,36,15,28),
    "Galbi Pork Belly Set": ("🥓","Korean",9.0,650,32,45,38),
    "Crispy Chicken": ("🍗","Chicken Rice/Poultry",5.5,480,28,25,28),
    "Curry Chicken Noodle": ("🍜","Indonesian/Malay",5.0,540,24,60,22),
    "Pork Rib Soup": ("🍲","Local Hawker",6.0,380,26,15,20),
    "Ayam Panggang": ("🍗","Indonesian/Malay",6.0,520,30,20,32),
    "Salted Baked Chicken": ("🍗","Chicken Rice/Poultry",6.5,560,34,15,36),
    "Pao Fan": ("🍚","Local Hawker",7.0,480,22,55,16),
    "Carrot Cake": ("🍚","Local Hawker",3.5,380,8,52,14),
    "Donburi": ("🍱","Japanese",7.0,560,26,68,18),
    "Dumplings": ("🥟","Dim Sum",4.5,340,12,45,10),
    "Taiwanese Yangchun Noodles": ("🍜","Taiwanese",4.5,420,14,58,12),
    "Stir Fry Long Chilli Pepper with Pork Rice": ("🍚","Local Hawker",4.5,480,20,55,18),
    "Chicken & Egg Curry Puff": ("🥟","Snacks",1.5,220,7,22,12),
    "Fish Head Bee Hoon": ("🍜","Seafood",7.0,450,28,45,14),
    "Commando Dessert": ("🍧","Desserts",2.0,220,3,45,3),
    "Chicken Inasal": ("🍗","Indonesian/Malay",6.5,520,34,20,30),
    "Double Fish Steamboat": ("🍲","Seafood",16.0,480,38,20,24),
    "Steamboat": ("🍲","Mala/Hotpot",12.0,600,32,30,34),
    "Fried Rice": ("🍚","Local Hawker",4.5,520,14,68,18),
    "Oyster Don": ("🦪","Japanese",9.5,520,20,65,16),
    "Chicken Hotpot": ("🍲","Mala/Hotpot",7.5,550,30,25,30),
    "Korean Soup": ("🍲","Korean",7.0,420,25,20,22),
    "Rice Table": ("🍛","Indonesian/Malay",6.5,580,22,70,20),
    "Hunan Fish Head": ("🐟","Local Hawker",9.0,480,35,15,26),
    "Mini Wok": ("🥘","Local Hawker",6.0,500,20,55,20),
    "BBQ Stingray": ("🐟","Seafood",8.5,380,30,10,20),
    "Fried Hokkien Prawn Mee": ("🍜","Noodles",5.5,520,20,60,20),
    "Double-Boiled Soup": ("🍲","Chinese Roast",8.0,320,20,15,18),
    "Local Snacks": ("🥟","Snacks",3.5,250,6,35,10),
    "Fried Noodles": ("🍜","Noodles",4.5,480,16,62,16),
    "Lobster Roll": ("🦞","Seafood",14.0,480,22,45,22),
    "Chaat": ("🥙","Indian",5.0,320,10,45,10),
    "Skewer Rice Bowl": ("🍢","Local Hawker",8.0,550,30,55,20),
    "Big Bern's Cheese Burger": ("🍔","Western",12.0,680,32,45,38),
    "Pepperoni Pizza": ("🍕","Western",9.9,700,28,70,32),
    "Satay Bee Hoon": ("🍢","Local Hawker",6.0,480,22,55,20),
    "BBQ Seafood": ("🦞","Seafood",12.0,520,30,20,28),
    "Lok Lok Skewers": ("🍢","Local Hawker",6.0,420,20,25,26),
    "BBQ Chicken Wings": ("🍗","Chicken Rice/Poultry",6.5,480,28,15,30),
    "Tonkotsu Chashu Ramen": ("🍜","Japanese",12.0,650,30,65,28),
    "Putian Lor Mee": ("🍜","Noodles",5.0,480,18,62,16),
    "Roast Duck Rice": ("🦆","Chinese Roast",5.5,540,26,60,20),
    "Handmade Dumpling": ("🥟","Dim Sum",5.0,380,16,48,12),
    "Beef Pho": ("🍜","Vietnamese",7.0,480,28,55,14),
    "Rou Jia Mo (Chinese Burger)": ("🥙","Local Hawker",4.5,380,16,42,16),
    "Bubble Tea": ("🧋","Beverages",5.0,320,2,68,4),
    "Chicken Katsu": ("🍗","Japanese",8.5,620,28,55,28),
    "Pork Floss Bun": ("🍞","Bakery/Dessert",2.2,240,8,32,8),
    "Vegetarian Wanton Mee": ("🍜","Local Hawker",4.5,400,16,55,12),
    "Chicken Katsu Curry Rice": ("🍛","Japanese",8.0,620,26,68,24),
    "Royal Chicken Roti": ("🫓","Indian",5.0,480,18,55,20),
    "Ayam Bakar Penyet Set": ("🍗","Indonesian/Malay",6.5,580,30,40,30),
    "Dang Gui Roasted Duck Noodle": ("🍜","Chinese Roast",6.0,520,26,55,20),
    "Salmon Teriyaki": ("🍣","Japanese",9.0,560,32,40,24),
    "Sesame Oil Mee Sua with Braised Egg & Chicken": ("🍜","Taiwanese",6.5,480,24,55,16),
    "Dry Handmade Noodle": ("🍜","Noodles",5.0,460,18,60,14),
    "Signature Pork Trotter with Vinegar": ("🍲","Local Hawker",7.5,480,26,20,28),
    "Signature Dry Handmade Noodle": ("🍜","Noodles",5.5,480,20,62,16),
    "Beef Roti": ("🫓","Indian",5.5,500,22,55,20),
    "Claypot Herbal Bak Kut Teh": ("🍲","Local Hawker",7.5,460,28,15,26),
    "Shanghai Pan Fried Bao": ("🥟","Bakery/Dessert",4.0,320,12,42,12),
    "Signature Teochew Salted Veg Soup": ("🍲","Local Hawker",6.5,360,24,12,20),
    "Teppanyaki Garlic Chicken": ("🍗","Chicken Rice/Poultry",8.5,600,34,45,28),
    "Signature Char Siew Rice with Dumpling": ("🍚","Chinese Roast",6.5,600,28,68,22),
    "Signature Biang Biang Noodle": ("🍜","Noodles",6.0,520,20,68,16),
    "Cumin Beef": ("🥩","Local Hawker",7.5,540,30,30,28),
    "Mixed Grill": ("🍖","Western",12.0,750,40,45,40),
    "Trio Roasted Platter": ("🍗","Chinese Roast",8.0,620,32,55,26),
    "Nonya Kueh": ("🍥","Bakery/Dessert",1.5,180,3,32,6),
    "Big Mac": ("🍔","Western",7.2,550,25,45,30),
    "Prawn Paste Chicken": ("🍗","Local Hawker",5.5,480,26,20,28),
    "Hainanese Chicken Rice": ("🍗","Chicken Rice/Poultry",4.5,540,26,62,18),
    "Penang Laksa": ("🍜","Local Hawker",5.5,460,18,55,16),
    "Lechon Kawali": ("🍖","Filipino",8.5,620,30,15,45),
    "Salad": ("🥗","Local Hawker",6.0,280,12,20,16),
    "Epok-Epok": ("🥟","Bakery/Dessert",1.5,180,4,22,8),
    "Nasi Sambal Goreng": ("🍚","Indonesian/Malay",4.5,480,12,65,18),
    "Asam Steamed Fish": ("🐟","Seafood",7.0,320,32,15,12),
    "Salted Egg Yolk Cutlet": ("🍗","Local Hawker",6.0,550,25,35,32),
    "Salted Egg Fried Chicken": ("🍗","Chicken Rice/Poultry",6.5,580,30,30,35),
    "Roasted Duck": ("🦆","Chinese Roast",6.0,520,30,10,38),
    "Claypot Bak Kut Teh": ("🍲","Local Hawker",7.5,480,32,15,30),
    "Char Seow Kolomee": ("🍜","Noodles",5.5,480,22,55,18),
    "Sorrowful Romance Claypot Rice": ("🍚","Local Hawker",6.5,560,24,75,16),
    "Prawn Paste Chicken Cutlet Fried Rice": ("🍚","Chicken Rice/Poultry",5.5,620,24,70,26),
    "Teppanyaki Chicken Omu Curry Rice": ("🍛","Japanese",7.5,650,26,75,24),
    "Indo Mie Chicken Cutlet": ("🍗","Indonesian/Malay",6.0,650,28,60,32),
    "Banana Fritters": ("🍌","Bakery/Dessert",2.0,220,3,35,9),
    "Hey! Pepper Beef": ("🥩","Western",8.5,620,35,40,30),
    "Mian Fen Guo": ("🍲","Noodles",4.5,420,16,62,12),
    "Boneless Chicken Rice": ("🍗","Chicken Rice/Poultry",5.0,540,30,62,16),
    "Sheng Mian": ("🍜","Noodles",4.5,460,18,58,14),
    "Seafood Fried Rice": ("🍚","Seafood",6.5,560,20,70,20),
    "Putu Piring": ("🍥","Bakery/Dessert",2.0,150,2,30,3),
    "Fish Porridge": ("🥣","Seafood",5.0,280,20,35,6),
    "Mee Siam": ("🍜","Indonesian/Malay",4.5,430,14,60,14),
    "Roasted Meats": ("🍖","Chinese Roast",6.5,560,30,20,36),
    "Fried Hor Fun": ("🍜","Noodles",5.0,540,18,65,20),
    "Pepper Rice": ("🍚","Japanese",6.5,580,26,60,24),
    "Ayam Panggang Set": ("🍗","Indonesian/Malay",6.5,560,32,25,32),
    "Mini Buddha Jumps Over The Wall": ("🍲","Chinese Roast",9.0,420,28,20,22),
    "Double Chili Chicken": ("🌶️","Local Hawker",6.5,540,28,20,32),
    "Dumpling Noodle": ("🍜","Noodles",5.0,460,20,58,14),
    "La Mian": ("🍜","Noodles",5.0,470,18,62,14),
    "Soya Sauce Chicken Rice": ("🍗","Chinese Roast",5.0,540,26,62,18),
    "Pickle Sour Slice Meat Pot": ("🍲","Local Hawker",8.5,480,30,15,28),
})

# --- Batch AY additions (Clementi Ave 3 Blk 448 + Eunos Crescent Blk 4A + Tanglin Halt Market) ---
DISH_DB.update({
    "Sesame Oil Chicken Rice": ("🍗","Chicken Rice/Poultry",5.0,560,28,55,26),
    "Tau Huay": ("🍮","Bakery/Dessert",2.0,150,8,20,4),
    "Duck Noodle Soup": ("🍜","Chinese Roast",5.5,480,26,55,18),
})

# --- Batch BA additions (Tiong Bahru Market + Dunman Food Centre + Zion Riverside Food Centre) ---
DISH_DB.update({
    "Tau Kwa Pau": ("🥟","Local Hawker",2.0,220,8,25,9),
})

# --- Batch BB additions (15-venue clean-tag push: ABC Brickworks, Redhill, Bendemeer,
# Telok Blangah Crescent, Holland Drive, People's Park, Albert Centre, East Coast Lagoon,
# Boon Lay Place, Havelock Road, Tanjong Pagar Plaza, Serangoon Garden, Sims Vista,
# Taman Jurong, Marine Terrace) ---
DISH_DB.update({
    "Wanton Egg Noodles": ("🍜","Noodles",4.5,420,18,55,12),
    "Bak Kwa": ("🥩","Chinese Roast",8.0,380,22,25,20),
    "Mee Pok": ("🍜","Noodles",4.5,460,20,58,14),
    "Rosti": ("🥔","Western",6.5,480,12,55,22),
    "Pizza": ("🍕","Western",6.0,600,22,65,26),
    "Sichuan Grilled Fish": ("🐟","Sichuan",8.5,480,35,15,28),
})

# --- Batch BC additions (14-venue clean-tag push: Marine Parade Central, Upper Boon Keng,
# Geylang Bahru, Shunfu Mart, Margaret Drive, Pasir Panjang, Bukit Merah Central, Bedok Food
# Centre, Chong Pang, Toa Payoh Vista, Bedok Reservoir Road Blk 630, Circuit Road Blk 79/79A,
# Circuit Road Blk 89, 353 Clementi Avenue 2) ---
DISH_DB.update({
    "Ngoh Hiang": ("🌯","Chinese Roast",4.5,420,18,35,22),
    "Fried Chicken": ("🍗","Chicken Rice/Poultry",5.5,520,30,25,30),
    "Lontong": ("🍛","Indonesian/Malay",4.5,450,12,60,18),
})

# --- Batch BD additions (10-venue clean-tag push: Beo Crescent, Redhill Food Centre,
# Commonwealth Crescent, Hong Lim, North Bridge Road, Market Street, Circuit Road Market,
# Yuhua Market, Marsiling Lane, Ang Mo Kio Central) ---
DISH_DB.update({
    "Teochew Kueh": ("🥟","Local Hawker",2.5,280,6,40,10),
    "Vegetarian Satay": ("🍢","Local Hawker",6.0,320,18,20,14),
})

# --- Batch BE additions (8-venue clean-tag push: Pek Kio, Telok Blangah Rise, Empress Road,
# Jurong West Street 52 Blk 505, Chong Boon, Cheng San, ION Orchard, EastPoint Mall) ---
DISH_DB.update({
    "Chee Cheong Fun": ("🥟","Dim Sum",4.0,320,8,58,6),
    "Pork Rib Prawn Noodles": ("🍜","Noodles",6.0,520,28,55,20),
    "Coffee & Toast": ("☕","Beverages",3.5,320,8,45,12),
    "Tutu Kueh": ("🥟","Local Hawker",2.0,180,4,30,6),
    "Vegetarian Bee Hoon": ("🥦","Local Hawker",3.5,380,12,58,10),
})

# --- Batch BF additions (kopitiam_-cluster resolution via kopitiam-stall-dishes.json:
# Yishun 507, Rivervale Plaza, Bidadari 106, Keat Hong, FairPrice Hub) ---
DISH_DB.update({
    "Chicken Bolognese": ("🍝","Western",6.5,550,28,55,18),
    "Minced Chicken Indomie": ("🍜","Local Hawker",4.5,480,20,55,18),
    "Meatball Noodles": ("🍜","Noodles",5.0,460,22,55,16),
})

# --- Batch BG additions (kopitiam_-cluster resolution, second wave via
# kopitiam-stall-dishes.json: Pasir Ris West Plaza, Clementi 209B, Ghim Moh Link 29,
# Simei 248) ---
DISH_DB.update({
    "Beef Stew Garlic Rice": ("🍚","Western",7.0,620,30,55,28),
    "Korean Fried Chicken": ("🍗","Korean",6.5,580,30,40,30),
    "Vegetarian Char Kway Teow": ("🍜","Local Hawker",4.5,500,10,65,20),
})

# --- Batch BH additions (third kopitiam_-cluster wave + Food Junction/standalone venues:
# Kopitiam @ Mapletree Business City, Upper Serangoon 476D, Bagus @ Northshore Plaza II,
# Changi General Hospital, Tampines 878C, NEX/Junction 8 (Food Junction), China Square Food
# Centre, Teck Ghee Square, 505 Jurong West Market & Food Centre) ---
DISH_DB.update({
    "Golden Broth Ramen": ("🍜","Noodles",7.0,550,24,60,20),
    "Chicken Biryani": ("🍛","Indian",6.0,620,28,78,20),
    "Fireyaki Grill Set": ("🔥","Japanese",9.5,650,34,40,32),
    "Grilled Steak": ("🥩","Western",9.0,650,40,20,35),
})

# --- Batch BI additions (individually-researched follow-up worklist brands, real dishes
# sourced via web search - sethlui/danielfooddiary/misstamchiak/eatbook/OpenRice) ---
DISH_DB.update({
    "Fish Head Curry": ("🍛","Seafood",8.5,480,32,25,22),
    "Fried Shark Lor Mee": ("🍜","Noodles",5.0,500,20,62,18),
    "Nyonya Kueh": ("🥟","Bakery/Dessert",1.5,180,3,32,5),
    "Har Gau": ("🥟","Dim Sum",3.6,220,14,20,8),
    "Cinnamon Roll": ("🥐","Bakery/Dessert",1.6,320,6,45,12),
    "Hakka Soon Kueh": ("🥟","Local Hawker",2.0,220,5,35,7),
    "Muffin": ("🧁","Bakery/Dessert",2.5,350,5,45,16),
    "Seafood Hor Fun": ("🍜","Noodles",6.5,520,26,60,18),
    "Scallop Glutinous Rice": ("🍚","Local Hawker",4.8,480,20,65,14),
    "Ginkgo Nut Dessert": ("🍮","Bakery/Dessert",3.0,180,3,35,3),
    "Sweet and Sour Pork Rice": ("🍚","Local Hawker",5.0,620,22,70,24),
    "Mee Tai Mak": ("🍜","Noodles",4.0,380,14,55,10),
    "Nasi Rawon": ("🍛","Indonesian/Malay",6.0,580,26,60,24),
})

# --- Batch BJ additions (cherry-picked real dish-tag brands surfaced by re-auditing mixed
# venues - i.e. venues with some CORP/GENERIC brands alongside genuinely dish-named ones -
# rather than only fully-"[CLEAN]" venues) ---
DISH_DB.update({
    "Taiwanese Milk Tea": ("🧋","Beverages",3.5,280,4,55,4),
    "Thai Nasi Lemak": ("🍛","Thai",5.5,560,24,60,22),
    "Pad Thai": ("🍜","Thai",6.0,550,20,65,20),
    "Bubble Tea": ("🧋","Beverages",3.5,300,2,60,3),
    "Fruit Tea": ("🍹","Beverages",3.0,150,0,35,0),
    "Fish Head Steamboat": ("🍲","Seafood",12.0,420,35,20,18),
    "Bamboo Shoot Kueh": ("🥟","Local Hawker",2.0,200,4,32,6),
    "Yunnan Rice Noodles": ("🍜","Noodles",6.5,480,22,62,14),
    "Biang Biang Noodles": ("🍜","Noodles",7.0,580,24,70,20),
    "Sarawak Kolo Mee": ("🍜","Noodles",5.5,460,20,58,14),
    "Teh Tarik": ("🍵","Beverages",1.8,150,3,25,4),
    "Fried Oyster": ("🦪","Seafood",6.5,480,18,45,24),
})

# --- Batch BK additions (large kopitiam_ broad-category-tag sweep via
# kopitiam-stall-dishes.json - discovered these 56 brands were missed by the earlier
# kopitiam_ cluster batches (BF/BG/BH) because they weren't grouped into a shared-prefix
# venue cluster, just individually scattered brands with broad-category cuisine tags) ---
DISH_DB.update({
    "Chicken Pot": ("🍲","Chicken Rice/Poultry",6.5,480,30,30,20),
    "Yang Zhou Fried Rice": ("🍚","Chinese Roast",5.5,580,20,70,22),
    "BBQ Chicken Set": ("🍗","Japanese",7.5,550,32,40,24),
    "Specialty Coffee": ("☕","Beverages",4.0,20,1,3,0),
    "Banh Mi": ("🥖","Vietnamese",5.5,480,20,55,18),
})

# --- Batch BL additions (GENERIC-cuisine kopitiam_ brands whose real brand `name` itself
# names a dish, or resolved via kopitiam-stall-dishes.json keyed on that name) ---
DISH_DB.update({
    "Chendol": ("🍧","Bakery/Dessert",2.5,280,3,55,6),
    "Lotus Root Pork Ribs Soup": ("🍲","Local Hawker",6.5,400,26,15,22),
    "Mixed Vegetable Rice": ("🍚","Local Hawker",3.5,420,15,55,14),
    "ABC Soup": ("🍲","Local Hawker",5.0,280,12,30,10),
    "Acai Soft Serve": ("🍨","Bakery/Dessert",5.5,220,4,40,6),
    "Ice Cream": ("🍦","Bakery/Dessert",4.0,250,4,35,10),
    "Bakso": ("🍲","Indonesian/Malay",5.5,380,22,30,16),
    "Goreng Pisang": ("🍌","Local Hawker",2.0,220,2,40,7),
    "Egg Fried Rice": ("🍳","Local Hawker",4.0,480,12,65,18),
    "Claypot & Herbal Soup": ("🍲","Local Hawker",6.5,380,28,12,20),
})

# --- Batch 2026-09-01 additions (kopitiam_culiang_yufen - Culiang Yufen By Popular Food,
# real chain menu via foodpanda, macros calibrated against existing Fish Soup / Meatball
# Noodles / Fishball Noodles entries above) ---
DISH_DB.update({
    "Golden Soup Sliced Fish Rice Noodle": ("🍜","Seafood",9.6,420,27,46,11),
    "Golden Soup Fat Beef Rice Noodle": ("🍜","Noodles",10.7,480,28,46,19),
    "Signature Luncheon Meat Rice Noodle": ("🍜","Noodles",8.6,470,16,50,21),
    "Mala Meat Ball Rice Noodle": ("🍜","Noodles",8.6,490,20,52,22),
    "Sour & Spicy Fat Intestine Rice Noodle": ("🍜","Noodles",10.7,520,18,45,28),
    "Tomato Prawn Paste Rice Noodle": ("🍜","Seafood",10.7,440,22,48,15),
    "Sauerkraut Sliced Fish Soup With Rice": ("🍚","Seafood",11.6,460,30,50,10),
    "Glutinous Rice Cake": ("🍘","Dim Sum",5.5,230,4,36,8),
})

# --- Batch 2026-09-04 additions (85_fengshan_centre_j_k_kings_prata_pte_ltd - no existing
# convention for these two dishes; calibrated against the existing Roti Prata/Egg Prata
# entries above and the Curry/Fish Head Curry family for the fish-curry portion) ---
DISH_DB.update({
    "Cheese Prata": ("🫓","Indian",2.5,340,11,30,20),
    "Prata with Fish Curry": ("🫓","Indian",3.5,380,14,40,16),
})

# --- Batch 2026-09-05 additions (jurong_west_hawker_centre_golden_rooster_pte_ltd - Golden
# Rooster/Tenderfresh Group; no existing convention for these three, calibrated against the
# existing "Chicken Chop"/"Chicken Wing"/"Fried Rice"/lps_roast_chicken_rice entries above) ---
DISH_DB.update({
    "Half Fried Chicken with Rice & Salad": ("🍗","Chicken",5.3,780,40,68,38),
    "Black Pepper Chicken Chop Rice": ("🍗","Chicken",6.5,630,33,58,32),
    "Fish & Chips": ("🐟","Seafood",6.8,680,26,60,32),
})

# --- Batch 2026-09-05 additions (teban_gardens_market_and_food_centre_barakath_international_pte_ltd
# - trades as "Al Barakath Restaurant & Catering", confirmed via its own foodpanda delivery menu,
# same SFA-licensed address as this Brand's existing Premises row. Real dish names + current SGD
# prices are the outlet's own listing; macros calibrated against the existing Roti Prata/Egg Prata,
# Thosai (Plain), Murtabak (Chicken), and Nasi Briyani (Chicken) entries above) ---
DISH_DB.update({
    "Briyani Chicken": ("🍛","Indian",7.28,650,32,75,22),
    "Briyani Mutton": ("🍛","Indian",7.84,720,30,75,32),
    "Egg Onion Prata": ("🫓","Indian",2.88,290,10,34,13),
    "Murtabak Ayam": ("🫓","Indian",8.80,600,28,58,26),
    "Mutton Set Meal": ("🍛","Indian",6.80,620,28,68,26),
    "Fish Set Meal": ("🍛","Indian",5.76,520,24,68,16),
    "Plain Thosai (2 pcs)": ("🫓","Indian",3.12,390,12,72,6),
})

# --- Batch 2026-09-05 additions (wok_hei_hor_fun - new Brand, Michelin Bib Gourmand hor fun
# stall, Hawkers' Street concession at The Clementi Mall; flagship at Redhill Food Centre.
# Real dish names + this branch's own prices from Little Day Out's in-person stall writeup;
# macros calibrated against the existing Hor Fun/Seafood Hor Fun, Seafood White Bee Hoon,
# BBQ Pork Rice, and Prawn Paste Chicken/Har Cheong Gai entries above) ---
DISH_DB.update({
    "Assorted Hor Fun": ("🍜","Noodles",6.90,560,26,60,22),
    "Sliced Fish Hor Fun": ("🍜","Noodles",7.90,500,26,58,16),
    "Assorted Bee Hoon": ("🍜","Noodles",6.90,520,22,60,18),
    "Ginger Onion Pork Rice": ("🍚","Local Hawker",6.90,540,24,62,18),
    "Lala Assorted White Bee Hoon": ("🍜","Noodles",7.90,480,28,50,16),
    "Fried Prawn Paste Chicken (6 pc)": ("🍗","Local Hawker",9.00,520,28,22,32),
})

# --- Batch 2026-09-06 additions (springleaf_prata_place - new Brand, Hawkers' Street concession
# at Tang Plaza; MUIS halal-certified chain, Michelin Plate since 2019. Real dish names + prices
# cross-verified across two independent human reviews of the flagship outlet (DanielFoodDiary.com
# 2020, 2bearbear.com 2022/2023 - exact price matches on 6 of 8 items); macros calibrated against
# the existing Egg Prata/Roti Prata entries, tekka_murtabak's Murtabak (Chicken) (450/22/48/20),
# and Popeyes' Classic Chicken Burger (570/28/48/30) for the burger-style Murtaburger) ---
DISH_DB.update({
    "Egg Prata": ("🫓","Indian Breads",2.30,270,9,32,12),
    "Masala Chicken": ("🍛","Indian",5.00,380,30,12,22),
    "Portobello Mozzarella Prata": ("🫓","Indian Breads",5.90,420,14,40,22),
    "Plaster Blaster": ("🍳","Indian Breads",5.90,480,18,35,28),
    "Magic Meatless Murtabak": ("🫓","Indian Breads",6.90,480,16,55,20),
    "Murtaburger": ("🍔","Indian Breads",8.50,650,28,55,32),
    "Umami-50": ("🧀","Indian Breads",9.90,600,22,50,34),
    "Prata Alfredo": ("🍝","Indian Breads",10.90,620,26,48,34),
})

# --- Batch 2026-09-06 additions (3rd restaurant-track run today; tartini_grill_pasta_clementi_mall
# - new Brand, Hawkers' Street concession at The Clementi Mall; Western grill-and-pasta stall, also
# listed as "Tartini Kitchen Grill and Pasta" on foodpanda and "Tartini Sedap Grill and Pasta" on
# halalboleh.com (MUIS certified), all same address. Real dish names + prices from foodpanda's full
# delivery menu; macros calibrated against astons_chicken_chop/astons_fish_chips/astons_salmon,
# kopitiam_beradik_western's Chicken Chop, the existing "Mixed Grill" entries, saiz_carbonara,
# dom_pasta_bolognese/beradikwestern_chicken_bolognese, the Grilled Salmon with Aglio Olio /
# Chicken Steak Aglio Olio entries, and ws_wings_6pc_hot) ---
DISH_DB.update({
    "Signature Chicken Chop": ("🍗","Western",11.90,560,38,40,26),
    "Classic Fish and Chips": ("🐟","Western",11.90,580,26,58,28),
    "Tartini Beef Steak": ("🥩","Western",16.90,620,40,35,34),
    "Tartini Grilled Salmon": ("🐟","Western",14.90,520,40,30,28),
    "Mixed Grill Combo A (Chicken Chop + Grilled Fish + Lamb Steak)": ("🍖","Western",18.90,980,62,55,55),
    "Tartini Signature Fried Rice": ("🍚","Western",9.90,550,22,78,16),
    "Chicken Ham Carbonara": ("🍝","Pasta",10.90,750,26,85,32),
    "Tartini Chicken Bolognese": ("🍝","Pasta",9.90,580,26,72,20),
    "Prawn Aglio Olio": ("🍝","Pasta",13.90,560,28,70,20),
    "Tartini Chicken Wings (3pcs)": ("🍗","Sides",8.90,330,22,14,22),
})

# --- Batch 2026-09-07 additions (restaurant-track scheduled run; rong_cheng_rou_gu_cha_clementi_mall
# - new Brand, Hawkers' Street concession at The Clementi Mall; heritage Teochew bak kut teh
# pioneer, one of 5 Michelin Bib Gourmand names at this venue per greatdeals.com.sg/alvinology.com's
# Oct/Nov 2025 opening coverage. Real dish names + prices from Eatbook.sg's Nov 2021 flagship
# media-tasting review (no Clementi-specific menu found; chain publishes one standing menu).
# "Bak Kut Teh", "Pig Trotters", and "You Tiao" reuse this DISH_DB's own existing entries verbatim
# (see above) rather than being redefined here. Dragon Rib Soup, Rice, Mui Choy, and Braised
# Peanuts are new dish types: Dragon Rib Soup reasoned as a scaled-up Bak Kut Teh (bigger, meatier
# loin ribs, ~1.35x per Eatbook's description and its $9 vs $6.50 price ratio); Rice/Mui
# Choy/Braised Peanuts have no existing analog or official/HPB source (standard BKT sides) -
# reasoned estimates from typical per-serving composition at the sizes implied by Eatbook's prices ---
DISH_DB.update({
    "Dragon Rib Soup": ("🍖","Local Hawker",9.00,580,36,12,36),
    "Rice (BKT side)": ("🍚","Sides",0.50,190,4,42,0.5),
    "Mui Choy": ("🥬","Sides",2.00,35,1,6,1),
    "Braised Peanuts": ("🥜","Sides",2.00,170,7,10,12),
})

# --- Batch 2026-09-08 additions (restaurant-track scheduled run, 2nd pick;
# lixin_teochew_fishball_noodle_clementi_mall - new Brand, Hawkers' Street concession at The
# Clementi Mall; Michelin-recognised, est. 1968. Real dish names + prices sourced directly from
# this exact stall's own foodpanda listing (restaurant id ogn0). No official calorie/macro figures
# published by the brand or found on HPB - all macros are reasoned estimates anchored on this
# DISH_DB's own existing "Teochew Fishball Noodle" calibration (400/20/55/10 for a basic $4.50
# hawker portion), scaled per item for this stall's larger $6.50-$11.70 food-court/delivery
# portions and each item's specific composition (noodle vs soup-only, added minced meat/mushroom/
# dumplings). No diet tags assigned on any item at the MenuItem level: fishball-noodle dishes are
# on CLAUDE.md 5.1's standing no_pork skip-list (the brand's own site confirms noodles are served
# "topped with crispy lard"), and the brand's own site confirms the fish dumpling filling is pork,
# so dumpling items get no compatibleWith array at all rather than a false-safe tag. ---
DISH_DB.update({
    "Traditional Fishball Noodle (Lixin)": ("🍜","Noodles",8.80,430,22,56,12),
    "Lixin Signature Noodle": ("🍜","Noodles",11.70,600,32,66,20),
    "Mushroom Minced Meat Noodle": ("🍜","Noodles",10.60,540,26,62,18),
    "Fish Dumpling Soup": ("🍥","Soups",8.80,300,22,18,14),
    "Fishball Soup (Lixin)": ("🍥","Soups",6.50,220,18,10,10),
    "Fishcake (Lixin)": ("🐟","Sides",5.20,210,13,9,12),
    "Sambal Meat Dumplings": ("🥟","Sides",7.10,340,16,24,20),
})

# --- Batch 2026-09-15 additions (hup_hong_chicken_rice_tang_plaza - new Brand, Hawkers' Street
# concession at Tang Plaza; Michelin Guide-listed, flagship at Yuhua Village Market & Food Centre.
# Real dish names + this branch's own prices sourced directly from foodpanda's Tang-Plaza-specific
# delivery listing. No outlet-specific calorie/macro source found, so the two base rice plates were
# calibrated against this DISH_DB's own existing "Chicken Rice" values at tian_tian_chicken_rice/
# lau_pa_sat_chicken_rice (607/35/74/17 steamed, 650/36/76/20 roasted) rather than the older generic
# "Steamed/Roasted Chicken Rice" entries above (which predate that calibration and are used
# elsewhere) - added under disambiguated "(Hup Hong)" keys so this update does not silently change
# the generic entries' values for other brands' scrape-matching. Duo/Wing/Drumstick/Braised Egg are
# reasoned variants/estimates with no existing DISH_DB key. ---
DISH_DB.update({
    "Steamed Chicken Rice (Hup Hong)": ("🍗","Rice",7.20,607,35,74,17),
    "Roasted Chicken Rice (Hup Hong)": ("🍗","Rice",7.20,650,36,76,20),
    "Duo Chicken Rice": ("🍗","Rice",8.60,628,35,75,18),
    "Chicken Wing Rice (2pc)": ("🍗","Rice",8.00,580,30,66,22),
    "Chicken Drumstick Rice": ("🍗","Rice",8.60,620,34,68,20),
    "Braised Egg": ("🥚","Sides",1.70,78,6,1,5),
})

# --- Batch 2026-09-16 additions (545_whampoa_prawn_noodles_square_2 - new Brand, Hawkers' Street
# concession at Square 2/Novena, found this run while identifying that venue's previously-unknown
# 9-stall list. Real dish names + this stall's own prices sourced from littledayout.com/eatbook.sg
# coverage of the venue's Sep 2025 opening. Base "Prawn Noodles" macros reused verbatim from this
# DISH_DB's existing generic entry above, added under a disambiguated "(545 Whampoa)" key since this
# stall's own price ($6.90) differs from the generic entry's ($5.50) - same convention as the Hup
# Hong batch above. Pig Tail / Pork Liver variants have no DISH_DB precedent - reasoned from the base
# bowl plus generic raw-ingredient nutrition data for each named cut, not outlet-specific sources. ---
DISH_DB.update({
    "Prawn Noodles (545 Whampoa)": ("🍜","Noodles",6.90,500,22,55,18),
    "Pig Tail Prawn Noodle": ("🍜","Noodles",8.90,680,30,55,34),
    "Pork Liver Prawn Noodle": ("🍜","Noodles",8.50,615,39,57,21),
})

# --- Batch 2026-09-18 (2nd pass) additions (toa_payoh_lorong_8_blk_210_lee_kwang_kee_groups_pte_ltd
# - Lee Kwang Kee Teochew Cuisine, 212 Lorong 8 Toa Payoh. Brand/Premises already existed from the
# 2026-08-20 SFA restructuring under a bare licensee name; confirmed via SFA licence E75024N002 and
# WebSearch to be a real, independently-documented Teochew restaurant, not a corporate placeholder.
# Real dish names + prices sourced from ivanteh-runningman.blogspot.com's photographed-menu review;
# macros reasoned/calibrated against this DISH_DB's own dim sum, oyster omelette, steamed fish, and
# chilli crab entries - see menuItems.ts's comment block immediately above the lkk_ entries and
# reference/research-sessions/2026-09-18-lee_kwang_kee_teochew_cuisine.md for full reasoning. ---
DISH_DB.update({
    "Har Gow (3 Pcs)": ("🥟","Dim Sum",3.60,150,7,14,6),
    "Xiao Long Bao (3 Pcs)": ("🥟","Dim Sum",3.60,160,6,16,8),
    "Siew Mai (3 Pcs)": ("🥟","Dim Sum",3.60,150,8,12,8),
    "Steamed Shrimp Beancurd Skin Roll (3 Pcs)": ("🥟","Dim Sum",3.60,170,7,10,11),
    "Steamed Pork Ribs Black Bean Sauce": ("🍖","Dim Sum",3.60,190,12,5,14),
    "Pan-Fried Yam Cake (Lee Kwang Kee)": ("🍘","Local Hawker",2.00,180,3,20,10),
    "Teochew Fried Oyster Omelette (Small)": ("🦪","Seafood",12.00,480,20,38,24),
    "Sweet & Sour Sliced Garoupa Fish (Small)": ("🐟","Seafood",35.00,900,45,60,45),
    "Teochew Cold Crab (Per Crab)": ("🦀","Seafood",50.00,320,42,4,14),
    "Yam Paste With Pumpkin & Gingko Nuts": ("🍮","Bakery/Dessert",4.50,340,3,48,15),
})
