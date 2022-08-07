function appendIndent(acc: string, indentToken: string, indent: number) {
  if (indent < 0) {
    throw new RangeError("Starting indent too small");
  }
  return acc + indentToken.repeat(indent);
}

const maxLineLength = 80;
const quoteChars = ["'", '"'];
const indentChars = ["[", "{", "("];
const deindentChars = ["]", "}", ")"];
const ignoreChars = [" ", "\n", "\t"];

// Write whatever is needed, and then the first if s, in acc.
// Does not care about what happens after the character has been appended to acc
// s = "abc", acc = "123" -> "123a"
// s = "}}", acc = "{\n\t'a': 1" -> "{\n\t'a': 1\n}"
function indentDict(s: string, indentToken: string, indent = 0): string {
  let acc = "";
  let isInString = false;
  let quoteChar = "";
  while (true) {
    if (s.length === 0) {
      return acc;
    }

    if (acc.length === 0) {
      acc = appendIndent(acc, indentToken, indent);
    }

    let nextChar = s.charAt(0);
    let prevChar = acc.charAt(acc.length - 1);
    s = s.slice(1);

    if (isInString) {
      if (nextChar === "\\") {
        nextChar += s.charAt(0);
        s = s.slice(1);
      } else if (nextChar === quoteChar) {
        isInString = false;
        quoteChar = "";
      }
    } else {
      if (quoteChars.includes(nextChar)) {
        isInString = true;
        quoteChar = nextChar;
      }

      if (ignoreChars.includes(nextChar)) {
        continue;
      }

      if (prevChar === ":") {
        acc += " ";
      }

      if (indentChars.includes(prevChar)) {
        indent += 1;
      }

      if (deindentChars.includes(nextChar)) {
        indent -= 1;
      }

      if (
        indentChars.includes(prevChar) ||
        prevChar === "," ||
        deindentChars.includes(nextChar)
      ) {
        acc += "\n";
        acc = appendIndent(acc, indentToken, indent);
      }
    }

    acc += nextChar;
  }
}

export default function formatDict(s: string, indentToken: string): string {
  let startingIndent = 0;
  while (true) {
    try {
      return indentDict(s, indentToken, startingIndent);
    } catch (RangeError) {
      startingIndent += 1;
    }
  }
}
