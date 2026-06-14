/**
 * Hand-authored gym workout programs.
 *
 * Sources: r/Fitness wiki, Jeff Nippard's free videos, Jim Wendler's
 * 5/3/1, Cody Lefever's GZCLP, StrongLifts, Bret Contreras (Strong
 * Curves), Greg Nuckols, Mike Israetel, Athlean-X. Every program here
 * has been openly published by its author; we credit and link out.
 *
 * Exercise IDs reference free-exercise-db where possible. When the
 * library doesn't carry a movement we leave the exercise as a string
 * label and the UI renders a textual chip instead of a thumbnail.
 */

export type ProgramLevel = 'beginner' | 'intermediate' | 'advanced';
export type ProgramGoal = 'strength' | 'hypertrophy' | 'both';
export type SplitKind =
  | 'full-body'
  | 'upper-lower'
  | 'ppl'
  | 'bro-split'
  | 'arnold'
  | 'specialization';

export interface ProgrammedExercise {
  /** Free-exercise-db id when available, otherwise a free text label. */
  exerciseId: string;
  name: string;
  nameAr: string;
  sets: number;
  /** Either a rep range "8-12" or comma-separated reps "5,5,5,5,5". */
  reps: string;
  /** Rest target in plain text, both languages. */
  rest: string;
  restAr: string;
  /** Target RPE or RIR, plain text. */
  rpe: string;
  notes?: string;
  notesAr?: string;
}

export interface WorkoutDay {
  name: string;
  nameAr: string;
  exercises: ProgrammedExercise[];
}

export interface WorkoutProgram {
  id: string;
  name: string;
  nameAr: string;
  author: string;
  authorUrl?: string;
  level: ProgramLevel;
  goal: ProgramGoal;
  split: SplitKind;
  daysPerWeek: number;
  weeks: number;
  blurb: string;
  blurbAr: string;
  /** YouTube id of a free overview / explainer video. */
  videoId?: string;
  /** One-line progression rule, e.g. "+2.5 kg upper body each week". */
  progression: string;
  progressionAr: string;
  days: WorkoutDay[];
}

// ============================================================
// Reusable exercise references (so we don't repeat ourselves)
// ============================================================

function ex(
  id: string,
  name: string,
  nameAr: string,
  sets: number,
  reps: string,
  rpe: string,
  rest: string,
  restAr: string,
  notes?: string,
  notesAr?: string,
): ProgrammedExercise {
  return { exerciseId: id, name, nameAr, sets, reps, rest, restAr, rpe, notes, notesAr };
}

// ============================================================
// THE 8 MAIN PROGRAMS
// ============================================================

