import { 
  ComponentType,
  InteractionResponseType,
  MessageFlags
} from "discord_api_types/v10.ts";

export const custom_id = "verification";
export const type = ComponentType.Button;

export async function execute({ ctx }) {
  console.log("verification started.");
  const baseURL = "https://iciepex-nori-quiz.deno.dev/";
  
  const payload = await fetch(baseURL)
    .then(res => res.json());
  const asset = await fetch(baseURL + `asset/${payload.id}`)
    .then(async res => await res.blob());
  
  console.log(payload);
  console.log(asset);
  
  // const payloadJSON = {
  ctx.response.body = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `## ${payload.question}\n${payload.answers.map(({ text }) => `* ${text}`).join("\n")}\n [](${baseURL + `/asset${payload.id}`})`,
      flags: MessageFlags.Ephemeral
    }
  };
  
  // const formData = new FormData();
  
  // formData.set("payload_json", JSON.stringify(payloadJSON));
  // formData.set("files[0]", asset, "image.jpeg");
  
  // ctx.response.body = formData;
  // ctx.response.type = "form-data";
};
