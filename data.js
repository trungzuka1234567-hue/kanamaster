/**
 * Japanese Alphabet & Vocabulary Dataset (Hiragana, Katakana, Kanji & Romaji)
 * Full dataset including Hiragana, Katakana, N5 Kanji, and Romaji Pronunciation/Loan Words.
 * Includes mnemonics, tips, and example vocabulary for interactive learning.
 */

const JAPANESE_DATA = {
  hiragana: {
    title: "Hiragana (Chữ mềm)",
    groups: [
      {
        id: "h-a-row",
        name: "Hàng A (あ い う え お)",
        badge: "Cơ bản",
        items: [
          { char: "あ", romaji: "a", mnemonicIcon: "🍎", mnemonicText: "Giống quả Táo (Apple) có cuống lá và thân quả tròn xòe.", hint: "Apple ➔ Âm A", example: "あめ (Ame)", meaning: "Cơn mưa / Kẹo", type: "main" },
          { char: "い", romaji: "i", mnemonicIcon: "🌴", mnemonicText: "Hai cây dừa (Hawaii Palms) đứng song song cạnh nhau.", hint: "Hawaii ➔ Âm I", example: "いぬ (Inu)", meaning: "Con chó", type: "main" },
          { char: "う", romaji: "u", mnemonicIcon: "👴", mnemonicText: "Một ông lão đang cúi gập lưng đi bộ ➔ 'Ư... đau lưng quá'.", hint: "Tiếng rên 'Ư...' ➔ Âm U", example: "うみ (Umi)", meaning: "Biển cả", type: "main" },
          { char: "え", romaji: "e", mnemonicIcon: "🥷", mnemonicText: "Vũ công Ninja đang tập nhảy chéo chân lướt sóng.", hint: "Ninja 'Energetic' ➔ Âm E", example: "えき (Eki)", meaning: "Nhà ga", type: "main" },
          { char: "お", romaji: "o", mnemonicIcon: "⛳", mnemonicText: "Người đánh gậy Golf vung bóng bay vào lỗ hình tròn.", hint: "Đánh bóng 'Over par' ➔ Âm O", example: "おにぎり (Onigiri)", meaning: "Cơm nắm", type: "main" }
        ]
      },
      {
        id: "h-ka-row",
        name: "Hàng Ka (か き く け こ)",
        badge: "Cơ bản",
        items: [
          { char: "か", romaji: "ka", mnemonicIcon: "🪓", mnemonicText: "Lưỡi Rìu chém vào khúc gỗ văng ra một mảnh dăm.", hint: "Cắt (Ka-t) khúc gỗ ➔ Âm KA", example: "かさ (Kasa)", meaning: "Cây ô / Dù", type: "main" },
          { char: "き", romaji: "ki", mnemonicIcon: "🔑", mnemonicText: "Chiếc chìa khóa cổ (Key) với 2 nấc ngang.", hint: "Chìa khóa 'Key' ➔ Âm KI", example: "き (Ki)", meaning: "Cây cối", type: "main" },
          { char: "く", romaji: "ku", mnemonicIcon: "🐦", mnemonicText: "Mỏ chim Cuckoo đang mở to ca hát.", hint: "Chim Cuckoo kêu 'Cúc cu' ➔ Âm KU", example: "くるま (Kuruma)", meaning: "Xe ô tô", type: "main" },
          { char: "け", romaji: "ke", mnemonicIcon: "🛢️", mnemonicText: "Thùng rượu gỗ (Keg) có vòi chảy bên cạnh.", hint: "Thùng 'Keg' ➔ Âm KE", example: "けいさつ (Keisatsu)", meaning: "Cảnh sát", type: "main" },
          { char: "こ", romaji: "ko", mnemonicIcon: "🪵", mnemonicText: "Hai khúc gỗ nằm song song trên bãi cỏ.", hint: "Khúc gỗ 'Ko-g' ➔ Âm KO", example: "こども (Kodomo)", meaning: "Trẻ em", type: "main" }
        ]
      },
      {
        id: "h-sa-row",
        name: "Hàng Sa (さ し す せ そ)",
        badge: "Cơ bản",
        items: [
          { char: "さ", romaji: "sa", mnemonicIcon: "💃", mnemonicText: "Vũ công Salsa đang quay người nhún nhảy.", hint: "Điệu 'Salsa' ➔ Âm SA", example: "さかな (Sakana)", meaning: "Con cá", type: "main" },
          { char: "し", romaji: "shi", mnemonicIcon: "🎣", mnemonicText: "Cần câu cá cong vút nhấc chú cá lên.", hint: "Lưỡi câu 'Ship' ➔ Âm SHI", example: "しんかんせん (Shinkansen)", meaning: "Tàu siêu tốc", type: "main" },
          { char: "す", romaji: "su", mnemonicIcon: "🍜", mnemonicText: "Sợi mì Ramen xoắn tít đang kéo lên tô soup.", hint: "Mì Ramen 'Soup' ➔ Âm SU", example: "すし (Sushi)", meaning: "Món Sushi", type: "main" },
          { char: "せ", romaji: "se", mnemonicIcon: "🌅", mnemonicText: "Mặt trời lặn xuống biển tạo nên cảnh rực rỡ.", hint: "Hoàng hôn 'Sunset' ➔ Âm SE", example: "せんせい (Sensei)", meaning: "Thầy giáo", type: "main" },
          { char: "そ", romaji: "so", mnemonicIcon: "🪡", mnemonicText: "Đường kim mũi chỉ khâu dích dắc trên dải vải.", hint: "Đường khâu 'Sew' ➔ Âm SO", example: "そら (Sora)", meaning: "Bầu trời", type: "main" }
        ]
      },
      {
        id: "h-ta-row",
        name: "Hàng Ta (た ち つ て と)",
        badge: "Cơ bản",
        items: [
          { char: "た", romaji: "ta", mnemonicIcon: "🏷️", mnemonicText: "Mác giá tiền (Tag) gồm chữ T và a viết liền.", hint: "Mác 'Tag' ➔ Âm TA", example: "たまご (Tamago)", meaning: "Quả trứng", type: "main" },
          { char: "ち", romaji: "chi", mnemonicIcon: "🧀", mnemonicText: "Quả nhảy Cheerleader dơ cao số 5 cổ vũ.", hint: "Cổ vũ 'Cheer' ➔ Âm CHI", example: "ちず (Chizu)", meaning: "Bản đồ", type: "main" },
          { char: "つ", romaji: "tsu", mnemonicIcon: "🌊", mnemonicText: "Ngọn sóng thần Tsunami cuộn tròn dâng cao.", hint: "Sóng thần 'Tsunami' ➔ Âm TSU", example: "つくえ (Tsukue)", meaning: "Cái bàn", type: "main" },
          { char: "て", romaji: "te", mnemonicIcon: "🎾", mnemonicText: "Cánh tay cầm vợt Tennis đánh bóng.", hint: "Vợt bóng 'Tennis' ➔ Âm TE", example: "てがみ (Tegami)", meaning: "Bức thư", type: "main" },
          { char: "と", romaji: "to", mnemonicIcon: "🦶", mnemonicText: "Cái dằm đâm trúng ngón chân (Toe) gây đau.", hint: "Ngón chân 'Toe' ➔ Âm TO", example: "とけい (Tokei)", meaning: "Đồng hồ", type: "main" }
        ]
      },
      {
        id: "h-na-row",
        name: "Hàng Na (な に ぬ ね の)",
        badge: "Cơ bản",
        items: [
          { char: "な", romaji: "na", mnemonicIcon: "🧘", mnemonicText: "Vị Nữ tu (Nun) quỳ cầu nguyện trước thánh giá.", hint: "Nữ tu 'Nun' ➔ Âm NA", example: "なつ (Natsu)", meaning: "Mùa hè", type: "main" },
          { char: "に", romaji: "ni", mnemonicIcon: "🪡", mnemonicText: "Kim chỉ may thêu (Needle) với sợi chỉ ngang.", hint: "Kim khâu 'Needle' ➔ Âm NI", example: "にく (Niku)", meaning: "Thịt tươi", type: "main" },
          { char: "ぬ", romaji: "nu", mnemonicIcon: "🍜", mnemonicText: "Đôi đũa gắp tô Mì (Noodle) cuộn tròn.", hint: "Gắp mì 'Noodle' ➔ Âm NU", example: "いぬ (Inu)", meaning: "Con chó", type: "main" },
          { char: "ね", romaji: "ne", mnemonicIcon: "🐈", mnemonicText: "Chú Mèo (Neko) đang cuộn đuôi tròn nằm ngủ.", hint: "Mèo 'Neko' ➔ Âm NE", example: "ねこ (Neko)", meaning: "Con mèo", type: "main" },
          { char: "の", romaji: "no", mnemonicIcon: "🚫", mnemonicText: "Biển cấm tròn gạch chéo ➔ 'NO smoking'.", hint: "Biển cấm 'NO' ➔ Âm NO", example: "のみもの (Nomimono)", meaning: "Đồ uống", type: "main" }
        ]
      },
      {
        id: "h-ha-row",
        name: "Hàng Ha (は ひ ふ へ ほ)",
        badge: "Cơ bản",
        items: [
          { char: "は", romaji: "ha", mnemonicIcon: "🏠", mnemonicText: "Ngôi nhà (House) có cầu thang ở bên ngoài.", hint: "Ngôi nhà 'House' ➔ Âm HA", example: "はな (Hana)", meaning: "Bông hoa", type: "main" },
          { char: "ひ", romaji: "hi", mnemonicIcon: "😄", mnemonicText: "Khuôn mặt cười tủm tỉm 'Hi hi hi' cằm nhọn.", hint: "Cười 'Hi hi' ➔ Âm HI", example: "ひかり (Hikari)", meaning: "Ánh sáng", type: "main" },
          { char: "ふ", romaji: "fu", mnemonicIcon: "🗻", mnemonicText: "Ngọn núi Phú Sĩ (Mt. Fuji) mây mờ bao phủ.", hint: "Núi 'Fujisan' ➔ Âm FU", example: "ふじさん (Fujisan)", meaning: "Núi Phú Sĩ", type: "main" },
          { char: "へ", romaji: "he", mnemonicIcon: "⛰️", mnemonicText: "Đỉnh núi đồi (Hill) nhấp nhô lượn sóng.", hint: "Ngọn đồi 'Hill' ➔ Âm HE", example: "へや (Heya)", meaning: "Căn phòng", type: "main" },
          { char: "ほ", romaji: "ho", mnemonicIcon: "🏒", mnemonicText: "Cầu thủ Hockey cầm gậy tập luyện trên băng.", hint: "Môn 'Hockey' ➔ Âm HO", example: "ほし (Hoshi)", meaning: "Ngôi sao", type: "main" }
        ]
      },
      {
        id: "h-ma-row",
        name: "Hàng Ma (ま み む め も)",
        badge: "Cơ bản",
        items: [
          { char: "ま", romaji: "ma", mnemonicIcon: "⛵", mnemonicText: "Cột buồm con tàu (Mast) có hai tầng cánh buồm.", hint: "Cột buồm 'Mast' ➔ Âm MA", example: "まど (Mado)", meaning: "Cửa sổ", type: "main" },
          { char: "み", romaji: "mi", mnemonicIcon: "🎼", mnemonicText: "Nốt nhạc số 21 nghiêng mình cất tiếng 'Mi'.", hint: "Nốt 'Mi' ➔ Âm MI", example: "みず (Mizu)", meaning: "Nước uống", type: "main" },
          { char: "む", romaji: "mu", mnemonicIcon: "🐄", mnemonicText: "Chú bò sữa đang thè lưỡi kêu 'Muuu'.", hint: "Tiếng bò 'Moo' ➔ Âm MU", example: "むし (Mushi)", meaning: "Côn trùng", type: "main" },
          { char: "め", romaji: "me", mnemonicIcon: "👁️", mnemonicText: "Khuôn mắt con người với hàng mi cong vuốt.", hint: "Con mắt tiếng Nhật 'Me' ➔ Âm ME", example: "め (Me)", meaning: "Đôi mắt", type: "main" },
          { char: "も", romaji: "mo", mnemonicIcon: "🪝", mnemonicText: "Lưỡi câu cá bắt được Nhiều (More) cá tươi.", hint: "Bắt thêm 'More' ➔ Âm MO", example: "もも (Momo)", meaning: "Quả đào", type: "main" }
        ]
      },
      {
        id: "h-ya-row",
        name: "Hàng Ya (や ゆ よ)",
        badge: "Cơ bản",
        items: [
          { char: "や", romaji: "ya", mnemonicIcon: "🦬", mnemonicText: "Con bò Tây Tạng (Yak) với hai sừng cong vút.", hint: "Con bò 'Yak' ➔ Âm YA", example: "やま (Yama)", meaning: "Ngọn núi", type: "main" },
          { char: "ゆ", romaji: "yu", mnemonicIcon: "🐟", mnemonicText: "Con cá bơi lội uốn lượn dưới làn nước.", hint: "Bơi uốn hình U ➔ Âm YU", example: "ゆき (Yuki)", meaning: "Tuyết rơi", type: "main" },
          { char: "よ", romaji: "yo", mnemonicIcon: "🪀", mnemonicText: "Con Yo-yo có sợi dây quấn tròn nhảy nhót.", hint: "Trò chơi 'Yo-yo' ➔ Âm YO", example: "よる (Yoru)", meaning: "Ban đêm", type: "main" }
        ]
      },
      {
        id: "h-ra-row",
        name: "Hàng Ra (ら り る れ ろ)",
        badge: "Cơ bản",
        items: [
          { char: "ら", romaji: "ra", mnemonicIcon: "🦘", mnemonicText: "Con thỏ Rabbit/Kangaroo đang nhún nhảy.", hint: "Con thỏ 'Rabbit' ➔ Âm RA", example: "らいおん (Raion)", meaning: "Sư tử", type: "main" },
          { char: "り", romaji: "ri", mnemonicIcon: "🌾", mnemonicText: "Bông lúa Rice đung đưa nghiêng theo gió.", hint: "Bông lúa 'Rice' ➔ Âm RI", example: "りんご (Ringo)", meaning: "Quả táo", type: "main" },
          { char: "る", romaji: "ru", mnemonicIcon: "🛋️", mnemonicText: "Sợi dây thừng cuộn tròn ở đuôi thành nút thắt.", hint: "Thừng cuộn 'Ru-le' ➔ Âm RU", example: "くるま (Kuruma)", meaning: "Xe ô tô", type: "main" },
          { char: "れ", romaji: "re", mnemonicIcon: "🏃", mnemonicText: "Vận động viên đang chạy đua (Race) nước rút.", hint: "Chạy đua 'Race' ➔ Âm RE", example: "れきし (Rekishi)", meaning: "Lịch sử", type: "main" },
          { char: "ろ", romaji: "ro", mnemonicIcon: "🛣️", mnemonicText: "Con đường cong góc (Road) không có nút thắt.", hint: "Con đường 'Road' ➔ Âm RO", example: "ろうそく (Rousoku)", meaning: "Cây nến", type: "main" }
        ]
      },
      {
        id: "h-wa-n-row",
        name: "Hàng Wa & N (わ を ん)",
        badge: "Cơ bản",
        items: [
          { char: "わ", romaji: "wa", mnemonicIcon: "🦢", mnemonicText: "Chú chim Bạch Yến (White swan) ngẩng đầu.", hint: "Bạch yến 'White swan' ➔ Âm WA", example: "わたし (Watashi)", meaning: "Bản thân tôi", type: "main" },
          { char: "を", romaji: "wo", mnemonicIcon: "🏄", mnemonicText: "Vận động viên lướt sóng nhô lên giữa nước.", hint: "Trợ từ chỉ hành động ➔ Âm WO", example: "ほんをよむ (Hon wo yomu)", meaning: "Đọc sách", type: "main" },
          { char: "ん", romaji: "n", mnemonicIcon: "🎵", mnemonicText: "Chữ n mềm ngân nga tiếng hát 'Uhm...'.", hint: "Âm mũi 'N' ➔ Âm N", example: "ほん (Hon)", meaning: "Cuốn sách", type: "main" }
        ]
      },
      {
        id: "h-dakuten",
        name: "Âm đục (が ざ だ ば ぱ...)",
        badge: "Âm đục & Bán đục",
        items: [
          { char: "が", romaji: "ga", mnemonicIcon: "🎒", mnemonicText: "Chữ か + dấu Tenten ➔ Đọc đục thành GA", example: "がっこう (Gakkou)", meaning: "Trường học", type: "dakuten" },
          { char: "ぎ", romaji: "gi", mnemonicIcon: "🏦", mnemonicText: "Chữ き + dấu Tenten ➔ Đọc đục thành GI", example: "ぎんこう (Ginkou)", meaning: "Ngân hàng", type: "dakuten" },
          { char: "ぐ", romaji: "gu", mnemonicIcon: "🎸", mnemonicText: "Chữ く + dấu Tenten ➔ Đọc đục thành GU", example: "ぐあい (Guai)", meaning: "Tình trạng sức khỏe", type: "dakuten" },
          { char: "げ", romaji: "ge", mnemonicIcon: "📅", mnemonicText: "Chữ け + dấu Tenten ➔ Đọc đục thành GE", example: "げつようび (Getsuyoubi)", meaning: "Thứ hai", type: "dakuten" },
          { char: "ご", romaji: "go", mnemonicIcon: "🍚", mnemonicText: "Chữ こ + dấu Tenten ➔ Đọc đục thành GO", example: "ごはん (Gohan)", meaning: "Cơm / Bữa ăn", type: "dakuten" },
          { char: "ざ", romaji: "za", mnemonicIcon: "📰", mnemonicText: "Chữ さ + dấu Tenten ➔ Đọc đục thành ZA", example: "ざっし (Zasshi)", meaning: "Tạp chí", type: "dakuten" },
          { char: "じ", romaji: "ji", mnemonicIcon: "⏰", mnemonicText: "Chữ し + dấu Tenten ➔ Đọc đục thành JI", example: "じかん (Jikan)", meaning: "Thời gian", type: "dakuten" },
          { char: "ず", romaji: "zu", mnemonicIcon: "🗺️", mnemonicText: "Chữ す + dấu Tenten ➔ Đọc đục thành ZU", example: "ちず (Chizu)", meaning: "Bản đồ", type: "dakuten" },
          { char: "ぜ", romaji: "ze", mnemonicIcon: "💯", mnemonicText: "Chữ せ + dấu Tenten ➔ Đọc đục thành ZE", example: "ぜんぶ (Zenbu)", meaning: "Tất cả", type: "dakuten" },
          { char: "ぞ", romaji: "zo", mnemonicIcon: "🐘", mnemonicText: "Chữ そ + dấu Tenten ➔ Đọc đục thành ZO", example: "ぞう (Zou)", meaning: "Con voi", type: "dakuten" },
          { char: "だ", romaji: "da", mnemonicIcon: "🏫", mnemonicText: "Chữ た + dấu Tenten ➔ Đọc đục thành DA", example: "だいがく (Daigaku)", meaning: "Trường đại học", type: "dakuten" },
          { char: "ぢ", romaji: "ji", mnemonicIcon: "🩸", mnemonicText: "Chữ ち + dấu Tenten ➔ Đọc đục thành JI", example: "はなぢ (Hanaji)", meaning: "Chảy máu cam", type: "dakuten" },
          { char: "づ", romaji: "zu", mnemonicIcon: "🔄", mnemonicText: "Chữ つ + dấu Tenten ➔ Đọc đục thành ZU", example: "つづく (Tsuzuku)", meaning: "Tiếp tục", type: "dakuten" },
          { char: "で", romaji: "de", mnemonicIcon: "🚃", mnemonicText: "Chữ て + dấu Tenten ➔ Đọc đục thành DE", example: "でんしゃ (Densha)", meaning: "Tàu điện", type: "dakuten" },
          { char: "ど", romaji: "do", mnemonicIcon: "🤝", mnemonicText: "Chữ と + dấu Tenten ➔ Đọc đục thành DO", example: "ともだち (Tomodachi)", meaning: "Bạn bè", type: "dakuten" },
          { char: "ば", romaji: "ba", mnemonicIcon: "🚌", mnemonicText: "Chữ は + dấu Tenten ➔ Đọc đục thành BA", example: "ばす (Basu)", meaning: "Xe buýt", type: "dakuten" },
          { char: "び", romaji: "bi", mnemonicIcon: "🏥", mnemonicText: "Chữ ひ + dấu Tenten ➔ Đọc đục thành BI", example: "びょういん (Byouin)", meaning: "Bệnh viện", type: "dakuten" },
          { char: "ぶ", romaji: "bu", mnemonicIcon: "🥩", mnemonicText: "Chữ ふ + dấu Tenten ➔ Đọc đục thành BU", example: "ぶたにく (Butaniku)", meaning: "Thịt heo", type: "dakuten" },
          { char: "べ", romaji: "be", mnemonicIcon: "📚", mnemonicText: "Chữ へ + dấu Tenten ➔ Đọc đục thành BE", example: "べんきょう (Benkyou)", meaning: "Học tập", type: "dakuten" },
          { char: "ぼ", romaji: "bo", mnemonicIcon: "🧢", mnemonicText: "Chữ ほ + dấu Tenten ➔ Đọc đục thành BO", example: "ぼうし (Boushi)", meaning: "Mũ / Nón", type: "dakuten" },
          { char: "ぱ", romaji: "pa", mnemonicIcon: "🍞", mnemonicText: "Chữ は + dấu Maru ➔ Đọc thành PA", example: "ぱん (Pan)", meaning: "Bánh mì", type: "handakuten" },
          { char: "ぴ", romaji: "pi", mnemonicIcon: "🎹", mnemonicText: "Chữ ひ + dấu Maru ➔ Đọc thành PI", example: "ぴあの (Piano)", meaning: "Đàn piano", type: "handakuten" },
          { char: "ぷ", romaji: "pu", mnemonicIcon: "🏊", mnemonicText: "Chữ ふ + dấu Maru ➔ Đọc thành PU", example: "ぷーる (Puuru)", meaning: "Bể bơi", type: "handakuten" },
          { char: "ぺ", romaji: "pe", mnemonicIcon: "🖊️", mnemonicText: "Chữ へ + dấu Maru ➔ Đọc thành PE", example: "ぺん (Pen)", meaning: "Cây bút", type: "handakuten" },
          { char: "ぽ", romaji: "po", mnemonicIcon: "🎒", mnemonicText: "Chữ ほ + dấu Maru ➔ Đọc thành PO", example: "ぽけっと (Poketto)", meaning: "Túi quần áo", type: "handakuten" }
        ]
      }
    ]
  },
  katakana: {
    title: "Katakana (Chữ cứng)",
    groups: [
      {
        id: "k-a-row",
        name: "Hàng A (ア イ ウ エ オ)",
        badge: "Cơ bản",
        items: [
          { char: "ア", romaji: "a", mnemonicIcon: "🍦", mnemonicText: "Hình dáng góc nhọn chiếc Kem cây 'Aisu'.", hint: "Kem 'Aisu' ➔ Âm A", example: "アイス (Aisu)", meaning: "Kem lạnh", type: "main" },
          { char: "イ", romaji: "i", mnemonicIcon: "🧍", mnemonicText: "Hình tượng người đứng thẳng vươn vai.", hint: "Người 'Individual' ➔ Âm I", example: "インク (Inku)", meaning: "Mực in", type: "main" },
          { char: "ウ", romaji: "u", mnemonicIcon: "🧢", mnemonicText: "Góc mũ lưỡi trai nhô ra phía trước.", hint: "Mũ 'Ultra' ➔ Âm U", example: "ウェブ (Webu)", meaning: "Mạng Web", type: "main" },
          { char: "エ", romaji: "e", mnemonicIcon: "🏗️", mnemonicText: "Khung thép giàn giáo hình chữ I nằm ngang.", hint: "Kỹ sư 'Engineer' ➔ Âm E", example: "エアコン (Eakon)", meaning: "Máy điều hòa", type: "main" },
          { char: "オ", romaji: "o", mnemonicIcon: "🕺", mnemonicText: "Vũ công Opera nhảy gập chân dang tay rộng.", hint: "Ca sĩ 'Opera' ➔ Âm O", example: "オレンジ (Orenji)", meaning: "Quả cam", type: "main" }
        ]
      },
      {
        id: "k-ka-row",
        name: "Hàng Ka (カ キ ク ケ コ)",
        badge: "Cơ bản",
        items: [
          { char: "カ", romaji: "ka", mnemonicIcon: "📷", mnemonicText: "Chữ Ka Hiragana tối giản bỏ nét phẩy bên phải.", hint: "Máy ảnh 'Camera' ➔ Âm KA", example: "カメラ (Kamera)", meaning: "Máy ảnh", type: "main" },
          { char: "キ", romaji: "ki", mnemonicIcon: "🔑", mnemonicText: "Hai thanh ngang chìa khóa xe máy.", hint: "Chìa khóa 'Key' ➔ Âm KI", example: "キャンプ (Kyanpu)", meaning: "Cắm trại", type: "main" },
          { char: "ク", romaji: "ku", mnemonicIcon: "👨‍🍳", mnemonicText: "Chiếc nón đầu bếp nhọn nghiêng góc.", hint: "Đầu bếp 'Cook' ➔ Âm KU", example: "タクシー (Takushii)", meaning: "Xe Taxi", type: "main" },
          { char: "ケ", romaji: "ke", mnemonicIcon: "🍰", mnemonicText: "Lát bánh ngọt Cake cắt góc sắc nét.", hint: "Bánh 'Cake' ➔ Âm KE", example: "ケーキ (Keeki)", meaning: "Bánh ngọt", type: "main" },
          { char: "コ", romaji: "ko", mnemonicIcon: "☕", mnemonicText: "Chiếc quai góc hộp Cà phê Ko-hii vuông vức.", hint: "Hộp 'Coffee' ➔ Âm KO", example: "コーヒー (Koohii)", meaning: "Cà phê", type: "main" }
        ]
      },
      {
        id: "k-sa-row",
        name: "Hàng Sa (サ シ ス セ ソ)",
        badge: "Cơ bản",
        items: [
          { char: "サ", romaji: "sa", mnemonicIcon: "🌵", mnemonicText: "Ba gai rễ cây Xương rồng Cactus đâm lên.", hint: "Cây xương rồng 'Cactus' ➔ Âm SA", example: "サッカー (Sakkaa)", meaning: "Bóng đá", type: "main" },
          { char: "シ", romaji: "shi", mnemonicIcon: "👁️", mnemonicText: "Hai giọt nước mắt và đuôi mắt hướng từ dưới lên.", hint: "Mắt cười 'Shi' ➔ Âm SHI", example: "シャツ (Shatsu)", meaning: "Áo sơ mi", type: "main" },
          { char: "ス", romaji: "su", mnemonicIcon: "🏃", mnemonicText: "Mũi tên chỉ hướng chạy Super hero lướt gió.", hint: "Siêu nhân 'Super' ➔ Âm SU", example: "スポーツ (Supootsu)", meaning: "Thể thao", type: "main" },
          { char: "セ", romaji: "se", mnemonicIcon: "🛋️", mnemonicText: "Chiếc ghế Sofa có thành tựa lưng nghiêng.", hint: "Ghế 'Sofa' ➔ Âm SE", example: "セーター (Seetaa)", meaning: "Áo len", type: "main" },
          { char: "ソ", romaji: "so", mnemonicIcon: "🍜", mnemonicText: "Đôi đũa gắp sợi mì Soba xuôi xuống.", hint: "Mì 'Soba' ➔ Âm SO", example: "ソファ (Sofa)", meaning: "Ghế sofa", type: "main" }
        ]
      },
      {
        id: "k-ta-row",
        name: "Hàng Ta (タ チ ツ テ ト)",
        badge: "Cơ bản",
        items: [
          { char: "タ", romaji: "ta", mnemonicIcon: "🏷️", mnemonicText: "Mác nhãn hiệu Tag góc vuông rõ nét.", hint: "Nhãn 'Tag' ➔ Âm TA", example: "タウン (Taun)", meaning: "Thị trấn", type: "main" },
          { char: "チ", romaji: "chi", mnemonicIcon: "📣", mnemonicText: "Khuôn mặt cổ vũ Cheerleader tươi vui.", hint: "Cổ vũ 'Cheer' ➔ Âm CHI", example: "チーズ (Chiizu)", meaning: "Phô mai", type: "main" },
          { char: "ツ", romaji: "tsu", mnemonicIcon: "😄", mnemonicText: "Ba giọt nước nét vuốt từ trên xuống dưới.", hint: "Xem kỹ nét vuốt từ TRÊN xuống ➔ Âm TSU", example: "ツアー (Tsuaa)", meaning: "Tour du lịch", type: "main" },
          { char: "テ", romaji: "te", mnemonicIcon: "📡", mnemonicText: "Cột ăng ten viễn thông thu phát sóng.", hint: "Cột 'Television' ➔ Âm TE", example: "テレビ (Terebi)", meaning: "Tivi", type: "main" },
          { char: "ト", romaji: "to", mnemonicIcon: "🌴", mnemonicText: "Thân cây dừa nghiêng bóng mát Totem.", hint: "Cột 'Totem' ➔ Âm TO", example: "トマト (Tomato)", meaning: "Quả cà chua", type: "main" }
        ]
      },
      {
        id: "k-na-row",
        name: "Hàng Na (ナ ニ ヌ ネ ノ)",
        badge: "Cơ bản",
        items: [
          { char: "ナ", romaji: "na", mnemonicIcon: "🔪", mnemonicText: "Lưỡi dao mổ Na-ifu cắt chéo.", hint: "Con dao 'Naifu' ➔ Âm NA", example: "ナイフ (Naifu)", meaning: "Con dao", type: "main" },
          { char: "ニ", romaji: "ni", mnemonicIcon: "2️⃣", mnemonicText: "Số 2 trong tiếng Hán (二) là 2 vạch song song.", hint: "Số hai 'Ni' ➔ Âm NI", example: "ニュース (Nyuusu)", meaning: "Tin tức", type: "main" },
          { char: "ヌ", romaji: "nu", mnemonicIcon: "🍜", mnemonicText: "Đôi đũa đan chéo gắp mì Noodle.", hint: "Gắp mì 'Noodle' ➔ Âm NU", example: "ヌードル (Nuudoru)", meaning: "Mì ăn liền", type: "main" },
          { char: "ネ", romaji: "ne", mnemonicIcon: "👔", mnemonicText: "Cà vạt Nekutai đeo thắt cổ áo.", hint: "Cà vạt 'Nekutai' ➔ Âm NE", example: "ネクタイ (Nekutai)", meaning: "Cà vạt", type: "main" },
          { char: "ノ", romaji: "no", mnemonicIcon: "👃", mnemonicText: "Nét gạch chéo cánh mũi Nose.", hint: "Chiếc mũi 'Nose' ➔ Âm NO", example: "ノート (Nooto)", meaning: "Tập sổ tay", type: "main" }
        ]
      },
      {
        id: "k-ha-row",
        name: "Hàng Ha (ハ ヒ フ ヘ ホ)",
        badge: "Cơ bản",
        items: [
          { char: "ハ", romaji: "ha", mnemonicIcon: "🍔", mnemonicText: "Vỏ chiếc bánh Hamburger khép lại.", hint: "Bánh 'Hamburger' ➔ Âm HA", example: "ハンバーガー (Hanbaagaa)", meaning: "Bánh burger", type: "main" },
          { char: "ヒ", romaji: "hi", mnemonicIcon: "👠", mnemonicText: "Đôi giày cao gót Heel dạo phố.", hint: "Giày cao gót 'Heel' ➔ Âm HI", example: "ヒーロー (Hiiroo)", meaning: "Anh hùng", type: "main" },
          { char: "フ", romaji: "fu", mnemonicIcon: "🍴", mnemonicText: "Chiếc nĩa Fork ăn cơm tây.", hint: "Cái nĩa 'Fork' ➔ Âm FU", example: "フォーク (Fooku)", meaning: "Cái nĩa", type: "main" },
          { char: "ヘ", romaji: "he", mnemonicIcon: "⛰️", mnemonicText: "Nét chữ gập giống hệt Hiragana へ.", hint: "Đỉnh núi 'Hill' ➔ Âm HE", example: "ヘルメット (Herumetto)", meaning: "Mũ bảo hiểm", type: "main" },
          { char: "ホ", romaji: "ho", mnemonicIcon: "⛪", mnemonicText: "Mái nhà Holy thánh đường.", hint: "Thánh đường 'Holy' ➔ Âm HO", example: "ホテル (Hoteru)", meaning: "Khách sạn", type: "main" }
        ]
      },
      {
        id: "k-ma-row",
        name: "Hàng Ma (マ ミ ム メ モ)",
        badge: "Cơ bản",
        items: [
          { char: "マ", romaji: "ma", mnemonicIcon: "🎤", mnemonicText: "Chiếc tay cầm Micro hát hò.", hint: "Micro 'Maiku' ➔ Âm MA", example: "マイク (Maiku)", meaning: "Micro", type: "main" },
          { char: "ミ", romaji: "mi", mnemonicIcon: "🥛", mnemonicText: "Ba vạch sữa tươi Milk rây qua lưới.", hint: "Sữa 'Milk' ➔ Âm MI", example: "ミルク (Miruku)", meaning: "Sữa tươi", type: "main" },
          { char: "ム", romaji: "mu", mnemonicIcon: "💪", mnemonicText: "Bắp tay cơ bắp Muscle gập lại khỏe khoắn.", hint: "Cơ bắp 'Muscle' ➔ Âm MU", example: "ムービー (Muubii)", meaning: "Phim ảnh", type: "main" },
          { char: "メ", romaji: "me", mnemonicIcon: "✂️", mnemonicText: "Cây kéo cắt chéo sắc bén.", hint: "Cắt kim loại 'Metal' ➔ Âm ME", example: "メニュー (Menyuu)", meaning: "Thực đơn", type: "main" },
          { char: "モ", romaji: "mo", mnemonicIcon: "📱", mnemonicText: "Màn hình Monitor phẳng lỳ.", hint: "Màn hình 'Monitor' ➔ Âm MO", example: "モデル (Moderu)", meaning: "Người mẫu", type: "main" }
        ]
      },
      {
        id: "k-ya-row",
        name: "Hàng Ya (ヤ ユ ヨ)",
        badge: "Cơ bản",
        items: [
          { char: "ヤ", romaji: "ya", mnemonicIcon: "⛵", mnemonicText: "Cánh buồm du thuyền Yacht lướt sóng.", hint: "Thuyền 'Yacht' ➔ Âm YA", example: "ヤング (Yangu)", meaning: "Tuổi trẻ", type: "main" },
          { char: "ユ", romaji: "yu", mnemonicIcon: "🔤", mnemonicText: "Nút bấm chữ U trên bàn phím.", hint: "Khung chữ 'U' ➔ Âm YU", example: "ユニフォーム (Yunifoomu)", meaning: "Đồng phục", type: "main" },
          { char: "ヨ", romaji: "yo", mnemonicIcon: "🧘", mnemonicText: "Tư thế nằm Yoga vươn tay cong gập.", hint: "Điệu 'Yoga' ➔ Âm YO", example: "ヨーグルト (Yooguruto)", meaning: "Sữa chua", type: "main" }
        ]
      },
      {
        id: "k-ra-row",
        name: "Hàng Ra (ラ リ ル レ ロ)",
        badge: "Cơ bản",
        items: [
          { char: "ラ", romaji: "ra", mnemonicIcon: "📻", mnemonicText: "Cột ăng ten đài Radio bắt sóng.", hint: "Đài 'Radio' ➔ Âm RA", example: "ラジオ (Rajio)", meaning: "Máy thu thanh", type: "main" },
          { char: "リ", romaji: "ri", mnemonicIcon: "🏞️", mnemonicText: "Dòng sông River với hai bờ chảy song song.", hint: "Dòng sông 'River' ➔ Âm RI", example: "リーダー (Riidaa)", meaning: "Người dẫn đầu", type: "main" },
          { char: "ル", romaji: "ru", mnemonicIcon: "🔀", mnemonicText: "Hai con đường nhọn chia nhánh Route.", hint: "Lộ trình 'Route' ➔ Âm RU", example: "ルール (Ruuru)", meaning: "Quy tắc", type: "main" },
          { char: "レ", romaji: "re", mnemonicIcon: "🔴", mnemonicText: "Nét móc cong dưới đĩa Red disc.", hint: "Màu đỏ 'Red' ➔ Âm RE", example: "レストラン (Resutoran)", meaning: "Nhà hàng", type: "main" },
          { char: "ロ", romaji: "ro", mnemonicIcon: "🤖", mnemonicText: "Khuôn mặt robot Robot vuông vức.", hint: "Robot 'Robotto' ➔ Âm RO", example: "ロボット (Robotto)", meaning: "Người máy", type: "main" }
        ]
      },
      {
        id: "k-wa-n-row",
        name: "Hàng Wa & N (ワ ヲ ン)",
        badge: "Cơ bản",
        items: [
          { char: "ワ", romaji: "wa", mnemonicIcon: "🍷", mnemonicText: "Ly rượu vang Wine góc nghiêng.", hint: "Rượu 'Wine' ➔ Âm WA", example: "ワイン (Wain)", meaning: "Rượu vang", type: "main" },
          { char: "ヲ", romaji: "wo", mnemonicIcon: "📜", mnemonicText: "Chữ cổ tượng hình nét cong gạch ngang.", hint: "Âm WO (đọc giống O)", example: "ヲ (Wo)", meaning: "Trợ từ cổ", type: "main" },
          { char: "ン", romaji: "n", mnemonicIcon: "🪙", mnemonicText: "Nét phẩy và nét vuốt từ DƯỚI LÊN.", hint: "Đồng xu 'Coin' - Vuốt từ dưới lên ➔ Âm N", example: "コイン (Koin)", meaning: "Đồng tiền xu", type: "main" }
        ]
      }
    ]
  },
  kanji: {
    title: "Kanji N5 (Hán tự cơ bản)",
    groups: [
      {
        id: "kj-numbers-time",
        name: "Số đếm & Thời gian (日 月 火 水 木 金 土...)",
        badge: "Kanji N5",
        items: [
          { char: "日", romaji: "Nhật (Hi / Nichi)", mnemonicIcon: "☀️", mnemonicText: "Hình ô cửa sổ đón ánh sáng Mặt Trời rực rỡ chiếu vào.", hint: "Mặt trời / Ngày", example: "日本 (Nihon)", meaning: "Nước Nhật Bản", type: "kanji" },
          { char: "月", romaji: "Nguyệt (Tsuki / Getsu)", mnemonicIcon: "🌙", mnemonicText: "Hình dáng vầng Trăng khuyết ban đêm lấp lánh.", hint: "Mặt trăng / Tháng", example: "月曜日 (Getsuyoubi)", meaning: "Thứ Hai", type: "kanji" },
          { char: "火", romaji: "Hỏa (Hi / Ka)", mnemonicIcon: "🔥", mnemonicText: "Ngọn Lửa bùng cháy tỏa ra hai tia lửa bắn xung quanh.", hint: "Ngọn lửa / Thứ 3", example: "火花 (Hibana)", meaning: "Tia lửa điện", type: "kanji" },
          { char: "水", romaji: "Thủy (Mizu / Sui)", mnemonicIcon: "💧", mnemonicText: "Dòng Nước chảy qua khe núi tỏa ra các giọt bắn.", hint: "Dòng nước / Thứ 4", example: "水 (Mizu)", meaning: "Nước uống", type: "kanji" },
          { char: "木", romaji: "Mộc (Ki / Moku)", mnemonicIcon: "🌳", mnemonicText: "Cây xanh có tán lá rộng và rễ cắm sâu vào lòng đất.", hint: "Cây cối / Thứ 5", example: "木 (Ki)", meaning: "Cây cối", type: "kanji" },
          { char: "金", romaji: "Kim (Kane / Kin)", mnemonicIcon: "💰", mnemonicText: "Kho báu Kim loại chứa Vàng lấp lánh dưới mái nhà.", hint: "Vàng / Tiền / Thứ 6", example: "お金 (Okane)", meaning: "Tiền bạc", type: "kanji" },
          { char: "土", romaji: "Thổ (Tsuchi / Do)", mnemonicIcon: "🌱", mnemonicText: "Mầm cây xanh nhô lên từ ngọn đồi Đất đai.", hint: "Đất đai / Thứ 7", example: "土曜日 (Doyoubi)", meaning: "Thứ Bảy", type: "kanji" },
          { char: "一", romaji: "Nhất (Ichi / Hito)", mnemonicIcon: "1️⃣", mnemonicText: "Một gạch ngang biểu thị số Một (1).", hint: "Số 1", example: "一人 (Hitori)", meaning: "Một người", type: "kanji" },
          { char: "二", romaji: "Nhị (Ni / Futa)", mnemonicIcon: "2️⃣", mnemonicText: "Hai gạch ngang biểu thị số Hai (2).", hint: "Số 2", example: "二月 (Nigatsu)", meaning: "Tháng 2", type: "kanji" },
          { char: "三", romaji: "Tam (San / Mi)", mnemonicIcon: "3️⃣", mnemonicText: "Ba gạch ngang song song biểu thị số Ba (3).", hint: "Số 3", example: "三日 (Mikka)", meaning: "Ngày mồng 3", type: "kanji" }
        ]
      },
      {
        id: "kj-nature-people",
        name: "Con người & Tự nhiên (人 口 目 手 足 山 川 田...)",
        badge: "Kanji N5",
        items: [
          { char: "人", romaji: "Nhân (Hito / Jin)", mnemonicIcon: "🧍", mnemonicText: "Hình ảnh một Người đang bước đi hai chân vươn ra.", hint: "Con người", example: "日本人 (Nihonjin)", meaning: "Người Nhật Bản", type: "kanji" },
          { char: "口", romaji: "Khẩu (Kuchi / Kou)", mnemonicIcon: "👄", mnemonicText: "Hình chiếc Miệng mở rộng hình ô vuông.", hint: "Cái miệng", example: "入口 (Iriguchi)", meaning: "Lối vào", type: "kanji" },
          { char: "目", romaji: "Mục (Me / Moku)", mnemonicIcon: "👁️", mnemonicText: "Hình Con Mắt dựng đứng với đồng tử bên trong.", hint: "Con mắt", example: "目 (Me)", meaning: "Mắt quan sát", type: "kanji" },
          { char: "手", romaji: "Thủ (Te / Shu)", mnemonicIcon: "✋", mnemonicText: "Bàn Tay với các ngón tay xòe ra nắm lấy đồ vật.", hint: "Bàn tay", example: "Hand (Te)", meaning: "Bàn tay", type: "kanji" },
          { char: "足", romaji: "Túc (Ashi / Soku)", mnemonicIcon: "🦵", mnemonicText: "Bàn Chân đang đứng vững trên mặt đất.", hint: "Cái chân / Đủ", example: "足 (Ashi)", meaning: "Cái chân", type: "kanji" },
          { char: "山", romaji: "Sơn (Yama / San)", mnemonicIcon: "⛰️", mnemonicText: "Ba ngọn Núi nhấp nhô đứng cạnh nhau.", hint: "Ngọn núi", example: "富士山 (Fujisan)", meaning: "Núi Phú Sĩ", type: "kanji" },
          { char: "川", romaji: "Xuyên (Kawa / Sen)", mnemonicIcon: "🏞️", mnemonicText: "Dòng Sông nước chảy cuồn cuộn với 3 luồng sóng.", hint: "Dòng sông", example: "川 (Kawa)", meaning: "Con sông", type: "kanji" },
          { char: "田", romaji: "Điền (Ta / Den)", mnemonicIcon: "🌾", mnemonicText: "Mảnh Ruộng lúa chia làm 4 ô vuông canh tác.", hint: "Thửa ruộng", example: "田中 (Tanaka)", meaning: "Họ Tanaka", type: "kanji" }
        ]
      },
      {
        id: "kj-directions-verbs",
        name: "Phương hướng & Động từ (上 下 中 大 小 見 行 来 食...)",
        badge: "Kanji N5",
        items: [
          { char: "上", romaji: "Thượng (Ue / Jou)", mnemonicIcon: "⬆️", mnemonicText: "Mũi tên chỉ hướng bên Trên ranh giới ngang.", hint: "Phía trên", example: "上 (Ue)", meaning: "Bên trên", type: "kanji" },
          { char: "下", romaji: "Hạ (Shita / Ka)", mnemonicIcon: "⬇️", mnemonicText: "Mũi tên chỉ hướng bên Dưới ranh giới.", hint: "Phía dưới", example: "下 (Shita)", meaning: "Bên dưới", type: "kanji" },
          { char: "中", romaji: "Trung (Naka / Chuu)", mnemonicIcon: "🎯", mnemonicText: "Thước gạch đâm xuyên qua Chính Giữa ô tròn.", hint: "Bên trong / Ở giữa", example: "中国 (Chuugoku)", meaning: "Trung Quốc", type: "kanji" },
          { char: "大", romaji: "Đại (Oo / Dai)", mnemonicIcon: "🤸", mnemonicText: "Người dang rộng cả tay lẫn chân thể hiện To Lớn.", hint: "To lớn", example: "大学 (Daigaku)", meaning: "Trường Đại học", type: "kanji" },
          { char: "小", romaji: "Tiểu (Chiisa / Shou)", mnemonicIcon: "🐣", mnemonicText: "Mầm cây nhỏ bé tỏa hai hạt bên cạnh.", hint: "Nhỏ bé", example: "Chiisai", meaning: "Nhỏ bé", type: "kanji" },
          { char: "見", romaji: "Kiến (Mi / Ken)", mnemonicIcon: "👁️‍🗨️", mnemonicText: "Con Mắt to bự đặt trên hai chân đang Nhìn.", hint: "Nhìn / Quan sát", example: "見る (Miru)", meaning: "Nhìn / Xem", type: "kanji" },
          { char: "行", romaji: "Hành (I / Kou)", mnemonicIcon: "🚶", mnemonicText: "Dấu chân giao lộ người đang Bước Đi.", hint: "Đi / Hành động", example: "行く (Iku)", meaning: "Đi tới", type: "kanji" },
          { char: "食", romaji: "Thực (Tabe / Shoku)", mnemonicIcon: "🍱", mnemonicText: "Mái nhà che bát Cơm ngon đang Ăn.", hint: "Ăn đồ ăn", example: "食べる (Taberu)", meaning: "Ăn cơm", type: "kanji" }
        ]
      }
    ]
  },
  romaji: {
    title: "Romaji & Từ vựng Katakana",
    groups: [
      {
        id: "rm-long-sokuon",
        name: "Trường âm & Âm ngắt (Obaasan, Gakkou, Kitte...)",
        badge: "Phiên âm",
        items: [
          { char: "おばあさん", romaji: "Obaasan", mnemonicIcon: "👵", mnemonicText: "Trường âm aa kéo dài âm a (Bà nội/ngoại).", hint: "Obaasan - Bà", example: "おばあさん", meaning: "Bà nội / Bà ngoại", type: "romaji" },
          { char: "おじいさん", romaji: "Ojiisan", mnemonicIcon: "👴", mnemonicText: "Trường âm ii kéo dài âm i (Ông nội/ngoại).", hint: "Ojiisan - Ông", example: "おじいさん", meaning: "Ông nội / Ông ngoại", type: "romaji" },
          { char: "がっこう", romaji: "Gakkou", mnemonicIcon: "🏫", mnemonicText: "Âm ngắt (kk) bật hơi nhẹ trước âm Kou.", hint: "Gakkou - Trường học", example: "学校 (Gakkou)", meaning: "Trường học", type: "romaji" },
          { char: "きって", romaji: "Kitte", mnemonicIcon: "✉️", mnemonicText: "Âm ngắt (tt) làm ngắt nhịp giữa Ki và Te.", hint: "Kitte - Tem thư", example: "切手 (Kitte)", meaning: "Tem thư bưu điện", type: "romaji" },
          { char: "ざっし", romaji: "Zasshi", mnemonicIcon: "📰", mnemonicText: "Âm ngắt (ss) giữa Za và Shi.", hint: "Zasshi - Tạp chí", example: "雑誌 (Zasshi)", meaning: "Cuốn tạp chí", type: "romaji" }
        ]
      },
      {
        id: "rm-loanwords",
        name: "Katakana Ngoại nhập (Koohii, Terebi, Pasokon...)",
        badge: "Từ mượn",
        items: [
          { char: "コーヒー", romaji: "Koohii", mnemonicIcon: "☕", mnemonicText: "Từ mượn tiếng Anh 'Coffee' có trường âm oo & ii.", hint: "Coffee ➔ Koohii", example: "コーヒーを飲む", meaning: "Uống cà phê", type: "romaji" },
          { char: "テレビ", romaji: "Terebi", mnemonicIcon: "📺", mnemonicText: "Từ mượn tiếng Anh 'Television' viết ngắn gọn.", hint: "Television ➔ Terebi", example: "テレビを見る", meaning: "Xem Tivi", type: "romaji" },
          { char: "パソコン", romaji: "Pasokon", mnemonicIcon: "💻", mnemonicText: "Từ mượn 'Personal Computer' viết tắt Pa-so-kon.", hint: "Personal Computer ➔ Pasokon", example: "パソコンを使う", meaning: "Dùng máy tính", type: "romaji" },
          { char: "レストラン", romaji: "Resutoran", mnemonicIcon: "🍽️", mnemonicText: "Từ mượn tiếng Anh 'Restaurant'.", hint: "Restaurant ➔ Resutoran", example: "レストランで食べる", meaning: "Nhà hàng ăn uống", type: "romaji" },
          { char: "ホテル", romaji: "Hoteru", mnemonicIcon: "🏨", mnemonicText: "Từ mượn tiếng Anh 'Hotel'.", hint: "Hotel ➔ Hoteru", example: "ホテルに泊まる", meaning: "Khách sạn nghỉ ngơi", type: "romaji" }
        ]
      }
    ]
  }
};
