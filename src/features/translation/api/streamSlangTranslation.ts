import { API_URL } from "@/config";

type SlangTranslationRequestBody = {
  targetLang: string;
  targetWord: string;
  isDetail: boolean;
};

export const streamSlangTranslation = async (
  body: SlangTranslationRequestBody
) => {
  const { targetLang, targetWord, isDetail } = body;

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      targetLang,
      targetWord,
      prompt: [
        {
          role: "system",
          content: `You are an ${targetLang} slang master. Your task is to translate incoming ${targetLang} slang and show only meaning in Japanese`,
        },
        {
          role: "user",
          content: `「${targetWord}」というスラングの${
            isDetail
              ? "意味とイメージしやすいように解説を日本語でお願いします。（例文は不要です）またスラングでない場合は、その旨と簡単な意味だけ教えてください。"
              : "意味だけを端的に日本語訳してください。またスラングでない場合は、その旨と簡単な意味だけ教えてください。"
          }`,
        },
      ],
    }),
  });

  return res?.body;
};
