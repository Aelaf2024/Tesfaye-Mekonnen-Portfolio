// --- DOM Element References ---
// These are declared here but assigned inside DOMContentLoaded
let introScreen;
let conversationScreen;
let selectComputerBtn;
let selectCellphoneBtn;
let conversationHistory;
let userResponseInput;
let submitResponseBtn;
let loadingIndicator;
let homeLink;
let skillSummaryLink;
let skillSummaryScreen;
let tabButtons;
let tabPanes;

// --- Global Variables ---
let currentDeviceType = ""; // To store 'computer' or 'cellphone'
let conversationState = 0; // To track how many questions have been asked (0 for initial, 1 for primary use, etc.)
let customerNeeds = {
  primaryUses: [],
  specificDeviceType: "", // Stores 'laptop', 'desktop', 'ipad', 'iphone', 'samsung'
  laptopPriority: "", // 'portability' or 'performance'
  desktopUse: "", // 'basic_office' or 'gaming_professional'
  ipadUse: "", // 'media_consumption', 'note_drawing', 'professional_creation'
  iphoneModel: "", // 'standard' or 'pro'
  samsungModel: "", // 'flagship' or 'budget'
  budget: { min: 0, max: Infinity, category: "" },
  userRequest: "", // To store the initial user request for context
};

