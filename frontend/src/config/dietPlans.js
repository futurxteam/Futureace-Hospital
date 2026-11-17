/**
 * config/dietPlans.js
 *
 * Centralized Diet Plan Configuration for FutureAce Hospital.
 * Maps age and sex groups to structured dietary guidelines tailored for South Asian / Indian adults.
 *
 * Groups:
 * 1. under30Male   (18–29, Male)
 * 2. under30Female (18–29, Female)
 * 3. age30To50Male (30–50, Male)
 * 4. age30To50Female (30–50, Female)
 * 5. over50Male    (51+, Male)
 * 6. over50Female  (51+, Female)
 *
 * NOTE ON CLINICAL SOURCE PLANS:
 * As specified in project requirements, all 6 distinct demographic groups are configured with
 * distinct nutritional emphasis, structured meal schedules, and conservative dietary filters.
 * Each configuration is marked with clinical dietitian review metadata for FutureAce Hospital's
 * clinical nutrition department to verify before individualized medical prescription.
 */

export const dietPlans = {
  under30Male: {
    id: 'under30Male',
    label: 'Under 30 — Male',
    ageMin: 18,
    ageMax: 29,
    sex: 'male',
    title: 'Personalized Wellness & Active Metabolic Plan',
    subtitle: 'High-energy, protein-supported nutrition for young adult males',
    focus: 'Lean muscle preservation, sustained workday energy, and metabolic resilience',
    clinicalReviewStatus: 'Pending Clinical Dietitian Review',
    clinicalReviewRequired: true,
    nutritionalEmphasis: [
      'Adequate protein intake from whole food sources (pulses, sprouts, dairy, eggs, or lean meat)',
      'Complex carbohydrates for sustained glycogen replenishment and focus',
      'Hydration target: 2.5 – 3.5 litres of water daily',
      'Minimization of ultra-processed snacks, refined flours, and sugary beverages',
    ],
    meals: [
      {
        mealType: 'Breakfast',
        timeWindow: '7:30 AM – 8:30 AM',
        targetEnergy: 'Energy & Protein Foundation',
        guideline: 'Start your day with balanced complex carbs and protein to prevent mid-morning energy dips.',
        options: [
          {
            name: 'Vegetable Oats Upma with Sprouted Moong',
            portion: '1 medium bowl (250g) + 1/2 cup steamed sprouts',
            preference: 'vegetarian',
            allergens: ['legumes'],
            description: 'Rolled oats tempered with mustard seeds, curry leaves, ginger, carrots, and beans, topped with steamed sprouted green gram.',
          },
          {
            name: 'Steamed Idlis with Sambar & Coconut Mint Chutney + 2 Boiled Egg Whites',
            portion: '3 idlis + 1 cup vegetable sambar + 2 boiled egg whites',
            preference: 'eggetarian',
            allergens: ['legumes'],
            description: 'Fermented rice-lentil idlis providing prebiotic support, paired with nutrient-dense vegetable sambar and lean egg whites.',
          },
          {
            name: 'Vegetable Poha with Roasted Peanuts & Lemon + Boiled Eggs / Tofu',
            portion: '1 medium plate (200g) + 2 boiled eggs (or 80g pan-seared tofu)',
            preference: 'non_vegetarian',
            allergens: [],
            description: 'Flattened rice tossed with onions, green chillies, turmeric, curry leaves, fresh coriander, and lemon juice.',
          },
          {
            name: 'Sprouted Moong & Vegetable Cheela with Mint Chutney',
            portion: '2 medium cheelas + 2 tbsp fresh coriander mint chutney',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Savory crepes made from ground whole green moong, spinach, grated carrots, and mild Indian spices.',
          },
        ],
      },
      {
        mealType: 'Mid-Morning Snack',
        timeWindow: '10:30 AM – 11:30 AM',
        targetEnergy: 'Micronutrients & Hydration',
        guideline: 'Rehydrate and replenish vital electrolytes without spiking insulin.',
        options: [
          {
            name: 'Fresh Seasonal Fruit Bowl + Soaked Almonds & Walnuts',
            portion: '1 cup mixed papaya / apple / pomegranate + 5 almonds & 2 walnut halves',
            preference: 'all',
            allergens: ['nuts'],
            description: 'Rich in dietary fibre, vitamin C, polyphenols, and healthy omega-3 fatty acids.',
          },
          {
            name: 'Tender Coconut Water with Chia Seeds',
            portion: '1 whole coconut water (approx. 250ml) + 1 tsp soaked chia seeds',
            preference: 'all',
            allergens: [],
            description: 'Natural potassium and electrolyte replenishment supporting cellular hydration.',
          },
        ],
      },
      {
        mealType: 'Lunch',
        timeWindow: '1:00 PM – 2:00 PM',
        targetEnergy: 'Balanced Core Meal',
        guideline: 'Prioritize a 50% vegetable, 25% whole grain, and 25% protein plate distribution.',
        options: [
          {
            name: 'Brown Rice / Multigrain Phulkas with Dal Tadka, Seasonal Sabzi & Spiced Buttermilk',
            portion: '2 phulkas or 1 cup brown rice + 1 cup yellow moong/toor dal + 1 cup bhindi/beans sabzi + 1 glass chaas',
            preference: 'vegetarian',
            allergens: ['dairy', 'gluten', 'legumes'],
            description: 'Nutrient-rich balanced Indian lunch with dietary fibre, gut-friendly probiotics, and plant protein.',
          },
          {
            name: 'Phulkas with Grilled Skinless Chicken Breast / Kerala Fish Curry & Green Salad',
            portion: '2 phulkas + 120g grilled chicken breast or steamed fish curry + 1 cup mixed cucumber-tomato salad',
            preference: 'non_vegetarian',
            allergens: ['gluten', 'seafood'],
            description: 'High-protein, moderate-carb plate promoting lean tissue recovery and long-lasting satiety.',
          },
          {
            name: 'Egg Bhurji / Curry with Multigrain Rotis, Cucumber Kachumber & Steamed Veggies',
            portion: '2 whole-wheat rotis + 2 egg bhurji (with tomatoes & capsicum) + 1 cup fresh salad',
            preference: 'eggetarian',
            allergens: ['gluten'],
            description: 'Wholesome source of choline, high-biological-value protein, and essential B vitamins.',
          },
          {
            name: 'Brown Rice with Rajma / Chickpea Curry, Sautéed Greens & Lemon Salad',
            portion: '1 cup brown rice + 1 cup boiled rajma/chole curry + 1 cup sautéed spinach/beans + lemon wedge',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Classic legume and whole-grain combination delivering complete amino acid profiles.',
          },
        ],
      },
      {
        mealType: 'Evening Snack',
        timeWindow: '4:30 PM – 5:30 PM',
        targetEnergy: 'Metabolic Energy Bridging',
        guideline: 'Choose light, fibre-rich options to prevent overeating at dinner.',
        options: [
          {
            name: 'Roasted Makhana (Foxnuts) with Turmeric & Black Pepper + Green Tea',
            portion: '1 small bowl (30g) + 1 cup unsweetened green tea',
            preference: 'all',
            allergens: [],
            description: 'Low-glycemic index snack high in magnesium and antioxidants, seasoned with anti-inflammatory turmeric.',
          },
          {
            name: 'Boiled Kala Chana (Black Chickpea) Chaat with Chopped Cucumber & Lemon',
            portion: '1 small bowl (100g)',
            preference: 'all',
            allergens: ['legumes'],
            description: 'High-fibre satiety snack providing steady sustained glucose release.',
          },
        ],
      },
      {
        mealType: 'Dinner',
        timeWindow: '7:30 PM – 8:30 PM',
        targetEnergy: 'Light Restorative Meal',
        guideline: 'Keep dinner light, easily digestible, and completed at least 2–3 hours before sleep.',
        options: [
          {
            name: 'Vegetable Clear Soup + Paneer Tikka / Sautéed Tofu with Stir-Fried Vegetables',
            portion: '1 bowl warm soup + 100g paneer/tofu + 1 cup broccoli, bell peppers & zucchini',
            preference: 'vegetarian',
            allergens: ['dairy'],
            description: 'Low-carbohydrate, restorative evening meal allowing optimal nocturnal digestive rest.',
          },
          {
            name: 'Herb-Grilled Fish or Chicken with Steamed Seasonal Vegetables & 1 Small Phulka',
            portion: '120g grilled fish/chicken + 1 cup steamed carrots, beans & broccoli + 1 phulka',
            preference: 'non_vegetarian',
            allergens: ['gluten', 'seafood'],
            description: 'Lean protein paired with vibrant micronutrients and minimal starch for nocturnal metabolic repair.',
          },
          {
            name: 'Vegetable Egg Scramble with 1 Multigrain Roti & Tomato-Basil Soup',
            portion: '2 egg whites + 1 whole egg scrambled + 1 roti + 1 bowl soup',
            preference: 'eggetarian',
            allergens: ['gluten'],
            description: 'Comforting, easily assimilated protein combined with warming lycopene-rich tomato soup.',
          },
          {
            name: 'Yellow Moong Dal Khichdi with Steamed Vegetables & Roasted Papad',
            portion: '1 cup khichdi (1:2 ratio dal to brown rice) + 1 cup mixed steamed vegetables',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Ultra-gentle digestive dinner especially suited for stressful or physically taxing days.',
          },
        ],
      },
    ],
    dietaryNotes: [
      'Focus on steady meal timings to maintain cortisol and insulin balance.',
      'Incorporate at least 20–25 minutes of daily resistance or aerobic physical activity.',
      'Limit late-night snacking and caffeinated drinks after 6:00 PM.',
    ],
    disclaimer: 'This plan provides general wellness nutritional guidance for young adult males. It must be reviewed by a clinical dietitian for individualized caloric and macronutrient targets.',
  },

  under30Female: {
    id: 'under30Female',
    label: 'Under 30 — Female',
    ageMin: 18,
    ageMax: 29,
    sex: 'female',
    title: 'Personalized Hormonal & Metabolic Balance Plan',
    subtitle: 'Nutrient-dense, iron- and folate-conscious dietary framework for young adult women',
    focus: 'Hormonal equilibrium, iron stores, bone density foundations, and digestive wellness',
    clinicalReviewStatus: 'Pending Clinical Dietitian Review',
    clinicalReviewRequired: true,
    nutritionalEmphasis: [
      'Iron-rich whole foods (greens, beetroot, seeds) paired with Vitamin C for optimal bioavailability',
      'Bioavailable calcium and magnesium to support bone mineral accumulation and neuromuscular health',
      'Healthy essential fatty acids (flaxseeds, chia, nuts) for endocrine and menstrual harmony',
      'Complex carbohydrates with a low glycemic load to maintain steady insulin sensitivity',
    ],
    meals: [
      {
        mealType: 'Breakfast',
        timeWindow: '7:30 AM – 8:30 AM',
        targetEnergy: 'Endocrine & Metabolic Kickstart',
        guideline: 'Combine complex carbohydrates with quality protein to sustain stable blood sugar levels.',
        options: [
          {
            name: 'Methi (Fenugreek) Thepla with Fresh Curd & Mint Coriander Chutney',
            portion: '2 small theplas + 1/2 cup low-fat curd + 2 tbsp chutney',
            preference: 'vegetarian',
            allergens: ['dairy', 'gluten'],
            description: 'Iron-rich fenugreek leaves combined with gut-friendly probiotic yogurt for smooth digestion.',
          },
          {
            name: 'Ragi (Finger Millet) Idlis with Moringa Sambar & Boiled Egg',
            portion: '2-3 ragi idlis + 1 cup drumstick sambar + 1 boiled egg',
            preference: 'eggetarian',
            allergens: ['legumes'],
            description: 'Calcium-packed finger millet paired with iron-rich drumstick sambar and high-quality protein.',
          },
          {
            name: 'Vegetable Oats Porridge with Boiled Egg Whites & Soaked Pumpkin Seeds',
            portion: '1 bowl vegetable savory oats + 2 boiled egg whites + 1 tsp pumpkin seeds',
            preference: 'non_vegetarian',
            allergens: ['nuts'],
            description: 'Beta-glucan rich oats with zinc-rich pumpkin seeds to nourish skin and hormone production.',
          },
          {
            name: 'Besan (Gram Flour) & Spinach Cheela with Tomato-Mint Chutney',
            portion: '2 medium cheelas + 2 tbsp fresh homemade chutney',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Naturally gluten-free, protein-dense chickpea flour crepes infused with fresh iron-packed spinach.',
          },
        ],
      },
      {
        mealType: 'Mid-Morning Snack',
        timeWindow: '10:30 AM – 11:30 AM',
        targetEnergy: 'Antioxidants & Seed Synergy',
        guideline: 'Incorporate Vitamin C-rich fruits to maximize dietary iron absorption.',
        options: [
          {
            name: 'Pomegranate & Guava Bowl with Soaked Chia & Pumpkin Seeds',
            portion: '1 small bowl (150g) + 1 tsp mixed seeds',
            preference: 'all',
            allergens: [],
            description: 'Vibrant antioxidants, dietary fibre, and zinc for cellular defense and metabolic support.',
          },
          {
            name: 'Fresh Coconut Water with Lemon & Mint',
            portion: '1 glass (250ml)',
            preference: 'all',
            allergens: [],
            description: 'Cooling natural electrolyte drink aiding kidney filtration and hydration.',
          },
        ],
      },
      {
        mealType: 'Lunch',
        timeWindow: '1:00 PM – 2:00 PM',
        targetEnergy: 'Wholesome Micronutrient Core',
        guideline: 'Ensure generous green leafy vegetables and balanced pulses or lean proteins.',
        options: [
          {
            name: 'Red Matta / Brown Rice with Palak Dal, Beetroot Poriyal & Spiced Chaas',
            portion: '3/4 cup cooked rice + 1 cup spinach dal + 1 cup beetroot thoran/poriyal + 1 glass buttermilk',
            preference: 'vegetarian',
            allergens: ['dairy', 'legumes'],
            description: 'Rich in iron, betalains, and dietary fibre supporting hepatic and vascular wellness.',
          },
          {
            name: 'Steamed Fish Curry (Kerala Style) with Jowar Roti & Cucumber Salad',
            portion: '1-2 small jowar rotis + 120g fresh fish in mild coconut-kokum gravy + 1 cup cucumber kachumber',
            preference: 'non_vegetarian',
            allergens: ['seafood'],
            description: 'Anti-inflammatory omega-3 fatty acids from fish combined with gluten-free, high-fibre jowar.',
          },
          {
            name: 'Boiled Egg Curry with Multigrain Phulkas & Steamed French Beans',
            portion: '2 phulkas + 2 eggs in light onion-tomato gravy + 1 cup sautéed beans & carrots',
            preference: 'eggetarian',
            allergens: ['gluten'],
            description: 'Balanced amino acids and dietary fibre helping curb mid-afternoon sugar cravings.',
          },
          {
            name: 'Brown Rice with Soya Chunk & Pea Curry, Raw Carrot-Cucumber Salad',
            portion: '3/4 cup brown rice + 1 cup soya-pea curry + 1 cup fresh vegetable salad with lemon',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Plant-based complete protein with bioflavonoids and antioxidant-rich root vegetables.',
          },
        ],
      },
      {
        mealType: 'Evening Snack',
        timeWindow: '4:30 PM – 5:30 PM',
        targetEnergy: 'Gentle Energy & Satiety',
        guideline: 'Calm the nervous system with herbal infusions and light, crunchy fibre.',
        options: [
          {
            name: 'Sprouted Green Gram Sundal with Grated Coconut & Chamomile Tea',
            portion: '1 small bowl (100g) + 1 cup herbal tea',
            preference: 'all',
            allergens: ['legumes'],
            description: 'Enzyme-rich sprouted legume snack seasoned with mustard, curry leaves, and lemon juice.',
          },
          {
            name: 'Roasted Lotus Seeds (Makhana) with Sea Salt & Cinnamon Herbal Infusion',
            portion: '1 medium cup (30g) + 1 cup warm infusion',
            preference: 'all',
            allergens: [],
            description: 'Light, crunchy snack high in calming magnesium and low in sodium.',
          },
        ],
      },
      {
        mealType: 'Dinner',
        timeWindow: '7:30 PM – 8:30 PM',
        targetEnergy: 'Nourishing & Soothing Supper',
        guideline: 'Opt for anti-inflammatory, warm, easily assimilable preparations.',
        options: [
          {
            name: 'Bottle Gourd (Lauki) & Moong Dal Soup with 1 Soft Phulka & Steamed Veggies',
            portion: '1 large bowl warm dal-lauki soup + 1 phulka + 1/2 cup steamed beans & carrots',
            preference: 'vegetarian',
            allergens: ['gluten', 'legumes'],
            description: 'Hydrating, alkaline, and gentle on digestion, preventing overnight reflux and bloating.',
          },
          {
            name: 'Grilled Fish or Chicken Tikka with Warm Vegetable Broth & Tossed Salad',
            portion: '100g grilled fish/chicken + 1 bowl vegetable broth + 1 cup shredded cabbage-cucumber salad',
            preference: 'non_vegetarian',
            allergens: ['seafood'],
            description: 'Light, carb-conscious supper encouraging uninterrupted sleep and muscle recovery.',
          },
          {
            name: 'Mushroom & Egg White Scramble with Steamed Vegetables & 1 Multigrain Toast',
            portion: '2 egg whites scrambled with button mushrooms & spinach + 1 toast',
            preference: 'eggetarian',
            allergens: ['gluten'],
            description: 'Low-calorie, selenium- and protein-rich dinner with zero post-meal heaviness.',
          },
          {
            name: 'Yellow Pumpkin & Lentil Stew with Steamed Foxtail Millet or 1 Jowar Roti',
            portion: '1 cup rich pumpkin-lentil stew + 1/2 cup cooked foxtail millet (or 1 small jowar roti)',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Carotenoid-rich, naturally gluten-free evening nourishment with soothing dietary fibre.',
          },
        ],
      },
    ],
    dietaryNotes: [
      'Ensure adequate daily sun exposure or vitamin D3 evaluation under medical advice.',
      'Maintain adequate hydration (2.5+ litres) to support skin health and lymphatic circulation.',
      'Limit high-salt pickles and processed foods, especially in the week prior to menstruation.',
    ],
    disclaimer: 'This plan provides general lifestyle and wellness nutritional guidance for young adult women. It must be reviewed by a clinical dietitian for individualized medical conditions such as PCOS or thyroid management.',
  },

  age30To50Male: {
    id: 'age30To50Male',
    label: '30–50 — Male',
    ageMin: 30,
    ageMax: 50,
    sex: 'male',
    title: 'Personalized Cardiometabolic & Vitality Plan',
    subtitle: 'Heart-healthy, glycemic-controlled nutrition for adult men in peak productivity years',
    focus: 'Cardiovascular protection, visceral fat control, blood pressure moderation, and steady energy',
    clinicalReviewStatus: 'Pending Clinical Dietitian Review',
    clinicalReviewRequired: true,
    nutritionalEmphasis: [
      'High soluble and insoluble fibre to support healthy lipid profiles (HDL/LDL/triglycerides)',
      'Sodium moderation (< 2000mg/day) to safeguard vascular compliance and arterial health',
      'Portion-controlled low-glycemic carbohydrates to prevent postprandial insulin spikes',
      'Anti-inflammatory polyphenols from leafy greens, tomatoes, turmeric, and garlic',
    ],
    meals: [
      {
        mealType: 'Breakfast',
        timeWindow: '7:30 AM – 8:30 AM',
        targetEnergy: 'Cardioprotective Morning Fuel',
        guideline: 'Fuel your morning with soluble beta-glucans and lean proteins to stabilize morning fasting glucose.',
        options: [
          {
            name: 'Steel-Cut Oats Porridge with Flaxseed Powder & Cinnamon + Walnuts',
            portion: '1 bowl savory/mild oats (250g) + 1 tbsp ground flaxseeds + 4 walnut halves',
            preference: 'vegetarian',
            allergens: ['nuts'],
            description: 'Clinically recognized soluble fibre to bind cholesterol and support arterial endothelium.',
          },
          {
            name: 'Vegetable Upma with Sautéed Moong Sprouts + 2 Boiled Egg Whites',
            portion: '1 medium bowl broken wheat/suji upma with vegetables + 2 egg whites',
            preference: 'eggetarian',
            allergens: ['gluten', 'legumes'],
            description: 'Satisfying whole-grain breakfast with lean protein to maintain satiety across busy work hours.',
          },
          {
            name: 'Vegetable Egg Omelette (1 Whole + 1 White) with 1 Whole Wheat Toast & Tomato Chutney',
            portion: '2-egg omelette with onions, tomatoes & capsicum + 1 slice whole wheat toast',
            preference: 'non_vegetarian',
            allergens: ['gluten'],
            description: 'Low-carbohydrate breakfast rich in carotenoids and bioavailable protein.',
          },
          {
            name: 'Mixed Dal & Palak Cheela with Mint Chutney & Soaked Almonds',
            portion: '2 medium cheelas + 2 tbsp mint chutney + 5 soaked almonds',
            preference: 'vegan',
            allergens: ['legumes', 'nuts'],
            description: 'High-protein vegan breakfast prepared from soaked split lentils and fresh greens.',
          },
        ],
      },
      {
        mealType: 'Mid-Morning Snack',
        timeWindow: '10:30 AM – 11:30 AM',
        targetEnergy: 'Metabolic & Vascular Refresh',
        guideline: 'Select antioxidant-rich snacks that assist endothelial nitric oxide production.',
        options: [
          {
            name: 'Fresh Crisp Apple or Pear Slices + Green Tea',
            portion: '1 medium fruit with skin + 1 cup freshly brewed green tea',
            preference: 'all',
            allergens: [],
            description: 'Quercetin and EGCG catechins work synergistically to counter oxidative stress.',
          },
          {
            name: 'Spiced Buttermilk (Sambharam) with Crushed Ginger, Curry Leaves & Hing',
            portion: '1 large glass (250ml)',
            preference: 'vegetarian',
            allergens: ['dairy'],
            description: 'Traditional digestive coolant providing live probiotics without heavy fat or sugar.',
          },
        ],
      },
      {
        mealType: 'Lunch',
        timeWindow: '1:00 PM – 2:00 PM',
        targetEnergy: 'Cardiometabolic Defence Plate',
        guideline: 'Enforce the half-plate non-starchy vegetable rule; limit gravies prepared with refined oils.',
        options: [
          {
            name: 'Multigrain Phulkas with Yellow Tadka Dal, Kundru/Bhindi Sabzi & Raw Salad',
            portion: '2 phulkas + 1 cup moong/masoor dal + 1 cup dry-cooked sabzi + 1 plate cucumber-radish salad',
            preference: 'vegetarian',
            allergens: ['gluten', 'legumes'],
            description: 'High dietary fibre, low saturated fat, and rich potassium supporting healthy vascular tone.',
          },
          {
            name: 'Herb-Grilled Skinless Chicken or Steamed Sardines / Mackerel with 1 Roti & Salad',
            portion: '120g grilled chicken/fatty fish + 1 multigrain roti + generous fresh garden salad',
            preference: 'non_vegetarian',
            allergens: ['gluten', 'seafood'],
            description: 'Rich in EPA/DHA marine omega-3s which contribute to optimal triglyceride levels.',
          },
          {
            name: 'Egg Curry (Light Onion-Tomato Base) with Brown Rice & Sautéed Cabbage',
            portion: '2 hard-boiled eggs in light gravy + 3/4 cup brown rice + 1 cup cabbage-carrot thoran',
            preference: 'eggetarian',
            allergens: [],
            description: 'High satiety, balanced glycemic index, and essential microelements.',
          },
          {
            name: 'Brown Rice with Black-Eyed Peas (Lobia) Curry & Steamed Broccoli-Carrots',
            portion: '3/4 cup brown rice + 1 cup lobia curry + 1 cup steamed mixed vegetables with lemon',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Plant-powered soluble fibre and resistant starch nourishing the colonic microbiome.',
          },
        ],
      },
      {
        mealType: 'Evening Snack',
        timeWindow: '4:30 PM – 5:30 PM',
        targetEnergy: 'Stress & Craving Buffer',
        guideline: 'Prevent office vending-machine temptations with pre-portioned roasted whole seeds.',
        options: [
          {
            name: 'Roasted Chana (Bengal Gram) with Chopped Onion, Tomato & Lemon',
            portion: '1 small bowl (40g)',
            preference: 'all',
            allergens: ['legumes'],
            description: 'Crunchy, complex carbohydrate and protein snack with high satiety and virtually zero fat.',
          },
          {
            name: 'Roasted Pumpkin & Sunflower Seeds with Ginger Tea',
            portion: '1.5 tbsp mixed seeds + 1 cup unsweetened ginger tea',
            preference: 'all',
            allergens: [],
            description: 'Magnesium and zinc power pack supporting immune health and blood vessel relaxation.',
          },
        ],
      },
      {
        mealType: 'Dinner',
        timeWindow: '7:30 PM – 8:30 PM',
        targetEnergy: 'Light Digestive Recovery',
        guideline: 'Avoid heavy creams, deep-fried snacks, and large starch portions at night.',
        options: [
          {
            name: 'Warm Mixed Vegetable Soup + Grilled Paneer/Tofu with Steamed Vegetables',
            portion: '1 bowl soup + 100g paneer/tofu + 1 cup sautéed zucchini, bell peppers & beans',
            preference: 'vegetarian',
            allergens: ['dairy'],
            description: 'Minimizes overnight hepatic fat deposition and maintains nighttime normoglycemia.',
          },
          {
            name: 'Pan-Seared Fish Fillet / Lemon Chicken with Vegetable Clear Soup & 1 Small Phulka',
            portion: '120g fish/chicken + 1 bowl broth + 1 small phulka',
            preference: 'non_vegetarian',
            allergens: ['gluten', 'seafood'],
            description: 'Clean lean protein and mineral broth supporting metabolic recovery without GI distress.',
          },
          {
            name: 'Egg White Frittata with Spinach & Mushrooms + 1 Bowl Tomato Soup',
            portion: '3 egg whites whisked with spinach, onions & herbs + 1 bowl soup',
            preference: 'eggetarian',
            allergens: [],
            description: 'Ultra-light dinner promoting restful sleep without midnight gastric regurgitation.',
          },
          {
            name: 'Moong Dal & Vegetable Khichdi (Low Oil) with Cucumber Salad & Roasted Papad',
            portion: '1 cup khichdi + 1 bowl cucumber slices + 1 roasted papad',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Gentle Ayurvedic staple providing effortless nocturnal digestion and peaceful sleep.',
          },
        ],
      },
    ],
    dietaryNotes: [
      'Monitor resting blood pressure and lipid profile annually.',
      'Aim for at least 150 minutes of moderate-intensity aerobic exercise (e.g. brisk walking) weekly.',
      'Keep alcohol intake minimal or absent; completely avoid smoking and tobacco products.',
    ],
    disclaimer: 'This plan provides general cardiometabolic lifestyle guidance for adult men. It is not an individualized prescription for hypertension or dyslipidemia; consultation with a physician is recommended.',
  },

  age30To50Female: {
    id: 'age30To50Female',
    label: '30–50 — Female',
    ageMin: 30,
    ageMax: 50,
    sex: 'female',
    title: 'Personalized Metabolic & Endocrine Wellness Plan',
    subtitle: 'Thyroid-friendly, bone-supportive, and blood-sugar balancing framework for adult women',
    focus: 'Bone mineral conservation, insulin sensitivity, thyroid cofactor sufficiency, and digestive ease',
    clinicalReviewStatus: 'Pending Clinical Dietitian Review',
    clinicalReviewRequired: true,
    nutritionalEmphasis: [
      'Synergistic calcium, magnesium, and vitamin D sources to maintain pre-/perimenopausal bone mass',
      'Low-glycemic complex carbohydrates to minimize central visceral adiposity and insulin resistance',
      'Prebiotic and probiotic foods (buttermilk, fermented batters) to nurture gut-barrier integrity',
      'Phytoestrogen-rich choices (flaxseeds, legumes) and selenium/zinc for thyroid balance',
    ],
    meals: [
      {
        mealType: 'Breakfast',
        timeWindow: '7:30 AM – 8:30 AM',
        targetEnergy: 'Nourishing Hormonal Support',
        guideline: 'Begin with warm, cooked whole foods that stabilize morning blood sugar.',
        options: [
          {
            name: 'Ragi (Finger Millet) & Vegetable Dosa with Coconut Mint Chutney & Boiled Egg',
            portion: '2 small ragi dosas + 2 tbsp chutney + 1 boiled egg',
            preference: 'eggetarian',
            allergens: ['legumes'],
            description: 'Exceptional calcium density from ragi combined with egg protein for steady energy.',
          },
          {
            name: 'Broken Wheat (Dahlia) Vegetable Porridge with Sprouted Moong',
            portion: '1 bowl vegetable dahlia (250g) + 1/2 cup steamed sprouts',
            preference: 'vegetarian',
            allergens: ['gluten', 'legumes'],
            description: 'Slow-digesting fibre and B vitamins aiding mental clarity and steady metabolic burn.',
          },
          {
            name: 'Spinach & Tomato Egg Scramble with 1 Multigrain Toast + Soaked Almonds',
            portion: '2 eggs (1 whole, 1 white) scrambled with spinach + 1 toast + 5 soaked almonds',
            preference: 'non_vegetarian',
            allergens: ['gluten', 'nuts'],
            description: 'Protein, lutein, and magnesium to sustain cognitive and physical stamina.',
          },
          {
            name: 'Oats & Flaxseed Cheela with Coriander Chutney & Tomato Wedges',
            portion: '2 medium cheelas + 2 tbsp fresh green chutney',
            preference: 'vegan',
            allergens: [],
            description: 'Soluble beta-glucans and plant lignans supporting hormonal and gut equilibrium.',
          },
        ],
      },
      {
        mealType: 'Mid-Morning Snack',
        timeWindow: '10:30 AM – 11:30 AM',
        targetEnergy: 'Antioxidants & Hydration',
        guideline: 'Support collagen synthesis and cellular defense with bioflavonoid-rich fruits.',
        options: [
          {
            name: 'Papaya or Guava Slices with 1 Tsp Roasted Pumpkin Seeds',
            portion: '1 small bowl (150g) + 1 tsp pumpkin seeds',
            preference: 'all',
            allergens: [],
            description: 'Enzyme papain aids digestion; zinc and vitamin C nourish dermal and vascular tissue.',
          },
          {
            name: 'Warm Cinnamon Herbal Infusion or Green Tea',
            portion: '1 cup freshly brewed (200ml)',
            preference: 'all',
            allergens: [],
            description: 'Natural polyphenols known to enhance cellular insulin sensitivity.',
          },
        ],
      },
      {
        mealType: 'Lunch',
        timeWindow: '1:00 PM – 2:00 PM',
        targetEnergy: 'Phyto-Nutrient Rich Core Meal',
        guideline: 'Pair low-glycemic whole grains with generous portions of dark green and colorful vegetables.',
        options: [
          {
            name: 'Jowar / Multigrain Phulkas with Palak Dal, Beetroot Thoran & Low-Fat Curd',
            portion: '2 phulkas + 1 cup spinach dal + 1 cup beetroot thoran + 1/2 cup curd',
            preference: 'vegetarian',
            allergens: ['dairy', 'gluten', 'legumes'],
            description: 'High-fibre, folate-dense, and calcium-abundant plate nourishing gut microbiota.',
          },
          {
            name: 'Kerala Fish Curry (Kudampuli) with Brown Rice & Stir-Fried Beans',
            portion: '3/4 cup brown rice + 120g fresh fish in garcinia cambogia-based curry + 1 cup beans sabzi',
            preference: 'non_vegetarian',
            allergens: ['seafood'],
            description: 'Anti-inflammatory omega-3 fatty acids paired with kudampuli (hydroxycitric acid source).',
          },
          {
            name: 'Boiled Egg Roast (Minimal Oil) with 2 Multigrain Rotis & Mixed Green Salad',
            portion: '2 eggs in onion-tomato roast + 2 rotis + 1 plate lettuce, cucumber & tomato salad',
            preference: 'eggetarian',
            allergens: ['gluten'],
            description: 'Balanced protein plate promoting long-lasting satiety and curbing evening fatigue.',
          },
          {
            name: 'Red Rice with Chana & Drumstick Sambar, Cabbage-Carrot Thoran & Lemon Wedge',
            portion: '3/4 cup cooked red rice + 1 cup moringa sambar + 1 cup vegetable thoran',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Anthocyanin-rich traditional red rice with drumstick leaves and pods rich in bioavailable calcium.',
          },
        ],
      },
      {
        mealType: 'Evening Snack',
        timeWindow: '4:30 PM – 5:30 PM',
        targetEnergy: 'Bone & Adrenal Refresh',
        guideline: 'Replenish magnesium and calm evening stress hormones.',
        options: [
          {
            name: 'Roasted Makhana with Turmeric & Himalayan Pink Salt + Chamomile Tea',
            portion: '1 small bowl (30g) + 1 cup herbal tea',
            preference: 'all',
            allergens: [],
            description: 'Satisfying low-calorie crunch rich in flavonoids and relaxing magnesium.',
          },
          {
            name: 'Sprouted Green Gram Sundal with Fresh Lemon Juice',
            portion: '1 small cup (80g)',
            preference: 'all',
            allergens: ['legumes'],
            description: 'Live digestive enzymes and amino acids without heavy starch.',
          },
        ],
      },
      {
        mealType: 'Dinner',
        timeWindow: '7:30 PM – 8:30 PM',
        targetEnergy: 'Gentle Nocturnal Restorative',
        guideline: 'Keep evening meals light and non-acidic to support restorative sleep.',
        options: [
          {
            name: 'Bottle Gourd (Lauki) & Moong Dal Soup + 1 Phulka with Sautéed Paneer/Tofu',
            portion: '1 bowl soup + 1 phulka + 80g paneer/tofu with bell peppers',
            preference: 'vegetarian',
            allergens: ['dairy', 'gluten', 'legumes'],
            description: 'Easy digestion with adequate nocturnal amino acids for tissue maintenance.',
          },
          {
            name: 'Grilled Fish or Chicken Breast with Steamed French Beans, Carrots & Clear Broth',
            portion: '100g grilled protein + 1 cup steamed vegetables + 1 cup broth',
            preference: 'non_vegetarian',
            allergens: ['seafood'],
            description: 'Clean protein with minimal carbs allowing peak overnight growth hormone release.',
          },
          {
            name: 'Mushroom & Spinach Egg White Omelette with 1 Small Multigrain Toast',
            portion: '2 egg whites + 1 slice toast + 1 cup clear vegetable broth',
            preference: 'eggetarian',
            allergens: ['gluten'],
            description: 'Low-calorie, highly digestible, and completely non-greasy evening option.',
          },
          {
            name: 'Yellow Moong Dal Khichdi with Steamed Zucchini & Roasted Jeera Papad',
            portion: '1 cup khichdi + 1 cup steamed vegetables + 1 papad',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Comforting, mild Ayurvedic evening supper ensuring smooth bowel movements the following morning.',
          },
        ],
      },
    ],
    dietaryNotes: [
      'Prioritize regular weight-bearing physical activity to stimulate bone remodeling.',
      'Check fasting thyroid profile (TSH, Free T4) and Vitamin D3 levels annually.',
      'Maintain mindful hydration; limit caffeine to before 2:00 PM to protect sleep architecture.',
    ],
    disclaimer: 'This plan provides general lifestyle and nutritional guidance for adult women aged 30–50. Specific conditions such as thyroid disorders or PCOS require tailored dietitian review.',
  },

  over50Male: {
    id: 'over50Male',
    label: 'Over 50 — Male',
    ageMin: 51,
    ageMax: null,
    sex: 'male',
    title: 'Personalized Healthy Aging & Vascular Longevity Plan',
    subtitle: 'Low-sodium, joint-conscious, and easily digestible nutrition for mature adult men',
    focus: 'Blood pressure moderation (DASH), cardiovascular endurance, joint comfort, and prostate health',
    clinicalReviewStatus: 'Pending Clinical Dietitian Review',
    clinicalReviewRequired: true,
    nutritionalEmphasis: [
      'Low sodium (< 1500–2000mg) and potassium-rich foods to preserve arterial compliance',
      'Easily digestible, high-biological-value protein to prevent sarcopenia (age-related muscle loss)',
      'Cooked, soft-textured foods supporting optimal enzyme breakdown and gastrointestinal motility',
      'Lycopene and zinc sources (cooked tomatoes, pumpkin seeds) for prostate and cellular health',
    ],
    meals: [
      {
        mealType: 'Breakfast',
        timeWindow: '8:00 AM – 9:00 AM',
        targetEnergy: 'Gentle Morning Vitality',
        guideline: 'Select soft, easily chewable, and warm foods that encourage smooth digestion.',
        options: [
          {
            name: 'Soft Steamed Idlis with Vegetable Sambar & Mint Coriander Chutney',
            portion: '2-3 soft idlis + 1 cup mild vegetable sambar + 2 tbsp fresh chutney',
            preference: 'vegetarian',
            allergens: ['legumes'],
            description: 'Fermented, easily digested, oil-free breakfast packed with gentle dietary fibre.',
          },
          {
            name: 'Warm Vegetable Oats Porridge with Boiled Egg White & Soaked Peeled Almonds',
            portion: '1 bowl savory oats with carrots & peas + 1-2 boiled egg whites + 4 soaked peeled almonds',
            preference: 'eggetarian',
            allergens: ['nuts'],
            description: 'Soft beta-glucan soluble fibre with easily absorbed protein and healthy fats.',
          },
          {
            name: 'Soft Scrambled Eggs with 1 Whole Wheat Toast & Warm Herbal Tea',
            portion: '2 egg whites + 1 yolk scrambled gently + 1 toast + 1 cup warm infusion',
            preference: 'non_vegetarian',
            allergens: ['gluten'],
            description: 'Bioavailable choline and lutein for brain and ocular health.',
          },
          {
            name: 'Soft Moong Dal & Spinach Cheela with Stewed Apple',
            portion: '2 small soft cheelas + 1/2 cup warm stewed cinnamon apple',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Gentle on teeth and stomach; pectin from stewed apple soothes the gastrointestinal tract.',
          },
        ],
      },
      {
        mealType: 'Mid-Morning Snack',
        timeWindow: '10:30 AM – 11:30 AM',
        targetEnergy: 'Hydration & Electrolytes',
        guideline: 'Stay well-hydrated without overloading fluids at once.',
        options: [
          {
            name: 'Soft Papaya Cubes with 1 Tsp Ground Flaxseeds',
            portion: '1 small cup (120g) + 1 tsp ground flaxseeds',
            preference: 'all',
            allergens: [],
            description: 'Natural digestive enzymes supporting regular bowel motility and vascular comfort.',
          },
          {
            name: 'Tender Coconut Water (or Warm Lemon Coriander Water)',
            portion: '1 glass (200ml)',
            preference: 'all',
            allergens: [],
            description: 'Natural potassium to support healthy blood pressure balance.',
          },
        ],
      },
      {
        mealType: 'Lunch',
        timeWindow: '12:30 PM – 1:30 PM',
        targetEnergy: 'Digestible Nourishing Core',
        guideline: 'Choose thoroughly cooked, soft vegetables and well-stewed pulses or tender fish.',
        options: [
          {
            name: 'Soft Cooked Rice or 2 Soft Phulkas with Yellow Moong Dal & Ash Gourd Thoran',
            portion: '1 cup soft rice or 2 soft phulkas + 1 cup moong dal + 1 cup steamed ash gourd (kumbalanga) + 1 glass thin buttermilk',
            preference: 'vegetarian',
            allergens: ['dairy', 'gluten', 'legumes'],
            description: 'Cooling, alkaline ash gourd supports renal filtration; moong dal is the gentlest pulse.',
          },
          {
            name: 'Steamed Fish Fillet (Mild Curry) with 1 Soft Roti & Boiled Vegetable Mash',
            portion: '100g steamed fish + 1 soft roti + 1 cup mashed carrots & potatoes with olive oil',
            preference: 'non_vegetarian',
            allergens: ['gluten', 'seafood'],
            description: 'Anti-inflammatory marine omega-3s with zero tough fibers, supporting joint and heart wellness.',
          },
          {
            name: 'Soft Egg Curry with White/Brown Rice & Steamed Snake Gourd (Padavalanga)',
            portion: '2 boiled eggs in mild gravy + 3/4 cup soft rice + 1 cup padavalanga thoran',
            preference: 'eggetarian',
            allergens: [],
            description: 'Comforting, easily digested meal high in hydration and lean protein.',
          },
          {
            name: 'Moong Dal & Vegetable Stew with Steamed Appam / Soft Jowar Roti',
            portion: '2 soft appams + 1 cup vegetable moong stew with light coconut milk',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Traditional Kerala combination that is naturally gluten-free and kind on digestion.',
          },
        ],
      },
      {
        mealType: 'Evening Snack',
        timeWindow: '4:00 PM – 5:00 PM',
        targetEnergy: 'Comfort & Digestif',
        guideline: 'A warm herbal drink with light roasted whole grains.',
        options: [
          {
            name: 'Roasted Makhana with Warm Cumin-Coriander Digestive Tea (Jeera Vellam)',
            portion: '1 small bowl (25g) + 1 cup warm cumin tea',
            preference: 'all',
            allergens: [],
            description: 'Helps relieve evening abdominal bloating and supports healthy fluid balance.',
          },
          {
            name: 'Warm Steamed Banana (Nendran) or Boiled Corn',
            portion: '1 small steamed banana or 1/2 cup sweet corn',
            preference: 'all',
            allergens: [],
            description: 'Nutritious carbohydrate with soothing soluble fibre for digestive ease.',
          },
        ],
      },
      {
        mealType: 'Dinner',
        timeWindow: '7:00 PM – 8:00 PM',
        targetEnergy: 'Early Light Supper',
        guideline: 'Complete dinner early (by 7:30 or 8:00 PM) to prevent acid reflux and sleep disturbances.',
        options: [
          {
            name: 'Soft Moong Dal Khichdi with Steamed Bottle Gourd & Roasted Papad',
            portion: '1 cup khichdi + 1 cup steamed lauki with cumin + 1 papad',
            preference: 'vegetarian',
            allergens: ['legumes'],
            description: 'The golden standard of gentle Indian evening meals; warm, grounding, and easy on the heart.',
          },
          {
            name: 'Clear Chicken / Fish Broth with Soft Steamed Vegetables & 1 Small Phulka',
            portion: '1 bowl nourishing broth + 80g tender chicken/fish + 1 soft phulka',
            preference: 'non_vegetarian',
            allergens: ['gluten', 'seafood'],
            description: 'High-collagen broth providing joint amino acids without overburdening the gastrointestinal tract.',
          },
          {
            name: 'Poached or Soft-Boiled Egg with Pumpkin Soup & 1 Slice Whole Wheat Bread',
            portion: '1 egg + 1 bowl pureed pumpkin soup + 1 bread slice',
            preference: 'eggetarian',
            allergens: ['gluten'],
            description: 'Gentle, comforting meal rich in beta-carotene and easily absorbed lutein.',
          },
          {
            name: 'Yellow Lentil & Vegetable Soup with 1 Soft Ragi / Jowar Chapati',
            portion: '1 large bowl lentil soup + 1 soft millet chapati',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Plant-based warmth with bioavailable minerals for undisturbed nighttime rest.',
          },
        ],
      },
    ],
    dietaryNotes: [
      'Maintain routine blood pressure and kidney function screenings.',
      'Engage in gentle daily movement such as morning walking or joint-mobility exercises.',
      'Do not consume large fluid volumes immediately before retiring to bed.',
    ],
    disclaimer: 'This plan provides general lifestyle and nutritional guidance for mature adult men. Patients with established cardiac, renal, or diabetic conditions must seek an individualized clinical dietitian consultation.',
  },

  over50Female: {
    id: 'over50Female',
    label: 'Over 50 — Female',
    ageMin: 51,
    ageMax: null,
    sex: 'female',
    title: 'Personalized Post-Menopausal & Bone Longevity Plan',
    subtitle: 'Calcium-dense, low-sodium, and gut-soothing dietary framework for mature women',
    focus: 'Bone mineral preservation, joint lubrication, cardiac wellness, and smooth bowel regularity',
    clinicalReviewStatus: 'Pending Clinical Dietitian Review',
    clinicalReviewRequired: true,
    nutritionalEmphasis: [
      'Bioavailable calcium (dairy, ragi, sesame, leafy greens) and Vitamin D cofactors for osteoclast balance',
      'High soluble fibre and hydrating fruits to prevent slow transit and chronic constipation',
      'Strict sodium moderation (< 1500mg) and potassium enhancement to support post-menopausal blood pressure',
      'Anti-inflammatory herbs (turmeric, ginger, cumin) to soothe joint inflammation and morning stiffness',
    ],
    meals: [
      {
        mealType: 'Breakfast',
        timeWindow: '8:00 AM – 9:00 AM',
        targetEnergy: 'Gentle Bone & Digestive Foundation',
        guideline: 'Start the day with warm, calcium-rich, and easily chewable staples.',
        options: [
          {
            name: 'Ragi (Finger Millet) Porridge with Warm Milk / Almond Milk & Crushed Walnuts',
            portion: '1 bowl ragi porridge (250ml) + 4 walnut halves + 1 pinch cardamom',
            preference: 'vegetarian',
            allergens: ['dairy', 'nuts'],
            description: 'Premier Indian calcium-dense grain combined with healthy brain-supporting fats.',
          },
          {
            name: 'Soft Idlis with Mild Vegetable Sambar & 1 Boiled Egg White',
            portion: '2 soft steamed idlis + 1 cup drumstick & pumpkin sambar + 1 egg white',
            preference: 'eggetarian',
            allergens: ['legumes'],
            description: 'Fermented gut-friendly breakfast paired with lean, easily absorbed protein.',
          },
          {
            name: 'Vegetable Oats Upma with Boiled Egg White & Soaked Almonds',
            portion: '1 bowl savory oats with carrots & beans + 1 egg white + 5 soaked peeled almonds',
            preference: 'non_vegetarian',
            allergens: ['nuts'],
            description: 'Smooth soluble fibre and vitamin E supporting arterial and skin comfort.',
          },
          {
            name: 'Soft Moong Dal Cheela with Stewed Prunes / Papaya',
            portion: '2 small soft cheelas + 3 stewed prunes or 1/2 cup fresh papaya',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Gentle on teeth, soothing for bowel regularity, and high in plant protein.',
          },
        ],
      },
      {
        mealType: 'Mid-Morning Snack',
        timeWindow: '10:30 AM – 11:30 AM',
        targetEnergy: 'Bowel Regularity & Bone Minerals',
        guideline: 'Consume soluble fibre and hydration to maintain smooth gastrointestinal transit.',
        options: [
          {
            name: 'Ripe Papaya Bowl with Soaked Chia Seeds',
            portion: '1 medium cup (150g) + 1 tsp soaked chia seeds',
            preference: 'all',
            allergens: [],
            description: 'Natural digestive enzymes (papain) prevent constipation and soothe mucous membranes.',
          },
          {
            name: 'Warm Cumin & Fennel Infusion (Jeera-Saunf Water)',
            portion: '1 cup warm infusion (200ml)',
            preference: 'all',
            allergens: [],
            description: 'Relieves intestinal gas, aids digestion, and promotes gentle fluid excretion.',
          },
        ],
      },
      {
        mealType: 'Lunch',
        timeWindow: '12:30 PM – 1:30 PM',
        targetEnergy: 'Osteo-Supportive Core Meal',
        guideline: 'Incorporate dark green leafy vegetables and easily digestible pulses or tender fish.',
        options: [
          {
            name: 'Soft Cooked Red Matta Rice or 2 Soft Phulkas with Moringa Dal & Carrot-Beans Thoran',
            portion: '1 cup soft rice or 2 phulkas + 1 cup drumstick dal + 1 cup thoran + 1/2 cup fresh homemade curd',
            preference: 'vegetarian',
            allergens: ['dairy', 'gluten', 'legumes'],
            description: 'Moringa (drumstick) is packed with calcium and vitamin C; probiotic curd supports the microbiome.',
          },
          {
            name: 'Steamed Sardines / Mackerel / Pomfret with Soft Jowar Roti & Cucumber Salad',
            portion: '100g steamed fish in mild turmeric curry + 1 soft jowar roti + 1 cup peeled cucumber salad',
            preference: 'non_vegetarian',
            allergens: ['seafood'],
            description: 'Crucial omega-3 fatty acids and natural vitamin D supporting joint lubrication and heart health.',
          },
          {
            name: 'Soft Boiled Egg Curry with White Rice, Steamed Bottle Gourd & Chaas',
            portion: '2 eggs in mild tomato-onion gravy + 3/4 cup soft rice + 1 cup lauki sabzi + 1 glass thin buttermilk',
            preference: 'eggetarian',
            allergens: ['dairy'],
            description: 'Comforting, alkaline, and high-protein plate with zero gastrointestinal strain.',
          },
          {
            name: 'Red Rice with Yellow Moong Dal, Steamed Pumpkin & Cabbage Poriyal',
            portion: '3/4 cup cooked rice + 1 cup yellow moong dal + 1 cup steamed pumpkin-cabbage mash',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Easy-to-digest plant protein, carotenoids, and soothing dietary fibre.',
          },
        ],
      },
      {
        mealType: 'Evening Snack',
        timeWindow: '4:00 PM – 5:00 PM',
        targetEnergy: 'Calming Mineral Refresh',
        guideline: 'Warm, low-sodium snack to ease late-afternoon joint fatigue.',
        options: [
          {
            name: 'Roasted Makhana (Foxnuts) with Turmeric & Herbal Ginger-Tulsi Tea',
            portion: '1 small bowl (25g) + 1 cup freshly brewed tea',
            preference: 'all',
            allergens: [],
            description: 'Anti-inflammatory tulsi and turmeric combined with magnesium-rich foxnuts.',
          },
          {
            name: 'Steamed Nendran Banana (Small) with a Sprinkle of Cardamom',
            portion: '1 small steamed banana',
            preference: 'all',
            allergens: [],
            description: 'Easily assimilated carbohydrates, potassium, and resistant starch for colon health.',
          },
        ],
      },
      {
        mealType: 'Dinner',
        timeWindow: '7:00 PM – 8:00 PM',
        targetEnergy: 'Light Comforting Supper',
        guideline: 'Conclude dinner by 7:30 or 8:00 PM; avoid oily dishes or raw salads at night.',
        options: [
          {
            name: 'Moong Dal & Vegetable Khichdi with Steamed Zucchini / Bottle Gourd & Jeera Water',
            portion: '1 cup soft khichdi + 1 cup steamed squash/lauki + 1 glass warm jeera water',
            preference: 'vegetarian',
            allergens: ['legumes'],
            description: 'Gentle, warm, and comforting; eliminates night-time acid reflux and promotes restorative sleep.',
          },
          {
            name: 'Clear Fish or Chicken Broth with Soft Steamed Vegetables & 1 Soft Phulka',
            portion: '1 bowl broth + 80g tender poached fish/chicken + 1 soft phulka',
            preference: 'non_vegetarian',
            allergens: ['gluten', 'seafood'],
            description: 'Light, mineral-dense soup nourishing articular cartilage without digestive strain.',
          },
          {
            name: 'Soft Egg White Scramble with Sautéed Spinach & 1 Slice Multigrain Toast',
            portion: '2 egg whites scrambled with mild spices & spinach + 1 toast',
            preference: 'eggetarian',
            allergens: ['gluten'],
            description: 'Pure, easily digested protein and lutein with minimal starch.',
          },
          {
            name: 'Pumpkin & Moong Dal Pureed Soup with 1 Soft Jowar Chapati',
            portion: '1 large bowl smooth soup + 1 soft jowar chapati',
            preference: 'vegan',
            allergens: ['legumes'],
            description: 'Warm beta-carotene nourishment that settles the stomach and encourages peaceful sleep.',
          },
        ],
      },
    ],
    dietaryNotes: [
      'Have periodic bone mineral density (DEXA scan) and serum Vitamin D3 evaluations.',
      'Incorporate daily gentle sunlight exposure (15–20 minutes before 9:00 AM).',
      'Practice gentle morning walking or restorative yoga to preserve flexibility and balance.',
    ],
    disclaimer: 'This plan provides general lifestyle and nutritional guidance for mature adult women. Patients with osteoporosis, hypertension, or kidney conditions must consult an individualized clinical dietitian.',
  },
};

