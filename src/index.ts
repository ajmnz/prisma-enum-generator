import { generatorHandler } from "@prisma/generator-helper";
import prettier from "prettier";
import fs from "fs";
import path from "path";

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
      let content = "export enum ModelNames {\n";

      models.forEach((m) => {
        content += `${m} = "${m}",\n`;
      });

      content += "}\n";

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
