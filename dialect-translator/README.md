# আঞ্চলিক ট্রান্সলেটর (Dialect Translator)

মান বাংলা ↔ বাংলাদেশের ৬৪ জেলার আঞ্চলিক ভাষা। Google Translate-এর মতো UI, ভয়েস ইনপুট/আউটপুট, Banglish সাপোর্ট।
Next.js 14 + Tailwind + Claude API।

## চালানোর নিয়ম

```bash
npm install
cp .env.local.example .env.local     # Windows: copy .env.local.example .env.local
# .env.local খুলে ANTHROPIC_API_KEY বসাও (console.anthropic.com থেকে)
npm run dev
```

http://localhost:3000 খোলো। ভয়েস ফিচারের জন্য **Chrome** ব্যবহার করো।
Phone থেকে test করতে HTTPS লাগবে (mic permission), তাই Vercel-এ deploy করে test করাই ভালো।

## Deploy (Vercel)

1. GitHub-এ push করো (`.env.local` push হবে না, `.gitignore` আছে)।
2. vercel.com এ repo import করো।
3. Settings → Environment Variables এ `ANTHROPIC_API_KEY` দাও। Deploy।

## ফোল্ডার

```
app/page.js                  মূল UI (দুই panel, swap, mic, speaker, copy, share)
app/api/translate/route.js   Claude API call (key এখানেই থাকে, browser এ যায় না)
components/LanguagePicker.js জেলা বাছাইয়ের popup + search
hooks/useVoice.js            browser voice input
lib/districts.js             ৬৪ জেলার তালিকা
lib/dialects.js              জেলাভিত্তিক rules + examples (accuracy এখানেই বাড়ে)
```

## Accuracy বাড়ানোর উপায়

`lib/dialects.js` এ এখন ৫টি জেলার **খসড়া** আছে (নোয়াখালী, সিলেট, চট্টগ্রাম, রংপুর, বরিশাল)।
ওই জেলার মানুষ দিয়ে rules ও example ঠিক করো। যে জেলার ডেটা নেই, সেটা UI-তে "বেটা" দেখায়।
নতুন জেলা যোগ করতে `districts.js` এর `key` দিয়ে `dialects.js` এ এন্ট্রি দাও।

## খরচ ও নিরাপত্তা

- প্রতিটি অনুবাদ একটি API call। ইনপুট ৩০০ অক্ষরে সীমিত, প্রতি IP-তে মিনিটে ৩০ request (সহজ in-memory limit)।
- Viral হলে Upstash Ratelimit ব্যবহার করো। কম খরচের জন্য `.env.local` এ `ANTHROPIC_MODEL=claude-haiku-4-5` দিতে পারো।
- API key কখনো frontend বা GitHub-এ রেখো না।

## সীমাবদ্ধতা

- Browser-এর voice recognition মান বাংলা ধরে; আঞ্চলিক উচ্চারণে ভুল হতে পারে, তাই বলার পর text box দেখে নাও।
- Voice আউটপুট মান বাংলার উচ্চারণে পড়ে, আঞ্চলিক টানে না।
- Firefox এ voice input নেই; iPhone Safari এ সীমিত।