/**
 * Returns the matching diet plan based on age and sex.
 * Enforces explicit boundaries:
 *   - Under 30: 18 <= age < 30
 *   - 30–50:    30 <= age <= 50
 *   - Over 50:  age > 50
 *
 * @param {number} age
 * @param {string} sex - 'male' | 'female'
 * @returns {object|null}
 */
export function getDietPlan(age, sex) {
  const numericAge = Number(age);
  const normalizedSex = String(sex || '').toLowerCase().trim();

  if (isNaN(numericAge) || numericAge < 18) {
    return null;
  }

  if (numericAge < 30 && normalizedSex === 'male') {
    return dietPlans.under30Male;
  }
  if (numericAge < 30 && normalizedSex === 'female') {
    return dietPlans.under30Female;
  }
  if (numericAge >= 30 && numericAge <= 50 && normalizedSex === 'male') {
    return dietPlans.age30To50Male;
  }
  if (numericAge >= 30 && numericAge <= 50 && normalizedSex === 'female') {
    return dietPlans.age30To50Female;
  }
  if (numericAge > 50 && normalizedSex === 'male') {
    return dietPlans.over50Male;
  }
  if (numericAge > 50 && normalizedSex === 'female') {
    return dietPlans.over50Female;
  }

  return null;
}

/**
 * Filters a plan's meals based on the user's food preference and allergy exclusions.
 * Returns filtered meals along with safety notifications and review flags.
 *
 * @param {Array} meals
 * @param {string} foodPreference - 'Vegetarian' | 'Non-vegetarian' | 'Eggetarian' | 'Vegan'
 * @param {Array} foodAllergies - e.g. ['Milk or milk products', 'Wheat or gluten-containing foods', ...]
 * @returns {object} { filteredMeals, warnings, hasAllergyExclusions, requiresDietitianReview }
 */
