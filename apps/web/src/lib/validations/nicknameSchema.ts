import { z } from "zod";
import { checkNickname } from "@/lib/api/checkNickname";

export const nicknameSchema = z
  .string()
  .min(2, "닉네임은 2자 이상이어야 해요.")
  .max(15, "닉네임은 15자 이하로 해주세요.")
  .regex(/^[a-zA-Z0-9가-힣._]+$/, "한글, 영문, 숫자, _ . 만 가능해요.");

export const asyncNicknameSchema = z
  .object({
    nickname: nicknameSchema,
  })
  .superRefine(async (data, ctx) => {
    const isDuplicated = await checkNickname(data.nickname);
    if (isDuplicated) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "이미 사용 중인 닉네임이에요.",
        path: ["nickname"],
      });
    }
  });
