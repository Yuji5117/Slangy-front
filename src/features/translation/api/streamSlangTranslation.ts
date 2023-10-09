import { STREAM_API_URL } from "@/config";

type SlangTranslationRequestBody = {
  language: string;
  targetWord: string;
  isDetail: boolean;
};

export const streamSlangTranslation = async (
  body: SlangTranslationRequestBody
) => {
  const { language, targetWord, isDetail } = body;

  const res = await fetch(STREAM_API_URL, {
    method: "POST",
    body: JSON.stringify({
      language,
      targetWord,
      prompt: [
        {
          role: "system",
          content: `You are an ${language} slang master. Your task is to translate incoming ${language} slang and show only meaning in Japanese`,
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
