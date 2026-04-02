from typing import Annotated

from pydantic import BaseModel, Field


"""
import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
    name: z.string()
})

export const SigninSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
})

"""


class Base(BaseModel):
    pass


UserNameType = Annotated[str, Field(min_length=3, max_length=20)]
PasswordType = Annotated[str, Field(min_length=8, max_length=18)]
NameType = Annotated[str, Field(min_length=3, max_length=20)]


class CreateUserSchema(Base):
    username: UserNameType
    password: PasswordType
    name: NameType


class SigninSchema(Base):
    username: UserNameType
    password: PasswordType


class CreateRoomSchema(Base):
    name: NameType
