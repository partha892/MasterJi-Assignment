### E-commerce
## Table
1️⃣ Users 
user_id
name
email
password
phone
address
user_type[buyer,seller]

2️⃣ Product 
product_id
seller_id
name
description
price
stock
category
rating
image

3️⃣ Cart 
user_id
product_id
quantity
price
total_price

4️⃣ Orders 
order_id
user_id
total_price
payment_id
status [pending, shipped, delivered, canceled]
Order status
created_at

5️⃣ Wishlist 
wishlist_id
user_id
product_id
added_at

6️⃣ Coupons 
coupon_id
code
discount
valid_from
valid_to
usage_limit

7️⃣ Payments 
payment_id
order_id
user_id
amount
payment_method [ard, paypal, UPI, COD]
status [pending, completed, failed]
transaction_id

🎯 Relationships
Users (1) → (M) Products 
Users (1) → (M) Cart 
Users (1) → (M) Orders 
Orders (1) → (M) Payments 
Users (1) → (M) Wishlist 
Orders (M) → (M) Products
Coupons (1) → (M) Orders