// --- Data ---
const electronicsData = {
  computer: {
    laptop: [
      {
        id: "laptop_basic_Browse",
        name: "Basic Everyday Use Laptop",
        usage: ["schoolwork", "browse", "office tasks", "casual"],
        priorities: { laptop: "portability" },
        estimatedPriceRange: { min: 400, max: 700 },
        specs: {
          processor: { recommended: "Intel i3 or AMD Ryzen 3" },
          ram: { min: "8GB", recommended: "8GB" },
          storage: { min: "256GB SSD", recommended: "256GB SSD" },
          screen_size: { recommended: "13-14 inch" },
          battery_life: { recommended: "6-8 hours+" },
          portability: "High",
        },
        explanation: {
          purpose:
            "Ideal for general web Browse, email, word processing, and light school tasks.",
          portability_note:
            "Designed to be lightweight and have decent battery life for on-the-go use.",
          value: "Offers good value for everyday computing needs.",
        },
      },
      {
        id: "laptop_performance_gaming",
        name: "Performance/Gaming Laptop",
        usage: ["gaming", "video editing", "design", "coding", "heavy tasks"],
        priorities: { laptop: "performance" },
        estimatedPriceRange: { min: 1200, max: 2500 },
        specs: {
          processor: { recommended: "Intel i7/i9 or AMD Ryzen 7/9" },
          ram: { min: "16GB", recommended: "32GB" },
          storage: { min: "512GB SSD", recommended: "1TB SSD" },
          graphics_card: {
            recommended: "NVIDIA RTX 3060/4060 or AMD Radeon RX 6700/7700+",
          },
          screen_size: { recommended: "15-17 inch (high refresh rate)" },
          cooling: "Advanced cooling system",
          performance: "High",
        },
        explanation: {
          purpose:
            "Built for demanding applications, modern gaming, and professional content creation.",
          power_note:
            "Features a powerful CPU and dedicated GPU for smooth performance.",
          upgrade_potential: "Often includes options for future upgrades.",
        },
      },
    ],
    desktop: [
      {
        id: "desktop_home_office",
        name: "Home/Office Desktop PC",
        usage: [
          "basic home/office use",
          "email",
          "documents",
          "browse",
          "schoolwork",
        ],
        priorities: { desktop: "basic_office" },
        estimatedPriceRange: { min: 300, max: 600 },
        specs: {
          processor: { recommended: "Intel i3 or AMD Ryzen 3" },
          ram: { min: "8GB", recommended: "8GB" },
          storage: { min: "256GB SSD" },
          form_factor: "Compact Tower",
          connectivity: "Standard USB, HDMI, Ethernet",
        },
        explanation: {
          purpose:
            "Reliable for everyday computing tasks, suitable for small offices or family use.",
          value: "Cost-effective solution for essential home and work needs.",
        },
      },
      {
        id: "desktop_gaming_professional",
        name: "Gaming/Professional Desktop PC",
        usage: [
          "gaming",
          "professional work",
          "video editing",
          "graphic design",
          "3D rendering",
          "streaming",
        ],
        priorities: { desktop: "gaming_professional" },
        estimatedPriceRange: { min: 1000, max: 2500 },
        specs: {
          processor: { recommended: "Intel i7/i9 or AMD Ryzen 7/9" },
          ram: { min: "16GB", recommended: "32GB+" },
          storage: { min: "1TB SSD", recommended: "2TB SSD + HDD" },
          graphics_card: {
            recommended: "NVIDIA RTX 4070/4080 or AMD Radeon RX 7800/7900 XT",
          },
          cooling: "Liquid or advanced air cooling",
          expandability: "High",
        },
        explanation: {
          purpose:
            "Designed for high-performance gaming, demanding professional software, and content creation.",
          customization:
            "Offers significant customization and upgrade potential.",
          power: "Provides top-tier processing and graphics power.",
        },
      },
    ],
    ipad: [
      {
        id: "ipad_basic_media",
        name: "iPad (Standard)",
        usage: [
          "media consumption",
          "browse",
          "casual",
          "social media",
          "reading",
        ],
        priorities: { ipad: "media_consumption" },
        estimatedPriceRange: { min: 300, max: 500 },
        specs: {
          display: { recommended: "10.2-inch Retina Display" },
          processor: { recommended: "A13 Bionic" },
          storage: { min: "64GB" },
          accessories: "Apple Pencil (1st Gen) support",
        },
        explanation: {
          purpose:
            "Perfect for everyday entertainment, web Browse, and casual apps.",
          simplicity: "Easy to use with a wide array of apps for media.",
          portability: "Light and thin for comfortable viewing anywhere.",
        },
      },
      {
        id: "ipad_air_pro",
        name: "iPad Air or Pro",
        usage: [
          "note-taking",
          "drawing",
          "sketch",
          "creative notes",
          "light professional work",
        ],
        priorities: { ipad: "note_drawing" },
        estimatedPriceRange: { min: 600, max: 1200 },
        specs: {
          display: {
            recommended: "10.9-inch Liquid Retina / 11-inch Liquid Retina XDR",
          },
          processor: { recommended: "M1/M2 Chip" },
          storage: { min: "128GB" },
          accessories: "Apple Pencil (2nd Gen) support, Magic Keyboard support",
          features: "ProMotion Technology (iPad Pro), USB-C",
        },
        explanation: {
          purpose:
            "Excellent for digital art, detailed note-taking, and productivity tasks requiring more power and precision.",
          performance: "Powerful chip for demanding creative apps.",
          accessories_support:
            "Full support for advanced Apple Pencil and keyboard accessories.",
        },
      },
      {
        id: "ipad_pro_creative",
        name: "iPad Pro (High-End)",
        usage: [
          "professional work",
          "content creation",
          "video editing",
          "graphic design",
          "3D rendering",
          "streaming",
        ],
        priorities: { ipad: "professional_creation" },
        estimatedPriceRange: { min: 1000, max: 2000 },
        specs: {
          display: { recommended: "12.9-inch Liquid Retina XDR (ProMotion)" },
          processor: { recommended: "M2/M3 Chip" },
          ram: { min: "8GB", recommended: "16GB+" },
          storage: { min: "256GB", recommended: "1TB+" },
          accessories: "Apple Pencil (2nd Gen) support, Magic Keyboard support",
          features: "Thunderbolt/USB 4, Face ID",
        },
        explanation: {
          purpose:
            "The ultimate iPad for demanding professional workflows, delivering desktop-class performance in a portable tablet.",
          power_and_display:
            "Unrivaled processing power and a stunning mini-LED display for critical color work.",
          versatility:
            "Transforms into a powerful mobile workstation with accessories.",
        },
      },
    ],
  },
  cellphone: {
    iphone: [
      {
        id: "iphone_standard_user",
        name: "iPhone (Standard Model)",
        usage: [
          "social media",
          "photos",
          "calls and texts",
          "browse",
          "casual games",
        ],
        priorities: { cellphone: "balanced" },
        estimatedPriceRange: { min: 700, max: 1000 },
        specs: {
          display: { recommended: "Super Retina XDR" },
          processor: { recommended: "A15/A16 Bionic" },
          camera: { recommended: "Dual-camera system" },
          battery_life: { recommended: "All-day battery life" },
          storage: { min: "128GB" },
        },
        explanation: {
          purpose:
            "A great all-around phone for most users, offering a balance of features and performance.",
          ecosystem:
            "Seamless integration with Apple's ecosystem and services.",
          camera_quality: "Excellent for everyday photography and video.",
        },
      },
      {
        id: "iphone_pro_user",
        name: "iPhone Pro (High-End Model)",
        usage: [
          "taking lots of photos",
          "playing games",
          "watching videos",
          "professional use",
          "content creation",
        ],
        priorities: { cellphone: "performance" },
        estimatedPriceRange: { min: 1000, max: 1500 },
        specs: {
          display: { recommended: "ProMotion Super Retina XDR" },
          processor: { recommended: "A17 Pro Bionic" },
          camera: { recommended: "Pro camera system (Telephoto, LiDAR)" },
          battery_life: { recommended: "Extended battery life" },
          storage: { min: "256GB", recommended: "512GB+" },
          features: "ProRes Video, Cinematic Mode, Action Mode",
        },
        explanation: {
          purpose:
            "Designed for power users, photographers, and videographers who need the best performance and advanced camera capabilities.",
          camera_system:
            "Offers professional-grade photography and videography features.",
          performance: "Cutting-edge chip for demanding apps and games.",
        },
      },
    ],
    samsung: [
      {
        id: "samsung_android_enthusiast",
        name: "Samsung Galaxy (Flagship S/Fold Series)",
        usage: [
          "social media",
          "taking lots of photos",
          "playing games",
          "watching videos",
          "productivity",
          "customization",
        ],
        priorities: { cellphone: "performance" },
        estimatedPriceRange: { min: 800, max: 1400 },
        specs: {
          display: { recommended: "Dynamic AMOLED 2X (high refresh rate)" },
          processor: { recommended: "Snapdragon 8 Gen X or Exynos equivalent" },
          camera: {
            recommended: "Versatile multi-lens system (ultra-wide, telephoto)",
          },
          battery_life: { recommended: "All-day battery with fast charging" },
          storage: { min: "256GB" },
          features:
            "S Pen support (Ultra series), DeX mode, IP68 water resistance",
        },
        explanation: {
          purpose:
            "A powerful Android device for users who want cutting-edge features, a versatile camera, and customization options.",
          versatility:
            "Offers a wide range of features for both productivity and entertainment.",
          android_ecosystem:
            "Full access to the Android ecosystem with Samsung's unique enhancements.",
        },
      },
      {
        id: "samsung_budget_user",
        name: "Samsung Galaxy (A-Series)",
        usage: ["calls and texts", "social media", "browse", "casual use"],
        priorities: { cellphone: "budget" },
        estimatedPriceRange: { min: 200, max: 500 },
        specs: {
          display: { recommended: "AMOLED or LCD display" },
          processor: { recommended: "Mid-range Exynos or Snapdragon" },
          camera: { recommended: "Dual or triple camera setup" },
          battery_life: { recommended: "Long-lasting battery" },
          storage: { min: "64GB" },
        },
        explanation: {
          purpose:
            "An affordable Android smartphone offering essential features and reliable performance for everyday use.",
          value_for_money:
            "Provides a good balance of features and cost-effectiveness.",
          battery_life:
            "Known for excellent battery endurance for casual users.",
        },
      },
    ],
  },
};

