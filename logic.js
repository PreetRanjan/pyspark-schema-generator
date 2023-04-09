//function to call recursively
function prepare_from_object(obj) {
  console.log("Parsing ", obj, "Typs is: ", typeof obj);
  if (typeof obj == "string") {
    return "StringType()";
  } else if (typeof obj == "number") {
    return "IntegerType()";
  } else if (typeof obj != "object") {
    return null;
  } else if (obj == null) {
    return "StringType()";
  }
  let schema = `StructType([0])`;
  let fieldNames = Object.keys(obj);
  let schema_str = [];
  fieldNames.forEach((v, i) => {
    console.log(typeof obj[v]);

    if (typeof obj[v] == "string") {
      schema_str.push(`StructField('${v}',StringType(),True)`);
    } else if (typeof obj[v] == "boolean") {
      schema_str.push(`StructField('${v}',BooleanType(),True)`);
    } else if (typeof obj[v] == "number") {
      schema_str.push(`StructField('${v}',IntegerType(),True)`);
    } else if (Array.isArray(obj[v])) {
      let array_schema = `StructField('${v}',ArrayType(0),True)`;
      let get_new_schema = prepare_from_object(obj[v][0]);
      console.log("=============", get_new_schema);
      array_schema = array_schema.replace("0", get_new_schema);
      schema_str.push(array_schema);
    } else if (typeof obj[v] == "object") {
      let obj_schema = prepare_from_object(obj[v]);
      let obj_schema_inside_struct_field = `StructField('${v}',${obj_schema},True)`;
      schema_str.push(obj_schema_inside_struct_field);
    }
  });

  schema = schema.replace("0", schema_str.join(","));

  return schema;
}

// https://stackoverflow.com/questions/9236314/how-do-i-synchronize-the-scroll-position-of-two-divs/9236351

var isSyncingLeftScroll = false;
var isSyncingRightScroll = false;
var leftDiv = document.getElementById("left");
var rightDiv = document.getElementById("right");

let generate_button = document.getElementById("btn-generate");
generate_button.addEventListener("click", () => {
  let input_json = editor.getValue();
  let input_json_object = JSON.parse(input_json);
  let generated_schema = prepare_from_object(input_json_object);
  let tryFormat = generated_schema.split("True),").join("True),  \n");
  outputEditor.getModel().setValue(tryFormat);
});

var copyButton = document.getElementById("btncopy");
copyButton.addEventListener("click", (event) => {
  let inputJson = document.getElementById("input-area").value;
  navigator.clipboard.writeText(inputJson);
  console.log(event.target.innerText);
  event.target.innerText = "Copied";
});

function formatJsonArea(element) {
  let inputJson = document.getElementById(element);

  const formatedJson = JSON.stringify(JSON.parse(inputJson.value), null, 4);

  inputJson.value = formatedJson;
}

function copyToClipBoard(element) {
  let inputJson = document.getElementById(element).value;
  navigator.clipboard.writeText(inputJson);
}

//Code for Monaco editor
//require config
require.config({
  baseUrl:
    "https://microsoft.github.io/monaco-editor/node_modules/monaco-editor/min/",
});
//editor section
var editor, outputEditor;
require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("container"), {
    value: [
      "{",
      '"id":21,',
      '"name":"PREETish",',
      '"project":"PySpark Schema Generator",',
      '"details":',
      "{",
      '"link":"https://preetranjan.github.io/pyspark-schema-generator/",',
      '"developer":"Pritish Ranjan"',
      "}",
      "}",
    ].join("\n"),
    language: "json",
    autoIndent: true,
  });

  //output python editor
  outputEditor = monaco.editor.create(
    document.getElementById("output_container"),
    {
      value: ["# Your Pyspark Schema Will be generated here! \n \n \n \n"].join(
        "\n"
      ),
      language: "python",
    }
  );
});

var formatButton = document.getElementById("btnformat");

formatButton.addEventListener("click", () => {
  editor.trigger("editor", "editor.action.formatDocument");
});

var outputFormatButton = document.getElementById("btnoutput_format");

outputFormatButton.addEventListener("click", () => {
  outputEditor
    .getModel()
    .setValue(outputEditor.getValue().split("True),").join("True),  \n"));
  outputEditor.trigger("editor", "editor.action.formatDocument");
});

//generic function to be used later
function formatEditor(editor) {
  //trigger format action
  editor.trigger("editor", "editor.action.formatDocument");
}
var copyButton = document.getElementById("btncopy");
copyButton.addEventListener("click", (event) => {
  let inputJson = editor.getValue();
  navigator.clipboard.writeText(inputJson);
  event.target.innerText = "Copied";
});

var copyButton = document.getElementById("btncopy2");
copyButton.addEventListener("click", (event) => {
  let inputJson = outputEditor.getValue();
  navigator.clipboard.writeText(inputJson);
  event.target.innerText = "Copied";
});
window.onload = () => {
  editor.trigger("editor", "editor.action.formatDocument");
};
