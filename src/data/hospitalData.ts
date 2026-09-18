import { Department, Doctor, LeadershipMember, DonationCause, GalleryItem } from '../types';

export const HOSPITAL_INFO = {
  name: "Ali Welfare Trust Hospital",
  urduName: "علی ویلفیئر ٹرسٹ ہسپتال",
  tagline: "Devoted to Quality Healthcare with Compassion Since 2005",
  location: "Chahal Kalan Road, Qila Didar Singh, Gujranwala, Punjab, Pakistan",
  address: "Ali Welfare Trust Hospital, Chahal Kalan Road, Main Campus, Qila Didar Singh, Gujranwala, Pakistan",
  contactNumbers: [
    "03324711101",
    "03364711100",
    "+92 345 2074974"
  ],
  phone: "03324711101",
  secondaryPhone: "03364711100",
  mobilePhone: "+92 345 2074974",
  emergencyPhone: "03324711101",
  helpline: "03364711100",
  whatsapp: "923452074974",
  email: "info@aliwelfaretrusthospital.org",
  websiteUrl: "https://aliwelfaretrusthospital.org",
  registration: "Regd. Non-Profit Healthcare Welfare Organization #1142/GRW",
  hours: "24/7 Emergency, Pharmacy & Dialysis Services",
  opdHours: "OPD: Monday - Saturday (8:00 AM - 10:00 PM)",
  foundedYear: 2005,
  coordinates: {
    lat: 32.1311,
    lng: 74.0268,
  },
  googleMapsLink: "https://maps.google.com/?q=Ali+Welfare+Trust+Hospital+Chahal+Kalan+Qila+Didar+Singh+Gujranwala",
  mapEmbedUrl: "https://maps.google.com/maps?q=Ali%20Welfare%20Trust%20Hospital%20Chahal%20Kalan%20Qila%20Didar%20Singh%20Gujranwala&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

export const BANK_DETAILS = {
  bankName: "Meezan Bank Ltd.",
  accountTitle: "MUHAMMAD RAFAY AWAN",
  iban: "PK57MEZN0009110108226635",
  accountNo: "09110108226635",
  branchName: "Qila Didar Singh Branch, Gujranwala",
  branchCode: "0911",
  city: "QILA DIDAR SINGH GUJRANWALA",
  currency: "PKR (Pakistani Rupee)",
  taxStatus: "Charitable Trust / Zakat & Sadqah Eligible",
  appealUrdu: "مستحق اور نادار مریضوں کے علاج اور ادویات کے لیے دل کھول کر عطیات دیں",
  appealEnglish: "Please donate generously to support life-saving kidney dialysis, eye surgeries, and free medical aid for poor and needy patients."
};

export const MISSION_AND_VALUES = {
  mission: "To provide accessible and compassionate healthcare, ensuring high-quality medical services for our community, regardless of circumstances.",
  vision: "To be a leading healthcare institution known for excellence in patient care and community service, creating a healthier society through innovation and empowerment.",
  urduMission: "معاشرے کے ہر فرد کو بلا تفریق معیاری، سستی اور ہمدردانہ طبی سہولیات کی فراہمی",
  urduVision: "صحت عامہ میں جدت، بہترین نگہداشت اور بے لوث خدمت کے ذریعے ایک صحت مند معاشرے کی تشکیل"
};

export const LEADERSHIP: LeadershipMember[] = [
  {
    id: "nazar-alvi",
    name: "Nazar Hussain Alvi",
    title: "Late Founder & Visionary Patron",
    role: "Founder (2005)",
    bio: "The benevolent founder whose compassion and devotion laid the cornerstone of Ali Welfare Trust Hospital in 2005, ensuring that no patient in Qila Didar Singh and surrounding villages is ever denied world-class healthcare due to lack of funds.",
    imageUrl: "/images/founder-nazar-alvi.jpg",
    isLate: true,
    quote: "Serving humanity in distress is the highest form of worship. Our doors must always remain open to the needy."
  },
  {
    id: "zamin-alvi",
    name: "Zamin Ali Alvi",
    title: "Chairman & Chief Executive Officer (CEO)",
    role: "Executive Chairman & CEO",
    bio: "Under his dynamic executive leadership, the hospital has expanded into a multi-specialty institution featuring state-of-the-art dialysis suites, digital radiology, advanced eye care theater, and free medicine distribution programs.",
    imageUrl: "/images/ceo-zamin-alvi.jpg",
    isLate: false,
    quote: "Our relentless commitment is to blend clinical excellence with heartfelt empathy for every single patient."
  },
  {
    id: "khawar-awan",
    name: "Khawar Abbas Awan",
    title: "Hospital Director",
    role: "Director of Administration & Development",
    bio: "Spearheading administrative operational excellence, welfare outreach programs, community health camps, and modern infrastructure enhancements across all inpatient and outpatient departments.",
    imageUrl: "/images/director-khawar-awan.jpg",
    isLate: false,
    quote: "Every donation and every effort is dedicated transparently towards saving human lives and alleviating pain."
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: "medicine",
    name: "General Physician & OPD",
    urduName: "جنرل فزیشن و او پی ڈی کلینک",
    shortDesc: "Daily General Physician clinical consultations for fevers, infections, diabetes, blood pressure, and adult illnesses.",
    fullDesc: "Our General Physician department offers compassionate, expert primary healthcare. From routine health assessments to management of chronic hypertension, diabetes, gastrointestinal and seasonal infections, qualified medical officers and senior physicians are on duty daily.",
    iconUrl: "/images/dept-medical.png",
    badge: "General Physician OPD",
    features: [
      "Daily General Physician Consultations",
      "Blood Pressure & Diabetes Care",
      "Fever, Flu & Seasonal Infection Protocol",
      "Family Health & Preventative Medicine",
      "Routine Executive Health Screenings"
    ],
    headDoctor: "Dr. Sheraz Ul Hassan Chathha (General Physician)",
    timings: "Daily: 8:00 AM - 10:00 PM",
    emergencyAvailable: true
  },
  {
    id: "radiology",
    name: "Ultrasound & Color Doppler",
    urduName: "شعبہ الٹراساؤنڈ و کلر ڈوپلر",
    shortDesc: "High-resolution 4D Ultrasound, Color Doppler scans, Digital X-Rays, and immediate imaging reports.",
    fullDesc: "State-of-the-art Ultrasound and diagnostic imaging wing equipped with multi-frequency probes for abdominal, pelvic, obstetrics/pregnancy 3D/4D scans, vascular color doppler, and digital X-rays operated by qualified sonologists and radiologists.",
    iconUrl: "/images/dept-3d-radiology.jpg",
    badge: "4D Ultrasound & Imaging",
    features: [
      "High-Resolution Abdominal & Pelvic Ultrasound",
      "Obstetric 3D/4D Pregnancy & Fetal Ultrasound",
      "Color Doppler Vascular & Organ Scans",
      "Digital High-Frequency X-Ray Imaging",
      "Immediate Diagnostic Reporting by Radiologist"
    ],
    headDoctor: "Consultant Radiologist & Sonologist",
    timings: "Daily: 9:00 AM - 9:00 PM (Emergency 24/7)",
    emergencyAvailable: true
  },
  {
    id: "pathology",
    name: "Laboratory for Blood Tests",
    urduName: "لیبارٹری برائے خون کے ٹیسٹ و تشخیص",
    shortDesc: "Complete Blood Count (CBC), Blood Sugar, LFT, RFT, Lipid Profile, and 24/7 automated blood testing.",
    fullDesc: "Comprehensive clinical diagnostic laboratory offering precision hematology, biochemistry, and serology. Automated blood analyzers provide rapid, accurate testing for emergency blood counts, cardiac enzymes, viral hepatitis screening, and organ profiles.",
    iconUrl: "/images/dept-scan.png",
    badge: "24/7 Blood Laboratory",
    features: [
      "Complete Blood Count (CBC) & ESR",
      "Blood Sugar (Fasting & Random), HbA1c",
      "Kidney (RFT) & Liver (LFT) Function Blood Profiles",
      "Hepatitis B & C Rapid & ELISA Screening",
      "Free & Subsidized Blood Tests for Needy Patients"
    ],
    headDoctor: "Consultant Pathologist & Lab Director",
    timings: "24 Hours / 7 Days (Continuous Blood Testing)",
    emergencyAvailable: true
  },
  {
    id: "dialysis",
    name: "Kidney Dialysis Center",
    urduName: "کڈنی ڈائلیسز سنٹر",
    shortDesc: "Advanced German-standard hemodialysis machines delivering free & subsidized life-saving renal care.",
    fullDesc: "Our dedicated Kidney Dialysis Unit provides round-the-clock hemodialysis supervised by experienced nephrologists and certified dialysis technicians. Complete with dedicated water treatment plant, strict sterilization protocols, and emergency backup.",
    iconUrl: "/images/dept-3d-dialysis.jpg",
    badge: "Life-Saving Center",
    features: [
      "Modern Hemodialysis Machines",
      "Reverse Osmosis (RO) Medical Water Plant",
      "Free Sessions for Deserving Patients",
      "Emergency 24/7 Dialysis Shift",
      "Dedicated Hepatitis B & C Separate Units"
    ],
    headDoctor: "Consultant Nephrologist",
    timings: "24 Hours / 3 Daily Shifts",
    emergencyAvailable: true
  },
  {
    id: "eye-care",
    name: "Eye Care & Ophthalmology",
    urduName: "آئی کیئر و امراض چشم",
    shortDesc: "Modern phaco cataract surgeries, computer vision testing, and cornea diagnostics.",
    fullDesc: "Equipped with state-of-the-art ophthalmic surgical microscopes, phacoemulsification systems, auto-refractometers, and slit lamps. We organize frequent free cataract surgery camps for rural elderly citizens.",
    iconUrl: "/images/dept-3d-eyecare.jpg",
    badge: "Surgical Center",
    features: [
      "Stitchless Phaco Cataract Surgery",
      "Computerized Eye Examination",
      "Glaucoma & Diabetic Retinopathy Screening",
      "Free Lens Implantation for Needy Patients",
      "Pediatric Vision Screening"
    ],
    headDoctor: "Specialist Eye Surgeon",
    timings: "Daily: 9:00 AM - 6:00 PM",
    emergencyAvailable: true
  },
  {
    id: "gynecology",
    name: "Gynecology & Obstetrics",
    urduName: "امراض نسواں و زچگی",
    shortDesc: "Safe deliveries, prenatal and postnatal maternal care, and female reproductive health.",
    fullDesc: "Dedicated labor rooms, modern neonatal resuscitation setup, experienced female gynecologists and trained lady health visitors ensuring safe child delivery and respectful mother-infant care.",
    iconUrl: "/images/dept-check.png",
    badge: "Maternal Health",
    features: [
      "Fully Equipped Labor & Delivery Suite",
      "Antenatal & High-Risk Pregnancy Clinics",
      "Elective & Emergency C-Sections",
      "Female Specialists & Midwives",
      "Post-Partum Counseling & Vaccination"
    ],
    headDoctor: "Consultant Gynecologist",
    timings: "24/7 Maternity Emergency",
    emergencyAvailable: true
  },
  {
    id: "emergency",
    name: "24/7 Emergency & Trauma",
    urduName: "ایمرجنسی و ٹراما سنٹر ۲۴ گھنٹے",
    shortDesc: "Rapid response trauma unit with oxygen manifold, cardiac monitors, and resuscitation beds.",
    fullDesc: "Uninterrupted 24/7 trauma and acute care reception capable of stabilizing accidents, cardiac crises, acute respiratory failure, and medical emergencies immediately upon arrival.",
    iconUrl: "/images/dept-3d-emergency.jpg",
    badge: "Critical 24/7",
    features: [
      "Always-On Duty Medical Officers",
      "Central Oxygen Supply & Defibrillators",
      "Rapid Triage & Minor OT",
      "Fully Equipped Mobile Ambulance Fleet",
      "Direct Admission to ICU / Wards"
    ],
    headDoctor: "Emergency Care Incharge",
    timings: "24/7/365 Non-Stop",
    emergencyAvailable: true
  },
  {
    id: "pharmacy",
    name: "In-House Welfare Pharmacy",
    urduName: "شعبہ ادویات و فارمیسی",
    shortDesc: "Quality certified medicines available 24/7, with subsidized and free medicine dispensation.",
    fullDesc: "Clean, temperature-controlled pharmacy stocking 100% authentic pharmaceuticals directly from approved manufacturers. Free medication dispensed to eligible needy patients on doctor prescription.",
    iconUrl: "/images/dept-3d-pharmacy.jpg",
    badge: "Subsidized / Free",
    features: [
      "100% Genuine Certified Pharmaceuticals",
      "Free Dispensation for Zakat Patients",
      "Temperature-Controlled Cold Chain",
      "Open 24 Hours Round the Clock",
      "Expert Pharmacist Consultation"
    ],
    headDoctor: "Chief Pharmacist",
    timings: "24 Hours / 7 Days",
    emergencyAvailable: true
  },
  {
    id: "ent",
    name: "Ear, Nose & Throat (ENT)",
    urduName: "شعبہ ناک، کان و گلا",
    shortDesc: "Comprehensive diagnostics and treatments for ear infections, sinus conditions, and throat disorders.",
    fullDesc: "Equipped with modern diagnostic otoscopes, audiometry screening, and specialized ENT clinic offering patient-first solutions for hearing, nasal breathing, and throat health.",
    iconUrl: "/images/dept-check.png",
    badge: "Specialist Care",
    features: [
      "Ear Examination & Microscopic Cleaning",
      "Sinus & Nasal Polyps Assessment",
      "Throat & Tonsil Care",
      "Hearing Assessment & Tinnitus Support",
      "Pediatric & Adult ENT Care"
    ],
    headDoctor: "Dr. Saqib Jalil",
    timings: "Fridays: 10:00 AM - 01:00 PM",
    emergencyAvailable: false
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics & Family Medicine",
    urduName: "ہڈی، جوڑ و فیملی میڈیسن",
    shortDesc: "Joint pain, fractures, arthritis management, and full-spectrum family healthcare.",
    fullDesc: "Dedicated orthopaedic and family medicine consultation offering advanced bone, joint, and spine evaluations alongside everyday medical triage for all family members.",
    iconUrl: "/images/dept-urologist.png",
    badge: "Bone & Joint Clinic",
    features: [
      "Fracture Management & Splinting",
      "Arthritis & Joint Infiltration Therapy",
      "Back & Neck Pain Evaluation",
      "Family Health Consultations",
      "Post-Trauma Rehabilitation Support"
    ],
    headDoctor: "Dr. Usama Saeed",
    timings: "Mon - Sat: 09:30 AM - 03:00 PM (Sunday Off)",
    emergencyAvailable: true
  },
  {
    id: "physiotherapy",
    name: "Physical Therapy & Rehabilitation",
    urduName: "فزیوتھراپی و ری ہیبلی ٹیشن",
    shortDesc: "Targeted physical rehabilitation for stroke recovery, chronic joint pain, and mobility restoration.",
    fullDesc: "Modern physiotherapy unit equipped with ultrasonic therapy, TENS, cervical-lumbar traction, and tailored kinesiology exercise regimens under expert physiotherapist supervision.",
    iconUrl: "/images/dept-observation.png",
    badge: "Rehab Center",
    features: [
      "Stroke & Neurological Rehabilitation",
      "Musculoskeletal Pain Relief (TENS / US)",
      "Frozen Shoulder & Sciatica Therapy",
      "Post-Surgical Mobility Recovery",
      "Spinal Traction & Ergonomic Guidance"
    ],
    headDoctor: "Dr. Amara Anwar",
    timings: "Daily: 03:00 PM - 06:00 PM",
    emergencyAvailable: false
  },
  {
    id: "pediatrics",
    name: "Pediatrics & Child Healthcare",
    urduName: "شعبہ اطفال و نگہداشتِ نو مولود",
    shortDesc: "Comprehensive infant, child, and adolescent healthcare, growth monitoring, and immunization.",
    fullDesc: "Gentle and compassionate pediatric care focusing on newborn health, childhood infections, nutritional advice, vaccination, and developmental screening.",
    iconUrl: "/images/dept-medical.png",
    badge: "Child Health",
    features: [
      "Newborn & Infant Clinical Checkups",
      "Child Nutrition & Stunted Growth Assessment",
      "Pediatric Infections & Fever Protocol",
      "Immunization & Vaccine Guidance",
      "Allergy & Childhood Asthma Management"
    ],
    headDoctor: "Dr. Salman Khalid",
    timings: "Sat & Mon: 09:00 AM - 12:00 PM",
    emergencyAvailable: true
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-eman-salman",
    name: "Dr. Eman Salman",
    specialty: "Gynaecologist",
    designation: "Consultant Gynaecologist & Obstetrician",
    departmentId: "gynecology",
    departmentName: "Gynecology & Obstetrics",
    consultationDays: "Saturday & Monday",
    timing: "08:00 am to 01:00 pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Eman Salman is a distinguished Consultant Gynaecologist specializing in comprehensive maternal-fetal care, high-risk obstetric management, antenatal triage, and gynecological disorder therapeutics. Dedicated to providing respectful, evidence-based reproductive healthcare at Ali Welfare Trust Hospital.",
    qualification: "MBBS, FCPS (Obstetrics & Gynaecology), Member of Society of Obstetricians & Gynaecologists",
    experience: "Consultant Specialist in Maternal Health & Advanced Gynecological Medicine",
    days: ["Saturday", "Monday"],
    imageUrl: "/images/doctor-female-scrubs.jpg",
    specialties: [
      "Obstetrics & Antenatal Care",
      "High-Risk Pregnancy Evaluation",
      "Gynecological Disorder Therapeutics",
      "Maternal-Fetal Health Protocols"
    ],
    isAvailableToday: true,
    avatarType: "female"
  },
  {
    id: "dr-saqib-jalil",
    name: "Dr. Saqib Jalil",
    specialty: "Ear, Nose, and Throat (ENT)",
    designation: "Consultant ENT Surgeon & Otolaryngologist",
    departmentId: "ent",
    departmentName: "Ear, Nose & Throat (ENT)",
    consultationDays: "Friday",
    timing: "10:00 am to 01:00 pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Saqib Jalil is an esteemed Otolaryngology (ENT) Specialist offering advanced clinical diagnostics and therapeutic protocols for hearing impairments, chronic sinusitis, nasal airway obstructions, vertigo, and throat pathologies at Ali Welfare Trust Hospital.",
    qualification: "MBBS, FCPS / MS (Oto-Rhino-Laryngology), Certified Head & Neck Specialist",
    experience: "Senior Consultant in Clinical Otolaryngology & ENT Surgical Care",
    days: ["Friday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Otology & Hearing Impairment Care",
      "Rhinology & Sinus Pathology",
      "Tonsillar & Laryngeal Disorders",
      "Vertigo & Tinnitus Diagnostics"
    ],
    isAvailableToday: true,
    avatarType: "ent"
  },
  {
    id: "dr-zeeshan-saeed",
    name: "Dr. Zeeshan Saeed",
    specialty: "Kidney Transplant Physician",
    designation: "Kidney Transplant Physician & Nephrologist",
    departmentId: "dialysis",
    departmentName: "Kidney Dialysis & Nephrology",
    consultationDays: "Thursday",
    timing: "01:00 pm to 04:00 pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Zeeshan Saeed is an accomplished Kidney Transplant Physician and Nephrologist with focused expertise in renal replacement therapies, pre- and post-kidney transplant immunosuppression oversight, glomerulonephritis, and advanced hemodialysis management at Ali Welfare Trust Hospital.",
    qualification: "MBBS, FCPS (Nephrology), Fellowship in Renal Transplantation & Hemodialysis",
    experience: "Specialist Consultant in Kidney Transplantation & Chronic Renal Care",
    days: ["Thursday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Kidney Transplantation Care",
      "Post-Transplant Immunosuppression",
      "Chronic Kidney Disease (CKD)",
      "Hemodialysis Clinical Oversight"
    ],
    isAvailableToday: true,
    avatarType: "kidney"
  },
  {
    id: "dr-usama-saeed",
    name: "Dr. Usama Saeed",
    specialty: "Family Physician & Orthopaedic Surgeon",
    designation: "Family Physician & Orthopaedic Surgeon",
    departmentId: "orthopaedics",
    departmentName: "Orthopaedics & Family Medicine",
    consultationDays: "Monday to Saturday (Sunday Off)",
    timing: "09:30 am to 03:00 pm Sunday Off",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Usama Saeed provides high-level clinical management spanning orthopaedic trauma, degenerative joint disorders, spinal alignment, fracture immobilization, as well as comprehensive primary family medicine across all age groups at Ali Welfare Trust Hospital.",
    qualification: "MBBS, FCPS (Orthopaedic Surgery), MCPS (Family Medicine)",
    experience: "Dual-Certified Consultant in Orthopaedic Surgery & Primary Family Healthcare",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Fracture Care & Splinting",
      "Joint Pain & Arthritis Injections",
      "Spine & Lumbar Strain Assessment",
      "Family Health & Preventive Care"
    ],
    isAvailableToday: true,
    avatarType: "ortho"
  },
  {
    id: "dr-amara-anwar",
    name: "Dr. Amara Anwar",
    specialty: "Physiotherapist",
    designation: "Consultant Physiotherapist & Rehabilitation Specialist",
    departmentId: "physiotherapy",
    departmentName: "Physical Therapy & Rehabilitation",
    consultationDays: "Monday to Saturday",
    timing: "03:00 pm to 06:00 pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Amara Anwar is an expert Physiotherapist directing customized neurological and musculoskeletal rehabilitation programs, post-trauma recovery, electrotherapy, and ergonomic spinal decompression regimens at Ali Welfare Trust Hospital.",
    qualification: "DPT (Doctor of Physical Therapy), Certified Musculoskeletal Rehabilitation Practitioner",
    experience: "Clinical Specialist in Physical Therapy & Neuro-Muscular Rehabilitation",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    imageUrl: "/images/doctor-female-scrubs.jpg",
    specialties: [
      "Post-Surgical Joint Mobilization",
      "Stroke & Neurological Rehabilitation",
      "Sciatica & Disc Decompression Therapy",
      "Ultrasonic & TENS Electrotherapy"
    ],
    isAvailableToday: true,
    avatarType: "physio"
  },
  {
    id: "dr-syed-jawad-haider",
    name: "Dr. Syed Jawad Haider",
    specialty: "Consultant Neuro Surgeon",
    designation: "Consultant Neuro Surgeon & Spine Specialist",
    departmentId: "orthopaedics",
    departmentName: "Orthopaedics & Spine Clinic",
    consultationDays: "Saturday",
    timing: "10:00 am to 01:00 pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Syed Jawad Haider is an eminent Consultant Neuro Surgeon offering expert tertiary consultations for cranial traumas, cerebral pathologies, spinal disc herniations, cervical cord compression, and peripheral neuropathy at Ali Welfare Trust Hospital.",
    qualification: "MBBS, FCPS (Neurosurgery), Fellowship in Minimally Invasive Spine Surgery",
    experience: "Tertiary Consultant Neurosurgeon & Spinal Reconstruction Specialist",
    days: ["Saturday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Cranial Surgery & Trauma Follow-Up",
      "Herniated Disc & Spine Pathology",
      "Peripheral Nerve Compression",
      "Neurological Triage & Diagnostics"
    ],
    isAvailableToday: true,
    avatarType: "neuro"
  },
  {
    id: "dr-sheraz-ul-hassan-chathha",
    name: "Dr.Sheraz Ul Hassan Chathha",
    specialty: "General Physician",
    designation: "Consultant General Physician & Internal Medicine",
    departmentId: "medicine",
    departmentName: "General & Internal Medicine",
    consultationDays: "Sunday",
    timing: "03:00 pm to 08:00 pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Sheraz Ul Hassan Chathha is a dedicated General Physician providing clinical triage, infectious disease protocols, cardiovascular and metabolic wellness diagnostics, and acute illness management at Ali Welfare Trust Hospital.",
    qualification: "MBBS, FCPS / MRCP (Internal Medicine Specialist)",
    experience: "Experienced Medical Specialist in Clinical Diagnostics & Adult Medicine",
    days: ["Sunday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Internal & Adult General Medicine",
      "Diabetes & Hypertension Care",
      "Acute Febrile & Infectious Illness",
      "Preventive Health Assessments"
    ],
    isAvailableToday: true,
    avatarType: "general"
  },
  {
    id: "dr-jamshed-ahmed-cheema",
    name: "Dr. Jamshed Ahmed Cheema",
    specialty: "Chest Specialist",
    designation: "Consultant Chest Specialist & Pulmonologist",
    departmentId: "medicine",
    departmentName: "Chest & Internal Medicine",
    consultationDays: "Sunday",
    timing: "08:30 am to 12:30 pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Jamshed Ahmed Cheema is a leading Pulmonologist and Chest Specialist treating chronic obstructive pulmonary disease (COPD), bronchial asthma, pulmonary infections, chronic cough, and post-pneumonia complications at Ali Welfare Trust Hospital.",
    qualification: "MBBS, DTCD, FCPS (Pulmonology & Chest Diseases)",
    experience: "Senior Respiratory Medicine Consultant & Bronchial Disease Expert",
    days: ["Sunday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Asthma & Airway Management",
      "Chronic Obstructive Pulmonary Disease",
      "Chest Radiology Interpretation",
      "Infectious Respiratory Diseases"
    ],
    isAvailableToday: true,
    avatarType: "chest"
  },
  {
    id: "dr-salman-khalid",
    name: "Dr. Salman Khalid",
    specialty: "Child Specialist",
    designation: "Consultant Child Specialist & Pediatrician",
    departmentId: "pediatrics",
    departmentName: "Pediatrics & Child Healthcare",
    consultationDays: "Saturday & Monday",
    timing: "09:00 am to 12:00pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Salman Khalid is a compassionate Child Specialist delivering expert neonatal care, infant nutrition counseling, pediatric infectious disease therapy, immunization schedules, and developmental milestones monitoring at Ali Welfare Trust Hospital.",
    qualification: "MBBS, FCPS (Pediatrics / Child Health), DCH",
    experience: "Consultant Pediatrician & Neonatal Care Specialist",
    days: ["Saturday", "Monday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Neonatal & Infant Healthcare",
      "Pediatric Infections & Fever Protocol",
      "Growth Monitoring & Nutrition",
      "Childhood Asthma & Immunity Care"
    ],
    isAvailableToday: true,
    avatarType: "child"
  },
  {
    id: "dr-amir-sohail",
    name: "Dr. Amir Sohail",
    specialty: "Eye physician",
    designation: "Consultant Eye Physician & Ophthalmologist",
    departmentId: "eye-care",
    departmentName: "Eye Care & Ophthalmology",
    consultationDays: "Monday to Saturday",
    timing: "10:00 am to 04:00 pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Amir Sohail is a seasoned Eye Physician offering comprehensive computerized refractive assessments, glaucoma management, diabetic retinopathy evaluations, and anterior segment diagnostics at Ali Welfare Trust Hospital.",
    qualification: "MBBS, DOMS, FCPS (Ophthalmology)",
    experience: "Specialist Consultant in Clinical Ophthalmology & Refractive Health",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Comprehensive Ophthalmic Diagnostics",
      "Computerized Vision Testing",
      "Glaucoma & Intraocular Pressure",
      "Cornea & Retinal Health Screening"
    ],
    isAvailableToday: true,
    avatarType: "eye"
  },
  {
    id: "dr-malik-muhammad-arfan",
    name: "Dr. Malik Muhammad Arfan",
    specialty: "Gastroenterologist",
    designation: "Consultant Gastroenterologist & Hepatologist",
    departmentId: "medicine",
    departmentName: "Gastroenterology & Internal Medicine",
    consultationDays: "Sunday",
    timing: "04:00 pm to 06:00 pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Malik Muhammad Arfan is an expert Gastroenterologist providing cutting-edge management for acid peptic disease, hepatitis B and C, fatty liver disease, irritable bowel syndrome (IBS), and chronic digestive ailments at Ali Welfare Trust Hospital.",
    qualification: "MBBS, FCPS (Gastroenterology & Hepatology), Member of Pakistan Society of Gastroenterology",
    experience: "Senior Specialist in Digestive Disorders, Liver Diseases & Endoscopy",
    days: ["Sunday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Acid Peptic Disease & Gastric Ulcers",
      "Hepatitis B & C Management",
      "Fatty Liver & Cirrhosis Protocols",
      "Irritable Bowel Syndrome & Colon Health"
    ],
    isAvailableToday: true,
    avatarType: "gastro"
  },
  {
    id: "dr-ali-raza",
    name: "Dr. Ali Raza",
    specialty: "General Surgeon",
    designation: "Consultant General Surgeon & Emergency Specialist",
    departmentId: "emergency",
    departmentName: "Emergency & Surgical Care",
    consultationDays: "Monday to Saturday",
    timing: "02:00 pm to 07:00pm",
    rating: "5.0",
    ratingText: "Rated 5 out of 5",
    profile: "Dr. Ali Raza is an experienced General Surgeon delivering operative evaluations, surgical interventions for abdominal emergencies, hernia repairs, diabetic foot salvage, wound debridement, and comprehensive post-operative inpatient care at Ali Welfare Trust Hospital.",
    qualification: "MBBS, FCPS (General Surgery), Certified in Laparoscopic Surgery",
    experience: "Consultant General Surgeon with High Operative Precision & Trauma Expertise",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    imageUrl: "/images/doctor-male-scrubs.jpg",
    specialties: [
      "Hernia & Abdominal Wall Repairs",
      "Diabetic Foot Management & Salvage",
      "Acute Surgical Emergencies",
      "Post-Operative Recovery Protocols"
    ],
    isAvailableToday: true,
    avatarType: "surgeon"
  }
];

