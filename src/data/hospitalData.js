export const hospitalData = {
    name: "Futureace Hospital",
    tagline: "South India's First Boutique Hospital",
    description: "Redefining healthcare with boutique, white-glove service. We are a patient-first hospital that treats you like family, not a transaction.",
    contact: {
        phone: "484-273-5600",
        email: "console@futureacehospital.com",
        address: "B, C, D, F Ground, 1st Floor, 37/3712, Mamson Royale, Near Lulu Mall, Nethaji Nagar, Edapally, Ernakulam-682024, Kerala",
    },
    departments: [
        {
            id: 1,
            title: "Plastic & Reconstructive Surgery",
            category: "Surgical",
            tagline: "Restoring Form, Confidence, and Comfort",
            description: "Transforming lives through advanced aesthetic and reconstructive surgical procedures.",
            patientThought: {
                quote: "I wasn't looking for a dramatic change. I just wanted to feel like myself again.",
                attribution: "A common sentiment from our patients"
            },
            longDescription: "At Futureace, our promise is simple: we listen first, explain clearly, and proceed only when you feel fully confident. Every procedure begins with honest consultation, realistic outcomes, and careful planning. Our goal is restoration, not exaggeration.",
            philosophy: "Plastic & Reconstructive Surgery is not about chasing perfection or trends. It is about restoring confidence, comfort, and self-assurance—quietly, respectfully, and at your pace.",
            whyChoose: [
                { title: "Zero 'Emergency' Interruptions", desc: "Your surgery date is sacred. We don't bump aesthetic cases for trauma; you are our priority." },
                { title: "Discreet Recovery Suites", desc: "Heal in a boutique environment that feels more like a luxury hotel than a ward." },
                { title: "Transparent Ethics", desc: "Our surgeons will tell you what you don't need. We prioritise your health over targets." }
            ],
            icon: "UserRound",
            color: "#FFE5E5",
            image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
            serviceCategories: [
                {
                    title: "The Motherhood Restoration",
                    subtitle: "Mummy Makeover & Body Contouring",
                    story: "I love being a mother, but I don't recognise the reflection in the mirror anymore.",
                    procedures: [
                        { name: "Mummy Makeover", detail: "A curated combination of procedures (often a tummy tuck and breast lift) designed to restore your pre-pregnancy shape in a single, planned journey." },
                        { name: "Post-Pregnancy Body Contouring", detail: "Focused sessions to tighten and tone what nature moved." },
                        { name: "Tummy Tuck (Abdominoplasty)", detail: "Removing excess skin and repairing weakened muscles to give you a firm, flat core." },
                        { name: "Liposuction", detail: "Precision sculpting for arms, upper body, or full body to remove stubborn pockets of fat." }
                    ]
                },
                {
                    title: "The Boutique Breast Clinic",
                    subtitle: "Balance and Relief",
                    story: "Motherhood, weight changes, and time can alter the body in ways that don't always reflect how you feel inside.",
                    procedures: [
                        { name: "Breast Augmentation", detail: "Enhancing volume with the world's safest, most natural-feeling implants." },
                        { name: "Breast Lift (Mastopexy)", detail: "Defying gravity to restore a youthful, perkier profile without necessarily increasing size." },
                        { name: "Breast Reduction", detail: "Lightening the load to improve quality of life and relieve back pain." },
                        { name: "Gynaecomastia & Gland Excision", detail: "A private, permanent solution for men to achieve a flatter, firmer chest profile." }
                    ]
                },
                {
                    title: "Intimate Wellness",
                    subtitle: "Regenerative Gynaecology",
                    story: "Discreet, compassionate, and dignified care for your most private concerns.",
                    procedures: [
                        { name: "Vaginal Rejuvenation", detail: "Restoring comfort, function, and confidence—not aesthetics alone." },
                        { name: "Labiaplasty", detail: "For women experiencing discomfort or self-consciousness due to asymmetry." },
                        { name: "Vaginoplasty", detail: "Reconstructive procedure aimed at restoring vaginal tone and function." },
                        { name: "Hymenoplasty", detail: "Confidential reconstructive procedure offered with the highest level of sensitivity." }
                    ]
                },
                {
                    title: "Body Contouring & Fat Sculpting",
                    subtitle: "Advanced Sculpting",
                    story: "These procedures are finishing touches for people who already value healthy lifestyle changes.",
                    procedures: [
                        { name: "Upper Body Contouring", detail: "Targets areas like arms, chest, and upper back for better definition." },
                        { name: "Targeted Liposuction", detail: "From arms to ankles, advanced techniques to sculpt the areas that matter most." },
                        { name: "Buttocks Contouring & Lift", detail: "Enhancing shape and firmness for a more defined lower body profile." }
                    ]
                },
                {
                    title: "Facial Artistry & Definition",
                    subtitle: "Refined and Natural",
                    story: "We believe the best 'work' is the kind no one notices—the 'rested and refreshed' look.",
                    procedures: [
                        { name: "Rhinoplasty", detail: "Reshaping the nose to harmonise with facial features or improve breathing." },
                        { name: "Facelift & Neck Lift", detail: "Tightening underlying tissues and smoothing skin to address sagging." },
                        { name: "Blepharoplasty & Eye Bag Removal", detail: "Removing excess skin and fat from the lids for a refreshed look." },
                        { name: "Chin Augmentation & Lip Contouring", detail: "Subtle, elegant adjustments to balance the profile and smile." }
                    ]
                },
                {
                    title: "Men's Reconstructive Care",
                    subtitle: "Discreet and Respectful",
                    story: "Men often delay seeking help due to hesitation. At Futureace, these concerns are handled clinically and discreetly.",
                    procedures: [
                        { name: "Gynaecomastia & Gland Excision", detail: "A definitive solution for male chest enlargement caused by glandular or fatty tissue—often life-changing." }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Orthopaedics & Joint Care",
            category: "Surgical",
            tagline: "Helping You Move Again—Without Rushing You",
            description: "Restoring mobility and performance through expert bone and joint care.",
            patientThought: {
                quote: "I stopped travelling because my knees couldn't take the stairs.",
                attribution: "Rajan, 67, retired banker"
            },
            longDescription: "Pain changes how you live. It limits movement, steals sleep, and slowly shrinks your world. At Futureace, orthopaedic care is never hurried and never transactional. Every joint, every ligament, every step forward is planned carefully—so recovery feels predictable, not frightening.",
            philosophy: "We help people who want to walk comfortably again, return to sports, or simply live without daily pain. Movement is freedom—and it deserves time, patience, and expertise.",
            whyChoose: [
                { title: "Scheduled for Success", desc: "Because we don't juggle unpredictable ER emergencies, your orthopaedic surgeon is fresh, focused, and dedicated entirely to your procedure." },
                { title: "The 'Un-Hospital' Recovery", desc: "Physical therapy is hard work; doing it in a quiet, premium suite with one-on-one attention makes all the difference." },
                { title: "Ethical Implants", desc: "No 'targets' on high-cost hardware. We choose the implant that is scientifically best for your lifestyle and anatomy." },
                { title: "Pre-Surgical Planning", desc: "You meet your care team well in advance. No surprises, no last-minute changes, just a clear path to walking pain-free." }
            ],
            icon: "Bone",
            color: "#E5F0FF",
            image: "/ortho.webp",
            serviceCategories: [
                {
                    title: "The Joint Restoration Hub",
                    subtitle: "Knee, Hip & Shoulder",
                    story: "For those who have paused their lives because of chronic pain.",
                    procedures: [
                        { name: "Total Knee Replacement (TKR)", detail: "Restoring the joy of walking with advanced implants for knees that ache day and night or limit your steps." },
                        { name: "Total Hip Replacement (THR)", detail: "Eliminating deep-seated hip pain to restore your fluid, natural gait." },
                        { name: "Shoulder Replacement", detail: "Precision surgery to bring back the full range of motion you need for daily life." }
                    ]
                },
                {
                    title: "Sports & Performance Clinic",
                    subtitle: "Arthroscopy & Recovery",
                    story: "For the athletes, the weekend warriors, and the active souls. A sports injury is a race against time.",
                    procedures: [
                        { name: "ACL/PCL Reconstruction", detail: "Stabilising your stride with world-class ligament repair using minimally invasive techniques." },
                        { name: "Meniscus Repair", detail: "Protecting the 'cushion' of your knee with delicate, precise techniques." },
                        { name: "Sports Injury Management", detail: "A holistic roadmap from the moment of injury to the final whistle of your comeback game." }
                    ]
                },
                {
                    title: "Precision Fracture & Trauma",
                    subtitle: "Putting the pieces back together",
                    story: "When life happens, we provide a calm, dignified alternative to the frantic trauma wards of large institutions.",
                    procedures: [
                        { name: "Fractures & Dislocations", detail: "Expert realignment and stabilisation using the latest internal fixation methods, focused on long-term bone health." }
                    ]
                },
                {
                    title: "Paediatric Orthopaedics",
                    subtitle: "Healing the Future",
                    story: "Children aren't just small adults. Their bones are growing, and their care requires a different kind of patience.",
                    procedures: [
                        { name: "Deformity Correction", detail: "Gentle, effective correction for conditions like clubfoot or knock knees." },
                        { name: "Growth Plate Management", detail: "Ensuring that childhood injuries don't impact their future height or mobility." }
                    ]
                }
            ]
        },
        {
            id: 3,
            title: "General Surgery",
            category: "Surgical",
            tagline: "Your Body's Skilled Architect",
            description: "Providing comprehensive surgical solutions for a wide range of medical conditions.",
            longDescription: "We don't believe any surgery is 'minor' when it's happening to you. While other hospitals treat general surgery as a high-volume department, Futureace treats it as a craft. Whether it's a mastectomy or a 15-minute cyst removal, you receive the same boutique focus: a planned schedule, a private recovery, and a surgeon who has the time to talk.",
            philosophy: "From abdominal surgeries and hernia repairs to breast procedures and wound care, our surgeons focus on planned interventions, minimal disruption, and safe healing. When surgery is planned well, fear reduces—and healing begins sooner.",
            whyChoose: [
                { title: "The 'Scheduled Only' Advantage", desc: "Because we don't take 'walk-in' emergencies, your surgery starts on time. Your surgeon is focused entirely on you, not an exhausting ER shift." },
                { title: "Laser over Blade", desc: "Wherever possible, we choose laser and minimally invasive technology to minimise pain and maximise your comfort." },
                { title: "The Care Coordinator", desc: "For sensitive surgeries (like proctology or breast care), your coordinator ensures your journey is private and stress-free." },
                { title: "Home-Style Recovery", desc: "Our suites are designed so you forget you're in a hospital. Healing happens best when you feel at peace." }
            ],
            icon: "Stethoscope",
            color: "#E5FFEA",
            image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
            serviceCategories: [
                {
                    title: "The 'Keyhole' Gallery",
                    subtitle: "Advanced Laparoscopy",
                    story: "Faster healing, smaller scars, and a quicker return to your life.",
                    procedures: [
                        { name: "Appendicectomy", detail: "Swift, planned removal of the appendix using advanced keyhole techniques to resolve appendicitis and prevent emergencies." },
                        { name: "Cholecystectomy", detail: "Minimally invasive removal of gallstones, focusing on minimal discomfort and faster return to normal activities." },
                        { name: "Hernia Repair", detail: "Expert repair of hernias (inguinal, umbilical, incisional) using tailored techniques for lasting strength." },
                        { name: "Bowel & Gastric Procedures", detail: "Careful procedures for conditions affecting the stomach and intestines, always aiming to preserve quality of life." }
                    ]
                },
                {
                    title: "Breast Health & Soft Tissue",
                    subtitle: "Compassionate Care",
                    story: "Diagnostics and surgery happen in a calm, supportive environment to help manage the anxiety of sensitive milestones.",
                    procedures: [
                        { name: "Breast Lump Excision", detail: "Precise, conservative removal of lumps with a focus on both complete treatment and aesthetic preservation." },
                        { name: "Mastectomy", detail: "Compassionate surgical care for breast cancer, performed with sensitivity and supported by a holistic healing plan." },
                        { name: "Growths & Cysts", detail: "Removal of superficial growths like lipomas and cysts with fine attention to detail and minimal scarring." }
                    ]
                },
                {
                    title: "Proctology & Perianal Care",
                    subtitle: "Dignified and Discreet",
                    story: "I suffered in silence for years because I was embarrassed. — Mohammed, 45, businessman",
                    procedures: [
                        { name: "Haemorrhoidectomy", detail: "Relief from painful haemorrhoids using advanced laser/stapler techniques for a much smoother recovery." },
                        { name: "Fistula & Fissure Surgery", detail: "Definitive treatment for fistulas and anal fissures, performed with expertise to ensure comfort." }
                    ]
                },
                {
                    title: "Vascular & Trauma Care",
                    subtitle: "Life's Transitions",
                    story: "Expert wound care and surgical intervention for when life happens, providing a calm alternative to frantic trauma wards.",
                    procedures: [
                        { name: "Varicose Vein Surgeries", detail: "Treatment for aching legs using modern techniques to restore circulation and confidence." },
                        { name: "Debridement & Grafting", detail: "Expert wound care and reconstructive techniques to promote healing after injury or infection." },
                        { name: "Reconstructive Procedures", detail: "Prompt and skilled surgical intervention for abdominal injuries and other trauma cases." }
                    ]
                },
                {
                    title: "Common Minor Procedures",
                    subtitle: "Care and Respect",
                    story: "Every procedure is performed with hygiene, care, and respect for personal and cultural needs.",
                    procedures: [
                        { name: "Circumcision", detail: "Safe, hygienic procedure performed with sensitivity and expert surgical care." },
                        { name: "Pilonidal Sinus & Abscess", detail: "Immediate relief and lasting solutions for painful infections and uncomfortable conditions." }
                    ]
                }
            ]
        },
        {
            id: 4,
            title: "Minimally Invasive & Laparoscopic Surgery",
            category: "Surgical",
            tagline: "Big Relief, Through Tiny Openings",
            description: "Advanced surgical techniques ensuring faster recovery and minimal scarring.",
            longDescription: "Surgery doesn't have to mean long scars or long hospital stays. Minimally invasive surgery is about doing more while disturbing less. In our boutique environment, 'minimally invasive' refers to the minimal disruption to your peace, your time, and your dignity.",
            philosophy: "Whether it's gallbladder, hernia, or complex organ health, our approach keeps your body—and your routine—intact. Healing should fit into your life, not disrupt it.",
            patientThought: {
                quote: "I couldn't afford to be away from my startup for weeks. I had my procedure in the morning and was back to my laptop within days.",
                attribution: "Rohan, 35, Entrepreneur"
            },
            whyChoose: [
                { title: "Dedicated Equipment", desc: "Our laparoscopic towers are dedicated and meticulously maintained for your specific procedure, never shared by multiple departments." },
                { title: "Artistry over Speed", desc: "Our surgeons take the time to ensure every stitch is perfect and every incision is placed with an eye for how it will heal." },
                { title: "The 'Quiet' Recovery", desc: "Healing happens best in silence. Our private suites provide a noise-free environment that speeds up the body's natural repair." },
                { title: "Zero Waiting", desc: "You pick the day. You pick the time. We prepare the theatre just for you." }
            ],
            icon: "Activity",
            color: "#FFF5E5",
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
            serviceCategories: [
                {
                    title: "The 'Scarless' Essentials",
                    subtitle: "Precision for Daily Life",
                    story: "Precision for the problems that slow you down, handled with scars that are nearly invisible.",
                    procedures: [
                        { name: "Laparoscopic Cholecystectomy", detail: "Say goodbye to gallstone pain with a procedure that lets you return to your favourite foods faster." },
                        { name: "Laparoscopic Appendicectomy", detail: "Resolving appendix issues with precision, avoiding the trauma of traditional open surgery." },
                        { name: "Laparoscopic Hernia Repair", detail: "Reinforcing your strength from the inside out using advanced mesh and tiny entry points." }
                    ]
                },
                {
                    title: "The Weight & Wellness Pathway",
                    subtitle: "Bariatric Surgery",
                    story: "Weight loss surgery is a deeply personal decision. We provide a private, supportive sanctuary for this transformation.",
                    procedures: [
                        { name: "Laparoscopic Bariatric Surgery", detail: "A planned, guided journey towards a healthier weight, handled by surgeons who understand your metabolic transformation." },
                        { name: "Gastrectomy & Fundoplication", detail: "Advanced solutions for chronic acid reflux (GERD), ensuring you can eat and sleep in peace again." }
                    ]
                },
                {
                    title: "Advanced Internal Care",
                    subtitle: "Complex Clarity",
                    story: "Our surgeons use high-definition cameras to navigate with more clarity than the human eye could ever achieve alone.",
                    procedures: [
                        { name: "Laparoscopic Colectomy", detail: "Addressing issues of the large intestine with a focus on preserving function and minimising recovery time." },
                        { name: "Diagnostic Laparoscopy", detail: "A gentle 'look inside' that is thorough and precise, helping us plan your next steps with 100% certainty." }
                    ]
                },
                {
                    title: "Feminine & Endocrine Health",
                    subtitle: "Protecting Your Grace",
                    story: "We've removed the fear of visible scars for sensitive procedures, protecting your grace and health simultaneously.",
                    procedures: [
                        { name: "Endoscopic Thyroidectomy", detail: "Accessing the thyroid through the armpit or mouth, leaving your neck completely scar-free. Surgery that keeps your secret." },
                        { name: "Laparoscopic Hysterectomy", detail: "Removing the uterus or ovarian cysts through tiny incisions, allowing you to get back to your family sooner." }
                    ]
                }
            ]
        },
        {
            id: 5,
            title: "Implantology & Dental Surgery",
            category: "Clinical",
            tagline: "Your smile is your signature. Wear it with confidence.",
            description: "Exceptional dental care specializing in implants and facial reconstructive surgery.",
            longDescription: "In our boutique studio, your comfort is prioritised as much as your clinical outcome. No rushed queues—just you, your specialist, and a plan for a perfect smile.",
            philosophy: "We believe dental surgery shouldn't feel like a clinical chore; it should feel like a restorative journey. Confidence begins with comfort.",
            patientThought: {
                quote: "I stopped attending family weddings because I was self-conscious about my missing teeth. Today, I'm laughing louder.",
                attribution: "Mr Menon, 68, Retired Teacher"
            },
            whyChoose: [
                { title: "The 'Spa' Atmosphere", desc: "Forget the clinical smell and the crowded waiting rooms. Our studio is a sanctuary of quiet luxury." },
                { title: "Advanced Imaging", desc: "Digital diagnostics providing instant, high-definition clarity while keeping your radiation safety at the forefront." },
                { title: "Zero Target-Driven Care", desc: "Our doctors are never under pressure to fill quotas. We practise ethical dentistry focused solely on your oral health." },
                { title: "The Care Coordinator", desc: "One person manages your schedule from your first X-ray to your final polish, so you never have to repeat your story." }
            ],
            icon: "Smile",
            color: "#F3E5FF",
            image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
            serviceCategories: [
                {
                    title: "Implantology & Rehabilitation",
                    subtitle: "Unrestrained Confidence",
                    story: "The joy of a steak dinner and an unrestrained laugh. We use advanced implants that feel entirely like your own.",
                    procedures: [
                        { name: "Teeth Replacement", detail: "High-precision single or multiple implants that integrate seamlessly with your jaw, looking and feeling natural." },
                        { name: "Full-Mouth Rehabilitation", detail: "A comprehensive, planned transformation for those who need a fresh start for their entire smile." },
                        { name: "Maxillofacial Surgery", detail: "Expert surgical care for the face and jaw, handling complex structural issues with aesthetic finesse." }
                    ]
                },
                {
                    title: "Cosmetic & Orthodontic Gallery",
                    subtitle: "Facial Harmony",
                    story: "This isn't just about straightening teeth. It's about facial harmony and making an unforgettable first impression.",
                    procedures: [
                        { name: "Cosmetic Dentistry", detail: "From porcelain veneers that correct imperfections to professional whitening that brightens confidence in one session." },
                        { name: "Modern Orthodontics", detail: "Choose between traditional precision with braces or the invisible convenience of clear aligners." }
                    ]
                },
                {
                    title: "Painless & Peaceful Care",
                    subtitle: "Redefining the 'Root Canal'",
                    story: "We've removed the 'factory' feel. Our specialists use technology to ensure essential treatments are handled with extreme gentleness.",
                    procedures: [
                        { name: "Root Canal (RCT)", detail: "Saved natural teeth performed with microscopic precision, usually in a single, peaceful visit." },
                        { name: "Wisdom Tooth Extraction", detail: "Handled as a planned surgical procedure in sterile suites—minimising swelling and ensuring quick recovery." },
                        { name: "Periodontal Care", detail: "Ensuring the 'frame' of your smile is healthy, pink, and strong through expert gum surgeries." }
                    ]
                },
                {
                    title: "Little Smiles",
                    subtitle: "Fear-Free Paedodontics",
                    story: "We don't just treat children; we win their trust in a non-threatening, friendly, and calm environment.",
                    procedures: [
                        { name: "Paediatric Dentistry", detail: "Creating a fear-free generation by ensuring first dental memories are filled with kindness, not coldness." }
                    ]
                }
            ]
        },
        {
            id: 6,
            title: "Psychiatry & Mental Wellness",
            category: "Wellness",
            tagline: "Because healing is a conversation, not a consultation.",
            description: "Holistic mental health support dedicated to emotional well-being and recovery.",
            longDescription: "In a world that never stops, the mind sometimes needs a place to rest, recalibrate, and be understood. At Futureace, mental wellness is treated with privacy, compassion, and zero judgement.",
            philosophy: "There are no crowded waiting rooms here, no labels, and no rushed appointments. Your mind is your most valuable asset. At Futureace, we treat it with the reverence and respect it deserves.",
            patientThought: {
                quote: "I couldn't go to a 'rehab centre' because of the stigma. At Futureace, I wasn't a 'patient in recovery'; I was a man reclaiming my time and my life.",
                attribution: "Alex, 34, High-Performing Professional"
            },
            whyChoose: [
                { title: "Absolute Discretion", desc: "Our boutique layout ensures you never have to worry about who you might see. Private entry and exit points prioritise your anonymity." },
                { title: "The 'Unhurried' Hour", desc: "Our psychiatrists don't have 50-person queues. You get the time you need to talk, and we take the time to listen." },
                { title: "A Sanctuary Environment", desc: "Soft lighting and a calm atmosphere that feels more like a library or a private club than a clinical ward." },
                { title: "Collaborative Care", desc: "Our mental health team works with our other specialists to ensure your emotional well-being is part of every physical recovery." }
            ],
            icon: "Brain",
            color: "#E5F9FF",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
            serviceCategories: [
                {
                    title: "The Mindful Restoration",
                    subtitle: "General Psychiatry & Therapy",
                    story: "This isn't about 'fixing' you; it's about understanding your narrative in an unhurried space to breathe and heal.",
                    procedures: [
                        { name: "Psychiatric Evaluation", detail: "Moving beyond symptoms to understand the person behind the diagnosis with clarity and depth." },
                        { name: "Depression & Anxiety", detail: "Evidence-based care delivered with a human touch, helping you find your light again." },
                        { name: "Managing OCD & Bipolar", detail: "Structured, compassionate support systems designed to bring stability and peace to your daily life." },
                        { name: "Psychotherapy", detail: "One-on-one sessions where your privacy is treated as a sacred promise." }
                    ]
                },
                {
                    title: "Reclaiming the Self",
                    subtitle: "De-Addiction & Digital Detox",
                    story: "Breaking the chains of modern dependencies—alcohol, smoking, or digital addiction—in a dignified wellness setting.",
                    procedures: [
                        { name: "Behavioural De-Addiction", detail: "Specialised programmes for modern dependencies like gaming and excessive screen usage with zero judgement." },
                        { name: "Substance De-Addiction", detail: "Discreet, medically supervised programmes focused on long-term freedom rather than short-term fixes." }
                    ]
                },
                {
                    title: "Nurturing the Future",
                    subtitle: "Child & Adolescent Wellness",
                    story: "We don't label children; we empower them. Our boutique wing feels like a supportive learning space.",
                    procedures: [
                        { name: "Developmental Support", detail: "Expert guidance for learning disabilities and behavioural issues in a non-threatening environment." },
                        { name: "IQ & Psychodiagnostics", detail: "Comprehensive assessments that help parents understand their child's unique potential." }
                    ]
                },
                {
                    title: "The Intimacy Clinic",
                    subtitle: "Connection & Bond Restoration",
                    story: "Restoring the bonds that matter most in a safe, neutral, and premium environment.",
                    procedures: [
                        { name: "Marital & Family Therapy", detail: "Facilitating honest conversations to repair and strengthen the foundations of your home." },
                        { name: "Sexual Medicine", detail: "A highly discreet, specialist-led service to address intimate health concerns with clinical excellence." }
                    ]
                },
                {
                    title: "The Daily Reset",
                    subtitle: "Stress & Sleep Management",
                    story: "A good life begins with a good night's rest. practical clinical strategies to manage burnout and insomnia.",
                    procedures: [
                        { name: "Stress Management", detail: "Practical strategies for the high-achiever to manage burnout and reclaim their calm." },
                        { name: "Sleep Management", detail: "Scientific solutions for insomnia delivered in the quietest environment in Kerala." }
                    ]
                }
            ]
        },
        {
            id: 7,
            title: "ENT, Head & Neck Surgery",
            category: "Surgical",
            tagline: "Your World is Lived Through Breath, Sound & Balance",
            description: "Specialized care for ear, nose, throat, and complex head and neck conditions.",
            patientThought: {
                quote: "They didn't just give me hearing aids. They gave me back my daughter's laughter.",
                attribution: "Ramesh, 68, Retired Teacher"
            },
            longDescription: "In the rush of a traditional hospital, the 'small' things like a blocked sinus or a muffled ear often get lost. At Futureace, we provide a boutique sanctuary where the head and neck are treated with microscopic artistry.",
            philosophy: "Small organs can have a big impact on quality of life. Our approach is precise, planned, and minimally disruptive.",
            whyChoose: [
                { title: "Microscopic Precision", desc: "Our ENT suite is equipped with world-class magnification and endoscopic towers, seeing what others might miss." },
                { title: "The 'Zero-Rush' Consultation", desc: "Your throat, ears, and sinuses are complex. We take the time to look deeper and listen longer." },
                { title: "Peaceful Recovery", desc: "After ear or sinus surgery, our private suites offer the silence required for your equilibrium to return to normal." },
                { title: "Ethical Excellence", desc: "We don't believe every sore throat needs surgery. We offer surgery only when it is the clearest path to your well-being." }
            ],
            icon: "Ear",
            color: "#FFE5F9",
            image: "/ENT.webp",
            serviceCategories: [
                {
                    title: "The Sound Gallery",
                    subtitle: "Microscopic & Ear Surgery",
                    story: "I found myself withdrawing from family dinners because I couldn't follow the conversation. — Leila, 72, Grandmother",
                    procedures: [
                        { name: "Tympanoplasty", detail: "Expert repair of the eardrum to restore hearing and prevent recurring infections." },
                        { name: "Microscopic Ear Surgeries", detail: "High-precision procedures to address complex inner ear issues with the finesse of a master watchmaker." },
                        { name: "Cochlear Implant Surgery", detail: "Life-changing technology delivered through a planned, supportive programme for profound hearing loss." }
                    ]
                },
                {
                    title: "Clear Breathing Pathway",
                    subtitle: "Sinus & Nasal Care",
                    story: "Chronic sinus pain isn't just a physical ache; it's a mental fog. We clear the path so you can breathe and live.",
                    procedures: [
                        { name: "Endoscopic Sinus Surgery (FESS)", detail: "Using tiny cameras and precision tools to resolve chronic sinusitis with minimal downtime and no external scars." }
                    ]
                },
                {
                    title: "The 'Little Heroes' Wing",
                    subtitle: "Paediatric ENT",
                    story: "A child's surgery is a family surgery. We've designed a boutique experience for tonsil and adenoid care that is calm and quick.",
                    procedures: [
                        { name: "Tonsillectomy & Adenoidectomy", detail: "Resolving recurring infections and sleep-disordered breathing so your child can grow and play without interruption." }
                    ]
                },
                {
                    title: "Head & Neck Excellence",
                    subtitle: "Preserving the Person",
                    story: "When dealing with tumours of the thyroid or neck, we prioritise both clinical clearance and aesthetic preservation.",
                    procedures: [
                        { name: "Endoscopic Thyroidectomy", detail: "Accessing the thyroid through the armpit or mouth, leaving your neck completely scar-free. Surgery that keeps your secret." },
                        { name: "Thyroid & Parotid Surgery", detail: "Expert removal of tumours with a focus on nerve preservation and minimal scarring." },
                        { name: "Head & Neck Tumour Surgeries", detail: "Complex, planned procedures including neck dissections performed with focused boutique attention." }
                    ]
                }
            ]
        },
        {
            id: 8,
            title: "Dermatology",
            category: "Clinical",
            tagline: "Your Skin Faces the World. We Make Sure it Glows with Confidence.",
            description: "Complete skin care solutions from clinical dermatology to aesthetic treatments.",
            longDescription: "We believe your skin is trying to tell us something. A stubborn patch of eczema might be speaking about stress or allergies. Acne isn't just 'teenage skin'—it can be a story of confidence held hostage. Here, we listen to your skin.",
            philosophy: "We look, we ask, and we create a plan with you, not just for you. Because clear skin begins with a clear conversation.",
            patientThought: {
                quote: "Each Zoom call was a nightmare. They didn't give me a cream; they gave me back control. Now, when I look in the mirror, I see myself again.",
                attribution: "Arjun, 28, Software Engineer"
            },
            whyChoose: [
                { title: "Privacy by Design", desc: "Skin conditions can be sensitive. Our boutique layout ensures your consultation remains private, away from prying eyes." },
                { title: "Ethical Skincare", desc: "We aren't here to 'sell' you a shelf of products. Our doctors practise need-based medicine—prescribing only what your skin truly requires." },
                { title: "Aesthetic Precision", desc: "Even for medical removals, our doctors think like artists, prioritising how your skin will look after it heals." },
                { title: "Un-Hurry Your Healing", desc: "Our dermatologists take the time to explain the 'why' behind your treatment, ensuring you feel empowered." }
            ],
            icon: "Sparkles",
            color: "#F0FFE5",
            image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800",
            serviceCategories: [
                {
                    title: "The Clinical Skin Clinic",
                    subtitle: "Relief and Restoration",
                    story: "We go beyond the standard steroid cream. We look for triggers—diet, stress, environment—and build a personalised truce plan.",
                    procedures: [
                        { name: "Acne & Scar Management", detail: "Targeting the root cause and restoring skin texture using a gentle, sustained medical regimen." },
                        { name: "Chronic Condition Care", detail: "Specialised support for psoriasis, eczema, and fungal infections using evidence-based medical therapies." },
                        { name: "Vitiligo Treatment", detail: "Compassionate care and modern interventions focused on pigment restoration and skin health." }
                    ]
                },
                {
                    title: "The 'Spotless' Precision Wing",
                    subtitle: "Dermatosurgery",
                    story: "I didn't want to wait in a surgery queue for something 'minor'. — Meera, 34, Teacher",
                    procedures: [
                        { name: "Mole, Wart & Skin Tag Removal", detail: "Quick, painless, and aesthetic-conscious removal of skin growths in a sterile, private suite." },
                        { name: "Minor Skin Surgeries", detail: "Expert removal of cysts or suspicious spots. Every stitch is placed with the future scar in mind." }
                    ]
                },
                {
                    title: "The Hair & Scalp Laboratory",
                    subtitle: "Nurturing Growth",
                    story: "Hair loss can be emotional. Using trichoscopy, we diagnose the root cause—be it hormonal, stress-induced, or genetic.",
                    procedures: [
                        { name: "Scientific Hair Therapies", detail: "Result-orientated therapies to combat thinning hair, dandruff, and scalp disorders with medical and nutritional support." }
                    ]
                }
            ]
        },
        {
            id: 9,
            title: "Neuro & Spine Surgery",
            category: "Surgical",
            tagline: "Protecting What Connects Your Entire Body",
            description: "Advanced neurological interventions for complex brain and spinal health issues.",
            longDescription: "The spine and nervous system require extreme precision and careful planning. At Futureace, neuro and spine surgeries are handled only when truly necessary—and always with thorough evaluation and minimally invasive techniques where possible.",
            philosophy: "Our focus is on relieving pain, restoring function, and preserving mobility—without unnecessary intervention. Your spine is the pillar of your life. Don't trust it to a crowded system. Trust it to a boutique sanctuary built for precision.",
            patientThought: {
                quote: "The biggest shock was how small the solution felt for a pain that had loomed so large in my life.",
                attribution: "Thomas, 55, Bank Manager"
            },
            whyChoose: [
                { title: "The 'Quiet' Recovery Suite", desc: "Spine patients are sensitive to noise and movement. Our private suites are 'Chaos-Free Zones', providing the absolute stillness your nerves need to heal." },
                { title: "Surgeon Dedication", desc: "Neurosurgeons aren't distracted by ER emergencies. At Futureace, your surgeon's only focus is your spine for the entire duration of your stay." },
                { title: "Planned Precision", desc: "Every scan is analysed without the rush of a 100-person OPD queue, ensuring the most accurate surgical plan possible." },
                { title: "One-on-One Care Coordination", desc: "From your first MRI to your first steps post-surgery, you have a dedicated guide who knows your name and your fears." }
            ],
            icon: "Zap",
            color: "#E5EEFF",
            image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
            serviceCategories: [
                {
                    title: "The 'Keyhole' Spine Gallery",
                    subtitle: "Minimally Invasive Surgery (MIS)",
                    story: "Small incisions. Rapid recovery. Zero chaos. Thomas walked to the bathroom the evening of his surgery; the electric shock pain was gone.",
                    procedures: [
                        { name: "Targeted Relief", detail: "Addressing herniated discs or narrow spinal canals through tiny openings without disrupting surrounding healthy tissue." },
                        { name: "Rapid Rehabilitation", detail: "Designed for the professional who doesn't have time for a traditional hospital stay. Often back at work within two weeks." }
                    ]
                },
                {
                    title: "Disc Replacement",
                    subtitle: "Restoring Natural Rhythm",
                    story: "Why fuse when you can move? We don't just silence the pain—we replace the worn-out cushion to restore your back's natural rhythm.",
                    procedures: [
                        { name: "Advanced Disc Replacement", detail: "Replacing worn-out discs with high-end, mobile implants that mimic your body's natural movement." }
                    ]
                },
                {
                    title: "Stability & Decompression",
                    subtitle: "Nerve Care & Fusion",
                    story: "Ending the 'pinch' and restoring your foundation. Our surgeons are fresh, prepared, and dedicated entirely to your procedure.",
                    procedures: [
                        { name: "Spinal Decompression", detail: "Gently removing pressure on your nerves to end the 'lightning strikes' of pain in your legs or arms." },
                        { name: "Spinal Fusion", detail: "Creating a solid, stable foundation for your spine using the latest internal fixation technology." }
                    ]
                }
            ]
        },
        {
            id: 10,
            title: "Cosmetology",
            category: "Clinical",
            tagline: "Subtle Changes. Natural Confidence.",
            description: "Enhancing natural beauty with state-of-the-art non-surgical aesthetic procedures.",
            longDescription: "Cosmetology at Futureace is not about trends or exaggeration or fixing what's wrong—it's about honouring what's right—your desire to look in the mirror and feel at peace with your reflection.",
            philosophy: "From skin rejuvenation to scar treatment and pigmentation correction, we believe cosmetic care should be tasteful, ethical, and conservative. Beauty should feel natural, not noticeable.",
            patientThought: {
                quote: "They didn't just remove ink. They gave me a clean canvas without a single scar—on my skin or on my experience.",
                attribution: "Priya, 38, Marketing Director"
            },
            whyChoose: [
                { title: "The Luxury of Discretion", desc: "Our boutique layout means you never have to worry about running into someone you know. your privacy is our highest priority." },
                { title: "Ethical Aesthetics", desc: "We are a hospital first. Our specialists will never 'upsell' you on a procedure you don't need." },
                { title: "The 'Un-Clinic' Vibe", desc: "No harsh fluorescent lights. Our rooms are designed for warmth, comfort, and peace." },
                { title: "Medical-Grade Safety", desc: "Luxury of a spa with the life-saving standards of a world-class hospital. We are NABH-certified." }
            ],
            icon: "Sparkle",
            color: "#FFF9E5",
            image: "/cosmetology.webp",
            serviceCategories: [
                {
                    title: "The 'Refresh' Suite",
                    subtitle: "Subtle Micro-Refinements",
                    story: "For the rested, 'just-back-from-vacation' glow. Restoring volume while ensuring you still look exactly like you.",
                    procedures: [
                        { name: "Botox", detail: "Gently relaxing the lines of expression to give you a serene, refreshed appearance." },
                        { name: "Dermal Fillers", detail: "Restoring the natural contours of your cheeks, lips, and jawline with the subtlety of a sculptor's touch." }
                    ]
                },
                {
                    title: "The Rejuvenation Rituals",
                    subtitle: "PRP & Mesotherapy",
                    story: "Anita felt her skin looked 'tired' despite her routine. Today, her skin is doing the work for her. Waking up skin from within.",
                    procedures: [
                        { name: "Skin Rejuvenation (PRP & Meso)", detail: "Using your body's own healing power and nutrient cocktails to boost collagen and restore inner glow." },
                        { name: "Chemical Peels", detail: "Medical-grade exfoliations to sweep away dullness, sun damage, and the remnants of a busy life." }
                    ]
                },
                {
                    title: "The 'Clean Slate' Clinic",
                    subtitle: "Correction & Starting Fresh",
                    story: "Letting go of the marks you no longer wish to carry. Advanced laser technology to safely fade ink and spots.",
                    procedures: [
                        { name: "Tattoo & Pigmentation Removal", detail: "PicoSure laser technology to shatter ink with minimal heat, protecting the surrounding skin." },
                        { name: "Scar & Stretch Mark Treatment", detail: "Medical expertise combined with aesthetic finesse to smooth out textures and return skin to silk." }
                    ]
                }
            ]
        },
        {
            id: 11,
            title: "Andrology & Male Infertility",
            category: "Wellness",
            tagline: "Strength Isn't Just Physical. It's in Having the Courage to Seek Answers.",
            description: "Dedicated health services for male reproductive wellness and infertility care.",
            longDescription: "In our culture, men's health is often met with silence or shame. We are starting a different conversation. We believe sexual health is fundamental to overall wellbeing—a vital sign, like blood pressure.",
            philosophy: "Seeking help is a strength, not a weakness. Our clinic is a judgement-free zone where science meets empathy, and treatment begins with being heard.",
            patientThought: {
                quote: "They gave me back my confidence and my connection with my wife. They treated me with a respect that made me respect my own health.",
                attribution: "Arjun, 41, Architect"
            },
            whyChoose: [
                { title: "Judgement-Free Zone", desc: "Speak openly about ED, low desire, or infertility without feeling 'less than' in our private, soundproof consultation rooms." },
                { title: "Holistic Investigation", desc: "We look for root causes—vascular, hormonal, or metabolic—rather than just handing out quick-fix pills." },
                { title: "Collaborative Intimacy", desc: "Our care often includes partners and counselling to rebuild communication alongside physical recovery." },
                { title: "Absolute Respect", desc: "We treat these sensitive issues with the clinical excellence and dignity they deserve." }
            ],
            icon: "Users",
            color: "#F5E5FF",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
            serviceCategories: [
                {
                    title: "Reclaiming Confidence",
                    subtitle: "ED & Performance",
                    story: "Arjun watched his silent struggle build a wall in his marriage. After a holistic 3-month plan, he reclaimed his connection and vitality.",
                    procedures: [
                        { name: "ED Management", detail: "Evidence-based treatments targeting the source—vascular health, hormones, or stress." },
                        { name: "Penile Implants", detail: "A definitive, discreet surgical solution for natural, on-demand erections when other treatments aren't enough." }
                    ]
                },
                {
                    title: "The Path to Fatherhood",
                    subtitle: "Male Infertility",
                    story: "Thomas didn't want a 'fertility factory'. At Futureace, we corrected his varicocele through planned, microscopic surgery.",
                    procedures: [
                        { name: "Varicocele Repair", detail: "Microsurgical repair to improve sperm quality and the chance of natural conception, handled as a precise day-care procedure." }
                    ]
                },
                {
                    title: "The Intimacy Dialogue",
                    subtitle: "Counselling & Therapy",
                    story: "Healing the mind and body together. Desire and arousal live at the intersection of psychology and biology.",
                    procedures: [
                        { name: "Sexual Therapy", detail: "Compassionate, structured sessions to break cycles of anxiety and restore emotional and physical intimacy." },
                        { name: "Partner Collaboration", detail: "Highly discreet, specialist-led service to address intimate health concerns for individuals and couples." }
                    ]
                }
            ]
        },
        {
            id: 12,
            title: "Physiotherapy & Rehabilitation",
            category: "Wellness",
            tagline: "Healing Doesn't End with Surgery—It Begins There",
            description: "Personalized rehabilitation programs to restore function and physical mobility.",
            longDescription: "After injury or surgery, your body has learnt a new, painful language. Our role is to be your translator and coach, rebuilding trust between you and your own body.",
            philosophy: "We don't watch the clock; we watch your progress. Real recovery happens step by intentional step, moving with joy again.",
            patientThought: {
                quote: "The surgeon gave me a new knee. But the physiotherapy team at Futureace taught me how to use it. Now, every step is mine again.",
                attribution: "Suresh, 70, Retired Postmaster"
            },
            whyChoose: [
                { title: "Boutique One-on-One", desc: "Your session is yours alone. Your therapist is focused entirely on your form, progress, and comfort." },
                { title: "The 'Boutique Loop'", desc: "Our physiotherapists sit in the same room as your surgeons. Your rehab plan is perfectly synced with your surgical procedure." },
                { title: "A Sanctuary for Healing", desc: "No loud music or clanging weights—just a focused, quiet environment where you can listen to your body." },
                { title: "Un-Rushed Milestones", desc: "We take the time needed to ensure you feel safe and confident in every movement." }
            ],
            icon: "Accessibility",
            color: "#E5FFF5",
            image: "/physiotherapy.webp",
            serviceCategories: [
                {
                    title: "The 'Comeback' Programme",
                    subtitle: "Post-Operative & Stroke Rehab",
                    story: "In a large hospital, Suresh felt trapped post-op. At Futureace, we designed a rhythm that had him walking to the tea shop in 8 weeks.",
                    procedures: [
                        { name: "Post-Surgical Rehab", detail: "Phased, personalised plans to protect the repair while aggressively restoring mobility after joint or spine surgery." },
                        { name: "Stroke Rehabilitation", detail: "Neuro-rehabilitation celebrating every ounce of independence, from lifting a foot to recovering a word." }
                    ]
                },
                {
                    title: "The Performance Lab",
                    subtitle: "Sports & Pain Management",
                    story: "Helping the athlete return to their passion and the chronic pain sufferer find the key to their 'cage'.",
                    procedures: [
                        { name: "Pain Management", detail: "Using manual therapy and strengthening to become your joint's 'natural brace' for arthritis or frozen shoulder." },
                        { name: "Sports Rehabilitation", detail: "A blend of manual therapy and advanced science to ensure you return to the field stronger than before." },
                        { name: "Gait & Balance Training", detail: "Retraining your body's proprioception to restore the courage to walk without fear of falling." }
                    ]
                },
                {
                    title: "The Gentle Path",
                    subtitle: "Neuro & Paediatric Care",
                    story: "Specialised support for life's unique challenges in a 'slow-care' environment where every small victory is recognised.",
                    procedures: [
                        { name: "Neurological Physio", detail: "Expert management for Parkinson's and MS, focusing on maintaining long-term function and quality of life." },
                        { name: "Paediatric Physiotherapy", detail: "A playful, supportive environment where children meet developmental milestones through movement." }
                    ]
                }
            ]
        },
        {
            id: 13,
            title: "Multidisciplinary Pain Clinic",
            category: "Clinical",
            tagline: "When pain doesn’t have one answer.",
            description: "Dedicated strategies for managing and relieving chronic pain effectively.",
            longDescription: "Chronic pain is rarely simple. It doesn't fit neatly into one department. So neither do we. We bring together a team—not sequentially, but as one unified force working for you.",
            philosophy: "We don't just ask, 'Where does it hurt?' We ask what the pain has taken from you—and build a plan to give it back. Because pain affects everything, and healing should too.",
            patientThought: {
                quote: "They didn't just treat my back. They treated me—the whole person, not just the part that hurt. I garden again. I play with my grandchildren.",
                attribution: "Geetha, 52, School Teacher"
            },
            whyChoose: [
                { title: "One Team, One Plan", desc: "You don't get passed from specialist to specialist. We meet together, discuss together, and build your plan together." },
                { title: "The Whole Picture", desc: "A pain physician, physiotherapist, and lifestyle expert working in sync to address the metabolic and emotional layers of pain." },
                { title: "Time to Listen", desc: "Our 90-minute initial assessment ensures your story is heard in full for the very first time." },
                { title: "Your Dedicated Guide", desc: "A coordinator stays with you through every step, ensuring you never feel lost in the complex world of chronic pain." }
            ],
            icon: "HeartPulse",
            color: "#FFE6E6",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
            serviceCategories: [
                {
                    title: "Comprehensive Pain Assessment",
                    subtitle: "One Team, One Table",
                    story: "Geetha saw six doctors but no one solved the puzzle. At Futureace, we put all the pieces on one table to build a single, unified plan.",
                    procedures: [
                        { name: "Initial Assessment", detail: "A 90-minute deep-dive consultation involving cross-departmental review of your history and goals." }
                    ]
                },
                {
                    title: "Interventional Management",
                    subtitle: "Targeted Relief",
                    story: "When clinical interventions are needed, we perform them with the precision of a boutique surgical hub.",
                    procedures: [
                        { name: "Minimally Invasive Procedures", detail: "Expert delivery of nerve blocks, epidural steroid injections, and radiofrequency ablation in a sterile environment." }
                    ]
                },
                {
                    title: "The Support Circle",
                    subtitle: "Psychology & Physiotherapy",
                    story: "Pain and anxiety are partners. We provide the tools to change how you respond to pain and rebuild your confidence in movement.",
                    procedures: [
                        { name: "Pain Physiotherapy", detail: "One-on-one sessions to retrain your body and strengthen what supports you, rebuilding trust in movement." },
                        { name: "Psychological Support", detail: "Addressing the sleeplessness and emotional weight that often accompany long-term conditions." }
                    ]
                },
                {
                    title: "Lifestyle Medicine",
                    subtitle: "Quieting the System",
                    story: "Small, consistent shifts in nutrition and habits can quiet inflammation and calm your nervous system.",
                    procedures: [
                        { name: "Metabolic Alignment", detail: "Reshaping habits and diet to reduce the biological triggers of persistent pain." }
                    ]
                }
            ]
        },
        {
            id: 14,
            title: "Gynaecology",
            category: "Surgical",
            tagline: "Care for Every Stage of a Woman's Life",
            description: "Comprehensive healthcare services for women across every stage of life.",
            longDescription: "At Futureace, we don't dismiss. We don't rush. We don't make you feel like you're complaining about something 'normal'. We listen—really listen—to what your body is telling you.",
            philosophy: "From adolescence to menopause, we provide care that respects your time, goals, and dignity. We prioritise options that protect your future and your peace.",
            patientThought: {
                quote: "She didn't just treat my fibroid. She treated my life. I don't cancel plans anymore. I don't dread the calendar.",
                attribution: "Meera, 38, Marketing Consultant"
            },
            whyChoose: [
                { title: "Unhurried Consultation", desc: "No queues, no rushing. Your gynaecologist has the time to hear your full story and explore your life context." },
                { title: "Minimally Invasive by Default", desc: "Laparoscopic and hysteroscopic approaches mean smaller incisions, faster recovery, and zero external scarring." },
                { title: "Fertility-Preserving Care", desc: "We don't assume your plans are complete. We prioritize options that protect your future fertility and grace." },
                { title: "One-on-One Coordination", desc: "One coordinator ensures every step is clear, so you never feel like just another appointment slot." }
            ],
            icon: "Baby",
            color: "#F0E5FF",
            image: "/Gynacology.webp",
            serviceCategories: [
                {
                    title: "Minimally Invasive Surgery",
                    subtitle: "Laparoscopy & Hysteroscopy",
                    story: "Less trauma, faster recovery, smaller scars. Meera had a hysteroscopic myomectomy and was back to work in three days.",
                    procedures: [
                        { name: "Laparoscopic Hysterectomy", detail: "Advanced removal of the uterus through tiny incisions with recovery in days, not weeks." },
                        { name: "Fibroid & Cyst Removal", detail: "Laparoscopic myomectomy and cystectomy focusing on preserving healthy tissue." },
                        { name: "Hysteroscopic Procedures", detail: "For fibroids or polyps inside the cavity—no incisions at all. Same-day relief." }
                    ]
                },
                {
                    title: "The Heavy Bleeding Clinic",
                    subtitle: "Not 'Just Normal'",
                    story: "Heavy bleeding isn't 'just something women deal with'. We identify the exact cause and offer medical or surgical plans tailored to you.",
                    procedures: [
                        { name: "Bleeding Management", detail: "Scientific approach to fibroids, polyps, and adenomyosis with zero dismissal of your pain." }
                    ]
                },
                {
                    title: "Endometriosis & Pelvic Health",
                    subtitle: "Ending the Silence",
                    story: "We don't make you wait 7–10 years for answers. Advanced imaging and surgical diagnosis providing immediate relief.",
                    procedures: [
                        { name: "Endometriosis Care", detail: "Laparoscopic diagnosis and treatment designed to silence pain and restore function." }
                    ]
                },
                {
                    title: " Life Stages: Adolescence to Menopause",
                    subtitle: "Gracious Transitions",
                    story: "You don't have to 'grin and bear it'. Management of hormonal and non-hormonal options for perimenopause and beyond.",
                    procedures: [
                        { name: "Well-Woman Preventive", detail: "Routine exams, HPV vaccination, and cervical screening in a judgement-free zone." },
                        { name: "Menopause Management", detail: "Focused care for bone health, vaginal health, and quality of life during the transition." },
                    ]
                }
            ]
        }
    ],
    facilities: [
        {
            title: "Advanced OTs",
            description: "Two state-of-the-art modular Operating Theatres.",
            icon: "MonitorPlay"
        },
        {
            title: "ICU / HDU",
            description: "Critical care with 24/7 monitoring and advanced support.",
            icon: "HeartPulse"
        },
        {
            title: "Luxury Hospitality",
            description: "Private suites with white-glove service for maximum comfort.",
            icon: "Armchair"
        },
        {
            title: "Diagnostics",
            description: "Comprehensive in-house diagnostic and imaging services.",
            icon: "Stethoscope"
        }
    ],
    doctors: [
        {
            id: 1,
            name: "Dr. Ashna P A",
            specialty: "Chief Dental Surgeon",
            image: "/Doctors/ashna.jpg",
            bio: "Maxillofacial Prosthodontist and Implantologist specialising in re-root canal treatments, implantology, and pediatric dentistry. Currently heads the dental department at Futureace Hospital.",
            experience: "18+ Years",
            qualification: "BDS, MDS (Prosthodontics & Implantology) – Farooqia Dental College, Amrita School of Dentistry",
            languages: "English, Malayalam"
        },
        {
            id: 2,
            name: "Dr. Anand Sivadasan",
            specialty: "Plastic & Cosmetic Surgery",
            image: "/Doctors/anand.jpg",
            bio: "International fellowship-trained cosmetic surgeon specialising in facial aesthetics, rhinoplasty, body contouring, and non-surgical rejuvenation. Founder of the Futureace Centre for Cosmetic Excellence (FACE).",
            experience: "Senior Consultant",
            qualification: "MBBS, DrNB (Plastic Surgery), MRCS (Edinburgh, UK) – Fellowships: Spain, Turkey, UK",
            languages: "English, Malayalam"
        },
        {
            id: 3,
            name: "Dr. Jerrin Jose Thomas",
            specialty: "ENT & Facial Plastic Surgery",
            image: "/Doctors/Dr. Jerrin Jose Thomas.jpeg",
            bio: "Distinguished ENT and Facial Plastic Surgeon with advanced training in Taiwan and the first fellow under the Facial Reconstructive and Cosmetic Surgery India Trust. Expert in rhinoplasty, FESS, and facial reconstruction.",
            experience: "12+ Years",
            qualification: "MBBS, MS (ENT), FAFPRS, FRFPS, FHBOT, FFPRS – Fellowship in Facial Plastic & Reconstructive Surgery (Taiwan)",
            languages: "English, Hindi, Malayalam, Tamil"
        },
        {
            id: 4,
            name: "Dr. Shaheem Shanavas",
            specialty: "General & Laparoscopic Surgery",
            image: "/Doctors/shanavas.jpg",
            bio: "Skilled General Surgeon specialising in laparoscopic and open procedures including thyroidectomies, hernia repairs, gastrointestinal surgeries, diagnostic endoscopies, and trauma care.",
            experience: "12+ Years",
            qualification: "MBBS, MS, DNB (General Surgery), FMAS, FAGE – KMC Manipal, Calicut University",
            languages: "English, Malayalam"
        },
        {
            id: 5,
            name: "Dr. Benzir Hussain",
            specialty: "Psychiatry",
            image: "/Doctors/benzir.jpg",
            bio: "Distinguished Psychiatrist delivering personalized diagnosis and management strategies tailored to each patient's mental health needs, with a patient-centered approach to care.",
            experience: "11+ Years",
            qualification: "MBBS, MD (Psychiatry)",
            languages: "English, Malayalam"
        },
        {
            id: 6,
            name: "Dr. Femi Abdulla",
            specialty: "Psychiatry",
            image: "/Doctors/femi.jpg",
            bio: "Distinguished Psychiatrist delivering personalized diagnosis and management strategies tailored to each patient's mental health needs, with a patient-centered approach to care.",
            experience: "11+ Years",
            qualification: "MBBS, MD (Psychiatry)",
            languages: "English, Malayalam"
        },
        {
            id: 7,
            name: "Dr. Acharya Rajneesh",
            specialty: "Orthopaedic Surgery",
            image: "",
            bio: "Veteran Orthopaedic and Joint Replacement Surgeon with over 15 years of experience. Specializes in trauma management, ORIF of complex fractures, percutaneous pinning, total joint replacements, diagnostic arthroscopy, and patient-focused rehabilitation.",
            experience: "15+ Years",
            qualification: "MBBS, MS (Orthopaedics)",
            languages: "English, Malayalam, Hindi"
        },
        {
            id: 8,
            name: "Dr. Nidhin Skariah",
            specialty: "General & Laparoscopic Surgery",
            image: "",
            bio: "Experienced General and Laparoscopic Surgeon specializing in minimally invasive procedures including hernia repair, appendectomy, gallbladder surgery, and advanced general surgical care with faster recovery and minimal scarring.",
            experience: "9+ Years",
            qualification: "MBBS, MS (General Surgery), FMAS",
            languages: "English, Malayalam, Hindi"
        },
        {
            id: 9,
            name: "Dr. Praveen Kumar KS",
            specialty: "Sports Medicine & Orthopaedics",
            image: "",
            bio: "Sports Medicine and Arthroscopy specialist, official surgeon of Kerala Blasters FC. Expertise includes joint replacement, arthroscopy, complex fracture management, sports injury treatment, and shoulder & elbow surgery.",
            experience: "15+ Years",
            qualification: "MBBS, MS (Orthopaedics), MCh (Orthopaedics)",
            languages: "English, Malayalam, Hindi"
        },
        {
            id: 10,
            name: "Mary Anusha Sebastian",
            specialty: "Psychology",
            image: "",
            bio: "RCI-licensed Clinical Psychologist with specialized training in clinical psychology and mental health care. JRF-qualified by the University Grants Commission, she provides evidence-based psychological assessment and therapy with a compassionate, patient-centered approach.",
            experience: "2+ Years",
            qualification: "M.Sc. Clinical Psychology, M.Phil Clinical Psychology, JRF Qualified (UGC)",
            languages: "English, Malayalam"
        },
        {
            id: 11,
            name: "Dr. Abraham K Abraham",
            specialty: "General Medicine",
            image: "",
            bio: "Senior Consultant Physician with extensive experience in internal medicine and allied specialties. Expertise includes the diagnosis and long-term management of diabetes, hypertension, dyslipidemia, obesity, asthma, coronary heart disease, and thyroid disorders.",
            experience: "20+ Years",
            qualification: "MBBS, MD, FCPS",
            languages: "English, Malayalam, Hindi"
        },
        {
            id: 12,
            name: "Dr. Saju K G",
            specialty: "ENT Surgery",
            image: "",
            bio: "Highly experienced ENT Surgeon with over 26 years of clinical practice. Specializes in diagnosing and treating a wide range of ear, nose, and throat conditions while providing comprehensive surgical and patient-focused care.",
            experience: "26+ Years",
            qualification: "MBBS, MS (ENT)",
            languages: "English, Malayalam"
        },
        {
            id: 13,
            name: "Dr. Anoop G Mohan",
            specialty: "Plastic & Cosmetic Surgery",
            image: "",
            bio: "International Aesthetic Plastic Surgery Consultant and Director specializing in body sculpting, body contouring, and advanced aesthetic procedures. Certified TD Master in High Definition Liposculpture, he combines internationally proven techniques with the latest technology to achieve natural-looking results.",
            experience: "18+ Years",
            qualification: "MBBS, MS (General Surgery), MCh (Plastic Surgery), Certification in Trichology & Hair Transplant",
            languages: "English, Malayalam"
        },
    ],
    testimonials: [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "Entrepreneur",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
            headline: "Exceptional Boutique Experience",
            text: "Futureace doesn't feel like a hospital. The level of care and personal attention I received during my surgery was comparable to a luxury hotel. Truly South India's first boutique hospital."
        },
        {
            id: 2,
            name: "Rajesh Kumar",
            role: "Retired Professor",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
            headline: "Expert Orthopaedic Care",
            text: "My knee replacement was handled with such precision. The physical therapy team is top-notch. I'm walking pain-free after years of struggle."
        },
        {
            id: 3,
            name: "Anita Menon",
            role: "Marketing Director",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
            headline: "Compassionate & Discreet",
            text: "I appreciated the absolute privacy and discretion during my dermatological procedures. The staff is professional and the environment is incredibly calming."
        }
    ]
};

export const statsData = [
    { label: "Doctors At Work", value: 500, suffix: "+" },
    { label: "Happy Patients", value: 58796, suffix: "+" },
    { label: "Medical Beds", value: 500, suffix: "+" },
    { label: "Winning Awards", value: 200, suffix: "+" },
];
