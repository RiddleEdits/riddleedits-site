/*
 * Everything the site says lives in this file.
 * Video numbers were taken from each video's YouTube page on 25 Nov 2026.
 * Update them here and every page picks up the change.
 */

/** Path to a file in public/, correct whether the site lives at / or a subfolder. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const SITE = {
  name: 'RiddleEdits',
  email: 'rgsfirdaus@gmail.com',
  calendly: 'https://calendly.com/rgsfirdaus/30min',
  x: 'https://x.com/RiddlePlayZz',
  instagram: 'https://www.instagram.com/riddle.editzzz/',
  showreelId: '5EAMyKkARdA'
};

export type Niche = 'gta' | 'roblox';

export interface Creator {
  id: string;
  name: string;
  subs: string;
  avatar: string;
  url: string;
}

export const CREATORS: Creator[] = [
  { id: 'rageelixir', name: 'RageElixir', subs: '7.64M', avatar: asset('/creators/rageelixir.jpg'), url: 'https://youtube.com/@rageelixir' },
  { id: 'mia', name: 'Mia', subs: '758K', avatar: asset('/creators/mia.jpg'), url: 'https://youtube.com/@mia-yt' },
  { id: 'kwil', name: 'Kwil', subs: '443K', avatar: asset('/creators/kwil.jpg'), url: 'https://youtube.com/@kw_il' },
  { id: 'miloblox', name: 'MiloBlox', subs: '435K', avatar: asset('/creators/miloblox.jpg'), url: 'https://youtube.com/@miloblox-yt' },
  { id: 'sharktactics', name: 'SharkTactics', subs: '324K', avatar: asset('/creators/sharktactics.jpg'), url: 'https://youtube.com/@sharktactics' },
  { id: 'beckblox', name: 'BeckBlox', subs: '182K', avatar: asset('/creators/thebeckblox.jpg'), url: 'https://youtube.com/@thebeckblox' },
  { id: 'daltyn', name: 'Daltyn', subs: '128K', avatar: asset('/creators/daltynblox.jpg'), url: 'https://youtube.com/@daltynblox' },
  { id: 'doodle', name: 'Doodle Arkey Plays', subs: '104K', avatar: asset('/creators/doodlearkeyplays.jpg'), url: 'https://youtube.com/@doodlearkeyplays' }
];

export const creator = (id: string) => CREATORS.find((c) => c.id === id)!;

export interface Video {
  id: string; // YouTube id
  title: string;
  creatorId: string;
  niche: Niche;
  views: number;
  length: string;
  likes: number;
  published: string;
}

export const VIDEOS: Video[] = [
  { id: 'rJdJbEmO-ko', title: 'GTA 5, But We Have INFINITE STARS..', creatorId: 'doodle', niche: 'gta', views: 468767, length: '14:52', likes: 5508, published: 'Apr 2026' },
  { id: 'Azr4fHfz0vY', title: 'Surviving 100 Days in a Zombie Apocalypse..', creatorId: 'doodle', niche: 'gta', views: 433381, length: '18:43', likes: 4564, published: 'Apr 2026' },
  { id: 'ul-omdsGBMI', title: 'I Became a FAKE COP To Arrest My Friend in GTA RP..', creatorId: 'doodle', niche: 'gta', views: 219552, length: '19:52', likes: 2929, published: 'Apr 2026' },
  { id: 'g2qjuV8N7cQ', title: 'Meccha Chameleon But It’s On The GTA 5 Map..', creatorId: 'doodle', niche: 'gta', views: 80963, length: '10:12', likes: 1104, published: 'Jul 2026' },
  { id: 'WBtalXv3Qgc', title: 'Logging into the OLDEST Rivals Account..', creatorId: 'miloblox', niche: 'roblox', views: 865850, length: '21:07', likes: 6279, published: 'Oct 2026' },
  { id: 'zHvWvIpMsZA', title: 'Steal A Brainrot, But The BRAINROT TRADER is OVERPOWERED..', creatorId: 'kwil', niche: 'roblox', views: 810728, length: '20:04', likes: 11144, published: 'Nov 2025' },
  { id: 'hbrOQRLRL_E', title: 'I Busted 21 Myths in Rivals SUMMER UPDATE!', creatorId: 'miloblox', niche: 'roblox', views: 513403, length: '9:50', likes: 5624, published: 'Jun 2026' },
  { id: 'poqx6LL7iiw', title: 'I Rigged a NOOB vs PRO Rivals Tournament..', creatorId: 'miloblox', niche: 'roblox', views: 51375, length: '22:05', likes: 1095, published: 'Sep 2026' }
];

export const videosFor = (niche: Niche) => VIDEOS.filter((v) => v.niche === niche);

/** 468767 → "469K", 1203000 → "1.2M" */
export function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

