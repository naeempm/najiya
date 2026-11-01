// Local landing pages. Each page's copy is written for its own audience;
// don't reuse paragraphs across pages with only the place name swapped.
// Sessions are in English only, so no page should promise another language.

const KERALA = { "@type": "State", name: "Kerala" };
const INDIA = { "@type": "Country", name: "India" };

export const LANDING_PAGES = [
  {
    id: "kerala",
    path: "/online-speech-therapy-kerala",
    navLabel: "Kerala",
    seoTitle: "Online Speech Therapy in Kerala | Speech Connect",
    seoDescription:
      "Online speech therapy across Kerala with an RCI-registered speech-language pathologist. Live sessions for speech delay, autism, stuttering and stroke.",
    eyebrow: "Across Kerala",
    heading: ["Online speech therapy", "across Kerala"],
    intro:
      "From Kasaragod to Thiruvananthapuram, families across Kerala can reach a qualified speech-language pathologist without depending on what happens to be close by. Speech Connect brings live, one-to-one therapy to your home by video call.",
    areaServed: [KERALA, INDIA],
    sections: [
      {
        heading: "Why access to speech therapy is uneven in Kerala",
        paragraphs: [
          "Kerala has strong health awareness, and many parents notice early when a child is slow to talk. Finding a speech-language pathologist nearby is another matter. Specialist services tend to cluster around the larger towns, and families in Wayanad, Idukki, the coastal belt or smaller towns in Palakkad and Malappuram often face long journeys or waiting lists.",
          "Then there is the weather. A therapy routine that works in January can fall apart in the monsoon, when roads flood, buses run late and taking a small child out in the rain for a thirty-minute appointment stops making sense. Consistency is one of the strongest predictors of progress in therapy, and travel is often what breaks it.",
        ],
      },
      {
        heading: "What changes when therapy comes to you",
        paragraphs: [
          "With online sessions, where you live in Kerala no longer decides which specialist you can see. A family in Kannur and a family in Kottayam get the same therapist, the same assessment and the same quality of care. Sessions run Monday to Saturday with flexible timings, so they can sit around school, work and the rest of family life rather than replacing them.",
          "Working from home also shows the therapist something a clinic cannot: how your child communicates in their own space, with their own toys and the people they talk to every day. That makes the home practice we recommend more realistic, because it is built around your routines rather than an unfamiliar therapy room.",
        ],
      },
      {
        heading: "Conditions we treat online",
        paragraphs: ["Speech Connect works with children and adults across Kerala on:"],
        points: [
          "Early intervention for language delay in children aged one to five",
          "Neurodiversity-affirming communication support for autistic children",
          "Stuttering and stammering, using fluency shaping and stuttering modification approaches",
          "Speech sound disorders and misarticulation",
          "Oral Placement Therapy (OPT) for jaw, lip and tongue coordination",
          "Aphasia and dysarthria after stroke or brain injury, and cognitive-communication therapy",
        ],
      },
      {
        heading: "Support for adults and older family members",
        paragraphs: [
          "Speech therapy is not only for children. After a stroke, many adults in Kerala are discharged home with difficulty finding words, understanding conversation or speaking clearly, and regular trips to a therapist can be exhausting for them and for the family member who drives them.",
          "Online sessions let them work from a familiar chair, with a family member nearby to learn how to support practice between sessions. Therapy focuses on what matters in daily life: talking with family, using the phone, managing money or getting back to work where that is possible. A son or daughter living in another city, or abroad, can join the same call to stay involved in the plan.",
        ],
      },
      {
        heading: "The first steps",
        paragraphs: [
          "Everything starts with a conversation. After you request a session, we arrange an intake consultation to understand your concerns, your child's development or your medical history, and what you most want to change. From there, Najiya P M carries out an assessment and builds a therapy plan with clear, measurable goals.",
          "Sessions are conducted in English. Parents who speak Malayalam at home should keep doing so, since a strong home language supports a child's overall language development, and the strategies we coach can be used in any language.",
        ],
      },
      {
        heading: "About your therapist",
        paragraphs: [
          "Najiya P M is a Speech-Language Pathologist with an M.Sc. in Speech-Language Pathology and certification in Oral Placement Therapy. She is registered with the Rehabilitation Council of India (CRR No: A84512) and founded Speech Connect to make evidence-based therapy reachable for families wherever they live.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which parts of Kerala do you cover?",
        a: "All of them. Because sessions are online, families in every district of Kerala can book, from Kasaragod and Kannur in the north to Kollam and Thiruvananthapuram in the south.",
      },
      {
        q: "Is online therapy as good as going to a clinic?",
        a: "Research on telepractice shows it can be as effective as in-person therapy for many speech and language difficulties, especially when parents take an active part. Your therapist will tell you honestly if your situation needs in-person care.",
      },
      {
        q: "What if our internet connection drops during a session?",
        a: "Short drops are common and easy to recover from; we simply reconnect. If your connection is often unreliable, we can discuss session times when the network is quieter or switching to a stronger connection.",
      },
      {
        q: "Are sessions available in Malayalam?",
        a: "Sessions are conducted in English. You are encouraged to keep speaking Malayalam at home, and the strategies you learn work in any language.",
      },
      {
        q: "Do you treat adults as well as children?",
        a: "Yes. Adults across Kerala work with us on stroke recovery, aphasia, dysarthria, stuttering and cognitive-communication goals.",
      },
    ],
    relatedPosts: [
      "is-online-speech-therapy-effective-for-children",
      "speech-delay-vs-autism-early-signs",
    ],
  },

  {
    id: "uae",
    path: "/online-speech-therapy-uae",
    navLabel: "UAE",
    seoTitle: "Online Speech Therapy in the UAE | Speech Connect",
    seoDescription:
      "Online speech therapy for families in Dubai, Abu Dhabi, Sharjah and across the UAE. Live English sessions with an RCI-registered speech therapist.",
    eyebrow: "United Arab Emirates",
    heading: ["Online speech therapy", "in the UAE"],
    intro:
      "Families in Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain and across the Emirates can work with an RCI-registered speech-language pathologist by live video call, at times that fit around school, work and weekend plans.",
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "City", name: "Sharjah" },
    ],
    sections: [
      {
        heading: "Why UAE families choose online therapy",
        paragraphs: [
          "Parents in the UAE often tell us the same story. They noticed their child was slow to talk, found that clinic sessions were expensive or hard to book at a sensible hour, and then spent more time in traffic on Sheikh Zayed Road or the Sharjah–Dubai commute than in the therapy room itself. After a few months, the routine became too much to keep up.",
          "Online sessions remove the commute entirely. Your child works with the therapist from home, in a room they know, with their own toys and books close at hand. For many families that means sessions can happen every week without fail, and consistency is one of the strongest predictors of progress in speech therapy.",
        ],
      },
      {
        heading: "Time zones that work",
        paragraphs: [
          "India is only one and a half hours ahead of the UAE, so scheduling is simple. Sessions run Monday to Saturday with flexible timings, and after-school slots in the UAE fall in the Indian late afternoon or early evening. Saturday sessions suit families who prefer to keep weekday evenings free.",
          "If you work shifts or travel often, tell us when you get in touch. We will agree a regular slot that suits your week and adjust it when your schedule changes.",
        ],
      },
      {
        heading: "Growing up with more than one language",
        paragraphs: [
          "Many children in the UAE hear two or three languages every day: one at home, English at nursery or school, and often Arabic as well. Parents sometimes worry that this is why their child is late to talk. Research consistently shows that growing up with more than one language does not cause speech or language delay. Bilingual children reach their milestones within the same broad timeframes, although their words may be split across languages.",
          "If a child is genuinely delayed, the delay shows up in every language they hear, and it deserves attention rather than waiting. Sessions with Speech Connect are conducted in English. We will never ask you to stop using your home language; a strong home language supports your child's overall development and keeps them close to family.",
        ],
      },
      {
        heading: "Who we help in the UAE",
        paragraphs: ["Families and adults across the Emirates most often come to us about:"],
        points: [
          "Toddlers and preschoolers who are late to talk or use only a few words",
          "Autistic children, with neurodiversity-affirming support for how they communicate",
          "Stuttering or stammering in children, teenagers and adults",
          "Unclear speech and misarticulation, such as difficulty with r, s, l or k sounds",
          "Parents or grandparents rebuilding speech and language after a stroke",
        ],
      },
      {
        heading: "How sessions work",
        paragraphs: [
          "Each session is a live, one-to-one video call with Najiya P M, not a recorded programme or an app. For young children, sessions are play-based, and a parent or caregiver joins so they can learn the strategies used and practise them during meals, bath time and the school run. Older children and adults work through structured exercises and real-life speaking practice.",
          "A nanny or grandparent who helps care for your child is welcome to join sessions too, so everyone at home uses the same approach. If your family travels back to India or elsewhere for the summer, sessions can continue wherever you are, as long as you have a stable internet connection.",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [
          "Najiya P M holds an M.Sc. in Speech-Language Pathology, is certified in Oral Placement Therapy (OPT) and is registered with the Rehabilitation Council of India (CRR No: A84512). She works with every family directly, from the first consultation to the last session, and provides therapy online from India.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we start therapy from anywhere in the UAE?",
        a: "Yes. Sessions are online, so families in Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain and Al Ain can all book, as long as they have a device with a camera and a stable internet connection.",
      },
      {
        q: "What time are sessions in UAE time?",
        a: "India is one and a half hours ahead of the UAE. Sessions run Monday to Saturday with flexible timings, and we will agree a regular slot that suits your family's schedule.",
      },
      {
        q: "Are you licensed in the UAE?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and provides therapy online from India. If your school or insurer requires a UAE-licensed provider, please check with them before booking.",
      },
      {
        q: "Does speaking more than one language at home cause speech delay?",
        a: "No. Being bilingual or multilingual does not cause speech delay. Sessions are in English, and we encourage you to keep using your home language with your child.",
      },
      {
        q: "How do we get started from the UAE?",
        a: "Fill in the appointment form or message us on WhatsApp, and mention that you are in the UAE. We will arrange an initial consultation at a time that works for you.",
      },
    ],
    relatedPosts: [
      "how-to-help-a-late-talker-at-home",
      "is-online-speech-therapy-effective-for-children",
      "speech-delay-vs-autism-early-signs",
    ],
  },

  {
    id: "uk",
    path: "/online-speech-therapy-uk",
    navLabel: "UK",
    seoTitle: "Online Speech Therapy in the UK | Speech Connect",
    seoDescription:
      "Online speech and language therapy for families in London, Birmingham, Manchester and across the UK. Live English sessions with Najiya P M.",
    eyebrow: "United Kingdom",
    heading: ["Online speech therapy", "in the UK"],
    intro:
      "Families in London, Birmingham, Manchester, Leicester and across England, Scotland, Wales and Northern Ireland can work with an RCI-registered speech-language pathologist by live video call, without months on a waiting list before the first session.",
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "City", name: "London" },
    ],
    sections: [
      {
        heading: "When the wait feels too long",
        paragraphs: [
          "Many UK parents reach out to us after a referral to speech and language therapy and a long wait for the first appointment. Others have had an initial assessment, then a block of a few sessions, and are left wondering what to do while they wait for the next one. For a toddler who is late to talk, months matter: the early years are when language grows fastest.",
          "Online sessions with Speech Connect can run alongside local services or bridge the gap while you wait. You get regular, one-to-one sessions with the same therapist each week and a clear plan you can follow at home between appointments.",
        ],
      },
      {
        heading: "Fitting sessions into a UK day",
        paragraphs: [
          "India is five and a half hours ahead of the UK in winter and four and a half hours ahead during British Summer Time. Sessions run Monday to Saturday with flexible timings, so Indian afternoon and evening slots fall in your morning or early afternoon. That works well for toddlers and preschoolers who are not yet in full-time school, for adults working flexible hours and for Saturday morning sessions.",
          "Tell us where you are and what your week looks like when you get in touch, and we will find a regular slot that suits you.",
        ],
      },
      {
        heading: "Bilingual families",
        paragraphs: [
          "Many families we work with in the UK speak Malayalam, Hindi, Tamil, Urdu or another language at home while their children learn English at nursery and school. Parents are sometimes told, or worry, that this is why their child is late to talk. It is not. Research consistently shows that growing up with two or more languages does not cause speech or language delay.",
          "Sessions are conducted in English, and we will always encourage you to keep using your home language. A strong home language supports your child's overall development, and the strategies you learn in sessions can be used in any language your family speaks.",
        ],
      },
      {
        heading: "What we help with",
        paragraphs: ["Children and adults across the UK work with Speech Connect on:"],
        points: [
          "Late talking and language delay in toddlers and young children",
          "Communication support for autistic children, delivered in a neurodiversity-affirming way",
          "Stammering and stuttering at any age",
          "Speech sound difficulties and unclear speech",
          "Aphasia and dysarthria after a stroke or brain injury",
          "Parent coaching and home practice plans",
        ],
      },
      {
        heading: "How sessions work",
        paragraphs: [
          "Every session is a live, one-to-one video call with Najiya P M. Young children learn through play, using toys, books and picture games, with a parent alongside to learn each strategy as it is used. Older children and adults work on structured exercises and everyday speaking practice. After each session you leave with a short list of things to practise at home, because that is where most progress happens.",
          "Goals are written in plain language and reviewed regularly, so you always know what is improving and what comes next.",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [
          "Najiya P M holds an M.Sc. in Speech-Language Pathology, is certified in Oral Placement Therapy (OPT) and is registered with the Rehabilitation Council of India (CRR No: A84512). She provides therapy online from India and works with each family directly.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we book from anywhere in the UK?",
        a: "Yes. Sessions are online, so families in England, Scotland, Wales and Northern Ireland can all book, as long as they have a device with a camera and a stable internet connection.",
      },
      {
        q: "Are you registered with the HCPC?",
        a: "No. Najiya P M is registered with the Rehabilitation Council of India, the regulator for speech-language pathologists in India, and provides therapy online from India. If you need reports for NHS services, an EHCP or a school, please check what they require before booking.",
      },
      {
        q: "Can online sessions run alongside NHS speech and language therapy?",
        a: "Yes. Many families use online sessions while they wait for NHS therapy or between NHS blocks. Let us know about any other therapy your child receives so the plans work together.",
      },
      {
        q: "What time are sessions in UK time?",
        a: "India is four and a half to five and a half hours ahead of the UK, depending on the time of year. Sessions run Monday to Saturday, and most UK families choose a morning or early afternoon slot.",
      },
      {
        q: "How do we get started from the UK?",
        a: "Fill in the appointment form or message us on WhatsApp, and mention that you are in the UK. We will arrange an initial consultation at a time that suits you.",
      },
    ],
    relatedPosts: [
      "how-to-help-a-late-talker-at-home",
      "is-online-speech-therapy-effective-for-children",
      "speech-milestones-by-age-kerala-parents",
    ],
  },

  {
    id: "india",
    path: "/online-speech-therapy-india",
    navLabel: "India",
    seoTitle: "Online Speech Therapy in India | RCI-Registered SLP",
    seoDescription:
      "Online speech therapy anywhere in India with an RCI-registered speech-language pathologist. English sessions for children and adults, Monday to Saturday.",
    eyebrow: "Anywhere in India",
    heading: ["Online speech therapy", "anywhere in India"],
    intro:
      "Whether you live in a metro or a small town, Speech Connect offers live, one-to-one speech and language therapy by video call with an RCI-registered speech-language pathologist, in English, at times that fit around your family.",
    areaServed: [INDIA],
    sections: [
      {
        heading: "Choosing a speech therapist when you can choose anyone",
        paragraphs: [
          "Once therapy moves online, your options are no longer limited to whoever practises within driving distance. That is a real advantage, but it also means you need a way to judge who you are working with. In India, the first thing to check is registration with the Rehabilitation Council of India (RCI). Speech-language pathologists must be registered with the RCI to practise, and you can ask any therapist for their Central Rehabilitation Register (CRR) number.",
          "Najiya P M is registered with the RCI (CRR No: A84512), holds an M.Sc. in Speech-Language Pathology and is certified in Oral Placement Therapy. She leads every assessment and therapy session at Speech Connect herself.",
        ],
      },
      {
        heading: "Built for busy city schedules and small-town access",
        paragraphs: [
          "In the big cities, the obstacle is usually time. An hour-long session can cost a parent half a working day once traffic is added, and evening slots at popular clinics fill quickly. In smaller towns, the obstacle is often distance: the nearest qualified therapist may be in another district altogether.",
          "Online therapy addresses both. Sessions run Monday to Saturday on Indian Standard Time with flexible timings, and all you need is a device with a camera and a steady internet connection.",
          "It also helps families who move. Parents posted to a new city on a transfer, or children who spend their holidays with grandparents in another state, can keep the same therapist and the same plan instead of starting over each time.",
        ],
      },
      {
        heading: "Sessions in English",
        paragraphs: [
          "All sessions are conducted in English. This suits families who use English at home or whose children attend English-medium schools, and it suits adults who are comfortable working in English. If your family speaks another language at home, keep using it. Children can learn more than one language, and the home strategies you are coached in are designed to carry over into whichever language you speak.",
        ],
      },
      {
        heading: "What we help with",
        paragraphs: ["Families and adults from across India work with Speech Connect on:"],
        points: [
          "Late talking and language delay in toddlers and young children",
          "Communication support for autistic children, delivered in a neurodiversity-affirming way",
          "Stuttering and stammering at any age",
          "Speech clarity and misarticulation",
          "Aphasia, dysarthria and communication after a stroke or brain injury",
          "Caregiver coaching and home practice plans",
        ],
      },
      {
        heading: "Is online therapy right for us?",
        paragraphs: [
          "For most speech and language difficulties, yes. Studies of telepractice have found results comparable to in-person therapy for many children and adults, particularly when a parent or family member is actively involved. Online sessions also make it easier to attend consistently, and consistency is one of the strongest predictors of progress.",
          "There are situations where in-person care is the better choice, for example some swallowing assessments, or when a child cannot yet sit with a parent in front of a screen for even a few minutes. If that applies to you, we will say so during the first consultation and suggest what to look for in a local service instead.",
          "A typical setup is simple: a laptop or tablet placed at your child's eye level, a quiet room without a television in the background, and a few familiar toys or books within reach.",
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "After you get in touch, we arrange an intake consultation to understand your concerns. An assessment follows, then a written therapy plan with goals you can measure. Sessions combine direct therapy with coaching for parents or caregivers, because daily practice at home is what turns progress in a session into progress in everyday life.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I book from any state in India?",
        a: "Yes. Sessions are online, so families and adults can book from any state or union territory, as long as they have a device with a camera and a stable internet connection.",
      },
      {
        q: "How do I check that a speech therapist is qualified in India?",
        a: "Ask for their Rehabilitation Council of India (RCI) registration, shown as a CRR number. Najiya P M's registration is CRR No: A84512.",
      },
      {
        q: "What language are sessions in?",
        a: "All sessions are conducted in English. Families who speak another language at home are encouraged to keep doing so.",
      },
      {
        q: "What are your session timings?",
        a: "Sessions run Monday to Saturday with flexible timings in Indian Standard Time. We will agree a regular slot with you after the first consultation.",
      },
    ],
    relatedPosts: [
      "is-online-speech-therapy-effective-for-children",
      "speech-milestones-by-age-kerala-parents",
    ],
  },
];
