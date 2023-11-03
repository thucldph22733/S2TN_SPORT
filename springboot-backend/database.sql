create database soccer_clothes_management_system;

use soccer_clothes_management_system;

-- 1 tao bang loai san pham luu nhung thong tin loai ao nhu: ao dai tay, ao coc, ao khoac;
create table categories
(
    id bigint auto_increment,
    category_name nvarchar(100),
    category_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table categories auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 2 tao bang cau lac bo;
create table clubs
(
    id bigint auto_increment,
    club_name nvarchar(100),
    category_club bit,
    club_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table clubs auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 4 tao bang thuong hieu;
create table brands
(
    id bigint auto_increment,
    brand_name nvarchar(100),
    brand_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table brands auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 5 tao bang nha cung cap;
create table suppliers
(
    id bigint auto_increment,
    supplier_name nvarchar(100),
    email varchar(100),
    phone_number char(12),
    address varchar(150),
    supplier_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table suppliers auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 6 tao bang san pham;
create table products
(
    id bigint auto_increment,
    category_id bigint,
    club_id bigint,
    brand_id bigint,
    supplier_id bigint,
    product_name nvarchar(100),
    product_avatar varchar(255),
    product_hot bit,
    product_sale bit,  -- san pham ban chay;
    product_new bit,  -- san pham moi;
    view_count int,  -- so luot xem san pham;
    product_describe nvarchar(255),
    product_status bit, -- trang thai dang hot dong hoặc đã ngừng bán
    create_date datetime,
    create_by nvarchar(100),
    update_date datetime,
    update_by nvarchar(100),
    primary key (id)
);
alter table products auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 7 tao bang anh;
create table images
(
    id bigint auto_increment,
    product_id bigint,
    image_name nvarchar(100),
    image_link varchar(255),
    image_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table images auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 8 tao bang mau sac;
create table colors
(
    id bigint auto_increment,
    color_name nvarchar(100),
    color_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table colors auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 9 tao bang kich thuoc;
create table sizes
(
    id bigint auto_increment,
    size_name nvarchar(100),
    size_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table sizes auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 10 tao bang chat lieu
create table materials
(
    id bigint auto_increment,
    material_name nvarchar(100),
    material_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table materials auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000

-- 11 tao bang chi tien san pham;
create table product_details
(
    id bigint auto_increment,
    product_id bigint,
    color_id bigint,
    material_id bigint,
    size_id bigint,
    quantity int,
    price double,
    promotion_price double, -- gia giam;
    product_status bit,
    create_date datetime,
    create_by nvarchar(100),
    update_date datetime,
    update_by nvarchar(100),
    primary key (id)
);
alter table product_details auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 12 tao bang hinh thuc vận chuyển;
create table deliveries
(
    id bigint auto_increment,
    delivery_name nvarchar(100),
    price double,
    delivery_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table deliveries auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 13 tao bang phuong thuc thanh toan;
create table payments
(
    id bigint auto_increment,
    payment_name nvarchar(100),
    payment_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table payments auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 14 tao bang trang thai hoa don
create table order_status
(
    id bigint auto_increment,
    status_name nvarchar(100),
    status_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table order_status auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 15 tao bang vai tro;
create table roles
(
    id bigint auto_increment,
    role_name nvarchar(100),
    role_describe nvarchar(255),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table roles auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 16 tao bang nhan vien;
create table staffs
(
    id bigint auto_increment,
    role_id bigint,
    staff_name nvarchar(100),
    avatar varchar(100),
    phone_number char(12),
    email varchar(100),
    gender boolean,
    birth_of_day date,
    address nvarchar(255),
    city nvarchar(50),
    country nvarchar(50),
    staff_status  bit,
    login_password varchar(30),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table staffs auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 17 tao bang giao ca;
create table shifts
(
    id bigint auto_increment,
    staff_id bigint,
    start_time datetime,
    end_time datetime,
    initial_amount double , -- so tien ban dau;
    total_revenue double, -- tong doanh thu;
    cash double,  -- tien mat;
    transfer_money double, -- tien chuyen khoan;
    total_available_money double,  -- tong tien hien tai;
    collected_owner double, -- tien chu thu
    money_arises double, -- tien phat sinh;
    note nvarchar(255),
    primary key (id)
);
alter table shifts auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 18 tao bang khach hang;
create table customers
(
    id bigint auto_increment,
    customer_name nvarchar(100),
    avatar varchar(100),
    phone_number char(12),
    email varchar(100),
    gender boolean,
    customer_status bit,
    birth_of_day date,
    login_password varchar(30),
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table customers auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;
-- 19 tao bang dia chi giao hang
create table address
(
    id bigint auto_increment,
    recipient_name nvarchar(50), -- ten nguoi nhan
    phone_number char(12),
    address_detail nvarchar(100),
    region nvarchar(50), -- khu vuc(phuong, xa);
    city nvarchar(50), -- tinh/thanh pho
    district varchar(50), -- quan/huyen
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table address auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

alter table soccer_clothes_management_system.address add column district varchar(50);
-- 20 tao bang dia chi khach hang;
create table customer_address
(
    id bigint auto_increment,
    customer_id bigint,
    address_id bigint,
    is_default bit,
    primary key (id)
);
alter table customer_address auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 21 tao bang giam gia;
create table vouchers
(
    id bigint auto_increment,
    category_voucher bit,
    voucher_name nvarchar(50),
    start_date date,
    end_date date,
    quantity int,
    order_minimum int, -- don hang toi thieu;
    max_reduce double, -- giam toi da
    discount_rate double,  -- ty le chiet khau;
    voucher_describe nvarchar(255),
    voucher_status bit,
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table vouchers auto_increment = 100000;  -- xet khoa chinh tu tang bat dau tu 100000;

-- 22 tao bang hoa don;
create table orders
(
    id bigint auto_increment,
    staff_id bigint,
    customer_id bigint ,
    delivery_address_id bigint,
    payment_id bigint,
    delivery_id bigint,
    status_id bigint,
    voucher_id bigint,
    order_date datetime, -- ngay tao hd;
    delivery_date datetime,  -- ngay giao;
    received_date datetime, -- ngay nhan;
    category_order nvarchar(50), -- loai hoa don(online, offline);
    order_total double, -- tong tien hoa don;
    note nvarchar(255),
    primary key (id)
);
alter table orders auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 23 tao bang gio hang;
create table carts
(
    id bigint auto_increment,
    customer_id bigint,
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table carts auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 24 tao bang chi tiet hoa don;
create table order_details
(
    id bigint auto_increment,
    product_detail_id bigint,
    order_id bigint,
    quantity int,
    price double,
    order_status bit,
    note nvarchar(200),
    primary key (id)
);
alter table order_details auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 25 tao bang chi tiet gio hang;
create table cart_details
(
    id bigint auto_increment,
    product_detail_id bigint,
    cart_id bigint,
    quantity int,
    create_date datetime,
    update_date datetime,
    primary key (id)
);
alter table cart_details auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- 26 tao bang nguoi dung danh gia;
create table user_reviews
(
    id bigint auto_increment,
    order_detail_id bigint,
    rating_value bit,  -- gia tri danh gia (1-5 sao)
    user_comment nvarchar(255),
    create_date datetime,
    primary key (id)
);
alter table user_reviews auto_increment = 1000;  -- xet khoa chinh tu tang bat dau tu 1000;

-- ket noi khoa phu cua cac bang;
-- images vs products
alter table images add foreign key (product_id) references products(id);

-- products vs categories
alter table products add foreign key (category_id) references categories(id);

-- products vs clubs
alter table products add foreign key (club_id) references clubs(id);

-- products vs brands
alter table products add foreign key (brand_id) references brands(id);

-- products vs suppliers
alter table products add foreign key (supplier_id) references suppliers(id);

-- product_details vs products
alter table product_details add foreign key (product_id) references products(id);

-- product_details vs colors
alter table product_details add foreign key (color_id) references colors(id);

-- product_details vs materials
alter table product_details add foreign key (material_id) references materials(id);

-- product_details vs sizes
alter table product_details add foreign key (size_id) references sizes(id);

-- order_details vs product_details
alter table order_details add foreign key (product_detail_id) references product_details(id);

-- order_details vs orders
alter table order_details add foreign key (order_id) references orders(id);

-- cart_details vs product_details
alter table cart_details add foreign key (product_detail_id) references product_details(id);

-- cart_details vs carts
alter table cart_details add foreign key (cart_id) references carts(id);

-- carts vs customers
alter table carts add foreign key (customer_id) references customers(id);

-- orders vs deliveries
alter table orders add foreign key (delivery_id) references deliveries(id);

-- orders vs payments
alter table orders add foreign key (payment_id) references payments(id);

-- orders vs address
alter table orders add foreign key (delivery_address_id) references address(id);

-- orders vs order_status
alter table orders add foreign key (status_id) references order_status(id);

-- orders vs customers
alter table orders add foreign key (customer_id) references customers(id);

-- orders vs staffs
alter table orders add foreign key (staff_id) references staffs(id);

-- orders vs vouchers
alter table orders add foreign key (voucher_id) references vouchers(id);

-- customer_address vs customers
alter table customer_address add foreign key (customer_id) references customers(id);

-- customer_address vs address
alter table customer_address add foreign key (address_id) references address(id);

-- staffs vs roles
alter table staffs add foreign key (role_id) references roles(id);

-- shifts vs staffs
alter table shifts add foreign key (staff_id) references staffs(id);

-- user_reviews vs order_details
alter table user_reviews add foreign key (order_detail_id) references order_details(id);
