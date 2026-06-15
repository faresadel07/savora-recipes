/**
 * Static educational + reference content for the Fitness page.
 * All facts come from USDA, NIH dietary guidelines, and peer-reviewed
 * sports nutrition literature — public information.
 */

// ============ PROTEIN 101 — educational paragraphs ============

export interface ProteinTopic {
  id: string;
  title: string;
  titleAr?: string;
  body: string;
  bodyAr?: string;
  highlight?: string;
  highlightAr?: string;
  source: string;
  sourceAr?: string;
}

export const PROTEIN_101: ProteinTopic[] = [
  {
    id: 'how-much',
    title: 'How much protein do you actually need?',
    body: 'For sedentary adults, 0.8g of protein per kilogram of body weight is enough to prevent deficiency. For people who train regularly, the picture changes. Strength athletes benefit from 1.6 to 2.2g per kilogram per day. Endurance athletes do well at 1.2 to 1.6g. Older adults and those in a calorie deficit lean toward the higher end of the range.',
    highlight: '1.6 to 2.2g per kg of body weight for active people',
    source: 'International Society of Sports Nutrition (ISSN) Position Stand, 2017',
    titleAr: 'ما مقدار البروتين الذي تحتاجه بالفعل؟',
    bodyAr: 'بالنسبة للبالغين الذين لا يمارسون الرياضة، فإن 0.8 جرام من البروتين لكل كيلوجرام من وزن الجسم يكفي لمنع النقص. بالنسبة للأشخاص الذين يتدربون بانتظام، تتغير الصورة. يستفيد رياضيو القوة من 1.6 إلى 2.2 جرام لكل كيلو جرام يوميًا. يقوم رياضيو التحمل بأداء جيد عند 1.2 إلى 1.6 جرام. يميل كبار السن والذين يعانون من نقص السعرات الحرارية نحو الطرف الأعلى من النطاق.',
    highlightAr: '1.6 إلى 2.2 جرام لكل كيلوجرام من وزن الجسم للأشخاص النشطين',
    sourceAr: 'موقف الجمعية الدولية للتغذية الرياضية (ISSN)، 2017',
  },
  {
    id: 'timing',
    title: 'Does protein timing matter?',
    body: 'Total daily protein matters more than exact timing, but spreading intake across 3 to 5 meals of 20 to 40g each appears to maximize muscle protein synthesis. The "anabolic window" after training is wider than once thought — anywhere from one to several hours. Pre-bed casein (or any slow-digesting protein) supports overnight muscle repair.',
    highlight: '20 to 40g per meal, 3 to 5 times a day',
    source: 'Schoenfeld & Aragon, Journal of the International Society of Sports Nutrition, 2018',
    titleAr: 'هل توقيت البروتين مهم؟',
    bodyAr: 'إن إجمالي البروتين اليومي مهم أكثر من التوقيت الدقيق، ولكن يبدو أن توزيع تناول البروتين على 3 إلى 5 وجبات بوزن 20 إلى 40 جرامًا يزيد من تخليق البروتين العضلي. "نافذة الابتنائية" بعد التدريب أصبحت أوسع مما كان يعتقد من قبل - في أي مكان من ساعة إلى عدة ساعات. يدعم الكازين قبل النوم (أو أي بروتين بطيء الهضم) إصلاح العضلات طوال الليل.',
    highlightAr: '20 إلى 40 جرامًا لكل وجبة، 3 إلى 5 مرات يوميًا',
    sourceAr: 'شوينفيلد وأراغون، مجلة الجمعية الدولية للتغذية الرياضية، 2018',
  },
  {
    id: 'sources',
    title: 'Animal vs plant protein',
    body: 'Animal proteins (eggs, dairy, meat, fish) are complete: they contain all nine essential amino acids in usable amounts. Most plant proteins lack one or two essential amino acids, but combining sources (rice + beans, hummus + bread, soy + grain) easily closes the gap. Plant eaters generally need 5 to 10% more total protein to match animal-source results.',
    highlight: 'Plant-based works — just hit ~10% more total protein',
    source: 'Mariotti & Gardner, Nutrients, 2019',
    titleAr: 'البروتين الحيواني مقابل البروتين النباتي',
    bodyAr: 'البروتينات الحيوانية (البيض ومنتجات الألبان واللحوم والأسماك) كاملة: فهي تحتوي على جميع الأحماض الأمينية الأساسية التسعة بكميات قابلة للاستخدام. تفتقر معظم البروتينات النباتية إلى واحد أو اثنين من الأحماض الأمينية الأساسية، ولكن الجمع بين المصادر (الأرز + الفول، الحمص + الخبز، الصويا + الحبوب) يسد الفجوة بسهولة. يحتاج أكلة النباتات عمومًا إلى نسبة 5 إلى 10% من إجمالي البروتين لمطابقة النتائج ذات المصدر الحيواني.',
    highlightAr: 'الأعمال النباتية - فقط احصل على نسبة 10% إضافية من البروتين الإجمالي',
    sourceAr: 'ماريوتي وجاردنر، المغذيات، 2019',
  },
  {
    id: 'quality',
    title: 'Whey vs casein vs plant protein',
    body: 'Whey digests fast (peaks at ~90 minutes) and is great around training. Casein digests slowly (over 6 to 8 hours), making it ideal before sleep. Plant proteins like soy isolate match whey for muscle response when matched for leucine content. Pea protein performs nearly as well. Blends of plant sources outperform single-source plant proteins.',
    highlight: 'Whey post-workout, casein at night, plant blends anytime',
    source: 'Phillips et al., Nutrients, 2016',
    titleAr: 'مصل اللبن مقابل الكازين مقابل البروتين النباتي',
    bodyAr: 'يتم هضم مصل اللبن بسرعة (يبلغ ذروته عند حوالي 90 دقيقة) وهو رائع أثناء التدريب. يتم هضم الكازين ببطء (لمدة تزيد عن 6 إلى 8 ساعات)، مما يجعله مثاليًا قبل النوم. البروتينات النباتية مثل عزل الصويا تطابق مصل اللبن لاستجابة العضلات عند مطابقتها لمحتوى الليوسين. يؤدي بروتين البازلاء أداءً جيدًا تقريبًا. مزيج من المصادر النباتية يتفوق على البروتينات النباتية أحادية المصدر.',
    highlightAr: 'مصل اللبن بعد التمرين، والكازين في الليل، ويمزج النبات في أي وقت',
    sourceAr: 'فيليبس وآخرون، المغذيات، 2016',
  },
  {
    id: 'around-workout',
    title: 'What to eat around training',
    body: 'Two hours before training, eat a balanced meal with slow carbs and a moderate amount of protein (around 25 to 30g). For early workouts, a small fast-digesting meal 30 to 60 minutes before works well — banana, oats, whey shake. Post-workout, prioritize 30 to 40g of fast protein and some carbs within two hours of finishing.',
    highlight: '25g protein 2 hours before, 30 to 40g protein within 2 hours after',
    source: 'Kerksick et al., Journal of the International Society of Sports Nutrition, 2017',
    titleAr: 'ماذا نأكل أثناء التدريب؟',
    bodyAr: 'قبل ساعتين من التدريب، تناول وجبة متوازنة تحتوي على كربوهيدرات بطيئة وكمية معتدلة من البروتين (حوالي 25 إلى 30 جرام). بالنسبة للتمرينات المبكرة، فإن تناول وجبة صغيرة سريعة الهضم قبل 30 إلى 60 دقيقة سيكون جيدًا - الموز والشوفان ومخفوق مصل اللبن. بعد التمرين، أعط الأولوية لـ 30 إلى 40 جرامًا من البروتين السريع وبعض الكربوهيدرات خلال ساعتين من الانتهاء.',
    highlightAr: '25 جرام بروتين قبل ساعتين، و30 إلى 40 جرام بروتين خلال ساعتين بعد ذلك',
    sourceAr: 'كيركسيك وآخرون، مجلة الجمعية الدولية للتغذية الرياضية، 2017',
  },
  {
    id: 'fiber-and-fats',
    title: "Don't ignore fiber and fats",
    body: 'A protein-heavy diet without fiber is hard on digestion and longer-term metabolic health. Aim for 25 to 38g of fiber daily from vegetables, fruits, beans, and whole grains. Healthy fats (omega-3s especially from fatty fish, nuts, olive oil) keep hormones working properly. Athletes need around 1g of fat per kg of body weight, minimum.',
    highlight: 'Fiber: 25 to 38g/day. Fats: at least 1g/kg of body weight',
    source: 'US Dietary Guidelines for Americans, 2020-2025',
    titleAr: 'لا تتجاهل الألياف والدهون',
    bodyAr: 'اتباع نظام غذائي غني بالبروتين بدون ألياف يصعب عملية الهضم والصحة الأيضية على المدى الطويل. استهدف الحصول على 25 إلى 38 جرامًا من الألياف يوميًا من الخضروات والفواكه والفاصوليا والحبوب الكاملة. الدهون الصحية (أوميجا 3 خاصة من الأسماك الدهنية والمكسرات وزيت الزيتون) تحافظ على عمل الهرمونات بشكل صحيح. يحتاج الرياضيون إلى حوالي 1 جرام من الدهون لكل كجم من وزن الجسم كحد أدنى.',
    highlightAr: 'الألياف: 25 إلى 38 جرامًا/اليوم. الدهون: على الأقل 1 جرام/كجم من وزن الجسم',
    sourceAr: 'المبادئ التوجيهية الغذائية الأمريكية للأمريكيين، 2020-2025',
  },
  {
    id: 'ramadan-bulking',
    title: 'How to bulk or maintain during Ramadan',
    body: 'Two protein-heavy meals — Iftar and Suhoor — are enough to hit a daily protein target. Front-load carbs and fluids at Iftar, then a slow-digesting protein at Suhoor (Greek yogurt, cottage cheese, eggs). Schedule training 60 to 90 minutes before Iftar so you can refuel immediately. Avoid heavy lifting at Suhoor: the body is depleted, the day is starting.',
    highlight: 'Hit 0.8 to 1g of protein per pound across Iftar and Suhoor. Train just before Iftar.',
    source: 'Trabelsi et al., Sports Nutrition for Ramadan, 2018',
    titleAr: 'كيفية التضخيم أو المحافظة خلال شهر رمضان',
    bodyAr: 'وجبتان غنيتان بالبروتين – الإفطار والسحور – تكفيان لتحقيق هدف البروتين اليومي. تناول الكربوهيدرات والسوائل في المقدمة على الإفطار، ثم البروتين بطيء الهضم على السحور (الزبادي اليوناني والجبن والبيض). حدد موعدًا للتدريب قبل الإفطار بـ 60 إلى 90 دقيقة حتى تتمكن من التزود بالوقود على الفور. تجنب رفع الأشياء الثقيلة عند السحور: يكون الجسم مرهقًا، ويبدأ اليوم.',
    highlightAr: 'احصل على 0.8 إلى 1 جرام من البروتين لكل رطل خلال الإفطار والسحور. تدريب قبل الإفطار مباشرة.',
    sourceAr: 'الطرابلسي وآخرون، التغذية الرياضية لشهر رمضان، 2018',
  },
  {
    id: 'creatine-101',
    title: 'Creatine monohydrate is the safest, most researched supplement',
    body: 'Creatine monohydrate is the most studied sports supplement in history. 3 to 5g daily, taken at any time, raises muscle phosphocreatine stores so you can produce slightly more force per set. Effects are visible within 4 to 6 weeks: about 1 to 2kg lean muscle gain and 5 to 15 percent strength improvement. Safe for healthy kidneys per 200+ trials. Halal versions are widely available.',
    highlight: '3 to 5g per day, any time. Halal monohydrate is cheapest and identical to expensive blends.',
    source: 'Kreider et al., Journal of the International Society of Sports Nutrition, 2017',
    titleAr: 'الكرياتين مونوهيدرات هو المكمل الأكثر أمانًا والأكثر بحثًا',
    bodyAr: 'الكرياتين مونوهيدرات هو المكمل الرياضي الأكثر دراسة في التاريخ. يؤدي تناول 3 إلى 5 جرام يوميًا، في أي وقت، إلى زيادة مخزون الفوسفوكرياتين في العضلات حتى تتمكن من إنتاج قوة أكبر قليلًا في كل مجموعة. تظهر التأثيرات خلال 4 إلى 6 أسابيع: حوالي 1 إلى 2 كجم من اكتساب العضلات الخالية من الدهون وتحسين القوة بنسبة 5 إلى 15 بالمائة. آمن للكلى السليمة لكل أكثر من 200 تجربة. الإصدارات الحلال متاحة على نطاق واسع.',
    highlightAr: '3 إلى 5 جرام يوميًا، في أي وقت. مونوهيدرات الحلال هو أرخص ومماثل للخلطات باهظة الثمن.',
    sourceAr: 'كريدر وآخرون، مجلة الجمعية الدولية للتغذية الرياضية، 2017',
  },
  {
    id: 'cut-without-losing-muscle',
    title: 'Cut without losing muscle: 4 rules',
    body: 'During a cut, drop calories by 300 to 500 per day (not more). Keep protein above 1g per pound of body weight to spare lean tissue. Lift heavy at least 3 times per week — strength training tells the body to keep the muscle it has. Sleep 7 to 9 hours nightly: poor sleep doubles muscle loss in a deficit. The result: 0.4 to 0.7kg fat loss per week with no strength drop.',
    highlight: 'Deficit 300 to 500 kcal · Protein 1g/lb · Lift 3x/week · Sleep 7 to 9 hours',
    source: 'Helms et al., Evidence-Based Recommendations for Natural Bodybuilding, 2014',
    titleAr: 'قطع دون فقدان العضلات: 4 قواعد',
    bodyAr: 'خلال عملية القطع، قم بإسقاط السعرات الحرارية بمقدار 300 إلى 500 سعرة حرارية في اليوم (ليس أكثر). احتفظ بالبروتين أعلى من 1 جرام لكل رطل من وزن الجسم لتجنيب الأنسجة الخالية من الدهون. ارفع أشياء ثقيلة على الأقل 3 مرات في الأسبوع - تدريب القوة يخبر الجسم بالحفاظ على العضلات التي يمتلكها. النوم من 7 إلى 9 ساعات ليلاً: قلة النوم تضاعف فقدان العضلات في حالة العجز. النتيجة: فقدان 0.4 إلى 0.7 كجم من الدهون أسبوعيًا دون انخفاض القوة.',
    highlightAr: 'العجز 300 إلى 500 سعرة حرارية · بروتين 1 جم/رطل · رفع 3 مرات في الأسبوع · النوم من 7 إلى 9 ساعات',
    sourceAr: 'هيلمز وآخرون، التوصيات المبنية على الأدلة لكمال الأجسام الطبيعية، 2014',
  },
  {
    id: 'sleep-and-recovery',
    title: 'Sleep is the most underrated training variable',
    body: 'Growth hormone peaks during deep sleep. Most muscle protein synthesis happens in the night. Athletes who sleep less than 6 hours nightly recover 30 percent slower and lose 60 percent more muscle in a deficit. Practical rule: protect 7 to 9 hours of dark, cool, quiet sleep. Caffeine cut-off 8 hours before bed. Phone out of the bedroom.',
    highlight: '7 to 9 hours, dark and cool. Caffeine cut-off 8 hours pre-bed.',
    source: 'Walker, Why We Sleep, and Dattilo et al., Medical Hypotheses, 2011',
    titleAr: 'النوم هو متغير التدريب الأكثر استخفافًا',
    bodyAr: 'يصل هرمون النمو إلى ذروته أثناء النوم العميق. معظم تخليق البروتين العضلي يحدث في الليل. الرياضيون الذين ينامون أقل من 6 ساعات ليلاً يتعافون بنسبة 30 بالمائة بشكل أبطأ ويفقدون عضلات أكثر بنسبة 60 بالمائة في حالة العجز. القاعدة العملية: حماية 7 إلى 9 ساعات من النوم المظلم والبارد والهادئ. قطع الكافيين قبل 8 ساعات من النوم. الهاتف خارج غرفة النوم.',
    highlightAr: 'من 7 إلى 9 ساعات، مظلم وبارد. قطع الكافيين قبل 8 ساعات من النوم.',
    sourceAr: 'ووكر، لماذا ننام، وداتيلو وآخرون، الفرضيات الطبية، 2011',
  },
  {
    id: 'progressive-overload',
    title: 'Progressive overload: the only rule that grows muscle',
    body: 'A muscle only grows when forced past what it already does. Each week, add weight, reps, or a quality set. If last week was 60kg bench for 8 reps, this week try 60 for 9 or 62.5 for 8. Without progression, you maintain. Track it in a notes app: exercise, weight, reps, RPE. Without writing it down, you will not see the trend.',
    highlight: 'Add weight, reps, or sets each week. Track every session.',
    source: 'Schoenfeld, The M.A.X. Muscle Plan, 2013',
    titleAr: 'الحمل الزائد التدريجي: القاعدة الوحيدة التي تنمي العضلات',
    bodyAr: 'تنمو العضلة فقط عندما تُجبر على تجاوز ما تفعله بالفعل. قم بإضافة الوزن أو التكرارات أو مجموعة الجودة كل أسبوع. إذا كان الأسبوع الماضي 60 كجم على مقاعد البدلاء لـ 8 تكرارات، جرب هذا الأسبوع 60 لـ 9 أو 62.5 لـ 8. بدون تقدم، ستحافظ على ذلك. تتبع ذلك في تطبيق الملاحظات: التمرين، الوزن، التكرارات، RPE. دون كتابتها، لن ترى هذا الاتجاه.',
    highlightAr: 'قم بإضافة الوزن أو التكرارات أو المجموعات كل أسبوع. تتبع كل جلسة.',
    sourceAr: 'شوينفيلد، ماكس. خطة العضلات، 2013',
  },
];

