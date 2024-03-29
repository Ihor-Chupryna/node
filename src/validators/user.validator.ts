import * as Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums";

export class UserValidator {
  public static firstName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGenders));
  private static phone = Joi.string().regex(regexConstants.PHONE).trim();

  static create = Joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
    phone: this.phone.required(),
  });

  static update = Joi.object({
    name: this.firstName,
    gender: this.gender,
    email: this.email,
  });

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