// Define keywords for different usage types
const usageKeywords = {
  gaming: [
    "game",
    "gaming",
    "play games",
    "fortnite",
    "valorant",
    "fifa",
    "high graphics",
  ],
  video_editing: [
    "video editing",
    "edit videos",
    "filmmaking",
    "youtube",
    "render video",
  ],
  graphic_design: [
    "graphic design",
    "photoshop",
    "illustrator",
    "design",
    "creative suite",
  ],
  office_work: [
    "office",
    "work",
    "microsoft office",
    "word",
    "excel",
    "presentations",
  ],
  school: ["school", "homework", "online classes", "study"],
  browse: [
    "browse",
    "internet",
    "email",
    "social media",
    "stream videos",
    "web Browse",
  ],
  light_use: ["basic use", "simple tasks", "just for fun", "casual"],
  programming: ["coding", "programming", "development", "ide", "compile"],
  heavy_multitasking: ["multitask", "many apps open", "run multiple programs"],
  portable: ["portable", "travel", "on the go", "lightweight", "take with me"],
  powerful: ["powerful", "fast", "performance", "no lag"],
  affordable: ["cheap", "budget", "inexpensive", "affordable"],
  photography: [
    "photos",
    "camera",
    "pictures",
    "high quality camera",
    "selfies",
    "photo",
  ],
  social_media: [
    "social media",
    "facebook",
    "instagram",
    "tiktok",
    "twitter",
    "snapchat",
  ],
  communication: ["calls", "texts", "messaging", "whatsapp", "facetime"],
  media_consumption: [
    "streaming",
    "movies",
    "youtube",
    "music",
    "videos",
    "netflix",
    "hulu",
  ],
  mobile_gaming: ["mobile gaming", "phone games", "gaming on phone"],
};

// Define keywords for different device types
const deviceTypeKeywords = {
  laptop: [
    "laptop",
    "notebook",
    "portable",
    "on the go",
    "travel",
    "ultrabook",
  ],
  desktop: ["desktop", "pc", "tower", "home computer", "workstation"],
  ipad: ["ipad", "tablet", "apple tablet"],
  iphone: ["iphone", "apple phone", "ios phone"],
  samsung: ["samsung", "galaxy", "android phone"],
};

// --- Helper Functions ---

function displayAIMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("ai-message");
  messageDiv.innerHTML = `AI: ${message}`;
  conversationHistory.appendChild(messageDiv);
  conversationHistory.scrollTop = conversationHistory.scrollHeight; // Scroll to bottom
}

function displayUserMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("user-message");
  messageDiv.textContent = `You: ${message}`;
  conversationHistory.appendChild(messageDiv);
  conversationHistory.scrollTop = conversationHistory.scrollHeight; // Scroll to bottom
}

function showLoadingIndicator() {
  if (loadingIndicator) {
    loadingIndicator.style.display = "flex"; // Or 'block', depending on your CSS
  }
}

function hideLoadingIndicator() {
  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }
}

function parsePrimaryUsage(text) {
  const normalizedText = text.toLowerCase();
  let identifiedUses = new Set();

  for (const [category, keywords] of Object.entries(usageKeywords)) {
    for (const keyword of keywords) {
      if (normalizedText.includes(keyword)) {
        identifiedUses.add(category);
        break;
      }
    }
  }
  // If no specific keywords are found, default to 'general use' or leave empty
  customerNeeds.primaryUses =
    Array.from(identifiedUses).length > 0
      ? Array.from(identifiedUses)
      : ["general use"];
  console.log("Parsed primary uses:", customerNeeds.primaryUses);
}

function parseDeviceType(text) {
  const normalizedText = text.toLowerCase();
  let identifiedDeviceType = "general"; // Default if no specific type is found

  for (const [type, keywords] of Object.entries(deviceTypeKeywords)) {
    for (const keyword of keywords) {
      if (normalizedText.includes(keyword)) {
        identifiedDeviceType = type;
        break;
      }
    }
  }
  customerNeeds.specificDeviceType = identifiedDeviceType; // Store the identified device type
  console.log("Parsed specific device type:", customerNeeds.specificDeviceType);
}

function parseLaptopPriority(text) {
  const normalizedText = text.toLowerCase();
  if (
    normalizedText.includes("portability") ||
    normalizedText.includes("lightweight") ||
    normalizedText.includes("travel")
  ) {
    customerNeeds.laptopPriority = "portability";
  } else if (
    normalizedText.includes("performance") ||
    normalizedText.includes("gaming") ||
    normalizedText.includes("editing")
  ) {
    customerNeeds.laptopPriority = "performance";
  } else {
    customerNeeds.laptopPriority = "balanced";
  }
  console.log("Parsed laptop priority:", customerNeeds.laptopPriority);
}

function parseDesktopUse(text) {
  const normalizedText = text.toLowerCase();
  if (
    normalizedText.includes("gaming") ||
    normalizedText.includes("professional") ||
    normalizedText.includes("design") ||
    normalizedText.includes("rendering") ||
    normalizedText.includes("streaming")
  ) {
    customerNeeds.desktopUse = "gaming_professional";
  } else if (
    normalizedText.includes("basic") ||
    normalizedText.includes("office") ||
    normalizedText.includes("home")
  ) {
    customerNeeds.desktopUse = "basic_office";
  } else {
    customerNeeds.desktopUse = "general";
  }
  console.log("Parsed desktop use:", customerNeeds.desktopUse);
}

