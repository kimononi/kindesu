import { 
  InteractionResponseType,
  MessageFlags
} from "discord_api_types/v10.ts";

export const custom_id = "verification";

export async function execute({ ctx }) {
  const quiz = await fetch("https://iciepex-nori-quiz.deno.dev/")
    .then(res => res.formData());
  
  const asset = quiz.get('asset');
  const payload = quiz.get('payload');
  
  const payloadJSON = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `## ${payload.question}\n${payload.answers.map(({ text }) => `* ${text}`).join("\n")}`,
      attachments: [{
        id: "0",
        filename: "image.jpeg"
      }],
      flags: MessageFlags.Ephemeral
    }
  };
  
  const formData = new FormData();
  
  formData.set("payload_json", JSON.stringify(payloadJSON));
  formData.set("files[0]", asset, "image.jpeg");
  
  ctx.response.body = formData;
};
