import Joi from "joi";
import { Languages } from "@/constants";

const topics = Languages.map((language) => language.name);

export const signupSchema = Joi.object({
    username: Joi.string().min(3).max(64).required(),
    email: Joi.string().max(64).email().required(),
    password: Joi.string().min(8).max(64).required(),
    confirmPassword: Joi.string()
        .min(8)
        .max(64)
        .required()
        .valid(Joi.ref("password"))
});

export const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(64).required(),
    firsName: Joi.string().max(64).optional(),
    lastName: Joi.string().max(64).optional()
});

export const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().max(64).required(),
    newPassword: Joi.string().min(8).max(64).required(),
    confirmNewPassword: Joi.string()
        .min(8)
        .max(64)
        .required()
        .valid(Joi.ref("newPassword"))
});
export const signinSchema = Joi.object({});

export const postSchema = Joi.object({
    post: Joi.object({
        tabs: Joi.array()
            .min(1)
            .items(
                Joi.object({
                    id: Joi.number().required(),
                    name: Joi.string().required(),
                    language: Joi.optional(),
                    value: Joi.optional()
                })
            )
            .required()
    }).required()
});

export const commentSchema = Joi.object({
    comment: Joi.object({
        tabs: Joi.array()
            .min(1)
            .items(
                Joi.object({
                    id: Joi.number().required(),
                    name: Joi.string().required(),
                    language: Joi.optional(),
                    value: Joi.optional()
                })
            )
            .required()
    }).required()
});

export const postIdSchema = Joi.object({
    postId: Joi.string().min(8).max(32).required()
});

export const commentIdSchema = Joi.object({
    commentId: Joi.string().alphanum().min(8).max(32).required()
});

export const reactionSchema = Joi.object({
    reaction: Joi.string().valid("upvote", "downvote").required()
});

export const topicSchema = Joi.object({
    topic: Joi.string().required()
});

export const pageSchema = Joi.object({
    page: Joi.number().required()
});

export const tokenSchema = Joi.object({
    token: Joi.string().required()
});

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().max(64).required()
});

export const resetPasswordSchema = Joi.object({
    newPassword: Joi.string().min(8).max(64).required(),
    confirmNewPassword: Joi.string()
        .min(8)
        .max(64)
        .required()
        .valid(Joi.ref("newPassword"))
});