function parseiPadUse(text) {
  const normalizedText = text.toLowerCase();
  if (
    normalizedText.includes("media") ||
    normalizedText.includes("browse") ||
    normalizedText.includes("reading") ||
    normalizedText.includes("casual")
  ) {
    customerNeeds.ipadUse = "media_consumption";
  } else if (
    normalizedText.includes("note") ||
    normalizedText.includes("drawing") ||
    normalizedText.includes("sketch") ||
    normalizedText.includes("creative")
  ) {
    customerNeeds.ipadUse = "note_drawing";
  } else if (
    normalizedText.includes("professional") ||
    normalizedText.includes("content creation") ||
    normalizedText.includes("video editing") ||
    normalizedText.includes("graphic design") ||
    normalizedText.includes("3d rendering")
  ) {
    customerNeeds.ipadUse = "professional_creation";
  } else {
    customerNeeds.ipadUse = "general";
  }
  console.log("Parsed iPad use:", customerNeeds.ipadUse);
}

function parseIphoneModel(text) {
  const normalizedText = text.toLowerCase();
  if (normalizedText.includes("pro") || normalizedText.includes("high-end")) {
    customerNeeds.iphoneModel = "pro";
  } else if (
    normalizedText.includes("standard") ||
    normalizedText.includes("basic")
  ) {
    customerNeeds.iphoneModel = "standard";
  } else {
    customerNeeds.iphoneModel = "balanced"; // Default
  }
  console.log("Parsed iPhone model:", customerNeeds.iphoneModel);
}

function parseSamsungModel(text) {
  const normalizedText = text.toLowerCase();
  if (
    normalizedText.includes("flagship") ||
    normalizedText.includes("s series") ||
    normalizedText.includes("fold") ||
    normalizedText.includes("ultra") ||
    normalizedText.includes("android enthusiast")
  ) {
    customerNeeds.samsungModel = "flagship";
  } else if (
    normalizedText.includes("budget") ||
    normalizedText.includes("a series")
  ) {
    customerNeeds.samsungModel = "budget";
  } else {
    customerNeeds.samsungModel = "balanced"; // Default
  }
  console.log("Parsed Samsung model:", customerNeeds.samsungModel);
}

function parseBudget(text) {
  const normalizedText = text.toLowerCase();
  let min = 0;
  let max = Infinity;
  let category = "unknown";

  // Regex to find numbers that look like prices (e.g., $500, 500, 500-1000)
  const priceMatches = normalizedText.match(
    /\$?\d{3,}(?:k)?(?:-\$?\d{3,}(?:k)?)?/g
  );

  if (priceMatches && priceMatches.length > 0) {
    const cleanedPrice = priceMatches[0]
      .replace(/\$/g, "")
      .replace(/k/g, "000"); // Remove '$', replace 'k' with '000'

    if (cleanedPrice.includes("-")) {
      const parts = cleanedPrice.split("-");
      min = parseInt(parts[0], 10) || 0;
      max = parseInt(parts[1], 10) || Infinity;
      category = "range";
    } else if (cleanedPrice.includes("+")) {
      min = parseInt(cleanedPrice.replace("+", ""), 10) || 0;
      max = Infinity;
      category = "min_only";
    } else {
      const singlePrice = parseInt(cleanedPrice, 10);
      if (singlePrice) {
        // Create a range around the single price: +/- 20%
        min = Math.max(0, singlePrice * 0.8); // Ensure min doesn't go below 0
        max = singlePrice * 1.2;
        category = "single_point_estimate";
      }
    }
  } else {
    // Keywords for budget categories
    if (
      normalizedText.includes("low budget") ||
      normalizedText.includes("affordable") ||
      normalizedText.includes("cheap")
    ) {
      max = 700; // Example
      category = "low";
    } else if (
      normalizedText.includes("mid-range") ||
      normalizedText.includes("moderate")
    ) {
      min = 701;
      max = 1500; // Example
      category = "mid";
    } else if (
      normalizedText.includes("high-end") ||
      normalizedText.includes("premium") ||
      normalizedText.includes("no budget")
    ) {
      min = 1501;
      max = Infinity; // Example
      category = "high";
    }
  }

  customerNeeds.budget = { min: min, max: max, category: category };
  console.log("Parsed budget:", customerNeeds.budget); // For debugging
}

