/**
 * Editorial featured articles for the chefs we spotlight. Indexed by chef id
 * (matches src/data/chef-hall.ts). Each article runs around 250 to 350 words
 * in both English and Arabic so the home page hero card has room to breathe.
 *
 * Only the chefs the editorial side wants to put forward get an article here.
 * Everyone else in chef-hall.ts still has bio and philosophy fields; this is
 * the layer that promotes the most important voices to the front page.
 */

export interface ChefArticle {
  /** Short hook shown under the chef name on the front page card. */
  hookEn: string;
  hookAr: string;
  /** Full article body, plain text, paragraphs separated by double newlines. */
  bodyEn: string;
  bodyAr: string;
  /** Optional editorial date label, e.g. "Featured June 2026". */
  dateEn: string;
  dateAr: string;
}

export const CHEF_ARTICLES: Record<string, ChefArticle> = {
  ottolenghi: {
    hookEn: 'How a Jerusalem-born chef rewrote the vocabulary of the modern vegetable.',
    hookAr: 'كيف أعاد شيف وُلد في القدس صياغة قاموس الخضار في المطبخ الحديث.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "Yotam Ottolenghi did not invent eggplant. He just refused to apologise for it. " +
      "When his first cookbook landed in London in 2008 the British shelves were still " +
      "full of beef Wellington recipes and braised lamb shoulders, and here was a man " +
      "from Jerusalem dressing roasted aubergine in tahini and burnt butter and saying, " +
      "with a perfectly straight face, this is dinner.\n\n" +
      "His restaurants started small. A delicatessen in Notting Hill, then another in " +
      "Islington. The food was loud, the produce was the star, and the queues started " +
      "forming around the block. Critics looking for a category had to invent one: " +
      "Levantine, sometimes, or pan Mediterranean, or just \"Ottolenghi food,\" which is " +
      "what it ended up being called everywhere.\n\n" +
      "What sets him apart is not a single recipe. It is a method. He teaches home " +
      "cooks to layer flavours the way a perfumer layers notes. Sumac for sharpness. " +
      "Rose harissa for warmth. Preserved lemon for the long finish. He treats the " +
      "spice rack the way a Burgundy producer treats a cellar.\n\n" +
      "And he writes. Eleven cookbooks, columns in The Guardian, television. Every page " +
      "carries the same quiet message: the Arab kitchen is one of the great kitchens of " +
      "the world, and it has been here all along. You just had to look.",
    bodyAr:
      "يوتام أوتولينغي لم يخترع الباذنجان. هو فقط رفض أن يعتذر عنه. " +
      "حين نزل كتابه الأول في لندن عام 2008، كانت أرفف الكتب البريطانية ما تزال " +
      "مليئة بوصفات لحم البقر ولينغتون وأكتاف الخروف المطهوّة، وإذا برجل قادم من " +
      "القدس يُلبس الباذنجان المشوي طحينةً وزبدة محروقة، ويقول بوجه جادّ تماماً: هذا هو العشاء.\n\n" +
      "مطاعمه بدأت صغيرة. ديليكاتيسن في نوتينغ هيل، ثم آخر في إيزلينغتون. " +
      "الطعام صاخب، المنتج هو البطل، والطوابير بدأت تلتف حول المربّع. " +
      "النقّاد الباحثون عن تصنيف اضطرّوا لاختراع واحد: شامي، أحياناً، أو متوسّطي عابر، " +
      "أو فقط \"طعام أوتولينغي\"، وهذا ما انتهى إليه الاسم في كل مكان.\n\n" +
      "ما يميّزه ليس وصفة واحدة. هو منهج. يعلّم طبّاخي البيت أن يطبّقوا النكهات " +
      "كما يطبّق صانع العطور النوتات. سمّاق للحدّة. هريسة بالورد للدفء. " +
      "ليمون مخلّل للنهاية الطويلة. يعامل رفّ البهارات كما يعامل منتج بورغندي قبوه.\n\n" +
      "وهو يكتب. أحد عشر كتاب طبخ، أعمدة في الغارديان، تلفزيون. كل صفحة تحمل " +
      "نفس الرسالة الهادئة: المطبخ العربي واحد من المطابخ الكبرى في العالم، " +
      "وكان موجوداً طوال الوقت. كان عليك فقط أن تنظر.",
  },

  'sami-tamimi': {
    hookEn: 'The Palestinian cook who carried Jerusalem to a London kitchen and back home again.',
    hookAr: 'الطبّاخ الفلسطيني الذي حمل القدس إلى مطبخ لندنيّ، ثم أعادها إلى الوطن.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "Sami Tamimi grew up on the Arab side of Jerusalem, in a household where the day " +
      "was organised around what was simmering on the stove. He learned the food the " +
      "way a chorister learns hymns, by repetition and ear, until the recipes became " +
      "part of his nervous system.\n\n" +
      "He left for London in his twenties and met Yotam Ottolenghi in a kitchen there. " +
      "The friendship that followed became one of the most consequential partnerships " +
      "in modern cooking. Together they wrote Jerusalem in 2012, a book that won the " +
      "James Beard award and put Palestinian food on the table of every serious cook " +
      "in the English speaking world.\n\n" +
      "Tamimi's own book, Falastin, came in 2020. It is one part cookbook, one part " +
      "love letter to the villages he grew up around. The recipes are not nostalgia " +
      "set pieces. They are alive, modern, generous. Maftoul with chicken and chickpeas. " +
      "Knafeh with goat cheese. A musakhan that smells of olive oil and sumac and the " +
      "kind of hospitality that does not need words.\n\n" +
      "What he gives the world is something specific. He says, gently and clearly, " +
      "that Palestinian food is a tradition with depth, history, and a future. He does " +
      "not raise his voice. He cooks, he writes, and the food does the work.",
    bodyAr:
      "سامي التميمي ترعرع في الجانب العربي من القدس، في بيت كانت ينظّمه " +
      "ما يغلي على الموقد. تعلّم الطعام كما يتعلّم منشد الترانيم، بالتكرار " +
      "والسماع، حتى صارت الوصفات جزءاً من جهازه العصبي.\n\n" +
      "غادر إلى لندن في عشرينيّاته والتقى يوتام أوتولينغي في مطبخ هناك. " +
      "الصداقة التي تلت كانت من أهمّ الشراكات في الطبخ الحديث. " +
      "كتبا معاً كتاب \"القدس\" عام 2012، وفاز الكتاب بجائزة جيمس بيرد، " +
      "ووضع الطعام الفلسطيني على طاولة كل طبّاخ جادّ في العالم الناطق بالإنجليزية.\n\n" +
      "كتاب التميمي الخاص، \"فلسطين\"، صدر عام 2020. هو جزء كتاب طبخ، " +
      "وجزء رسالة حبّ إلى القرى التي كبر حولها. الوصفات ليست لوحات حنين. " +
      "هي حيّة، حديثة، كريمة. مفتول بالدجاج والحمّص. كنافة بجبن الماعز. " +
      "مسخّن يفوح بزيت الزيتون والسمّاق ونوع الكرم الذي لا يحتاج كلمات.\n\n" +
      "ما يقدّمه للعالم محدّد. يقول بهدوء ووضوح إن الطعام الفلسطيني " +
      "تقليد له عمق وتاريخ ومستقبل. لا يرفع صوته. يطبخ ويكتب، " +
      "والطعام يقوم بالعمل.",
  },

  'massimo-bottura': {
    hookEn: 'The Modenese chef who taught the world that leftovers can be art.',
    hookAr: 'الشيف المودينيّ الذي علّم العالم أن البقايا يمكن أن تكون فنّاً.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "Massimo Bottura runs Osteria Francescana in Modena, a city most travellers know " +
      "as a stop on the way somewhere else. Today people fly there for one reason. " +
      "His restaurant has held three Michelin stars for years, and on the list of the " +
      "World's Fifty Best it has reached number one twice.\n\n" +
      "What he serves on a plate is recognisably Emilia. Tortellini in broth. " +
      "Parmigiano Reggiano cured for thirty months. Balsamic vinegar from a barrel " +
      "that opened during his grandfather's time. But the way he serves it is unlike " +
      "anything you have eaten. The tortellini comes in a clear consommé that took " +
      "three days to make. The Parmigiano arrives in five textures and five temperatures.\n\n" +
      "Behind the showmanship is a man who built a parallel project called Food For Soul. " +
      "Twelve community kitchens around the world that take surplus food from supermarkets " +
      "and turn it into proper sit-down meals for people who have nowhere else to eat. " +
      "He calls it cooking as a social act. The same hands that compose a five hundred " +
      "euro tasting menu also stir industrial pots in Rio and Paris and London.\n\n" +
      "You can read that as a contradiction. You can also read it as the whole point. " +
      "Bottura believes that food sits at the centre of culture, that it carries memory " +
      "and economic justice in equal measure, and that a chef has the responsibility " +
      "to argue for both.",
    bodyAr:
      "ماسيمو بوتورا يدير مطعم Osteria Francescana في مدينة مودينا، " +
      "المدينة التي يعرفها معظم المسافرين كمحطّة في الطريق إلى مكان آخر. " +
      "اليوم يطير الناس إليها لسبب واحد. " +
      "مطعمه يحمل ثلاث نجوم ميشلان منذ سنوات، وعلى قائمة \"أفضل خمسين مطعماً في العالم\" " +
      "وصل إلى المركز الأول مرّتين.\n\n" +
      "ما يقدّمه في الطبق يمكن التعرّف عليه كإميليا. تورتيليني في مرق. " +
      "بارميجيانو ريجيانو معتّق ثلاثين شهراً. خل بلسمي من برميل افتُتح في زمن جدّه. " +
      "لكن الطريقة التي يقدّمه بها لا تشبه أي شيء أكلته. " +
      "التورتيليني تأتي في مرق صافٍ احتاج ثلاثة أيام للتحضير. " +
      "البارميجيانو يصل بخمس قوامات وخمس درجات حرارة.\n\n" +
      "خلف العرض، رجل بنى مشروعاً موازياً اسمه Food For Soul. " +
      "اثنا عشر مطبخاً مجتمعياً حول العالم، تأخذ الفائض من المتاجر الكبرى " +
      "وتحوّله إلى وجبات جلوس فعليّة لأناس ليس لديهم مكان آخر يأكلون فيه. " +
      "يسمّي ذلك \"الطبخ كفعل اجتماعي\". " +
      "نفس اليدين اللتين تؤلّفان قائمة تذوّق بخمسمئة يورو، " +
      "تحرّكان قدوراً صناعية في ريو وباريس ولندن.\n\n" +
      "يمكن أن تقرأ هذا كتناقض. يمكن أيضاً أن تقرأه كالفكرة الكاملة. " +
      "بوتورا يؤمن أن الطعام يقع في قلب الثقافة، أنه يحمل الذاكرة " +
      "والعدالة الاقتصادية بنفس القدر، وأن على الشيف مسؤولية " +
      "الدفاع عن الاثنين.",
  },

  'reem-kassis': {
    hookEn: 'A Palestinian writer turned cookbook author who maps a cuisine across centuries.',
    hookAr: 'كاتبة فلسطينية تحوّلت إلى مؤلّفة كتب طبخ، ترسم مطبخاً عبر القرون.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "Reem Kassis did not set out to be a cookbook author. She trained at Wharton, " +
      "worked in management consulting, and only began writing about Palestinian " +
      "food when she had a daughter and realised she could not let the recipes " +
      "live only in her own head.\n\n" +
      "Her first book, The Palestinian Table, came in 2017 and won the Guild of Food " +
      "Writers award. Her second, The Arabesque Table, expanded the lens. " +
      "She traced ingredients and techniques across the Arab world and beyond, " +
      "following the silk road into Asia, the spice trade into the Mediterranean, " +
      "and back home to Jerusalem.\n\n" +
      "What makes Kassis particular is her rigour. She is a researcher first. " +
      "She reads medieval Arabic cookery manuscripts. She talks to grandmothers in " +
      "villages most maps will not name. Then she writes recipes you can actually " +
      "cook on a Tuesday night, in a Western kitchen, with the produce of an ordinary " +
      "supermarket.\n\n" +
      "She wrote a piece for The New York Times in 2020 that became a small landmark. " +
      "It argued that food is political, that naming matters, that calling a dish " +
      "Israeli when it is Palestinian or Lebanese or Syrian erases the people who " +
      "made it. The argument was old. The clarity she brought to it was new.",
    bodyAr:
      "ريم قاسس لم تخطّط لأن تصبح مؤلّفة كتب طبخ. تخرّجت من وارتون، " +
      "عملت في الاستشارات الإدارية، وبدأت الكتابة عن الطعام الفلسطيني " +
      "فقط حين أنجبت ابنتها وأدركت أنها لا تستطيع ترك الوصفات " +
      "تعيش في رأسها وحدها.\n\n" +
      "كتابها الأول، \"المائدة الفلسطينية\"، صدر عام 2017 وفاز بجائزة " +
      "نقابة كتّاب الطعام. كتابها الثاني، \"المائدة العربية\"، وسّع العدسة. " +
      "تتبّعت المكوّنات والتقنيات عبر العالم العربي وأبعد، " +
      "متّبعةً طريق الحرير إلى آسيا، وتجارة التوابل إلى المتوسّط، " +
      "ثم عائدةً إلى القدس.\n\n" +
      "ما يميّز قاسس صرامتها. هي باحثة أولاً. " +
      "تقرأ مخطوطات الطبخ العربية في العصر الوسيط. تتحدّث إلى الجدّات في " +
      "قرى لن يسمّيها معظم الخرائط. ثم تكتب وصفات يمكنك فعلياً طبخها " +
      "في ليلة الثلاثاء، في مطبخ غربيّ، بمنتجات من سوبرماركت عادي.\n\n" +
      "كتبت مقالاً لنيويورك تايمز عام 2020 صار علامة صغيرة. " +
      "جادلت بأن الطعام سياسي، وأن التسمية مهمّة، وأن تسمية طبق إسرائيلياً " +
      "وهو فلسطيني أو لبناني أو سوري يمحو الناس الذين صنعوه. " +
      "الحجّة قديمة. الوضوح الذي أحضرته إليها جديد.",
  },

  'claudia-roden': {
    hookEn: 'The Cairene exile whose research saved a thousand Middle Eastern recipes.',
    hookAr: 'القاهريّة المنفيّة التي أنقذ بحثها ألف وصفة من الطعام الشرق أوسطي.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "Claudia Roden was eighteen when her family left Cairo in 1956. The expulsion " +
      "scattered the Sephardic community across Europe, and a generation of recipes " +
      "started to fade with the people who remembered them.\n\n" +
      "She moved to London, raised three children, and began doing what no one had " +
      "asked her to do. She wrote letters. She knocked on doors. She sat down with " +
      "Egyptian and Lebanese and Iraqi and Persian women across north London and " +
      "south Paris and asked them to tell her how their mothers had cooked. " +
      "She filled notebooks the way some people fill diaries.\n\n" +
      "Out of that came A Book of Middle Eastern Food in 1968. It is the book every " +
      "serious Arab kitchen owns, in English or in translation. Hundreds of recipes, " +
      "each one explained, each one given context. She wrote about the Jewish food " +
      "of Egypt, the spice trade memory inside Aleppo cooking, the bread cultures " +
      "of every village she could find a witness to.\n\n" +
      "She never trained as a chef. She is, by her own description, a researcher who " +
      "cooks. And she saved a body of cuisine that would have been thinner without her. " +
      "Every Arab cookbook published in English since 1968 stands on her shoulders, " +
      "whether the author thanks her in the acknowledgements or not.",
    bodyAr:
      "كانت كلوديا رودين في الثامنة عشرة حين غادرت عائلتها القاهرة عام 1956. " +
      "أدّى الترحيل إلى تشتّت الجالية السفارديّة عبر أوروبا، " +
      "وبدأ جيل من الوصفات يتلاشى مع الناس الذين يتذكّرونها.\n\n" +
      "انتقلت إلى لندن، ربّت ثلاثة أطفال، وبدأت تفعل ما لم يطلبه منها أحد. " +
      "كتبت رسائل. طرقت أبواباً. جلست مع نساء مصريّات ولبنانيّات وعراقيّات " +
      "وإيرانيّات في شمال لندن وجنوب باريس وطلبت منهنّ أن يقلن لها " +
      "كيف كانت أمّهاتهنّ يطبخن. ملأت دفاتر كما يملأ بعض الناس مذكّراتهم.\n\n" +
      "من ذلك خرج \"كتاب الطعام الشرق أوسطي\" عام 1968. " +
      "هو الكتاب الذي يملكه كل مطبخ عربي جادّ، بالإنجليزية أو بالترجمة. " +
      "مئات الوصفات، كل واحدة مشروحة، كل واحدة في سياقها. " +
      "كتبت عن الطعام اليهودي في مصر، وعن ذاكرة تجارة التوابل داخل الطبخ الحلبي، " +
      "وعن ثقافات الخبز في كل قرية وجدت لها شاهداً.\n\n" +
      "لم تتدرّب كشيف. هي، بوصفها لنفسها، باحثة تطبخ. " +
      "أنقذت جسماً من المطبخ كان سيكون أنحف بدونها. " +
      "كل كتاب طبخ عربي نُشر بالإنجليزية منذ 1968 يقف على كتفيها، " +
      "سواء شكرها المؤلّف في الإهداء أم لم يفعل.",
  },

  'jacques-pepin': {
    hookEn: 'Three quarters of a century at the stove, and still teaching one technique at a time.',
    hookAr: 'ثلاثة أرباع قرن على الموقد، ولا يزال يعلّم تقنية واحدة في كل مرّة.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "Jacques Pépin started in his mother's restaurant in Lyon at thirteen years old. " +
      "By his twenties he was the personal chef to three French presidents. " +
      "He moved to New York in the late fifties and somehow never went back to the " +
      "ladder he had been climbing. He worked at Howard Johnson, of all places, " +
      "developing food for the chain, and used the income to put himself through " +
      "Columbia for a master's degree in eighteenth century French literature.\n\n" +
      "What he did next made him irreplaceable. He started teaching. " +
      "Television series after television series for PBS. Two volumes of the technique " +
      "book La Technique that taught a generation of American cooks how to hold a knife " +
      "and bone a chicken and break down a fish. He cooked on screen with Julia Child " +
      "and the two of them changed what an American Sunday afternoon could feel like.\n\n" +
      "He paints. He sketches the dish he is about to make before he makes it. " +
      "He believes that cooking is one of the humanities and he is willing to argue " +
      "the point. At ninety, he was still on PBS, still chopping onions on a wooden " +
      "board, still narrating in that warm Lyonnais accent.\n\n" +
      "His real gift was patience. He never made a viewer feel stupid. He never " +
      "rushed past a step. He understood that the home cook needs the step before " +
      "the step before the step, and he gave it, every time, with the same calm " +
      "respect for the person on the other side of the camera.",
    bodyAr:
      "بدأ جاك بيبان في مطعم أمّه في ليون وعمره ثلاثة عشر عاماً. " +
      "في عشرينيّاته كان الطاهي الخاص لثلاثة رؤساء فرنسيّين. " +
      "انتقل إلى نيويورك في أواخر الخمسينيّات، وبشكلٍ ما لم يعد إلى " +
      "السلّم الذي كان يصعده. عمل في Howard Johnson، " +
      "وطوّر الطعام لسلسلة المطاعم، واستخدم الدخل ليدرس في كولومبيا " +
      "ماجستير في الأدب الفرنسي في القرن الثامن عشر.\n\n" +
      "ما فعله بعد ذلك جعله لا يُعوَّض. بدأ التدريس. " +
      "سلسلة تلفزيونيّة بعد أخرى على PBS. مجلّدا كتاب التقنية La Technique " +
      "اللذان علّما جيلاً من الطبّاخين الأمريكيّين كيف يمسكون السكّين، " +
      "ويخرجون عظم الدجاجة، ويفصّلون السمك. طبخ على الشاشة مع جوليا تشايلد " +
      "والاثنان غيّرا ما يمكن أن يشعر به بعد ظهيرة الأحد الأمريكيّة.\n\n" +
      "يرسم. يخطّط الطبق الذي على وشك صنعه قبل أن يصنعه. " +
      "يؤمن أن الطبخ من الإنسانيّات وهو مستعدّ للدفاع عن هذا. " +
      "في التسعين، كان لا يزال على PBS، يقطّع البصل على لوح خشبيّ، " +
      "ويروي بنفس لكنة ليون الدافئة.\n\n" +
      "هبتُه الحقيقيّة كانت الصبر. لم يجعل المشاهد يشعر بأنه غبيّ. " +
      "لم يمرّ مسرعاً على خطوة. فهم أن طبّاخ البيت يحتاج الخطوة قبل الخطوة قبل الخطوة، " +
      "وأعطاها، في كل مرّة، باحترام هادئ نفسه للشخص على الجانب الآخر من الكاميرا.",
  },

  'alice-waters': {
    hookEn: 'The Berkeley restaurateur who turned California cuisine into a movement.',
    hookAr: 'صاحبة المطعم في بيركلي التي حوّلت المطبخ الكاليفورني إلى حركة.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "Alice Waters opened Chez Panisse in Berkeley in 1971. She was twenty seven, " +
      "untrained, and stubborn. She had spent the previous summer in France, mostly " +
      "in Provence, and what she wanted to bring home with her was not a particular " +
      "recipe. It was the relationship a French village had with its market.\n\n" +
      "What she built over the next half century was a quiet revolution. " +
      "Chez Panisse refuses to put a dish on the menu unless every ingredient is in " +
      "season, traceable, and within driving distance. Every farmer is named. " +
      "The fish has a fishing boat next to it. The cheese has a herd.\n\n" +
      "She started the Edible Schoolyard project in 1995. A kitchen and a garden " +
      "attached to a middle school in Berkeley. The students grow what they cook, " +
      "and the cooking is part of the curriculum. Lessons in mathematics, history, " +
      "and culture all happen with hands in the soil and a knife on a board. " +
      "There are now forty branches of the project around the world.\n\n" +
      "Critics have called her precious. Cooks who actually run a restaurant in " +
      "Berkeley in 2026 know what she did. She forced an entire profession to ask, " +
      "every morning, where the food came from. And she has not stopped asking.",
    bodyAr:
      "افتتحت أليس واترز مطعم Chez Panisse في بيركلي عام 1971. " +
      "كانت في السابعة والعشرين، غير متدرّبة، وعنيدة. " +
      "أمضت الصيف السابق في فرنسا، معظمه في بروفانس، " +
      "وما أرادت أن تأخذه معها إلى البيت لم يكن وصفةً معيّنة. " +
      "كان العلاقة التي تربط قريةً فرنسيّةً بسوقها.\n\n" +
      "ما بنته خلال نصف القرن التالي كان ثورةً هادئة. " +
      "Chez Panisse يرفض أن يضع طبقاً في القائمة ما لم يكن كل مكوّن في موسمه، " +
      "قابلاً للتتبّع، ضمن مسافة قيادة. كل مزارع له اسم. " +
      "السمك يأتي مع قارب صيد. الجبن مع قطيع.\n\n" +
      "بدأت مشروع Edible Schoolyard عام 1995. مطبخ وحديقة " +
      "متّصلان بمدرسة متوسّطة في بيركلي. الطلاب يزرعون ما يطبخون، " +
      "والطبخ جزء من المنهج. دروس في الرياضيات والتاريخ والثقافة " +
      "تحصل كلها واليدان في التراب والسكّين على لوح. " +
      "هناك الآن أربعون فرعاً للمشروع حول العالم.\n\n" +
      "وصفها النقّاد بالمتفاخرة. الطبّاخون الذين يديرون فعلاً مطعماً في بيركلي " +
      "في 2026 يعرفون ما فعلته. أجبرت مهنةً بأكملها على أن تسأل، " +
      "كل صباح، من أين جاء الطعام. ولم تتوقّف عن السؤال.",
  },

  'anissa-helou': {
    hookEn: 'The Levantine writer who turned bread into a cultural atlas.',
    hookAr: 'الكاتبة الشاميّة التي حوّلت الخبز إلى أطلس ثقافي.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "Anissa Helou was born in Beirut to a Syrian father and a Lebanese mother. " +
      "She left during the war, took a degree in art, and worked for years in the " +
      "auction houses of London before turning her attention back to food. " +
      "When she finally did, she did it with the discipline of an art historian.\n\n" +
      "Her book Feast, published in 2018, runs to over five hundred pages. " +
      "It maps the cuisine of the Muslim world across four continents. " +
      "Indonesian rendang. Senegalese thieboudienne. Turkish manti. " +
      "Yemeni saltah. The recipes are precise, the headnotes are unhurried, " +
      "and the cumulative effect is a kind of soft argument against the idea that " +
      "Muslim cuisine is one thing.\n\n" +
      "She wrote Bread before that, in 2009. A book that takes the world's flatbreads " +
      "and yeasted loaves seriously, from Sicilian focaccia to Lebanese markouk to " +
      "north Chinese mantou. She traces dough back through the centuries the way a " +
      "musicologist traces a folk song.\n\n" +
      "Helou cooks with confidence and writes without nostalgia. She does not romanticise " +
      "the grandmother's kitchen and she does not condescend to the modern home cook. " +
      "She just delivers the food, with the dignity of someone who has done the work, " +
      "and lets the reader decide what to do with it.",
    bodyAr:
      "وُلدت أنيسة هلو في بيروت لأب سوري وأمّ لبنانية. " +
      "غادرت أثناء الحرب، حصلت على شهادة في الفن، " +
      "وعملت سنوات في دور المزادات في لندن قبل أن تعيد اهتمامها إلى الطعام. " +
      "وحين فعلت ذلك أخيراً، فعلته بانضباط مؤرّخة فنّ.\n\n" +
      "كتابها \"المأدبة\"، المنشور عام 2018، يمتدّ لأكثر من خمسمئة صفحة. " +
      "يرسم مطبخ العالم الإسلامي عبر أربع قارّات. " +
      "Rendang إندونيسي. ثيبودين سنغالي. منتي تركي. " +
      "سلتة يمنية. الوصفات دقيقة، النصوص التمهيديّة غير متعجّلة، " +
      "والأثر التراكميّ هو حجّة ناعمة ضد فكرة أن المطبخ الإسلامي شيء واحد.\n\n" +
      "كتبت \"الخبز\" قبل ذلك، عام 2009. " +
      "كتاب يأخذ خبز العالم المسطّح وأرغفته المخمَّرة على محمل الجدّ، " +
      "من الفوكاتشيا الصقلّيّة إلى المركوك اللبناني إلى المانتو الشمالي الصيني. " +
      "تتبّع العجين عبر القرون كما يتتبّع باحث الموسيقى أغنيةً شعبيّة.\n\n" +
      "هلو تطبخ بثقة وتكتب بدون حنين. لا تُرمنس مطبخ الجدّة " +
      "ولا تتعالى على طبّاخ البيت الحديث. " +
      "تُسلّم الطعام فقط، بكرامة شخص أدّى الواجب، " +
      "وتترك للقارئ أن يقرّر ماذا يفعل به.",
  },

  'rene-redzepi': {
    hookEn: 'The Copenhagen chef who proved you can build a world cuisine on the food of your own forest.',
    hookAr: 'شيف كوبنهاغن الذي أثبت أنه يمكنك بناء مطبخ عالميّ على طعام غابتك أنت.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "René Redzepi opened Noma in Copenhagen in 2003. He was twenty five. " +
      "The premise was simple and slightly absurd. He would cook only with what " +
      "Scandinavia produced. No olive oil. No lemon. No black pepper. Reindeer, " +
      "sea buckthorn, foraged moss, fermented herring, beach roses.\n\n" +
      "For the first few years, critics were polite. By 2010, Noma was the best " +
      "restaurant in the world according to the Fifty Best list. By 2014 it had " +
      "won that title four times. He had not invented Nordic ingredients. He had " +
      "convinced the cooking profession to take them seriously, and convinced " +
      "Scandinavian customers that their own larder was as worthy as the French one.\n\n" +
      "What Redzepi built around Noma is more interesting than Noma itself. " +
      "A festival called Mad. A research lab. A book of fermentation that became a " +
      "standard reference. A pop up in Tokyo and another in Sydney that took a year " +
      "of preparation. His staff went out and opened their own restaurants and quietly " +
      "shifted the trajectory of fine dining across half the world.\n\n" +
      "He has announced he is closing the doors in their current form. Whatever comes " +
      "next, the lesson of his work survives. Take the food of where you actually are. " +
      "Treat it with the seriousness usually reserved for somewhere else. Discover " +
      "that there is no somewhere else, only here, looked at carefully.",
    bodyAr:
      "افتتح رينيه ريدزيبي مطعم Noma في كوبنهاغن عام 2003. كان في الخامسة والعشرين. " +
      "كانت الفكرة بسيطة وعبثيّة قليلاً. سيطبخ فقط بما تنتجه أسكندنافيا. " +
      "لا زيت زيتون. لا ليمون. لا فلفل أسود. وعل، رمل البحر، طحلب من الغابة، " +
      "رنغة مخمَّرة، ورد الشواطئ.\n\n" +
      "في السنوات الأولى، كان النقّاد مهذّبين. بحلول 2010، صار Noma أفضل " +
      "مطعم في العالم بحسب قائمة الخمسين الأفضل. بحلول 2014 كان قد فاز " +
      "بهذا اللقب أربع مرّات. لم يخترع المكوّنات النورديّة. " +
      "أقنع مهنة الطبخ بأن تأخذها على محمل الجدّ، " +
      "وأقنع الزبائن الأسكندنافيّين بأن مخزنهم يستحقّ كالمخزن الفرنسيّ.\n\n" +
      "ما بناه ريدزيبي حول Noma أكثر إثارة للاهتمام من Noma نفسه. " +
      "مهرجان اسمه Mad. مختبر بحث. كتاب عن التخمير صار مرجعاً قياسيّاً. " +
      "Pop-up في طوكيو وآخر في سيدني احتاجا سنة من التحضير. " +
      "موظّفوه خرجوا وافتتحوا مطاعمهم وغيّروا بهدوء مسار الطعام الرفيع " +
      "عبر نصف العالم.\n\n" +
      "أعلن أنه يغلق الأبواب في شكلها الحالي. ومهما يأتي بعد، " +
      "درس عمله ينجو. خذ طعام المكان الذي أنت فيه فعلاً. " +
      "تعامل معه بالجدّيّة التي عادةً ما يُحتفظ بها لمكان آخر. " +
      "اكتشف أنه لا يوجد مكان آخر، فقط هنا، حين تنظر بعناية.",
  },

  'nawal-nasrallah': {
    hookEn: 'The Iraqi scholar who translated a thousand year old cookbook back into a living kitchen.',
    hookAr: 'الباحثة العراقيّة التي أعادت ترجمة كتاب طبخ عمره ألف عام إلى مطبخ حيّ.',
    dateEn: 'Featured · June 2026',
    dateAr: 'مميّز · حزيران 2026',
    bodyEn:
      "Nawal Nasrallah trained as an English literature professor in Baghdad before " +
      "the war scattered her family. She fled with her children to the United States " +
      "and ended up teaching herself the food history of her own country from the " +
      "outside, in a library, in a language that was not her first.\n\n" +
      "Her project became a translation of Kitab al Tabikh, the tenth century " +
      "Abbasid cookbook by Ibn Sayyar al Warraq. Until she did it, the book had " +
      "lived only in scholarly editions, available to a handful of medieval Arabists. " +
      "Her translation, Annals of the Caliphs' Kitchens, runs to almost nine hundred " +
      "pages. Recipes for dishes most people had assumed were Persian turn out to be " +
      "Baghdadi. Techniques associated with French haute cuisine turn out to come " +
      "from Damascus four centuries earlier.\n\n" +
      "She also wrote Delights from the Garden of Eden, a cookbook of Iraqi home " +
      "cooking that brought the kitchen of Mosul and Basra and Baghdad to readers " +
      "in English for the first time. Pacha. Quzi. Kubba mosulia. Margat bamya. " +
      "Each one annotated with where it came from, what season it belonged to, who " +
      "in her family taught her how to make it.\n\n" +
      "What she has done is not romantic recovery. It is hard historical work, done " +
      "in exile, written carefully, and offered back to a profession that did not " +
      "know it was waiting for it. The bibliographies of the next generation of Arab " +
      "cookbooks will quietly credit her on every other page.",
    bodyAr:
      "تدرّبت نوال نصرالله أستاذةَ أدب إنجليزي في بغداد قبل أن تشتّت الحرب عائلتها. " +
      "هربت بأطفالها إلى الولايات المتحدة وانتهى بها الأمر تعلّم تاريخ طعام بلدها " +
      "من الخارج، في مكتبة، بلغة ليست لغتها الأولى.\n\n" +
      "صار مشروعها ترجمة \"كتاب الطبيخ\"، الكتاب العباسيّ الذي ألّفه ابن سيّار الورّاق " +
      "في القرن العاشر. حتى فعلت ذلك، عاش الكتاب فقط في طبعات أكاديميّة، " +
      "متاحاً لحفنة من المستعربين المتخصّصين في العصور الوسطى. " +
      "ترجمتها، \"حوليّات مطابخ الخلفاء\"، تمتدّ لقرابة تسعمئة صفحة. " +
      "وصفات لأطباق افترض معظم الناس أنها فارسيّة تبيّن أنها بغداديّة. " +
      "تقنيات مرتبطة بالطبخ الفرنسيّ الرفيع تبيّن أنها أتت " +
      "من دمشق قبل أربعة قرون.\n\n" +
      "كتبت أيضاً \"بهجات من حديقة عدن\"، كتاب طبخ منزليّ عراقيّ " +
      "أحضر مطبخ الموصل والبصرة وبغداد إلى القرّاء بالإنجليزية لأول مرّة. " +
      "باشا. قوزي. كبّة موصليّة. مرقة بامية. " +
      "كلّ واحدة مع ملاحظات عن أصلها، الموسم الذي تنتمي إليه، " +
      "من في عائلتها علّمها صنعها.\n\n" +
      "ما فعلته ليس استعادةً رومنسيّة. هو عمل تاريخيّ صعب، نُفّذ في المنفى، " +
      "كُتب بعناية، وقُدّم لمهنة لم تكن تعرف أنها تنتظره. " +
      "ببليوغرافيا الجيل القادم من كتب الطبخ العربيّة ستذكرها بهدوء " +
      "في كل صفحة ثانية.",
  },
};

/** Order chefs by how prominently we want to surface them. */
export const FEATURED_CHEF_IDS: string[] = [
  'ottolenghi',
  'sami-tamimi',
  'massimo-bottura',
  'reem-kassis',
  'claudia-roden',
  'jacques-pepin',
  'alice-waters',
  'anissa-helou',
  'rene-redzepi',
  'nawal-nasrallah',
];
