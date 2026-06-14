/**
 * Curated profiles of the most respected science-based training coaches
 * on the open internet. Each one publishes free content on YouTube and
 * via open articles. Listed here so visitors can branch out from our
 * own programming into a deeper coaching ecosystem.
 */

export type CoachFocus =
  | 'natural-bodybuilding'
  | 'strength'
  | 'science'
  | 'nutrition'
  | 'general-fitness';

export interface FitnessCoach {
  id: string;
  name: string;
  nameAr: string;
  handle: string;
  url: string;
  focus: CoachFocus;
  blurb: string;
  blurbAr: string;
  credentials: string;
  credentialsAr: string;
  /** Wikipedia title for hero image fetch, when one exists. */
  wikiTitle?: string;
}

export const FITNESS_COACHES: FitnessCoach[] = [
  {
    id: 'jeff-nippard',
    name: 'Jeff Nippard',
    nameAr: 'جيف نيبارد',
    handle: '@JeffNippard',
    url: 'https://www.youtube.com/@JeffNippard',
    focus: 'natural-bodybuilding',
    blurb: 'Natural pro bodybuilder with a Bachelor in biochemistry. The internet\'s most popular science-based hypertrophy coach. His Fundamentals PDFs sold over 200,000 copies.',
    blurbAr: 'لاعب كمال أجسام محترف طبيعي بشهادة بكالوريوس بالكيمياء الحيوية. أشهر مدرب هايبرتروفي علمي بالإنترنت. كتبه أساسيات بيعت أكثر من 200,000 نسخة.',
    credentials: 'BSc Biochemistry, IPL World Champion, IFBB Natural Pro',
    credentialsAr: 'بكالوريوس كيمياء حيوية، بطل عالم IPL، محترف طبيعي IFBB',
    wikiTitle: 'Jeff Nippard',
  },
  {
    id: 'greg-nuckols',
    name: 'Greg Nuckols',
    nameAr: 'غريغ نوكولز',
    handle: '@StrongerByScience',
    url: 'https://www.strongerbyscience.com',
    focus: 'strength',
    blurb: 'Co-founder of Stronger By Science. Squatted 755 lbs at 220 lbs body weight. Publishes the most detailed open strength training research summaries on the internet.',
    blurbAr: 'مؤسس مشارك لـ Stronger By Science. سكوت 755 رطل بوزن 220 رطل. ينشر أكثر ملخصات أبحاث القوة تفصيلاً بالإنترنت.',
    credentials: 'BS Exercise Science, 3x World Record Holder (220 lbs class)',
    credentialsAr: 'بكالوريوس علوم رياضية، 3 أرقام قياسية عالمية (فئة 220 رطل)',
  },
  {
    id: 'mike-israetel',
    name: 'Mike Israetel',
    nameAr: 'مايك إسرائيتل',
    handle: '@RPStrength',
    url: 'https://www.youtube.com/@RenaissancePeriodization',
    focus: 'science',
    blurb: 'Co-founder of Renaissance Periodization. PhD in Sport Physiology. The originator of MV, MEV, MAV, MRV volume landmarks now used by every serious natural lifter.',
    blurbAr: 'مؤسس مشارك لـ Renaissance Periodization. دكتوراه فسيولوجيا رياضية. مبتكر معالم الحجم MV/MEV/MAV/MRV التي يستخدمها كل لاعب طبيعي جاد.',
    credentials: 'PhD Sport Physiology, Co-founder of RP Strength',
    credentialsAr: 'دكتوراه فسيولوجيا رياضية، مؤسس مشارك لـ RP Strength',
    wikiTitle: 'Mike Israetel',
  },
  {
    id: 'eric-helms',
    name: 'Eric Helms',
    nameAr: 'إريك هيلمز',
    handle: '@3dmusclejourney',
    url: 'https://www.youtube.com/@3dmusclejourney',
    focus: 'natural-bodybuilding',
    blurb: 'Co-founder of 3D Muscle Journey. PhD in Strength and Conditioning. The author of the Muscle and Strength Pyramids, the most widely shared drug free training guide ever published.',
    blurbAr: 'مؤسس مشارك لـ 3D Muscle Journey. دكتوراه قوة وتكييف. مؤلف أهرامات العضلات والقوة، أكثر دليل تدريب طبيعي مشاركة على الإطلاق.',
    credentials: 'PhD Strength & Conditioning, IFPA Pro Bodybuilder',
    credentialsAr: 'دكتوراه قوة وتكييف، لاعب كمال أجسام محترف IFPA',
  },
  {
    id: 'layne-norton',
    name: 'Layne Norton',
    nameAr: 'لاين نورتون',
    handle: '@BioLayne',
    url: 'https://www.youtube.com/@BioLayne',
    focus: 'nutrition',
    blurb: 'PhD in Nutritional Sciences. Pro powerlifter and natural pro bodybuilder. The clearest public communicator on protein, fat loss, and evidence-based nutrition science.',
    blurbAr: 'دكتوراه علوم غذائية. لاعب رفع أثقال محترف ولاعب كمال أجسام طبيعي محترف. أوضح متواصل عام عن البروتين، فقدان الدهون، وعلم التغذية القائم على الأدلة.',
    credentials: 'PhD Nutritional Sciences, IPF Pro Powerlifter',
    credentialsAr: 'دكتوراه علوم غذائية، محترف رفع أثقال IPF',
    wikiTitle: 'Layne Norton',
  },
  {
    id: 'jeff-cavaliere',
    name: 'Jeff Cavaliere',
    nameAr: 'جيف كافالير',
    handle: '@athleanx',
    url: 'https://www.youtube.com/@athleanx',
    focus: 'general-fitness',
    blurb: 'Former head physical therapist for the New York Mets. The largest fitness channel on YouTube (15 million subs) with a focus on injury prevention and athletic conditioning.',
    blurbAr: 'رئيس العلاج الفيزيائي السابق لفريق نيويورك ميتس. أكبر قناة لياقة على يوتيوب (15 مليون مشترك) بتركيز على منع الإصابات والتهيئة الرياضية.',
    credentials: 'MSPT, CSCS, Former Head PT NY Mets',
    credentialsAr: 'ماجستير علاج فيزيائي، CSCS، رئيس علاج فيزيائي سابق NY Mets',
  },
];

export const FOCUS_LABEL_EN: Record<CoachFocus, string> = {
  'natural-bodybuilding': 'Natural bodybuilding',
  strength: 'Strength',
  science: 'Science',
  nutrition: 'Nutrition',
  'general-fitness': 'General fitness',
};

export const FOCUS_LABEL_AR: Record<CoachFocus, string> = {
  'natural-bodybuilding': 'كمال أجسام طبيعي',
  strength: 'قوة',
  science: 'علم',
  nutrition: 'تغذية',
  'general-fitness': 'لياقة عامة',
};