// ============ MACRO CHEAT SHEET ============

export interface ProteinSource {
  food: string;
  foodAr?: string;
  serving: string;
  protein: number;
  cal: number;
  category: 'meat' | 'fish' | 'dairy' | 'eggs' | 'plant' | 'supplement';
}

export const PROTEIN_SOURCES: ProteinSource[] = [
  // Meat
  { food: 'Chicken breast, cooked', serving: '100g', protein: 31, cal: 165, category: 'meat', foodAr: 'صدر دجاج مطبوخ' },
  { food: 'Chicken thigh, cooked', serving: '100g', protein: 26, cal: 209, category: 'meat', foodAr: 'فخذ دجاج مطبوخ' },
  { food: 'Lean ground beef (93/7)', serving: '100g', protein: 22, cal: 152, category: 'meat', foodAr: 'لحم بقر مفروم قليل الدهن (93/7)' },
  { food: 'Sirloin steak', serving: '100g', protein: 29, cal: 206, category: 'meat', foodAr: 'ستيك سيرلوين' },
  { food: 'Pork tenderloin', serving: '100g', protein: 26, cal: 143, category: 'meat', foodAr: 'لحم خنزير متن' },
  { food: 'Turkey breast', serving: '100g', protein: 29, cal: 135, category: 'meat', foodAr: 'صدر ديك رومي' },

  // Fish
  { food: 'Salmon, baked', serving: '100g', protein: 25, cal: 208, category: 'fish', foodAr: 'سلمون مخبوز' },
  { food: 'Tuna, canned in water', serving: '100g', protein: 26, cal: 116, category: 'fish', foodAr: 'تونة معلبة بالماء' },
  { food: 'Cod, baked', serving: '100g', protein: 23, cal: 105, category: 'fish', foodAr: 'سمك القد المخبوز' },
  { food: 'Shrimp, cooked', serving: '100g', protein: 24, cal: 99, category: 'fish', foodAr: 'روبيان مطبوخ' },
  { food: 'Tilapia', serving: '100g', protein: 26, cal: 128, category: 'fish', foodAr: 'بلطي' },
  { food: 'Sardines, canned', serving: '100g', protein: 25, cal: 208, category: 'fish', foodAr: 'سردين معلب' },

  // Eggs
  { food: 'Whole egg', serving: '1 large', protein: 6, cal: 72, category: 'eggs', foodAr: 'بيضة كاملة' },
  { food: 'Egg white', serving: '1 large', protein: 4, cal: 17, category: 'eggs', foodAr: 'بياض بيض' },

  // Dairy
  { food: 'Greek yogurt, nonfat', serving: '170g', protein: 17, cal: 100, category: 'dairy', foodAr: 'زبادي يوناني خالي الدسم' },
  { food: 'Cottage cheese, low-fat', serving: '100g', protein: 11, cal: 72, category: 'dairy', foodAr: 'جبنة قريش قليلة الدسم' },
  { food: 'Skim milk', serving: '240ml', protein: 8, cal: 86, category: 'dairy', foodAr: 'حليب خالي الدسم' },
  { food: 'Cheddar cheese', serving: '28g', protein: 7, cal: 113, category: 'dairy', foodAr: 'جبنة شيدر' },
  { food: 'String cheese', serving: '1 stick', protein: 7, cal: 80, category: 'dairy', foodAr: 'جبنة موزاريلا خيطية' },
  { food: 'Kefir, low-fat', serving: '240ml', protein: 11, cal: 110, category: 'dairy', foodAr: 'كفير قليل الدسم' },

  // Plant
  { food: 'Tofu, firm', serving: '100g', protein: 17, cal: 144, category: 'plant', foodAr: 'توفو متماسك' },
  { food: 'Tempeh', serving: '100g', protein: 19, cal: 192, category: 'plant', foodAr: 'تيمبي' },
  { food: 'Edamame, shelled', serving: '100g', protein: 11, cal: 121, category: 'plant', foodAr: 'إيدامامي مقشّر' },
  { food: 'Lentils, cooked', serving: '100g', protein: 9, cal: 116, category: 'plant', foodAr: 'عدس مطبوخ' },
  { food: 'Black beans, cooked', serving: '100g', protein: 9, cal: 132, category: 'plant', foodAr: 'فاصوليا سوداء مطبوخة' },
  { food: 'Chickpeas, cooked', serving: '100g', protein: 9, cal: 164, category: 'plant', foodAr: 'حمص مطبوخ' },
  { food: 'Quinoa, cooked', serving: '100g', protein: 4, cal: 120, category: 'plant', foodAr: 'كينوا مطبوخة' },
  { food: 'Peanut butter', serving: '32g', protein: 8, cal: 188, category: 'plant', foodAr: 'زبدة فول سوداني' },
  { food: 'Almonds', serving: '28g', protein: 6, cal: 164, category: 'plant', foodAr: 'لوز' },
  { food: 'Chia seeds', serving: '28g', protein: 5, cal: 138, category: 'plant', foodAr: 'بذور شيا' },
  { food: 'Hemp seeds', serving: '28g', protein: 10, cal: 166, category: 'plant', foodAr: 'بذور قنّب' },

  // Supplements
  { food: 'Whey protein isolate', serving: '30g scoop', protein: 25, cal: 110, category: 'supplement', foodAr: 'بروتين مصل اللبن المعزول (Whey)' },
  { food: 'Casein protein', serving: '30g scoop', protein: 24, cal: 120, category: 'supplement', foodAr: 'بروتين كازين' },
  { food: 'Plant protein blend', serving: '30g scoop', protein: 22, cal: 130, category: 'supplement', foodAr: 'مزيج البروتين النباتي' },
];

