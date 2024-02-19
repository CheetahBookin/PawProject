INSERT INTO Accomodation (name, address, country, city, type, carParkFee)
VALUES 
('Grand Plaza Hotel', '123 Main St', 'USA', 'New York', 'Hotel', 10.50),
('Ocean Breeze Motel', '456 Elm St', 'USA', 'Los Angeles', 'Motel', NULL),
('Tropical Paradise Resort', '789 Oak St', 'USA', 'Miami', 'Resort', 15.75),
('The Royal Hotel', '101 Pine St', 'UK', 'London', 'Hotel', 8.25),
('Urban Backpackers Hostel', '202 Maple St', 'UK', 'Manchester', 'Hostel', 5.00),
('Cozy Corner Guesthouse', '303 Birch St', 'UK', 'Birmingham', 'Guesthouse', NULL),
('Eiffel Tower Hotel', '404 Cedar St', 'France', 'Paris', 'Hotel', 12.00),
('Seaside Sunset Motel', '505 Walnut St', 'France', 'Marseille', 'Motel', NULL),
('Riviera Resort', '606 Spruce St', 'France', 'Nice', 'Resort', 18.50),
('Bavarian Flat', '707 Cherry St', 'Germany', 'Berlin', 'Flat', 9.75),
('Alpine Adventure Hostel', '808 Pine St', 'Germany', 'Munich', 'Hostel', 6.50),
('Black Forest Guesthouse', '909 Elm St', 'Germany', 'Hamburg', 'Guesthouse', NULL),
('Sunny Madrid Hotel', '111 Oak St', 'Spain', 'Madrid', 'Hotel', 11.25),
('Barcelona Beach Motel', '222 Maple St', 'Spain', 'Barcelona', 'Motel', NULL),
('Costa del Sol Resort', '333 Birch St', 'Spain', 'Valencia', 'Resort', 16.00),
('Hotel NH Poznan', 'Swiety Marcin 67', 'Poland', 'Poznan', 'Hotel', 10.00),
('Hotel Morena', 'Konopnickiej 1A', 'Poland', 'Mosina', 'Hotel', 7.00),
('Venetian Dreams Guesthouse', '666 Spruce St', 'Italy', 'Venice', 'Guesthouse', NULL),
('Sydney Harbor Hotel', '777 Cherry St', 'Australia', 'Sydney', 'Hotel', 13.50),
('Melbourne Gateway Motel', '888 Pine St', 'Australia', 'Melbourne', 'Motel', NULL),
('Queensland Oasis Resort', '999 Elm St', 'Australia', 'Brisbane', 'Resort', 20.00),
('Maple Leaf Hostel', '121 Oak St', 'Canada', 'Toronto', 'Hostel', 12.75),
('Pacific Coast Hostel', '232 Maple St', 'Canada', 'Vancouver', 'Hostel', 8.00),
('Montreal Magic Guesthouse', '343 Birch St', 'Canada', 'Montreal', 'Guesthouse', NULL),
('Tokyo Tower Hotel', '454 Cedar St', 'Japan', 'Tokyo', 'Hotel', 14.25),
('Osaka Oasis Motel', '565 Walnut St', 'Japan', 'Osaka', 'Motel', NULL),
('Kyoto Gardens Resort', '676 Spruce St', 'Japan', 'Kyoto', 'Resort', 22.50),
('Seoul Serenity Flat', '787 Cherry St', 'South Korea', 'Seoul', 'Flat', 13.25),
('Busan Backpackers Hostel', '898 Pine St', 'South Korea', 'Busan', 'Hostel', 9.00),
('Incheon Island Guesthouse', '909 Elm St', 'South Korea', 'Incheon', 'Guesthouse', NULL),
('Forbidden City Hotel', '123 Oak St', 'China', 'Beijing', 'Hotel', 15.75),
('Shanghai Skyline Motel', '234 Maple St', 'China', 'Shanghai', 'Motel', NULL),
('Guangzhou Green Resort', '345 Birch St', 'China', 'Guangzhou', 'Resort', 25.00),
('Bollywood Hotel', '456 Cedar St', 'India', 'Mumbai', 'Hotel', 14.50),
('Delhi Daze Hostel', '567 Walnut St', 'India', 'New Delhi', 'Hostel', 10.00),
('Bangalore Bliss Guesthouse', '678 Spruce St', 'India', 'Bangalore', 'Guesthouse', NULL),
('Sao Paulo Splendor Hotel', '789 Cherry St', 'Brazil', 'Sao Paulo', 'Hotel', 17.25),
('Rio Retreat Motel', '890 Pine St', 'Brazil', 'Rio de Janeiro', 'Motel', NULL),
('Brasilia Bay Resort', '901 Elm St', 'Brazil', 'Brasilia', 'Resort', 27.50),
('Mexico City Lights Hotel', '112 Oak St', 'Mexico', 'Mexico City', 'Hotel', 15.00),
('Cancun Cove Hostel', '223 Maple St', 'Mexico', 'Cancun', 'Hostel', 11.50),
('Guadalajara Gem Guesthouse', '334 Birch St', 'Mexico', 'Guadalajara', 'Guesthouse', NULL),
('Moscow Manor Hotel', '445 Cedar St', 'Russia', 'Moscow', 'Hotel', 18.75),
('Saint Petersburg Stopover Motel', '556 Walnut St', 'Russia', 'Saint Petersburg', 'Motel', NULL),
('Sochi Sunset Resort', '667 Spruce St', 'Russia', 'Sochi', 'Resort', 30.00),
('Luxury Grand Hotel', '123 Broadway St', 'USA', 'Chicago', 'Hotel', 20.00),
('Seaside Resort Hotel', '456 Ocean Ave', 'USA', 'San Francisco', 'Hotel', 15.00),
('Mountain View Hotel', '789 Summit Rd', 'USA', 'Denver', 'Hotel', 10.00),
('Historic Downtown Hotel', '101 Main St', 'USA', 'Boston', 'Hotel', 18.00),
('Skyline View Hotel', '202 High St', 'USA', 'Seattle', 'Hotel', 12.00);

