// Local landing pages. Each page's copy is written for its own audience;
// don't reuse paragraphs across pages with only the place name swapped.
// Sessions are in English only, so no page should promise another language.

const KERALA = { "@type": "State", name: "Kerala" };
const INDIA = { "@type": "Country", name: "India" };

export const LANDING_PAGES = [
  {
    id: "thrissur",
    path: "/online-speech-therapy-thrissur",
    navLabel: "Thrissur",
    seoTitle: "Online Speech Therapy in Thrissur | Speech Connect",
    seoDescription:
      "RCI-registered online speech therapy in Thrissur for children and adults. Live video sessions for speech delay, autism, stuttering and stroke recovery.",
    eyebrow: "Thrissur, Kerala",
    heading: ["Online speech therapy", "in Thrissur"],
    intro:
      "Speech Connect is based in Thrissur. Families across the district can work with an RCI-registered speech-language pathologist through live video sessions, without the drive into town, the parking or the waiting room.",
    areaServed: [{ "@type": "City", name: "Thrissur", containedInPlace: KERALA }, KERALA],
    sections: [
      {
        heading: "Speech therapy that fits a Thrissur family's week",
        paragraphs: [
          "Most parents we hear from in Thrissur have already done the maths: a forty-minute drive each way, a school pickup to squeeze in, a younger sibling who needs a nap, and a session that lasts less time than the journey. Over a few months, that is often the reason therapy stops before it has had a chance to work.",
          "Online sessions take the journey out of the week. Whether you live in Thrissur town, Guruvayur, Kunnamkulam, Irinjalakuda, Chalakudy, Kodungallur or Wadakkanchery, the session is the same: you open a video call at home, and your child works with the therapist in the room where they already feel most at ease.",
        ],
      },
      {
        heading: "How an online session works",
        paragraphs: [
          "Each session is a live, one-to-one video call with Najiya P M. It is not a recorded programme or an app. For young children, sessions are built around play: picture games, songs, storybooks, toys you already have at home and on-screen activities chosen for your child's goals. Older children and adults work through structured exercises, conversation practice and real-life speaking tasks.",
          "A parent or caregiver usually joins younger children. That is deliberate. You see every strategy as it is used, you can ask questions in the moment, and you leave with a short list of things to practise during meals, bath time and the drive to school. Most progress happens between sessions, and that is where you make the difference.",
        ],
      },
      {
        heading: "Who we work with in Thrissur",
        paragraphs: [
          "Speech Connect supports people of every age, from toddlers to older adults. Families in Thrissur most often get in touch about:",
        ],
        points: [
          "Toddlers who are late to talk or use only a few words",
          "Autistic children, with neurodiversity-affirming support for communication in whatever form works for them",
          "Stuttering or stammering in children, teenagers and adults",
          "Unclear speech and misarticulation, such as difficulty with r, s, l or k sounds",
          "Adults rebuilding speech and language after a stroke, including aphasia and dysarthria",
        ],
      },
      {
        heading: "What progress looks like",
        paragraphs: [
          "Therapy is not a fixed course of a set number of sessions. After the first assessment you get a plan with a small number of clear goals, written in plain language: for a toddler, that might be using ten new words to ask for things, or joining two words together. For an adult after a stroke, it might be naming everyday objects or holding a short phone conversation.",
          "Goals are reviewed regularly, so you always know what is improving and what comes next. When a goal is met, a new one takes its place. When something is not working, the approach changes. Parents often notice the first changes at home before anyone else does, which is one more reason home practice matters so much.",
        ],
      },
      {
        heading: "A note on language",
        paragraphs: [
          "Sessions are conducted in English. Many Thrissur families speak Malayalam at home, and that is not a barrier. Keep using the language your family speaks most comfortably. The core strategies parents learn in sessions, such as modelling short phrases, expanding on what your child says and giving them time to respond, work in any language you use at home.",
        ],
      },
      {
        heading: "Qualified, registered care",
        paragraphs: [
          "Najiya P M holds an M.Sc. in Speech-Language Pathology, is certified in Oral Placement Therapy (OPT) and is registered with the Rehabilitation Council of India (CRR No: A84512). Every plan starts with an assessment of your child's or your own communication, followed by clear goals you can track from month to month.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have a clinic in Thrissur I can visit?",
        a: "No. Speech Connect is based in Thrissur but works entirely online, so every session takes place by live video call. This lets families anywhere in the district attend without travelling.",
      },
      {
        q: "Can online speech therapy work for a toddler?",
        a: "Yes. For toddlers, sessions are play-based and a parent takes part. Much of the work is coaching you to use language-building strategies during everyday routines, which is where young children learn to talk.",
      },
      {
        q: "Are sessions in Malayalam?",
        a: "Sessions are conducted in English. Parents are encouraged to keep using Malayalam at home, and the strategies you learn in sessions can be used in whichever language your family speaks.",
      },
      {
        q: "What do I need for an online session?",
        a: "A laptop or tablet with a camera, a reliable internet connection and a quiet space where your child can sit with you. A phone can work, but a larger screen is easier for activities.",
      },
      {
        q: "How do I book a first session from Thrissur?",
        a: "Fill in the appointment form on this website or message us on WhatsApp. We will contact you to arrange an initial consultation at a time that suits you, Monday to Saturday.",
      },
    ],
    relatedPosts: [
      "speech-milestones-by-age-kerala-parents",
      "is-online-speech-therapy-effective-for-children",
    ],
  },

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

  {
    id: "abroad",
    path: "/online-speech-therapy-for-malayali-families-abroad",
    navLabel: "Families abroad",
    seoTitle: "Online Speech Therapy for Malayali Families Abroad",
    seoDescription:
      "Online speech therapy from Kerala for Malayali families in the Gulf, UK, US and beyond. Live video sessions with an RCI-registered speech therapist.",
    eyebrow: "For families abroad",
    heading: ["Speech therapy for Malayali families", "living abroad"],
    intro:
      "Living in Dubai, Doha, London or Toronto shouldn't mean waiting months for a speech therapist or paying for care that never fits your family's routine. Speech Connect offers live online therapy from Kerala for Malayali and Indian families wherever they have settled.",
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Oman" },
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
    ],
    sections: [
      {
        heading: "Why families abroad look for therapy from home",
        paragraphs: [
          "Parents who have moved overseas often tell us the same story. They noticed their child was slow to talk, joined a long waiting list, and found that when an appointment finally came it was expensive, infrequent or hard to fit around shift work. Some also wanted a therapist who understood the realities of a Malayali family: grandparents who visit for months at a time, holidays back in Kerala, and a home where more than one language is spoken.",
          "Online therapy with Speech Connect gives you a consistent therapist from Kerala, regular sessions and a plan that travels with you, including on visits home. You also get to talk through your concerns with someone who understands the family context you come from, without having to explain it first.",
        ],
      },
      {
        heading: "Time zones that work",
        paragraphs: [
          "Sessions run Monday to Saturday on Indian Standard Time with flexible timings. For families in the Gulf, India is only one and a half to two and a half hours ahead, so after-school sessions are easy to arrange. In the UK and Europe, Indian afternoon and evening slots fall in your morning or early afternoon, which works well for younger children who are not yet at school and for weekend sessions.",
          "Families in North America and Australia need a little more planning, but early-morning or evening slots on your side can often be arranged. Tell us where you are when you get in touch and we will look at what fits.",
        ],
      },
      {
        heading: "Bilingual children and late talking",
        paragraphs: [
          "Many parents abroad worry that speaking Malayalam at home while their child learns English at nursery is the reason their child is slow to talk. Research consistently shows that growing up with two languages does not cause speech or language delay. Bilingual children reach their milestones within the same broad timeframes as children learning one language, although their vocabulary may be split across both.",
          "If a bilingual child is genuinely delayed, the delay shows up in both languages, and it deserves attention rather than a wait-and-see approach. Sessions with Speech Connect are conducted in English. We will never ask you to stop speaking Malayalam at home: a strong home language helps your child's overall development and keeps them connected to family back in Kerala.",
        ],
      },
      {
        heading: "Therapy that moves with your family",
        paragraphs: [
          "Families abroad move more than most: a new job in another emirate, a contract ending, a long summer back in Kerala, or a relocation to another country altogether. With an in-person therapist, each move means starting again with someone new. With online therapy, the therapist, the plan and the progress notes stay the same wherever you go.",
          "We also keep in mind the people who help care for your child. Grandparents who stay for a few months, a nanny or a relative can join sessions to learn the strategies you use, so your child hears the same approach from everyone at home.",
        ],
      },
      {
        heading: "Who we help",
        paragraphs: ["Families overseas most often come to us about:"],
        points: [
          "Toddlers and preschoolers who are late to talk",
          "Autistic children, with communication support that respects how they naturally communicate",
          "Stuttering and stammering in children and adults",
          "Unclear speech and misarticulation",
          "Parents or grandparents recovering communication after a stroke",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [
          "Najiya P M is an RCI-registered Speech-Language Pathologist (CRR No: A84512) with an M.Sc. in Speech-Language Pathology and certification in Oral Placement Therapy. She works with every family directly, from the first consultation to the last session.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we start therapy from the Gulf, the UK or the US?",
        a: "Yes. Sessions are online, so you can join from any country with a reliable internet connection. We schedule sessions in Indian Standard Time and work with you to find a slot that suits your time zone.",
      },
      {
        q: "Is it a problem that we speak Malayalam at home?",
        a: "No. Being bilingual does not cause speech delay. Sessions are in English, and we encourage you to keep using Malayalam at home, since a strong home language supports your child's development.",
      },
      {
        q: "Can therapy continue when we visit Kerala?",
        a: "Yes. As long as you have a stable internet connection, sessions continue as normal wherever you are, so holidays at home don't have to interrupt progress.",
      },
      {
        q: "Should I wait to see if my bilingual child catches up?",
        a: "If you are worried, it is better to get an assessment than to wait. Early support makes a real difference, and an assessment will tell you whether your child needs therapy at all.",
      },
      {
        q: "How do we get started from abroad?",
        a: "Fill in the appointment form or message us on WhatsApp, and mention the country and time zone you are in. We will arrange an initial consultation at a time that works for both sides.",
      },
    ],
    relatedPosts: [
      "speech-milestones-by-age-kerala-parents",
      "speech-delay-vs-autism-early-signs",
    ],
  },
];
