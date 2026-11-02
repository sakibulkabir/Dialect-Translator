// Je jela-r rules/examples ekhane thakbe, shegulor translation beshi nirbhul hobe.
// Baki jela-r jonno Claude nijer jantay chesta korbe (UI-te "বেটা" dekhabe).
//
// !! EGULO KHOSRA (draft). Oi jela-r manush diye jachai kore thik koro. !!
// Notun jela jog korte: key ta districts.js er key-r moto dao, rules + 3-5 ta example likho.

export const dialects = {
  noakhali: {
    rules: `- "আমি" → "আঁই/আই"
- ভবিষ্যৎ ক্রিয়ায় "-ব" এর জায়গায় "-মু" (খাব → খামু, যাব → যামু)
- "কোথায়" → "কই"
- টান ও সুর নোয়াখালীর মতো রাখো`,
    examples: [
      { standard: "আমি ভাত খাব", dialect: "আঁই ভাত খামু" },
      { standard: "তুমি কোথায় যাচ্ছ?", dialect: "তুই কই যাছ?" },
      { standard: "আমি বাড়ি যাব", dialect: "আঁই বাড়ি যামু" },
    ],
  },

  sylhet: {
    rules: `- "কী" → "কিতা", "ভালো" → "বালা", "কোথায়" → "কই"
- ক্রিয়ায় "-ইমু/-ইতাছি" ধরন (খাব → খাইমু, যাচ্ছি → যাইতাছি)
- "আমি" → "আমি/আমরা" অপরিবর্তিত, তবে সুর সিলেটি রাখো`,
    examples: [
      { standard: "কী খবর?", dialect: "কিতা খবর?" },
      { standard: "আমি ভাত খাব", dialect: "আমি ভাত খাইমু" },
      { standard: "আজ আবহাওয়া ভালো", dialect: "আইজ আওয়া বালা" },
    ],
  },

  chattogram: {
    rules: `- "আমি" → "আঁই"
- "কী করছ?" → "কি গরের/গরদ্দ?" ধরনের রূপ
- "যাব/খাব" → "যাইম/খাইম"
- "কোথায়" → "কডে/কোডে"`,
    examples: [
      { standard: "আমি ভাত খাব", dialect: "আঁই ভাত খাইম" },
      { standard: "তুমি কোথায় যাচ্ছ?", dialect: "তুই কডে যাইর?" },
    ],
  },

  rangpur: {
    rules: `- "আমি" → "মুই", "তুমি/তুই" → "তুই/তোমরা", "কোথায়" → "কোটে"
- "খাব/যাব" → "খামো/যামো"
- বাক্যের শেষে "গো/রে" মতো টান আনা যায়`,
    examples: [
      { standard: "আমি ভাত খাব", dialect: "মুই ভাত খামো" },
      { standard: "তুমি কোথায় যাচ্ছ?", dialect: "তুই কোটে যাচ্চিস?" },
    ],
  },

  barishal: {
    rules: `- "ভালো আছ?" → "ভালা আছেন?" ধরন
- "করছ" → "করতাছো", "খাব/যাব" → "খামু/যামু"
- "হ্যাঁ" → "হ", "কেন" → "ক্যান"`,
    examples: [
      { standard: "তুমি কী করছ?", dialect: "তুমি কী করতাছো?" },
      { standard: "হ্যাঁ, আমি যাব", dialect: "হ, আমি যামু" },
    ],
  },
};