export function filterDietPlanMeals(meals, foodPreference, foodAllergies = []) {
  if (!Array.isArray(meals)) return { filteredMeals: [], warnings: [], hasAllergyExclusions: false, requiresDietitianReview: false };

  const normPref = String(foodPreference || '').toLowerCase();
  const selectedAllergies = Array.isArray(foodAllergies) ? foodAllergies : [foodAllergies];

  const hasMilkAllergy = selectedAllergies.some((a) => /milk/i.test(a));
  const hasGlutenAllergy = selectedAllergies.some((a) => /wheat|gluten/i.test(a));
  const hasLegumeAllergy = selectedAllergies.some((a) => /pulses|legumes/i.test(a));
  const hasSeafoodAllergy = selectedAllergies.some((a) => /seafood/i.test(a));
  const hasOtherAllergy = selectedAllergies.some((a) => /other/i.test(a));

  const warnings = [];
  let requiresDietitianReview = false;

  if (hasOtherAllergy) {
    warnings.push('You indicated other food allergies or intolerances. A personalized clinical review with a FutureAce hospital dietitian is required before following this diet plan.');
    requiresDietitianReview = true;
  }
  if (hasGlutenAllergy) {
    warnings.push('Wheat/gluten sensitivity noted: Wheat, dahlia, and roti options have been filtered. Please ensure all grains and oats are certified gluten-free.');
  }
  if (hasMilkAllergy) {
    warnings.push('Dairy allergy/lactose intolerance noted: Milk, curd, paneer, and buttermilk items have been filtered. Substitute with fortified plant milks under dietitian guidance.');
  }
  if (hasSeafoodAllergy) {
    warnings.push('Seafood allergy noted: All fish and seafood dishes have been strictly removed.');
  }
  if (hasLegumeAllergy) {
    warnings.push('Pulses/legumes intolerance noted: Lentils, dals, and chana options have been filtered. Alternative protein sources should be evaluated by a dietitian.');
    requiresDietitianReview = true;
  }

  const filteredMeals = meals.map((meal) => {
    const validOptions = (meal.options || []).filter((opt) => {
      // 1. Food Preference Filtering
      if (normPref === 'vegetarian') {
        if (opt.preference === 'non_vegetarian' || opt.preference === 'eggetarian') return false;
      } else if (normPref === 'eggetarian') {
        if (opt.preference === 'non_vegetarian') return false;
      } else if (normPref === 'vegan') {
        if (opt.preference !== 'vegan' && opt.preference !== 'all') return false;
      }

      // 2. Allergy Filtering
      const allergens = opt.allergens || [];
      if (hasMilkAllergy && (allergens.includes('dairy') || /curd|paneer|milk|buttermilk|chaas/i.test(opt.name))) return false;
      if (hasGlutenAllergy && (allergens.includes('gluten') || /wheat|phulka|roti|dahlia|thepla|toast/i.test(opt.name))) return false;
      if (hasLegumeAllergy && (allergens.includes('legumes') || /dal|sambar|chana|moong|rajma|chickpea|sprouts/i.test(opt.name))) return false;
      if (hasSeafoodAllergy && (allergens.includes('seafood') || /fish|seafood|sardine|mackerel/i.test(opt.name))) return false;

      return true;
    });

    const isMissingOption = validOptions.length === 0;
    if (isMissingOption) {
      requiresDietitianReview = true;
    }

    return {
      ...meal,
      options: validOptions,
      requiresCustomSubstitution: isMissingOption,
    };
  });

  return {
    filteredMeals,
    warnings,
    hasAllergyExclusions: hasMilkAllergy || hasGlutenAllergy || hasLegumeAllergy || hasSeafoodAllergy || hasOtherAllergy,
    requiresDietitianReview,
  };
}