// ============ WORKOUT MEAL CATEGORIES ============

export interface WorkoutMealIdea {
  title: string;
  titleAr?: string;
  body: string;
  bodyAr?: string;
  protein: string;
  proteinAr?: string;
}

export const PRE_WORKOUT: WorkoutMealIdea[] = [
  { title: 'Oatmeal with whey and banana', body: '1 cup oats, 1 scoop whey, 1 banana, almond milk. Eat 60 to 90 minutes before training.', protein: '~30g protein', titleAr: 'دقيق الشوفان مع مصل اللبن والموز', bodyAr: '1 كوب شوفان، 1 ملعقة مصل اللبن، 1 موزة، حليب اللوز. تناول الطعام قبل التدريب بـ 60 إلى 90 دقيقة.', proteinAr: '~ 30 جرام بروتين' },
  { title: 'Greek yogurt bowl', body: '1 cup nonfat Greek yogurt, 1/3 cup granola, berries, honey.', protein: '~25g protein', titleAr: 'وعاء زبادي يوناني', bodyAr: '1 كوب زبادي يوناني خالي الدسم، 1/3 كوب جرانولا، توت، عسل.', proteinAr: '~25 جرام بروتين' },
  { title: 'Egg whites + toast', body: '5 egg whites + 1 whole egg, 2 slices whole-grain toast, avocado.', protein: '~28g protein', titleAr: 'بياض بيضة + خبز محمص', bodyAr: '5 بياض بيض + 1 بيضة كاملة، 2 شريحة توست من الحبوب الكاملة، أفوكادو.', proteinAr: '~28 جرام بروتين' },
  { title: 'Rice cakes with PB and whey', body: '2 rice cakes, 2 tbsp peanut butter, 1 scoop whey on the side.', protein: '~30g protein', titleAr: 'كعك الأرز مع PB ومصل اللبن', bodyAr: '2 كعكة أرز، 2 ملعقة كبيرة زبدة فول سوداني، 1 ملعقة كبيرة مصل اللبن على الجانب.', proteinAr: '~ 30 جرام بروتين' },
  { title: 'Smoothie: banana, whey, milk', body: 'Quickest option. 1 banana, 1 scoop whey, 1 cup skim milk.', protein: '~32g protein', titleAr: 'العصير: الموز، مصل اللبن، الحليب', bodyAr: 'الخيار الأسرع. 1 موزة، 1 ملعقة مصل اللبن، 1 كوب حليب خالي الدسم.', proteinAr: '~ 32 جرام بروتين' },
  { title: 'Cottage cheese with fruit', body: '1 cup low-fat cottage cheese, pineapple chunks, dash of cinnamon.', protein: '~28g protein', titleAr: 'الجبن مع الفاكهة', bodyAr: 'كوب من الجبن قليل الدسم، قطع الأناناس، رشة من القرفة.', proteinAr: '~28 جرام بروتين' },
];