/** Like compact() but for likes, keeps one decimal under 10K: 5508 → "5.5K" */
export function compactLikes(n: number): string {
  if (n >= 10_000) return compact(n);
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

export const thumb = (id: string, size: 'hq' | 'max' = 'hq') =>
  `https://i.ytimg.com/vi/${id}/${size === 'max' ? 'maxresdefault' : 'hqdefault'}.jpg`;

const totalViews = VIDEOS.reduce((sum, v) => sum + v.views, 0);
const topVideo = [...VIDEOS].sort((a, b) => b.views - a.views)[0];

export const STATS = [
  { value: '10M+', label: 'Combined subscribers of the creators I’ve edited for' },
  { value: `${compact(totalViews)}+`, label: `Views on the ${VIDEOS.length} videos on this site` },
  { value: compact(topVideo.views), label: `Views on my top edit, for ${creator(topVideo.creatorId).name}` }
];

export const NICHES: Record<
  Niche,
  { name: string; path: string; headline: string; intro: string; formats: string[]; faqs: { q: string; a: string }[] }
> = {
  gta: {
    name: 'GTA',
    path: '/work/gta',
    headline: 'GTA video editing',
    intro: 'Long-form GTA 5 videos for Doodle Arkey Plays: challenges, 100 Days survival and roleplay. Each one runs 10 to 20 minutes.',
    formats: ['Challenges', '100 Days', 'Roleplay'],
    faqs: [
      { q: 'What kind of GTA videos do you edit?', a: 'Long-form challenges, 100 Days survival runs and roleplay-style story videos, like the ones on this page for Doodle Arkey Plays.' },
      { q: 'How long does a video take?', a: 'Usually 48 to 72 hours for the first cut of a 15–20 minute video. Tell me your upload day and I’ll plan around it.' },
      { q: 'Can you match my existing style?', a: 'Yes. Send me two or three of your videos that you like and I’ll match the pacing, captions and sound.' },
      { q: 'How does pricing work?', a: 'It depends on video length and how much raw footage there is. We’ll go through it on a call and I’ll quote you per video.' }
    ]
  },
  roblox: {
    name: 'Roblox',
    path: '/work/roblox',
    headline: 'Roblox video editing',
    intro: 'Long-form Roblox videos for MiloBlox and Kwil: Rivals updates, rare accounts, tournaments and Steal a Brainrot. Most run 20 minutes or more.',
    formats: ['Rivals', 'Challenges', 'Tournaments'],
    faqs: [
      { q: 'Which Roblox games have you edited?', a: 'Rivals and Steal a Brainrot so far, for MiloBlox and Kwil. I can edit other games too.' },
      { q: 'How long does a video take?', a: 'Usually 48 to 72 hours for the first cut. If you need it sooner for an update video, ask.' },
      { q: 'Can you match my existing style?', a: 'Yes. Send me two or three of your videos that you like and I’ll match the pacing, captions and sound.' },
      { q: 'How does pricing work?', a: 'It depends on video length and how much raw footage there is. We’ll go through it on a call and I’ll quote you per video.' }
    ]
  }
};

export interface Testimonial {
  creatorId: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { creatorId: 'rageelixir', quote: 'Bro genuinely cooked with this edit.' },
  { creatorId: 'mia', quote: 'Honestly one of the best editors I’ve worked with.' },
  { creatorId: 'kwil', quote: 'Bro’s editing is actually crazy.' },
  { creatorId: 'miloblox', quote: 'Not even gonna lie, this dude is underrated.' },
  { creatorId: 'sharktactics', quote: 'Yo this looks so good bro, you actually cooked with this one.' },
  { creatorId: 'daltyn', quote: 'Nah this edit is crazy. The pacing and visuals are actually so good.' },
  { creatorId: 'doodle', quote: 'You did an insane job on this. Everything looks so clean.' },
  { creatorId: 'beckblox', quote: 'This is so much better than I expected. You cooked.' }
];

export const quoteFor = (creatorId: string) => TESTIMONIALS.find((t) => t.creatorId === creatorId);

export interface CaseStudy {
  slug: string;
  creatorId: string;
  niche: Niche;
  headline: string;
  summary: string;
  videoIds: string[];
  /** Channel views per month, from the creator's YouTube Studio. Only numbers you can prove. */
  months?: { label: string; value: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'doodle-arkey-plays',
    creatorId: 'doodle',
    niche: 'gta',
    headline: 'Four GTA videos for Doodle Arkey Plays',
    summary:
      'Challenge, survival and roleplay videos. Each one starts as hours of gameplay with friends and ends up 10 to 20 minutes long.',
    videoIds: ['rJdJbEmO-ko', 'Azr4fHfz0vY', 'ul-omdsGBMI', 'g2qjuV8N7cQ'],
    months: [
      { label: 'Month 1', value: '900K' },
      { label: 'Month 2', value: '2M' },
      { label: 'Month 3 (first 15 days)', value: '1.1M' }
    ]
  },
  {
    slug: 'miloblox',
    creatorId: 'miloblox',
    niche: 'roblox',
    headline: 'Three Rivals videos for MiloBlox',
    summary:
      'A myth-busting video for the summer update, a look at the oldest account in the game, and a rigged NOOB vs PRO tournament.',
    videoIds: ['WBtalXv3Qgc', 'hbrOQRLRL_E', 'poqx6LL7iiw']
  },
  {
    slug: 'kwil',
    creatorId: 'kwil',
    niche: 'roblox',
    headline: 'A Steal a Brainrot video for Kwil',
    summary: 'A 20-minute trading challenge built around an overpowered trader.',
    videoIds: ['zHvWvIpMsZA']
  }
];

export function caseStats(cs: CaseStudy) {
  const vids = cs.videoIds.map((id) => VIDEOS.find((v) => v.id === id)!);
  const views = vids.reduce((s, v) => s + v.views, 0);
  const likes = vids.reduce((s, v) => s + v.likes, 0);
  return { vids, views, likes };
}