function findRecommendation(needs) {
  const deviceCategory = needs.specificDeviceType; // e.g., 'laptop', 'desktop', 'ipad', 'iphone', 'samsung'
  const primaryUses = needs.primaryUses;
  const budget = needs.budget;

  let possibleProducts = [];
  if (electronicsData.computer[deviceCategory]) {
    possibleProducts = electronicsData.computer[deviceCategory];
  } else if (electronicsData.cellphone[deviceCategory]) {
    // If it's a phone, we need to go one level deeper (iphone or samsung)
    if (deviceCategory === "iphone" && electronicsData.cellphone.iphone) {
      possibleProducts = electronicsData.cellphone.iphone;
    } else if (
      deviceCategory === "samsung" &&
      electronicsData.cellphone.samsung
    ) {
      possibleProducts = electronicsData.cellphone.samsung;
    }
  }

  if (possibleProducts.length === 0) {
    console.log("No products found for device category:", deviceCategory);
    return null;
  }

  // Step 1: Filter by budget
  let budgetFilteredProducts = possibleProducts.filter((product) => {
    if (
      !product.estimatedPriceRange ||
      typeof product.estimatedPriceRange.min === "undefined" ||
      typeof product.estimatedPriceRange.max === "undefined"
    ) {
      console.warn(
        `Product ${product.id} missing estimatedPriceRange. Cannot filter by budget.`
      );
      return true; // Include products with missing price data for now
    }
    return (
      product.estimatedPriceRange.min <= budget.max &&
      product.estimatedPriceRange.max >= budget.min
    );
  });

  if (budgetFilteredProducts.length === 0) {
    console.log(
      "No products matching budget criteria. Falling back to all products for general filtering."
    );
    budgetFilteredProducts = possibleProducts; // Fallback to all products of the type
  }

  let bestMatch = null;
  let highestScore = -1;

  budgetFilteredProducts.forEach((product) => {
    let currentScore = 0;

    // Score based on Primary Uses
    primaryUses.forEach((userUse) => {
      // Check if product usage includes any of the user's identified uses
      if (product.usage && product.usage.includes(userUse.replace(/_/g, " "))) {
        currentScore += 2;
      }
    });

    // Score based on specific device priority/use (for computers)
    if (deviceCategory === "laptop") {
      if (
        needs.laptopPriority &&
        product.priorities.laptop === needs.laptopPriority
      ) {
        currentScore += 3;
      }
    } else if (deviceCategory === "desktop") {
      if (needs.desktopUse && product.priorities.desktop === needs.desktopUse) {
        currentScore += 3;
      }
    } else if (deviceCategory === "ipad") {
      if (needs.ipadUse && product.priorities.ipad === needs.ipadUse) {
        currentScore += 3;
      }
    }
    // Score based on specific phone model preference
    else if (deviceCategory === "iphone") {
      if (
        needs.iphoneModel &&
        product.priorities.cellphone ===
          (needs.iphoneModel === "pro" ? "performance" : "balanced")
      ) {
        // Map standard/pro to balanced/performance
        currentScore += 3;
      }
    } else if (deviceCategory === "samsung") {
      if (
        needs.samsungModel &&
        product.priorities.cellphone ===
          (needs.samsungModel === "flagship" ? "performance" : "budget")
      ) {
        // Map flagship/budget
        currentScore += 3;
      }
    }

    // Score based on budget alignment (simplified: closer to middle of range gets higher score)
    if (product.estimatedPriceRange) {
      const productMidpoint =
        (product.estimatedPriceRange.min + product.estimatedPriceRange.max) / 2;
      if (productMidpoint >= budget.min && productMidpoint <= budget.max) {
        currentScore += 1; // Within budget
      }
    }

    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestMatch = product;
    }
  });

  // Fallback if no specific match found after scoring
  if (!bestMatch && budgetFilteredProducts.length > 0) {
    bestMatch = budgetFilteredProducts[0];
  } else if (!bestMatch && possibleProducts.length > 0) {
    bestMatch = possibleProducts[0];
  }

  console.log("Recommended Product:", bestMatch);
  return bestMatch;
}

// --- Main Conversation Logic ---