export const POST_WORKOUT: WorkoutMealIdea[] = [
  { title: 'Whey shake with banana', body: '1 to 2 scoops whey, 1 banana, water or milk. Drink within 30 minutes.', protein: '~30 to 50g', titleAr: 'مصل اللبن يهز مع الموز', bodyAr: '1 إلى 2 ملعقة مصل اللبن، 1 موزة، ماء أو حليب. شرب في غضون 30 دقيقة.', proteinAr: '~ 30 إلى 50 جرام' },
  { title: 'Grilled chicken with rice', body: '200g chicken breast, 1 cup white rice, steamed broccoli.', protein: '~60g protein', titleAr: 'دجاج مشوي مع الأرز', bodyAr: '200 جرام صدر دجاج، 1 كوب أرز أبيض، بروكلي مطهو على البخار.', proteinAr: '~60 جرام بروتين' },
  { title: 'Tuna pasta', body: '1 can tuna, 1 cup cooked pasta, olive oil, lemon, peas.', protein: '~40g protein', titleAr: 'باستا التونة', bodyAr: '1 علبة تونة، 1 كوب معكرونة مطبوخة، زيت زيتون، ليمون، بازلاء.', proteinAr: '~ 40 جرام بروتين' },
  { title: 'Salmon bowl', body: '180g salmon, 1 cup rice, edamame, soy sauce, sesame.', protein: '~50g protein', titleAr: 'وعاء السلمون', bodyAr: '180 جرام سلمون، 1 كوب أرز، ادامامي، صلصة الصويا، سمسم.', proteinAr: '~50 جرام بروتين' },
  { title: 'Egg + sweet potato hash', body: '4 whole eggs, 1 medium sweet potato cubed, bell peppers, onion.', protein: '~28g protein', titleAr: 'بيضة + بطاطا حلوة', bodyAr: '4 بيضات كاملة، 1 بطاطا حلوة متوسطة الحجم، فلفل حلو، بصل.', proteinAr: '~28 جرام بروتين' },
  { title: 'Lean ground beef and rice', body: '170g 93/7 ground beef, 1 cup rice, sauteed spinach.', protein: '~50g protein', titleAr: 'لحم البقر المفروم والأرز', bodyAr: '170 جرام لحم بقري مفروم 93/7، 1 كوب أرز، سبانخ سوتيه.', proteinAr: '~50 جرام بروتين' },
];

export const RECOVERY_MEALS: WorkoutMealIdea[] = [
  { title: 'Greek yogurt + casein blend', body: '1 cup Greek yogurt + 1/2 scoop casein, mixed berries, walnuts. Eat before bed.', protein: '~35g slow-release', titleAr: 'زبادي يوناني + مزيج الكازين', bodyAr: '1 كوب زبادي يوناني + 1/2 مغرفة كازين، توت مشكل، جوز. تناول الطعام قبل النوم.', proteinAr: '~ 35 جم إطلاق بطيء' },
  { title: 'Cottage cheese with nuts', body: '1 cup cottage cheese, handful of almonds, cinnamon, drizzle of honey.', protein: '~30g protein, slow', titleAr: 'جبنة قريش مع المكسرات', bodyAr: '1 كوب جبن قريش، حفنة من اللوز، قرفة، رشة من العسل.', proteinAr: '~ 30 جرام بروتين، بطيء' },
  { title: 'Chicken bone broth + eggs', body: '300ml broth, 2 hard-boiled eggs, salt, pepper. Collagen-rich for joints.', protein: '~25g protein', titleAr: 'مرق عظم دجاج + بيض', bodyAr: '300 مل مرق، 2 بيضة مسلوقة، ملح، فلفل. غني بالكولاجين للمفاصل.', proteinAr: '~25 جرام بروتين' },
  { title: 'Tart cherry juice + casein shake', body: 'Casein shake with 200ml tart cherry juice. Reduces muscle soreness.', protein: '~25g protein', titleAr: 'عصير كرز تارت + مخفوق الكازين', bodyAr: 'مخفوق الكازين مع 200 مل من عصير الكرز. يقلل من آلام العضلات.', proteinAr: '~25 جرام بروتين' },
  { title: 'Salmon with sweet potato', body: '150g salmon, baked sweet potato, asparagus. Omega-3s + slow carbs.', protein: '~40g protein', titleAr: 'سلمون مع بطاطا حلوة', bodyAr: '150 جرام سلمون، بطاطا حلوة مخبوزة، هليون. أوميغا 3 + كربوهيدرات بطيئة.', proteinAr: '~ 40 جرام بروتين' },
  { title: 'Lentil + chicken soup', body: 'Hearty soup with shredded chicken, lentils, carrots, herbs.', protein: '~35g protein', titleAr: 'عدس + شوربة دجاج', bodyAr: 'شوربة لذيذة مع الدجاج المبشور والعدس والجزر والأعشاب.', proteinAr: '~ 35 جرام بروتين' },
];

