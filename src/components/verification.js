import { InteractionResponseType } from "discord_api_types/v10.ts";

export const custom_id = "verification";

export async function execute({ ctx, branch, interaction }) {
  const quiz = await fetch("https://iciepex-nori-quiz.deno.dev/")
    .then(res => res.formData());
  
  const asset = quiz.get('asset');
  const payload = quiz.get('payload');
  
  const payloadMessage = {
    content: `## ${payload.question}\n${payload.answers.map(({ text }) => `* ${text}`).join("\n")}`
  };
};