function askAIQuestion() {
  let aiMessage = "";

  if (currentDeviceType === "computer") {
    if (conversationState === 0) {
      aiMessage =
        "What will you primarily use this computer for? (e.g., schoolwork, gaming, Browse, video editing, design, office tasks, etc.)";
    } else if (conversationState === 1) {
      aiMessage = `Understood! You're looking for a computer primarily for **${customerNeeds.primaryUses.join(
        ", "
      )}**.
            Now, to help me narrow down the options, is this computer primarily a **laptop**, a **desktop**, or perhaps an **iPad**?`;
    } else if (conversationState === 2) {
      // User just selected laptop/desktop/iPad
      if (customerNeeds.specificDeviceType === "laptop") {
        aiMessage = `Alright, a **${customerNeeds.specificDeviceType}**! Are you prioritizing **portability** (lightweight, long battery life) or **performance** (powerful processor, graphics for demanding tasks)?`;
      } else if (customerNeeds.specificDeviceType === "desktop") {
        aiMessage = `Okay, a **${customerNeeds.specificDeviceType}**! Will this be for **basic home/office use** (email, documents, Browse) or for **gaming/professional work** (video editing, graphic design, 3D rendering)?`;
      } else if (customerNeeds.specificDeviceType === "ipad") {
        aiMessage = `Got it, an **iPad**! Will you mainly use it for **media consumption** (movies, Browse, casual games), **note-taking/drawing** (creative notes, sketching), or **professional content creation** (video editing, graphic design)?`;
      } else {
        aiMessage =
          "I didn't quite catch that. Could you specify if you're looking for a laptop, desktop, or an iPad?";
        conversationState = 1; // Revert to previous state to ask again
      }
    } else if (conversationState === 3) {
      // User just answered device-specific priority
      aiMessage = `And what's your approximate budget for the ${customerNeeds.specificDeviceType}? (e.g., "$1200", "$800-$1500", "under $700")`;
    } else if (conversationState === 4) {
      const recommendation = findRecommendation(customerNeeds);
      if (recommendation) {
        aiMessage = `Based on your needs for a **${
          customerNeeds.specificDeviceType
        }** primarily for **${customerNeeds.primaryUses.join(
          ", "
        )}** within a budget of **$${customerNeeds.budget.min} - $${
          customerNeeds.budget.max
        }**, I recommend the **${recommendation.name}**.
                <br><br>**Key Specs:**
                <ul>
                    <li>Processor: ${
                      recommendation.specs.processor.recommended
                    }</li>
                    <li>RAM: ${
                      recommendation.specs.ram.recommended ||
                      recommendation.specs.ram.min
                    }</li>
                    <li>Storage: ${
                      recommendation.specs.storage.recommended ||
                      recommendation.specs.storage.min
                    }</li>
                    ${
                      recommendation.specs.graphics_card
                        ? `<li>Graphics Card: ${recommendation.specs.graphics_card.recommended}</li>`
                        : ""
                    }
                    ${
                      recommendation.specs.screen_size
                        ? `<li>Screen Size: ${recommendation.specs.screen_size.recommended}</li>`
                        : ""
                    }
                    ${
                      recommendation.specs.battery_life
                        ? `<li>Battery Life: ${recommendation.specs.battery_life.recommended}</li>`
                        : ""
                    }
                </ul>
                **Explanation:** ${recommendation.explanation.purpose} ${
          recommendation.explanation.value || ""
        } ${recommendation.explanation.portability_note || ""} ${
          recommendation.explanation.power_note || ""
        } ${recommendation.explanation.customization || ""} ${
          recommendation.explanation.upgrade_potential || ""
        } ${recommendation.explanation.simplicity || ""} ${
          recommendation.explanation.accessories_support || ""
        } ${recommendation.explanation.power_and_display || ""} ${
          recommendation.explanation.versatility || ""
        } ${recommendation.explanation.ecosystem || ""} ${
          recommendation.explanation.camera_quality || ""
        } ${recommendation.explanation.camera_system || ""} ${
          recommendation.explanation.performance || ""
        } ${recommendation.explanation.android_ecosystem || ""} ${
          recommendation.explanation.value_for_money || ""
        }
                <br><br>**Does this sound like a good fit, or would you like me to refine the recommendation?**`;
      } else {
        aiMessage =
          "I couldn't find a specific recommendation based on all your criteria. Let's try adjusting some parameters. Would you like to revise your budget or primary uses?";
      }
    } else if (conversationState === 5) {
      aiMessage =
        "Please tell me how I can further assist you. Would you like to refine your search, or have more questions about this product?";
    }
  } else if (currentDeviceType === "cellphone") {
    if (conversationState === 0) {
      aiMessage =
        "Great choice! To help me understand what you need, tell me: **What will you primarily use this cellphone for?** (e.g., social media, photos, calls and texts, Browse, casual games)";
    } else if (conversationState === 1) {
      aiMessage = `Understood! You primarily use your phone for **${customerNeeds.primaryUses.join(
        ", "
      )}**. Are you looking for an **iPhone** or a **Samsung Galaxy**?`;
    } else if (conversationState === 2) {
      if (customerNeeds.specificDeviceType === "iphone") {
        aiMessage =
          "Alright, an **iPhone**! Are you looking for a **Pro** (high-end features, advanced camera) or a **Standard** (balanced features, everyday use) model?";
      } else if (customerNeeds.specificDeviceType === "samsung") {
        aiMessage =
          "Alright, a **Samsung Galaxy**!! Are you an **Android enthusiast** looking for a flagship (S/Fold series) or a **budget-conscious user** (A-series)?";
      } else {
        aiMessage =
          "I didn't quite catch that. Could you specify if you're looking for an iPhone or a Samsung Galaxy?";
        conversationState = 1; // Revert to previous state to ask again
      }
    } else if (conversationState === 3) {
      // User just specified iPhone/Samsung model type
      aiMessage = `And what's your approximate budget for the ${
        customerNeeds.specificDeviceType === "iphone" ? "iPhone" : "Samsung"
      }? (e.g., "$800", "$500-$1000", "under $700")`;
    } else if (conversationState === 4) {
      const recommendation = findRecommendation(customerNeeds);
      if (recommendation) {
        aiMessage = `Based on your needs for a **${
          customerNeeds.specificDeviceType
        }** primarily for **${customerNeeds.primaryUses.join(
          ", "
        )}** within a budget of **$${customerNeeds.budget.min} - $${
          customerNeeds.budget.max
        }**, I recommend the **${recommendation.name}**.
                <br><br>**Key Specs:**
                <ul>
                    <li>Display: ${
                      recommendation.specs.display.recommended
                    }</li>
                    <li>Processor: ${
                      recommendation.specs.processor.recommended
                    }</li>
                    <li>Camera: ${recommendation.specs.camera.recommended}</li>
                    <li>Battery Life: ${
                      recommendation.specs.battery_life.recommended
                    }</li>
                    <li>Storage: ${
                      recommendation.specs.storage.recommended ||
                      recommendation.specs.storage.min
                    }</li>
                    ${
                      recommendation.specs.features
                        ? `<li>Features: ${recommendation.specs.features}</li>`
                        : ""
                    }
                </ul>
                **Explanation:** ${recommendation.explanation.purpose} ${
          recommendation.explanation.ecosystem || ""
        } ${recommendation.explanation.camera_quality || ""} ${
          recommendation.explanation.camera_system || ""
        } ${recommendation.explanation.performance || ""} ${
          recommendation.explanation.versatility || ""
        } ${recommendation.explanation.android_ecosystem || ""} ${
          recommendation.explanation.value_for_money || ""
        } ${recommendation.explanation.battery_life || ""}
                <br><br>**Does this sound like a good fit, or would you like me to refine the recommendation?**`;
      } else {
        aiMessage =
          "I couldn't find a specific recommendation based on all your criteria. Let's try adjusting some parameters. Would you like to revise your budget or primary uses?";
      }
    } else if (conversationState === 5) {
      aiMessage =
        "Please tell me how I can further assist you. Would you like to refine your search, or have more questions about this product?";
    }
  }
  displayAIMessage(aiMessage);
  // Only increment conversation state if a valid message was generated (not for reverted states)
  if (
    aiMessage &&
    !(
      aiMessage.includes("I didn't quite catch that.") ||
      aiMessage.includes("I'm not sure how to interpret that.")
    )
  ) {
    conversationState++;
  }
}

function handleDeviceSelection(deviceType) {
  currentDeviceType = deviceType;

  // Reset conversation for a new device type selection
  conversationState = 0;
  customerNeeds = {
    primaryUses: [],
    specificDeviceType: "",
    laptopPriority: "",
    desktopUse: "",
    ipadUse: "",
    iphoneModel: "",
    samsungModel: "",
    budget: { min: 0, max: Infinity, category: "" },
    userRequest: "",
  };
  conversationHistory.innerHTML = ""; // Clear previous conversation

  showScreen(conversationScreen); // Show the conversation screen
  askAIQuestion();
}

