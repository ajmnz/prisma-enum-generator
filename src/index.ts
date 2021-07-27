import { generatorHandler } from "@prisma/generator-helper";
import prettier from "prettier";
import fs from "fs";
import path from "path";
import { firstLower } from "./utils";

generatorHandler({
  onManifest() {
    return {
      defaultOutput: "./types",
      prettyName: "Prisma Enum Generator",
    };
  },
  async onGenerate(options) {
    const models = options.dmmf.datamodel.models.map((e) => e.name);
    const output = options.generator.output?.value;

    if (output) {
      let uContent = "export enum ModelNamesUpper {\n";
      let lContent = "export enum ModelNamesLower {\n";
      let tContent = "export type TModelNames =";

      models.forEach((m) => {
        uContent += `${m} = "${m}",\n`;
        lContent += `${firstLower(m)} = "${firstLower(m)}",\n`;
        tContent += ` "${m}" |`;
      });

      uContent += "}\n\n";
      lContent += "}\n\n";
      tContent = tContent.substring(0, tContent.length - 1) + ";";

      let content = uContent + lContent + tContent;

      try {
        content = prettier.format(content, {
          trailingComma: "es5",
          tabWidth: 2,
          semi: true,
          singleQuote: false,
          useTabs: false,
          parser: "typescript",
        });

        await fs.promises.mkdir(output, {
          recursive: true,
        });

        await fs.promises.writeFile(path.join(output, "enums.d.ts"), content);
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      throw new Error("No output specified for Prisma Enum Generator");
    }
  },
});
