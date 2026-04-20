import type { Payload } from 'payload'

type LexicalFormat = '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'

function makeLexical(text: string) {
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return {
    root: {
      type: 'root',
      format: '' as LexicalFormat,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((p) => ({
        type: 'paragraph',
        format: '' as LexicalFormat,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        children: [
          {
            mode: 'normal' as const,
            text: p,
            type: 'text',
            format: 0,
            detail: 0,
            style: '',
            version: 1,
          },
        ],
      })),
    },
  }
}

const TESTIMONIALS = [
  // ── General Reviews ──────────────────────────────────────────────────────────
  {
    title: 'Not Enough Superlatives — My Unexpected Piano Journey',
    slug: 'not-enough-superlatives-joani-waltham',
    customerName: 'Joani',
    location: 'Waltham, MA',
    publishedAt: '2025-05-04T00:00:00.000Z',
    content: `There are not enough superlatives in my thesaurus to sing the praises of my experience with Roger's Piano.

Since removing an antique player piano that I had inherited several years ago (which took up half of my living room), I decided to purchase a more manageable piece since I missed playing, but it was a back-burner item agenda.

I have never had any formal training but wanted to make an investment vs. just an old clunker from a thrift store. After a computer search for local stores, Roger's was my most convenient location. I checked their BBB A-Plus rating and decided I need look no further for a seller.

So as a respite from my never-ending yard work on a recent Wednesday morning, I decided to give them a call as merely a fact-finding mission as to what is out there. I left a telephone message for a call-back, which I received a short while later.

I had the immense pleasure of speaking with Carol. I quickly identified myself as a Phillistine right down to not even knowing piano models. Carol patiently explained types, pricing and availability at some length and suggested I set up an appointment. I let her know that this was my first foray in purchasing, and if she did not hear from me for a while to feel free to contact me.

From the rapport I felt from Carol's obvious knowledge and her warmth of character – coupled with the now-present threat of potential tariffs – I went to their on-line site just two days later to set up an appointment at one of their two showrooms. The appointment scheduling is unbelievably flexible, with prompt response.

Two days later I walked out of their Burlington location with a contract for a piano beyond my wildest dreams. I was free to ask any and all questions and play as many models of their impressive selection as I wanted to make my decision. And there was never even an inkling of a hard sell.

With the obvious quality of the models I tested and Roger's product purchase guarantee and follow-up, I feel completely assured that I made an excellent choice.

I only regret I did not get to meet Roger, and I hope my playing can justify the beauty I chose.`,
  },
  {
    title: 'An Apples-to-Apples Comparison — and Expertise That Made All the Difference',
    slug: 'apples-to-apples-comparison-tatiana-razova',
    customerName: 'Tatiana Razova',
    location: '',
    content: `I had an outstanding experience with Carol at Roger's Piano. From the start, it was clear they weren't just trying to sell me a piano — they wanted me to find the instrument that truly fit me.

Carol created a thoughtful, patient, and completely unpressured environment. Even as I tried multiple models, I never felt rushed or overlooked — the appointment always felt focused on me. She set all the pianos to identical tone and software settings so I could make a true apples-to-apples comparison, which made a huge difference in understanding each instrument.

Her deep knowledge of Kawai's technology and history, combined with her supportive guidance, made the entire process feel both educational and empowering. I never felt steered or dismissed — only respected.

If you want expertise, patience, and a dealership that genuinely cares about helping you find the right piano, I can't recommend this team highly enough.`,
  },
  {
    title: 'A Piano for the Grandkids — A Home Run Experience',
    slug: 'piano-for-grandkids-marc-joseffer',
    customerName: 'Marc Joseffer',
    location: '',
    content: `My wife and I wanted to give our granddaughter and grandson a piano for Christmas. They both are taking lessons and play quite well for youngsters. They've been playing on an electric keyboard for a few years and are ready for a real piano.

We visited Arlington a few weeks back and parents, grandkids and grandparents were off to see if we could find a piano that would work for them. Carol at Roger's Piano was great. She encouraged the kids to play several different pianos and I think even she was impressed with their musical abilities.

Carol hung back and when needed explained info about the manufacturer, the construction of each piano and patiently answered all of our questions. My grandkids really took the task seriously and soon we all agreed on one instrument that fit the bill and produced a marvelous tone.

Then, Carol took over and explained the warranty provided by the manufacturer, how her company handles delivery of the new piano and future tuning once the piano is delivered. The whole experience was comfortable and professional.

Once the piano was delivered our grandchildren started filling the house with wonderful music on their new piano. It was a home run! We highly recommend Roger's Piano and Carol if you want a quality experience purchasing a piano. Alice and Marc`,
  },
  {
    title: "Roger Came Within One Hour — He Saved Our Daughter's Audition",
    slug: 'roger-saved-audition-cong-lei',
    customerName: 'Cong Lei',
    location: '',
    content: `Outstanding and heartfelt thanks to Roger Piano! Yesterday afternoon, in the middle of my daughter's intensive preparation for her NEC Prep audition next week, one of our piano keys suddenly stopped working. We were extremely anxious — but Roger came to the rescue.

Within just ONE hour, he was at our home, quickly diagnosed the issue, and fixed it flawlessly. His professionalism, speed, and dedication were simply incredible.

Roger didn't just repair a piano — he saved a critical practice day and gave us peace of mind. We are deeply grateful, and we wholeheartedly recommend Roger Piano to anyone who wants the very BEST service and best piano!!!`,
  },
  {
    title: 'Burlington Showroom: Over the Top Customer Service',
    slug: 'burlington-showroom-elizabeth-p',
    customerName: 'Elizabeth P.',
    location: '',
    content: `Roger's piano showroom in Burlington is incredible! It is full of different manufacturers and styles, new and old — a perfect opportunity to learn about the sound, price and quality of different instruments.

I purchased a refurbished baby grand and had Roger and his technician install a player system. Roger and Carol came to my home upon delivery and ensured we were happy with the purchase and answered every question about the player system.

Over the top customer service! We love our new piano! Thank you Roger and your staff.`,
  },
  {
    title: 'Kawai CA 901: Carol Went Above and Beyond During a Family Crisis',
    slug: 'kawai-ca901-max-decurtins',
    customerName: 'Max DeCurtins',
    location: '',
    content: `Working with Carol was a dream. I can't accommodate an acoustic piano in my house so I knew I was searching for a digital piano that got as close as possible to the real thing. I had already heard about Kawai's digital pianos and Carol helped me get to know the Kawai CA 901, which is what I ultimately ended up purchasing — the action is excellent and the sound board makes for a wonderful warmth.

During the process I let Carol know that I was dealing with a family crisis and would have to be out of town for several months. She was so patient and warm, and reached out to me more than once to inquire about my wellbeing and that of my family, while also informing me of an opportunity for a better financing deal and coordinating with me on the delivery.

I've had my piano now almost 2 weeks and I can't get enough of it. Roger's Piano is the way to go!`,
  },
  {
    title: 'Kayserberg Shipped From Overseas — Delivered Ahead of Schedule',
    slug: 'kayserberg-shipped-overseas-gail-locatelli',
    customerName: 'Gail Locatelli',
    location: '',
    content: `Outstanding service. I was completely impressed with Carol and Roger's professionalism and customer service. Carol managed to get my piano shipped to USA in record time with her persistent contact with Kayserberg Piano. The piano quality exceeded my expectations.

After months of searching for my piano, I'm very happy with my purchase.`,
  },
  {
    title: 'Eleven Years of Trust — Honest, Reliable, and Passionate',
    slug: 'eleven-years-of-trust-michael-sayyad',
    customerName: 'Michael Sayyad',
    location: '',
    content: `Beautiful place. Amazing people. I have the pleasure of working with Carol and Roger for 11 years now! They are both honest and reliable. Caring, trustworthy, friendly and courteous. They both love what they do and do it with passion!

I highly recommend Roger's Piano.`,
  },
  {
    title: 'Over a Year of Shopping — Never Any Pressure, Always Respected',
    slug: 'over-a-year-of-shopping-mala-radhakrishnan',
    customerName: 'Mala L. Radhakrishnan',
    location: '',
    content: `Overall, I had a very positive experience and am very happy with my new piano. It was a big purchase for me personally and I spent a long time coming to a decision (over a year), but Carol was always very responsive and patient with me and gave me all the time I needed to try different pianos.

It was clear to me that her piano suggestions really are tailored to customers' personal preferences and budget and that she wasn't trying to sell one brand. Though I did not end up buying something within my original budget, it was not because I wasn't shown many options within my budget — it was more because I fell in love with one particular piano and decided to splurge without any sales pressure whatsoever.

I also feel like I learned a lot about pianos during the buying process, which is a testament to their taking the time to explain things and give you tools and resources to hopefully aid in your coming to your own decision.`,
  },
  {
    title: 'Drove From New Jersey for the Kawai NV-10S — Worth Every Mile',
    slug: 'kawai-nv10s-eddie-pirrera',
    customerName: 'Eddie Pirrera',
    location: 'New Jersey',
    content: `I recently purchased a Kawai Novus NV-10S digital hybrid grand piano from Carol at Roger's Piano in Natick, Mass. I actually own a beautiful 1976 Yamaha C7 (a 7-foot 4-inch Concert Grand) which is unfortunately in storage until some major house renovations are completed. In the meantime I was in need of something that would have the right feel, and as close as possible, the same great sound as a real concert grand.

I did my homework and found that only a few companies were making anything that even came remotely close. That's where Roger's Piano, Carol, and the Kawai NV-10S come into the picture. After my research, I knew that the Kawai would more than likely be the best candidate for my needs, but discovered that very few piano stores had one on the floor for me to try. I live in New Jersey and called every piano store I could in the tri-state area, only to find that I would have to wait a very long time before I could actually play one.

While on a week-long trip to Boston I made a few more calls, found Roger's Piano, and had the good fortune of speaking with Carol — who told me they did in fact have one and I could come in and play it.

Carol is a kind and wonderful person who possesses a wealth of knowledge and information, making her by far one of the best sales people I have ever dealt with. She very kindly allowed me to play the Kawai for as long as I wanted, and then very patiently answered each and every question I asked. She even let me come back the following day so I could play it again and try out a Kawai app I had just downloaded — now that's patience!

Both Carol and Roger were an absolute joy to deal with, making the whole experience one of the simplest and easiest I have ever had in regard to the purchase of a piano. If I could give them more than a five-star rating — I would! Bravo Roger's Piano!`,
  },
  {
    title: "A Beginner's First Piano — Delivered Before Christmas",
    slug: 'beginners-first-piano-grace-shao',
    customerName: 'Grace Shao',
    location: '',
    content: `I went to Roger's Piano after touring a bunch of other stores. As a beginner, I don't play very well and was a bit nervous to play and try the pianos. However, at Roger's Piano, Ms. Wu carefully listened to my thoughts, gave me a couple of recommendations, and encouraged me to play on multiple pianos. I immediately fell in love with one of them, and that's the one I decided to bring home.

It's just amazing how I can find something I love that was even below my budget. The after-purchase service was pleasant as well. Ms. Wu arranged the delivery that weekend so I could have the piano before Christmas. She also quickly sent out a tuner when I expressed concern that the piano sounded slightly off.

I will definitely recommend anyone I know who's looking for a piano to come to Roger's — the purchase experience was truly outstanding.`,
  },
  {
    title: 'A Bechstein Imported From Europe Through COVID — Against All Odds',
    slug: 'bechstein-imported-through-covid-aurel-betz',
    customerName: 'Aurel Betz',
    location: '',
    content: `A piano business with unmatched cultural vision and tenacity. Carol, the owner, managed to import my historical Bechstein from Europe despite COVID and great difficulties with US customs — all while complying with their own published rules regarding original keytops and extinct woods.

If I could give 20 stars I would!`,
  },
  {
    title: 'From Schimmel to Steinway — Winning the Lottery Twice',
    slug: 'schimmel-to-steinway-gustavo-caldas',
    customerName: 'Gustavo Caldas',
    location: '',
    content: `I'm an avid jazz pianist who loves music beyond measure. In 2018 I began my journey looking for the very best, warm and clear sounding piano I could find within a certain price range. Financially, it was the first time in my life I had the chance of actually owning an instrument I would truly love.

It was at Roger's Piano that I found the upright Schimmel of my dreams. Roger immediately understood what I was looking for and without hesitation said, "play it." My wife and I were mesmerized by the beautiful, clear and even tone.

Four years later, it was time to move on to the second chapter: a good Steinway M that could reproduce those unique, golden-hue overtones — or nothing else would take the Schimmel away from my apartment. Well, went back to visit them. Carol invited me to go to their location in Burlington.

There were dozens of contenders from different brands, but as I played the first few chords on the 1945 gem, my wife and I were transfixed. Even though there were issues with regulation and voicing, Roger told me he worked on that piano with tremendous care. My Schimmel would go back into his care (at the full price I had paid), and then the easy process of financing the difference.

"Chauncey," as my wife calls the Steinway M, is now in his new home. Winning the lottery for the second time.`,
  },
  {
    title: 'Carol Drove to Vermont — And Set Up the Piano Herself',
    slug: 'carol-drove-to-vermont-sandra-meyerson',
    customerName: 'Sandra Meyerson',
    location: 'Vermont',
    content: `My husband Matthew and I were searching for an electric piano. We visited Roger's Piano and met with Carol, who was absolutely wonderful to work with. She explained in detail the way in which an electric piano works and showed us the various models that Roger's Piano had in stock. She was very patient and very helpful.

After we decided on a mid-level electric piano, she arranged for the transportation of the piano to our home in Vermont. Due to the difficulties of finding a time to deliver, she drove herself — with the help of her son — all the way up to Northern Vermont to deliver our new piano. She then patiently set up the piano and showed us how to operate it.

We really appreciate Carol and the beautiful electric piano that she helped us find. It looks wonderful in our living room and is providing hours of musical fun for all! If you are interested in an electric piano, please do visit Roger's Piano and you will get top-notch selection and service.`,
  },
  {
    title: 'My Second Piano — Even Better Than the First Purchase',
    slug: 'second-piano-brodmann-paul-smith',
    customerName: 'Paul Smith',
    location: '',
    content: `I recently purchased my second piano from Roger's Piano and the experience was even better than my first purchase (which was also excellent). Carol approached my inquiry with a deep knowledge of the repertoire I have been developing, my skill level, and the character of the pianos themselves.

This is the type of individualized thoughtfulness and deep knowledge that we all want from our doctors. After I tested each piano, I described my impressions to Carol and we discussed them — it was the opposite of high-pressure sales. More like a knowledgeable friend guiding a newcomer.

My new piano is phenomenal (a Brodmann PE 121). When it is time for a grand, I will be coming back to Roger's.`,
  },
  {
    title: 'Ten to Twelve Pianos, Zero Pressure — How a Purchase Should Feel',
    slug: 'ten-pianos-no-pressure-ben-woolston',
    customerName: 'Ben Woolston',
    location: '',
    content: `Carol and Roger were both incredibly friendly and went above and beyond to help me find the right piano. In my first visit to the store, I think I was there for over an hour playing different pianos, and they patiently waited the whole time and gave me any assistance I needed.

Carol also took the time to meet me during non-business hours a couple of weeks later to try some other pianos at their other location. This meant that I could try approximately ten to twelve different pianos, and never felt rushed or hurried to make a decision.

Once I had settled on the right instrument, the sale, delivery, and installation were all very smooth. I was very impressed with the level of service and professionalism, and would highly recommend them to serious pianists who want to take time to find the right instrument in a relaxed, no-pressure environment.`,
  },
  {
    title: 'She Has Found Her Owner — An Eight-Year Search for the Schimmel',
    slug: 'eight-year-search-for-schimmel-maria-pereira',
    customerName: 'Maria Pereira',
    location: '',
    content: `I highly recommend Roger's Piano. My entire experience was so positive and Carol was a joy to work with. I had been in the market for an Upright Schimmel for about 8 years and was beyond excited when Roger's carried the model I was looking for.

From start to finish Carol took care of everything and in her words, "this piano has found its owner!" Thank you so much for helping me bring back the joy of playing such a beautiful instrument. I am forever grateful.

If you're in the market for a piano, this is the place to go! Their customer service is par to none!`,
  },
  {
    title: "A 1914 Bösendorfer 170: The Dream Piano I Never Thought I'd Own",
    slug: '1914-bosendorfer-170-chris-hill',
    customerName: 'Chris Hill',
    location: '',
    content: `If I could give 10 stars, I would! Roger and Carol were absolutely wonderful to work with! Their knowledge of the instruments they carry is just astounding and really helped guide me to the piano I ended up purchasing.

I'm a classically trained pianist who plays for enjoyment, and I was looking to upgrade my old Kawai baby grand. I was agnostic about brand, just looking for a piano that felt and sounded "right."

After playing a few pianos (and almost buying a different one in their store!) I finally, at my husband's urging, reluctantly sat down at a stunning 1914 Bösendorfer 170 that had been completely restored top to bottom. I absolutely fell in love from the first note; everything about it was perfect. It was an actual dream piano of mine that I never thought I'd own!

Hearing me and my husband talk about it, Roger and Carol came over and offered us the deal of a lifetime that we couldn't pass up. They truly care about making sure each customer finds the right piano for them and leaves loving their decision.

On top of that, Roger and Carol also helped me arrange the transport of my old piano to Texas to give to my niece. They really went out of their way to help me! I wouldn't recommend any other place to buy a piano.`,
  },
  {
    title: 'The Fazioli F228 in Pyramid Mahogany — Ready for Carnegie Hall',
    slug: 'fazioli-f228-pyramid-mahogany-lawrence-segan',
    customerName: 'Lawrence Segan',
    location: '',
    content: `I am a conservatory-trained pianist and was looking specifically for a Fazioli, which in my opinion is the best piano in the world today. Roger's Piano had a magnificent and rare Fazioli F228 in "pyramid" mahogany on their showroom floor. It was gorgeous to look at and as fine an instrument as any piano I have ever played.

I must say I was tempted by a Bösendorfer they had which had a wonderful sweet sound, but I was intent on a Fazioli. I bought it on the spot.

About three weeks after delivery, Roger and Carol personally visited my home (about a three-hour drive) and Roger spent the entire afternoon tuning and re-voicing for the room. As a result, the piano feels and sounds as if it were ready for a concert at Carnegie Hall — except it is in my own living room.

Roger and Carol really know pianos, they were extremely accommodating and professional, and they sell some of the finest pianos around. I highly recommend them to anyone who wants a fine instrument.`,
  },
  // ── Steinway European Reviews ─────────────────────────────────────────────
  {
    title: 'Two 2.5-Hour Drives to Natick — Worth Every Mile',
    slug: 'two-drives-to-natick-nancy-fairfield',
    customerName: 'Nancy',
    location: 'Fairfield, CT',
    content: `My search for a new piano began with many weeks of research, phone conversations and emails with retailers in Connecticut, New York, New Jersey, Tennessee, and Utah. YouTube videos consumed time before bed. I had never bought a piano before; I ultimately played dozens of pianos until I found one that I felt a connection with.

My search led me to Roger's Piano in Natick, Mass., primarily because they are the largest showroom in New England. I described the price range and tone profile to Roger, who said he could think of a number of pianos that fit my parameters — and some whose names I probably had never heard of.

Two 2.5-hour drives to Natick culminated in a decision to buy a European-made Czech Republic Petrof mahogany upright, that has a roundness of tone and beautiful music I can elicit from the keys. Co-owner Carol Wu guided me through their sea of pianos. She spent three and a half hours with me in the showroom on each visit. She was a pleasure to work with. Her professionalism is exemplary; I never felt steered to one brand or another, and she answered my questions clearly.

Thank you for reading about my experience, which I hope will help you in your own search for a piano.`,
  },
  {
    title: 'Fifteen Years of Partnership — They Would Surely Be MIT Rocket Scientists',
    slug: 'fifteen-years-customer-iskolnik',
    customerName: 'I. Skolnik',
    location: '',
    content: `Let me say it right out: Roger and Carol, and Roger's Piano, are simply THE best. We have been customers of theirs for nearly 15 years now.

Not only are Roger and Carol simply geniuses (not exaggerating — if they were not musicians who sold and worked on pianos, they would surely be MIT rocket scientists), but they are two of the kindest, most trustworthy and professional people you have ever met. Their knowledge of music and pianos (of ALL kinds: from our little Yamaha upright all the way to half-a-million-dollar Steinways!) is astounding. Yet they are humble and honest.

Whereas most salesmen (no matter what they are selling) would try to up-sell you, Roger and Carol will actually tell you what NOT to waste your money on. Very refreshing, indeed.

A few months back I asked Roger to come over to tune up our piano before a party, and he was so meticulous that I had to say to him: "Roger! It sounds great now! You can stop. Emanuel Ax is not coming to our party!" — and he laughed and just said that he wants to make sure everything is perfect. Because that's the way he is!

Roger and Carol are a great team. That's why we hope to be with them for another 15 years!`,
  },
  {
    title: 'Three Piano Players, a Shigeru Kawai, and a Concert Tuning From Roger Himself',
    slug: 'three-piano-players-shigeru-kawai-kumar-varadaraju',
    customerName: 'Kumar Varadaraju',
    location: '',
    content: `With 3 piano players in the family, we had been planning for years to get our dream grand piano. We visited various dealers in the area and decided to give Roger's Piano a call.

Carol was awesome to work with — she showed us many options in both their showrooms, let us play them as long as we wanted, with no pressure. In our quest for a brand new piano, she also had us try a gently used Shigeru Kawai that we fell in love with and ended up getting. Delivery was done professionally and on time.

A month after we got the piano, Roger (the owner) himself came in to give the piano a full concert tuning and voicing. He spent a few hours on getting it perfect, and the piano is everything we dreamt about.

It is clear that this is a firm that is extremely knowledgeable and passionate about pianos, and is in the business because they love music. Roger is a master technician with many decades of experience in all styles and makes of pianos — his love for his craft is evident when you talk to him about an instrument. He is happy to share his knowledge with you. Carol takes time to listen to you and work to find the perfect piano in terms of style, size and budget.

If you are in the market for a piano, do yourselves a favor and stop by Roger's — you won't regret it!`,
  },
  {
    title: 'Roger Bought Back Our Ten-Year-Old Yamaha at Full Price',
    slug: 'yamaha-buyback-schimmel-grand-joe-albano',
    customerName: 'Joe Albano',
    location: '',
    content: `We had another wonderful experience at Roger's Piano. Ten years ago we purchased an upright Yamaha U2 for a great price. On Sunday, we upgraded to a beautiful Schimmel grand piano at an incredible price. Carol was fantastic to talk to and helped us pick out this wonderful piano.

Additionally, Roger is buying back our original Yamaha for the full price we paid ten years ago. No one in the industry would make that kind of offer. My wife and I are beyond thrilled with both the service and quality of the piano we received.

October 2025 update: Now I can speak to the incredible service Roger and his team have provided over the years. We have our piano tuned twice a year and it sounds amazing each time. Today, Roger came over for a tuning but advised me that the piano still sounded perfect — so instead of charging me for an unnecessary tuning, we talked instead and he offered some guidance on my playing. Again, you cannot find this level of service anywhere else. Thank you again Roger and enjoy the cheese!`,
  },
  {
    title: 'We Fell for a Gently Used Estonia — Then Moved to the West Coast',
    slug: 'estonia-and-west-coast-move-andrew-sezak',
    customerName: 'Andrew Sezak',
    location: '',
    content: `We purchased our Estonia at the beginning of 2023. I had been to a few shops but found most of the salespeople either not knowledgeable or pushy (or both). Roger was very hands-on but not in any way obtrusive. He encouraged me to try every piano, as I was eager to do, and I surprised myself when I fell for the gently used Estonia — a brand with which I had very little experience. He explained the nuances of each instrument and answered all of my questions before I made my decision.

Delivery was great and Roger spent time at our house tuning it — perfectly.

Alas, we ended up deciding to move back to the west coast, first to a small rental that would not accommodate a grand piano. We were faced with having to sell or store the piano for an undetermined amount of time. Roger's partner, Carol, convinced us not to sell (which we really didn't want to do, anyway) and helped us move the piano into storage.

Thankfully, we found our forever home, and ten months since leaving the northeast we have our Estonia back!

Roger and Carol, thank you for helping us find the right piano and for assisting with the storage and move. And for your patience with me! An easy recommendation.`,
  },
  {
    title: 'The Perfect Action, the Perfect Tone — It Sounds Even Better Than It Looks',
    slug: 'perfect-action-and-tone-jan-c',
    customerName: 'Jan C.',
    location: '',
    content: `We have been playing at least an hour a day since the piano arrived on Wednesday and it sounds perfectly lovely. Though it does look great, it sounds even better!

It is just the piano we wanted and was hoping for. Not only the sound but, almost as important, the action has just the right touch, and the regulation is spot on.

As you know, we had been to a number of stores before returning to your Burlington showroom and nothing came close to the instrument you have delivered. As if that wasn't enough, you have customized the pedals so that the sustain can be added to her playing using the left foot!

We can't thank you enough. You and Roger have made the process of buying this piano fun, exciting, educational, and satisfying beyond our expectations. You ARE the BEST.`,
  },
  {
    title: "An NEC Piano Student Finds His Instrument at Roger's",
    slug: 'nec-student-grand-piano-rental-solomon-ge',
    customerName: 'Solomon Ge',
    location: '',
    content: `I'm a piano student at the New England Conservatory of Music and recently rented a grand piano from Roger's Piano, upon getting connected to them by my teacher. Within seconds of testing out the instrument, I knew I had something extremely special at my hands, which would've only been possible by the expertise of Roger and his ability to make a piano feel like an extension of the player.

Meeting with and renting from Roger's Piano has been a real blessing to me, and I would highly recommend them to any pianists and music lovers looking to get an excellent piano.`,
  },
  {
    title: 'An Antique Steinway, Completely Refurbished — 90 Minutes from Home, Worth Every Bit',
    slug: 'antique-steinway-refurbished-neil-brandon',
    customerName: 'Neil Brandon',
    location: '',
    content: `I recently returned to Roger's after a great buying experience there two years ago. I was looking for a very special instrument as an early retirement gift to myself. I tried out 10+ different pianos and brands at four different shops.

The completely refurbished antique Steinway that I bought at Roger's is the piano of my dreams. Incredibly beautiful, with the most perfect new German action parts, highly responsive, with a robust, beautiful sound — at a fair price and with an excellent full-value trade-in for my two-year-old Kawai.

After the first three months, Roger and Carol came themselves to my home (90 minutes away) where it was lovingly and conscientiously tuned — in addition to some expert work to perfect a minor issue with the voicing of a couple of hammers.

Addendum: more than three months later, the piano sounds as good as the day it was tuned! A testament to the quality of the tuning as well as the quality of the piano. I enjoy playing it more each day.`,
  },
  {
    title: 'A Son Now at the Conservatory in Milan — Roger Made It Possible',
    slug: 'son-at-conservatory-in-milan-carla-peretto',
    customerName: 'Carla Peretto',
    location: '',
    content: `There are singular events and conversations you hardly forget in your life when they touched you profoundly. Buying a piano at Roger's Piano is one of those.

I entered this store a few years back: unemployed, a single parent with a musically talented teenage boy, both depressed due to life circumstances. I began to timidly ask if there was an inexpensive upright piano we could try. I felt so embarrassed when Roger asked what my budget was. I remember whispering, "You don't want to know."

As my son began to play different pianos, Roger turned to us saying that my kid needed a much better quality piano. He added that he would rather help a talented young one get the right piano than sell one to some wealthy people interested more in a high-end piece of furniture. He offered us a beautiful second-hand baby grand he had not yet put on the floor. He tailored the price so that it could be closer to my budget, also offering me an interest-free payment plan that allowed me to sleep at night.

Years have passed and now my son Gabe is completing his degree in Piano Performance at the Conservatory of Music in Milan, Italy.

Thank you, Roger and Carol.`,
  },
]

export async function seedTestimonials(
  payload: Payload,
): Promise<{ created: number; skipped: number }> {
  payload.logger.info('Seeding testimonials...')

  let created = 0
  let skipped = 0

  for (const t of TESTIMONIALS) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { slug: { equals: t.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`  ↷ Skipping existing testimonial: ${t.slug}`)
      skipped++
      continue
    }

    await payload.create({
      collection: 'testimonials',
      data: {
        title: t.title,
        slug: t.slug,
        customerName: t.customerName,
        location: t.location || '',
        content: makeLexical(t.content),
        publishedAt: t.publishedAt ?? new Date().toISOString(),
        _status: 'published',
      },
    })

    payload.logger.info(`  ✓ Created: ${t.slug}`)
    created++
  }

  payload.logger.info(`Testimonials seeding complete — ${created} created, ${skipped} skipped.`)
  return { created, skipped }
}
