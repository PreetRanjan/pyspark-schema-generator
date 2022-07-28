# pyspark-schema-generator
A tool to generate PySpark schema from JSON.

Place your Valid JSOn in the left textarea and click on generate schema. You can see the results in the right teararea.

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

Planned Enhancements
1. Support for Scala
2. Python Code formatting



Made with ♥ by PREETish

