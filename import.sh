# #!/bin/bash

# DB_NAME=godachi

# for file in /webiwork/projects/Godachi-Project/db/*.json; do
#   collection=$(basename "$file" .json)
#   echo "Importing $collection..."

#   mongoimport \
#     --db=$DB_NAME \
#     --collection=$collection \
#     --file="$file" \
#     --drop
# done

#!/bin/bash

DB_NAME=godachi
DATA_DIR="./db"

for file in $DATA_DIR/*.json; do
  filename=$(basename "$file" .json)
  collection=$(echo "$filename" | cut -d '.' -f2)

  echo "Importing into collection: $collection from file: $file"

  mongoimport \
    --db="$DB_NAME" \
    --collection="$collection" \
    --file="$file" \
    --drop

  if [ $? -ne 0 ]; then
    echo "❌ Error importing $file"
    exit 1
  fi

done

echo "✅ All files imported successfully!"