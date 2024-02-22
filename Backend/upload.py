import pandas as pd
from pymongo import MongoClient

# Replace '/path/to/your/excel/file.xlsx' with the actual path to your Excel file
excel_file_path = r"C:\Users\bibin\OneDrive\Desktop\HTML Questions (S Vault).xlsx"

# Replace 'mongodb://localhost:27017/' with your MongoDB connection URI
mongo_uri = 'mongodb+srv://bibinjose:bibinmongodb@cluster0.8cod5vz.mongodb.net/?retryWrites=true&w=majority'

# Replace 'your_database_name' with the name of your database
database_name = 'skillvault'

# Replace 'your_collection_name' with the name of your collection
collection_name = 'Html'

# Read the Excel file into a pandas DataFrame
df = pd.read_excel(excel_file_path)

# Convert the DataFrame to a list of dictionaries
documents = df.to_dict('records')

# Setup the MongoDB client and specify the database and collection
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

# Insert the documents into the collection
collection.insert_many(documents)

print('Data inserted successfully into MongoDB.')
