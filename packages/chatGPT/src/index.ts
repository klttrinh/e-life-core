import OpenAI from 'openai';

// const token = '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';
const token = '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';
const endpoint = 'https://models.inference.ai.azure.com';
const modelName = 'gpt-4o-mini';

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const stream = await client.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Give me 5 good reasons why I should exercise every day.' },
    ],
    model: modelName,
    stream: true,
  });

  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main().catch((err) => {
  console.error('The sample encountered an error:', err);
});
