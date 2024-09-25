import pandas as pd
import os
import glob

# Define the path to the main CSV file and the pattern for other CSV files
main_csv_path = 'paras.csv'  # Replace with your actual main CSV file path
pattern = 'list_*.csv'

# Read the main CSV file
main_df = pd.read_csv(main_csv_path)

# Find all CSV files that match the pattern
csv_files = glob.glob(pattern)

# Iterate over each CSV file that matches the pattern and merge with the main DataFrame
for file in csv_files:
    # Read the current CSV file
    current_df = pd.read_csv(file)
    
    # Merge the current DataFrame with the main DataFrame
    merged_df = pd.merge(main_df, current_df, on='ID', how='inner')
    
    # Optionally, save the merged DataFrame to a new file
    output_filename = f'merged_{os.path.basename(file)}'
    merged_df.to_csv(output_filename, index=False)
    print(f'Merged data saved to {output_filename}')
