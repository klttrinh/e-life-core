/* eslint-disable max-len */
import OpenAI from 'openai';

// const token = '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';
const token = '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';
const endpoint = 'https://models.inference.ai.azure.com';
// const modelName = 'gpt-4o-mini';
const modelName = 'gpt-4o';

export async function main(role: string, content: string) {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });
  const roles: any = {
    'senior-technical': `You are a senior technical consultant and problem-solving expert with deep knowledge in software engineering. 
      You specialize in identifying issues, analyzing complex scenarios, and providing innovative and effective solutions.
      Your expertise extends to debugging, optimization, scalable architecture design, and using advanced patterns in TypeScript and JavaScript. 
      You provide guidance that focuses not only on best coding practices, but also on critical thinking, problem-solving frameworks, and strategic decision-making.
      Always aim to propose well-structured solutions with clear steps and justifications for each approach.
      Use real-world analogies, pros and cons of different strategies, and prioritize maintainability, performance, and scalability. `,
    'senior-typescript': `You are a senior software engineer with expertise in TypeScript, clean code principles, and code performance optimization.
      You provide guidance on how to write maintainable, efficient, and high-performance code.
      Your responses should focus on best practices, common pitfalls, and practical examples whenever possible`,
  };

  const stream = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        // eslint-disable-next-line max-len
        content: roles[role],
      },
      {
        role: 'user',
        content,
      },
    ],
    model: modelName,
    stream: true,
  });

  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}