// ============ MEAL PREP IDEAS ============

export interface MealPrepIdea {
  title: string;
  titleAr?: string;
  body: string;
  bodyAr?: string;
  yield: string;
  yieldAr?: string;
  storage: string;
  storageAr?: string;
}

export const MEAL_PREP: MealPrepIdea[] = [
  {
    title: 'Sheet-pan chicken + veg',
    body: 'Marinate 1.5 kg chicken thighs in yogurt-lemon-garlic. Roast on two sheet pans with broccoli, peppers, sweet potato cubes at 425F for 25 minutes.',
    yield: '5 servings · 40g protein each',
    storage: '5 days refrigerated · 2 months frozen',
    titleAr: 'صينية دجاج + خضار',
    bodyAr: 'انقعي 1.5 كجم من أفخاذ الدجاج في الزبادي والليمون والثوم. قم بشويها في مقالتين مع البروكلي والفلفل ومكعبات البطاطا الحلوة على حرارة 425 درجة فهرنهايت لمدة 25 دقيقة.',
    yieldAr: '5 حصص · 40 جرام بروتين لكل حصة',
    storageAr: '5 أيام مبردة · شهرين مجمدة',
  },
  {
    title: 'Mason jar overnight oats',
    body: '5 jars: 1/2 cup oats + 1/2 cup milk + 1/4 cup Greek yogurt + 1 tbsp chia + 1 scoop whey. Top with different fruit each day.',
    yield: '5 breakfasts · 30g protein each',
    storage: '5 days refrigerated',
    titleAr: 'جرة ميسون الشوفان بين عشية وضحاها',
    bodyAr: '5 برطمانات: 1/2 كوب شوفان + 1/2 كوب حليب + 1/4 كوب زبادي يوناني + 1 ملعقة كبيرة شيا + 1 ملعقة كبيرة مصل اللبن. قمة مع فاكهة مختلفة كل يوم.',
    yieldAr: '5 وجبات إفطار · 30 جرام بروتين لكل منهما',
    storageAr: '5 أيام مبردة',
  },
  {
    title: 'Big batch ground turkey chili',
    body: '1 kg lean ground turkey + 2 cans beans + 1 can tomatoes + spices in one pot. Portion into containers with rice or eat straight.',
    yield: '6 servings · 35g protein each',
    storage: '4 days refrigerated · 3 months frozen',
    titleAr: 'كمية كبيرة من الفلفل الرومي المطحون',
    bodyAr: '1 كيلو لحم رومي قليل الدهن مطحون + 2 علبة فاصوليا + 1 علبة طماطم + بهارات في وعاء واحد. قم بتوزيعه في أوعية مع الأرز أو تناوله مباشرة.',
    yieldAr: '6 حصص · 35 جرام بروتين لكل حصة',
    storageAr: '4 أيام مبردة · 3 أشهر مجمدة',
  },
  {
    title: 'Hard-boiled eggs by the dozen',
    body: 'Boil 12 eggs Sunday. Grab 2 to 3 each morning. Pre-peeled and stored in cold water in a sealed container.',
    yield: '12 eggs · 6g protein each',
    storage: '7 days refrigerated',
    titleAr: 'البيض المسلوق بالعشرات',
    bodyAr: 'اسلقي 12 بيضة يوم الأحد. تناول 2 إلى 3 كل صباح. مقشر مسبقًا ومخزن في ماء بارد في حاوية محكمة الإغلاق.',
    yieldAr: '12 بيضة · 6 جرام بروتين لكل بيضة',
    storageAr: '7 أيام مبردة',
  },
  {
    title: 'Salmon foil packets',
    body: 'Wrap 5 salmon fillets individually in foil with lemon, dill, asparagus. Freeze raw; bake one at a time as needed.',
    yield: '5 servings · 35g protein each',
    storage: '2 months frozen',
    titleAr: 'حزم رقائق السلمون',
    bodyAr: 'لف 5 شرائح سمك السلمون بشكل فردي بورق الألمنيوم مع الليمون والشبت والهليون. تجميد الخام. خبز واحدة في وقت واحد حسب الحاجة.',
    yieldAr: '5 حصص · 35 جرام بروتين لكل حصة',
    storageAr: 'شهرين مجمدة',
  },
];

// ============ GOAL-BASED PLANS ============

export interface GoalPlan {
  id: 'cut' | 'bulk' | 'maintain';
  title: string;
  titleAr?: string;
  blurb: string;
  blurbAr?: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
  sampleDay: { meal: string; food: string; macros: string }[];
}

export const GOAL_PLANS: GoalPlan[] = [
  {
    id: 'cut',
    title: 'Cut (fat loss)',
    blurb: 'Steady deficit of around 500 kcal under maintenance. High protein to spare muscle. Cardio kept moderate.',
    calories: '~1800 kcal',
    protein: '180g (2.0g/kg)',
    carbs: '170g',
    fats: '50g',
    sampleDay: [
      { meal: 'Breakfast', food: '4 egg whites + 1 whole egg + spinach + 1 slice toast', macros: '30g protein · 320 kcal' },
      { meal: 'Snack', food: 'Greek yogurt + berries', macros: '20g · 150 kcal' },
      { meal: 'Lunch', food: '170g grilled chicken + 1 cup rice + salad', macros: '50g · 500 kcal' },
      { meal: 'Pre-workout', food: '1 banana + 1 scoop whey', macros: '25g · 220 kcal' },
      { meal: 'Dinner', food: '170g salmon + roasted vegetables', macros: '40g · 480 kcal' },
      { meal: 'Before bed', food: 'Casein shake + 10 almonds', macros: '25g · 200 kcal' },
    ],
    titleAr: 'قطع (خسارة الدهون)',
    blurbAr: 'عجز مطرد يبلغ حوالي 500 سعرة حرارية تحت الصيانة. نسبة عالية من البروتين للحفاظ على العضلات. بقي القلب معتدلاً.',
  },
  {
    id: 'maintain',
    title: 'Maintain',
    blurb: 'Eat at maintenance. Keep protein high, train consistently. Best for body recomposition over time.',
    calories: '~2400 kcal',
    protein: '180g (2.0g/kg)',
    carbs: '270g',
    fats: '70g',
    sampleDay: [
      { meal: 'Breakfast', food: 'Oatmeal + whey + banana + peanut butter', macros: '35g protein · 550 kcal' },
      { meal: 'Snack', food: 'Cottage cheese + pineapple', macros: '25g · 200 kcal' },
      { meal: 'Lunch', food: '200g chicken + 1.5 cup rice + avocado + veg', macros: '55g · 700 kcal' },
      { meal: 'Pre-workout', food: 'Rice cakes + jam + whey shake', macros: '30g · 350 kcal' },
      { meal: 'Dinner', food: '200g lean beef + sweet potato + greens', macros: '50g · 600 kcal' },
    ],
    titleAr: 'يحافظ على',
    blurbAr: 'تناول الطعام في الصيانة. حافظ على نسبة عالية من البروتين، وتدرب باستمرار. الأفضل لإعادة تكوين الجسم مع مرور الوقت.',
  },
  {
    id: 'bulk',
    title: 'Bulk (muscle gain)',
    blurb: 'Surplus of 300 to 500 kcal. Carbs go up to fuel heavy lifting and recovery. Train hard, eat with intent.',
    calories: '~3000 kcal',
    protein: '200g (2.2g/kg)',
    carbs: '380g',
    fats: '90g',
    sampleDay: [
      { meal: 'Breakfast', food: '4 whole eggs + 2 slices toast + butter + avocado', macros: '35g protein · 650 kcal' },
      { meal: 'Snack', food: 'Trail mix + protein bar', macros: '25g · 400 kcal' },
      { meal: 'Lunch', food: '250g chicken + 2 cups rice + olive oil + veg', macros: '70g · 900 kcal' },
      { meal: 'Pre-workout', food: 'Banana + oats + whey', macros: '35g · 450 kcal' },
      { meal: 'Dinner', food: '250g salmon + pasta + sauce + bread', macros: '60g · 950 kcal' },
      { meal: 'Before bed', food: 'Greek yogurt + casein + almonds + honey', macros: '40g · 350 kcal' },
    ],
    titleAr: 'السائبة (زيادة العضلات)',
    blurbAr: 'فائض من 300 إلى 500 سعرة حرارية. ترتفع نسبة الكربوهيدرات إلى مستوى رفع الأثقال والتعافي. تدرب بقوة، وتناول الطعام بنية.',
  },
];