function processUserResponse() {
  const userInput = userResponseInput.value.trim();
  userResponseInput.value = ""; // Clear the input field

  if (!userInput) {
    displayAIMessage("Please provide a response.");
    return;
  }

  displayUserMessage(userInput);
  showLoadingIndicator();

  setTimeout(() => {
    const normalizedInput = userInput.toLowerCase();

    if (currentDeviceType === "computer") {
      if (conversationState === 1) {
        // User just answered primary use for computer
        parsePrimaryUsage(userInput);
        askAIQuestion();
      } else if (conversationState === 2) {
        // User just answered Laptop/Desktop/iPad
        parseDeviceType(userInput);
        askAIQuestion();
      } else if (conversationState === 3) {
        // User just answered device-specific priority (laptop/desktop/iPad)
        if (customerNeeds.specificDeviceType === "laptop") {
          parseLaptopPriority(userInput);
        } else if (customerNeeds.specificDeviceType === "desktop") {
          parseDesktopUse(userInput);
        } else if (customerNeeds.specificDeviceType === "ipad") {
          parseiPadUse(userInput);
        }
        askAIQuestion();
      } else if (conversationState === 4) {
        // User just answered budget for phone
        parseBudget(userInput);
        askAIQuestion(); // This will trigger the recommendation (state 5 message will be displayed)
      }
      // --- Handle post-recommendation for computers ---
      else if (conversationState === 5) {
        if (
          normalizedInput.includes("yes") ||
          normalizedInput.includes("good fit") ||
          normalizedInput.includes("sounds good")
        ) {
          displayAIMessage(
            "Fantastic! I'm glad I could help. Is there anything else you need assistance with today?"
          );
          conversationState = 0; // Reset to start new conversation
          currentDeviceType = ""; // Clear device type
          // customerNeeds object should also be reset here for a fresh start
          customerNeeds = {
            primaryUses: [],
            specificDeviceType: "",
            laptopPriority: "",
            desktopUse: "",
            ipadUse: "",
            iphoneModel: "",
            samsungModel: "",
            budget: { min: 0, max: Infinity, category: "" },
            userRequest: "",
          };
        } else if (
          normalizedInput.includes("no") ||
          normalizedInput.includes("refine") ||
          normalizedInput.includes("different") ||
          normalizedInput.includes("adjust")
        ) {
          displayAIMessage(
            "No problem, let's refine your search. What specific criteria would you like to change? (e.g., 'change budget', 'different use', 'another type of computer')"
          );
          conversationState = 0; // Reset to beginning for refinement
          customerNeeds = {
            primaryUses: [],
            specificDeviceType: "",
            laptopPriority: "",
            desktopUse: "",
            ipadUse: "",
            iphoneModel: "",
            samsungModel: "",
            budget: { min: 0, max: Infinity, category: "" },
            userRequest: "",
          };
        } else if (
          normalizedInput.includes("tell me more") ||
          normalizedInput.includes("specs") ||
          normalizedInput.includes("details")
        ) {
          const lastRecommendation = findRecommendation(customerNeeds);
          if (lastRecommendation) {
            displayAIMessage(`Certainly! Here are some more details about the **${
              lastRecommendation.name
            }**:
                        <br>• It excels in ${lastRecommendation.usage.join(
                          ", "
                        )}.
                        <br>• It features an advanced ${
                          lastRecommendation.specs.cooling || "cooling system"
                        } for sustained performance.
                        <br>• Consider its ${
                          lastRecommendation.specs.expandability ||
                          "expandability"
                        } for future upgrades.
                        <br><br>What else would you like to know?`);
            conversationState = 5;
          } else {
            displayAIMessage(
              "I can't provide more details at this moment. Would you like to refine your search?"
            );
            conversationState = 0;
            customerNeeds = {
              primaryUses: [],
              specificDeviceType: "",
              laptopPriority: "",
              desktopUse: "",
              ipadUse: "",
              iphoneModel: "",
              samsungModel: "",
              budget: { min: 0, max: Infinity, category: "" },
              userRequest: "",
            };
          }
        } else {
          displayAIMessage(
            "I'm not sure how to interpret that. Would you like to refine your search, or is the recommendation suitable?"
          );
          conversationState = 5;
        }
      }
    } else if (currentDeviceType === "cellphone") {
      if (conversationState === 1) {
        // User just answered primary use for cellphone
        parsePrimaryUsage(userInput);
        askAIQuestion();
      } else if (conversationState === 2) {
        // User just answered iPhone/Samsung
        parseDeviceType(userInput); // This will set specificDeviceType to 'iphone' or 'samsung'
        askAIQuestion();
      } else if (conversationState === 3) {
        // User just answered specific iPhone/Samsung model type
        if (customerNeeds.specificDeviceType === "iphone") {
          parseIphoneModel(userInput);
        } else if (customerNeeds.specificDeviceType === "samsung") {
          parseSamsungModel(userInput);
        }
        askAIQuestion();
      } else if (conversationState === 4) {
        // User just answered budget for phone
        parseBudget(userInput);
        askAIQuestion();
      }
      // --- Handle post-recommendation for cellphones ---
      else if (conversationState === 5) {
        if (
          normalizedInput.includes("yes") ||
          normalizedInput.includes("good fit") ||
          normalizedInput.includes("sounds good")
        ) {
          displayAIMessage(
            "Fantastic! I'm glad I could help. Is there anything else you need assistance with today?"
          );
          conversationState = 0; // Reset to start new conversation
          currentDeviceType = ""; // Clear device type
          customerNeeds = {
            primaryUses: [],
            specificDeviceType: "",
            laptopPriority: "",
            desktopUse: "",
            ipadUse: "",
            iphoneModel: "",
            samsungModel: "",
            budget: { min: 0, max: Infinity, category: "" },
            userRequest: "",
          };
        } else if (
          normalizedInput.includes("no") ||
          normalizedInput.includes("refine") ||
          normalizedInput.includes("different") ||
          normalizedInput.includes("adjust")
        ) {
          displayAIMessage(
            "No problem, let's refine your search. What specific criteria would you like to change? (e.g., 'change budget', 'different use', 'another type of phone')"
          );
          conversationState = 0; // Reset to beginning for refinement
          customerNeeds = {
            primaryUses: [],
            specificDeviceType: "",
            laptopPriority: "",
            desktopUse: "",
            ipadUse: "",
            iphoneModel: "",
            samsungModel: "",
            budget: { min: 0, max: Infinity, category: "" },
            userRequest: "",
          };
        } else if (
          normalizedInput.includes("tell me more") ||
          normalizedInput.includes("specs") ||
          normalizedInput.includes("details")
        ) {
          const lastRecommendation = findRecommendation(customerNeeds);
          if (lastRecommendation) {
            displayAIMessage(`Certainly! Here are some more details about the **${lastRecommendation.name}**:
                        <br>• It features a ${lastRecommendation.specs.display.recommended} display for vivid visuals.
                        <br>• It features a ${lastRecommendation.specs.camera.recommended} system is perfect for high-quality photos and videos.
                        <br>• Enjoy ${lastRecommendation.specs.battery_life.recommended} for all-day use.
                        <br><br>What else would you like to know?`);
            conversationState = 5;
          } else {
            displayAIMessage(
              "I can't provide more details at this moment. Would you like to refine your search?"
            );
            conversationState = 0;
            customerNeeds = {
              primaryUses: [],
              specificDeviceType: "",
              laptopPriority: "",
              desktopUse: "",
              ipadUse: "",
              iphoneModel: "",
              samsungModel: "",
              budget: { min: 0, max: Infinity, category: "" },
              userRequest: "",
            };
          }
        } else {
          displayAIMessage(
            "I'm not sure how to interpret that. Would you like to refine your search, or is the recommendation suitable?"
          );
          conversationState = 5;
        }
      }
    }
    hideLoadingIndicator();
  }, 1500);
}