/**
 * Returns structured health condition warning notices for medical conditions reported.
 *
 * @param {Array|string} conditions
 * @param {string} otherDetails
 * @returns {Array<string>}
 */
export function getMedicalConditionNotices(conditions = [], otherDetails = '') {
  const condList = Array.isArray(conditions) ? conditions : [conditions];
  const notices = [];

  const hasDiabetes = condList.some((c) => /diabetes/i.test(c));
  const hasThyroidPcos = condList.some((c) => /thyroid|pcos|pcod/i.test(c));
  const hasCholesterol = condList.some((c) => /cholesterol|high cholesterol/i.test(c));
  const hasOther = condList.some((c) => /other medical/i.test(c)) || !!otherDetails.trim();

  if (hasDiabetes) {
    notices.push('Diabetes Reported: Glycemic control requires strict carbohydrate counting, meal timing synchronization with medications, and regular self-monitoring of blood glucose. Please consult a FutureAce endocrinologist or clinical dietitian.');
  }
  if (hasThyroidPcos) {
    notices.push('Thyroid / PCOS/PCOD Reported: Endocrine disorders alter metabolic rate and nutrient requirements. Ensure adequate selenium, zinc, and iodine status, and coordinate this diet plan with your treating physician.');
  }
  if (hasCholesterol) {
    notices.push('High Cholesterol / Cardiovascular Conditions Reported: Saturated fat, dietary cholesterol, and trans-fats must be strictly limited. Regular lipid panel monitoring is advised.');
  }
  if (hasOther) {
    notices.push(`Other Medical Condition Noted (${otherDetails.trim() || 'Specified by user'}): Any chronic condition or regular prescription medication requires professional medical clearance prior to initiating a new dietary regimen.`);
  }

  return notices;
}