// ============ PROTEIN DRINKS & SHAKES ============

export interface DrinkRecipe {
  title: string;
  titleAr?: string;
  ingredients: string;
  ingredientsAr?: string;
  protein: string;
  vibe: 'pre' | 'post' | 'anytime' | 'meal-replace';
}

export const DRINKS: DrinkRecipe[] = [
  {
    title: 'Chocolate peanut butter shake',
    ingredients: '1 scoop chocolate whey, 1 tbsp peanut butter, 1 banana, 1 cup milk, ice',
    protein: '35g',
    vibe: 'post',
    titleAr: 'مخفوق زبدة الفول السوداني بالشوكولاتة',
    ingredientsAr: '1 ملعقة كبيرة مصل شوكولاتة، 1 ملعقة كبيرة زبدة فول سوداني، 1 موزة، 1 كوب حليب، ثلج',
  },
  {
    title: 'Berry blast smoothie',
    ingredients: '1 scoop vanilla whey, 1 cup mixed berries, 1/2 cup Greek yogurt, water, ice',
    protein: '40g',
    vibe: 'post',
    titleAr: 'عصير بيري بلاست',
    ingredientsAr: '1 ملعقة مصل فانيليا، 1 كوب توت مشكل، 1/2 كوب زبادي يوناني، ماء، ثلج',
  },
  {
    title: 'Green protein smoothie',
    ingredients: '1 scoop vanilla whey, 1 cup spinach, 1 banana, 1 tbsp almond butter, almond milk',
    protein: '30g',
    vibe: 'anytime',
    titleAr: 'عصير البروتين الأخضر',
    ingredientsAr: '1 ملعقة كبيرة مصل فانيليا، 1 كوب سبانخ، 1 موزة، 1 ملعقة كبيرة زبدة اللوز، حليب اللوز',
  },
  {
    title: 'Iced coffee protein',
    ingredients: '1 cup cold brew, 1 scoop chocolate whey, splash of milk, ice. Shake hard.',
    protein: '25g',
    vibe: 'pre',
    titleAr: 'بروتين القهوة المثلجة',
    ingredientsAr: '1 كوب مشروب بارد، 1 مغرفة مصل شوكولاتة، رشة من الحليب، ثلج. يهز بقوة.',
  },
  {
    title: 'Banana cream pie shake',
    ingredients: '1 scoop vanilla whey, 1 banana, 1/2 cup cottage cheese, milk, dash of nutmeg',
    protein: '40g',
    vibe: 'meal-replace',
    titleAr: 'هزة فطيرة كريمة الموز',
    ingredientsAr: '1 ملعقة كبيرة فانيليا، 1 موزة، 1/2 كوب جبنة قريش، حليب، رشة من جوزة الطيب',
  },
  {
    title: 'Tropical mango shake',
    ingredients: '1 scoop vanilla whey, 1 cup mango chunks, 1/2 cup pineapple, coconut water',
    protein: '28g',
    vibe: 'pre',
    titleAr: 'هزة المانجو الاستوائية',
    ingredientsAr: '1 ملعقة مصل فانيليا، 1 كوب قطع مانجو، 1/2 كوب أناناس، ماء جوز الهند',
  },
  {
    title: 'Casein bedtime pudding',
    ingredients: '1 scoop casein, 1/3 cup water (not milk). Whisk until pudding-like. Top with berries.',
    protein: '25g',
    vibe: 'post',
    titleAr: 'بودنغ الكازين قبل النوم',
    ingredientsAr: '1 مغرفة كازين، 1/3 كوب ماء (وليس حليب). خفقت حتى تشبه الحلوى. قمة مع التوت.',
  },
  {
    title: 'Mocha protein latte',
    ingredients: '1 shot espresso, 1 scoop chocolate whey, 1 cup steamed milk, sweetener',
    protein: '28g',
    vibe: 'anytime',
    titleAr: 'موكا بروتين لاتيه',
    ingredientsAr: '1 شوت إسبريسو، 1 ملعقة شوكولاتة مصل اللبن، 1 كوب حليب على البخار، محلي',
  },
  {
    title: 'Pumpkin pie shake',
    ingredients: '1 scoop vanilla whey, 1/4 cup pumpkin puree, milk, cinnamon, nutmeg, ice',
    protein: '28g',
    vibe: 'anytime',
    titleAr: 'هزة فطيرة اليقطين',
    ingredientsAr: '1 مغرفة مصل اللبن فانيليا، 1/4 كوب هريس اليقطين، حليب، قرفة، جوزة الطيب، ثلج',
  },
  {
    title: 'Strawberry cheesecake shake',
    ingredients: '1 scoop vanilla whey, 1/2 cup cottage cheese, 1 cup strawberries, milk, ice',
    protein: '40g',
    vibe: 'meal-replace',
    titleAr: 'تشيز كيك الفراولة',
    ingredientsAr: '1 ملعقة مصل فانيليا، 1/2 كوب جبنة قريش، 1 كوب فراولة، حليب، ثلج',
  },
  {
    title: 'Oats and whey blend',
    ingredients: '1 cup milk, 1/3 cup raw oats, 1 scoop whey, 1 banana. Blend smooth.',
    protein: '40g',
    vibe: 'pre',
    titleAr: 'مزيج الشوفان ومصل اللبن',
    ingredientsAr: '1 كوب حليب، 1/3 كوب شوفان خام، 1 ملعقة مصل اللبن، 1 موزة. مزيج سلس.',
  },
  {
    title: 'Plant-based berry shake',
    ingredients: '1 scoop pea protein, 1 cup mixed berries, 1 tbsp chia, almond milk',
    protein: '25g',
    vibe: 'anytime',
    titleAr: 'هزة التوت النباتية',
    ingredientsAr: '1 مغرفة بروتين البازلاء، 1 كوب توت مشكل، 1 ملعقة كبيرة شيا، حليب اللوز',
  },
  {
    title: 'Cinnamon roll shake',
    ingredients: '1 scoop vanilla whey, 1/2 cup cottage cheese, milk, cinnamon, vanilla, brown sugar substitute',
    protein: '35g',
    vibe: 'anytime',
    titleAr: 'هزة لفة القرفة',
    ingredientsAr: '1 ملعقة مصل فانيليا، 1/2 كوب جبنة قريش، حليب، قرفة، فانيليا، بديل السكر البني',
  },
  {
    title: 'Greek frappe',
    ingredients: '1 scoop chocolate whey, 1/2 cup nonfat Greek yogurt, cold coffee, ice. Frothy.',
    protein: '40g',
    vibe: 'pre',
    titleAr: 'فرابيه يونانية',
    ingredientsAr: '1 مغرفة مصل شوكولاتة، 1/2 كوب زبادي يوناني خالي الدسم، قهوة باردة، ثلج. مزبد.',
  },
  {
    title: 'Tart cherry recovery',
    ingredients: '1 scoop casein, 1/2 cup tart cherry juice, 1/2 cup milk, ice',
    protein: '25g',
    vibe: 'post',
    titleAr: 'انتعاش الكرز اللاذع',
    ingredientsAr: '1 مغرفة كازين، 1/2 كوب عصير كرز، 1/2 كوب حليب، ثلج',
  },
];

