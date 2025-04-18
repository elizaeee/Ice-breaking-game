export interface Question {
  id: number;
  type: {
    zh: string;
    en: string;
  };
  content: {
    zh: string;
    en: string;
  };
}

export const questions: Question[] = [
  // 輕鬆趣味型
  {
    id: 1,
    type: {
      zh: "輕鬆趣味型",
      en: "Fun & Lighthearted"
    },
    content: {
      zh: "如果你可以擁有一種超能力，你會選擇什麼？",
      en: "If you could have one superpower, what would it be?"
    }
  },
  {
    id: 2,
    type: {
      zh: "輕鬆趣味型",
      en: "Fun & Lighthearted"
    },
    content: {
      zh: "如果你只能吃一道菜一輩子，你會選擇什麼？",
      en: "If you could only eat one dish for the rest of your life, what would it be?"
    }
  },
  {
    id: 3,
    type: {
      zh: "個人經驗型",
      en: "Personal Experiences"
    },
    content: {
      zh: "你做過最瘋狂的事情是什麼？",
      en: "What is the craziest thing you have ever done?"
    }
  },
  {
    id: 4,
    type: {
      zh: "幻想類",
      en: "Imaginative & Hypothetical"
    },
    content: {
      zh: "如果你能和任何歷史人物共進晚餐，你會選擇誰？",
      en: "If you could have dinner with any historical figure, who would it be?"
    }
  },
  {
    id: 5,
    type: {
      zh: "情境選擇",
      en: "Would You Rather"
    },
    content: {
      zh: "你寧願擁有讀心術還是隱形能力？",
      en: "Would you rather have the power to read minds or be invisible?"
    }
  },
  {
    id: 6,
    type: {
      zh: "即興創意型",
      en: "Creative & Spontaneous"
    },
    content: {
      zh: "用三個詞來形容自己。",
      en: "Describe yourself in three words."
    }
  },
  {
    id: 7,
    type: {
      zh: "心理測驗型",
      en: "Personality & Preferences"
    },
    content: {
      zh: "如果你是一種動物，你覺得自己是什麼？",
      en: "If you were an animal, what would you be?"
    }
  }
]; 