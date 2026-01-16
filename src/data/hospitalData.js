export const hospitalData = {
    name: "Futureace Hospital",
    tagline: "South India's First Boutique Hospital",
    description: "Redefining healthcare with boutique, white-glove service. We are a patient-first hospital that treats you like family, not a transaction.",
    contact: {
        phone: "+91 123 456 7890",
        email: "care@futureacehospital.com",
        address: "Banjara Hills, Hyderabad, Telangana",
    },
 departments : [
  {
    id: 1,
    title: "Orthopaedics & Joint Replacement",
    description: "Advanced robotic joint replacement and sports medicine.",
    icon: "Bone",
    color: "#FFE5E5",
    image: "https://t4.ftcdn.net/jpg/17/03/86/23/240_F_1703862369_wdu2m3RyCatOlSV2BK7RC3sGQ514hsBK.jpg"
  },
  {
    id: 2,
    title: "ENT, Head & Neck Surgery",
    description: "Comprehensive care for ear, nose, and throat disorders.",
    icon: "Ear",
    color: "#E5F0FF",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP_XKmA9U_3W3-9HZTpF8wrsfn-4kmmSzr7g&s"
  },
  {
    id: 3,
    title: "Dental & Maxillofacial",
    description: "Cosmetic dentistry and complex facial surgeries.",
    icon: "Smile",
    color: "#E5FFEA",
    image: "https://dentistinnewbritain.com/images/cosmeticdentistry/2.png"
  },
  {
    id: 4,
    title: "Psychiatry & Behavioural",
    description: "Holistic mental health support and counseling.",
    icon: "Brain",
    color: "#FFF5E5",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdV8p3yP0xLWTnYGEdvalXzwJFE82syUq0g&s"
  },
  {
    id: 5,
    title: "Cosmetic Excellence (FACE)",
    description: "Aesthetic procedures for confidence and renewal.",
    icon: "Sparkles",
    color: "#F3E5FF",
    image: "https://img.medestheticsmag.com/files/base/allured/all/image/2024/01/AdobeStock_68517996.65a09c7413f2d.png?auto=format%2Ccompress&q=70&rect=0%2C9%2C5616%2C3159&w=700" // ⬅️ replace with real image
  },
  {
    id: 6,
    title: "Neuro & Spine",
    description: "Expert neurological care and minimally invasive spine surgery.",
    icon: "Activity",
    color: "#E5F9FF",
    image: "https://d35oenyzp35321.cloudfront.net/understanding_neurological_and_spinal_emergencies_cb39d3cbf9.jpg" // ⬅️ replace with real image
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
            name: "Dr. Aravind Kumar",
            specialty: "Orthopaedics",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
            bio: "Expert in robotic knee replacements with a focus on rapid recovery protocols.",
            experience: "15+ Years",
            qualification: "MBBS, MS (Ortho), Fellowship in Joint Replacement (USA)",
            languages: "English, Hindi, Telugu"
        },
        {
            id: 2,
            name: "Dr. Sarah Joseph",
            specialty: "Cosmetic Surgery",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
            bio: "Specializing in facial aesthetics and reconstructive procedures with a natural approach.",
            experience: "12+ Years",
            qualification: "MBBS, MCh (Plastic Surgery)",
            languages: "English, Hindi, Malayalam"
        },
        {
            id: 3,
            name: "Dr. Rajesh Menon",
            specialty: "Neurology",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
            bio: "Pioneer in minimally invasive spine surgeries and complex neuro-interventions.",
            experience: "18+ Years",
            qualification: "MBBS, MD (General Medicine), DM (Neurology)",
            languages: "English, Hindi, Tamil"
        },
        {
            id: 4,
            name: "Dr. Emily Chen",
            specialty: "Dental Surgery",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
            bio: "Award-winning maxillofacial surgeon focused on patient comfort and aesthetic outcomes.",
            experience: "10+ Years",
            qualification: "BDS, MDS (Maxillofacial Surgery)",
            languages: "English, Mandarin"
        }
    ],
 testimonials: [
  {
    id: 1,
    name: "Priya S.",
    role: "Knee Replacement Patient",
    image:"https://media.istockphoto.com/id/1739325597/photo/nurse-senior-woman-and-smile-with-comfort-holding-hands-or-support-in-nursing-home-for.jpg?s=612x612&w=0&k=20&c=BMCKzCUYgUGPlSugqpmKVJ3tNzeh0Sv_HjYcKOrKuKI=",
    text: "The boutique feel made all the difference. It felt like a hotel, not a hospital. The doctors were incredibly supportive and the robotic surgery was painless and fast.",
  },
  {
    id: 2,
    name: "Ahmed K.",
    role: "Spine Surgery Patient",
    image: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczc3LW1ja2luc2V5LTc2MTEtcG9tXzMuanBn.jpg",
    text: "Incredible care by Dr. Aravind. The robotic surgery was seamless and the recovery time was much faster than expected.",
  },
]

};
export const statsData = [
  { label: "Doctors At Work", value: 500, suffix: "+" },
  { label: "Happy Patients", value: 58796, suffix: "+" },
  { label: "Medical Beds", value: 500, suffix: "+" },
  { label: "Winning Awards", value: 200, suffix: "+" },
];