/**
 * Returns digestive and bowel habit counseling notes.
 *
 * @param {string} digestiveProblems
 * @param {string} bowelHabits
 * @param {string} otherDigestive
 * @returns {Array<string>}
 */
export function getDigestiveGuidanceNotes(digestiveProblems, bowelHabits, otherDigestive = '') {
  const notes = [];

  if (/constipation/i.test(bowelHabits)) {
    notes.push('Frequent Constipation: Increase soluble and insoluble dietary fibre gradually (oats, vegetables, soaked chia/flaxseeds) and ensure at least 2.5–3 litres of daily water intake.');
  } else if (/loose stools/i.test(bowelHabits)) {
    notes.push('Frequent Loose Stools: Emphasize easily digestible, soluble fibre (stewed apple, bananas, soft khichdi) and consider clinical evaluation to rule out malabsorption or food intolerances.');
  } else if (/alternating/i.test(bowelHabits)) {
    notes.push('Alternating Bowel Habits: May reflect an irritable bowel pattern. A structured low-FODMAP evaluation under qualified dietitian supervision is recommended if symptoms persist.');
  }

  if (/bloating|gas/i.test(digestiveProblems)) {
    notes.push('Bloating / Gas: Eat slowly, chew thoroughly, avoid carbonated drinks, and soak pulses/legumes overnight with cumin and asafoetida (hing) to minimize oligosaccharide fermentation.');
  } else if (/acidity|reflux/i.test(digestiveProblems)) {
    notes.push('Acidity / Reflux: Avoid lying down within 2–3 hours of eating, limit deep-fried or heavily spiced foods, and finish dinner by 7:30 PM.');
  } else if (/diarrhoea/i.test(digestiveProblems)) {
    notes.push('Diarrhoea: Maintain oral hydration with coconut water or electrolyte solutions; consult a gastroenterologist if symptoms are persistent.');
  } else if (/other/i.test(digestiveProblems) && otherDigestive.trim()) {
    notes.push(`Digestive Concern Noted (${otherDigestive.trim()}): Discuss specific gastrointestinal concerns with our clinical wellness team.`);
  }

  return notes;
}
