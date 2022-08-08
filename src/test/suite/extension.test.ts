import * as assert from "assert";
import formatDict from "../../indent";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../extension';

function customAssertEqual(
  actual: string,
  expected: string,
  indentToken: string
) {
  const regex = RegExp(`\n${indentToken}${indentToken}`, "g");
  assert.equal(actual, expected.replace(regex, "\n"));
}

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Empty string", () => {
    const input = "";
    const actual = formatDict(input, "\t");
    const expected = "";
    customAssertEqual(actual, expected, "\t");
  });

  test("Simple dict", () => {
    const input = "{'a': 1, 2: 'b', True: False}";
    const actual = formatDict(input, "\t");
    const expected = `{
			'a': 1,
			2: 'b',
			True: False
		}`;
    customAssertEqual(actual, expected, "\t");
  });

  test("Simple list", () => {
    const input = `[0, 1, True, 'pizza', "yolo"]`;
    const actual = formatDict(input, "\t");
    const expected = `[
			0,
			1,
			True,
			'pizza',
			"yolo"
		]`;
    customAssertEqual(actual, expected, "\t");
  });

  test("Nested dicts and lists", () => {
    const input = `{'key0': [0, 1, 2], 'key1': {u'key10': {'key100': 0, 'key101': 1}, 'key11': {r'key110': 0, b'key111': 1}
}, 'key2': [[{'key2000': 0}]]}`;
    const actual = formatDict(input, "\t");
    const expected = `{
			'key0': [
				0,
				1,
				2
			],
			'key1': {
				u'key10': {
					'key100': 0,
					'key101': 1
				},
				'key11': {
					r'key110': 0,
					b'key111': 1
				}
			},
			'key2': [
				[
					{
						'key2000': 0
					}
				]
			]
		}`;
    customAssertEqual(actual, expected, "\t");
  });

  test("Extra spaces, new lines and tabs", () => {
    const input = `{'a':      1, 2: 'b',


                                           True: 		False}`;
    const actual = formatDict(input, "\t");
    const expected = `{
			'a': 1,
			2: 'b',
			True: False
		}`;
    customAssertEqual(actual, expected, "\t");
  });

  test("Incomplete data", () => {
    const input = `{'key0': [0, 1, 2], 'key1': {'key10': {'key100': 0, 'key101': 1}, 'key11': {'key110': 0`;
    const actual = formatDict(input, "\t");
    const expected = `{
			'key0': [
				0,
				1,
				2
			],
			'key1': {
				'key10': {
					'key100': 0,
					'key101': 1
				},
				'key11': {
					'key110': 0`;
    customAssertEqual(actual, expected, "\t");
  });

  test("Incomplete data with negative indent", () => {
    const input = `, 'key101': 1}, 'key11': {'key110': 0, 'key111': 1}}, 'key2': [[{'key2000': 0}]]}`;
    const actual = formatDict(input, "\t");
    const expected = `			,
					'key101': 1
				},
				'key11': {
					'key110': 0,
					'key111': 1
				}
			},
			'key2': [
				[
					{
						'key2000': 0
					}
				]
			]
		}`;
    customAssertEqual(actual, expected, "\t");
  });

  test("JSON", () => {
    const input = `{"data": {"list": [1,2,3], "bool": false, "number": 2.34}}`;
    const actual = formatDict(input, "\t");
    const expected = `{
			"data": {
				"list": [
					1,
					2,
					3
				],
				"bool": false,
				"number": 2.34
			}
		}`;
    customAssertEqual(actual, expected, "\t");
  });

  test("Simple dict with space indent character", () => {
    const input = "{'a': 1, 2: 'b', True: False}";
    const actual = formatDict(input, "  ");
    const expected = `{
      'a': 1,
      2: 'b',
      True: False
    }`;
    customAssertEqual(actual, expected, "  ");
  });

  test("Simple dict with empty structures", () => {
    const input = "{'a': [], 2: [{}], True: {}}";
    const actual = formatDict(input, "  ");
    const expected = `{
      'a': [],
      2: [
        {}
      ],
      True: {}
    }`;
    customAssertEqual(actual, expected, "  ");
  });
});