// --- Screen and Tab Management Functions ---
const allScreens = []; // This will be populated in DOMContentLoaded

function showScreen(screenToShow) {
  allScreens.forEach((screen) => {
    if (screen) {
      screen.style.display = "none";
    }
  });
  if (screenToShow) {
    screenToShow.style.display = "block";
  }
}

function activateTab(tabId) {
  if (tabButtons && tabPanes) {
    // Ensure elements exist before trying to use them
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabPanes.forEach((pane) => pane.classList.remove("active"));

    const activeButton = document.querySelector(
      `.tab-button[data-tab="${tabId}"]`
    );
    const activePane = document.getElementById(`${tabId}-content`);

    if (activeButton) activeButton.classList.add("active");
    if (activePane) activePane.classList.add("active");
  }
}

// --- Event Listener Setup Functions ---

function setupIntroScreenListeners() {
  if (selectComputerBtn) {
    selectComputerBtn.addEventListener("click", () =>
      handleDeviceSelection("computer")
    );
  }
  if (selectCellphoneBtn) {
    selectCellphoneBtn.addEventListener("click", () =>
      handleDeviceSelection("cellphone")
    );
  }
}

function setupConversationScreenListeners() {
  if (submitResponseBtn) {
    submitResponseBtn.addEventListener("click", () => processUserResponse());
  }
  if (userResponseInput) {
    userResponseInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        processUserResponse();
      }
    });
  }
}

function setupNavigationListeners() {
  if (homeLink) {
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      showScreen(introScreen);
    });
  }
  if (skillSummaryLink) {
    skillSummaryLink.addEventListener("click", (event) => {
      event.preventDefault();
      showScreen(skillSummaryScreen);
      activateTab("web-dev"); // Default to Web Development tab
    });
  }
}

function setupSkillSummaryTabListeners() {
  if (tabButtons) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.dataset.tab;
        activateTab(tabId);
      });
    });
  }
}

function setupHamburgerMenuListeners() {
  const hamburger = document.getElementById("hamburger-icon");
  const menuList = document.querySelector(".menu-list");
  const menuLinks = document.querySelectorAll(".menu-list li a");
  const navbar = document.querySelector(".navbar");
  const languageToggle = document.getElementById("language-toggle");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      menuList.classList.toggle("active");
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (menuList.classList.contains("active")) {
        menuList.classList.remove("active");
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (
      navbar &&
      !navbar.contains(event.target) &&
      menuList.classList.contains("active")
    ) {
      menuList.classList.remove("active");
    }
  });

  if (languageToggle) {
    languageToggle.addEventListener("change", function () {
      if (this.checked) {
        console.log("Language switched to Amharic");
      } else {
        console.log("Language switched to English");
      }
    });
  }
}

// --- Main DOMContentLoaded Event ---
document.addEventListener("DOMContentLoaded", function () {
  // --- DOM Element Assignments ---
  introScreen = document.getElementById("intro-screen");
  conversationScreen = document.getElementById("conversation-screen");
  selectComputerBtn = document.getElementById("select-computer");
  selectCellphoneBtn = document.getElementById("select-cellphone");
  conversationHistory = document.getElementById("conversation-history");
  userResponseInput = document.getElementById("user-response");
  submitResponseBtn = document.getElementById("submit-response");
  loadingIndicator = document.getElementById("loading-indicator");

  homeLink = document.getElementById("home-link");
  skillSummaryLink = document.getElementById("skill-summary-link");
  skillSummaryScreen = document.getElementById("skill-summary-screen");
  tabButtons = document.querySelectorAll(".tab-button");
  tabPanes = document.querySelectorAll(".tab-pane");

  // Initialize the global allScreens array here, after elements are assigned
  // Ensure all screens are referenced for showScreen function
  allScreens.push(introScreen, conversationScreen, skillSummaryScreen);

  // --- Setup all Event Listeners ---
  setupIntroScreenListeners();
  setupConversationScreenListeners();
  setupNavigationListeners();
  setupSkillSummaryTabListeners();
  setupHamburgerMenuListeners();

  // Initial state: show intro screen
  showScreen(introScreen);
  activateTab("web-dev"); // Ensure Web Dev is active by default when skill summary is shown
});