// ============ HEALTHY SNACKS ============

export interface SnackIdea {
  title: string;
  titleAr?: string;
  body: string;
  bodyAr?: string;
  protein: string;
  proteinAr?: string;
}

export const SNACKS: SnackIdea[] = [
  { title: 'Greek yogurt parfait', body: '1 cup nonfat Greek yogurt, granola, berries, honey.', protein: '20g', titleAr: 'بارفيه الزبادي اليوناني', bodyAr: '1 كوب زبادي يوناني خالي الدسم، جرانولا، توت، عسل.', proteinAr: '20 جرام' },
  { title: 'Cottage cheese with peaches', body: '1 cup low-fat cottage cheese, sliced peaches, drizzle of honey.', protein: '28g', titleAr: 'الجبن مع الخوخ', bodyAr: '1 كوب جبنة قريش قليلة الدسم، شرائح خوخ، رذاذ من العسل.', proteinAr: '28 جرام' },
  { title: 'Hard-boiled eggs + cheese', body: '2 hard-boiled eggs, 1 string cheese, an apple.', protein: '22g', titleAr: 'بيض مسلوق + جبن', bodyAr: '2 بيضة مسلوقة، 1 جبنة، تفاحة.', proteinAr: '22 جرام' },
  { title: 'Turkey + cheese rollups', body: '4 slices turkey, 2 slices cheese, mustard, optional pickle.', protein: '25g', titleAr: 'ديك رومي + رولات جبن', bodyAr: '4 شرائح ديك رومي، 2 شريحة جبن، خردل، مخلل اختياري.', proteinAr: '25 جرام' },
  { title: 'Apple + peanut butter', body: '1 apple sliced, 2 tbsp natural peanut butter.', protein: '8g', titleAr: 'التفاح + زبدة الفول السوداني', bodyAr: '1 تفاحة مقطعة إلى شرائح، 2 ملعقة كبيرة زبدة فول سوداني طبيعية.', proteinAr: '8 جرام' },
  { title: 'Edamame', body: '1 cup steamed edamame, sea salt.', protein: '17g', titleAr: 'ادامامي', bodyAr: '1 كوب ادامامي على البخار، ملح البحر.', proteinAr: '17 جرام' },
  { title: 'Tuna on cucumber slices', body: '1 can tuna mixed with Greek yogurt + dill, on thick cucumber rounds.', protein: '28g', titleAr: 'تونة على شرائح خيار', bodyAr: '1 علبة تونة ممزوجة بالزبادي اليوناني + الشبت على شكل حلقات سميكة من الخيار.', proteinAr: '28 جرام' },
  { title: 'Cottage cheese with cherry tomatoes', body: '1 cup cottage cheese, halved tomatoes, basil, black pepper.', protein: '28g', titleAr: 'جبنة قريش مع طماطم كرزية', bodyAr: '1 كوب جبنة قريش، طماطم مقطعة أنصاف، ريحان، فلفل أسود.', proteinAr: '28 جرام' },
  { title: 'Chocolate protein mug cake', body: '1 scoop chocolate whey, 1 egg, 1 tbsp cocoa, 1 tsp baking powder. Microwave 60 sec.', protein: '30g', titleAr: 'كيكة البروتين بالشوكولاتة', bodyAr: '1 ملعقة كبيرة مصل شوكولاتة، 1 بيضة، 1 ملعقة كبيرة كاكاو، 1 ملعقة صغيرة بيكنج باودر. الميكروويف 60 ثانية.', proteinAr: '30 جرام' },
  { title: 'Skyr with berries', body: '1 cup Icelandic skyr, fresh berries, cinnamon.', protein: '22g', titleAr: 'سكاير مع التوت', bodyAr: '1 كوب سكاير أيسلندي، توت طازج، قرفة.', proteinAr: '22 جرام' },
  { title: 'Beef jerky + nuts', body: '30g jerky, small handful of almonds.', protein: '20g', titleAr: 'لحم بقري متشنج + مكسرات', bodyAr: '30 جرام مقدد، حفنة صغيرة من اللوز.', proteinAr: '20 جرام' },
  { title: 'Cheese + crackers', body: '2 oz cheddar, whole-grain crackers, apple slices.', protein: '14g', titleAr: 'جبن + بسكويت', bodyAr: '2 أونصة جبنة شيدر، بسكويت الحبوب الكاملة، شرائح التفاح.', proteinAr: '14 جرام' },
  { title: 'Smoked salmon on rice cake', body: '2 rice cakes, 60g smoked salmon, cream cheese, capers.', protein: '20g', titleAr: 'سمك السلمون المدخن على كعكة الأرز', bodyAr: '2 كعكة أرز، 60 جرام سلمون مدخن، جبنة كريمية، كبر.', proteinAr: '20 جرام' },
  { title: 'Chickpea snack', body: 'Roasted chickpeas with smoked paprika and olive oil.', protein: '12g', titleAr: 'وجبة خفيفة من الحمص', bodyAr: 'حمص مشوي مع البابريكا المدخنة وزيت الزيتون.', proteinAr: '12 جرام' },
  { title: 'Egg muffins', body: '6 whole eggs, spinach, bell peppers, baked in muffin tin at 350F for 20 min. Make 6.', protein: '6g each', titleAr: 'فطائر البيض', bodyAr: '6 بيضات كاملة، سبانخ، فلفل حلو، مخبوزات في قالب المافن على حرارة 350 درجة فهرنهايت لمدة 20 دقيقة. اصنع 6.', proteinAr: '6 جرام لكل منهما' },
  { title: 'Protein oat bites', body: 'Oats, peanut butter, honey, whey powder, mini chocolate chips. Roll into balls.', protein: '8g per bite', titleAr: 'لدغات الشوفان البروتين', bodyAr: 'شوفان، زبدة الفول السوداني، عسل، مسحوق مصل اللبن، رقائق شوكولاتة صغيرة. لفة في الكرات.', proteinAr: '8 جرام لكل قضمة' },
  { title: 'Greek yogurt bark', body: 'Spread sweetened yogurt on a sheet, top with berries and granola, freeze, break.', protein: '15g per piece', titleAr: 'لحاء الزبادي اليوناني', bodyAr: 'يُوزّع الزبادي المُحلى على ورقة، ويُوضع فوقها التوت والجرانولا، ثم يُجمد ويُكسر.', proteinAr: '15 جرام لكل قطعة' },
  { title: 'Quinoa salad with feta', body: '1 cup cooked quinoa, feta, tomato, cucumber, lemon, olive oil.', protein: '14g', titleAr: 'سلطة الكينوا مع الفيتا', bodyAr: '1 كوب كينوا مطبوخة، فيتا، طماطم، خيار، ليمون، زيت زيتون.', proteinAr: '14 جرام' },
  { title: 'Bell peppers with hummus', body: 'Bell pepper sticks, 1/3 cup hummus, sprinkle of seeds.', protein: '10g', titleAr: 'فلفل رومي مع حمص', bodyAr: 'أعواد فلفل رومي، 1/3 كوب حمص، رشة بذور.', proteinAr: '10 جرام' },
  { title: 'Tempeh bites', body: 'Cubed tempeh, marinated in soy and ginger, baked or pan-fried.', protein: '20g per portion', titleAr: 'لدغات التيمبه', bodyAr: 'مكعبات تمبي متبلة بالصويا والزنجبيل، مخبوزة أو مقلية.', proteinAr: '20 جرام لكل حصة' },
];

