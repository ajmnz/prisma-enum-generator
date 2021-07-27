# Prisma Enum Generator

Automatically generate enums with your [Prisma](https://github.com/prisma/prisma) model names.

# Usage

### Installation

Install the package.

```shell
$ yarn add prisma-enum-generator
```

or

```shell
$ npm install prisma-enum-generator
```

### Add the generator

Add the generator to your schema.

```prisma
generator enum {
  provider = "node node_modules/prisma-enum-generator"
  output   = "./generated" // Specify an output directory (optional, default is ./types)
}
```

Run `npx prisma generate` or `yarn prisma generate` and a new file named `enums.d.ts` will be created inside the output directory specified above.

# Example

**shcema.prisma**

```prisma
datasource db {
  provider = "postgres"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

generator enum {
  provider = "node ./dist/index.js"
}

model User {
  id        Int       @id @default(autoincrement())
  firstName String
  lastName  String
  Role      Role?     @relation(fields: [roleId], references: [id])
  roleId    Int?
  bio       Bio?
  comments  Comment[]
}

model Role {
  id    Int    @id @default(autoincrement())
  name  String
  users User[]
}

model Bio {
  id          Int    @id @default(autoincrement())
  description String
  link        String
  avatarUrl   String
  user        User   @relation(fields: [userId], references: [id])
  userId      Int
}

model Post {
  id       Int       @id @default(autoincrement())
  title    String
  body     String
  tags     Tag[]
  likes    Int       @default(0)
  comments Comment[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  value String
  posts Post[]
}

model Comment {
  id      Int    @id @default(autoincrement())
  content String
  user    User   @relation(fields: [userId], references: [id])
  userId  Int
  post    Post   @relation(fields: [postId], references: [id])
  postId  Int
}
```

**enums.d.ts**

```typescript
export enum ModelNamesUpper {
  User = "User",
  Role = "Role",
  Bio = "Bio",
  Post = "Post",
  Tag = "Tag",
  Comment = "Comment",
}

export enum ModelNamesLower {
  user = "user",
  role = "role",
  bio = "bio",
  post = "post",
  tag = "tag",
  comment = "comment",
}

export type TModelNames = "User" | "Role" | "Bio" | "Post" | "Tag" | "Comment";
```

