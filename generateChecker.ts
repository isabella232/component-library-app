import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

function extractUnionType(type: ts.TypeNode): string[] {
  if (ts.isUnionTypeNode(type)) {
    return type.types.map((t) =>
      ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal)
        ? t.literal.text
        : "",
    );
  }
  return [];
}

function generateCheckerFileContent(types: string[]): string {
  const dummyObject = types.map((t) => `'${t}': null`).join(",\n    ");
  return `
export function isSupportedStyleProperty(key: string): key is StyleProperty {
    const dummyObject: Record<StyleProperty, null> = {
        ${dummyObject}
    };
    return key in dummyObject;
}
`;
}

function main() {
  const fileName =
    "./node_modules/@webflow/designer-extension-typings/styles-generated.d.ts";
  const sourceFile = ts.createSourceFile(
    fileName,
    ts.sys.readFile(fileName)!,
    ts.ScriptTarget.Latest,
    true,
  );

  let unionTypes: string[] = [];

  const visitNode = (node: ts.Node) => {
    if (ts.isTypeAliasDeclaration(node) && node.name.text === "StyleProperty") {
      unionTypes = extractUnionType(node.type);
    }
    ts.forEachChild(node, visitNode);
  };

  ts.forEachChild(sourceFile, visitNode);

  if (unionTypes.length) {
    const outputPath = path.resolve(__dirname, "utils", "styleChecker.ts");
    if (!fs.existsSync(path.resolve(__dirname, "utils"))) {
      fs.mkdirSync(path.resolve(__dirname, "utils"));
    }
    fs.writeFileSync(
      outputPath,
      generateCheckerFileContent(unionTypes),
      "utf8",
    );
    console.log(`Checker function written to ${outputPath}`);
  }
}

main();
