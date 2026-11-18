// Country landing pages outside India, the UAE and the UK (those live in
// landingPages.js). Same rules apply: each page is written for its own
// audience, sessions are in multiple languages only, and every page states
// plainly which registrations Najiya holds (RCI, India and DOH, UAE) rather
// than implying a local licence.

const country = (name) => ({ "@type": "Country", name });
const city = (name) => ({ "@type": "City", name });

const REGISTRATION =
  "Najiya P M holds an M.Sc. in Speech-Language Pathology, is certified in Oral Placement Therapy (OPT) and is registered with the Rehabilitation Council of India (CRR No: A84512) and the Department of Health (DOH), UAE. She works with every family directly, from the first consultation onwards.";

export const ABROAD_PAGES = [
  {
    id: "us",
    region: "North America",
    path: "/online-speech-therapy-usa",
    navLabel: "US",
    seoTitle: "Online Speech Therapy in the USA | Speech Connect",
    seoDescription:
      "Online speech therapy for Malayali and Indian families across the USA. Live sessions in multiple languages with an RCI-registered therapist.",
    eyebrow: "United States",
    heading: ["Online speech therapy for families", "in the USA"],
    intro:
      "From New Jersey and New York to Houston, Dallas, Chicago and the Bay Area, Malayali and Indian families in the US can work with a speech-language pathologist who understands a bilingual Kerala home, by live video call.",
    areaServed: [country("United States"), city("New York"), city("Houston"), city("Dallas"), city("Chicago")],
    sections: [
      {
        heading: "Why families in the US reach out to us",
        paragraphs: [
          "Most Indian families we hear from in the US already know about Early Intervention and school-based services. What they are looking for is something extra: a therapist who understands why a child might hear Malayalam from grandparents, English at daycare and Hindi from the neighbours, and who will not tell them to drop their home language.",
          "Others are on a waiting list for a local evaluation, or have services that cover only a short session each week, and want to keep progress going in between. Online sessions with Speech Connect can sit alongside the support you already have.",
        ],
      },
      {
        heading: "Working across the time difference",
        paragraphs: [
          "India is nine and a half to ten and a half hours ahead of the US East Coast, depending on daylight saving, and twelve and a half to thirteen and a half hours ahead of the West Coast. Sessions run Monday to Saturday on Indian Standard Time, so Indian evening slots fall in your morning.",
          "That suits families on the East Coast and in the Central time zone best, particularly for toddlers who are not yet at school and for Saturday mornings. West Coast families need more planning; tell us your city when you get in touch and we will look at what is realistic.",
        ],
      },
      {
        heading: "Keeping Malayalam alive at home",
        paragraphs: [
          "Many parents in the US worry that speaking Malayalam at home will hold their child back at school. Research consistently shows that growing up with two languages does not cause speech or language delay, and a strong home language supports English rather than competing with it.",
          "Sessions are available in multiple languages, including English and Malayalam. Some families choose Malayalam so that grandparents can join in; others choose English to match preschool. Either way, we will help you use both languages with confidence.",
        ],
      },
      {
        heading: "Who we help in the US",
        paragraphs: ["Families across the US most often come to us about:"],
        points: [
          "Toddlers who are late to talk, in English, Malayalam or both",
          "Autistic children, with neurodiversity-affirming communication support",
          "Stuttering in children and teenagers",
          "Unclear speech and speech sound difficulties",
          "Parents or grandparents recovering communication after a stroke",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [REGISTRATION],
      },
    ],
    faqs: [
      {
        q: "Can we book from anywhere in the US?",
        a: "Families from any state can contact us. Because sessions follow Indian Standard Time, East Coast and Central time zones are the easiest to schedule; tell us your city and we will check what times work.",
      },
      {
        q: "Is Najiya licensed in the US?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and the Department of Health (DOH), UAE. Speech-language pathology is regulated by each US state, so if you need services covered by insurance, Early Intervention or a school plan, check their requirements before booking.",
      },
      {
        q: "Can online sessions run alongside Early Intervention or school services?",
        a: "Yes, many families use online sessions as extra support. Let us know what other therapy your child receives so the plans can work together.",
      },
      {
        q: "Are sessions available in Malayalam?",
        a: "Yes. Sessions are available in multiple languages, including English and Malayalam, so you can choose the language your child understands best.",
      },
    ],
    relatedPosts: ["malayalam-speech-therapy-uae-bilingual-children", "how-to-help-a-late-talker-at-home"],
  },

  {
    id: "saudi-arabia",
    region: "Middle East",
    path: "/online-speech-therapy-saudi-arabia",
    navLabel: "Saudi Arabia",
    seoTitle: "Online Speech Therapy in Saudi Arabia | Speech Connect",
    seoDescription:
      "Online speech therapy for families in Riyadh, Jeddah, Dammam and across Saudi Arabia. Sessions in multiple languages with Najiya P M.",
    eyebrow: "Saudi Arabia",
    heading: ["Online speech therapy", "in Saudi Arabia"],
    intro:
      "Families in Riyadh, Jeddah, Dammam, Al Khobar, Jubail and across the Kingdom can work with an RCI- and DOH-registered speech-language pathologist by live video call, in multiple languages.",
    areaServed: [country("Saudi Arabia"), city("Riyadh"), city("Jeddah"), city("Dammam")],
    sections: [
      {
        heading: "Finding a speech therapist in Saudi Arabia",
        paragraphs: [
          "Indian families in Saudi Arabia often tell us that finding a speech therapist who speaks their language, at a time that fits, is the hardest part. Clinics may be far away, appointments may clash with long working days, and outside the big cities the choice can be very limited.",
          "Online sessions bring therapy home. Your child works with the same therapist every week, from a room they know, with a parent alongside to learn every strategy.",
        ],
      },
      {
        heading: "Easy timings from Saudi Arabia",
        paragraphs: [
          "India is two and a half hours ahead of Saudi Arabia. Sessions run Monday to Saturday with flexible timings, so after-school slots in Saudi Arabia fall in the Indian late afternoon or evening.",
          "Saturday is part of the Saudi weekend, which makes it a popular day for families who want sessions without rushing after school or work.",
        ],
      },
      {
        heading: "Arabic, English and Malayalam",
        paragraphs: [
          "Many children in Saudi Arabia hear Malayalam or another Indian language at home, English at an Indian-curriculum school and Arabic around them every day. That is not a cause of speech delay: research shows children can learn several languages without being held back.",
          "If a child is genuinely delayed, the delay appears in every language, and it is worth acting on. Sessions are available in multiple languages, including English and Malayalam, whichever your child understands best.",
        ],
      },
      {
        heading: "Who we help",
        paragraphs: ["Families across Saudi Arabia come to us about:"],
        points: [
          "Toddlers and preschoolers who are late to talk",
          "Communication support for autistic children",
          "Stuttering and stammering",
          "Unclear speech and misarticulation",
          "Adults recovering speech and language after a stroke",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [REGISTRATION],
      },
    ],
    faqs: [
      {
        q: "What time are sessions in Saudi time?",
        a: "India is two and a half hours ahead of Saudi Arabia. Sessions run Monday to Saturday, and most families choose an after-school weekday slot or a Saturday.",
      },
      {
        q: "Are you licensed in Saudi Arabia?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and the Department of Health (DOH), UAE. If your school or insurer requires a provider licensed by the Saudi Commission for Health Specialties, please check with them before booking.",
      },
      {
        q: "Are sessions available in Malayalam?",
        a: "Yes. Sessions are available in multiple languages, including English and Malayalam.",
      },
      {
        q: "How do we get started?",
        a: "Fill in the appointment form or message us on WhatsApp, mention that you are in Saudi Arabia and which city, and we will arrange a first consultation.",
      },
    ],
    relatedPosts: ["malayalam-speech-therapy-uae-bilingual-children", "how-to-help-a-late-talker-at-home"],
  },

  {
    id: "qatar",
    region: "Middle East",
    path: "/online-speech-therapy-qatar",
    navLabel: "Qatar",
    seoTitle: "Online Speech Therapy in Qatar | Speech Connect",
    seoDescription:
      "Online speech therapy for families in Doha and across Qatar. Live sessions in multiple languages with an RCI- and DOH-registered therapist.",
    eyebrow: "Qatar",
    heading: ["Online speech therapy", "in Qatar"],
    intro:
      "Families in Doha, Al Wakrah, Al Khor and across Qatar can work with a speech-language pathologist by live video call, in multiple languages, without adding another journey to a busy week.",
    areaServed: [country("Qatar"), city("Doha")],
    sections: [
      {
        heading: "Therapy that fits family life in Qatar",
        paragraphs: [
          "Parents in Qatar often juggle long working hours, school runs and the summer heat, when even a short trip across Doha takes planning. Weekly therapy appointments can be hard to keep up, and missed sessions slow progress.",
          "With online therapy, sessions happen at home. A parent sits beside the child, learns each activity as it is used, and carries it into everyday routines like mealtimes and bedtime stories.",
        ],
      },
      {
        heading: "Timings from Qatar",
        paragraphs: [
          "India is two and a half hours ahead of Qatar. Sessions run Monday to Saturday with flexible timings, and after-school slots in Doha line up with the Indian evening.",
          "Because Saturday is part of the weekend in Qatar, many families keep a regular Saturday session.",
        ],
      },
      {
        heading: "When a child is learning several languages",
        paragraphs: [
          "Children in Qatar often hear Malayalam at home, English at school and Arabic in the wider community. Parents sometimes worry this is why their child is slow to talk, but learning more than one language does not cause delay.",
          "We will never ask you to give up your home language. Sessions are available in multiple languages, including English and Malayalam, and the home strategies you learn work in any language your family uses.",
        ],
      },
      {
        heading: "Who we help",
        paragraphs: ["Families in Qatar come to us about:"],
        points: [
          "Late talking and language delay",
          "Autism, with neurodiversity-affirming support",
          "Stuttering in children and adults",
          "Speech sound difficulties",
          "Communication after a stroke",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [REGISTRATION],
      },
    ],
    faqs: [
      {
        q: "What time are sessions in Qatar time?",
        a: "India is two and a half hours ahead of Qatar. Sessions run Monday to Saturday with flexible timings.",
      },
      {
        q: "Are you licensed in Qatar?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and the Department of Health (DOH), UAE. If your school or insurer requires a provider licensed in Qatar, please check with them before booking.",
      },
      {
        q: "Can we have sessions in Malayalam?",
        a: "Yes. Sessions are available in multiple languages, including English and Malayalam.",
      },
      {
        q: "How do we book from Qatar?",
        a: "Fill in the appointment form or message us on WhatsApp, mention that you are in Qatar, and we will arrange a first consultation.",
      },
    ],
    relatedPosts: ["malayalam-speech-therapy-uae-bilingual-children", "how-to-help-a-late-talker-at-home"],
  },

  {
    id: "oman",
    region: "Middle East",
    path: "/online-speech-therapy-oman",
    navLabel: "Oman",
    seoTitle: "Online Speech Therapy in Oman | Speech Connect",
    seoDescription:
      "Online speech therapy for families in Muscat, Salalah, Sohar and across Oman. Sessions in multiple languages with Najiya P M.",
    eyebrow: "Oman",
    heading: ["Online speech therapy", "in Oman"],
    intro:
      "Whether you live in Muscat, Salalah, Sohar or Nizwa, your child can work with a qualified speech-language pathologist by live video call, in multiple languages.",
    areaServed: [country("Oman"), city("Muscat"), city("Salalah"), city("Sohar")],
    sections: [
      {
        heading: "Distance should not decide your child's care",
        paragraphs: [
          "Oman is a big country, and specialist services tend to be concentrated in Muscat. Families in Salalah, Sohar, Nizwa or smaller towns can face long drives, or simply have no speech therapist nearby.",
          "Online sessions remove that barrier. Wherever you are in Oman, you get the same therapist, the same assessment and the same plan.",
        ],
      },
      {
        heading: "The closest time zone to India",
        paragraphs: [
          "India is only one and a half hours ahead of Oman, so finding a slot is easy. Sessions run Monday to Saturday with flexible timings, and after-school sessions fit comfortably into the Indian afternoon and evening.",
          "Saturday is part of the weekend in Oman, so a regular Saturday session works well for many families.",
        ],
      },
      {
        heading: "Languages at home and at school",
        paragraphs: [
          "Many Indian children in Oman speak Malayalam at home and English at school, and hear Arabic every day. That mix does not cause speech delay. Keep using your home language with your child: it gives them a strong base for every other language they learn.",
          "Sessions are available in multiple languages, including English and Malayalam, so you can choose the one your child is most comfortable with.",
        ],
      },
      {
        heading: "Who we help",
        paragraphs: ["Families across Oman come to us about:"],
        points: [
          "Toddlers who are late to talk",
          "Communication support for autistic children",
          "Stuttering and stammering",
          "Unclear speech",
          "Stroke recovery, aphasia and dysarthria in adults",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [REGISTRATION],
      },
    ],
    faqs: [
      {
        q: "What time are sessions in Oman?",
        a: "India is one and a half hours ahead of Oman. Sessions run Monday to Saturday with flexible timings.",
      },
      {
        q: "Are you licensed in Oman?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and the Department of Health (DOH), UAE. If your school or insurer requires a provider licensed in Oman, please check with them before booking.",
      },
      {
        q: "Do you offer sessions in Malayalam?",
        a: "Yes. Sessions are available in multiple languages, including English and Malayalam.",
      },
      {
        q: "We live outside Muscat. Can we still book?",
        a: "Yes. Sessions are online, so families anywhere in Oman can book, as long as they have a stable internet connection.",
      },
    ],
    relatedPosts: ["malayalam-speech-therapy-uae-bilingual-children", "how-to-help-a-late-talker-at-home"],
  },

  {
    id: "kuwait",
    region: "Middle East",
    path: "/online-speech-therapy-kuwait",
    navLabel: "Kuwait",
    seoTitle: "Online Speech Therapy in Kuwait | Speech Connect",
    seoDescription:
      "Online speech therapy for families in Kuwait City, Abbasiya, Salmiya and across Kuwait. Live sessions in multiple languages.",
    eyebrow: "Kuwait",
    heading: ["Online speech therapy", "in Kuwait"],
    intro:
      "Families in Kuwait City, Abbasiya, Salmiya, Fahaheel, Mangaf and across Kuwait can work with an RCI- and DOH-registered speech-language pathologist by live video call, in multiple languages.",
    areaServed: [country("Kuwait"), city("Kuwait City")],
    sections: [
      {
        heading: "Support without the traffic",
        paragraphs: [
          "Kuwait has a large Malayali community, and many parents we speak to describe the same routine: both parents working, children in school until the afternoon, and evening traffic that makes clinic visits difficult. Therapy often slips down the list, even when everyone knows it matters.",
          "Online sessions take the travel out. Your child works from home, a parent learns alongside, and practice becomes part of daily life instead of an extra trip.",
        ],
      },
      {
        heading: "Timings from Kuwait",
        paragraphs: [
          "India is two and a half hours ahead of Kuwait. Sessions run Monday to Saturday with flexible timings, so after-school slots in Kuwait sit comfortably in the Indian evening.",
          "Saturday is a weekend day in Kuwait, which makes it a convenient day for regular sessions.",
        ],
      },
      {
        heading: "Malayalam at home is a strength",
        paragraphs: [
          "Parents in Kuwait sometimes hear that they should switch to English at home to help their child at school. Please don't. Learning more than one language does not cause speech delay, and children with a strong home language often pick up English more easily.",
          "Sessions are available in multiple languages, including English and Malayalam, so grandparents and other family members can take part too.",
        ],
      },
      {
        heading: "Who we help",
        paragraphs: ["Families in Kuwait come to us about:"],
        points: [
          "Late talking and language delay",
          "Autism and communication",
          "Stuttering and stammering",
          "Speech clarity",
          "Adults recovering after a stroke",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [REGISTRATION],
      },
    ],
    faqs: [
      {
        q: "What time are sessions in Kuwait time?",
        a: "India is two and a half hours ahead of Kuwait. Sessions run Monday to Saturday with flexible timings.",
      },
      {
        q: "Are you licensed in Kuwait?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and the Department of Health (DOH), UAE. If your school or insurer requires a provider licensed in Kuwait, please check with them before booking.",
      },
      {
        q: "Are sessions available in Malayalam?",
        a: "Yes. Sessions are available in multiple languages, including English and Malayalam.",
      },
      {
        q: "How do we get started from Kuwait?",
        a: "Fill in the appointment form or message us on WhatsApp, mention that you are in Kuwait, and we will arrange a first consultation.",
      },
    ],
    relatedPosts: ["malayalam-speech-therapy-uae-bilingual-children", "how-to-help-a-late-talker-at-home"],
  },

  {
    id: "bahrain",
    region: "Middle East",
    path: "/online-speech-therapy-bahrain",
    navLabel: "Bahrain",
    seoTitle: "Online Speech Therapy in Bahrain | Speech Connect",
    seoDescription:
      "Online speech therapy for families in Manama, Riffa, Muharraq and across Bahrain. Sessions in multiple languages with Najiya P M.",
    eyebrow: "Bahrain",
    heading: ["Online speech therapy", "in Bahrain"],
    intro:
      "Families in Manama, Riffa, Muharraq, Isa Town and across Bahrain can work with a qualified speech-language pathologist by live video call, in multiple languages.",
    areaServed: [country("Bahrain"), city("Manama")],
    sections: [
      {
        heading: "A wider choice of therapist",
        paragraphs: [
          "Bahrain is small, but that can also mean a small choice of speech therapists, and fewer still who understand a Malayali or Indian home. Families tell us they want someone who can talk to grandparents, respects the languages spoken at home and has time to coach parents properly.",
          "Online therapy widens the choice. You get regular, one-to-one sessions with the same therapist, planned around your family's week.",
        ],
      },
      {
        heading: "Timings from Bahrain",
        paragraphs: [
          "India is two and a half hours ahead of Bahrain. Sessions run Monday to Saturday with flexible timings, so after-school slots in Bahrain fall in the Indian evening, and Saturday sessions fit the Bahraini weekend.",
        ],
      },
      {
        heading: "Language and your child",
        paragraphs: [
          "Children in Bahrain often grow up with Malayalam or another Indian language at home, English at school and Arabic around them. Growing up with several languages does not cause speech delay, so there is no need to give any of them up.",
          "Sessions are available in multiple languages, including English and Malayalam. Choose whichever your child understands best, and keep using your home language every day.",
        ],
      },
      {
        heading: "Who we help",
        paragraphs: ["Families in Bahrain come to us about:"],
        points: [
          "Toddlers who are late to talk",
          "Autistic children and communication",
          "Stuttering",
          "Unclear speech and misarticulation",
          "Adults recovering speech after a stroke",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [REGISTRATION],
      },
    ],
    faqs: [
      {
        q: "What time are sessions in Bahrain?",
        a: "India is two and a half hours ahead of Bahrain. Sessions run Monday to Saturday with flexible timings.",
      },
      {
        q: "Are you licensed in Bahrain?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and the Department of Health (DOH), UAE. If your school or insurer requires a provider licensed by Bahrain's National Health Regulatory Authority, please check with them before booking.",
      },
      {
        q: "Are sessions available in Malayalam?",
        a: "Yes. Sessions are available in multiple languages, including English and Malayalam.",
      },
      {
        q: "How do we book from Bahrain?",
        a: "Fill in the appointment form or message us on WhatsApp, mention that you are in Bahrain, and we will arrange a first consultation.",
      },
    ],
    relatedPosts: ["malayalam-speech-therapy-uae-bilingual-children", "how-to-help-a-late-talker-at-home"],
  },

  {
    id: "canada",
    region: "North America",
    path: "/online-speech-therapy-canada",
    navLabel: "Canada",
    seoTitle: "Online Speech Therapy in Canada | Speech Connect",
    seoDescription:
      "Online speech therapy for Malayali and Indian families in Toronto, Brampton, Calgary, Edmonton and across Canada, in multiple languages.",
    eyebrow: "Canada",
    heading: ["Online speech therapy for families", "in Canada"],
    intro:
      "Malayali and Indian families in Toronto, Brampton, Mississauga, Calgary, Edmonton, Vancouver and across Canada can work with a speech-language pathologist who understands a bilingual Kerala home, by live video call.",
    areaServed: [country("Canada"), city("Toronto"), city("Calgary"), city("Edmonton")],
    sections: [
      {
        heading: "Why Canadian families get in touch",
        paragraphs: [
          "Many newcomer families in Canada tell us the same thing: they are waiting for a publicly funded assessment, private sessions are expensive, and they would like someone who understands why their child hears Malayalam at home and English at daycare.",
          "Online sessions with Speech Connect can give you guidance and regular practice while you wait, or extra support alongside local services.",
        ],
      },
      {
        heading: "Scheduling across time zones",
        paragraphs: [
          "India is nine and a half to ten and a half hours ahead of Ontario and Quebec, and further ahead of Alberta and British Columbia. Sessions run Monday to Saturday on Indian Standard Time, so Indian evening slots fall in your morning.",
          "That works best for families in eastern Canada, especially for preschoolers and Saturday mornings. Families further west need more planning; tell us your city and we will look at what is possible.",
        ],
      },
      {
        heading: "Keeping your home language",
        paragraphs: [
          "Newcomer parents are sometimes told to speak only English at home. Research shows that maintaining the home language does not cause speech delay and supports a child's overall development, including their English.",
          "Sessions are available in multiple languages, including English and Malayalam, and we will coach you to use language-building strategies in whichever language you speak at home.",
        ],
      },
      {
        heading: "Who we help in Canada",
        paragraphs: ["Families across Canada come to us about:"],
        points: [
          "Late talking in toddlers and preschoolers",
          "Communication support for autistic children",
          "Stuttering",
          "Speech sound difficulties",
          "Parents or grandparents recovering after a stroke",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [REGISTRATION],
      },
    ],
    faqs: [
      {
        q: "Is Najiya registered in Canada?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and the Department of Health (DOH), UAE. Speech-language pathology is regulated by each Canadian province, so if you need services covered by insurance or required by a school, check their requirements before booking.",
      },
      {
        q: "What times are available from Canada?",
        a: "Sessions follow Indian Standard Time, so Indian evening slots fall in the Canadian morning. Eastern Canada is the easiest to schedule; tell us your city and we will check what works.",
      },
      {
        q: "Can online sessions run alongside local services?",
        a: "Yes. Many families use online sessions while they wait for, or alongside, local services. Let us know about any other therapy so the plans fit together.",
      },
      {
        q: "Are sessions available in Malayalam?",
        a: "Yes. Sessions are available in multiple languages, including English and Malayalam.",
      },
    ],
    relatedPosts: ["malayalam-speech-therapy-uae-bilingual-children", "how-to-help-a-late-talker-at-home"],
  },

  {
    id: "australia",
    region: "Asia-Pacific",
    path: "/online-speech-therapy-australia",
    navLabel: "Australia",
    seoTitle: "Online Speech Therapy in Australia | Speech Connect",
    seoDescription:
      "Online speech therapy for Malayali and Indian families in Melbourne, Sydney, Brisbane, Perth and across Australia, in multiple languages.",
    eyebrow: "Australia",
    heading: ["Online speech therapy for families", "in Australia"],
    intro:
      "Malayali and Indian families in Melbourne, Sydney, Brisbane, Perth, Adelaide and across Australia can work with a speech-language pathologist by live video call, in multiple languages, at after-school times.",
    areaServed: [country("Australia"), city("Melbourne"), city("Sydney"), city("Brisbane"), city("Perth")],
    sections: [
      {
        heading: "Why Australian families choose online sessions",
        paragraphs: [
          "Parents in Australia often face long waits for a speech pathologist, especially in growing suburbs and regional areas. Many Indian families also want a therapist who understands a home where Malayalam is spoken and grandparents visit for months at a time.",
          "Online sessions with Speech Connect give your child regular, one-to-one support from home, with a parent learning every strategy alongside them.",
        ],
      },
      {
        heading: "After-school timings that work",
        paragraphs: [
          "Australia is ahead of India: by four and a half to five and a half hours on the east coast, depending on daylight saving, and by two and a half hours in Perth. Sessions run Monday to Saturday on Indian Standard Time, so Indian morning and midday slots fall in your afternoon.",
          "That makes after-school sessions easy to arrange, which is rarely true for families in Europe or the Americas.",
        ],
      },
      {
        heading: "Two languages, no delay",
        paragraphs: [
          "Many children in Australia hear Malayalam at home and English at childcare. Learning two languages does not cause speech or language delay, and dropping the home language usually takes away the richest conversations a child has with their parents.",
          "Sessions are available in multiple languages, including English and Malayalam, so you can choose the language that suits your child best.",
        ],
      },
      {
        heading: "Who we help in Australia",
        paragraphs: ["Families across Australia come to us about:"],
        points: [
          "Toddlers who are late to talk",
          "Autistic children, with neurodiversity-affirming support",
          "Stuttering",
          "Speech sound difficulties",
          "Adults recovering communication after a stroke",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [REGISTRATION],
      },
    ],
    faqs: [
      {
        q: "What times are sessions in Australia?",
        a: "Australia is two and a half to five and a half hours ahead of India, depending on your state and daylight saving. Indian morning and midday slots fall in the Australian afternoon, so after-school sessions are easy to arrange.",
      },
      {
        q: "Can we claim sessions through NDIS or private health insurance?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and the Department of Health (DOH), UAE. Funding rules vary, so check with your NDIS plan manager or insurer before booking if you want to claim.",
      },
      {
        q: "Are sessions available in Malayalam?",
        a: "Yes. Sessions are available in multiple languages, including English and Malayalam.",
      },
      {
        q: "How do we get started from Australia?",
        a: "Fill in the appointment form or message us on WhatsApp, mention your city, and we will arrange a first consultation at a time that suits you.",
      },
    ],
    relatedPosts: ["malayalam-speech-therapy-uae-bilingual-children", "how-to-help-a-late-talker-at-home"],
  },

  {
    id: "ireland",
    region: "Europe",
    path: "/online-speech-therapy-ireland",
    navLabel: "Ireland",
    seoTitle: "Online Speech Therapy in Ireland | Speech Connect",
    seoDescription:
      "Online speech therapy for Malayali and Indian families in Dublin, Cork, Limerick, Galway and across Ireland, in multiple languages.",
    eyebrow: "Ireland",
    heading: ["Online speech therapy for families", "in Ireland"],
    intro:
      "Ireland is home to a large Malayali community, many working in healthcare. Families in Dublin, Cork, Limerick, Galway and across the country can work with a speech-language pathologist by live video call, in multiple languages.",
    areaServed: [country("Ireland"), city("Dublin"), city("Cork")],
    sections: [
      {
        heading: "When you are waiting for an appointment",
        paragraphs: [
          "Parents in Ireland often tell us about long waits for speech and language therapy, and about shift patterns that make regular clinic appointments hard to keep. For a toddler who is late to talk, those months matter.",
          "Online sessions can give you practical guidance and regular practice while you wait, or extra support alongside local services. Your child works from home, and a parent learns every strategy as it is used.",
        ],
      },
      {
        heading: "Timings from Ireland",
        paragraphs: [
          "India is five and a half hours ahead of Ireland in winter and four and a half hours ahead in summer. Sessions run Monday to Saturday on Indian Standard Time, so Indian afternoon and evening slots fall in your morning or early afternoon.",
          "That suits preschoolers, parents working shifts and Saturday mornings.",
        ],
      },
      {
        heading: "Malayalam, English and Irish",
        paragraphs: [
          "Children in Ireland may hear Malayalam at home, English everywhere else, and Irish at primary school. Parents sometimes worry this is too much. It is not: children can learn several languages, and multilingualism does not cause speech delay.",
          "Sessions are available in multiple languages, including English and Malayalam. Keep using your home language with your child every day.",
        ],
      },
      {
        heading: "Who we help in Ireland",
        paragraphs: ["Families across Ireland come to us about:"],
        points: [
          "Late talking and language delay",
          "Communication support for autistic children",
          "Stammering and stuttering",
          "Speech sound difficulties",
          "Communication after a stroke",
        ],
      },
      {
        heading: "Your therapist",
        paragraphs: [REGISTRATION],
      },
    ],
    faqs: [
      {
        q: "Is Najiya registered with CORU?",
        a: "Najiya P M is registered with the Rehabilitation Council of India and the Department of Health (DOH), UAE. If you need a CORU-registered speech and language therapist for HSE, school or insurance purposes, please check their requirements before booking.",
      },
      {
        q: "What times are sessions in Ireland?",
        a: "India is four and a half to five and a half hours ahead of Ireland, depending on the time of year. Most families choose a morning, early afternoon or Saturday slot.",
      },
      {
        q: "Can online sessions run alongside HSE services?",
        a: "Yes. Many families use online sessions while they wait for, or alongside, local services. Let us know about any other therapy so the plans work together.",
      },
      {
        q: "Are sessions available in Malayalam?",
        a: "Yes. Sessions are available in multiple languages, including English and Malayalam.",
      },
    ],
    relatedPosts: ["malayalam-speech-therapy-uae-bilingual-children", "how-to-help-a-late-talker-at-home"],
  },
];
