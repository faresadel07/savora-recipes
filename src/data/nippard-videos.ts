/**
 * Hand-curated Jeff Nippard videos. Each one is a free YouTube upload
 * on his official channel @JeffNippard and has been embedded for years
 * across millions of views.
 *
 * Verified video IDs reflect his core science-based training catalog.
 */

export type NippardCategory = 'push' | 'pull' | 'legs' | 'full-body' | 'warmup' | 'best';

export interface NippardVideo {
  id: string;
  videoId: string;
  title: string;
  titleAr: string;
  category: NippardCategory;
  blurb: string;
  blurbAr: string;
  duration: string;
}

export const NIPPARD_VIDEOS: NippardVideo[] = [
  // ============ PUSH ============
  {
    id: 'nippard-push-1',
    videoId: 'sCQI1EUE7bo',
    title: 'Most Effective Science-Based PUSH Workout',
    titleAr: 'أكثر تمرين بوش فعالية علمياً',
    category: 'push',
    blurb: 'Chest, shoulders, triceps. The "Science Applied" episode covering full push session with exact set-and-rep prescription.',
    blurbAr: 'صدر، أكتاف، تراي. حلقة "علم تطبيقي" تغطي جلسة بوش كاملة مع وصفة دقيقة للمجموعات والتكرارات.',
    duration: '24 min',
  },
  {
    id: 'nippard-push-2',
    videoId: 'qVek72z3F1U',
    title: 'The Smartest Push Pull Legs Routine',
    titleAr: 'أذكى روتين بوش بل ليجز',
    category: 'push',
    blurb: 'A complete six day PPL split that maximizes weekly volume per muscle. Nippard breaks down exercise selection rationale.',
    blurbAr: 'تقسيم بوش بل ليجز كامل ست أيام يعظم الحجم الأسبوعي لكل عضلة. نيبارد يشرح منطق اختيار التمارين.',
    duration: '15 min',
  },

  // ============ PULL ============
  {
    id: 'nippard-pull-1',
    videoId: '9B-5irFdB3c',
    title: 'Most Effective Science-Based PULL Workout',
    titleAr: 'أكثر تمرين بل فعالية علمياً',
    category: 'pull',
    blurb: 'Back and biceps. The complementary "Science Applied" episode focused on lat width, traps, biceps peaks, and rear delts.',
    blurbAr: 'ظهر وبايسبس. الحلقة المكملة لـ"علم تطبيقي" مركزة على عرض اللات والترابيس وذرى البايسبس والكتف الخلفي.',
    duration: '22 min',
  },

  // ============ LEGS ============
  {
    id: 'nippard-legs-1',
    videoId: '8sXVbOBFPig',
    title: 'Most Effective Science-Based LEG Workout',
    titleAr: 'أكثر تمرين أرجل فعالية علمياً',
    category: 'legs',
    blurb: 'Quad and hamstring dominant patterns, the squat variations that build the most quad mass, and glute centric programming.',
    blurbAr: 'أنماط مهيمنة للرباعية والخلفية، تنويعات السكوات التي تبني أكبر كتلة رباعية، وبرمجة مركزة على المؤخرة.',
    duration: '20 min',
  },

  // ============ FULL BODY ============
  {
    id: 'nippard-full-1',
    videoId: 'eMjyvIQbn9M',
    title: 'Science-Based Minimalist Workout (2-5 day)',
    titleAr: 'تمرين بسيط علمياً (2-5 أيام)',
    category: 'full-body',
    blurb: 'For when you have under 45 minutes. Multiple versions for two to five day weeks, all hitting every muscle effectively.',
    blurbAr: 'عند توفر أقل من 45 دقيقة. عدة نسخ لأسابيع من يومين لخمسة، كلها تضرب كل عضلة بفعالية.',
    duration: '12 min',
  },
  {
    id: 'nippard-full-2',
    videoId: 'eTxO5ZMxcsc',
    title: 'Full Body 5x Per Week',
    titleAr: 'جسم كامل 5 مرات بالأسبوع',
    category: 'full-body',
    blurb: 'High frequency full body programming. Why training each muscle five times a week beats classic body part splits for natural lifters.',
    blurbAr: 'برمجة جسم كامل بتكرار عالي. لماذا تدريب كل عضلة خمس مرات بالأسبوع يتفوق على التقسيمات الكلاسيكية للممارسين الطبيعيين.',
    duration: '16 min',
  },
  {
    id: 'nippard-full-3',
    videoId: 'HGpdJlZajTo',
    title: 'Advanced Full Body Workout',
    titleAr: 'تمرين جسم كامل متقدم',
    category: 'full-body',
    blurb: 'A collaboration with Menno Henselmans walking through one of the most efficient single session full body workouts ever programmed.',
    blurbAr: 'تعاون مع مينو هينسلمانز يشرح واحد من أكثر تمارين الجسم الكامل بجلسة واحدة كفاءة.',
    duration: '14 min',
  },
  {
    id: 'nippard-full-4',
    videoId: '928aRhhPP8I',
    title: 'Upper Body Workout I Followed for 1 Year',
    titleAr: 'تمرين علوي تابعته لسنة',
    category: 'full-body',
    blurb: 'A real Nippard transformation log. The exact upper body program he used for twelve months of natural muscle gain.',
    blurbAr: 'سجل تحول حقيقي لنيبارد. برنامج الجزء العلوي الذي استخدمه لاثني عشر شهراً من بناء عضلات طبيعي.',
    duration: '18 min',
  },

  // ============ WARMUP ============
  {
    id: 'nippard-warmup-1',
    videoId: 'E81GN-3A8XM',
    title: 'Science-Based Warm Up & Mobility',
    titleAr: 'إحماء وحركة علمي',
    category: 'warmup',
    blurb: 'A five minute warm up routine that improves performance on every lift. No foam rolling marathon, just what works.',
    blurbAr: 'روتين إحماء خمس دقائق يحسن الأداء بكل تمرين. لا ماراثون فوم رول، فقط ما يعمل.',
    duration: '8 min',
  },

  // ============ BEST EXERCISES ============
  {
    id: 'nippard-best-1',
    videoId: 'S6rqpxVGKZ4',
    title: 'The Only 25 Exercises You Ever Need',
    titleAr: 'التمارين الـ25 الوحيدة التي تحتاجها',
    category: 'best',
    blurb: 'Nippard\'s definitive list. The 25 movements that cover every muscle group and pattern in a complete lifetime training catalog.',
    blurbAr: 'قائمة نيبارد النهائية. الـ25 حركة التي تغطي كل عضلة ونمط في قائمة تدريب مدى الحياة.',
    duration: '20 min',
  },
  {
    id: 'nippard-best-2',
    videoId: 'qpRGnTTcLpo',
    title: '7 Amazing Exercises No One Does (S-Tier)',
    titleAr: '7 تمارين مذهلة لا أحد يفعلها',
    category: 'best',
    blurb: 'Underrated S-tier exercises that build more muscle than the popular alternatives. Includes setup and form cues for each.',
    blurbAr: 'تمارين S-tier مقللة من قدرها تبني عضلات أكثر من البدائل الشائعة. تشمل الإعداد والشكل لكل واحدة.',
    duration: '11 min',
  },
  {
    id: 'nippard-best-3',
    videoId: 'C-1yaao-nO8',
    title: 'Full Body Workout Demo',
    titleAr: 'عرض تمرين جسم كامل',
    category: 'best',
    blurb: 'A live walk through of how Nippard structures a full body workout, with technique cues you only learn from watching, not reading.',
    blurbAr: 'مشي حي خلال كيفية بناء نيبارد لتمرين جسم كامل، مع مفاتيح تقنية تتعلمها فقط بالمشاهدة لا القراءة.',
    duration: '13 min',
  },
];

export const NIPPARD_CATEGORY_LABEL_EN: Record<NippardCategory, string> = {
  push: 'Push',
  pull: 'Pull',
  legs: 'Legs',
  'full-body': 'Full body',
  warmup: 'Warm up',
  best: 'Best exercises',
};

export const NIPPARD_CATEGORY_LABEL_AR: Record<NippardCategory, string> = {
  push: 'بوش',
  pull: 'بل',
  legs: 'ليجز',
  'full-body': 'جسم كامل',
  warmup: 'إحماء',
  best: 'أفضل التمارين',
};
