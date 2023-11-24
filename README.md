# pyspark-schema-generator
A tool to generate PySpark schema from JSON and CSV.
### [Check it out!](https://preetranjan.github.io/pyspark-schema-generator/)
## New Options for Schema Generation
Click on the Options button in the left side. It will pop up a modal for selecting the Input Type.
You can select JSON or CSV as Input Type based on the data which you are supplying.
You can select the output type also but String output is not supported yet(Feature coming soon).




Not sure which data engineer will need this but here it is. I built this as I was facing a problem. 
*There are few bugs in it. It will be fixed soon. 😉*

### CSV Options
- HeaderOnly - If you are supplying a comma separated column names for schema generation. It can generate only string only type schema.
- Has Data? - Select this if the data you are supplying the CSV with header and some sample data.

### Schema Options
- StringOnly - Generates the schema setting all types of the column to StringType.
- Infer Types - It works partially if you supply CSV with some sample data. This can refer types and generate the schema accordingly. Its not working completely yet for CSV. This will be inproved soon.

## Schema generation from JSON
Place your Valid JSON in the left textarea and click on generate schema. You can see the results in the right teararea.

Example:
Input:
```
{
  "name": "PREETish ranjan",
  "dob": "2022-03-04T18:30:00.000Z",
  "status": "active",
  "isActive": true,
  "id": 102,
  "address": {
    "city": "Bhubaneswar",
    "PIN": 500016
  },
  "mobiles": ["8989898989", "5656565656"],
  "id_cards": [1, 2, 3, 4, 5]
}


```

Output:

```
StructType([
    StructField('name', StringType(), True),
    StructField('dob', StringType(), True),
    StructField('status', StringType(), True),
    StructField('isActive', BooleanType(), True),
    StructField('id', IntegerType(), True),
    StructField('address', StructType([StructField('city',
                StringType(), True), StructField('PIN', IntegerType(),
                True)]), True),
    StructField('mobiles', ArrayType(StringType()), True),
    StructField('id_cards', ArrayType(IntegerType()), True),
    ])
```


You can use this schema for further processing. Currently formatting python code is not supported in house. You can use 3rd party formatter available online like
[Tutorials Point](https://www.tutorialspoint.com/online_python_formatter.htm) ,
[Code Beautify](https://codebeautify.org/python-formatter-beautifier)

## Schema Generation from CSV:
This tool now supports PySpark schema generation from CSV. 
You can supply a comma separated list of columns and it can generate a string only schema. It can generate the schema of only string type.

Example:
```
id,name,address,mobile,dob
```

Output:
```
schema = StructType([StructField('id',StringType(),True),
StructField('name',StringType(),True),
StructField('address',StringType(),True),
StructField('mobile',StringType(),True),
StructField('dob',StringType(),True),])
```

You can supply a sample CSV with header and data. It can refer the types and generate schema or can generate a string only schema based on the options selected.
Not all spark types are supported yet, more type supports will be added soon.

Supported Spark Types:
StringType,IntegerType,TimestampType


Example:
```
id,name,address,mobile,dob
1,Pritish,Hyderabad,1212121212,"12-09-1995"
2,PREET,Bhubaneswar,1212121212,"18-10-1996"
3,PREETish,Bangaluru,3434343434,"14-11-2001"
```

Output:
```
schema = StructType([StructField('id',IntegerType(),True),
StructField('name',StringType(),True),
StructField('address',StringType(),True),
StructField('mobile',IntegerType(),True),
StructField('dob',StringType(),True),])
```


Planned Enhancements
1. Support for more types CSV i.e. LongType and more
2. Support for more sample file upload and generate schema from CSV and JSON
3. Support for Scala language schema
4. Support for JSON string schema generation
5. Generate Spark schema as String ```i.e. "id int,name string,address string,mobile long,uniqueId long."```



Made with ♥ by PREETish
Reach out to me:\
Twitter:[@preetrnj](https://twitter.com/preetrnj)\
Blog Site:[My Tech Blog](https://pritishcodeblogs.blogspot.com)