INSERT INTO AccomodationImages (hotelId, image)
VALUES 
(1, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/227628314.jpg?k=97943a69cdb871b4a0063770f6dc9119c953dbddc663830f94f09e786d4bb54f&o=&hp=1'),
(1, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/52735814.jpg?k=8f97d0bde5b798604079982c90aae8278047eebce3a9a88e2019cda9f4396680&o=&hp=1'),
(1, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/151948526.jpg?k=0c77f8752ed65cb75ed7107d12c9f7e4173d5bd85a83687e408b56fa7d2714ae&o=&hp=1'),

(2, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/522803448.jpg?k=6c15cddfcd6ecc30094d238f754f6f19bdc20a6da18a4f9d049bbb2eb2195e15&o=&hp=1'),
(2, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/340435196.jpg?k=54af1720504492fbaece85519830d12015b99075fc293528846c14449e36e05a&o=&hp=1'),
(2, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/202488542.jpg?k=73a6794b61a60636e47ccd3661842ee38a90b957d0a4a2186f115abef384ae06&o=&hp=1'),

(3, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/491539039.jpg?k=c0ccfa4d2adab6fab0222a7caf9e61040a6d043baf39cf6cc2d6949e0bf9e994&o=&hp=1'),
(3, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/445673998.jpg?k=d6d011cd4266ce2eeee0c0056b7e9ccb57fb77a051e6198bb51c360d8a5f228a&o=&hp=1'),
(3, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/485476283.jpg?k=44e090ad207bc736ff4a92161ea9454b35b391cc6ec4ea3a2482053eb8dfd407&o=&hp=1'),

(4, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/329065860.jpg?k=3f1ece75b2b3e5f3199ef79e4786dc55ab2a9cc2e3ee444f9d5b9806551dc464&o=&hp=1'),
(4, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/493258222.jpg?k=703902bf4974881cdce01a138383ac517679b2faab3695c7b50ca21c12a88683&o=&hp=1'),
(4, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/493258218.jpg?k=5f51a8e56a2c8db3f689d358b4388a7eb00578c3d19cdc702619f0cff3488375&o=&hp=1'),

(5, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/308269357.jpg?k=754bcf37a945730edb7c476cfb78f4bcd54b5ee12594453df944a3f36c4339dd&o=&hp=1'),
(5, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/234993196.jpg?k=df85ea350af25af6dda3baa5e2a212177f9f102158878721e5e5a1a0c843b7fb&o=&hp=1'),
(5, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/228769339.jpg?k=681ab89b1ce7ab3a58e5949ea7a392ab2e08d40a89b7a849f601a9413a05646b&o=&hp=1'),

(6, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/523728136.jpg?k=40d22b090c4f413104a1af292e6a1cc64205112d218008d35889e87b8f92c628&o=&hp=1'),
(6, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/499967175.jpg?k=617bf90042ae25681cba09f853dc70e615b7bec6d64e68f377f1d06c54b95f8f&o=&hp=1'),
(6, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/499967630.jpg?k=20e19c94eea1942239291452ba385c15657d2702569f3af9ad532782b6eb0f48&o=&hp=1'),

(7, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/37956412.jpg?k=69ba12d680b59b42a0a88136e21173a3f31b406d19422b5f88882b8d5ced414c&o=&hp=1'),
(7, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/45409896.jpg?k=dd2e593c54af3b3ad718a6c666dfe8416df2247df332b0280d2c81735f341b44&o=&hp=1'),
(7, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/176888383.jpg?k=eae8ce068149bf87c76509ee1ad5eb13a37e8580a52ec6f7834cedfe86ba132c&o=&hp=1'),

(8, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/185166142.jpg?k=28077872b648932143ceb2ce0525ab2c6292393f06332dc7c277e43d3a232d67&o=&hp=1'),
(8, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/478225034.jpg?k=a4ab8383ce1e53d6b875e18f3ef4a0cf679809615b9aa0f29432da8d322f96e6&o=&hp=1'),
(8, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/478225071.jpg?k=c93552409c61a5154cb380bb4dace73eb0aec5b90976ff9e495e640c9a89bca7&o=&hp=1'),

(9, 'https://lh3.googleusercontent.com/p/AF1QipOsMY6iHWlfbj3DgtKMCg4ZlYYPADbtV0JWlfkb=w287-h192-n-k-no-v1-rj'),
(9, 'https://lh3.googleusercontent.com/p/AF1QipOhkoJs1T0LOMlHgrDbnIDagG4gslRIV_CtWCWP=w287-h192-n-k-no-v1-rj'),
(9, 'https://lh3.googleusercontent.com/p/AF1QipOxQnMBYCXc4GxXn4tdfV38EFZr1Vt974rojgm9=w287-h192-n-k-no-v1-rj'),

(10, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/221432329.jpg?k=abb347df68159b17648dbfc3824780a884bb9fe4fd4c3b6a4ea613c91469cf1b&o=&hp=1'),
(10, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/221428893.jpg?k=8bd76f4dcfa4c78cfe986beb6aae9da28a76ae9bfa550068ff5994e6a1a8d1b5&o=&hp=1'),
(10, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/221429358.jpg?k=d61595b2234d2d1620e337b469fe367f5917acfa337aa13446c12651093d69ee&o=&hp=1'),

(11, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/5825354.jpg?k=8ce8812bc1af48008b8c28b7048abe255f67905d62b0b1fd3c2f0c66bf4fd3ae&o=&hp=1'),
(11, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/86863346.jpg?k=c4638de9e0eb9155f29a41db74415e00d9ebbdac9d2b8e4551e3913a1139897f&o=&hp=1'),
(11, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/89326304.jpg?k=d1cabe74029b6ed39be356b6529b8fa24603be638520bc60d1e03f616050adc6&o=&hp=1'),

(12, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/177079853.jpg?k=0e4f6f23f165346a9a3c74c402495e7748c3ff8b138e1316092ae4be638725f2&o=&hp=1'),
(12, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/218311341.jpg?k=884e925ebf5ac0fc316ac719da2a8d3dafd569587faf5975f548e4467c56dcb1&o=&hp=1'),
(12, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/238556785.jpg?k=4396ef4f239a9a79304e02cdb3251eb7d900a8aad93a45f611a57d8921eb37e1&o=&hp=1'),

(13, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145834019.jpg?k=5970ad3b0fc74573bc3bd36fcb450fef3f6d8d14938c1997dad3c46c8352571d&o=&hp=1'),
(13, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/198523612.jpg?k=3b3eda416e0a7f7a26c697838bafa1633fb0aa1daa49c32c3cd80eabada2de95&o=&hp=1'),
(13, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/198523574.jpg?k=57907a891e82840b91c760bf666bf6cf4ff814d81840175cb970eb023d0d9a50&o=&hp=1'),

(14, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/309320834.jpg?k=ba0b996dec3d7b6a0712527865deb392224f3bf4e416a017a5697c4c73b9e8a4&o=&hp=1'),
(14, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/436245170.jpg?k=933a72f54d04eddb6f6a4a7544abe45e27a48d2ba3c8de78eabe1d729d739adf&o=&hp=1'),
(14, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/17041981.jpg?k=5dc23bd04cc9c0d2be99aba08f1a996ea34fbed1c0db93d8e97b4af5be5ca8da&o=&hp=1'),

(15, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/216694650.jpg?k=4be9e9133e2b3c3da2addfbbe7f0626ce020b8249d2266c6eaa672e351b2b531&o=&hp=1'),
(15, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/216697221.jpg?k=d6dd4a1ea76933c0720514a3ac780af507878c904cbbed6c6c601d1c54644afb&o=&hp=1'),
(15, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/216694662.jpg?k=f85d7a9be2ef6873bb2df97aedda42d9830fb80a819f3ff32ead9668cac6a7d2&o=&hp=1'),

(16, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/318821098.jpg?k=599d88e68b3dbd563908f59e71e5eac643e8b9786f3d894c310551fdcec9b69f&o=&hp=1'),
(16, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/328137124.jpg?k=301ec735325c8156b3f17a8218ac9d51a1e5465ed5afa767f3cff8a767d36561&o=&hp=1'),
(16, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/328137058.jpg?k=e87855fc1ee687f5747def2a2f43b0086986dab5cd97b945760f4dd0ced0142d&o=&hp=1'),

(17, 'https://i.szalas.hu/hotels/1023417/original/23291675.jpg'),
(17, 'https://meteor-turystyka.pl/images/base/2/1435/266349_40.jpg'),
(17, 'https://meteor-turystyka.pl/images/base/2/1435/266547_40.jpg'),

(18, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416306236.jpg?k=21a67f4e7bb65e4e5da7eb54ad349f73f653b5832fd76dfe372c73890fc9b01e&o=&hp=1'),
(18, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/495005573.jpg?k=1ef6b00edf70d0e5b6532f7da566ab6487ec054e00c4ff0d89ae6246c53bb8e8&o=&hp=1'),
(18, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408847256.jpg?k=caf06e92ba60168d5bfd809e99a87472f8cebea8cee53e4647d8e85b20cfc873&o=&hp=1'),

(19, 'https://s7d1.scene7.com/is/image/marriotts7prod/mc-sydmc-opera-view-suite-16268:Classic-Hor?wid=1336&fit=constrain'),
(19, 'https://cache.marriott.com/content/dam/marriott-renditions/SYDMC/sydmc-room-0079-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*'),
(19, 'https://cache.marriott.com/content/dam/marriott-renditions/SYDMC/sydmc-twin-twin-1281-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*'),

(20, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/491647186.jpg?k=eb0e4bb14896c4f62697635f290e51faaf146ea51c4d5d2b040bcdda9f1b5988&o=&hp=1'),
(20, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/383990374.jpg?k=21dfac041b79add5cb7b9fad8d9b4c9302a07e494b25eaec0a1ddb4ba74eaf99&o=&hp=1'),
(20, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/383990023.jpg?k=5996c33aa9f7eca7266fdd996056e3ea1803a2adbb634712d3fbbb9e84952e37&o=&hp=1'),

(21, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/db/83/64/oaks-oasis.jpg?w=1200&h=-1&s=1'),
(21, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/04/4b/7b/interior-view-of-banquet.jpg?w=1100&h=-1&s=1'),
(21, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/66/b1/b8/img-20180320-215757-largejpg.jpg?w=1200&h=-1&s=1'),

(22, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/53/8d/e2/maple-leaf-inn.jpg?w=1200&h=-1&s=1'),
(22, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/a3/5b/a2/maple-leaf-inn.jpg?w=1100&h=-1&s=1'),
(22, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/3f/ff/ce/lovely-lawn-area-next.jpg?w=1100&h=-1&s=1'),

(23, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/12839334.jpg?k=349aa610d384b883157118c633c505456262d3005cb5f0c5214e610fcfd534c0&o=&hp=1'),
(23, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/289930398.jpg?k=caf2dd86e939cd1dee4fb7d2d140f1d878952a2d099d6d5bdf0d230fd4551f6d&o=&hp=1'),
(23, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/256979630.jpg?k=a1a9c00393b7ba993b03bbe7cd522d599f63eb46203c17fe6074f8dee2c561ae&o=&hp=1'),

(24, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/518364893.jpg?k=32d66de38b0c7b6f2356e167c2a3cf790f3a2d712403e857f2179d04e25ee4c7&o=&hp=1'),
(24, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/518364900.jpg?k=4beb3d945e6c031914eb3c2aa7b28d622a6abe321f514f0bf33400a9ab66c198&o=&hp=1'),
(24, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/518364921.jpg?k=7fc0dade2c0eeaeb13046010abbd26e3fbc0338decd19c83bad640b290dd14b1&o=&hp=1'),

(25, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/2e/ce/bb/caption.jpg?w=1200&h=-1&s=1'),
(25, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/12/cd/90/caption.jpg?w=1200&h=-1&s=1'),
(25, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/1d/61/21/caption.jpg?w=1200&h=-1&s=1'),

(26, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/f3/a0/c6/double-room--v13204083.jpg?w=1200&h=-1&s=1'),
(26, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/6c/b4/36/caption.jpg?w=1000&h=-1&s=1'),
(26, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/59/93/12/caption.jpg?w=1200&h=-1&s=1'),

(27, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/eb/d2/bb/view-of-the-pool.jpg?w=1200&h=-1&s=1'),
(27, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/19/1c/a0/caption.jpg?w=1200&h=-1&s=1'),
(27, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/3f/be/1c/img-0649-largejpg.jpg?w=1200&h=-1&s=1'),

(28, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/166777182.jpg?k=5eed955a3740576e035f50d0cff371c8a1cf41678729ede8838471ff39bb90f3&o=&hp=1'),
(28, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/47272731.jpg?k=5486ceccdd7a43e0566cf6d20ef325cbb79944d58840e9ef5183b79004df8bd0&o=&hp=1'),
(28, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/5479665.jpg?k=e02931d27f43d3c6ffbba56eaceaaebccb5950ece2b105ca26358bd5596fc7b9&o=&hp=1'),

(29, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/00/70/1d/caption.jpg?w=1200&h=-1&s=1'),
(29, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-s/03/2a/a5/b9/blue-backpackers-hostel.jpg?w=400&h=-1&s=1'),
(29, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-s/02/2d/b5/4a/einzelzimmer-bett.jpg?w=600&h=-1&s=1'),

(30, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/06/6d/6b/room.jpg?w=700&h=-1&s=1'),
(30, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/f3/84/81/the-prime-kitchen.jpg?w=1100&h=-1&s=1'),
(30, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/0f/75/5c/prime-guesthouse.jpg?w=1200&h=-1&s=1'),

(31, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/67566191.jpg?k=4a5ae3960fb48631cd2f456a912d70e96cce0724f533f2ad66d8ab41dfe627ea&o=&hp=1'),
(31, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/67566224.jpg?k=60e21894ab9d2a484af4ef5d0781cf1262359dd79a2901408c72b5531bff2cab&o=&hp=1'),
(31, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/68705010.jpg?k=2535aa2ac164a8be8d6ef73000eaa780d3d8b95d4bcabccc67ef323f2b3e3e12&o=&hp=1'),

(32, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/32/9c/cb/diplomatic-suite.jpg?w=1100&h=-1&s=1'),
(32, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/78/37/e2/caption.jpg?w=1200&h=-1&s=1'),
(32, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/9e/5b/04/caption.jpg?w=1200&h=-1&s=1'),

(33, 'https://dynamic-media-cdn.tripadvisor.com/media/daodao/photo-s/02/0d/d0/31/caption.jpg?w=600&h=-1&s=1'),
(33, 'https://dynamic-media-cdn.tripadvisor.com/media/daodao/photo-s/01/e6/2f/ad/caption.jpg?w=600&h=-1&s=1'),
(33, 'https://dynamic-media-cdn.tripadvisor.com/media/daodao/photo-s/01/94/a6/44/vila.jpg?w=600&h=-1&s=1'),

(34, 'https://cf.bstatic.com/xdata/images/landmark/max1024/160906.webp?k=86c4a5faa3aad0fa396fc11f4f1e72849d7cde67cb1430722777d908f367c8cd&o='),
(34, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/437112347.jpg?k=20559eb477a4d163ebe6ca93f41498e5234a2fc526d70a1593c0b82e856d3dcc&o=&hp=1'),
(34, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/437112218.jpg?k=765a42bda2cd96d0876001f705d268af85f09a19230632a58c3c4e5960d27949&o=&hp=1'),

(35, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/64261413.jpg?k=b4ca0539879059f1913101553189a9e4ec7c5817842494c58d780dd4ea03b8f9&o=&hp=1'),
(35, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/236230562.jpg?k=c7167e50076a3afe1e6534b10980a7812d9d91c522a60113125459c1130fcb87&o=&hp=1'),
(35, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/201999086.jpg?k=550cef1e6ae97f9eb25d7d08a913852acdcb26657933fa56c2ee7f9ac8a5b42c&o=&hp=1'),

(36, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/16997318.jpg?k=ffbb30fbb1127296bcf0ffe68a4d30c51452d20b2d11c80a08cb881094e0ae32&o=&hp=1'),
(36, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/16996656.jpg?k=9366c315027ddbe8efe619bff90726a45156f45c4b4695d14ceb163c1975851a&o=&hp=1'),
(36, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/132877430.jpg?k=11e8f7c1cf626c25e5c5fafcbb6f9aa0d492a0ff6b83d30857224ed7514ff36e&o=&hp=1'),

(37, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/226854097.jpg?k=1b6570d7801e12c568ac18b9ed004d871bdfc5ee2f630a40f59a52747ff4ee5c&o=&hp=1'),
(37, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/226851105.jpg?k=5efc5e80fc1aaffcf09c12a63e92e9b55688dc98bed8e99e2c65956a580ff946&o=&hp=1'),
(37, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/226854150.jpg?k=b62f5d24a8fd3fe67614e79bd9d274820df48cc33d837ffa70df91cce9747a57&o=&hp=1'),

(38, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/329643357.jpg?k=63661bcf8e0f9f59909dd84f5002bfbd68e275c320be8e3fe14fd6847c9f06e5&o=&hp=1'),
(38, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/523351591.jpg?k=0eb3d8e6de1776cd68b49f8f0e9864f069bf1df6d3fc4f45bd361282fccd56da&o=&hp=1'),
(38, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/523351136.jpg?k=90ee6648c8539df9fa12a860367504735c1bea86485a185910d7ec8fffa52dc6&o=&hp=1'),

(39, 'https://cf.bstatic.com/xdata/images/landmark/max1024/203858.webp?k=add3707d8be187d2a9bf34e3dec050a1d5d7c99c08997c8aec72f8af554367b1&o='),
(39, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/516520273.jpg?k=e63d47e0cbeee0499114ef4f2a2e47e4e0b1b5ce9a3fe7d579c54e3e6186fac8&o=&hp=1'),
(39, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/506765504.jpg?k=7c2b869b03dd838b78f0f1f24a5918ab304050d66bce07d0c4edb32ce9bdffec&o=&hp=1'),

(40, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/82221425.jpg?k=29406dff3d54f7700fc0f2ff43e9298669a166bd1d25ae3bb74d7d498a6c127d&o=&hp=1'),
(40, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/27716215.jpg?k=69aff6f7a3e4332c077fbc085e46e1a17f92b58849dfce16a102c17e63ce63be&o=&hp=1'),
(40, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/82221219.jpg?k=d48d5c007b4134ed08c38fb622527e5fae27fb26158e6aefdf2d610b759133c5&o=&hp=1'),

(41, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/53955177.jpg?k=6a6947b60eb72b2315c8fd166e1f4e609f8cf414c91783590b80c91bdf35beaa&o=&hp=1'),
(41, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/53917863.jpg?k=fd1db9d497e57c1a33025178abb7b4f6017c1b91e9b2ae5a50dbbe0f5fa6312b&o=&hp=1'),
(41, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/178982348.jpg?k=4eb97dddfbfd6c638cba04096e7e30b5657374785c7fdaac69d59c622d685f1d&o=&hp=1'),

(42, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/310017160.jpg?k=b920bc54cc0f63b7c252af4aacb459207a96c89161ba6fbe4b2dac3f00d1672b&o=&hp=1'),
(42, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/490889630.jpg?k=ede437bae51f2306684201fc6b2e34b278b049584d3ed551e1d456acc22d6539&o=&hp=1'),
(42, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/310017108.jpg?k=358504dcf8598b14667c048d9dc730b08b198b382b1d16ebea16f7858e37c972&o=&hp=1'),

(43, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/526832855.jpg?k=da7f0fe2f25e62d9bd5cceed41358839ac81e338532d1bcfd7a39243915554fd&o=&hp=1'),
(43, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/526825229.jpg?k=990128dda1a0bd5fa0ff8468f324d46717824c668e02839931df83552bf71e93&o=&hp=1'),
(43, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/526812881.jpg?k=3c2f747683693025859b5a754042b95374543b221f84ac40d768a5800519a939&o=&hp=1'),

(44, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/379226705.jpg?k=72965c676abe139b9f3393522259c1b76ff160d583a6311ec6bf9d262b273101&o=&hp=1'),
(44, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/379230132.jpg?k=3a050986b586bd6506166040640dd37323c813030c4abdccd59d6d85037ec049&o=&hp=1'),
(44, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/379492616.jpg?k=9443081bb25932c637936c89c492575a6820a28bd40dc87b875849ab28ab422b&o=&hp=1'),

(45, 'https://sochiparkhotel.ru/upload/iblock/d5e/44100z13fvg66gfd7ki9ye2uma61ghjy.jpg'),
(45, 'https://sochiparkhotel.ru/upload/iblock/0cc/p08o416jmdvucrq1u25y5dxhtyeqi3js.jpg'),
(45, 'https://sochiparkhotel.ru/upload/iblock/537/b5k061zn8o8qkwpfuslukfm4qd0fb1vp.jpg'),

(46, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/368729241.jpg?k=456cfe19a81c98741fef9f12df1e301e1bf0a814fcc0d2eff2e72e8652f8c40d&o=&hp=1'),
(46, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/368729125.jpg?k=e94d30a5ea94442d5b83f9358f94fa6079d49830f8604fa36ac73cdfc5b0ac51&o=&hp=1'),
(46, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/368729150.jpg?k=476a4654c243924cbfbdda43ad2d9ff73ac661380adcb261588979ee4d2a4f9c&o=&hp=1'),

(47, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/270481956.jpg?k=2fd6974cd8a37ab66fdf37f3ab00903c6ea4db01353d4f6263a58773c974b49d&o=&hp=1'),
(47, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/53558912.jpg?k=1ac162f3b31a17dd8b1f28f7d2c354dda15109bac171a598698d9c079d104b8e&o=&hp=1'),
(47, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/79380082.jpg?k=4748f373077311fcd02a847810acb61406d023495716cb1c588a9b8a1c13f5d2&o=&hp=1'),

(48, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/321667241.jpg?k=fbff5c78870760553dbffc20ce71f84b60cb99a577162314c44ee55c90ece93d&o=&hp=1'),
(48, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/321667132.jpg?k=b07f5eaba3e1dd86d3927ef4ca19add95d069fc3d0bcf45cfc37d545a49948f7&o=&hp=1'),
(48, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/279208579.jpg?k=1dcd1dd9557535a8c7d5dd5052f5a3ed5fbfd9560ecdcefaedd19f3fa7a23545&o=&hp=1'),

(49, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451146159.jpg?k=872a81d078b4b8a58e5c771863313d950b67963d907d46b46e8a5c9b5295038a&o=&hp=1'),
(49, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451146366.jpg?k=b34dbcfa8fd0cfc87b6d085c9b7a4558bb573acacb493a32beb018ab691584cb&o=&hp=1'),
(49, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451146358.jpg?k=543f03d83f39ebc579855ed32bb4743049d9be6bfcfc9558f42598bbd61b6f56&o=&hp=1'),

(50, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/102746718.jpg?k=e208d0a3f94aa748f36623774909fec208f7087ff23a7658a5238ea6f1f252b5&o=&hp=1'),
(50, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/102746723.jpg?k=3a9a393a3e7daff5281adce916494e3aa646edd907885276f612a8c3bc871b6b&o=&hp=1'),
(50, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/102746685.jpg?k=904b11650c1b25da13967ad983f6560a9ab25e5aef7f319b31e4f96846be08c6&o=&hp=1');

INSERT INTO Rooms (hotelId, roomNumber, peopleCapacity, priceForPerson, childrenPrice, discount)
VALUES 
(1, 'Deluxe Suite', 3, 150.00, 75.00, 0.3),
(1, 'Ocean View Room', 2, 120.00, 60.00, NULL),
(1, 'Executive Loft', 4, 180.00, 90.00, NULL),
(1, 'Royal Penthouse', 5, 250.00, 125.00, NULL),
(1, 'Family Suite', 6, 200.00, 100.00, NULL),

(2, 'Beachfront Bungalow', 2, 200.00, 100.00, NULL),
(2, 'Poolside Villa', 4, 300.00, 150.00, 0.1),
(2, 'Garden View Room', 2, 150.00, 75.00, 0.25),
(2, 'Sunset Suite', 3, 250.00, 125.00, NULL),
(2, 'Coastal Cabin', 2, 100.00, 50.00, NULL),

(3, 'Alpine Retreat', 2, 180.00, 90.00, NULL),
(3, 'Scenic Suite', 3, 220.00, 110.00, NULL),
(3, 'Lodge Room', 4, 200.00, 100.00, NULL),
(3, 'Mountain Chalet', 2, 160.00, 80.00, NULL),
(3, 'Valley View Loft', 3, 250.00, 125.00, NULL),

(4, 'Antique Chamber', 2, 140.00, 70.00, NULL),
(4, 'Historic Suite', 3, 180.00, 90.00, 0.3),
(4, 'Victorian Room', 2, 120.00, 60.00, NULL),
(4, 'Colonial Loft', 4, 200.00, 100.00, NULL),
(4, 'Heritage Suite', 2, 160.00, 80.00, NULL),

(5, 'Skyline View Room', 2, 130.00, 65.00, NULL),
(5, 'Metropolis Suite', 3, 200.00, 100.00, NULL),
(5, 'Urban Loft', 4, 180.00, 90.00, NULL),
(5, 'Downtown Den', 2, 110.00, 55.00, NULL),
(5, 'Cityscape Chamber', 2, 120.00, 60.00, NULL),

(6, 'Elegant Suite', 3, 170.00, 85.00, NULL),
(6, 'Classic Room', 2, 110.00, 55.00, NULL),

(7, 'Regal Suite', 3, 190.00, 95.00, NULL),
(7, 'Executive Room', 2, 120.00, 60.00, NULL),
(7, 'Opulent Loft', 4, 240.00, 120.00, NULL),
(7, 'Majestic Chamber', 2, 160.00, 80.00, 0.25),
(7, 'Royal Penthouse', 5, 300.00, 150.00, NULL),

(8, 'Premium Suite', 3, 180.00, 90.00, NULL),
(8, 'Superior Room', 2, 130.00, 65.00, NULL),
(8, 'Deluxe Loft', 4, 230.00, 115.00, NULL),
(8, 'Imperial Chamber', 2, 140.00, 70.00, NULL),
(8, 'Sovereign Penthouse', 5, 290.00, 145.00, NULL),

(9, 'Exclusive Suite', 3, 200.00, 100.00, NULL),
(9, 'Premier Room', 2, 140.00, 70.00, NULL),
(9, 'Elite Loft', 4, 250.00, 125.00, NULL),
(9, 'Noble Chamber', 2, 170.00, 85.00, NULL),
(9, 'Imperial Penthouse', 5, 310.00, 155.00, NULL),

(10, 'Glamour Suite', 3, 210.00, 105.00, NULL),
(10, 'Chic Room', 2, 150.00, 75.00, NULL),
(10, 'Elite Loft', 4, 260.00, 130.00, NULL),
(10, 'Prestigious Chamber', 2, 180.00, 90.00, 0.1),
(10, 'Sumptuous Penthouse', 5, 320.00, 160.00, NULL),

(11, 'Exquisite Suite', 3, 220.00, 110.00, NULL),
(11, 'Stylish Room', 2, 160.00, 80.00, NULL),
(11, 'Prestige Loft', 4, 270.00, 135.00, NULL),
(11, 'Elegant Chamber', 2, 190.00, 95.00, NULL),
(11, 'Elite Penthouse', 5, 330.00, 165.00, NULL),

(12, 'Royal Suite', 3, 230.00, 115.00, 0.2),
(12, 'Elegant Room', 2, 170.00, 85.00, NULL),

(13, 'Luxury Suite', 3, 240.00, 120.00, NULL),
(13, 'Grand Room', 2, 180.00, 90.00, NULL),
(13, 'Elite Loft', 4, 290.00, 145.00, NULL),
(13, 'Royal Chamber', 2, 210.00, 105.00, NULL),
(13, 'Supreme Penthouse', 5, 350.00, 175.00, NULL),

(14, 'Premium Suite', 3, 250.00, 125.00, NULL),
(14, 'Superior Room', 2, 190.00, 95.00, 0.1),
(14, 'Deluxe Loft', 4, 300.00, 150.00, NULL),
(14, 'Imperial Chamber', 2, 220.00, 110.00, NULL),
(14, 'Sovereign Penthouse', 5, 360.00, 180.00, NULL),

(15, 'Exclusive Suite', 3, 260.00, 130.00, NULL),
(15, 'Premier Room', 2, 200.00, 100.00, NULL),
(15, 'Elite Loft', 4, 310.00, 155.00, NULL),
(15, 'Noble Chamber', 2, 230.00, 115.00, NULL),
(15, 'Imperial Penthouse', 5, 370.00, 185.00, NULL),

(16, 'Glamour Suite', 3, 270.00, 135.00, NULL),
(16, 'Chic Room', 2, 210.00, 105.00, NULL),
(16, 'Elite Loft', 4, 320.00, 160.00, NULL),
(16, 'Prestigious Chamber', 2, 240.00, 120.00, NULL),
(16, 'Sumptuous Penthouse', 5, 380.00, 190.00, NULL),

(17, 'Exquisite Suite', 3, 280.00, 140.00, 0.25),
(17, 'Stylish Room', 2, 220.00, 110.00, NULL),
(17, 'Prestige Loft', 4, 330.00, 165.00, NULL),
(17, 'Elegant Chamber', 2, 250.00, 125.00, NULL),
(17, 'Elite Penthouse', 5, 390.00, 195.00, NULL),

(18, 'Royal Suite', 3, 290.00, 145.00, NULL),
(18, 'Elegant Room', 2, 230.00, 115.00, NULL),

(19, 'Luxury Suite', 3, 300.00, 150.00, NULL),
(19, 'Grand Room', 2, 240.00, 120.00, NULL),
(19, 'Elite Loft', 4, 350.00, 175.00, NULL),
(19, 'Royal Chamber', 2, 260.00, 130.00, NULL),
(19, 'Supreme Penthouse', 5, 410.00, 205.00, 0.2),

(20, 'Premium Suite', 3, 310.00, 155.00, NULL),
(20, 'Superior Room', 2, 250.00, 125.00, NULL),
(20, 'Deluxe Loft', 4, 360.00, 180.00, NULL),
(20, 'Imperial Chamber', 2, 280.00, 140.00, NULL),
(20, 'Sovereign Penthouse', 5, 420.00, 210.00, NULL),

(21, 'Exclusive Suite', 3, 320.00, 160.00, NULL),
(21, 'Premier Room', 2, 260.00, 130.00, NULL),
(21, 'Elite Loft', 4, 370.00, 185.00, NULL),
(21, 'Noble Chamber', 2, 290.00, 145.00, NULL),
(21, 'Imperial Penthouse', 5, 430.00, 215.00, 0.05),

(22, 'Glamour Suite', 3, 330.00, 165.00, NULL),
(22, 'Chic Room', 2, 270.00, 135.00, NULL),
(22, 'Elite Loft', 4, 380.00, 190.00, NULL),
(22, 'Prestigious Chamber', 2, 300.00, 150.00, NULL),
(22, 'Sumptuous Penthouse', 5, 440.00, 220.00, NULL),

(23, 'Exquisite Suite', 3, 340.00, 170.00, NULL),
(23, 'Stylish Room', 2, 280.00, 140.00, NULL),
(23, 'Prestige Loft', 4, 390.00, 195.00, NULL),
(23, 'Elegant Chamber', 2, 310.00, 155.00, NULL),
(23, 'Elite Penthouse', 5, 450.00, 225.00, NULL),

(24, 'Royal Suite', 3, 350.00, 175.00, 0.2),
(24, 'Elegant Room', 2, 290.00, 145.00, NULL),

(25, 'Luxury Suite', 3, 360.00, 180.00, NULL),
(25, 'Grand Room', 2, 300.00, 150.00, NULL),
(25, 'Elite Loft', 4, 410.00, 205.00, NULL),
(25, 'Royal Chamber', 2, 330.00, 165.00, NULL),
(25, 'Supreme Penthouse', 5, 470.00, 235.00, NULL),

(26, 'Premium Suite', 3, 370.00, 185.00, NULL),
(26, 'Superior Room', 2, 310.00, 155.00, 0.1),
(26, 'Deluxe Loft', 4, 420.00, 210.00, NULL),
(26, 'Imperial Chamber', 2, 340.00, 170.00, NULL),
(26, 'Sovereign Penthouse', 5, 480.00, 240.00, NULL),

(27, 'Exclusive Suite', 3, 380.00, 190.00, NULL),
(27, 'Premier Room', 2, 320.00, 160.00, NULL),
(27, 'Elite Loft', 4, 430.00, 215.00, NULL),
(27, 'Noble Chamber', 2, 350.00, 175.00, NULL),
(27, 'Imperial Penthouse', 5, 490.00, 245.00, NULL),

(28, 'Glamour Suite', 3, 390.00, 195.00, NULL),
(28, 'Chic Room', 2, 330.00, 165.00, NULL),
(28, 'Elite Loft', 4, 440.00, 220.00, NULL),
(28, 'Prestigious Chamber', 2, 360.00, 180.00, 0.2),
(28, 'Sumptuous Penthouse', 5, 500.00, 250.00, NULL),

(29, 'Exquisite Suite', 3, 400.00, 200.00, NULL),
(29, 'Stylish Room', 2, 340.00, 170.00, NULL),
(29, 'Prestige Loft', 4, 450.00, 225.00, NULL),
(29, 'Elegant Chamber', 2, 370.00, 185.00, 0.1),
(29, 'Elite Penthouse', 5, 510.00, 255.00, NULL),

(30, 'Royal Suite', 3, 410.00, 205.00, NULL),
(30, 'Elegant Room', 2, 350.00, 175.00, 0.1),

(31, 'Luxury Suite', 3, 420.00, 210.00, NULL),
(31, 'Grand Room', 2, 360.00, 180.00, 0.2),
(31, 'Elite Loft', 4, 470.00, 235.00, NULL),
(31, 'Royal Chamber', 2, 390.00, 195.00, NULL),
(31, 'Supreme Penthouse', 5, 530.00, 265.00, NULL),

(32, 'Premium Suite', 3, 430.00, 215.00, NULL),
(32, 'Superior Room', 2, 370.00, 185.00, 0.05),
(32, 'Deluxe Loft', 4, 480.00, 240.00, 0.15),
(32, 'Imperial Chamber', 2, 400.00, 200.00, NULL),
(32, 'Sovereign Penthouse', 5, 540.00, 270.00, NULL),

(33, 'Exclusive Suite', 3, 440.00, 220.00, NULL),
(33, 'Premier Room', 2, 380.00, 190.00, 0.1),
(33, 'Elite Loft', 4, 490.00, 245.00, NULL),
(33, 'Noble Chamber', 2, 410.00, 205.00, NULL),
(33, 'Imperial Penthouse', 5, 550.00, 275.00, NULL),

(34, 'Glamour Suite', 3, 450.00, 225.00, NULL),
(34, 'Chic Room', 2, 390.00, 195.00, NULL),
(34, 'Elite Loft', 4, 500.00, 250.00, NULL),
(34, 'Prestigious Chamber', 2, 420.00, 210.00, 0.1),
(34, 'Sumptuous Penthouse', 5, 560.00, 280.00, NULL),

(35, 'Exquisite Suite', 3, 460.00, 230.00, NULL),
(35, 'Stylish Room', 2, 400.00, 200.00, NULL),
(35, 'Prestige Loft', 4, 510.00, 255.00, NULL),
(35, 'Elegant Chamber', 2, 430.00, 215.00, NULL),
(35, 'Elite Penthouse', 5, 570.00, 285.00, NULL),

(36, 'Royal Suite', 3, 470.00, 235.00, NULL),
(36, 'Elegant Room', 2, 410.00, 205.00, NULL),

(37, 'Luxury Suite', 3, 480.00, 240.00, NULL),
(37, 'Grand Room', 2, 420.00, 210.00, NULL),
(37, 'Elite Loft', 4, 530.00, 265.00, NULL),
(37, 'Royal Chamber', 2, 450.00, 225.00, NULL),
(37, 'Supreme Penthouse', 5, 590.00, 295.00, NULL),

(38, 'Premium Suite', 3, 490.00, 245.00, 0.2),
(38, 'Superior Room', 2, 430.00, 215.00, NULL),
(38, 'Deluxe Loft', 4, 540.00, 270.00, NULL),
(38, 'Imperial Chamber', 2, 460.00, 230.00, NULL),
(38, 'Sovereign Penthouse', 5, 600.00, 300.00, NULL),

(39, 'Exclusive Suite', 3, 500.00, 250.00, NULL),
(39, 'Premier Room', 2, 440.00, 220.00, 0.2),
(39, 'Elite Loft', 4, 550.00, 275.00, NULL),
(39, 'Noble Chamber', 2, 470.00, 235.00, NULL),
(39, 'Imperial Penthouse', 5, 610.00, 305.00, NULL),

(40, 'Glamour Suite', 3, 510.00, 255.00, NULL),
(40, 'Chic Room', 2, 450.00, 225.00, NULL),
(40, 'Elite Loft', 4, 560.00, 280.00, NULL),
(40, 'Prestigious Chamber', 2, 480.00, 240.00, NULL),
(40, 'Sumptuous Penthouse', 5, 620.00, 310.00, NULL),

(41, 'Exquisite Suite', 3, 520.00, 260.00, NULL),
(41, 'Stylish Room', 2, 460.00, 230.00, NULL),
(41, 'Prestige Loft', 4, 570.00, 285.00, NULL),
(41, 'Elegant Chamber', 2, 490.00, 245.00, NULL),
(41, 'Elite Penthouse', 5, 630.00, 315.00, NULL),

(42, 'Royal Suite', 3, 530.00, 265.00, NULL),
(42, 'Elegant Room', 2, 470.00, 235.00, NULL),

(43, 'Luxury Suite', 3, 540.00, 270.00, NULL),
(43, 'Grand Room', 2, 480.00, 240.00, NULL),
(43, 'Elite Loft', 4, 590.00, 295.00, NULL),
(43, 'Royal Chamber', 2, 510.00, 255.00, NULL),
(43, 'Supreme Penthouse', 5, 650.00, 325.00, NULL),

(44, 'Premium Suite', 3, 550.00, 275.00, NULL),
(44, 'Superior Room', 2, 490.00, 245.00, NULL),
(44, 'Deluxe Loft', 4, 600.00, 300.00, NULL),
(44, 'Imperial Chamber', 2, 520.00, 260.00, NULL),
(44, 'Sovereign Penthouse', 5, 660.00, 330.00, NULL),

(45, 'Exclusive Suite', 3, 560.00, 280.00, NULL),
(45, 'Premier Room', 2, 500.00, 250.00, NULL),
(45, 'Elite Loft', 4, 610.00, 305.00, NULL),
(45, 'Noble Chamber', 2, 530.00, 265.00, NULL),
(45, 'Imperial Penthouse', 5, 670.00, 335.00, NULL),

(46, 'Glamour Suite', 3, 570.00, 285.00, NULL),
(46, 'Chic Room', 2, 510.00, 255.00, NULL),
(46, 'Elite Loft', 4, 620.00, 310.00, NULL),
(46, 'Prestigious Chamber', 2, 540.00, 270.00, NULL),
(46, 'Sumptuous Penthouse', 5, 680.00, 340.00, NULL),

(47, 'Exquisite Suite', 3, 580.00, 290.00, NULL),
(47, 'Stylish Room', 2, 520.00, 260.00, NULL),
(47, 'Prestige Loft', 4, 630.00, 315.00, NULL),
(47, 'Elegant Chamber', 2, 550.00, 275.00, NULL),
(47, 'Elite Penthouse', 5, 690.00, 345.00, NULL),

(48, 'Royal Suite', 3, 590.00, 295.00, NULL),
(48, 'Elegant Room', 2, 530.00, 265.00, NULL),
(48, 'Imperial Loft', 4, 640.00, 320.00, NULL),
(48, 'Majestic Chamber', 2, 560.00, 280.00, NULL),
(48, 'Royal Penthouse', 5, 700.00, 350.00, NULL),

(49, 'Luxury Suite', 3, 600.00, 300.00, NULL),
(49, 'Grand Room', 2, 540.00, 270.00, NULL),
(49, 'Elite Loft', 4, 650.00, 325.00, NULL),
(49, 'Royal Chamber', 2, 570.00, 285.00, NULL),
(49, 'Supreme Penthouse', 5, 710.00, 355.00, NULL),

(50, 'Premium Suite', 3, 610.00, 305.00, NULL),
(50, 'Superior Room', 2, 550.00, 275.00, NULL),
(50, 'Deluxe Loft', 4, 660.00, 330.00, NULL),
(50, 'Imperial Chamber', 2, 580.00, 290.00, NULL),
(50, 'Sovereign Penthouse', 5, 720.00, 360.00, NULL);