export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  // -------- 1. Full Body 3-day (Ramadan default) --------
  {
    id: 'full-body-3day',
    name: 'Full Body 3-Day',
    nameAr: 'برنامج الجسم الكامل 3 أيام',
    author: 'Jeff Nippard',
    authorUrl: 'https://www.youtube.com/@JeffNippard',
    level: 'beginner',
    goal: 'both',
    split: 'full-body',
    daysPerWeek: 3,
    weeks: 12,
    blurb: 'Three full body sessions per week. The most time efficient program for newcomers. The Ramadan default: short, sharp, sustainable.',
    blurbAr: 'ثلاث جلسات للجسم الكامل كل أسبوع. أكثر برنامج موفر للوقت للمبتدئين. الخيار الافتراضي لرمضان: قصير، حاد، مستدام.',
    videoId: 'eMjyvIQbn9M',
    progression: 'Add 2.5 kg to upper body lifts and 5 kg to lower body lifts whenever you complete all sets at RPE 8 or lower.',
    progressionAr: 'أضف 2.5 كغ لتمارين الجزء العلوي و5 كغ لتمارين الأسفل كلما أنهيت كل المجموعات بـ RPE 8 أو أقل.',
    days: [
      {
        name: 'Day A',
        nameAr: 'اليوم الأول',
        exercises: [
          ex('Barbell_Squat', 'Barbell Squat', 'سكوات بالبار', 3, '6-8', '7-8', '3 min', '3 دقائق', 'Brace, knees track over toes', 'شد، الركب تتبع أصابع القدم'),
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press', 'بنش برس', 3, '6-8', '7-8', '3 min', '3 دقائق'),
          ex('Bent_Over_Barbell_Row', 'Bent Over Row', 'سحب بالبار منحني', 3, '6-8', '7-8', '3 min', '3 دقائق'),
          ex('Romanian_Deadlift', 'Romanian Deadlift', 'ديدلفت روماني', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Standing_Military_Press', 'Overhead Press', 'بريس فوق الرأس', 3, '8-10', '7-8', '2 min', '2 دقائق'),
          ex('Plank', 'Plank', 'بلانك', 3, '30-60 sec', '8', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day B',
        nameAr: 'اليوم الثاني',
        exercises: [
          ex('Conventional_Deadlift', 'Deadlift', 'ديدلفت', 3, '5', '7-8', '3-4 min', '3-4 دقائق'),
          ex('Incline_Dumbbell_Press', 'Incline Dumbbell Press', 'بنش مائل دامبل', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Pullups', 'Pull Up or Lat Pulldown', 'عقلة أو لات بولداون', 3, '8-12', '8', '2 min', '2 دقائق'),
          ex('Leg_Press', 'Leg Press', 'ليج برس', 3, '10-12', '8', '2 min', '2 دقائق'),
          ex('Side_Lateral_Raise', 'Lateral Raise', 'رفرفة جانبية', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Dumbbell_Bicep_Curl', 'Dumbbell Curl', 'دامبل بايسبس', 3, '10-12', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day C',
        nameAr: 'اليوم الثالث',
        exercises: [
          ex('Barbell_Front_Squat', 'Front Squat', 'سكوات أمامي', 3, '6-8', '7-8', '3 min', '3 دقائق'),
          ex('Close-Grip_Bench_Press', 'Close Grip Bench', 'بنش قبضة ضيقة', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Seated_Cable_Rows', 'Cable Row', 'كابل رو جالس', 3, '10-12', '8', '2 min', '2 دقائق'),
          ex('Walking_Lunge', 'Walking Lunge', 'لانج مشي', 3, '10 per leg', '8', '2 min', '2 دقائق'),
          ex('Face_Pull', 'Face Pull', 'فيس بول', 3, '15-20', '8-9', '60 sec', '60 ثانية'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
    ],
  },

  // -------- 2. Upper / Lower 4-day --------
  {
    id: 'upper-lower-4day',
    name: 'Upper / Lower 4-Day',
    nameAr: 'علوي/سفلي 4 أيام',
    author: 'Jeff Nippard inspired',
    authorUrl: 'https://www.youtube.com/@JeffNippard',
    level: 'intermediate',
    goal: 'both',
    split: 'upper-lower',
    daysPerWeek: 4,
    weeks: 12,
    blurb: 'The best all rounder for intermediate lifters. Two upper body and two lower body sessions per week, 10 to 16 sets per muscle.',
    blurbAr: 'أحسن خيار للممارسين المتوسطين. علوي يومين وسفلي يومين بالأسبوع، 10 إلى 16 مجموعة لكل عضلة.',
    videoId: '928aRhhPP8I',
    progression: 'Linear: add weight every week. When you stall on a lift, drop 10 percent and rebuild.',
    progressionAr: 'تقدم خطي: أضف وزناً كل أسبوع. عند التوقف على تمرين، انزل 10 بالمئة وأعد البناء.',
    days: [
      {
        name: 'Upper A',
        nameAr: 'علوي أ',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press', 'بنش برس', 4, '6-8', '7-9', '3 min', '3 دقائق'),
          ex('Bent_Over_Barbell_Row', 'Barbell Row', 'سحب بالبار', 4, '6-8', '7-9', '3 min', '3 دقائق'),
          ex('Standing_Military_Press', 'Overhead Press', 'بريس فوق الرأس', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Pullups', 'Pull Ups', 'عقلة', 3, 'AMRAP', '8-9', '2 min', '2 دقائق'),
          ex('Dumbbell_Bicep_Curl', 'Incline Dumbbell Curl', 'بايسبس مائل دامبل', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Skullcrushers', 'Skullcrushers', 'سكول كرشر', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Lower A',
        nameAr: 'سفلي أ',
        exercises: [
          ex('Barbell_Squat', 'Back Squat', 'سكوات خلفي', 4, '6-8', '7-8', '3 min', '3 دقائق'),
          ex('Romanian_Deadlift', 'Romanian Deadlift', 'ديدلفت روماني', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Leg_Press', 'Leg Press', 'ليج برس', 3, '10-12', '8', '2 min', '2 دقائق'),
          ex('Leg_Curl', 'Lying Leg Curl', 'ليج كيرل', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Standing_Calf_Raises', 'Calf Raise', 'سمانة', 4, '10-15', '8-9', '60 sec', '60 ثانية'),
          ex('Hanging_Leg_Raise', 'Hanging Leg Raise', 'رفع الرجلين معلقاً', 3, '10-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Upper B',
        nameAr: 'علوي ب',
        exercises: [
          ex('Incline_Dumbbell_Press', 'Incline Dumbbell Press', 'بنش مائل دامبل', 4, '8-10', '7-9', '2-3 min', '2-3 دقائق'),
          ex('Seated_Cable_Rows', 'Cable Row', 'كابل رو جالس', 4, '8-10', '7-9', '2-3 min', '2-3 دقائق'),
          ex('Side_Lateral_Raise', 'Lateral Raise', 'رفرفة جانبية', 4, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Wide_Grip_Lat_Pulldown', 'Lat Pulldown', 'لات بولداون', 3, '10-12', '8', '90 sec', '90 ثانية'),
          ex('Hammer_Curls', 'Hammer Curl', 'بايسبس هامر', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Lower B',
        nameAr: 'سفلي ب',
        exercises: [
          ex('Conventional_Deadlift', 'Deadlift', 'ديدلفت', 4, '5', '8', '3-4 min', '3-4 دقائق'),
          ex('Barbell_Front_Squat', 'Front Squat', 'سكوات أمامي', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Walking_Lunge', 'Walking Lunge', 'لانج مشي', 3, '12 per leg', '8', '90 sec', '90 ثانية'),
          ex('Glute_Ham_Raise', 'Glute Ham Raise', 'غلوت هام رايز', 3, '8-10', '8-9', '90 sec', '90 ثانية'),
          ex('Seated_Calf_Raise', 'Seated Calf Raise', 'سمانة جالس', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
          ex('Cable_Crunch', 'Cable Crunch', 'كرنش كابل', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
    ],
  },

  // -------- 3. PPL 6-day Metallicadpa --------
  {
    id: 'ppl-6day-metallicadpa',
    name: 'PPL 6-Day (Metallicadpa)',
    nameAr: 'بوش بل ليجز 6 أيام',
    author: 'Metallicadpa (r/Fitness)',
    authorUrl: 'https://thefitness.wiki/routines/r-ppl/',
    level: 'advanced',
    goal: 'both',
    split: 'ppl',
    daysPerWeek: 6,
    weeks: 12,
    blurb: 'The internet legend. Six day hybrid hypertrophy strength, two times per muscle group per week. The 250,000 upvote routine from r/Fitness.',
    blurbAr: 'الأسطورة. ستة أيام، هايبرتروفي وقوة، عضلتين بالأسبوع. روتين r/Fitness الذي حصل على 250 ألف صوت إيجابي.',
    videoId: 'qVek72z3F1U',
    progression: 'Compounds: 5 rep PRs every cycle. Accessories: when you hit the top of the rep range for all sets, add 2.5 kg next session.',
    progressionAr: 'مركبة: أرقام قياسية بـ 5 تكرارات كل دورة. مساعدة: عند الوصول لأعلى نطاق التكرار، أضف 2.5 كغ الجلسة القادمة.',
    days: [
      {
        name: 'Push A (Heavy)',
        nameAr: 'بوش أ (ثقيل)',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press', 'بنش برس', 1, '5-8', '8', '3-4 min', '3-4 دقائق', 'Top set then back off', 'مجموعة أعلى ثم تقليل'),
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press back off', 'بنش برس تقليل', 3, '8-12', '7-8', '2 min', '2 دقائق'),
          ex('Standing_Military_Press', 'Overhead Press', 'بريس فوق الرأس', 4, '5-8', '7-8', '3 min', '3 دقائق'),
          ex('Incline_Dumbbell_Press', 'Incline Dumbbell Press', 'بنش مائل دامبل', 3, '10-12', '8-9', '2 min', '2 دقائق'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 3, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Skullcrushers', 'Overhead Triceps Extension', 'تراي فوق الرأس', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Side_Lateral_Raise', 'Lateral Raise', 'رفرفة جانبية', 4, '12-20', '9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Pull A (Heavy)',
        nameAr: 'بل أ (ثقيل)',
        exercises: [
          ex('Bent_Over_Barbell_Row', 'Barbell Row', 'سحب بالبار', 4, '5-8', '7-8', '3 min', '3 دقائق'),
          ex('Pullups', 'Pull Ups (weighted if possible)', 'عقلة (بوزن لو ممكن)', 4, '6-10', '8', '3 min', '3 دقائق'),
          ex('Seated_Cable_Rows', 'Cable Row', 'كابل رو جالس', 3, '10-12', '8-9', '2 min', '2 دقائق'),
          ex('Face_Pull', 'Face Pull', 'فيس بول', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
          ex('Hammer_Curls', 'Hammer Curl', 'بايسبس هامر', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Dumbbell_Bicep_Curl', 'Dumbbell Curl', 'بايسبس دامبل', 3, '10-15', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Legs A (Heavy)',
        nameAr: 'ليجز أ (ثقيل)',
        exercises: [
          ex('Barbell_Squat', 'Back Squat', 'سكوات خلفي', 1, '5-8', '8', '4 min', '4 دقائق', 'Top set, full depth', 'مجموعة أعلى، عمق كامل'),
          ex('Barbell_Squat', 'Squat back off', 'سكوات تقليل', 3, '8-12', '7-8', '3 min', '3 دقائق'),
          ex('Romanian_Deadlift', 'Romanian Deadlift', 'ديدلفت روماني', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Leg_Press', 'Leg Press', 'ليج برس', 3, '12-15', '8-9', '2 min', '2 دقائق'),
          ex('Leg_Curl', 'Leg Curl', 'ليج كيرل', 4, '10-15', '8-9', '90 sec', '90 ثانية'),
          ex('Standing_Calf_Raises', 'Calf Raise', 'سمانة', 5, '10-20', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Push B (Volume)',
        nameAr: 'بوش ب (حجم)',
        exercises: [
          ex('Standing_Military_Press', 'Overhead Press top set', 'بريس فوق الرأس مجموعة أعلى', 1, '5-8', '8', '3 min', '3 دقائق'),
          ex('Incline_Dumbbell_Press', 'Incline DB Bench', 'بنش مائل دامبل', 4, '8-12', '7-9', '2-3 min', '2-3 دقائق'),
          ex('Dumbbell_Flyes', 'Cable Fly', 'كابل فلاي', 3, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Side_Lateral_Raise', 'Lateral Raise', 'رفرفة جانبية', 4, '12-20', '9', '60 sec', '60 ثانية'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 4, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Dumbbell_Bench_Press', 'Dumbbell Bench Press', 'بنش دامبل', 3, '10-12', '8-9', '2 min', '2 دقائق'),
        ],
      },
      {
        name: 'Pull B (Volume)',
        nameAr: 'بل ب (حجم)',
        exercises: [
          ex('Conventional_Deadlift', 'Deadlift', 'ديدلفت', 1, '5', '8-9', '4 min', '4 دقائق', 'Top set only', 'مجموعة أعلى فقط'),
          ex('Pullups', 'Pull Ups', 'عقلة', 4, '8-12', '8', '3 min', '3 دقائق'),
          ex('Seated_Cable_Rows', 'Cable Row', 'كابل رو', 4, '10-12', '8-9', '2 min', '2 دقائق'),
          ex('Wide_Grip_Lat_Pulldown', 'Lat Pulldown', 'لات بولداون', 3, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Face_Pull', 'Face Pull', 'فيس بول', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
          ex('Dumbbell_Bicep_Curl', 'EZ Bar Curl', 'بايسبس EZ', 4, '10-15', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Legs B (Volume)',
        nameAr: 'ليجز ب (حجم)',
        exercises: [
          ex('Barbell_Front_Squat', 'Front Squat', 'سكوات أمامي', 4, '8-10', '8', '3 min', '3 دقائق'),
          ex('Romanian_Deadlift', 'Romanian Deadlift', 'ديدلفت روماني', 3, '10-12', '8', '2 min', '2 دقائق'),
          ex('Walking_Lunge', 'Walking Lunge', 'لانج مشي', 3, '12 per leg', '8-9', '2 min', '2 دقائق'),
          ex('Leg_Extensions', 'Leg Extension', 'ليج إكستنشن', 4, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Glute_Ham_Raise', 'Glute Ham Raise', 'غلوت هام رايز', 3, '8-12', '8-9', '90 sec', '90 ثانية'),
          ex('Seated_Calf_Raise', 'Seated Calf Raise', 'سمانة جالس', 5, '15-20', '8-9', '60 sec', '60 ثانية'),
        ],
      },
    ],
  },

  // -------- 4. PPL 3-day light --------
  {
    id: 'ppl-3day',
    name: 'PPL 3-Day',
    nameAr: 'بوش بل ليجز 3 أيام',
    author: 'r/Fitness wiki',
    authorUrl: 'https://thefitness.wiki/routines/r-ppl/',
    level: 'beginner',
    goal: 'hypertrophy',
    split: 'ppl',
    daysPerWeek: 3,
    weeks: 12,
    blurb: 'A scaled down Push Pull Legs for limited time. Three days a week, one session per muscle. Easy to recover from.',
    blurbAr: 'نسخة مختصرة من بوش بل ليجز للوقت المحدود. ثلاث جلسات بالأسبوع، عضلة واحدة بكل جلسة. سهل التعافي.',
    progression: 'Add 2.5 kg on compounds when you complete all reps. Accessories: add a rep until you reach the top of the range, then add weight.',
    progressionAr: 'أضف 2.5 كغ على المركبة عند إنهاء كل التكرارات. المساعدة: زد تكرار حتى أعلى النطاق ثم أضف وزناً.',
    days: [
      {
        name: 'Push',
        nameAr: 'بوش',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press', 'بنش برس', 4, '6-8', '7-8', '3 min', '3 دقائق'),
          ex('Standing_Military_Press', 'Overhead Press', 'بريس فوق الرأس', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Incline_Dumbbell_Press', 'Incline DB Press', 'بنش مائل دامبل', 3, '10-12', '8', '2 min', '2 دقائق'),
          ex('Side_Lateral_Raise', 'Lateral Raise', 'رفرفة جانبية', 4, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 4, '10-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Pull',
        nameAr: 'بل',
        exercises: [
          ex('Bent_Over_Barbell_Row', 'Barbell Row', 'سحب بالبار', 4, '6-8', '7-8', '3 min', '3 دقائق'),
          ex('Pullups', 'Pull Up or Lat Pulldown', 'عقلة أو لات بولداون', 4, '8-12', '8', '2-3 min', '2-3 دقائق'),
          ex('Seated_Cable_Rows', 'Cable Row', 'كابل رو', 3, '10-12', '8', '2 min', '2 دقائق'),
          ex('Face_Pull', 'Face Pull', 'فيس بول', 3, '15-20', '8-9', '60 sec', '60 ثانية'),
          ex('Dumbbell_Bicep_Curl', 'Dumbbell Curl', 'بايسبس دامبل', 4, '10-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Legs',
        nameAr: 'ليجز',
        exercises: [
          ex('Barbell_Squat', 'Squat', 'سكوات', 4, '6-8', '7-8', '3 min', '3 دقائق'),
          ex('Romanian_Deadlift', 'Romanian Deadlift', 'ديدلفت روماني', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Leg_Press', 'Leg Press', 'ليج برس', 3, '10-12', '8', '2 min', '2 دقائق'),
          ex('Leg_Curl', 'Leg Curl', 'ليج كيرل', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Standing_Calf_Raises', 'Calf Raise', 'سمانة', 4, '10-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
    ],
  },

  // -------- 5. 5/3/1 for Beginners --------
  {
    id: 'wendler-531-beginners',
    name: '5/3/1 for Beginners',
    nameAr: '5/3/1 للمبتدئين',
    author: 'Jim Wendler',
    authorUrl: 'https://www.jimwendler.com',
    level: 'beginner',
    goal: 'strength',
    split: 'full-body',
    daysPerWeek: 3,
    weeks: 12,
    blurb: 'Wendler\'s classic linear strength program. Three sessions a week, big lifts at percentage of your one rep max, progressed monthly.',
    blurbAr: 'برنامج وندلر الكلاسيكي للقوة الخطي. ثلاث جلسات بالأسبوع، تمارين كبيرة بنسبة من أقصى رفعة، تقدم شهري.',
    progression: 'Each 4 week cycle: Week 1 65/75/85, Week 2 70/80/90, Week 3 75/85/95, Week 4 deload. Add 2.5 kg upper / 5 kg lower to training max next cycle.',
    progressionAr: 'كل دورة 4 أسابيع: أسبوع 1 (65/75/85%)، أسبوع 2 (70/80/90%)، أسبوع 3 (75/85/95%)، أسبوع 4 تخفيف. أضف 2.5 كغ علوي / 5 كغ سفلي للحد الأقصى للتدريب.',
    days: [
      {
        name: 'Squat Day',
        nameAr: 'يوم السكوات',
        exercises: [
          ex('Barbell_Squat', 'Squat (5/3/1 main)', 'سكوات (5/3/1)', 3, '5,3,1+', '8', '4 min', '4 دقائق', 'Last set is AMRAP', 'المجموعة الأخيرة أكثر تكرار ممكن'),
          ex('Barbell_Squat', 'Squat 5x5 at 65%', 'سكوات 5x5 على 65%', 5, '5', '7-8', '3 min', '3 دقائق'),
          ex('Walking_Lunge', 'Walking Lunge', 'لانج مشي', 3, '10 per leg', '7-8', '2 min', '2 دقائق'),
          ex('Hanging_Leg_Raise', 'Hanging Leg Raise', 'رفع الرجلين معلقاً', 5, '10-15', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Bench Day',
        nameAr: 'يوم البنش',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench (5/3/1 main)', 'بنش (5/3/1)', 3, '5,3,1+', '8', '4 min', '4 دقائق'),
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench 5x5 at 65%', 'بنش 5x5 على 65%', 5, '5', '7-8', '3 min', '3 دقائق'),
          ex('Bent_Over_Barbell_Row', 'Barbell Row', 'سحب بالبار', 5, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Pullups', 'Pull Up', 'عقلة', 5, 'AMRAP', '8-9', '2 min', '2 دقائق'),
        ],
      },
      {
        name: 'Deadlift Day',
        nameAr: 'يوم الديدلفت',
        exercises: [
          ex('Conventional_Deadlift', 'Deadlift (5/3/1 main)', 'ديدلفت (5/3/1)', 3, '5,3,1+', '8', '4 min', '4 دقائق'),
          ex('Conventional_Deadlift', 'Deadlift 5x5 at 65%', 'ديدلفت 5x5 على 65%', 5, '5', '7-8', '3 min', '3 دقائق'),
          ex('Standing_Military_Press', 'Overhead Press', 'بريس فوق الرأس', 5, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Dumbbell_Bicep_Curl', 'Dumbbell Curl', 'بايسبس دامبل', 5, '10-15', '8-9', '90 sec', '90 ثانية'),
        ],
      },
    ],
  },

  // -------- 6. GZCLP --------
  {
    id: 'gzclp',
    name: 'GZCLP',
    nameAr: 'جي زي سي إل بي',
    author: 'Cody Lefever',
    authorUrl: 'https://thefitness.wiki/routines/gzclp/',
    level: 'intermediate',
    goal: 'strength',
    split: 'upper-lower',
    daysPerWeek: 4,
    weeks: 16,
    blurb: 'GZCL Linear Progression. Tier 1 heavy strength, Tier 2 hypertrophy, Tier 3 accessory volume. Four day cycle, all three tiers each week.',
    blurbAr: 'تدرج خطي جي زي سي إل. الطبقة 1 قوة ثقيلة، الطبقة 2 هايبرتروفي، الطبقة 3 حجم مساعد. دورة 4 أيام، الطبقات الثلاث كل أسبوع.',
    progression: 'T1 5x3+: when you complete all sets, switch to 6x2 then 10x1, then test new 1RM. T2 3x10: add weight every session. T3 3x15+: AMRAP last set.',
    progressionAr: 'T1 5x3+: عند إنهاء كل المجموعات، انتقل لـ 6x2 ثم 10x1 ثم اختبر أقصى رفعة جديدة. T2 3x10: أضف وزناً كل جلسة. T3 3x15+: المجموعة الأخيرة أكثر تكرار ممكن.',
    days: [
      {
        name: 'Day A1',
        nameAr: 'اليوم أ1',
        exercises: [
          ex('Barbell_Squat', 'T1 Squat', 'T1 سكوات', 5, '3+', '8', '3-4 min', '3-4 دقائق'),
          ex('Barbell_Bench_Press_-_Medium_Grip', 'T2 Bench', 'T2 بنش', 3, '10', '7-8', '2 min', '2 دقائق'),
          ex('Wide_Grip_Lat_Pulldown', 'T3 Lat Pulldown', 'T3 لات بولداون', 3, '15+', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Day B1',
        nameAr: 'اليوم ب1',
        exercises: [
          ex('Standing_Military_Press', 'T1 Overhead Press', 'T1 بريس فوق الرأس', 5, '3+', '8', '3-4 min', '3-4 دقائق'),
          ex('Conventional_Deadlift', 'T2 Deadlift', 'T2 ديدلفت', 3, '10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Bent_Over_Barbell_Row', 'T3 Row', 'T3 سحب', 3, '15+', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Day A2',
        nameAr: 'اليوم أ2',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'T1 Bench', 'T1 بنش', 5, '3+', '8', '3-4 min', '3-4 دقائق'),
          ex('Barbell_Squat', 'T2 Squat', 'T2 سكوات', 3, '10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Pullups', 'T3 Pull Ups', 'T3 عقلة', 3, '15+', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Day B2',
        nameAr: 'اليوم ب2',
        exercises: [
          ex('Conventional_Deadlift', 'T1 Deadlift', 'T1 ديدلفت', 5, '3+', '8', '4 min', '4 دقائق'),
          ex('Standing_Military_Press', 'T2 Overhead Press', 'T2 بريس فوق الرأس', 3, '10', '7-8', '2 min', '2 دقائق'),
          ex('Bent_Over_Barbell_Row', 'T3 Row', 'T3 سحب', 3, '15+', '8-9', '90 sec', '90 ثانية'),
        ],
      },
    ],
  },

  // -------- 7. StrongLifts 5x5 --------
  {
    id: 'stronglifts-5x5',
    name: 'StrongLifts 5x5',
    nameAr: 'سترونغ ليفتس 5x5',
    author: 'Mehdi Hadim',
    authorUrl: 'https://stronglifts.com',
    level: 'beginner',
    goal: 'strength',
    split: 'full-body',
    daysPerWeek: 3,
    weeks: 12,
    blurb: 'The simplest strength program ever shipped. Two workouts (A and B) alternated, five compound lifts at 5 sets of 5, add weight every session.',
    blurbAr: 'أبسط برنامج قوة طُبع. تمرينان (أ و ب) متناوبان، خمسة تمارين مركبة 5 مجموعات × 5 تكرارات، أضف وزناً كل جلسة.',
    progression: 'Add 2.5 kg every session on all lifts. If you fail an exercise 3 sessions in a row, deload 10 percent on that lift only.',
    progressionAr: 'أضف 2.5 كغ كل جلسة على كل التمارين. عند الفشل بتمرين 3 جلسات متتالية، خفّف 10 بالمئة على ذلك التمرين فقط.',
    days: [
      {
        name: 'Workout A',
        nameAr: 'تمرين أ',
        exercises: [
          ex('Barbell_Squat', 'Squat', 'سكوات', 5, '5', '7-8', '3-5 min', '3-5 دقائق'),
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press', 'بنش برس', 5, '5', '7-8', '3-5 min', '3-5 دقائق'),
          ex('Bent_Over_Barbell_Row', 'Barbell Row', 'سحب بالبار', 5, '5', '7-8', '3 min', '3 دقائق'),
        ],
      },
      {
        name: 'Workout B',
        nameAr: 'تمرين ب',
        exercises: [
          ex('Barbell_Squat', 'Squat', 'سكوات', 5, '5', '7-8', '3-5 min', '3-5 دقائق'),
          ex('Standing_Military_Press', 'Overhead Press', 'بريس فوق الرأس', 5, '5', '7-8', '3-5 min', '3-5 دقائق'),
          ex('Conventional_Deadlift', 'Deadlift', 'ديدلفت', 1, '5', '8', '5 min', '5 دقائق', 'One working set only', 'مجموعة عمل واحدة فقط'),
        ],
      },
    ],
  },

  // -------- 8. Arnold Split 6-day --------
  {
    id: 'arnold-split-6day',
    name: 'Arnold Split 6-Day',
    nameAr: 'تقسيم أرنولد 6 أيام',
    author: 'Arnold Schwarzenegger',
    level: 'advanced',
    goal: 'hypertrophy',
    split: 'arnold',
    daysPerWeek: 6,
    weeks: 12,
    blurb: 'Chest with Back, Shoulders with Arms, Legs alone. The antagonist pairing classic that built generations of bodybuilders.',
    blurbAr: 'صدر مع ظهر، أكتاف مع أيدين، أرجل لحالها. كلاسيكي تقابل العضلات الذي بنى أجيالاً من لاعبي كمال الأجسام.',
    progression: 'Volume focus: aim for double progression. Hit the top of the rep range for all sets, then add 2.5 kg next session.',
    progressionAr: 'التركيز على الحجم: تقدم مزدوج. اضرب أعلى نطاق التكرار لكل المجموعات ثم أضف 2.5 كغ الجلسة القادمة.',
    days: [
      {
        name: 'Day 1: Chest + Back',
        nameAr: 'اليوم 1: صدر + ظهر',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press', 'بنش برس', 4, '6-8', '8', '3 min', '3 دقائق'),
          ex('Incline_Dumbbell_Press', 'Incline DB Press', 'بنش مائل دامبل', 4, '8-12', '8-9', '2 min', '2 دقائق'),
          ex('Pullups', 'Wide Grip Pull Up', 'عقلة قبضة عريضة', 4, '8-12', '8-9', '2-3 min', '2-3 دقائق'),
          ex('Bent_Over_Barbell_Row', 'Barbell Row', 'سحب بالبار', 4, '8-10', '8-9', '2-3 min', '2-3 دقائق'),
          ex('Dumbbell_Flyes', 'Cable Fly', 'كابل فلاي', 3, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Seated_Cable_Rows', 'Seated Cable Row', 'كابل رو جالس', 3, '12-15', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Day 2: Shoulders + Arms',
        nameAr: 'اليوم 2: أكتاف + أيدين',
        exercises: [
          ex('Standing_Military_Press', 'Overhead Press', 'بريس فوق الرأس', 4, '8-10', '8', '2-3 min', '2-3 دقائق'),
          ex('Side_Lateral_Raise', 'Lateral Raise', 'رفرفة جانبية', 4, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Face_Pull', 'Face Pull', 'فيس بول', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
          ex('Dumbbell_Bicep_Curl', 'Dumbbell Curl', 'بايسبس دامبل', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Hammer_Curls', 'Hammer Curl', 'بايسبس هامر', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Skullcrushers', 'Skullcrushers', 'سكول كرشر', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 3: Legs',
        nameAr: 'اليوم 3: أرجل',
        exercises: [
          ex('Barbell_Squat', 'Squat', 'سكوات', 5, '6-8', '8', '3-4 min', '3-4 دقائق'),
          ex('Leg_Press', 'Leg Press', 'ليج برس', 4, '10-12', '8-9', '2-3 min', '2-3 دقائق'),
          ex('Romanian_Deadlift', 'Romanian Deadlift', 'ديدلفت روماني', 4, '8-10', '8', '2-3 min', '2-3 دقائق'),
          ex('Leg_Extensions', 'Leg Extension', 'ليج إكستنشن', 4, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Leg_Curl', 'Leg Curl', 'ليج كيرل', 4, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Standing_Calf_Raises', 'Standing Calf Raise', 'سمانة وقوف', 5, '10-15', '8-9', '60 sec', '60 ثانية'),
          ex('Seated_Calf_Raise', 'Seated Calf Raise', 'سمانة جالس', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 4: Chest + Back',
        nameAr: 'اليوم 4: صدر + ظهر',
        exercises: [
          ex('Incline_Dumbbell_Press', 'Incline DB Press', 'بنش مائل دامبل', 4, '8-10', '8', '2-3 min', '2-3 دقائق'),
          ex('Dumbbell_Bench_Press', 'Flat DB Press', 'بنش دامبل مسطح', 4, '10-12', '8-9', '2 min', '2 دقائق'),
          ex('Pullups', 'Pull Up', 'عقلة', 4, '8-12', '8-9', '2-3 min', '2-3 دقائق'),
          ex('Wide_Grip_Lat_Pulldown', 'Lat Pulldown', 'لات بولداون', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Dumbbell_Flyes', 'Dumbbell Fly', 'دامبل فلاي', 3, '12-15', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Day 5: Shoulders + Arms',
        nameAr: 'اليوم 5: أكتاف + أيدين',
        exercises: [
          ex('Standing_Military_Press', 'Seated DB Press', 'بريس دامبل جالس', 4, '8-10', '8', '2 min', '2 دقائق'),
          ex('Side_Lateral_Raise', 'Lateral Raise', 'رفرفة جانبية', 5, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Face_Pull', 'Face Pull', 'فيس بول', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
          ex('Dumbbell_Bicep_Curl', 'EZ Bar Curl', 'بايسبس EZ', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 4, '12-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 6: Legs',
        nameAr: 'اليوم 6: أرجل',
        exercises: [
          ex('Barbell_Front_Squat', 'Front Squat', 'سكوات أمامي', 4, '8-10', '8', '3 min', '3 دقائق'),
          ex('Walking_Lunge', 'Walking Lunge', 'لانج مشي', 3, '12 per leg', '8-9', '2 min', '2 دقائق'),
          ex('Romanian_Deadlift', 'Romanian Deadlift', 'ديدلفت روماني', 4, '10-12', '8', '2 min', '2 دقائق'),
          ex('Leg_Extensions', 'Leg Extension', 'ليج إكستنشن', 4, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Leg_Curl', 'Leg Curl', 'ليج كيرل', 4, '12-15', '8-9', '90 sec', '90 ثانية'),
          ex('Standing_Calf_Raises', 'Calf Raise', 'سمانة', 5, '15-20', '8-9', '60 sec', '60 ثانية'),
        ],
      },
    ],
  },

  // ============================================================
  // 5 SPECIALIZATION PROGRAMS
  // ============================================================

  // -------- 9. Arm Hypertrophy Specialization --------
  {
    id: 'arm-specialization',
    name: 'Arm Hypertrophy 6-Week',
    nameAr: 'تخصص الأيدين 6 أسابيع',
    author: 'Jeff Nippard',
    authorUrl: 'https://www.youtube.com/@JeffNippard',
    level: 'intermediate',
    goal: 'hypertrophy',
    split: 'specialization',
    daysPerWeek: 4,
    weeks: 6,
    blurb: 'Six week peak block for biceps and triceps. High frequency, varied stretch and contraction positions, 24 hard sets per arm per week.',
    blurbAr: 'بلوك ذروة 6 أسابيع للبايسبس والتراي. تكرار عالي، أوضاع تمدد وانقباض متنوعة، 24 مجموعة جادة لكل ذراع بالأسبوع.',
    videoId: 'qpRGnTTcLpo',
    progression: 'Add a rep each week until you reach the top of the range, then add 1 kg. Six weeks max, then return to full programming.',
    progressionAr: 'أضف تكراراً كل أسبوع حتى أعلى النطاق، ثم أضف 1 كغ. الحد الأقصى 6 أسابيع، ثم ارجع لبرنامج كامل.',
    days: [
      {
        name: 'Day 1: Arms Heavy',
        nameAr: 'اليوم 1: أيدين ثقيل',
        exercises: [
          ex('Barbell_Curl', 'Barbell Curl', 'بايسبس بار', 4, '6-8', '8-9', '2 min', '2 دقائق'),
          ex('Close-Grip_Bench_Press', 'Close Grip Bench', 'بنش قبضة ضيقة', 4, '6-8', '8-9', '2-3 min', '2-3 دقائق'),
          ex('Hammer_Curls', 'Hammer Curl', 'بايسبس هامر', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Skullcrushers', 'Skullcrushers', 'سكول كرشر', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Day 2: Arms Pump',
        nameAr: 'اليوم 2: أيدين بمب',
        exercises: [
          ex('Dumbbell_Bicep_Curl', 'Incline DB Curl', 'بايسبس مائل دامبل', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Triceps_Pushdown', 'Cable Pushdown', 'كابل بشدان', 4, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Hammer_Curls', 'Cable Hammer Curl', 'بايسبس هامر كابل', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Skullcrushers', 'Overhead Tricep Extension', 'تراي فوق الرأس', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 3: Arms Stretch',
        nameAr: 'اليوم 3: أيدين تمدد',
        exercises: [
          ex('Dumbbell_Bicep_Curl', 'Bayesian Curl', 'بايسبس بايزيان', 4, '8-10', '8-9', '90 sec', '90 ثانية', 'Cable from behind for stretch', 'كابل من خلف للتمدد'),
          ex('Skullcrushers', 'Overhead Cable Triceps', 'تراي كابل فوق الرأس', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Dumbbell_Bicep_Curl', 'Spider Curl', 'بايسبس سبايدر', 3, '10-12', '8-9', '60 sec', '60 ثانية'),
          ex('Triceps_Pushdown', 'Rope Pushdown', 'بشدان حبل', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 4: Arms Volume',
        nameAr: 'اليوم 4: أيدين حجم',
        exercises: [
          ex('Barbell_Curl', 'EZ Bar Curl', 'بايسبس EZ', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Close-Grip_Bench_Press', 'JM Press', 'JM بنش', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Hammer_Curls', 'Hammer Curl', 'بايسبس هامر', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Triceps_Pushdown', 'Reverse Grip Pushdown', 'بشدان قبضة عكسية', 3, '15-20', '8-9', '60 sec', '60 ثانية'),
        ],
      },
    ],
  },

  // -------- 10. Glute Specialization --------
  {
    id: 'glute-specialization',
    name: 'Glute Specialization',
    nameAr: 'تخصص المؤخرة',
    author: 'Bret Contreras',
    authorUrl: 'https://bretcontreras.com',
    level: 'intermediate',
    goal: 'hypertrophy',
    split: 'specialization',
    daysPerWeek: 4,
    weeks: 8,
    blurb: 'Eight week peak block from the Glute Guy. Hip thrusts as the centerpiece. High frequency glute work alongside reduced volume on other muscle groups.',
    blurbAr: 'بلوك ذروة 8 أسابيع من غلوت غاي. هيب ثرست كقطعة مركزية. تكرار عالي للمؤخرة مع تقليل الحجم للعضلات الأخرى.',
    progression: 'Hip thrust progression: aim for 5 kg added per week on the main lift. Accessories use double progression as usual.',
    progressionAr: 'تقدم هيب ثرست: 5 كغ مضاف كل أسبوع للتمرين الرئيسي. التمارين المساعدة بتقدم مزدوج كالعادة.',
    days: [
      {
        name: 'Day 1: Glute Power',
        nameAr: 'اليوم 1: قوة المؤخرة',
        exercises: [
          ex('Barbell_Hip_Thrust', 'Barbell Hip Thrust', 'هيب ثرست بار', 4, '6-8', '8', '3 min', '3 دقائق'),
          ex('Barbell_Squat', 'Pause Squat', 'سكوات بوقفة', 4, '6-8', '8', '3 min', '3 دقائق'),
          ex('Glute_Bridge', 'Single Leg Glute Bridge', 'غلوت بريدج رجل واحدة', 3, '10 per leg', '8-9', '90 sec', '90 ثانية'),
          ex('Cable_Hip_Adduction', 'Cable Kickback', 'كابل كيك باك', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 2: Glute Volume',
        nameAr: 'اليوم 2: حجم المؤخرة',
        exercises: [
          ex('Glute_Bridge', 'Hip Thrust Volume', 'هيب ثرست حجم', 3, '12-15', '8-9', '2 min', '2 دقائق'),
          ex('Romanian_Deadlift', 'Romanian Deadlift', 'ديدلفت روماني', 4, '10-12', '8', '2-3 min', '2-3 دقائق'),
          ex('Cable_Hip_Adduction', 'Cable Hip Abduction', 'كابل تبعيد الورك', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
          ex('Walking_Lunge', 'Reverse Lunge', 'لانج عكسي', 3, '10 per leg', '8-9', '2 min', '2 دقائق'),
        ],
      },
      {
        name: 'Day 3: Glute Stretch',
        nameAr: 'اليوم 3: تمدد المؤخرة',
        exercises: [
          ex('Romanian_Deadlift', 'Deficit RDL', 'ديدلفت بعمق', 4, '8-10', '8', '2-3 min', '2-3 دقائق'),
          ex('Barbell_Squat', 'Bulgarian Split Squat', 'سبليت بلغاري', 4, '10 per leg', '8-9', '2 min', '2 دقائق'),
          ex('Conventional_Deadlift', 'Sumo Deadlift', 'ديدلفت سومو', 3, '6-8', '8', '3 min', '3 دقائق'),
          ex('Glute_Bridge', 'Frog Pump', 'فروغ بمب', 3, '20-30', '9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 4: Glute Pump',
        nameAr: 'اليوم 4: بمب المؤخرة',
        exercises: [
          ex('Barbell_Hip_Thrust', 'Banded Hip Thrust', 'هيب ثرست بحزام', 4, '15-20', '8-9', '90 sec', '90 ثانية'),
          ex('Cable_Hip_Adduction', 'Cable Glute Kickback', 'كابل غلوت كيك باك', 4, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Glute_Bridge', 'Glute Bridge March', 'غلوت بريدج مارش', 3, '20', '8-9', '60 sec', '60 ثانية'),
          ex('Standing_Calf_Raises', 'Calf Raise', 'سمانة', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
        ],
      },
    ],
  },

  // -------- 11. Bench Press Peaking --------
  {
    id: 'bench-peaking',
    name: 'Bench Press Peaking (Nuckols)',
    nameAr: 'ذروة البنش برس (نوكولز)',
    author: 'Greg Nuckols',
    authorUrl: 'https://www.strongerbyscience.com',
    level: 'intermediate',
    goal: 'strength',
    split: 'specialization',
    daysPerWeek: 4,
    weeks: 8,
    blurb: 'Eight week peak for bench press. Three bench sessions per week (heavy, technique, volume) with full body support work.',
    blurbAr: 'ذروة 8 أسابيع للبنش برس. ثلاث جلسات بنش بالأسبوع (ثقيل، تقني، حجم) مع تمارين دعم للجسم الكامل.',
    progression: 'Weekly intensity progression: Week 1 70%, Week 2 75%, Week 3 80%, Week 4 deload, Weeks 5-8 add 5 percent each week.',
    progressionAr: 'تقدم شدة أسبوعي: أسبوع 1 70%، أسبوع 2 75%، أسبوع 3 80%، أسبوع 4 تخفيف، أسابيع 5-8 أضف 5% كل أسبوع.',
    days: [
      {
        name: 'Day 1: Bench Heavy',
        nameAr: 'اليوم 1: بنش ثقيل',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press Heavy', 'بنش ثقيل', 5, '3-5', '8', '4 min', '4 دقائق'),
          ex('Close-Grip_Bench_Press', 'Close Grip Bench', 'بنش قبضة ضيقة', 4, '6-8', '8', '2-3 min', '2-3 دقائق'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Bent_Over_Barbell_Row', 'Row', 'سحب', 4, '8-10', '8', '2 min', '2 دقائق'),
        ],
      },
      {
        name: 'Day 2: Squat',
        nameAr: 'اليوم 2: سكوات',
        exercises: [
          ex('Barbell_Squat', 'Squat', 'سكوات', 5, '5', '8', '3-4 min', '3-4 دقائق'),
          ex('Romanian_Deadlift', 'RDL', 'ديدلفت روماني', 4, '8-10', '8', '2-3 min', '2-3 دقائق'),
          ex('Pullups', 'Pull Ups', 'عقلة', 4, '8-12', '8-9', '2 min', '2 دقائق'),
        ],
      },
      {
        name: 'Day 3: Bench Technique',
        nameAr: 'اليوم 3: بنش تقنية',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Pause Bench', 'بنش بوقفة', 5, '3', '7-8', '3 min', '3 دقائق', '2 second pause on chest', 'وقفة ثانيتين على الصدر'),
          ex('Incline_Dumbbell_Press', 'Incline DB Press', 'بنش مائل دامبل', 4, '8-10', '8', '2 min', '2 دقائق'),
          ex('Skullcrushers', 'Skullcrushers', 'سكول كرشر', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Face_Pull', 'Face Pull', 'فيس بول', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 4: Deadlift + Bench Volume',
        nameAr: 'اليوم 4: ديدلفت + بنش حجم',
        exercises: [
          ex('Conventional_Deadlift', 'Deadlift', 'ديدلفت', 4, '5', '8', '4 min', '4 دقائق'),
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Volume', 'بنش حجم', 5, '6-8', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Dumbbell_Bicep_Curl', 'Dumbbell Curl', 'بايسبس دامبل', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Standing_Calf_Raises', 'Calf Raise', 'سمانة', 4, '10-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
    ],
  },

  // -------- 12. Back Width Specialization --------
  {
    id: 'back-width-spec',
    name: 'Back Width Specialization',
    nameAr: 'تخصص عرض الظهر',
    author: 'Mike Israetel',
    authorUrl: 'https://renaissanceperiodization.com',
    level: 'intermediate',
    goal: 'hypertrophy',
    split: 'specialization',
    daysPerWeek: 4,
    weeks: 6,
    blurb: 'Six week peak for lat and upper back width. Three back sessions per week with pull ups, rows, and pulldowns.',
    blurbAr: 'ذروة 6 أسابيع لعرض اللات والظهر العلوي. ثلاث جلسات ظهر بالأسبوع: عقلة، سحب، لات بولداون.',
    progression: 'Add a rep to your pull ups every week. When you cannot, add weight via belt or backpack.',
    progressionAr: 'أضف تكراراً للعقلة كل أسبوع. عند العجز، أضف وزناً بحزام أو حقيبة ظهر.',
    days: [
      {
        name: 'Day 1: Back Width Heavy',
        nameAr: 'اليوم 1: عرض الظهر ثقيل',
        exercises: [
          ex('Pullups', 'Weighted Pull Up', 'عقلة بوزن', 5, '6-8', '8', '3 min', '3 دقائق'),
          ex('Wide_Grip_Lat_Pulldown', 'Wide Grip Pulldown', 'لات بولداون قبضة عريضة', 4, '8-10', '8', '2 min', '2 دقائق'),
          ex('Seated_Cable_Rows', 'Single Arm Cable Row', 'كابل رو ذراع واحدة', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Face_Pull', 'Face Pull', 'فيس بول', 4, '15-20', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 2: Push',
        nameAr: 'اليوم 2: بوش',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press', 'بنش برس', 4, '6-8', '8', '3 min', '3 دقائق'),
          ex('Standing_Military_Press', 'Overhead Press', 'بريس فوق الرأس', 3, '8-10', '7-8', '2-3 min', '2-3 دقائق'),
          ex('Side_Lateral_Raise', 'Lateral Raise', 'رفرفة جانبية', 4, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 3: Back Width Volume',
        nameAr: 'اليوم 3: عرض الظهر حجم',
        exercises: [
          ex('Wide_Grip_Lat_Pulldown', 'Lat Pulldown', 'لات بولداون', 5, '10-12', '8-9', '2 min', '2 دقائق'),
          ex('Pullups', 'Neutral Grip Pull Up', 'عقلة قبضة محايدة', 4, 'AMRAP', '8-9', '2-3 min', '2-3 دقائق'),
          ex('Bent_Over_Barbell_Row', 'Pendlay Row', 'بندلاي رو', 4, '6-8', '8', '2-3 min', '2-3 دقائق'),
          ex('Dumbbell_Bicep_Curl', 'Incline Curl', 'بايسبس مائل', 3, '10-12', '8-9', '90 sec', '90 ثانية'),
        ],
      },
      {
        name: 'Day 4: Legs',
        nameAr: 'اليوم 4: أرجل',
        exercises: [
          ex('Barbell_Squat', 'Squat', 'سكوات', 4, '6-8', '8', '3 min', '3 دقائق'),
          ex('Romanian_Deadlift', 'RDL', 'ديدلفت روماني', 3, '8-10', '8', '2-3 min', '2-3 دقائق'),
          ex('Leg_Press', 'Leg Press', 'ليج برس', 3, '10-12', '8-9', '2 min', '2 دقائق'),
          ex('Standing_Calf_Raises', 'Calf Raise', 'سمانة', 4, '10-15', '8-9', '60 sec', '60 ثانية'),
        ],
      },
    ],
  },

  // -------- 13. Athlete Conditioning --------
  {
    id: 'athlete-conditioning',
    name: 'Athletic Conditioning',
    nameAr: 'تهيئة رياضية',
    author: 'Athlean-X (Jeff Cavaliere)',
    authorUrl: 'https://www.youtube.com/@athleanx',
    level: 'intermediate',
    goal: 'both',
    split: 'specialization',
    daysPerWeek: 4,
    weeks: 8,
    blurb: 'Athletic strength conditioning for general fitness. Compound lifts paired with explosive movements and conditioning circuits.',
    blurbAr: 'تهيئة قوة رياضية للياقة العامة. تمارين مركبة مع حركات انفجارية ودوائر تكييف.',
    progression: 'Strength: standard double progression. Conditioning: reduce rest by 15 seconds each week until you can hold the pace.',
    progressionAr: 'القوة: تقدم مزدوج قياسي. التكييف: قلل الراحة 15 ثانية كل أسبوع حتى تستطيع الحفاظ على الإيقاع.',
    days: [
      {
        name: 'Day 1: Upper Power',
        nameAr: 'اليوم 1: قوة علوي',
        exercises: [
          ex('Barbell_Bench_Press_-_Medium_Grip', 'Bench Press', 'بنش برس', 5, '5', '8', '3 min', '3 دقائق'),
          ex('Pullups', 'Pull Ups', 'عقلة', 5, 'AMRAP', '8-9', '2-3 min', '2-3 دقائق'),
          ex('Standing_Military_Press', 'Push Press', 'بوش برس', 4, '5-8', '8', '2-3 min', '2-3 دقائق'),
          ex('Bent_Over_Barbell_Row', 'Barbell Row', 'سحب بالبار', 4, '8-10', '8', '2 min', '2 دقائق'),
        ],
      },
      {
        name: 'Day 2: Lower Power',
        nameAr: 'اليوم 2: قوة سفلي',
        exercises: [
          ex('Barbell_Squat', 'Squat', 'سكوات', 5, '5', '8', '3-4 min', '3-4 دقائق'),
          ex('Conventional_Deadlift', 'Deadlift', 'ديدلفت', 4, '3-5', '8', '4 min', '4 دقائق'),
          ex('Box_Jump', 'Box Jump', 'قفز على صندوق', 5, '5', '7', '2 min', '2 دقائق'),
          ex('Walking_Lunge', 'Walking Lunge', 'لانج مشي', 3, '10 per leg', '8', '2 min', '2 دقائق'),
        ],
      },
      {
        name: 'Day 3: Upper Hypertrophy',
        nameAr: 'اليوم 3: علوي هايبرتروفي',
        exercises: [
          ex('Incline_Dumbbell_Press', 'Incline DB Press', 'بنش مائل دامبل', 4, '8-10', '8', '2 min', '2 دقائق'),
          ex('Seated_Cable_Rows', 'Cable Row', 'كابل رو', 4, '10-12', '8-9', '90 sec', '90 ثانية'),
          ex('Side_Lateral_Raise', 'Lateral Raise', 'رفرفة جانبية', 4, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Triceps_Pushdown', 'Triceps Pushdown', 'تراي بشدان', 3, '12-15', '8-9', '60 sec', '60 ثانية'),
          ex('Dumbbell_Bicep_Curl', 'Dumbbell Curl', 'بايسبس دامبل', 3, '10-12', '8-9', '60 sec', '60 ثانية'),
        ],
      },
      {
        name: 'Day 4: Conditioning Circuit',
        nameAr: 'اليوم 4: دائرة تكييف',
        exercises: [
          ex('Kettlebell_Swing', 'Kettlebell Swing', 'كيتل سوينج', 4, '20', '8-9', '60 sec', '60 ثانية'),
          ex('Burpee', 'Burpee', 'بيربي', 4, '10', '9', '60 sec', '60 ثانية'),
          ex('Box_Jump', 'Box Jump', 'قفز على صندوق', 4, '8', '8', '60 sec', '60 ثانية'),
          ex('Pullups', 'Pull Ups', 'عقلة', 4, 'AMRAP', '8-9', '60 sec', '60 ثانية'),
          ex('Plank', 'Plank', 'بلانك', 4, '45 sec', '8-9', '30 sec', '30 ثانية'),
        ],
      },
    ],
  },
];

// ============================================================
// Helpers used by the UI
// ============================================================

export function getProgramById(id: string): WorkoutProgram | undefined {
  return WORKOUT_PROGRAMS.find((p) => p.id === id);
}

export const SPLIT_LABEL_EN: Record<SplitKind, string> = {
  'full-body': 'Full body',
  'upper-lower': 'Upper / Lower',
  'ppl': 'Push / Pull / Legs',
  'bro-split': 'Body part split',
  'arnold': 'Arnold split',
  'specialization': 'Specialization',
};

export const SPLIT_LABEL_AR: Record<SplitKind, string> = {
  'full-body': 'جسم كامل',
  'upper-lower': 'علوي / سفلي',
  'ppl': 'بوش / بل / ليجز',
  'bro-split': 'تقسيم عضلات',
  'arnold': 'تقسيم أرنولد',
  'specialization': 'تخصص',
};

export const LEVEL_LABEL_EN: Record<ProgramLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const LEVEL_LABEL_AR: Record<ProgramLevel, string> = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  advanced: 'متقدم',
};

export const GOAL_LABEL_EN: Record<ProgramGoal, string> = {
  strength: 'Strength',
  hypertrophy: 'Hypertrophy',
  both: 'Strength + Hypertrophy',
};

export const GOAL_LABEL_AR: Record<ProgramGoal, string> = {
  strength: 'قوة',
  hypertrophy: 'هايبرتروفي',
  both: 'قوة + هايبرتروفي',
};