// ============ PROTEIN BOOST SUBSTITUTIONS ============

export interface BoostSubstitution {
  swap: string;
  swapAr?: string;
  for_: string;
  for_Ar?: string;
  extra: string;
  extraAr?: string;
  note: string;
  noteAr?: string;
}

export const PROTEIN_BOOSTS: BoostSubstitution[] = [
  { swap: 'Greek yogurt', for_: 'sour cream or mayo', extra: '+8g per 1/4 cup', note: 'Works in dressings, dips, baked potatoes, and soups.', swapAr: 'الزبادي اليوناني', for_Ar: 'القشدة الحامضة أو المايونيز', extraAr: '+8 جرام لكل 1/4 كوب', noteAr: 'يعمل في الصلصات والتغميسات والبطاطس المخبوزة والحساء.' },
  { swap: 'Cottage cheese', for_: 'ricotta', extra: '+10g per 1/2 cup', note: 'Blend until smooth and use 1-for-1 in baking or lasagna.', swapAr: 'جبن', for_Ar: 'الريكوتا', extraAr: '+10 جرام لكل نصف كوب', noteAr: 'امزج حتى يصبح ناعمًا واستخدم 1 مقابل 1 في الخبز أو اللازانيا.' },
  { swap: 'Whole-wheat pasta', for_: 'regular pasta', extra: '+3g per serving', note: 'Or try chickpea/lentil pasta for +15g per serving.', swapAr: 'معكرونة القمح الكامل', for_Ar: 'المعكرونة العادية', extraAr: '+3 جرام لكل وجبة', noteAr: 'أو جرب معكرونة الحمص/العدس مقابل +15 جرام لكل حصة.' },
  { swap: 'Egg whites added to oats', for_: 'plain oats', extra: '+8g per 2 whites', note: 'Whisk in during cooking. Doubles the oat\'s protein.', swapAr: 'يضاف بياض البيض إلى الشوفان', for_Ar: 'الشوفان العادي', extraAr: '+8 جرام لكل 2 بياض', noteAr: 'خفقت أثناء الطهي. يضاعف بروتين الشوفان.' },
  { swap: 'Whey in baking', for_: 'flour, partially', extra: '+15g per cup baked good', note: 'Replace up to 1/3 of flour in muffins, pancakes, cookies.', swapAr: 'مصل اللبن في الخبز', for_Ar: 'الدقيق جزئيا', extraAr: '+15 جرام لكل كوب مخبوز جيدًا', noteAr: 'استبدل ما يصل إلى ثلث الدقيق في الكعك والفطائر والبسكويت.' },
  { swap: 'Quinoa', for_: 'rice', extra: '+3g per 1/2 cup', note: 'Great for grain bowls and stuffings.', swapAr: 'الكينوا', for_Ar: 'أرز', extraAr: '+3 جرام لكل نصف كوب', noteAr: 'رائعة لأوعية الحبوب والحشوات.' },
  { swap: 'Black beans pureed in brownies', for_: 'half the flour', extra: '+10g per pan', note: 'No one will taste them. Promise.', swapAr: 'فاصوليا سوداء مهروسة في البراونيز', for_Ar: 'نصف الدقيق', extraAr: '+10 جرام لكل مقلاة', noteAr: 'لن يتذوقهم أحد يعد.' },
  { swap: 'Edamame instead of green peas', for_: 'peas', extra: '+8g per cup', note: 'Same texture, dramatically more protein.', swapAr: 'ادامامي بدلا من البازلاء الخضراء', for_Ar: 'البازلاء', extraAr: '+8 جرام لكل كوب', noteAr: 'نفس الملمس، المزيد من البروتين بشكل كبير.' },
  { swap: 'Hemp seeds on everything', for_: '—', extra: '+10g per 3 tbsp', note: 'Salads, yogurt, oats, smoothies. Mild nutty flavor.', swapAr: 'بذور القنب على كل شيء', for_Ar: '—', extraAr: '+10 جرام لكل 3 ملاعق كبيرة', noteAr: 'السلطات، الزبادي، الشوفان، العصائر. نكهة جوزي خفيفة.' },
  { swap: 'Lentils in spaghetti sauce', for_: 'some of the ground meat', extra: '+8g per 1/2 cup added', note: 'Stretches meat, adds fiber, blends invisibly.', swapAr: 'العدس في صلصة السباغيتي', for_Ar: 'بعض اللحم المفروم', extraAr: '+8 جرام لكل نصف كوب مضاف', noteAr: 'يمد اللحوم ويضيف الألياف ويمتزج بشكل غير مرئي.' },
  { swap: 'Tofu crumbles in scrambles', for_: 'eggs, partially', extra: '+10g per 1/2 cup', note: 'Replace half the eggs with crumbled firm tofu.', swapAr: 'التوفو ينهار في يتبارى', for_Ar: 'البيض جزئيا', extraAr: '+10 جرام لكل نصف كوب', noteAr: 'استبدل نصف البيض بالتوفو الصلب المفتت.' },
  { swap: 'Bone broth instead of water', for_: 'cooking liquid', extra: '+10g per cup', note: 'Cook rice, quinoa, or pasta in it. Free protein.', swapAr: 'مرق العظام بدلا من الماء', for_Ar: 'سائل الطبخ', extraAr: '+10 جرام لكل كوب', noteAr: 'قم بطهي الأرز أو الكينوا أو المعكرونة فيه. بروتين مجاني.' },
  { swap: 'Chickpea flour in pancakes', for_: 'all-purpose flour, partially', extra: '+5g per pancake', note: 'Adds nuttiness and structure. 25% swap is invisible.', swapAr: 'دقيق الحمص في الفطائر', for_Ar: 'الدقيق لجميع الأغراض، جزئيا', extraAr: '+5 جرام لكل فطيرة', noteAr: 'يضيف الجوز والبنية. مبادلة 25% غير مرئية.' },
  { swap: 'Powdered peanut butter (PB2)', for_: 'regular PB in shakes', extra: 'Same protein, 75% less fat', note: 'Great when you want flavor without calories.', swapAr: 'زبدة الفول السوداني المطحونة (PB2)', for_Ar: 'PB العادية في الهزات', extraAr: 'نفس البروتين، 75% دهون أقل', noteAr: 'رائع عندما تريد نكهة بدون سعرات حرارية.' },
  { swap: 'Nutritional yeast', for_: 'parmesan cheese', extra: '+4g per 2 tbsp', note: 'Plus B12 and a cheesy flavor. Great on popcorn and pasta.', swapAr: 'الخميرة الغذائية', for_Ar: 'جبنة البارميزان', extraAr: '+4 جرام لكل 2 ملعقة كبيرة', noteAr: 'بالإضافة إلى B12 ونكهة الجبن. رائع على الفشار والمعكرونة.' },
];