export const DONATION_CAUSES: DonationCause[] = [
  {
    id: "dialysis-session",
    title: "Sponsor a Dialysis Session",
    urduTitle: "ایک مریض کا ڈائلیسز سیشن سپانسر کریں",
    description: "Provide a life-saving hemodialysis session including dialyzer, heparin, saline, and specialist nursing for a poor renal patient.",
    suggestedAmount: 4500,
    impactNote: "1 dialysis session extends a kidney patient's life by 3 to 4 days.",
    badge: "Urgent Need"
  },
  {
    id: "cataract-surgery",
    title: "Free Eye Cataract Surgery (Phaco)",
    urduTitle: "آنکھوں کا موتیابند آپریشن (فیکو)",
    description: "Restore sight for an elderly grandmother or grandfather with stitchless phacoemulsification and imported intraocular lens.",
    suggestedAmount: 18000,
    impactNote: "Restores clear eyesight and independence for life.",
    badge: "High Impact"
  },
  {
    id: "medicine-fund",
    title: "Patient Free Medicine Fund",
    urduTitle: "غریب مریضوں کی مفت ادویات کا فنڈ",
    description: "Support monthly life-saving heart, diabetes, and antibiotic treatments for patients who cannot afford pharmacy bills.",
    suggestedAmount: 2500,
    impactNote: "Supplies essential prescription medicines for an entire month.",
    badge: "Everyday Support"
  },
  {
    id: "emergency-ambulance",
    title: "24/7 Emergency & Ambulance Fund",
    urduTitle: "ایمرجنسی و ایمبولینس سروس فنڈ",
    description: "Fund life-saving oxygen cylinders, emergency trauma resuscitation kits, and rapid rural patient transfers.",
    suggestedAmount: 8000,
    impactNote: "Keeps rapid response ambulances fueled and ready 24/7.",
    badge: "Critical"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Official Hospital Compound & Gate",
    category: "exterior",
    imageUrl: "/images/hospital-building.jpg",
    description: "Official hospital compound entrance with blue Urdu calligraphy signboard and security gate welcoming patients 24/7."
  },
  {
    id: "gal-2",
    title: "Aerial View of Hospital Campus",
    category: "campus",
    imageUrl: "/images/hospital-aerial.jpg",
    description: "Elevated aerial drone photograph showing the multi-story hospital complex, open courtyard, and motorcycle/ambulance parking."
  },
  {
    id: "gal-3",
    title: "Central Reception & Diagnostic Lab",
    category: "facilities",
    imageUrl: "/images/hospital-interior-1.jpg",
    description: "Ali Welfare Diagnostic Laboratory registration, computerized reporting counter, and spacious waiting hall."
  },
  {
    id: "gal-4",
    title: "Specialist OPD Consultation Chambers",
    category: "facilities",
    imageUrl: "/images/hospital-interior-2.jpg",
    description: "Senior physicians and surgeons examining and advising patients with modern diagnostic tools."
  },
  {
    id: "gal-5",
    title: "Inpatient General Medical Ward",
    category: "wards",
    imageUrl: "/images/hospital-interior-3.jpg",
    description: "Spacious, hygienic, air-conditioned patient recovery wards maintained with strict medical hygiene standards."
  },
  {
    id: "gal-6",
    title: "Sterile Procedure & Dialysis Suite",
    category: "wards",
    imageUrl: "/images/gallery-2.jpg",
    description: "Dedicated eye surgical beds and German hemodialysis stations equipped with sterile clinical privacy curtains and lighting."
  }
];

export const STATS = [
  { value: "20+", label: "Years of Service", sub: "Founded in 2005", icon: "Clock" },
  { value: "450,000+", label: "Patients Treated", sub: "Compassionate care", icon: "Users" },
  { value: "100%", label: "Free Dialysis & Aid", sub: "For registered needy", icon: "HeartHandshake" },
  { value: "24/7", label: "Emergency Readiness", sub: "Open every single day", icon: "ShieldAlert" },
  { value: "9+", label: "Specialist Departments", sub: "Under one single roof", icon: "Activity" }
];
